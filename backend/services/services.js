const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { User, Group } = require("../models/models");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_TOKEN);
const GEMINI_MODELS_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1/models";
const GEMINI_MODEL_CACHE_TTL_MS = 10 * 60 * 1000;
const FALLBACK_GEMINI_MODELS = ["gemini-2.5-flash"];

let geminiModelCache = { models: [], fetchedAt: 0 };
let geminiModelFetchPromise = null;
let geminiModelRotationIndex = 0;

let spotifyAccessToken = null;
let spotifyTokenExpiry = null;

const normalizeGeminiModelName = (name = "") => name.replace(/^models\//, "");

const isSupportedGeminiModel = (model = {}) => {
  const name = (model.name || "").toLowerCase();
  if (!name.includes("gemini")) {
    return false;
  }
  if (name.includes("embedding") || name.includes("-pro")) {
    return false;
  }

  const supportedMethods = model.supportedGenerationMethods || [];
  return supportedMethods.includes("generateContent");
};

const fetchGeminiModels = async () => {
  const apiKey = process.env.GEMINI_API_TOKEN;
  if (!apiKey) {
    throw new Error("GEMINI_API_TOKEN is not configured");
  }

  const response = await axios.get(GEMINI_MODELS_ENDPOINT, {
    params: { key: apiKey },
  });

  const models = (response.data?.models || [])
    .filter(isSupportedGeminiModel)
    .map((model) => normalizeGeminiModelName(model.name));

  const uniqueModels = [...new Set(models)];

  if (!uniqueModels.length) {
    throw new Error("No supported Gemini models available");
  }

  return uniqueModels;
};

const getGeminiModels = async () => {
  const now = Date.now();
  const cacheAge = now - geminiModelCache.fetchedAt;
  if (geminiModelCache.models.length && cacheAge < GEMINI_MODEL_CACHE_TTL_MS) {
    return geminiModelCache.models;
  }

  if (geminiModelFetchPromise) {
    return geminiModelFetchPromise;
  }

  geminiModelFetchPromise = fetchGeminiModels()
    .then((models) => {
      geminiModelCache = { models, fetchedAt: Date.now() };
      return models;
    })
    .catch((error) => {
      console.error("Error fetching Gemini models:", error.message);
      if (geminiModelCache.models.length) {
        return geminiModelCache.models;
      }
      return FALLBACK_GEMINI_MODELS;
    })
    .finally(() => {
      geminiModelFetchPromise = null;
    });

  return geminiModelFetchPromise;
};

const getRotatedModels = (models, startIndex) => {
  const safeStartIndex = startIndex % models.length;
  return models.slice(safeStartIndex).concat(models.slice(0, safeStartIndex));
};

const getSpotifyAccessToken = async () => {
  if (spotifyAccessToken && spotifyTokenExpiry > Date.now()) {
    return spotifyAccessToken;
  }

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({ grant_type: "client_credentials" }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
          ).toString("base64")}`,
        },
      },
    );

    spotifyAccessToken = response.data.access_token;
    spotifyTokenExpiry = Date.now() + response.data.expires_in * 1000;

    return spotifyAccessToken;
  } catch (error) {
    console.error(
      "Error retrieving Spotify access token:",
      error.message,
      error.response?.data || "",
    );
    throw new Error("Failed to retrieve Spotify access token");
  }
};

// Music recommendation service
const getMusicRecommendation = async (searchTerm = "study") => {
  try {
    const accessToken = await getSpotifyAccessToken();

    // Use the search endpoint to search for tracks based on the search term
    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        q: searchTerm,
        type: "track",
        limit: 10,
      },
    });

    // Process the results to match the format used earlier
    return response.data.tracks.items.map((track) => ({
      name: track.name,
      artist: track.artists[0]?.name,
      preview_url: track.preview_url,
      spotify_url: track.external_urls.spotify,
      image_url: track.album.images[0]?.url,
    }));
  } catch (error) {
    console.error(
      "Error fetching music search results:",
      error.message,
      error.response?.data || "",
    );
    return [];
  }
};

// User services
const registerUser = async (userData) => {
  const {
    name,
    email,
    password,
    interests = [],
    availableTimes = [],
    courses = [],
  } = userData;

  // Check if required fields are provided
  if (!name || !email || !password) {
    throw new Error("Name, email, and password are required.");
  }

  try {
    // Create a new user instance with provided data
    const user = new User({
      name,
      email,
      password,
      interests,
      availableTimes,
      courses,
    });

    // Save the new user
    await user.save();

    // Generate a JWT token for the new user
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "72h",
    });
  } catch (error) {
    console.error("Error registering user:", error.message);
    throw new Error("User registration failed");
  }
};

const loginUser = async (email, password) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If the user is not found, throw an error
    if (!user) {
      throw new Error("User not found");
    }

    // Compare the entered password with the stored plain text password
    if (user.password !== password) {
      throw new Error("Invalid credentials");
    }

    // If the passwords match, generate and return a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return token;
  } catch (error) {
    console.error("Error logging in user:", error.message);
    throw new Error("Login failed");
  }
};

const getUserProfile = async (userId) => {
  try {
    return await User.findById(userId);
  } catch (error) {
    console.error("Error retrieving user profile:", error.message);
    throw new Error("Failed to retrieve user profile");
  }
};

const updateUserProfile = async (userId, updateData) => {
  try {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
  } catch (error) {
    console.error("Error updating user profile:", error.message);
    throw new Error("Failed to update profile");
  }
};

const searchUserProfiles = async (query) => {
  try {
    return await User.find({ name: new RegExp(query, "i") });
  } catch (error) {
    console.error("Error searching user profiles:", error.message);
    throw new Error("Failed to search user profiles");
  }
};

// Group and session services
const createGroup = async (members, course) => {
  try {
    const group = new Group({ members, course });
    await group.save();
    return group;
  } catch (error) {
    console.error("Error creating group:", error.message);
    throw new Error("Failed to create group");
  }
};

const createStudySession = async (groupId, date, musicMood) => {
  try {
    const group = await Group.findById(groupId);
    group.studySessions.push({ date, musicMood });
    await group.save();
    return group;
  } catch (error) {
    console.error("Error creating study session:", error.message);
    throw new Error("Failed to create study session");
  }
};

// AI chat service
let sessionHistory = {};

const chatWithAI = async (sessionId, message, originalText = "") => {
  const models = await getGeminiModels();
  if (!models.length) {
    throw new Error("No Gemini models available");
  }

  if (!sessionHistory[sessionId]) {
    sessionHistory[sessionId] = [];
  }

  let history = sessionHistory[sessionId];

  if (history.length === 0 && originalText) {
    history.push({ role: "user", parts: [{ text: originalText }] });
  }
  history.push({ role: "user", parts: [{ text: message }] });

  const orderedModels = getRotatedModels(models, geminiModelRotationIndex);
  let lastError = null;

  for (let index = 0; index < orderedModels.length; index += 1) {
    const modelName = orderedModels[index];
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: `${process.env.AI_INSTRUCTIONS}. Respond to the user conversationally.`,
      });
      const chatSession = model.startChat({ history });
      const result = await chatSession.sendMessage(message);

      if (!result.response || typeof result.response.text !== "function") {
        throw new Error("Failed to get a response from AI.");
      }

      const responseText = result.response.text();
      history.push({ role: "model", parts: [{ text: responseText }] });
      sessionHistory[sessionId] = history;

      const usedIndex = (geminiModelRotationIndex + index) % models.length;
      geminiModelRotationIndex = (usedIndex + 1) % models.length;

      return responseText;
    } catch (error) {
      lastError = error;
      console.error(`Error in AI chat with model ${modelName}:`, error);
    }
  }

  throw lastError || new Error("All Gemini models failed.");
};

const clearSessionHistory = (sessionId) => {
  try {
    delete sessionHistory[sessionId];
  } catch (error) {
    console.error("Error clearing session history:", error.message);
  }
};

// Weather service
const getWeather = async (city) => {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    // Ensure city name is provided
    if (!city) {
      throw new Error("City name is required");
    }

    // Make request to OpenWeather API
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: city,
          appid: apiKey,
          units: "metric",
        },
      },
    );

    // Extract necessary weather data from response
    const { name, main, weather } = response.data;

    return {
      city: name,
      temp: main.temp,
      condition: weather[0].main,
    };
  } catch (error) {
    console.error(
      "Error fetching weather data:",
      error.message,
      error.response?.data || "",
    );
    throw new Error("Failed to retrieve weather data");
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  searchUserProfiles,
  createGroup,
  createStudySession,
  getMusicRecommendation,
  chatWithAI,
  clearSessionHistory,
};

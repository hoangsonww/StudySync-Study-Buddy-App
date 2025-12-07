<template>
  <div class="home">
    <!-- Hero Section -->
    <div class="hero-section">
      <h1 class="hero-title">Welcome back, {{ username }}! 👋</h1>
      <p class="hero-subtitle">{{ currentDateTime }}</p>
    </div>

    <!-- Quick Access Cards -->
    <div class="quick-access-section">
      <h2 class="section-header">Quick Access</h2>
      <div class="quick-access-grid">
        <div class="access-card" @click="navigateTo('/materials')">
          <div
            class="access-icon"
            style="
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            "
          >
            <v-icon size="32" color="white">mdi-book-open-variant</v-icon>
          </div>
          <h3>Study Materials</h3>
          <p>Manage your files & notes</p>
        </div>
        <div class="access-card" @click="navigateTo('/quizzes')">
          <div
            class="access-icon"
            style="
              background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            "
          >
            <v-icon size="32" color="white">mdi-file-question</v-icon>
          </div>
          <h3>Quizzes</h3>
          <p>Test your knowledge</p>
        </div>
        <div class="access-card" @click="navigateTo('/progress')">
          <div
            class="access-icon"
            style="
              background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            "
          >
            <v-icon size="32" color="white">mdi-chart-line</v-icon>
          </div>
          <h3>Progress</h3>
          <p>Track your sessions</p>
        </div>
        <div class="access-card" @click="navigateTo('/goals')">
          <div
            class="access-icon"
            style="
              background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
            "
          >
            <v-icon size="32" color="white">mdi-target</v-icon>
          </div>
          <h3>Goals</h3>
          <p>Set & achieve goals</p>
        </div>
        <div class="access-card" @click="navigateTo('/planner')">
          <div
            class="access-icon"
            style="
              background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
            "
          >
            <v-icon size="32" color="white">mdi-calendar</v-icon>
          </div>
          <h3>Planner</h3>
          <p>Schedule your studies</p>
        </div>
        <div class="access-card" @click="navigateTo('/resources')">
          <div
            class="access-icon"
            style="
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            "
          >
            <v-icon size="32" color="white">mdi-link-variant</v-icon>
          </div>
          <h3>Resources</h3>
          <p>Learning materials</p>
        </div>
      </div>
    </div>

    <h2 class="section-header">Study Tools</h2>

    <div class="tools-grid">
      <!-- Music Recommendation Tool -->
      <div class="tool-card">
        <div class="tool-header">
          <v-icon color="#6366f1">mdi-music</v-icon>
          <h3>Music Recommendations</h3>
        </div>
        <input
          v-model="mood"
          type="text"
          placeholder="Enter mood or search a song..."
          @keyup.enter="getMusicRecommendations"
        />
        <button @click="getMusicRecommendations" class="action-button">
          Get Recommendations
        </button>

        <!-- Display loading spinner while fetching recommendations -->
        <div v-if="isLoadingMusic" class="loading-container">
          <span class="loading-spinner"></span>
          <p>Fetching recommendations...</p>
        </div>

        <!-- Display recommendations once loaded -->
        <div
          v-if="musicRecommendations.length && !isLoadingMusic"
          class="music-list"
        >
          <div
            class="music-track"
            v-for="(track, index) in musicRecommendations"
            :key="index"
          >
            <img :src="track.image_url" alt="Track Image" class="music-image" />
            <div class="track-info">
              <h4>{{ track.name }}</h4>
              <p>{{ track.artist }}</p>
              <a
                :href="track.spotify_url"
                target="_blank"
                class="spotify-button"
                >Listen on Spotify</a
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Pomodoro Timer -->
      <div class="tool-card pomodoro-card">
        <div class="tool-header">
          <v-icon color="#6366f1">mdi-timer</v-icon>
          <h3>Pomodoro Timer</h3>
        </div>
        <div class="pomodoro">
          <div class="timer-circle">
            <!-- SVG Progress Circle -->
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              class="progress-circle"
            >
              <circle cx="60" cy="60" r="54" class="background-circle" />
              <circle
                cx="60"
                cy="60"
                r="54"
                class="progress-bar"
                :style="{ strokeDashoffset: progress }"
              />
            </svg>
            <p>{{ timeLeft }}</p>
          </div>
          <button @click="toggleTimer">
            {{ isTimerRunning ? "Pause" : "Start" }}
          </button>
          <button @click="resetTimer">Reset</button>
        </div>
      </div>

      <!-- To-Do List -->
      <div class="tool-card todo-card">
        <div class="tool-header">
          <v-icon color="#6366f1">mdi-format-list-checks</v-icon>
          <h3>To-Do List</h3>
        </div>
        <input
          @keyup.enter="addTask"
          v-model="newTask"
          type="text"
          placeholder="Enter task"
        />
        <button @click="addTask" class="action-button">Add Task</button>
        <ul>
          <li v-for="(task, index) in tasks" :key="index" class="task-item">
            <span>{{ task }}</span>
            <button @click="removeTask(index)">Remove</button>
          </li>
        </ul>
      </div>

      <!-- Flashcards -->
      <div class="tool-card flashcard-card">
        <div class="tool-header">
          <v-icon color="#6366f1">mdi-cards</v-icon>
          <h3>Flashcards</h3>
        </div>
        <div
          v-for="(flashcard, index) in flashcards"
          :key="index"
          class="flashcard"
          @click="toggleFlashcard(index)"
        >
          <div
            :class="['flashcard-inner', flashcard.revealed ? 'revealed' : '']"
          >
            <div class="flashcard-front">
              <p>{{ flashcard.question }}</p>
            </div>
            <div class="flashcard-back">
              <p>{{ flashcard.answer }}</p>
            </div>
          </div>
        </div>
        <input
          v-model="flashcardQuestion"
          placeholder="Enter question"
          @keyup.enter="addFlashcard"
          required
        />
        <input
          v-model="flashcardAnswer"
          placeholder="Enter answer"
          @keyup.enter="addFlashcard"
          required
        />
        <button @click="addFlashcard" class="action-button">
          Add Flashcard
        </button>
      </div>

      <!-- Full Calculator UI -->
      <div class="tool-card calculator-card">
        <div class="tool-header">
          <v-icon color="#6366f1">mdi-calculator</v-icon>
          <h3>Calculator</h3>
        </div>
        <div class="calculator">
          <div class="display">
            <p>{{ calcDisplay }}</p>
          </div>
          <div class="buttons">
            <button @click="pressButton('7')">7</button>
            <button @click="pressButton('8')">8</button>
            <button @click="pressButton('9')">9</button>
            <button @click="pressButton('/')">/</button>
            <button @click="pressButton('4')">4</button>
            <button @click="pressButton('5')">5</button>
            <button @click="pressButton('6')">6</button>
            <button @click="pressButton('*')">*</button>
            <button @click="pressButton('1')">1</button>
            <button @click="pressButton('2')">2</button>
            <button @click="pressButton('3')">3</button>
            <button @click="pressButton('-')">-</button>
            <button @click="pressButton('0')">0</button>
            <button @click="pressButton('.')">.</button>
            <button @click="calculateResult">=</button>
            <button @click="pressButton('+')">+</button>
            <button @click="clearDisplay">C</button>
            <button @click="pressButton('%')">%</button>
            <button @click="calculateSquareRoot">√</button>
            <button @click="pressButton('^')">^</button>
          </div>
        </div>
      </div>

      <!-- Random Study Tip Generator -->
      <div class="tool-card tip-card">
        <div class="tool-header">
          <v-icon color="#6366f1">mdi-lightbulb</v-icon>
          <h3>Study Tips</h3>
        </div>
        <button @click="generateStudyTip" class="action-button">
          Get Study Tip
        </button>
        <p v-if="studyTip" style="margin-top: 10px; font-size: 18px">
          {{ studyTip }}
        </p>
      </div>

      <!-- Chat with AI Tool -->
      <div class="tool-card chat-ai-card">
        <div class="tool-header">
          <v-icon color="#6366f1">mdi-robot</v-icon>
          <h3>AI Assistant</h3>
        </div>
        <div class="card-content">
          <div class="chat-box">
            <div
              v-for="(message, index) in chatMessages"
              :key="index"
              :class="[
                'chat-message',
                message.isUser ? 'user-message' : 'ai-message',
              ]"
            >
              <p v-if="message.isUser">{{ message.text }}</p>
              <p v-else v-html="message.htmlText"></p>
            </div>

            <!-- Show a loading spinner if the AI is processing -->
            <div v-if="isLoadingAI" class="chat-message ai-message">
              <p><span class="loading-spinner"></span> AI is thinking...</p>
            </div>
          </div>
        </div>
        <input
          @keyup.enter="sendMessage"
          v-model="userMessage"
          placeholder="Type your message..."
        />
        <button @click="sendMessage" class="action-button">Send</button>
      </div>

      <div class="tool-card weather-card">
        <div class="tool-header">
          <v-icon color="white">mdi-weather-partly-cloudy</v-icon>
          <h3 style="color: white">Weather</h3>
        </div>
        <div class="input-suggestions-container">
          <!-- Input Field for City -->
          <input
            v-model="city"
            type="text"
            placeholder="Enter city"
            @input="fetchCitySuggestions"
            @keyup.enter="getWeather"
            style="color: white !important"
            required
          />

          <!-- City Suggestions Dropdown -->
          <ul v-if="citySuggestions.length" class="suggestions-list">
            <li
              v-for="(suggestion, index) in citySuggestions"
              :key="index"
              @click="selectCity(suggestion)"
            >
              {{ suggestion.displayName }}
            </li>
          </ul>
        </div>
        <button @click="getWeather" class="action-button">Check Weather</button>

        <!-- Show loading spinner while fetching weather -->
        <div v-if="isLoadingWeather" class="loading-container">
          <span class="loading-spinner"></span>
          <p>Loading weather data...</p>
        </div>

        <!-- Display weather details -->
        <div
          v-if="weather && weather.city && !isLoadingWeather"
          class="weather-info"
        >
          <!-- Render SVG weather icon based on condition -->
          <div class="weather-icon">
            <svg width="50" height="50" viewBox="0 0 24 24">
              <path :d="getWeatherIcon(weather.condition)" />
            </svg>
          </div>
          <div class="weather-details">
            <p class="weather-city">{{ weather.city }}</p>
            <p class="weather-temp">{{ weather.temp }}°C</p>
            <p class="weather-condition">{{ weather.condition }}</p>
          </div>
        </div>
      </div>

      <div class="tool-card notes-card">
        <div class="tool-header">
          <v-icon color="#6366f1">mdi-note-text</v-icon>
          <h3>Quick Notes</h3>
        </div>
        <textarea
          v-model="noteContent"
          placeholder="Type your note here..."
          @keyup.enter="saveNote"
        ></textarea>
        <button @click="saveNote" class="action-button">Save Note</button>
        <div class="saved-notes" v-if="savedNotes.length">
          <h4>Saved Notes:</h4>
          <div
            class="note-item"
            v-for="(note, index) in savedNotes"
            :key="index"
          >
            <p>{{ note }}</p>
            <button @click="deleteNote(index)" class="delete-note-button">
              Delete
            </button>
          </div>
        </div>
      </div>

      <div class="tool-card motivation-card">
        <div class="tool-header">
          <v-icon color="#6366f1">mdi-heart</v-icon>
          <h3>Daily Motivation</h3>
        </div>
        <p style="margin-top: 10px" v-if="motivationalQuote">
          {{ motivationalQuote }}
        </p>
        <button @click="getMotivation" class="action-button">New Quote</button>
      </div>

      <!-- Time Tracker -->
      <div class="tool-card time-tracker-card">
        <div class="tool-header">
          <v-icon color="#6366f1">mdi-clock-time-four</v-icon>
          <h3 style="color: white">Study Time Tracker</h3>
        </div>
        <div class="card-content">
          <p style="margin-bottom: 15px; color: white">
            Track your study time today
          </p>
          <div v-if="!isTrackingTime">
            <button @click="startTimeTracking" class="action-button">
              Start Tracking
            </button>
          </div>
          <div v-else>
            <div
              style="
                font-size: 32px;
                font-weight: bold;
                margin: 20px 0;
                color: white;
              "
            >
              {{ trackedTime }}
            </div>
            <button
              @click="stopTimeTracking"
              class="action-button"
              style="background-color: #ef4444"
            >
              Stop Tracking
            </button>
          </div>
          <div
            v-if="totalStudyTimeToday"
            style="
              margin-top: 15px;
              padding-top: 15px;
              border-top: 1px solid rgba(255, 255, 255, 0.2);
            "
          >
            <p style="color: white">
              <strong>Total today:</strong> {{ totalStudyTimeToday }}
            </p>
          </div>
        </div>
      </div>

      <!-- Quick Link Bookmarks -->
      <div class="tool-card bookmarks-card">
        <div class="tool-header">
          <v-icon color="#6366f1">mdi-bookmark-multiple</v-icon>
          <h3>Quick Bookmarks</h3>
        </div>
        <div class="card-content">
          <div class="bookmark-input">
            <input
              v-model="newBookmarkName"
              placeholder="Bookmark name"
              @keyup.enter="addBookmark"
            />
            <input
              v-model="newBookmarkUrl"
              placeholder="URL"
              @keyup.enter="addBookmark"
            />
            <button @click="addBookmark" class="action-button">
              Add Bookmark
            </button>
          </div>
          <ul class="bookmarks-list">
            <li
              v-for="(bookmark, index) in bookmarks"
              :key="index"
              class="bookmark-item"
            >
              <a :href="bookmark.url" target="_blank" rel="noopener noreferrer">
                <v-icon size="small" color="#6366f1">mdi-link</v-icon>
                {{ bookmark.name }}
              </a>
              <button @click="deleteBookmark(index)" class="delete-btn">
                <v-icon size="small">mdi-close</v-icon>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import api from "../api";
import { mapState } from "vuex";
import { marked } from "marked";
import {
  mdiWeatherSunny,
  mdiWeatherRainy,
  mdiWeatherCloudy,
  mdiWeatherSnowy,
  mdiWeatherLightning,
  mdiWeatherFog,
  mdiWeatherPartlyCloudy,
} from "@mdi/js";

export default {
  data() {
    return {
      username: "",
      currentDateTime: "", // For displaying current date and time
      timerInterval: null, // To manage the interval for updating date and time
      mood: "",
      citySuggestions: [],
      musicRecommendations: [],
      isTimerRunning: false,
      timeLeft: "25:00",
      interval: null,
      minutes: 25,
      seconds: 0,
      totalTime: 25 * 60, // Total time in seconds for 25 minutes
      elapsed: 0, // Time elapsed in seconds
      progress: 339.292, // Full circumference of the circle
      newTask: "",
      tasks: [],
      flashcardQuestion: "",
      flashcardAnswer: "",
      flashcards: [],
      calcDisplay: "",
      studyTip: "",
      userMessage: "",
      chatMessages: [], // Initialize chatMessages as an empty array
      sessionId: "1", // Use a unique session ID if needed
      motivationalQuote: "",
      weather: null,
      savedNotes: [],
      isLoadingAI: false,
      isLoadingMusic: false,
      isTrackingTime: false,
      trackedTime: "00:00:00",
      trackingInterval: null,
      trackingSeconds: 0,
      totalStudyTimeToday: "",
      newBookmarkName: "",
      newBookmarkUrl: "",
      bookmarks: [],
      isLoadingWeather: false,
    };
  },
  computed: {
    ...mapState(["token"]), // Map the token from Vuex store
    progressCircleOffset() {
      const remainingTime = this.minutes * 60 + this.seconds;
      const progressPercent = remainingTime / this.totalTime;
      return 339.292 * (1 - progressPercent); // 339.292 is the circumference
    },
  },
  created() {
    this.fetchUsername();
    this.updateDateTime();
    this.timerInterval = setInterval(this.updateDateTime, 1000);
    this.getMotivation(); // Load initial quote
    this.loadBookmarks();
    this.loadTotalStudyTime();
    if (!this.token) {
      alert("You need to log in first!");
      this.$router.push("/login");
    }
  },
  beforeRouteEnter(to, from, next) {
    // Use the next callback with a function to ensure the alert is shown before the redirect
    next((vm) => {
      if (!vm.token) {
        alert("You need to log in first!"); // Show alert
        vm.$router.push("/landing"); // Then redirect
      } else {
        next(); // Proceed to the route if authenticated
      }
    });
  },
  beforeUnmount() {
    clearInterval(this.timerInterval); // Clear interval on component destruction
  },
  methods: {
    updateDateTime() {
      const now = new Date();

      // Get day of the week, month, day with ordinal suffix, year, and time
      const dayOfWeek = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
      }).format(now);
      const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
        now,
      );
      const day = now.getDate();
      const year = now.getFullYear();

      // Helper function to add ordinal suffix to day
      const getOrdinalSuffix = (day) => {
        if (day > 3 && day < 21) return `${day}th`; // Special case for teens
        switch (day % 10) {
          case 1:
            return `${day}st`;
          case 2:
            return `${day}nd`;
          case 3:
            return `${day}rd`;
          default:
            return `${day}th`;
        }
      };

      // Format time as hh:mm:ss AM/PM
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const amPm = hours >= 12 ? "PM" : "AM";
      const formattedTime = `${hours % 12 || 12}:${minutes}:${seconds} ${amPm}`;

      // Format the full date and time string
      this.currentDateTime = `${dayOfWeek}, ${month} ${getOrdinalSuffix(day)}, ${year} - ${formattedTime}`;
    },
    async fetchCitySuggestions() {
      if (this.city.length < 2) {
        this.citySuggestions = [];
        return;
      }
      try {
        const response = await axios.get(
          `https://studysync-backend-api.vercel.app/api/cities?query=${this.city}`,
        );
        this.citySuggestions = response.data.cities.map((city) => ({
          displayName: `${city.name}, ${city.state ? city.state + ", " : ""}${city.country}`,
          fullCity: city,
        }));
      } catch (error) {
        console.error("Error fetching city suggestions:", error);
      }
    },
    selectCity(suggestion) {
      this.city = suggestion.fullCity.name; // Set the input value to just the city name
      this.citySuggestions = []; // Clear suggestions after selection
      this.getWeather(); // Fetch the weather data based on the selected city
    },
    async fetchUsername() {
      try {
        const token = this.token;
        if (!token) {
          console.error("Authorization token not found.");
          this.username = "Guest";
          return;
        }

        // Make an API request to get the user's profile
        const response = await axios.get(
          "https://studysync-backend-api.vercel.app/api/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        // Check if response is successful and contains the user object
        if (response.data.success && response.data.user) {
          this.username = response.data.user.name || "Guest";
        } else {
          console.error("Failed to retrieve user profile");
          this.username = "Guest";
        }
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
        this.username = "Guest";
      }
    },
    async sendMessage() {
      if (this.userMessage.trim()) {
        // Add the user's message to the chat history
        this.chatMessages.push({ text: this.userMessage, isUser: true });
        this.isLoadingAI = true;

        try {
          // Make the API call to get the AI's response
          const response = await api.post(
            "/ai-chat",
            { sessionId: this.sessionId, message: this.userMessage },
            { headers: { Authorization: `Bearer ${this.token}` } },
          );

          // If the API response is successful, parse the response as markdown
          if (response.data.success && response.data.response) {
            const markdownText = response.data.response;
            const htmlText = marked(markdownText); // Parse markdown to HTML

            this.chatMessages.push({
              text: markdownText,
              htmlText,
              isUser: false,
            }); // Store both raw and HTML formats
          } else {
            this.chatMessages.push({
              text: "I'm sorry, I couldn't get a response from the AI.",
              isUser: false,
            });
          }
        } catch (error) {
          console.error("Error fetching AI response:", error.message);
          this.chatMessages.push({
            text: "Error: Could not connect to the AI service.",
            isUser: false,
          });
        } finally {
          this.isLoadingAI = false; // Reset loading state
        }

        this.userMessage = ""; // Clear input after sending
      }
    },
    toggleTimer() {
      if (this.isTimerRunning) {
        clearInterval(this.interval);
        this.isTimerRunning = false;
      } else {
        this.startTimer();
      }
    },
    startTimer() {
      this.isTimerRunning = true;
      this.interval = setInterval(() => {
        if (this.seconds === 0 && this.minutes === 0) {
          clearInterval(this.interval);
          this.isTimerRunning = false;
          alert("Pomodoro session is complete!");
        } else {
          if (this.seconds === 0) {
            this.seconds = 59;
            this.minutes--;
          } else {
            this.seconds--;
          }

          // Update the timeLeft and progress dynamically
          this.timeLeft = `${this.formatTime(this.minutes)}:${this.formatTime(this.seconds)}`;
          this.progress = this.progressCircleOffset; // Update the progress value
        }
      }, 1000);
    },
    formatTime(time) {
      return time < 10 ? `0${time}` : time;
    },
    resetTimer() {
      clearInterval(this.interval);
      this.isTimerRunning = false;
      this.minutes = 25;
      this.seconds = 0;
      this.timeLeft = "25:00";
      this.elapsed = 0;
      this.progress = 339.292; // Reset progress to full circumference
    },
    addTask() {
      if (this.newTask.trim()) {
        this.tasks.push(this.newTask);
        this.newTask = "";
      }
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    },
    addFlashcard() {
      if (this.flashcardQuestion.trim() && this.flashcardAnswer.trim()) {
        this.flashcards.push({
          question: this.flashcardQuestion,
          answer: this.flashcardAnswer,
          revealed: false,
        });
        this.flashcardQuestion = "";
        this.flashcardAnswer = "";
      }
    },
    toggleFlashcard(index) {
      this.flashcards[index].revealed = !this.flashcards[index].revealed;
    },
    async getMusicRecommendations() {
      try {
        this.isLoadingMusic = true;

        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }
        const response = await axios.get(
          `https://studysync-backend-api.vercel.app/api/music?searchTerm=${this.mood}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (response.data.success) {
          this.musicRecommendations = response.data.recommendations;
        } else {
          console.error("Failed to fetch recommendations");
        }
      } catch (error) {
        console.error("Error fetching music recommendations:", error);
      } finally {
        this.isLoadingMusic = false;
      }
    },
    getWeatherIcon(condition) {
      // Map weather condition to MDI icons
      const iconMapping = {
        Clear: mdiWeatherSunny,
        Rain: mdiWeatherRainy,
        Clouds: mdiWeatherCloudy,
        Snow: mdiWeatherSnowy,
        Thunderstorm: mdiWeatherLightning,
        Drizzle: mdiWeatherPartlyCloudy,
        Mist: mdiWeatherFog,
        Fog: mdiWeatherFog,
      };
      return iconMapping[condition] || mdiWeatherPartlyCloudy;
    },
    async getWeather() {
      try {
        this.isLoadingWeather = true;

        if (!this.city) {
          alert("Please enter a city name");
          return;
        }

        // Call the backend API for weather data
        const response = await axios.get(
          `https://studysync-backend-api.vercel.app/api/weather?city=${this.city}`,
        );

        // Check if the response was successful and contains data
        if (response.data.success && response.data.data) {
          const { city, temp, condition } = response.data.data;
          this.weather = {
            city,
            temp: Math.round(temp), // Round temperature to nearest integer
            condition,
          };
        } else {
          alert("Weather data could not be retrieved. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        alert(
          "Failed to retrieve weather data. Please check your city name and try again.",
        );
      } finally {
        this.isLoadingWeather = false;
      }
    },
    saveNote() {
      if (this.noteContent.trim()) {
        this.savedNotes.push(this.noteContent); // Append the new note
        this.noteContent = ""; // Clear the input
      }
    },
    deleteNote(index) {
      this.savedNotes.splice(index, 1); // Remove note at the specified index
    },
    getMotivation() {
      const quotes = [
        "Believe you can and you're halfway there.",
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "Hardships often prepare ordinary people for an extraordinary destiny.",
        "Don't watch the clock; do what it does. Keep going.",
        "The only limit to our realization of tomorrow will be our doubts of today.",
        "It always seems impossible until it’s done.",
        "Dream big and dare to fail.",
        "Act as if what you do makes a difference. It does.",
        "The future depends on what you do today.",
        "You are never too old to set another goal or to dream a new dream.",
        "Keep your face always toward the sunshine—and shadows will fall behind you.",
        "Start where you are. Use what you have. Do what you can.",
        "Success is stumbling from failure to failure with no loss of enthusiasm.",
        "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
        "Opportunities don't happen. You create them.",
        "The harder the conflict, the greater the triumph.",
        "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
        "Happiness is not something ready-made. It comes from your own actions.",
        "Life is 10% what happens to us and 90% how we react to it.",
        "Do something today that your future self will thank you for.",
        "Courage doesn’t always roar. Sometimes it’s the quiet voice at the end of the day saying, ‘I will try again tomorrow.’",
        "The way to get started is to quit talking and begin doing.",
        "Don't let yesterday take up too much of today.",
        "You don’t have to be great to start, but you have to start to be great.",
        "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
        "If you want something you’ve never had, you must be willing to do something you’ve never done.",
        "Challenges are what make life interesting, and overcoming them is what makes life meaningful.",
        "You are braver than you believe, stronger than you seem, and smarter than you think.",
        "The best way to predict the future is to create it.",
        "Success is not the key to happiness. Happiness is the key to success.",
        "Small steps in the right direction can turn out to be the biggest step of your life.",
        "A journey of a thousand miles begins with a single step.",
        "Failure is the opportunity to begin again, this time more intelligently.",
        "Great things never come from comfort zones.",
        "Strive for progress, not perfection.",
        "Doubt kills more dreams than failure ever will.",
        "Your limitation—it’s only your imagination.",
        "Push yourself, because no one else is going to do it for you.",
        "Dream it. Wish it. Do it.",
        "It’s going to be hard, but hard does not mean impossible.",
        "Don’t stop when you’re tired. Stop when you’re done.",
        "Wake up with determination. Go to bed with satisfaction.",
        "Do something today that will make your future self proud.",
        "Little things make big days.",
        "Don’t wait for opportunity. Create it.",
        "Failure is not the opposite of success; it’s part of success.",
        "We don’t grow when things are easy; we grow when we face challenges.",
        "Work hard in silence. Let your success be your noise.",
        "If it doesn’t challenge you, it won’t change you.",
        "Success usually comes to those who are too busy to be looking for it.",
        "Never give up on a dream just because of the time it will take to accomplish it. The time will pass anyway.",
        "The secret of getting ahead is getting started.",
        "What you get by achieving your goals is not as important as what you become by achieving your goals.",
        "The expert in anything was once a beginner.",
        "Don’t be afraid to give up the good to go for the great.",
        "Your time is limited, so don’t waste it living someone else’s life.",
        "I am not a product of my circumstances. I am a product of my decisions.",
        "Do what you can with all you have, wherever you are.",
        "Perseverance is not a long race; it is many short races one after the other.",
        "Success is how high you bounce when you hit bottom.",
        "Don’t count the days; make the days count.",
        "Strength doesn’t come from what you can do. It comes from overcoming the things you once thought you couldn’t.",
        "You miss 100% of the shots you don’t take.",
        "In the middle of every difficulty lies opportunity.",
        "Be so good they can’t ignore you.",
        "Believe in the power of yet: ‘I don’t understand this… yet.’",
        "Hustle until your haters ask if you’re hiring.",
        "Fall seven times, stand up eight.",
        "You are capable of amazing things.",
        "Success isn’t about how much money you make; it’s about the difference you make in people’s lives.",
        "Start each day with a positive thought and a grateful heart.",
        "Focus on being productive instead of busy.",
        "The best way to achieve your dreams is to wake up.",
      ];
      this.motivationalQuote =
        quotes[Math.floor(Math.random() * quotes.length)];
    },
    generateStudyTip() {
      const tips = [
        "Take regular breaks to stay fresh.",
        "Stay hydrated and eat healthy snacks.",
        "Practice active recall for better retention.",
        "Set realistic study goals and stick to them.",
        "Teach what you've learned to others.",
        "Use mnemonic devices to remember complex information.",
        "Organize your study space to minimize distractions.",
        "Set specific times for studying and stick to a schedule.",
        "Review your notes within 24 hours to reinforce learning.",
        "Break down large tasks into smaller, manageable steps.",
        "Use flashcards for quick review and memorization.",
        "Study in intervals with the Pomodoro technique (25 mins work, 5 mins break).",
        "Test yourself frequently to gauge your understanding.",
        "Summarize what you’ve learned in your own words.",
        "Use visualization techniques to connect concepts.",
        "Group similar topics together to improve understanding.",
        "Listen to instrumental music or white noise to stay focused.",
        "Create mind maps to visually organize information.",
        "Turn off notifications on your phone to stay focused.",
        "Reward yourself after completing study sessions.",
        "Experiment with different learning techniques to find what works best for you.",
        "Get enough sleep to consolidate what you’ve learned.",
        "Stay positive and remind yourself of your goals.",
        "Study with a friend or in a group for collaborative learning.",
        "Use digital tools like apps and websites to stay organized.",
        "Keep a dedicated notebook or folder for each subject.",
        "Color-code your notes for better visual recall.",
        "Set daily, weekly, and monthly goals to track your progress.",
        "Revise your notes regularly to reinforce learning.",
        "Practice past exams to get familiar with the question format.",
        "Avoid multitasking—focus on one topic at a time.",
        "Use spaced repetition to retain information longer.",
        "Record yourself explaining a topic and play it back to review.",
        "Read aloud while studying to enhance memory.",
        "Relate what you're studying to real-world examples.",
        "Study the hardest subjects first when your energy is high.",
        "Use apps like Quizlet or Anki to create digital flashcards.",
        "Set timers to avoid burnout and stay disciplined.",
        "Turn complex topics into simple analogies to better understand them.",
        "Keep a study journal to reflect on your progress.",
        "Sit in a chair and desk instead of studying on your bed.",
        "Use diagrams and charts to simplify complex ideas.",
        "Break your notes into bullet points for easier review.",
        "Find online lectures or tutorials for difficult topics.",
        "Join a study group to share ideas and learn collaboratively.",
        "Use positive affirmations to boost your confidence.",
        "Take handwritten notes instead of typing—they improve retention.",
        "Visualize your goals to stay motivated.",
        "Take a short walk after studying to clear your mind.",
        "Ask questions if you're struggling to understand something.",
        "Use a to-do list to prioritize your study tasks.",
        "Avoid caffeine late at night to ensure quality sleep.",
        "Review your syllabus or curriculum to stay aligned with objectives.",
        "Use sticky notes to highlight key points in your study space.",
        "Divide long study sessions into themed blocks.",
        "Find a study buddy to stay accountable.",
        "Use a whiteboard to brainstorm and connect ideas.",
        "Keep your study sessions distraction-free by using website blockers.",
        "Review material just before sleeping—it helps with retention.",
        "Learn by teaching—explain topics to someone else.",
        "Use acronyms or rhymes to memorize lists.",
        "Create summaries for every chapter or topic you cover.",
        "Alternate subjects to keep your brain engaged.",
        "Stay consistent by studying at the same time each day.",
        "Keep healthy snacks like nuts or fruits nearby for quick energy.",
        "Study in a quiet, well-lit environment for better focus.",
        "Take deep breaths to stay calm during stressful sessions.",
        "Learn the meanings behind concepts instead of rote memorization.",
        "Experiment with different seating arrangements for comfort.",
        "Find motivational quotes and keep them visible in your study area.",
        "Reward yourself with small treats after finishing a session.",
        "Avoid overloading your schedule; give yourself time to relax.",
        "Identify your peak productivity hours and study during that time.",
        "Reduce screen time before bed to improve sleep quality.",
        "Try different learning styles—visual, auditory, or kinesthetic.",
        "Stay curious and ask, 'Why does this work?' to deepen understanding.",
        "Avoid procrastination by setting firm deadlines.",
        "Work on improving your weak areas first.",
        "Break study topics into small, digestible chunks.",
        "Use online resources like YouTube or Khan Academy for tutorials.",
        "Mix up your study environment to prevent monotony.",
        "Maintain a balance between study, exercise, and social time.",
        "Create a positive association with studying by making it enjoyable.",
        "Write practice questions to test yourself later.",
        "Revise frequently to move information to long-term memory.",
        "Switch between high-effort and low-effort tasks to prevent burnout.",
        "Limit social media usage during study hours.",
        "Identify and eliminate bad study habits.",
      ];
      this.studyTip = tips[Math.floor(Math.random() * tips.length)];
    },
    pressButton(value) {
      this.calcDisplay += value; // Append the button's value to the display
    },
    calculateResult() {
      try {
        // Replace `^` with `**` for exponentiation
        let expression = this.calcDisplay.replace(/\^/g, "**");

        // Handle percentages: Replace "number%" with "number / 100"
        expression = expression.replace(/(\d+)%/g, "($1/100)");

        // Use Function constructor to safely evaluate the expression
        const result = Function(`"use strict"; return (${expression})`)();

        // Check if the result is a valid number
        if (!isNaN(result)) {
          this.calcDisplay = result.toString();
        } else {
          this.calcDisplay = "Error";
        }
      } catch (e) {
        this.calcDisplay = "Error"; // Handle errors gracefully
      }
    },
    clearDisplay() {
      this.calcDisplay = ""; // Clear the display
    },
    calculateSquareRoot() {
      try {
        // Parse the current display value and calculate its square root
        const value = parseFloat(this.calcDisplay);
        if (!isNaN(value)) {
          this.calcDisplay = Math.sqrt(value).toString(); // Update display with the square root
        } else {
          this.calcDisplay = "Error"; // Handle invalid input
        }
      } catch (e) {
        this.calcDisplay = "Error"; // Handle unexpected errors
      }
    },
    navigateTo(path) {
      this.$router.push(path);
    },
    startTimeTracking() {
      this.isTrackingTime = true;
      this.trackingSeconds = 0;
      this.trackingInterval = setInterval(() => {
        this.trackingSeconds++;
        const hours = Math.floor(this.trackingSeconds / 3600);
        const minutes = Math.floor((this.trackingSeconds % 3600) / 60);
        const seconds = this.trackingSeconds % 60;
        this.trackedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
      }, 1000);
    },
    stopTimeTracking() {
      this.isTrackingTime = false;
      if (this.trackingInterval) {
        clearInterval(this.trackingInterval);
      }
      // Save to local storage
      const today = new Date().toDateString();
      const stored = localStorage.getItem("studyTimeData");
      let timeData = stored ? JSON.parse(stored) : {};
      timeData[today] = (timeData[today] || 0) + this.trackingSeconds;
      localStorage.setItem("studyTimeData", JSON.stringify(timeData));
      this.loadTotalStudyTime();
      this.trackingSeconds = 0;
      this.trackedTime = "00:00:00";
    },
    loadTotalStudyTime() {
      const today = new Date().toDateString();
      const stored = localStorage.getItem("studyTimeData");
      if (stored) {
        const timeData = JSON.parse(stored);
        const totalSeconds = timeData[today] || 0;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        this.totalStudyTimeToday = `${hours}h ${minutes}m`;
      }
    },
    addBookmark() {
      if (this.newBookmarkName.trim() && this.newBookmarkUrl.trim()) {
        let url = this.newBookmarkUrl.trim();
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
          url = "https://" + url;
        }
        this.bookmarks.push({
          name: this.newBookmarkName.trim(),
          url: url,
        });
        localStorage.setItem("studyBookmarks", JSON.stringify(this.bookmarks));
        this.newBookmarkName = "";
        this.newBookmarkUrl = "";
      }
    },
    deleteBookmark(index) {
      this.bookmarks.splice(index, 1);
      localStorage.setItem("studyBookmarks", JSON.stringify(this.bookmarks));
    },
    loadBookmarks() {
      const stored = localStorage.getItem("studyBookmarks");
      if (stored) {
        this.bookmarks = JSON.parse(stored);
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");

.home {
  padding: 0;
  font-family: "Inter", sans-serif;
  background: #f8fafc;
  width: 100%;
  min-height: 100vh;
}

.hero-section {
  background: linear-gradient(135deg, #f5f7fa 0%, #e3e9f0 100%);
  padding: 60px 32px;
  text-align: center;
  color: #2c3e50;
}

.hero-title {
  font-size: 2.5em;
  font-weight: 800;
  margin: 0 0 12px 0;
}

.hero-subtitle {
  font-size: 1.1em;
  opacity: 0.95;
  margin: 0;
  font-weight: 500;
}

.section-header {
  font-size: 1.75em;
  font-weight: 700;
  color: #1e293b;
  margin: 48px 32px 24px;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 24px;
  padding: 0 32px 48px;
  max-width: 1600px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 40px 20px;
  }

  .hero-title {
    font-size: 1.75em;
  }

  .section-header {
    font-size: 1.5em;
    margin: 32px 20px 20px;
  }

  .quick-access-section {
    padding: 32px 20px;
  }

  .quick-access-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .tools-grid {
    grid-template-columns: 1fr;
    padding: 0 20px 32px;
    gap: 20px;
  }

  .tool-card {
    padding: 24px;
  }
}

.tool-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 28px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
}

.tool-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px);
}

.tool-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.tool-header h3 {
  font-size: 1.35em;
  font-weight: 700;
  margin: 0;
  color: #1e293b;
}

.tool-card input,
.tool-card textarea {
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 0.95em;
  transition: all 0.2s ease;
  font-family: "Inter", sans-serif;
  width: 100%;
  box-sizing: border-box;
}

.tool-card input:focus,
.tool-card textarea:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.card-content {
  flex: 1;
  overflow-y: auto;
  padding: 0.5em 0;
}

.action-button {
  background: #6366f1;
  color: white;
  padding: 13px 24px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  margin-top: 16px;
  font-weight: 600;
  font-size: 0.95em;
  font-family: "Inter", sans-serif;
}

.action-button:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

/* Music Card */
.music-card {
  background: linear-gradient(
    135deg,
    #ff7e5f,
    #feb47b
  ); /* Gradient background */
  color: #fff;
  border-radius: 15px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2); /* Soft shadow for 3D effect */
  padding: 1.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  min-height: 400px; /* Minimum height to ensure space for content */
  overflow: hidden; /* Prevent content overflow outside the card */
}

.music-card h3 {
  margin-bottom: 1em;
}

.music-card input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #fff;
  color: #333;
  background: rgba(255, 255, 255, 0.6);
  font-size: 1.1em;
  transition: background-color 0.3s ease;
}

.music-card input:focus {
  background-color: #ffffff; /* Lighter background on focus */
}

.music-list {
  width: 100%;
  margin-top: 2em;
  max-height: 400px; /* Set a max height to allow for scrolling */
  overflow-y: auto; /* Enable scrolling if content exceeds max-height */
  animation: slideIn 1s ease-out; /* Smooth slide-in effect */
}

.music-track {
  display: flex;
  align-items: center;
  margin-bottom: 1em;
  background: rgba(255, 255, 255, 0.1);
  padding: 1em;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.music-track:hover {
  transform: translateY(-5px); /* Slight elevation on hover */
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25); /* Darker shadow on hover */
}

.music-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin-right: 1em;
  transition: transform 0.3s ease; /* Smooth animation on image hover */
}

.music-image:hover {
  transform: scale(1.1); /* Slight zoom on hover */
}

.track-info h4 {
  font-size: 1.1em;
  margin: 0.5em 0;
  animation: fadeIn 0.8s ease-out; /* Fade-in animation for track title */
}

.track-info p {
  color: #aaa;
  font-size: 0.9em;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #3498db;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spotify-button {
  display: inline-block;
  background: #1db954;
  color: #fff;
  padding: 8px 12px;
  border-radius: 20px;
  text-decoration: none;
  font-size: 0.9em;
  margin-top: 1em;
  transition:
    background 0.3s ease,
    transform 0.3s ease;
}

.spotify-button:hover {
  background: #1ed760; /* Darker green on hover */
  transform: scale(1.05); /* Slight zoom effect */
}

/* Pomodoro Timer */
.pomodoro-card {
  background: #ffeb3b;
  color: #333;
  text-align: center;
}

.timer-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1em auto;
  font-size: 1.5em;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.pomodoro button {
  background: #f44336;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 5px;
}

.timer-circle {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 1em auto;
}

.timer-circle svg {
  position: absolute;
  top: 0;
  left: 0;
  transform: rotate(-90deg);
}

.background-circle {
  fill: none;
  stroke: #ddd;
  stroke-width: 12;
}

.progress-bar {
  fill: none;
  stroke: #f44336;
  stroke-width: 12;
  stroke-linecap: round;
  stroke-dasharray: 339.292; /* Circumference of the circle (2 * π * 54) */
  transition: stroke-dashoffset 0.3s ease;
}

.timer-circle p {
  position: relative;
  z-index: 1;
  font-size: 1.5em;
  color: #333;
  line-height: 120px;
}

/* To-Do List */
.todo-card {
  background: #2ecc71;
  color: #fff;
  text-align: center;
}

.todo-card input {
  width: 100%;
  padding: 10px;
  margin-top: 1em;
  border: 0.5px solid #333;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.6);
}

.task-item {
  display: flex;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5em;
  border-radius: 5px;
  margin-top: 0.5em;
}

.task-item button {
  background: #e74c3c;
  color: #fff;
  border-radius: 3px;
  padding: 3px 8px;
}

/* Flashcards */
.flashcard-card {
  background: #f1c40f;
  color: #333;
  text-align: center;
}

.flashcard-card input {
  width: 100%;
  padding: 10px;
  margin-top: 1em;
  border: 0.5px solid #333;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.6);
}

.flashcard {
  perspective: 1000px;
  cursor: pointer;
  margin-top: 1em;
}

.flashcard-inner {
  position: relative;
  width: 100%;
  height: 120px;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flashcard-inner.revealed {
  transform: rotateY(180deg);
}

.flashcard-front,
.flashcard-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 1.1em;
}

.flashcard-front {
  background-color: #3498db;
  color: #2c3e50;
}

.flashcard-back {
  background-color: #27ae60;
  color: #2c3e50;
  transform: rotateY(180deg);
}

/* Calculator */
.calculator-card {
  background: linear-gradient(135deg, #e8eef5, #d5dce6);
  color: #2c3e50;
  text-align: center;
}

.calculator .display {
  background: white;
  padding: 1em;
  font-size: 1.5em;
  text-align: right;
  border-radius: 8px;
  margin-bottom: 1em;
  margin-top: 0.5em;
  color: #2c3e50;
  border: 2px solid #bdc3c7;
}

.calculator .buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.calculator .buttons button {
  background: white;
  color: #2c3e50;
  font-size: 1.2em;
  padding: 15px;
  border-radius: 8px;
  transition: all 0.3s ease;
  border: 1px solid #ddd;
  font-weight: 600;
}

.calculator .buttons button:hover {
  background: #6366f1;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(99, 102, 241, 0.3);
}

/* Study Tip Card */
.tip-card {
  background: #ff6f61;
  color: #fff;
  text-align: center;
}

.tip-card button {
  background: #e74c3c;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 1em;
}

/* Chat AI Card */
.chat-ai-card {
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  color: #2c3e50;
  padding: 1em;
  text-align: center;
}

.chat-box {
  background: white;
  min-height: 300px;
  max-height: 600px;
  padding: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  word-wrap: break-word;
  border: 2px solid #e3f2fd;
}

.chat-ai-card input {
  width: 100%;
  padding: 10px;
  margin-top: 1em;
  border: 2px solid #90caf9;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.chat-message {
  max-width: 100%;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
  padding: 8px 12px;
  border-radius: 8px;
}

.chat-message p {
  margin: 0;
  white-space: pre-wrap;
}

.user-message {
  align-self: flex-end;
  background-color: #6366f1;
  color: white;
  max-width: 100%;
}

.ai-message {
  align-self: flex-start;
  background-color: #e3f2fd;
  color: #2c3e50;
  max-width: 100%;
  text-align: start;
}

.chat-message,
.task-item,
.music-track,
.flashcard,
.saved-note,
.motivational-quote {
  overflow-wrap: break-word;
  word-break: break-word;
  padding: 8px;
  border-radius: 8px;
}

.chat-message p,
.task-item span,
.flashcard-front p,
.flashcard-back p,
.saved-note p {
  white-space: normal;
}

.weather-card {
  background: linear-gradient(135deg, #e1f5fe, #b3e5fc);
  color: #01579b;
  padding: 1.5em;
  text-align: center;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.weather-card h3 {
  color: #01579b;
}

.weather-card input {
  width: 100%;
  padding: 10px;
  margin-top: 1em;
  border: 2px solid #4fc3f7;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #2c3e50;
}

.weather-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.weather-info {
  margin-top: 1.5em;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 15px;
  animation: fadeIn 0.5s ease-in-out;
}

.weather-icon svg {
  fill: #fbbf24;
  animation: pulse 1.5s infinite;
}

.weather-details {
  text-align: left;
}

.weather-city {
  font-size: 1.2em;
  font-weight: 600;
}

.weather-temp {
  font-size: 2em;
  font-weight: bold;
  margin: 0.2em 0;
}

.weather-condition {
  font-size: 1em;
  font-style: italic;
  color: #a0c4ff;
}

.weather-card {
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  color: #fff;
  padding: 1.5em;
  text-align: center;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  position: relative; /* For positioning suggestions */
}

.weather-card input {
  width: 100%;
  padding: 10px;
  margin-top: 1em;
  border-radius: 5px;
  border: 0.5px solid #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #2c3e50;
}

.input-suggestions-container {
  position: relative;
}

.suggestions-list {
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  position: absolute;
  width: 100%;
  top: 100%; /* Positions the list directly below the input */
  left: 0;
  list-style-type: none;
  padding: 0;
  margin: 0;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  max-height: 150px;
  overflow-y: auto;
  z-index: 10; /* Ensures dropdown appears above other elements */
}

.suggestions-list li {
  padding: 10px;
  cursor: pointer;
}

.suggestions-list li:hover {
  background-color: #3949ab;
  color: #fff;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.notes-card {
  background: linear-gradient(135deg, #f39c12, #f1c40f);
  color: #fff;
  padding: 1em;
  text-align: center;
}

.notes-card textarea {
  width: 100%;
  height: 80px;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  resize: none;
  border: 0.5px solid #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.saved-notes {
  margin-top: 15px;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 5px;
}

.note-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  margin-bottom: 8px;
}

.delete-note-button {
  background: #e74c3c;
  color: #fff;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-note-button:hover {
  background: #c0392b;
}

.notes-card textarea {
  width: 100%;
  height: 80px;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  resize: none;
  border: 0.5px solid #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.saved-note {
  margin-top: 15px;
  background: rgba(255, 255, 255, 0.2);
  padding: 10px;
  border-radius: 5px;
}

/* New Card: Daily Motivation */
.motivation-card {
  background: linear-gradient(135deg, #fff3e0, #ffe0b2);
  color: #2c3e50;
  text-align: center;
}

.motivation-card p {
  font-size: 1.1em;
  margin-bottom: 15px;
  font-weight: 500;
}

.thank-you {
  text-align: center;
  padding: 48px 32px;
  background: white;
  margin-top: 0;
}

.thank-you p {
  color: #64748b;
  font-size: 1em;
  font-weight: 500;
  margin: 0;
}

.quick-access-section {
  padding: 48px 32px;
  background: white;
}

.quick-access-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .quick-access-cards {
    grid-template-columns: repeat(2, 1fr);
    gap: 1em;
  }

  .quick-card {
    padding: 1.5em 1em;
  }

  .quick-card h4 {
    font-size: 1.1em;
  }

  .quick-card p {
    font-size: 0.85em;
  }
}

@media (max-width: 480px) {
  .quick-access-cards {
    grid-template-columns: 1fr;
  }
}

.access-card {
  background: #f8fafc;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.access-card:hover {
  transform: translateY(-4px);
  border-color: #6366f1;
  background: white;
}

.access-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}

.access-card h3 {
  margin: 0 0 8px 0;
  font-size: 1.15em;
  font-weight: 700;
  color: #1e293b;
}

.access-card p {
  margin: 0;
  font-size: 0.9em;
  color: #64748b;
  line-height: 1.4;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.quick-card {
  animation: fadeInUp 0.6s ease-out;
  animation-fill-mode: both;
}

.quick-card:nth-child(1) {
  animation-delay: 0.1s;
}
.quick-card:nth-child(2) {
  animation-delay: 0.2s;
}
.quick-card:nth-child(3) {
  animation-delay: 0.3s;
}
.quick-card:nth-child(4) {
  animation-delay: 0.4s;
}
.quick-card:nth-child(5) {
  animation-delay: 0.5s;
}
.quick-card:nth-child(6) {
  animation-delay: 0.6s;
}

.tool-card {
  animation: fadeInUp 0.6s ease-out;
  animation-fill-mode: both;
}

.date-time-card {
  animation: fadeInUp 0.5s ease-out;
}

/* Time Tracker Card */
.time-tracker-card {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
}

.time-tracker-card .card-content {
  padding: 10px 0;
}

/* Bookmarks Card */
.bookmarks-card {
  background: linear-gradient(135deg, #0891b2, #06b6d4);
  color: white;
}

.bookmark-input {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}

.bookmark-input input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
}

.bookmarks-list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
}

.bookmark-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  margin-bottom: 8px;
}

.bookmark-item a {
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  text-decoration: none;
  flex: 1;
}

.bookmark-item a:hover {
  text-decoration: underline;
}

.bookmark-item .delete-btn {
  background: rgba(239, 68, 68, 0.8);
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.bookmark-item .delete-btn:hover {
  background: #ef4444;
  transform: scale(1.1);
}
</style>

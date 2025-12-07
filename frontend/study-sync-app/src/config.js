/**
 * Application Configuration
 * Central place for all API URLs and configuration
 */

// Backend API Base URL
export const API_BASE_URL =
  process.env.VUE_APP_API_URL || "https://studysync-backend-api.vercel.app/api";

// Full backend URL (without /api)
export const BACKEND_URL =
  process.env.VUE_APP_BACKEND_URL || "https://studysync-backend-api.vercel.app";

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    VERIFY_EMAIL: `${API_BASE_URL}/auth/verify-email`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
  },

  // Profile
  PROFILE: `${API_BASE_URL}/profile`,

  // Study Materials
  MATERIALS: `${API_BASE_URL}/study-materials`,

  // Quizzes
  QUIZZES: `${API_BASE_URL}/quizzes`,

  // Study Sessions
  SESSIONS: `${API_BASE_URL}/study-sessions`,

  // Goals
  GOALS: `${API_BASE_URL}/goals`,

  // Events (Planner)
  EVENTS: `${API_BASE_URL}/events`,

  // External Services
  MUSIC: `${API_BASE_URL}/music`,
  WEATHER: `${API_BASE_URL}/weather`,
  CITIES: `${API_BASE_URL}/cities`,
  AI_CHAT: `${API_BASE_URL}/ai-chat`,

  // Study Groups
  GROUPS: `${API_BASE_URL}/groups`,
  SEARCH: `${API_BASE_URL}/search`,
};

// Application Settings
export const APP_CONFIG = {
  APP_NAME: "StudySync",
  APP_VERSION: "1.0.0",
  DEFAULT_TIMEOUT: 30000, // 30 seconds
  MAX_FILE_SIZE: 10485760, // 10MB
  SUPPORTED_FILE_TYPES: [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/gif",
    "text/plain",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
};

// Environment check
export const isDevelopment = process.env.NODE_ENV === "development";
export const isProduction = process.env.NODE_ENV === "production";

export default {
  API_BASE_URL,
  BACKEND_URL,
  API_ENDPOINTS,
  APP_CONFIG,
  isDevelopment,
  isProduction,
};

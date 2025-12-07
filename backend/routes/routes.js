const express = require("express");
const controller = require("../controllers/controllers");
const authMiddleware = require("../middleware/middleware");

const router = express.Router();

router.post("/auth/register", controller.register);
router.post("/auth/login", controller.login);
router.post("/auth/verify-email", controller.verifyEmail);
router.post("/auth/reset-password", controller.resetPassword);
router.get("/profile/:userId?", authMiddleware, controller.getProfile);
router.put("/profile", authMiddleware, controller.updateProfile);
router.get("/search", authMiddleware, controller.searchProfiles);
router.get("/weather", controller.getWeather);
router.post("/groups", authMiddleware, controller.createGroup);
router.post(
  "/groups/:groupId/sessions",
  authMiddleware,
  controller.createSession,
);
router.get("/cities", controller.getCitySuggestions);
router.get("/music", authMiddleware, controller.getMusic);
router.post("/ai-chat", authMiddleware, controller.aiChat);

router.post("/study-materials", authMiddleware, controller.createStudyMaterial);
router.get("/study-materials", authMiddleware, controller.getStudyMaterials);
router.put(
  "/study-materials/:id",
  authMiddleware,
  controller.updateStudyMaterial,
);
router.delete(
  "/study-materials/:id",
  authMiddleware,
  controller.deleteStudyMaterial,
);

router.post("/quizzes", authMiddleware, controller.createQuiz);
router.get("/quizzes", authMiddleware, controller.getQuizzes);
router.post(
  "/quizzes/:id/attempt",
  authMiddleware,
  controller.submitQuizAttempt,
);
router.delete("/quizzes/:id", authMiddleware, controller.deleteQuiz);

router.post("/study-sessions", authMiddleware, controller.logStudySession);
router.get("/study-sessions", authMiddleware, controller.getStudySessions);

router.post("/goals", authMiddleware, controller.createGoal);
router.get("/goals", authMiddleware, controller.getGoals);
router.put("/goals/:id", authMiddleware, controller.updateGoal);
router.delete("/goals/:id", authMiddleware, controller.deleteGoal);

router.post("/events", authMiddleware, controller.createEvent);
router.get("/events", authMiddleware, controller.getEvents);
router.put("/events/:id", authMiddleware, controller.updateEvent);
router.delete("/events/:id", authMiddleware, controller.deleteEvent);

module.exports = router;

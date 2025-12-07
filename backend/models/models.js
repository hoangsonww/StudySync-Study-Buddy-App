const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: null },
  interests: { type: [String], default: [] },
  availableTimes: { type: [String], default: [] },
  courses: { type: [String], default: [] },
  mood: { type: String, default: "happy" },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
});

const groupSchema = new mongoose.Schema({
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  course: String,
  studySessions: [
    {
      date: Date,
      musicMood: String,
    },
  ],
});

const studyMaterialSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  category: { type: String, default: "General" },
  content: { type: String, default: "" },
  fileUrl: { type: String, default: null },
  tags: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const quizSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  category: { type: String, default: "General" },
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: Number,
      explanation: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
  attempts: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      score: Number,
      totalQuestions: Number,
      completedAt: Date,
    },
  ],
});

const studySessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subject: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  notes: { type: String, default: "" },
  productivity: { type: Number, min: 1, max: 5, default: 3 },
});

const goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  targetDate: { type: Date, required: true },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  completed: { type: Boolean, default: false },
  category: { type: String, default: "General" },
  createdAt: { type: Date, default: Date.now },
});

const eventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  category: { type: String, default: "Study" },
  color: { type: String, default: "#3949ab" },
  allDay: { type: Boolean, default: false },
  reminders: [{ type: Date }],
});

const User = mongoose.model("User", userSchema);
const Group = mongoose.model("Group", groupSchema);
const StudyMaterial = mongoose.model("StudyMaterial", studyMaterialSchema);
const Quiz = mongoose.model("Quiz", quizSchema);
const StudySession = mongoose.model("StudySession", studySessionSchema);
const Goal = mongoose.model("Goal", goalSchema);
const Event = mongoose.model("Event", eventSchema);

module.exports = {
  User,
  Group,
  StudyMaterial,
  Quiz,
  StudySession,
  Goal,
  Event,
};

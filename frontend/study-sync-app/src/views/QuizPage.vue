<template>
  <div class="quiz-page">
    <v-container>
      <h1 class="page-title">🎯 Quiz Generator</h1>
      <p class="page-subtitle">Test your knowledge with custom quizzes</p>

      <v-tabs v-model="activeTab" bg-color="primary" class="mb-4">
        <v-tab value="browse">Browse Quizzes</v-tab>
        <v-tab value="create">Create Quiz</v-tab>
        <v-tab value="take">Take Quiz</v-tab>
      </v-tabs>

      <v-window v-model="activeTab">
        <v-window-item value="browse">
          <v-row class="mb-4" style="margin-top: 4px">
            <v-col cols="12" md="6">
              <v-text-field
                v-model="searchQuery"
                label="Search quizzes..."
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                density="compact"
                clearable
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="selectedCategory"
                :items="categories"
                label="Filter by Category"
                variant="outlined"
                density="compact"
              />
            </v-col>
          </v-row>

          <v-row v-if="loading">
            <v-col cols="12" class="text-center">
              <v-progress-circular indeterminate color="primary" size="64" />
            </v-col>
          </v-row>

          <v-row style="padding: 1rem" v-else>
            <v-col
              v-for="quiz in filteredQuizzes"
              :key="quiz._id"
              cols="12"
              md="6"
              lg="4"
            >
              <v-card class="quiz-card" elevation="3">
                <v-card-title>
                  <v-icon color="primary" class="mr-2"
                    >mdi-file-question</v-icon
                  >
                  {{ quiz.title }}
                </v-card-title>
                <v-card-subtitle>
                  <v-chip size="small" color="primary">{{
                    quiz.category
                  }}</v-chip>
                </v-card-subtitle>
                <v-card-text>
                  <p>{{ quiz.description }}</p>
                  <p class="mt-2">
                    <strong>Questions:</strong> {{ quiz.questions.length }}
                  </p>
                  <p v-if="quiz.attempts.length > 0">
                    <strong>Attempts:</strong> {{ quiz.attempts.length }}
                  </p>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    color="primary"
                    variant="elevated"
                    size="small"
                    @click="startQuiz(quiz)"
                  >
                    Take Quiz
                  </v-btn>
                  <v-spacer />
                  <v-btn
                    color="error"
                    variant="text"
                    size="small"
                    @click="confirmDeleteQuiz(quiz)"
                  >
                    Delete
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col
              v-if="filteredQuizzes.length === 0"
              cols="12"
              class="text-center"
            >
              <v-icon size="64" color="grey">mdi-clipboard-text-outline</v-icon>
              <p class="text-h6 mt-4">No quizzes found</p>
              <p class="text-body-2">Create your first quiz to get started!</p>
            </v-col>
          </v-row>
        </v-window-item>

        <v-window-item value="create">
          <v-card elevation="3" class="pa-4">
            <v-card-title class="text-h5 mb-4">Create New Quiz</v-card-title>
            <v-form ref="quizForm">
              <v-text-field
                v-model="newQuiz.title"
                label="Quiz Title *"
                variant="outlined"
                :rules="[rules.required]"
              />
              <v-textarea
                v-model="newQuiz.description"
                label="Description"
                variant="outlined"
                rows="3"
              />
              <v-select
                v-model="newQuiz.category"
                :items="categories.filter((c) => c !== 'All')"
                label="Category *"
                variant="outlined"
                :rules="[rules.required]"
              />

              <v-divider class="my-4" />

              <h3 class="mb-3">Questions</h3>

              <v-card
                v-for="(question, index) in newQuiz.questions"
                :key="index"
                class="mb-4 pa-4"
                variant="outlined"
              >
                <div class="d-flex justify-space-between align-center mb-2">
                  <h4>Question {{ index + 1 }}</h4>
                  <v-btn
                    icon
                    size="small"
                    color="error"
                    variant="text"
                    @click="removeQuestion(index)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>

                <v-textarea
                  v-model="question.question"
                  label="Question *"
                  variant="outlined"
                  rows="2"
                  :rules="[rules.required]"
                />

                <v-text-field
                  v-for="(option, optIndex) in question.options"
                  :key="optIndex"
                  v-model="question.options[optIndex]"
                  :label="`Option ${optIndex + 1} *`"
                  variant="outlined"
                  :rules="[rules.required]"
                />

                <v-select
                  v-model="question.correctAnswer"
                  :items="[
                    { value: 0, title: 'Option 1' },
                    { value: 1, title: 'Option 2' },
                    { value: 2, title: 'Option 3' },
                    { value: 3, title: 'Option 4' },
                  ]"
                  item-value="value"
                  item-title="title"
                  label="Correct Answer *"
                  variant="outlined"
                  :rules="[rules.required]"
                />

                <v-textarea
                  v-model="question.explanation"
                  label="Explanation (optional)"
                  variant="outlined"
                  rows="2"
                />
              </v-card>

              <v-btn
                color="primary"
                variant="outlined"
                block
                @click="addQuestion"
                prepend-icon="mdi-plus"
              >
                Add Question
              </v-btn>

              <v-card-actions class="mt-4">
                <v-spacer />
                <v-btn color="grey" variant="text" @click="resetQuizForm">
                  Reset
                </v-btn>
                <v-btn color="primary" variant="elevated" @click="createQuiz">
                  Create Quiz
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-window-item>

        <v-window-item value="take">
          <v-card v-if="!currentQuiz" class="pa-8 text-center">
            <v-icon size="80" color="grey">mdi-clipboard-check-outline</v-icon>
            <p class="text-h6 mt-4">No quiz selected</p>
            <p class="text-body-2">
              Go to the "Browse Quizzes" tab to select a quiz
            </p>
          </v-card>

          <v-card v-else-if="!quizStarted" class="pa-6">
            <v-card-title class="text-h4 mb-4">
              {{ currentQuiz.title }}
            </v-card-title>
            <v-card-subtitle class="text-h6 mb-2">
              {{ currentQuiz.description }}
            </v-card-subtitle>
            <v-divider class="my-4" />
            <p class="text-h6 mb-2">
              <v-icon color="primary">mdi-help-circle</v-icon>
              {{ currentQuiz.questions.length }} Questions
            </p>
            <p class="text-body-1 mb-4">
              Answer all questions and submit to see your score
            </p>
            <v-btn
              color="primary"
              variant="elevated"
              size="large"
              @click="startQuizSession"
            >
              Start Quiz
            </v-btn>
          </v-card>

          <div v-else-if="!quizCompleted">
            <v-card class="pa-6">
              <div class="d-flex justify-space-between align-center mb-4">
                <h3>
                  Question {{ currentQuestionIndex + 1 }} of
                  {{ currentQuiz.questions.length }}
                </h3>
                <v-chip color="primary">
                  {{
                    Math.floor(
                      (currentQuestionIndex / currentQuiz.questions.length) *
                        100,
                    )
                  }}% Complete
                </v-chip>
              </div>

              <v-progress-linear
                :model-value="
                  (currentQuestionIndex / currentQuiz.questions.length) * 100
                "
                color="primary"
                height="8"
                class="mb-6"
              />

              <h2 class="mb-4">{{ currentQuestion.question }}</h2>

              <v-radio-group v-model="userAnswers[currentQuestionIndex]">
                <v-radio
                  v-for="(option, index) in currentQuestion.options"
                  :key="index"
                  :label="option"
                  :value="index"
                  color="primary"
                  class="mb-2"
                />
              </v-radio-group>

              <v-card-actions class="mt-6">
                <v-btn
                  v-if="currentQuestionIndex > 0"
                  color="grey"
                  variant="text"
                  @click="previousQuestion"
                >
                  Previous
                </v-btn>
                <v-spacer />
                <v-btn
                  v-if="currentQuestionIndex < currentQuiz.questions.length - 1"
                  color="primary"
                  variant="elevated"
                  @click="nextQuestion"
                >
                  Next
                </v-btn>
                <v-btn
                  v-else
                  color="success"
                  variant="elevated"
                  @click="submitQuiz"
                >
                  Submit Quiz
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>

          <v-card v-else class="pa-6">
            <div class="text-center">
              <v-icon
                :color="scorePercentage >= 70 ? 'success' : 'warning'"
                size="80"
              >
                {{ scorePercentage >= 70 ? "mdi-trophy" : "mdi-emoticon-sad" }}
              </v-icon>
              <h2 class="mt-4">Quiz Completed!</h2>
              <h1
                class="text-h3 my-4"
                :class="scorePercentage >= 70 ? 'text-success' : 'text-warning'"
              >
                {{ quizScore }} / {{ currentQuiz.questions.length }}
              </h1>
              <p class="text-h6 mb-4">{{ scorePercentage }}%</p>
              <p class="text-body-1 mb-6">
                {{
                  scorePercentage >= 90
                    ? "Excellent work!"
                    : scorePercentage >= 70
                      ? "Good job!"
                      : "Keep practicing!"
                }}
              </p>

              <v-divider class="my-4" />

              <div class="text-left">
                <h3 class="mb-4">Review Answers:</h3>
                <v-card
                  v-for="(question, index) in currentQuiz.questions"
                  :key="index"
                  class="mb-4 pa-4"
                  :color="
                    userAnswers[index] === question.correctAnswer
                      ? 'success'
                      : 'error'
                  "
                  variant="tonal"
                >
                  <h4 class="mb-2">
                    Question {{ index + 1 }}: {{ question.question }}
                  </h4>
                  <p class="mb-2">
                    <strong>Your answer:</strong>
                    {{
                      userAnswers[index] !== null &&
                      userAnswers[index] !== undefined
                        ? question.options[userAnswers[index]]
                        : "Not answered"
                    }}
                  </p>
                  <p class="mb-2">
                    <strong>Correct answer:</strong>
                    {{ question.options[question.correctAnswer] }}
                  </p>
                  <p v-if="question.explanation" class="text-body-2">
                    <strong>Explanation:</strong> {{ question.explanation }}
                  </p>
                </v-card>
              </div>

              <v-btn
                color="primary"
                variant="elevated"
                class="mt-4"
                @click="retakeQuiz"
              >
                Retake Quiz
              </v-btn>
              <v-btn
                color="grey"
                variant="text"
                class="mt-4 ml-2"
                @click="exitQuiz"
              >
                Back to Browse
              </v-btn>
            </div>
          </v-card>
        </v-window-item>
      </v-window>
    </v-container>

    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title>Confirm Delete</v-card-title>
        <v-card-text> Are you sure you want to delete this quiz? </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" variant="text" @click="deleteDialog = false"
            >Cancel</v-btn
          >
          <v-btn color="error" variant="elevated" @click="deleteQuiz"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script>
import api from "../api";
import { mapState } from "vuex";

export default {
  name: "QuizPage",
  data() {
    return {
      activeTab: "browse",
      quizzes: [],
      loading: false,
      searchQuery: "",
      selectedCategory: "All",
      categories: [
        "All",
        "Mathematics",
        "Science",
        "Programming",
        "Languages",
        "History",
        "General",
      ],
      newQuiz: {
        title: "",
        description: "",
        category: "General",
        questions: [],
      },
      currentQuiz: null,
      quizStarted: false,
      quizCompleted: false,
      currentQuestionIndex: 0,
      userAnswers: [],
      quizScore: 0,
      deleteDialog: false,
      selectedQuizToDelete: null,
      rules: {
        required: (value) =>
          (value !== null && value !== undefined && value !== "") ||
          "Required.",
      },
      snackbar: false,
      snackbarText: "",
      snackbarColor: "success",
    };
  },
  computed: {
    ...mapState(["token"]),
    filteredQuizzes() {
      let filtered = this.quizzes;

      if (this.selectedCategory !== "All") {
        filtered = filtered.filter((q) => q.category === this.selectedCategory);
      }

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (q) =>
            q.title.toLowerCase().includes(query) ||
            q.description.toLowerCase().includes(query),
        );
      }

      return filtered;
    },
    currentQuestion() {
      return this.currentQuiz?.questions[this.currentQuestionIndex];
    },
    scorePercentage() {
      return Math.round(
        (this.quizScore / this.currentQuiz.questions.length) * 100,
      );
    },
  },
  created() {
    this.fetchQuizzes();
  },
  methods: {
    async fetchQuizzes() {
      this.loading = true;
      try {
        const response = await api.get("/quizzes", {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        if (response.data.success) {
          this.quizzes = response.data.quizzes;
        }
      } catch (error) {
        this.showSnackbar("Error fetching quizzes", "error");
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    addQuestion() {
      this.newQuiz.questions.push({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
        explanation: "",
      });
    },
    removeQuestion(index) {
      this.newQuiz.questions.splice(index, 1);
    },
    async createQuiz() {
      const { valid } = await this.$refs.quizForm.validate();
      if (!valid) return;

      if (this.newQuiz.questions.length === 0) {
        this.showSnackbar("Please add at least one question", "error");
        return;
      }

      try {
        await api.post("/quizzes", this.newQuiz, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.showSnackbar("Quiz created successfully", "success");
        this.resetQuizForm();
        this.fetchQuizzes();
        this.activeTab = "browse";
      } catch (error) {
        this.showSnackbar("Error creating quiz", "error");
        console.error(error);
      }
    },
    resetQuizForm() {
      this.newQuiz = {
        title: "",
        description: "",
        category: "General",
        questions: [],
      };
    },
    startQuiz(quiz) {
      this.currentQuiz = quiz;
      this.quizStarted = false;
      this.quizCompleted = false;
      this.activeTab = "take";
    },
    startQuizSession() {
      this.quizStarted = true;
      this.currentQuestionIndex = 0;
      this.userAnswers = new Array(this.currentQuiz.questions.length).fill(
        null,
      );
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.currentQuiz.questions.length - 1) {
        this.currentQuestionIndex++;
      }
    },
    previousQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
      }
    },
    async submitQuiz() {
      this.quizScore = 0;
      this.currentQuiz.questions.forEach((question, index) => {
        if (this.userAnswers[index] === question.correctAnswer) {
          this.quizScore++;
        }
      });

      this.quizCompleted = true;

      try {
        await api.post(
          `/quizzes/${this.currentQuiz._id}/attempt`,
          {
            score: this.quizScore,
            totalQuestions: this.currentQuiz.questions.length,
          },
          { headers: { Authorization: `Bearer ${this.token}` } },
        );
      } catch (error) {
        console.error("Error recording quiz attempt:", error);
      }
    },
    retakeQuiz() {
      this.startQuizSession();
    },
    exitQuiz() {
      this.currentQuiz = null;
      this.quizStarted = false;
      this.quizCompleted = false;
      this.activeTab = "browse";
    },
    confirmDeleteQuiz(quiz) {
      this.selectedQuizToDelete = quiz;
      this.deleteDialog = true;
    },
    async deleteQuiz() {
      try {
        await api.delete(`/quizzes/${this.selectedQuizToDelete._id}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.showSnackbar("Quiz deleted successfully", "success");
        this.deleteDialog = false;
        this.fetchQuizzes();
      } catch (error) {
        this.showSnackbar("Error deleting quiz", "error");
        console.error(error);
      }
    },
    showSnackbar(text, color) {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbar = true;
    },
  },
};
</script>

<style scoped>
.quiz-page {
  padding: 2em 1em;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

.page-title {
  text-align: center;
  font-size: 3em;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.page-subtitle {
  text-align: center;
  font-size: 1.3em;
  color: #555;
  margin-bottom: 2.5em;
}

.quiz-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  border-radius: 15px !important;
  overflow: hidden;
  padding: 1em;
}

.quiz-card:hover {
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25) !important;
}
</style>

<template>
  <div class="goals-page">
    <v-container>
      <h1 class="page-title">🎯 Goals & Achievements</h1>
      <p class="page-subtitle">Set and track your study goals</p>

      <v-row class="mb-4">
        <v-col cols="12" md="4">
          <v-card class="stat-card" color="success" dark elevation="3">
            <v-card-text class="text-center">
              <v-icon size="48" class="mb-2">mdi-trophy</v-icon>
              <div class="stat-value">{{ completedGoals }}</div>
              <div class="stat-label">Completed Goals</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="stat-card" color="primary" dark elevation="3">
            <v-card-text class="text-center">
              <v-icon size="48" class="mb-2">mdi-target</v-icon>
              <div class="stat-value">{{ activeGoals }}</div>
              <div class="stat-label">Active Goals</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="stat-card" color="warning" dark elevation="3">
            <v-card-text class="text-center">
              <v-icon size="48" class="mb-2">mdi-chart-line</v-icon>
              <div class="stat-value">{{ averageProgress }}%</div>
              <div class="stat-label">Average Progress</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mb-4">
        <v-col cols="12">
          <v-btn
            color="primary"
            size="large"
            prepend-icon="mdi-plus"
            @click="openCreateDialog"
          >
            Create New Goal
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-tabs v-model="activeTab" bg-color="primary" class="mb-4">
            <v-tab value="active">Active Goals</v-tab>
            <v-tab value="completed">Completed Goals</v-tab>
            <v-tab value="all">All Goals</v-tab>
          </v-tabs>
        </v-col>
      </v-row>

      <v-row v-if="loading" class="justify-center">
        <v-progress-circular indeterminate color="primary" size="64" />
      </v-row>

      <v-row v-else>
        <v-col
          v-for="goal in filteredGoals"
          :key="goal._id"
          cols="12"
          md="6"
          lg="4"
        >
          <v-card
            class="goal-card"
            elevation="3"
            :class="{ 'completed-goal': goal.completed }"
          >
            <v-card-title>
              <v-icon
                :color="
                  goal.completed ? 'success' : getCategoryColor(goal.category)
                "
                class="mr-2"
              >
                {{ goal.completed ? "mdi-check-circle" : "mdi-target" }}
              </v-icon>
              {{ goal.title }}
            </v-card-title>
            <v-card-subtitle>
              <v-chip size="small" :color="getCategoryColor(goal.category)">
                {{ goal.category }}
              </v-chip>
              <v-chip
                size="small"
                class="ml-2"
                :color="getDeadlineColor(goal.targetDate)"
              >
                {{ formatDate(goal.targetDate) }}
              </v-chip>
            </v-card-subtitle>
            <v-card-text>
              <p class="mb-4">{{ goal.description }}</p>
              <div class="progress-section">
                <div class="d-flex justify-space-between mb-2">
                  <span class="text-body-2">Progress</span>
                  <span class="text-body-2 font-weight-bold"
                    >{{ goal.progress }}%</span
                  >
                </div>
                <v-progress-linear
                  :model-value="goal.progress"
                  :color="goal.completed ? 'success' : 'primary'"
                  height="12"
                  rounded
                />
              </div>
              <p class="text-caption mt-2">
                Created: {{ formatDate(goal.createdAt) }}
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                v-if="!goal.completed"
                size="small"
                color="primary"
                variant="text"
                @click="updateProgress(goal)"
              >
                Update Progress
              </v-btn>
              <v-btn
                v-if="!goal.completed && goal.progress === 100"
                size="small"
                color="success"
                variant="text"
                @click="markComplete(goal)"
              >
                Mark Complete
              </v-btn>
              <v-spacer />
              <v-btn
                size="small"
                color="secondary"
                variant="text"
                @click="editGoal(goal)"
              >
                Edit
              </v-btn>
              <v-btn
                size="small"
                color="error"
                variant="text"
                @click="confirmDelete(goal)"
              >
                Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col v-if="filteredGoals.length === 0" cols="12" class="text-center">
          <v-icon size="80" color="grey">mdi-target-variant</v-icon>
          <p class="text-h6 mt-4">No goals found</p>
          <p class="text-body-2">Create your first goal to get started!</p>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="createDialog" max-width="600px" persistent>
      <v-card>
        <v-card-title class="text-h5" style="padding-top: 24px">
          {{ editMode ? "Edit" : "Create New" }} Goal
        </v-card-title>
        <v-card-text style="padding-top: 20px">
          <v-form ref="goalForm">
            <v-text-field
              v-model="formData.title"
              label="Goal Title *"
              variant="outlined"
              :rules="[rules.required]"
            />
            <v-textarea
              v-model="formData.description"
              label="Description"
              variant="outlined"
              rows="3"
            />
            <v-select
              v-model="formData.category"
              :items="categories"
              label="Category *"
              variant="outlined"
              :rules="[rules.required]"
            />
            <v-text-field
              v-model="formData.targetDate"
              label="Target Date *"
              type="date"
              variant="outlined"
              :rules="[rules.required]"
            />
            <v-slider
              v-model="formData.progress"
              label="Current Progress (%)"
              :min="0"
              :max="100"
              step="5"
              show-ticks="always"
              thumb-label
              color="primary"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" variant="text" @click="closeDialog">
            Cancel
          </v-btn>
          <v-btn color="primary" variant="elevated" @click="saveGoal">
            {{ editMode ? "Update" : "Create" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="progressDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h6">Update Progress</v-card-title>
        <v-card-text>
          <v-slider
            v-model="updateProgressValue"
            label="Progress (%)"
            :min="0"
            :max="100"
            step="5"
            show-ticks="always"
            thumb-label
            color="primary"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" variant="text" @click="progressDialog = false">
            Cancel
          </v-btn>
          <v-btn color="primary" variant="elevated" @click="saveProgress">
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h6">Confirm Delete</v-card-title>
        <v-card-text>
          Are you sure you want to delete this goal? This action cannot be
          undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" variant="text" @click="deleteDialog = false">
            Cancel
          </v-btn>
          <v-btn color="error" variant="elevated" @click="deleteGoal">
            Delete
          </v-btn>
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
  name: "GoalsPage",
  data() {
    return {
      goals: [],
      loading: false,
      activeTab: "active",
      categories: [
        "Academic",
        "Skill Development",
        "Career",
        "Personal",
        "Fitness",
        "General",
      ],
      createDialog: false,
      progressDialog: false,
      deleteDialog: false,
      editMode: false,
      selectedGoal: null,
      updateProgressValue: 0,
      formData: {
        title: "",
        description: "",
        category: "Academic",
        targetDate: "",
        progress: 0,
      },
      rules: {
        required: (value) => !!value || "Required.",
      },
      snackbar: false,
      snackbarText: "",
      snackbarColor: "success",
    };
  },
  computed: {
    ...mapState(["token"]),
    completedGoals() {
      return this.goals.filter((g) => g.completed).length;
    },
    activeGoals() {
      return this.goals.filter((g) => !g.completed).length;
    },
    averageProgress() {
      if (this.activeGoals === 0) return 0;
      const total = this.goals
        .filter((g) => !g.completed)
        .reduce((sum, g) => sum + g.progress, 0);
      return Math.round(total / this.activeGoals);
    },
    filteredGoals() {
      if (this.activeTab === "active") {
        return this.goals.filter((g) => !g.completed);
      } else if (this.activeTab === "completed") {
        return this.goals.filter((g) => g.completed);
      }
      return this.goals;
    },
  },
  created() {
    this.fetchGoals();
  },
  methods: {
    async fetchGoals() {
      this.loading = true;
      try {
        const response = await api.get("/goals", {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        if (response.data.success) {
          this.goals = response.data.goals;
        }
      } catch (error) {
        this.showSnackbar("Error fetching goals", "error");
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    openCreateDialog() {
      this.editMode = false;
      this.formData = {
        title: "",
        description: "",
        category: "Academic",
        targetDate: "",
        progress: 0,
      };
      this.createDialog = true;
    },
    closeDialog() {
      this.createDialog = false;
      this.editMode = false;
    },
    async saveGoal() {
      const { valid } = await this.$refs.goalForm.validate();
      if (!valid) return;

      try {
        if (this.editMode) {
          await api.put(`/goals/${this.selectedGoal._id}`, this.formData, {
            headers: { Authorization: `Bearer ${this.token}` },
          });
          this.showSnackbar("Goal updated successfully", "success");
        } else {
          await api.post("/goals", this.formData, {
            headers: { Authorization: `Bearer ${this.token}` },
          });
          this.showSnackbar("Goal created successfully", "success");
        }
        this.closeDialog();
        this.fetchGoals();
      } catch (error) {
        this.showSnackbar("Error saving goal", "error");
        console.error(error);
      }
    },
    editGoal(goal) {
      this.editMode = true;
      this.selectedGoal = goal;
      this.formData = {
        ...goal,
        targetDate: new Date(goal.targetDate).toISOString().split("T")[0],
      };
      this.createDialog = true;
    },
    updateProgress(goal) {
      this.selectedGoal = goal;
      this.updateProgressValue = goal.progress;
      this.progressDialog = true;
    },
    async saveProgress() {
      try {
        await api.put(
          `/goals/${this.selectedGoal._id}`,
          { progress: this.updateProgressValue },
          { headers: { Authorization: `Bearer ${this.token}` } },
        );
        this.showSnackbar("Progress updated successfully", "success");
        this.progressDialog = false;
        this.fetchGoals();
      } catch (error) {
        this.showSnackbar("Error updating progress", "error");
        console.error(error);
      }
    },
    async markComplete(goal) {
      try {
        await api.put(
          `/goals/${goal._id}`,
          { completed: true, progress: 100 },
          { headers: { Authorization: `Bearer ${this.token}` } },
        );
        this.showSnackbar("Goal marked as complete! 🎉", "success");
        this.fetchGoals();
      } catch (error) {
        this.showSnackbar("Error completing goal", "error");
        console.error(error);
      }
    },
    confirmDelete(goal) {
      this.selectedGoal = goal;
      this.deleteDialog = true;
    },
    async deleteGoal() {
      try {
        await api.delete(`/goals/${this.selectedGoal._id}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.showSnackbar("Goal deleted successfully", "success");
        this.deleteDialog = false;
        this.fetchGoals();
      } catch (error) {
        this.showSnackbar("Error deleting goal", "error");
        console.error(error);
      }
    },
    getCategoryColor(category) {
      const colors = {
        Academic: "primary",
        "Skill Development": "success",
        Career: "warning",
        Personal: "info",
        Fitness: "error",
        General: "grey",
      };
      return colors[category] || "grey";
    },
    getDeadlineColor(targetDate) {
      const now = new Date();
      const target = new Date(targetDate);
      const daysUntil = Math.floor((target - now) / (1000 * 60 * 60 * 24));

      if (daysUntil < 0) return "error";
      if (daysUntil < 7) return "warning";
      return "success";
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
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
.goals-page {
  padding: 2em 1em;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.page-title {
  text-align: center;
  font-size: 3em;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.page-subtitle {
  text-align: center;
  font-size: 1.3em;
  color: #34495e;
  margin-bottom: 2.5em;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.stat-card {
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-value {
  font-size: 2.5em;
  font-weight: bold;
}

.stat-label {
  font-size: 1em;
  opacity: 0.9;
  margin-top: 0.5em;
}

.goal-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  border-radius: 15px !important;
  overflow: hidden;
}

.goal-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25) !important;
}

.completed-goal {
  opacity: 0.85;
  border: 2px solid #4caf50;
}

.progress-section {
  background: #f5f5f5;
  padding: 1em;
  border-radius: 8px;
}
</style>

<template>
  <div class="progress-tracker-page">
    <v-container>
      <h1 class="page-title">📊 Progress Tracker</h1>
      <p class="page-subtitle">
        Track your study sessions and monitor your progress
      </p>

      <v-row class="mb-4">
        <v-col cols="12" md="3">
          <v-card class="stat-card" color="primary" dark>
            <v-card-text>
              <div class="stat-value">{{ totalSessions }}</div>
              <div class="stat-label">Total Sessions</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card class="stat-card" color="success" dark>
            <v-card-text>
              <div class="stat-value">{{ totalHours }}h</div>
              <div class="stat-label">Total Hours</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card class="stat-card" color="warning" dark>
            <v-card-text>
              <div class="stat-value">{{ averageProductivity }}/5</div>
              <div class="stat-label">Avg. Productivity</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card class="stat-card" color="info" dark>
            <v-card-text>
              <div class="stat-value">{{ currentStreak }}</div>
              <div class="stat-label">Day Streak</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="8">
          <v-card elevation="3" class="pa-4">
            <v-card-title class="text-h6 mb-4"
              >Study Sessions Over Time</v-card-title
            >
            <div class="chart-container">
              <div
                v-for="(session, index) in recentSessions"
                :key="index"
                class="session-bar-wrapper"
              >
                <div class="session-info">
                  <span class="session-subject">{{ session.subject }}</span>
                  <span class="session-duration"
                    >{{ session.duration }}min</span
                  >
                </div>
                <div class="session-bar-container">
                  <div
                    class="session-bar"
                    :style="{
                      width: `${(session.duration / maxDuration) * 100}%`,
                      backgroundColor: getProductivityColor(
                        session.productivity,
                      ),
                    }"
                  />
                </div>
                <span class="session-date">{{ formatDate(session.date) }}</span>
              </div>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card elevation="3" class="pa-4">
            <v-card-title class="text-h6 mb-4">Log New Session</v-card-title>
            <v-form ref="sessionForm">
              <v-text-field
                v-model="newSession.subject"
                label="Subject *"
                variant="outlined"
                density="compact"
                :rules="[rules.required]"
              />
              <v-text-field
                v-model.number="newSession.duration"
                label="Duration (minutes) *"
                type="number"
                variant="outlined"
                density="compact"
                :rules="[rules.required]"
              />
              <v-textarea
                v-model="newSession.notes"
                label="Notes"
                variant="outlined"
                rows="3"
                density="compact"
              />
              <v-slider
                v-model="newSession.productivity"
                label="Productivity"
                :min="1"
                :max="5"
                step="1"
                show-ticks="always"
                thumb-label
                color="primary"
              />
              <v-btn color="primary" block @click="logSession">
                Log Session
              </v-btn>
            </v-form>
          </v-card>

          <v-card elevation="3" class="pa-4 mt-4">
            <v-card-title class="text-h6 mb-4"
              >Subject Distribution</v-card-title
            >
            <div class="subject-list">
              <div
                v-for="subject in subjectStats"
                :key="subject.name"
                class="subject-item"
              >
                <div class="subject-header">
                  <span class="subject-name">{{ subject.name }}</span>
                  <span class="subject-hours">{{ subject.hours }}h</span>
                </div>
                <v-progress-linear
                  :model-value="(subject.hours / totalHours) * 100"
                  :color="getRandomColor()"
                  height="8"
                  class="mt-2"
                />
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-4">
        <v-col cols="12">
          <v-card elevation="3" class="pa-4">
            <v-card-title
              class="d-flex justify-space-between align-center mb-4"
            >
              <span class="text-h6">Recent Study Sessions</span>
              <v-btn
                color="primary"
                variant="outlined"
                size="small"
                @click="fetchSessions"
              >
                Refresh
              </v-btn>
            </v-card-title>
            <v-data-table
              :headers="tableHeaders"
              :items="sessions"
              :items-per-page="10"
              class="elevation-1"
            >
              <template v-slot:[`item.date`]="{ item }">
                {{ formatDateTime(item.date) }}
              </template>
              <template v-slot:[`item.productivity`]="{ item }">
                <v-rating
                  :model-value="item.productivity"
                  readonly
                  density="compact"
                  size="small"
                  color="warning"
                />
              </template>
              <template v-slot:[`item.notes`]="{ item }">
                <span
                  class="text-truncate"
                  style="max-width: 200px; display: block"
                >
                  {{ item.notes || "-" }}
                </span>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script>
import api from "../api";
import { mapState } from "vuex";

export default {
  name: "ProgressTrackerPage",
  data() {
    return {
      sessions: [],
      loading: false,
      newSession: {
        subject: "",
        duration: null,
        notes: "",
        productivity: 3,
      },
      tableHeaders: [
        { title: "Subject", key: "subject", sortable: true },
        { title: "Duration (min)", key: "duration", sortable: true },
        { title: "Date", key: "date", sortable: true },
        { title: "Productivity", key: "productivity", sortable: true },
        { title: "Notes", key: "notes", sortable: false },
      ],
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
    totalSessions() {
      return this.sessions.length;
    },
    totalHours() {
      const totalMinutes = this.sessions.reduce(
        (sum, s) => sum + s.duration,
        0,
      );
      return Math.round((totalMinutes / 60) * 10) / 10;
    },
    averageProductivity() {
      if (this.sessions.length === 0) return 0;
      const avg =
        this.sessions.reduce((sum, s) => sum + s.productivity, 0) /
        this.sessions.length;
      return Math.round(avg * 10) / 10;
    },
    currentStreak() {
      if (this.sessions.length === 0) return 0;

      const sortedSessions = [...this.sessions].sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );

      let streak = 1;
      let currentDate = new Date(sortedSessions[0].date);
      currentDate.setHours(0, 0, 0, 0);

      for (let i = 1; i < sortedSessions.length; i++) {
        const sessionDate = new Date(sortedSessions[i].date);
        sessionDate.setHours(0, 0, 0, 0);

        const dayDiff = Math.floor(
          (currentDate - sessionDate) / (1000 * 60 * 60 * 24),
        );

        if (dayDiff === 1) {
          streak++;
          currentDate = sessionDate;
        } else if (dayDiff > 1) {
          break;
        }
      }

      return streak;
    },
    recentSessions() {
      return [...this.sessions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10);
    },
    maxDuration() {
      return Math.max(...this.recentSessions.map((s) => s.duration), 60);
    },
    subjectStats() {
      const stats = {};

      this.sessions.forEach((session) => {
        if (!stats[session.subject]) {
          stats[session.subject] = 0;
        }
        stats[session.subject] += session.duration;
      });

      return Object.entries(stats)
        .map(([name, minutes]) => ({
          name,
          hours: Math.round((minutes / 60) * 10) / 10,
        }))
        .sort((a, b) => b.hours - a.hours)
        .slice(0, 5);
    },
  },
  created() {
    this.fetchSessions();
  },
  methods: {
    async fetchSessions() {
      this.loading = true;
      try {
        const response = await api.get("/study-sessions", {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        if (response.data.success) {
          this.sessions = response.data.sessions;
        }
      } catch (error) {
        this.showSnackbar("Error fetching sessions", "error");
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async logSession() {
      const { valid } = await this.$refs.sessionForm.validate();
      if (!valid) return;

      try {
        await api.post("/study-sessions", this.newSession, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.showSnackbar("Session logged successfully", "success");
        this.newSession = {
          subject: "",
          duration: null,
          notes: "",
          productivity: 3,
        };
        this.fetchSessions();
      } catch (error) {
        this.showSnackbar("Error logging session", "error");
        console.error(error);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    formatDateTime(date) {
      return new Date(date).toLocaleString();
    },
    getProductivityColor(productivity) {
      const colors = {
        1: "#ef5350",
        2: "#ff9800",
        3: "#ffc107",
        4: "#8bc34a",
        5: "#4caf50",
      };
      return colors[productivity] || "#9e9e9e";
    },
    getRandomColor() {
      const colors = [
        "primary",
        "success",
        "warning",
        "info",
        "error",
        "purple",
      ];
      return colors[Math.floor(Math.random() * colors.length)];
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
.progress-tracker-page {
  padding: 2em 1em;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
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

.stat-card {
  text-align: center;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-value {
  font-size: 2.5em;
  font-weight: bold;
  margin-bottom: 0.2em;
}

.stat-label {
  font-size: 1em;
  opacity: 0.9;
}

.chart-container {
  max-height: 400px;
  overflow-y: auto;
}

.session-bar-wrapper {
  margin-bottom: 1.5em;
}

.session-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
}

.session-subject {
  font-weight: 600;
  color: #333;
}

.session-duration {
  color: #666;
  font-size: 0.9em;
}

.session-bar-container {
  width: 100%;
  height: 20px;
  background: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 0.3em;
}

.session-bar {
  height: 100%;
  transition: width 0.5s ease;
  border-radius: 10px;
}

.session-date {
  font-size: 0.8em;
  color: #999;
}

.subject-list {
  max-height: 300px;
  overflow-y: auto;
}

.subject-item {
  margin-bottom: 1.5em;
}

.subject-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
}

.subject-name {
  font-weight: 600;
  color: #333;
}

.subject-hours {
  color: #666;
}
</style>

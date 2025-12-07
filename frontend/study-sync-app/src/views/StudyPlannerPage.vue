<template>
  <div class="study-planner-page">
    <v-container>
      <h1 class="page-title">📅 Study Planner</h1>
      <p class="page-subtitle">Plan and organize your study schedule</p>

      <v-row class="mb-4">
        <v-col cols="12" md="8">
          <v-card elevation="3" class="pa-4">
            <div class="d-flex justify-space-between align-center mb-4">
              <v-btn icon variant="text" @click="previousMonth" size="small">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <h2 class="text-h5">{{ currentMonthYear }}</h2>
              <v-btn icon variant="text" @click="nextMonth" size="small">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </div>

            <div class="calendar">
              <div class="calendar-header">
                <div
                  v-for="day in daysOfWeek"
                  :key="day"
                  class="calendar-day-header"
                >
                  {{ day }}
                </div>
              </div>
              <div class="calendar-body">
                <div
                  v-for="(day, index) in calendarDays"
                  :key="index"
                  class="calendar-day"
                  :class="{
                    'other-month': day.otherMonth,
                    today: day.isToday,
                    'has-events': day.events.length > 0,
                  }"
                  @click="selectDay(day)"
                >
                  <div class="day-number">{{ day.day }}</div>
                  <div class="day-events">
                    <v-chip
                      v-for="event in day.events.slice(0, 2)"
                      :key="event._id"
                      size="x-small"
                      :color="event.color"
                      class="event-chip"
                    >
                      {{ event.title }}
                    </v-chip>
                    <span v-if="day.events.length > 2" class="more-events">
                      +{{ day.events.length - 2 }} more
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card elevation="3" class="pa-4 mb-4">
            <v-card-title class="text-h6 mb-4">Create Event</v-card-title>
            <v-form ref="eventForm">
              <v-text-field
                v-model="newEvent.title"
                label="Event Title *"
                variant="outlined"
                density="compact"
                :rules="[rules.required]"
              />
              <v-textarea
                v-model="newEvent.description"
                label="Description"
                variant="outlined"
                rows="2"
                density="compact"
              />
              <v-select
                v-model="newEvent.category"
                :items="categories"
                label="Category *"
                variant="outlined"
                density="compact"
                :rules="[rules.required]"
              />
              <v-text-field
                v-model="newEvent.startDate"
                label="Start Date & Time *"
                type="datetime-local"
                variant="outlined"
                density="compact"
                :rules="[rules.required]"
              />
              <v-text-field
                v-model="newEvent.endDate"
                label="End Date & Time *"
                type="datetime-local"
                variant="outlined"
                density="compact"
                :rules="[rules.required]"
              />
              <v-checkbox
                v-model="newEvent.allDay"
                label="All Day Event"
                density="compact"
              />
              <v-select
                v-model="newEvent.color"
                :items="colors"
                label="Color"
                variant="outlined"
                density="compact"
              >
                <template v-slot:item="{ props, item }">
                  <v-list-item v-bind="props">
                    <template v-slot:prepend>
                      <v-icon :color="item.value">mdi-circle</v-icon>
                    </template>
                  </v-list-item>
                </template>
              </v-select>
              <v-btn color="primary" block @click="createEvent">
                Create Event
              </v-btn>
            </v-form>
          </v-card>

          <v-card elevation="3" class="pa-4">
            <v-card-title class="text-h6 mb-4">Upcoming Events</v-card-title>
            <div class="upcoming-events">
              <v-card
                v-for="event in upcomingEvents"
                :key="event._id"
                variant="outlined"
                class="mb-2 pa-2"
              >
                <div class="d-flex align-center">
                  <v-icon :color="event.color" class="mr-2">
                    mdi-calendar
                  </v-icon>
                  <div class="flex-grow-1">
                    <div class="text-subtitle-2">{{ event.title }}</div>
                    <div class="text-caption">
                      {{ formatDateTime(event.startDate) }}
                    </div>
                  </div>
                  <v-btn
                    icon
                    size="x-small"
                    variant="text"
                    color="error"
                    @click="confirmDeleteEvent(event)"
                  >
                    <v-icon size="small">mdi-delete</v-icon>
                  </v-btn>
                </div>
              </v-card>
              <p
                v-if="upcomingEvents.length === 0"
                class="text-center text-caption mt-4"
              >
                No upcoming events
              </p>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dayDialog" max-width="600px">
      <v-card v-if="selectedDay">
        <v-card-title class="text-h6">
          Events on {{ selectedDay.fullDate }}
        </v-card-title>
        <v-card-text>
          <div v-if="selectedDay.events.length === 0" class="text-center py-4">
            <v-icon size="48" color="grey">mdi-calendar-blank</v-icon>
            <p class="mt-2">No events scheduled</p>
          </div>
          <v-list v-else>
            <v-list-item
              v-for="event in selectedDay.events"
              :key="event._id"
              class="mb-2"
            >
              <template v-slot:prepend>
                <v-icon :color="event.color">mdi-calendar</v-icon>
              </template>
              <v-list-item-title>{{ event.title }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ event.description }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ formatDateTime(event.startDate) }} -
                {{ formatDateTime(event.endDate) }}
              </v-list-item-subtitle>
              <template v-slot:append>
                <v-btn
                  icon
                  size="small"
                  variant="text"
                  color="error"
                  @click="confirmDeleteEvent(event)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" variant="text" @click="dayDialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h6">Confirm Delete</v-card-title>
        <v-card-text> Are you sure you want to delete this event? </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" variant="text" @click="deleteDialog = false">
            Cancel
          </v-btn>
          <v-btn color="error" variant="elevated" @click="deleteEvent">
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
  name: "StudyPlannerPage",
  data() {
    return {
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      events: [],
      loading: false,
      daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      categories: [
        "Study",
        "Exam",
        "Assignment",
        "Project",
        "Meeting",
        "Other",
      ],
      colors: [
        { title: "Blue", value: "#3949ab" },
        { title: "Red", value: "#e53935" },
        { title: "Green", value: "#43a047" },
        { title: "Orange", value: "#fb8c00" },
        { title: "Purple", value: "#8e24aa" },
        { title: "Teal", value: "#00897b" },
      ],
      newEvent: {
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        category: "Study",
        color: "#3949ab",
        allDay: false,
      },
      dayDialog: false,
      deleteDialog: false,
      selectedDay: null,
      selectedEvent: null,
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
    currentMonthYear() {
      const date = new Date(this.currentYear, this.currentMonth);
      return date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    },
    calendarDays() {
      const firstDay = new Date(this.currentYear, this.currentMonth, 1);
      const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
      const prevMonthLastDay = new Date(this.currentYear, this.currentMonth, 0);

      const days = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (let i = firstDay.getDay(); i > 0; i--) {
        const day = prevMonthLastDay.getDate() - i + 1;
        const date = new Date(this.currentYear, this.currentMonth - 1, day);
        days.push({
          day,
          date,
          fullDate: date.toLocaleDateString(),
          otherMonth: true,
          isToday: false,
          events: this.getEventsForDate(date),
        });
      }

      for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(this.currentYear, this.currentMonth, day);
        date.setHours(0, 0, 0, 0);
        days.push({
          day,
          date,
          fullDate: date.toLocaleDateString(),
          otherMonth: false,
          isToday: date.getTime() === today.getTime(),
          events: this.getEventsForDate(date),
        });
      }

      const remainingDays = 42 - days.length;
      for (let day = 1; day <= remainingDays; day++) {
        const date = new Date(this.currentYear, this.currentMonth + 1, day);
        days.push({
          day,
          date,
          fullDate: date.toLocaleDateString(),
          otherMonth: true,
          isToday: false,
          events: this.getEventsForDate(date),
        });
      }

      return days;
    },
    upcomingEvents() {
      const now = new Date();
      return this.events
        .filter((e) => new Date(e.startDate) >= now)
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
        .slice(0, 5);
    },
  },
  created() {
    this.fetchEvents();
  },
  methods: {
    async fetchEvents() {
      this.loading = true;
      try {
        const response = await api.get("/events", {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        if (response.data.success) {
          this.events = response.data.events;
        }
      } catch (error) {
        this.showSnackbar("Error fetching events", "error");
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async createEvent() {
      const { valid } = await this.$refs.eventForm.validate();
      if (!valid) return;

      try {
        await api.post("/events", this.newEvent, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.showSnackbar("Event created successfully", "success");
        this.newEvent = {
          title: "",
          description: "",
          startDate: "",
          endDate: "",
          category: "Study",
          color: "#3949ab",
          allDay: false,
        };
        this.fetchEvents();
      } catch (error) {
        this.showSnackbar("Error creating event", "error");
        console.error(error);
      }
    },
    confirmDeleteEvent(event) {
      this.selectedEvent = event;
      this.deleteDialog = true;
    },
    async deleteEvent() {
      try {
        await api.delete(`/events/${this.selectedEvent._id}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.showSnackbar("Event deleted successfully", "success");
        this.deleteDialog = false;
        this.dayDialog = false;
        this.fetchEvents();
      } catch (error) {
        this.showSnackbar("Error deleting event", "error");
        console.error(error);
      }
    },
    getEventsForDate(date) {
      const dayStart = new Date(date);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(date);
      dayEnd.setHours(23, 59, 59, 999);

      return this.events.filter((event) => {
        const eventStart = new Date(event.startDate);
        const eventEnd = new Date(event.endDate);
        return (
          (eventStart >= dayStart && eventStart <= dayEnd) ||
          (eventEnd >= dayStart && eventEnd <= dayEnd) ||
          (eventStart <= dayStart && eventEnd >= dayEnd)
        );
      });
    },
    selectDay(day) {
      this.selectedDay = day;
      this.dayDialog = true;
    },
    previousMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    },
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    },
    formatDateTime(date) {
      return new Date(date).toLocaleString();
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
.study-planner-page {
  padding: 2em 1em;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
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

.calendar {
  width: 100%;
}

.calendar-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 8px;
}

.calendar-day-header {
  text-align: center;
  font-weight: bold;
  padding: 8px;
  background: #f5f5f5;
  border-radius: 4px;
}

.calendar-body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.calendar-day {
  min-height: 100px;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.calendar-day:hover {
  background: #f5f5f5;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.calendar-day.other-month {
  opacity: 0.4;
}

.calendar-day.today {
  background: #e3f2fd;
  border: 2px solid #2196f3;
}

.calendar-day.has-events {
  background: #fff3e0;
}

.day-number {
  font-weight: bold;
  margin-bottom: 4px;
}

.day-events {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.event-chip {
  font-size: 0.7em;
  height: 18px;
}

.more-events {
  font-size: 0.7em;
  color: #666;
  margin-top: 2px;
}

.upcoming-events {
  max-height: 300px;
  overflow-y: auto;
}
</style>

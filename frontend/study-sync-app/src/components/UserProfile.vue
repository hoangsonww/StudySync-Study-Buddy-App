<template>
  <div class="profile-page">
    <div v-if="isLoading" class="loading-container">
      <div class="spinner"></div>
      <p>Loading profile...</p>
    </div>

    <div v-else class="profile-container">
      <div class="profile-header">
        <div class="avatar-container">
          <img
            :src="user.avatar || defaultAvatar"
            alt="Avatar"
            class="avatar"
          />
          <button
            class="avatar-edit-btn"
            @click="editAvatar"
            :disabled="isSaving"
          >
            <span class="icon">📷</span>
          </button>
        </div>
        <h1 class="user-name">{{ user.name }}</h1>
        <p class="user-email">{{ user.email }}</p>
      </div>

      <div class="profile-grid">
        <div class="profile-card">
          <div class="card-header">
            <span class="card-icon">👤</span>
            <h3>Personal Info</h3>
          </div>
          <div class="info-row">
            <label>Name</label>
            <div class="info-content">
              <input
                v-if="isEditingName"
                v-model="newName"
                type="text"
                :disabled="isSaving"
              />
              <span v-else>{{ user.name }}</span>
              <button
                @click="isEditingName ? saveName() : editName()"
                :disabled="isSaving"
              >
                {{ isEditingName ? "✓" : "✏️" }}
              </button>
            </div>
          </div>
          <div class="info-row">
            <label>Mood</label>
            <div class="info-content">
              <input
                v-if="isEditingMood"
                v-model="newMood"
                type="text"
                :disabled="isSaving"
              />
              <span v-else>{{ user.mood || "Not set" }}</span>
              <button
                @click="isEditingMood ? saveMood() : editMood()"
                :disabled="isSaving"
              >
                {{ isEditingMood ? "✓" : "✏️" }}
              </button>
            </div>
          </div>
        </div>

        <div class="profile-card">
          <div class="card-header">
            <span class="card-icon">📚</span>
            <h3>Courses</h3>
          </div>
          <div class="info-row full">
            <div class="tags-container" v-if="!isEditingCourses">
              <span v-for="course in user.courses" :key="course" class="tag">{{
                course
              }}</span>
              <span
                v-if="!user.courses || user.courses.length === 0"
                class="empty"
                >No courses</span
              >
            </div>
            <input
              v-else
              v-model="newCourses"
              type="text"
              placeholder="comma separated"
              :disabled="isSaving"
            />
            <button
              @click="isEditingCourses ? saveCourses() : editCourses()"
              :disabled="isSaving"
            >
              {{ isEditingCourses ? "✓ Save" : "✏️ Edit" }}
            </button>
          </div>
        </div>

        <div class="profile-card">
          <div class="card-header">
            <span class="card-icon">💡</span>
            <h3>Interests</h3>
          </div>
          <div class="info-row full">
            <div class="tags-container" v-if="!isEditingInterests">
              <span
                v-for="interest in user.interests"
                :key="interest"
                class="tag"
                >{{ interest }}</span
              >
              <span
                v-if="!user.interests || user.interests.length === 0"
                class="empty"
                >No interests</span
              >
            </div>
            <input
              v-else
              v-model="newInterests"
              type="text"
              placeholder="comma separated"
              :disabled="isSaving"
            />
            <button
              @click="isEditingInterests ? saveInterests() : editInterests()"
              :disabled="isSaving"
            >
              {{ isEditingInterests ? "✓ Save" : "✏️ Edit" }}
            </button>
          </div>
        </div>

        <div class="profile-card">
          <div class="card-header">
            <span class="card-icon">⏰</span>
            <h3>Available Times</h3>
          </div>
          <div class="info-row full">
            <div class="tags-container" v-if="!isEditingAvailableTimes">
              <span
                v-for="time in user.availableTimes"
                :key="time"
                class="tag"
                >{{ time }}</span
              >
              <span
                v-if="!user.availableTimes || user.availableTimes.length === 0"
                class="empty"
                >No times set</span
              >
            </div>
            <input
              v-else
              v-model="newAvailableTimes"
              type="text"
              placeholder="comma separated"
              :disabled="isSaving"
            />
            <button
              @click="
                isEditingAvailableTimes
                  ? saveAvailableTimes()
                  : editAvailableTimes()
              "
              :disabled="isSaving"
            >
              {{ isEditingAvailableTimes ? "✓ Save" : "✏️ Edit" }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="isEditingAvatar"
      class="modal"
      @click.self="isEditingAvatar = false"
    >
      <div class="modal-content">
        <h3>Update Avatar</h3>
        <input
          v-model="newAvatar"
          type="url"
          placeholder="Enter image URL"
          :disabled="isSaving"
        />
        <div class="modal-actions">
          <button @click="saveAvatar" :disabled="isSaving">Save</button>
          <button @click="isEditingAvatar = false" class="cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        avatar: "",
        interests: [],
        availableTimes: [],
        courses: [],
        mood: "",
        groups: [],
      },
      isEditingName: false,
      newName: "",
      isEditingAvatar: false,
      newAvatar: "",
      isEditingInterests: false,
      newInterests: "",
      isEditingMood: false,
      newMood: "",
      isEditingAvailableTimes: false,
      newAvailableTimes: "",
      isEditingCourses: false,
      newCourses: "",
      isEditingGroups: false,
      newGroups: "",
      defaultAvatar: "OIP.jpg", // Default avatar file
      isLoading: true,
      isSaving: false,
      isSavingName: false,
      isSavingAvatar: false,
      isSavingInterests: false,
    };
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    // Redirect to login if no token is available
    redirectToLogin() {
      this.$router.push("/login");
    },

    // Fetch user profile from the API
    async fetchUserProfile() {
      const token = this.token || localStorage.getItem("token"); // Check token in Vuex or localStorage
      if (!token) {
        this.redirectToLogin(); // If not authenticated, redirect to login
        return;
      }

      try {
        const { data } = await axios.get(
          "https://studysync-backend-api.vercel.app/api/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        this.user = data.user;
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching user profile:", error);
        this.isLoading = false;
      }
    },

    // Edit and Save Methods for Profile Data
    editName() {
      this.isEditingName = true;
      this.newName = this.user.name;
    },
    async saveName() {
      const token = localStorage.getItem("token");
      this.isSaving = true;
      try {
        await axios.put(
          "https://studysync-backend-api.vercel.app/api/profile",
          { name: this.newName },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        this.user.name = this.newName;
        this.isEditingName = false;
      } catch (error) {
        console.error("Error updating name:", error);
      } finally {
        this.isSaving = false;
      }
    },
    editAvatar() {
      this.isEditingAvatar = true;
      this.newAvatar = this.user.avatar || "";
    },
    async saveAvatar() {
      const token = localStorage.getItem("token");
      this.isSaving = true;
      try {
        await axios.put(
          "https://studysync-backend-api.vercel.app/api/profile",
          { avatar: this.newAvatar },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        this.user.avatar = this.newAvatar;
        this.isEditingAvatar = false;
      } catch (error) {
        console.error("Error updating avatar:", error);
      } finally {
        this.isSaving = false;
      }
    },
    editInterests() {
      this.isEditingInterests = true;
      this.newInterests = this.user.interests.join(", ");
    },
    async saveInterests() {
      const token = localStorage.getItem("token");
      this.isSaving = true;
      const updatedInterests = this.newInterests
        .split(",")
        .map((item) => item.trim());
      try {
        await axios.put(
          "https://studysync-backend-api.vercel.app/api/profile",
          { interests: updatedInterests },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        this.user.interests = updatedInterests;
        this.isEditingInterests = false;
      } catch (error) {
        console.error("Error updating interests:", error);
      } finally {
        this.isSaving = false;
      }
    },
    editMood() {
      this.isEditingMood = true;
      this.newMood = this.user.mood;
    },
    async saveMood() {
      const token = localStorage.getItem("token");
      this.isSaving = true;
      try {
        await axios.put(
          "https://studysync-backend-api.vercel.app/api/profile",
          { mood: this.newMood },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        this.user.mood = this.newMood;
        this.isEditingMood = false;
      } catch (error) {
        console.error("Error updating mood:", error);
      } finally {
        this.isSaving = false;
      }
    },
    editAvailableTimes() {
      this.isEditingAvailableTimes = true;
      this.newAvailableTimes = this.user.availableTimes.join(", ");
    },
    async saveAvailableTimes() {
      const token = localStorage.getItem("token");
      this.isSaving = true;
      const updatedTimes = this.newAvailableTimes
        .split(",")
        .map((item) => item.trim());
      try {
        await axios.put(
          "https://studysync-backend-api.vercel.app/api/profile",
          { availableTimes: updatedTimes },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        this.user.availableTimes = updatedTimes;
        this.isEditingAvailableTimes = false;
      } catch (error) {
        console.error("Error updating available times:", error);
      } finally {
        this.isSaving = false;
      }
    },
    editCourses() {
      this.isEditingCourses = true;
      this.newCourses = this.user.courses.join(", ");
    },
    async saveCourses() {
      const token = localStorage.getItem("token");
      this.isSaving = true;
      const updatedCourses = this.newCourses
        .split(",")
        .map((item) => item.trim());
      try {
        await axios.put(
          "https://studysync-backend-api.vercel.app/api/profile",
          { courses: updatedCourses },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        this.user.courses = updatedCourses;
        this.isEditingCourses = false;
      } catch (error) {
        console.error("Error updating courses:", error);
      } finally {
        this.isSaving = false;
      }
    },
    editGroups() {
      this.isEditingGroups = true;
      this.newGroups = this.user.groups.join(", ");
    },
    async saveGroups() {
      const token = localStorage.getItem("token");
      const updatedGroups = this.newGroups
        .split(",")
        .map((item) => item.trim());
      try {
        await axios.put(
          "https://studysync-backend-api.vercel.app/api/profile",
          { groups: updatedGroups },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        this.user.groups = updatedGroups;
        this.isEditingGroups = false;
      } catch (error) {
        console.error("Error updating groups:", error);
      }
    },
  },
  created() {
    this.fetchUserProfile();
  },
};
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 32px 16px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.profile-container {
  max-width: 1200px;
  margin: 0 auto;
}

.profile-header {
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 48px 32px;
  border-radius: 20px;
  margin-bottom: 32px;
  color: white;
  position: relative;
}

.avatar-container {
  position: relative;
  display: inline-block;
  margin-bottom: 16px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid white;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.avatar-edit-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  font-size: 18px;
}

.user-name {
  font-size: 2em;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.user-email {
  opacity: 0.9;
  font-size: 1em;
  margin: 0;
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.profile-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f1f3f5;
}

.card-icon {
  font-size: 24px;
}

.card-header h3 {
  margin: 0;
  font-size: 1.25em;
  font-weight: 600;
  color: #1e293b;
}

.info-row {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.info-row.full {
  flex-direction: column;
  align-items: stretch;
}

.info-row label {
  font-weight: 600;
  color: #64748b;
  font-size: 0.9em;
  min-width: 80px;
}

.info-content {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.info-content span {
  flex: 1;
  color: #1e293b;
  font-weight: 500;
}

.info-content input,
.info-row input {
  flex: 1;
  padding: 8px 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.95em;
  outline: none;
  transition: border-color 0.2s;
}

.info-content input:focus,
.info-row input:focus {
  border-color: #667eea;
}

.info-content button,
.info-row button {
  padding: 6px 12px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9em;
  font-weight: 500;
  transition: all 0.2s;
}

.info-content button:hover,
.info-row button:hover {
  background: #5568d3;
  transform: translateY(-1px);
}

.info-content button:disabled,
.info-row button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.tag {
  display: inline-block;
  padding: 6px 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px;
  font-size: 0.85em;
  font-weight: 500;
}

.empty {
  color: #94a3b8;
  font-style: italic;
  font-size: 0.9em;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background: white;
  padding: 32px;
  border-radius: 16px;
  max-width: 400px;
  width: 90%;
}

.modal-content h3 {
  margin: 0 0 20px 0;
  color: #1e293b;
}

.modal-content input {
  width: 100%;
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 1em;
}

.modal-actions {
  display: flex;
  gap: 12px;
}

.modal-actions button {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.modal-actions button:first-child {
  background: #667eea;
  color: white;
}

.modal-actions button.cancel {
  background: #e5e7eb;
  color: #64748b;
}

@media (max-width: 768px) {
  .profile-header {
    padding: 32px 20px;
  }

  .user-name {
    font-size: 1.5em;
  }

  .profile-grid {
    grid-template-columns: 1fr;
  }
}
</style>

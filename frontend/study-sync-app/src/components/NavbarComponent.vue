<template>
  <!-- Navbar -->
  <v-app-bar color="white" elevation="0" class="modern-navbar">
    <v-container>
      <v-row align="center" no-gutters class="d-flex align-center">
        <!-- Logo and Title -->
        <v-col class="d-flex align-center">
          <v-icon
            class="logo-icon mr-2"
            style="
              font-family: &quot;Poppins&quot;, sans-serif;
              font-size: 24px;
            "
            >mdi-school</v-icon
          >
          <v-toolbar-title
            class="title"
            style="
              font-family: &quot;Poppins&quot;, sans-serif;
              font-size: 24px;
              cursor: pointer;
            "
            @click="goToLanding"
            >StudySync</v-toolbar-title
          >
        </v-col>

        <!-- Desktop Navigation Links -->
        <v-col class="d-none d-md-flex justify-end align-center">
          <v-btn
            text
            to="/"
            class="nav-btn"
            :class="{ 'active-link': $route.path === '/' }"
            style="
              font-family: &quot;Poppins&quot;, sans-serif;
              font-size: 16px;
            "
          >
            <v-icon class="nav-icon">mdi-home</v-icon> Home
          </v-btn>

          <v-menu v-if="isAuthenticated" open-on-hover>
            <template v-slot:activator="{ props }">
              <v-btn
                text
                class="nav-btn"
                v-bind="props"
                style="
                  font-family: &quot;Poppins&quot;, sans-serif;
                  font-size: 16px;
                "
              >
                <v-icon class="nav-icon">mdi-tools</v-icon> Tools
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item to="/materials">
                <v-list-item-title>
                  <v-icon class="mr-2">mdi-book-open-variant</v-icon>
                  Study Materials
                </v-list-item-title>
              </v-list-item>
              <v-list-item to="/quizzes">
                <v-list-item-title>
                  <v-icon class="mr-2">mdi-file-question</v-icon>
                  Quizzes
                </v-list-item-title>
              </v-list-item>
              <v-list-item to="/progress">
                <v-list-item-title>
                  <v-icon class="mr-2">mdi-chart-line</v-icon>
                  Progress Tracker
                </v-list-item-title>
              </v-list-item>
              <v-list-item to="/goals">
                <v-list-item-title>
                  <v-icon class="mr-2">mdi-target</v-icon>
                  Goals
                </v-list-item-title>
              </v-list-item>
              <v-list-item to="/planner">
                <v-list-item-title>
                  <v-icon class="mr-2">mdi-calendar</v-icon>
                  Study Planner
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-btn
            text
            to="/resources"
            class="nav-btn"
            :class="{ 'active-link': $route.path === '/resources' }"
            style="
              font-family: &quot;Poppins&quot;, sans-serif;
              font-size: 16px;
            "
          >
            <v-icon class="nav-icon">mdi-link-variant</v-icon> Resources
          </v-btn>

          <v-btn
            text
            to="/profile"
            class="nav-btn"
            :class="{ 'active-link': $route.path === '/profile' }"
            style="
              font-family: &quot;Poppins&quot;, sans-serif;
              font-size: 16px;
            "
          >
            <v-icon class="nav-icon">mdi-account</v-icon> Profile
          </v-btn>
          <v-btn
            text
            to="/register"
            class="nav-btn"
            :class="{ 'active-link': $route.path === '/register' }"
            style="
              font-family: &quot;Poppins&quot;, sans-serif;
              font-size: 16px;
            "
          >
            <v-icon class="nav-icon">mdi-account-plus</v-icon> Register
          </v-btn>
          <v-btn
            v-if="!isAuthenticated"
            text
            to="/login"
            class="nav-btn"
            :class="{ 'active-link': $route.path === '/login' }"
            style="
              font-family: &quot;Poppins&quot;, sans-serif;
              font-size: 16px;
            "
          >
            <v-icon class="nav-icon">mdi-login</v-icon> Login
          </v-btn>
          <v-btn
            v-if="isAuthenticated"
            text
            @click="logout"
            class="nav-btn"
            style="
              font-family: &quot;Poppins&quot;, sans-serif;
              font-size: 16px;
              color: red;
            "
          >
            <v-icon class="nav-icon">mdi-logout</v-icon> Logout
          </v-btn>
        </v-col>

        <!-- Mobile Menu Icon -->
        <v-col class="d-flex d-md-none justify-end">
          <v-app-bar-nav-icon
            class="mobile-menu-icon"
            @click="drawer = !drawer"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>

  <!-- Mobile Drawer for Navigation -->
  <v-navigation-drawer
    v-model="drawer"
    temporary
    fixed
    left
    width="280"
    overlay
    class="indigo darken-3"
  >
    <v-list dense>
      <v-list-item to="/" @click="closeDrawer" class="mobile-nav-item">
        <v-list-item-icon>
          <v-icon class="mobile-nav-icon">mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content
          style="font-family: &quot;Poppins&quot;, sans-serif; font-size: 16px"
          >Home</v-list-item-content
        >
      </v-list-item>

      <v-list-group v-if="isAuthenticated" value="tools">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props">
            <v-list-item-icon>
              <v-icon class="mobile-nav-icon">mdi-tools</v-icon>
            </v-list-item-icon>
            <v-list-item-content
              style="
                font-family: &quot;Poppins&quot;, sans-serif;
                font-size: 16px;
              "
              >Study Tools</v-list-item-content
            >
          </v-list-item>
        </template>

        <v-list-item to="/materials" @click="closeDrawer">
          <v-list-item-icon>
            <v-icon class="mobile-nav-icon">mdi-book-open-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Study Materials</v-list-item-content>
        </v-list-item>

        <v-list-item to="/quizzes" @click="closeDrawer">
          <v-list-item-icon>
            <v-icon class="mobile-nav-icon">mdi-file-question</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Quizzes</v-list-item-content>
        </v-list-item>

        <v-list-item to="/progress" @click="closeDrawer">
          <v-list-item-icon>
            <v-icon class="mobile-nav-icon">mdi-chart-line</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Progress Tracker</v-list-item-content>
        </v-list-item>

        <v-list-item to="/goals" @click="closeDrawer">
          <v-list-item-icon>
            <v-icon class="mobile-nav-icon">mdi-target</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Goals</v-list-item-content>
        </v-list-item>

        <v-list-item to="/planner" @click="closeDrawer">
          <v-list-item-icon>
            <v-icon class="mobile-nav-icon">mdi-calendar</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Study Planner</v-list-item-content>
        </v-list-item>
      </v-list-group>

      <v-list-item to="/resources" @click="closeDrawer" class="mobile-nav-item">
        <v-list-item-icon>
          <v-icon class="mobile-nav-icon">mdi-link-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-content
          style="font-family: &quot;Poppins&quot;, sans-serif; font-size: 16px"
          >Resources</v-list-item-content
        >
      </v-list-item>

      <v-list-item to="/profile" @click="closeDrawer" class="mobile-nav-item">
        <v-list-item-icon>
          <v-icon class="mobile-nav-icon">mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content
          style="font-family: &quot;Poppins&quot;, sans-serif; font-size: 16px"
          >Profile</v-list-item-content
        >
      </v-list-item>

      <v-list-item to="/register" @click="closeDrawer" class="mobile-nav-item">
        <v-list-item-icon>
          <v-icon class="mobile-nav-icon">mdi-account-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-content
          style="font-family: &quot;Poppins&quot;, sans-serif; font-size: 16px"
          >Register</v-list-item-content
        >
      </v-list-item>

      <v-list-item
        v-if="!isAuthenticated"
        to="/login"
        @click="closeDrawer"
        class="mobile-nav-item"
      >
        <v-list-item-icon>
          <v-icon class="mobile-nav-icon">mdi-login</v-icon>
        </v-list-item-icon>
        <v-list-item-content
          style="font-family: &quot;Poppins&quot;, sans-serif; font-size: 16px"
          >Login</v-list-item-content
        >
      </v-list-item>

      <v-list-item
        v-if="isAuthenticated"
        @click="logoutAndCloseDrawer"
        class="mobile-nav-item"
        style="color: red"
      >
        <v-list-item-icon>
          <v-icon class="mobile-nav-icon" style="color: red">mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content
          style="font-family: &quot;Poppins&quot;, sans-serif; font-size: 16px"
          >Logout</v-list-item-content
        >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios"; // Assuming Axios is used for HTTP requests

export default {
  data() {
    return {
      drawer: false, // For controlling the mobile menu drawer
      tokenCheckInterval: null, // For managing the periodic validation interval
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"]), // Gets authentication state from Vuex
  },
  methods: {
    goToLanding() {
      this.$router.push("/landing"); // Navigate to the landing page
    },
    ...mapActions(["logout"]), // Vuex action for logging out
    closeDrawer() {
      this.drawer = false; // Close the navigation drawer
    },
    logoutAndCloseDrawer() {
      this.logout(); // Log out and update state
      this.drawer = false; // Close the drawer
    },
    async fetchUserProfile() {
      const token = localStorage.getItem("token"); // Retrieve the token
      if (!token) {
        this.forceLogout();
        return;
      }

      try {
        await axios.get(
          "https://studysync-backend-api.vercel.app/api/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
      } catch (error) {
        console.error("Token validation failed:", error.message);

        // Clear token and redirect
        this.forceLogout();
      }
    },

    forceLogout() {
      // Clear the token
      localStorage.removeItem("token");

      this.logout(); // Log out to update the state

      // Check if the user is already on the login page
      if (this.$route.path !== "/login") {
        if (this.$route.path === "/home" || this.$route.path === "/profile") {
          console.log("Redirecting to login...");
          this.$router.replace("/login"); // Use Vue Router for SPA navigation
        } else {
          console.log("User is not on /home or /profile. No redirect.");
        }
      } else {
        console.log("Already on login page.");
      }
    },
  },
  created() {
    // Perform initial token validation
    this.fetchUserProfile();

    // Set up periodic validation every 5 seconds
    this.tokenCheckInterval = setInterval(this.fetchUserProfile, 5000);
  },
  beforeUnmount() {
    // Clear the interval to prevent memory leaks
    if (this.tokenCheckInterval) {
      clearInterval(this.tokenCheckInterval);
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");

.title:hover {
  color: #6200ea;
  cursor: pointer;
}

.modern-navbar {
  border-bottom: 1px solid #e0e0e0 !important;
  padding: 8px 0 !important;
}

.v-app-bar {
  position: relative !important;
}

.logo-icon {
  font-size: 28px;
  color: #6366f1;
  margin-right: 12px;
}

.nav-btn {
  color: #1f2937 !important;
  font-weight: 500;
  text-transform: none;
  margin: 0 5px;
  padding: 8px 16px;
  font-family: "Poppins", sans-serif;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  border-radius: 12px;
}

.nav-icon {
  margin-right: 8px;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
}

.active-link {
  background: rgba(255, 255, 255, 0.2) !important;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
}

.mobile-nav-item {
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
}

.mobile-nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.mobile-nav-icon {
  margin-right: 10px;
  color: #333;
}

.v-navigation-drawer {
  border-radius: 0 8px 8px 0;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}

.v-list-item {
  transition: background-color 0.3s ease;
}

.v-list-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.main-content {
  margin-top: 64px;
  padding: 24px;
}

.mobile-menu-icon {
  color: #ffffff;
  font-size: 26px;
}
</style>

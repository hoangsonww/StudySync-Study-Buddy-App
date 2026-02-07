<template>
  <v-container class="login-container">
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" lg="4">
        <v-card class="pa-5 login-card" elevation="6">
          <v-card-title
            class="text-center"
            style="font-family: &quot;Poppins&quot;, sans-serif"
          >
            <h2 class="login-title">Login</h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitLogin">
              <v-text-field
                label="Email"
                v-model="email"
                prepend-icon="mdi-email"
                outlined
                dense
                required
                style="font-family: &quot;Poppins&quot;, sans-serif"
              />
              <v-text-field
                label="Password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                outlined
                dense
                required
                style="font-family: &quot;Poppins&quot;, sans-serif"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="togglePasswordVisibility"
              />
              <!-- Forgot Password Link -->
              <div class="forgot-password-link" style="text-align: center">
                <a @click.prevent="navigateToForgotPassword"
                  >Forgot Password?</a
                >
              </div>
              <v-btn
                color="primary"
                class="mt-4 login-btn"
                block
                type="submit"
                style="
                  font-family: &quot;Poppins&quot;, sans-serif;
                  font-size: 16px;
                "
                :loading="isLoading"
                :disabled="isLoading"
              >
                <template v-if="!isLoading">Login</template>
                <template v-else>
                  <v-progress-circular
                    indeterminate
                    color="white"
                    size="20"
                    class="mr-2"
                  />
                  Loading...
                </template>
              </v-btn>
              <!-- Show error message if login fails -->
              <p v-if="errorMessage" class="error-message">
                {{ errorMessage }}
              </p>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      showPassword: false, // State to toggle password visibility
      isLoading: false, // Loading state
      errorMessage: null,
    };
  },
  methods: {
    ...mapActions(["login"]),
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async submitLogin() {
      this.isLoading = true; // Set loading state
      this.errorMessage = null; // Clear previous error
      try {
        // Call the login action from Vuex
        await this.login({ email: this.email, password: this.password });

        // Redirect to dashboard on successful login
        this.$router.push("/home");
      } catch (error) {
        // If an error occurs, set the error message
        this.errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "Invalid email or password";

        console.error("Login error:", error);
      } finally {
        this.isLoading = false; // Reset loading state
      }
    },
    navigateToForgotPassword() {
      this.$router.push("/forgot-password");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");

.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}

.login-card {
  border-radius: 12px;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.2);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.login-card:hover {
  transform: translateY(-4px);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.3);
}

.login-title {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  color: #3a3a9e;
  margin: 0;
  font-size: 1.8em;
}

.v-text-field label {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  color: #6a6a6a;
}

.forgot-password-link {
  margin-top: 8px;
  text-align: right;
}

.forgot-password-link a {
  color: #3949ab;
  font-family: "Poppins", sans-serif;
  font-size: 1em;
  text-decoration: none;
}

.forgot-password-link a:hover {
  text-decoration: underline;
  cursor: pointer;
}

.login-btn {
  font-weight: 500;
  font-size: 1em;
  color: white;
  text-transform: uppercase;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}

.login-btn:hover {
  background-color: #3949ab;
  transform: translateY(-2px);
}

.error-message {
  color: #e53935;
  font-family: "Poppins", sans-serif;
  font-size: 0.9em;
  margin-top: 16px;
  text-align: center;
}
</style>

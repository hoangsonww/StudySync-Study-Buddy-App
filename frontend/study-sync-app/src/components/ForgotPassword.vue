<template>
  <v-container class="forgot-password-container">
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" lg="4">
        <v-card class="pa-5 forgot-password-card" elevation="6">
          <v-card-title class="text-center">
            <h2 class="forgot-password-title">Forgot Password</h2>
          </v-card-title>
          <v-card-text>
            <!-- Prevent form submission and page reload with @submit.prevent -->
            <v-form @submit.prevent>
              <!-- Email Input -->
              <v-text-field
                label="Email"
                v-model="email"
                prepend-icon="mdi-email"
                outlined
                dense
                required
                @keydown.enter="verifyEmail"
              />

              <!-- Show verification message or proceed to password reset -->
              <v-btn
                v-if="!emailVerified"
                color="primary"
                class="mt-4 verify-btn"
                block
                @click="verifyEmail"
              >
                Verify Email
              </v-btn>

              <!-- Password Reset Fields -->
              <v-text-field
                v-if="emailVerified"
                label="New Password"
                v-model="newPassword"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                outlined
                dense
                required
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="togglePasswordVisibility"
                @keydown.enter="handleForgotPassword"
              />
              <v-text-field
                v-if="emailVerified"
                label="Confirm Password"
                v-model="confirmPassword"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="mdi-lock-check"
                outlined
                dense
                required
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="togglePasswordVisibility"
                @keydown.enter="handleForgotPassword"
              />

              <!-- Submit Button for Password Reset, directly bound to the reset method -->
              <v-btn
                v-if="emailVerified"
                color="primary"
                class="mt-4 reset-btn"
                block
                @click="handleForgotPassword"
              >
                Reset Password
              </v-btn>

              <!-- Error or Success Messages -->
              <p v-if="errorMessage" class="error-message">
                {{ errorMessage }}
              </p>
              <p v-if="successMessage" class="success-message">
                {{ successMessage }}
              </p>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      newPassword: "",
      confirmPassword: "",
      showPassword: false,
      emailVerified: false,
      errorMessage: null,
      successMessage: null,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async verifyEmail() {
      try {
        const response = await axios.post(
          "https://studysync-backend-api.vercel.app/api/auth/verify-email",
          { email: this.email },
        );

        if (response.data.exists) {
          this.emailVerified = true;
          this.errorMessage = null;
        } else {
          this.errorMessage = "Email not found. Please check and try again.";
          this.emailVerified = false;
        }
      } catch (error) {
        console.error("Error verifying email:", error);
        this.errorMessage = "An error occurred. Please try again.";
      }
    },
    async handleForgotPassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = "Passwords do not match!";
        return;
      }

      try {
        await axios.post(
          "https://studysync-backend-api.vercel.app/api/auth/reset-password",
          { email: this.email, newPassword: this.newPassword },
        );

        this.successMessage =
          "Password reset successfully. Redirecting to login...";
        this.errorMessage = null;

        // Delay before redirecting to login
        setTimeout(() => {
          this.$router.push("/login");
        }, 2000); // 2-second delay for user to read the success message
      } catch (error) {
        console.error("Error resetting password:", error);
        this.errorMessage = "Failed to reset password. Please try again.";
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");

.forgot-password-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}

.forgot-password-card {
  border-radius: 12px;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.2);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.forgot-password-card:hover {
  transform: translateY(-4px);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.3);
}

.forgot-password-title {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  color: #3a3a9e;
  margin: 0;
  font-size: 1.8em;
}

.v-application .v-text-field .v-label,
.v-application .v-text-field input,
.v-application .v-text-field textarea {
  font-family: "Poppins", sans-serif !important;
}

.verify-btn,
.reset-btn {
  font-weight: 500;
  font-size: 1em;
  color: white;
  text-transform: uppercase;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}

.verify-btn:hover,
.reset-btn:hover {
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

.success-message {
  color: #4caf50;
  font-family: "Poppins", sans-serif;
  font-size: 0.9em;
  margin-top: 16px;
  text-align: center;
}
</style>

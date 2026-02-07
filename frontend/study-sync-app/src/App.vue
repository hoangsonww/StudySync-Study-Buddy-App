<template>
  <v-app class="no-scroll-container">
    <Navbar v-if="showNavbar" />
    <v-main>
      <div class="main-content">
        <router-view />
      </div>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "./components/NavbarComponent.vue";
import Footer from "./components/FooterComponent.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
  computed: {
    showNavbar() {
      return !this.$route.meta.hideNavbar;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap");

:root {
  --app-font-family: "Poppins", sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto;
  font-family: var(--app-font-family) !important;
}

#app,
.v-application,
.v-application * {
  font-family: var(--app-font-family) !important;
}

code,
pre,
kbd,
samp {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace !important;
}

.no-scroll-container .v-application__wrap,
.no-scroll-container .v-main,
.no-scroll-container .v-main__wrap {
  height: auto !important;
  max-height: none !important;
  overflow: visible !important;
}

.v-main {
  padding: 0 !important;
}

.main-content {
  padding: 0;
  background: #f8fafc;
  min-height: calc(100vh - 64px);
  width: 100%;
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

.v-card {
  border-radius: 20px !important;
  overflow: hidden;
}

.v-btn {
  border-radius: 12px !important;
  text-transform: none !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
}

.v-text-field .v-field,
.v-textarea .v-field,
.v-select .v-field {
  border-radius: 12px !important;
}

.v-dialog > .v-overlay__content > .v-card {
  border-radius: 20px !important;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3) !important;
}

.v-snackbar {
  border-radius: 12px !important;
}

.v-chip {
  border-radius: 8px !important;
  font-weight: 500 !important;
}

.v-container {
  max-width: 1400px !important;
}

@media (max-width: 1264px) {
  .v-container {
    max-width: 100% !important;
    padding: 12px !important;
  }
}
</style>

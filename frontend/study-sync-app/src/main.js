import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import "@mdi/font/css/materialdesignicons.css";
import config from "./config";

loadFonts();

const app = createApp(App);

// Make config available globally
app.config.globalProperties.$config = config;
app.config.globalProperties.$apiBase = config.API_BASE_URL;
app.config.globalProperties.$backendUrl = config.BACKEND_URL;

// Add console log for debugging
console.log("🚀 StudySync Frontend Started");
console.log("📡 API Base URL:", config.API_BASE_URL);
console.log("🔧 Environment:", process.env.NODE_ENV);

app.use(router).use(store).use(vuetify).mount("#app");

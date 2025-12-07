import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import UserRegister from "../components/UserRegister.vue";
import UserLogin from "../components/UserLogin.vue";
import UserProfile from "../components/UserProfile.vue";
import store from "../store";
import NotFound from "@/components/NotFound.vue";
import LandingPage from "@/components/LandingPage.vue";
import ForgotPassword from "@/components/ForgotPassword.vue";
import StudyMaterialsPage from "../views/StudyMaterialsPage.vue";
import QuizPage from "../views/QuizPage.vue";
import ProgressTrackerPage from "../views/ProgressTrackerPage.vue";
import GoalsPage from "../views/GoalsPage.vue";
import StudyPlannerPage from "../views/StudyPlannerPage.vue";
import ResourcesPage from "../views/ResourcesPage.vue";

const routes = [
  { path: "/", component: HomePage, meta: { requiresAuth: true } },
  { path: "/home", component: HomePage, meta: { requiresAuth: true } },
  { path: "/register", component: UserRegister },
  { path: "/login", component: UserLogin },
  { path: "/profile", component: UserProfile, meta: { requiresAuth: true } },
  { path: "/landing", component: LandingPage },
  { path: "/forgot-password", component: ForgotPassword },
  {
    path: "/materials",
    component: StudyMaterialsPage,
    meta: { requiresAuth: true },
  },
  { path: "/quizzes", component: QuizPage, meta: { requiresAuth: true } },
  {
    path: "/progress",
    component: ProgressTrackerPage,
    meta: { requiresAuth: true },
  },
  { path: "/goals", component: GoalsPage, meta: { requiresAuth: true } },
  {
    path: "/planner",
    component: StudyPlannerPage,
    meta: { requiresAuth: true },
  },
  { path: "/resources", component: ResourcesPage },
  { path: "/:catchAll(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route guard for authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/landing");
  } else {
    next();
  }
});

export default router;

<template>
  <div class="landing-page">
    <section class="hero">
      <div class="hero-decor hero-decor-1"></div>
      <div class="hero-decor hero-decor-2"></div>
      <div class="hero-decor hero-decor-3"></div>

      <div class="hero-shell">
        <header class="hero-topbar" data-animate>
          <div class="brand-block">
            <span class="brand-dot"></span>
            <span class="brand-name">StudySync</span>
          </div>
          <button class="text-action" @click="navigateToLogin">Sign In</button>
        </header>

        <div class="hero-grid">
          <div class="hero-copy">
            <p class="hero-eyebrow" data-animate>
              Academic Performance Platform
            </p>
            <h1 class="hero-title" data-animate>
              Professional Study Operations for Modern Learners
            </h1>
            <p class="hero-subtitle" data-animate>
              Plan workload, track learning velocity, and coordinate focused
              sessions across your week from one clean workspace designed for
              discipline and measurable growth.
            </p>
            <div class="hero-actions" data-animate>
              <button class="primary-btn" @click="navigateToApp">
                Go to Workspace
              </button>
              <button class="secondary-btn" @click="navigateToRegister">
                Sign Up for Free
              </button>
            </div>
            <ul class="hero-trust-line" data-animate>
              <li>No credit card required</li>
              <li>Setup in under 2 minutes</li>
              <li>Works on desktop and mobile</li>
            </ul>
          </div>

          <aside class="hero-panel" data-animate>
            <p class="panel-title">Live Platform Snapshot</p>
            <p class="panel-subtitle">
              High-volume study systems demand clear metrics.
            </p>
            <div class="hero-stat-grid">
              <article
                class="hero-stat-card"
                v-for="(stat, index) in heroStats"
                :key="stat.id"
                data-animate
                :style="getStaggerStyle(index, 90, 360)"
              >
                <p>{{ stat.label }}</p>
                <strong class="count-up" :data-counter-id="stat.id">
                  {{ formatCounter(stat) }}
                </strong>
              </article>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section class="platform-section">
      <div class="section-shell">
        <div class="section-heading" data-animate>
          <p class="section-kicker">Platform At A Glance</p>
          <h2>Big Numbers. Clear Outcomes. No Noise.</h2>
          <p>
            From daily execution to long-term progress, these numbers show what
            consistent learners can operate at using structured workflows.
          </p>
        </div>
        <div class="platform-stats">
          <article
            class="platform-stat-card"
            v-for="(stat, index) in platformStats"
            :key="stat.id"
            data-animate
            :style="getStaggerStyle(index, 70, 350)"
          >
            <strong class="count-up" :data-counter-id="stat.id">
              {{ formatCounter(stat) }}
            </strong>
            <p>{{ stat.label }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="pillars-section">
      <div class="section-shell">
        <div class="section-heading" data-animate>
          <p class="section-kicker">Core Capabilities</p>
          <h2>Everything Required For Serious Study Cycles</h2>
          <p>
            Each module is built to support planning, execution, review, and
            retention so your momentum compounds week after week.
          </p>
        </div>
        <div class="pillars-grid">
          <article
            class="pillar-card"
            v-for="(feature, index) in featurePillars"
            :key="feature.title"
            data-animate
            :style="getStaggerStyle(index, 75, 300)"
          >
            <p class="pillar-icon">{{ feature.icon }}</p>
            <h3>{{ feature.title }}</h3>
            <p class="pillar-text">{{ feature.description }}</p>
            <ul>
              <li v-for="point in feature.points" :key="point">{{ point }}</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section class="workflow-section">
      <div class="section-shell">
        <div class="section-heading" data-animate>
          <p class="section-kicker">Execution Workflow</p>
          <h2>A Structured Flow From Plan To Results</h2>
          <p>
            Move through a repeatable cycle that keeps your sessions aligned
            with deadlines, mastery goals, and measurable outputs.
          </p>
        </div>
        <div class="workflow-grid">
          <article
            class="workflow-card"
            v-for="(step, index) in workflowSteps"
            :key="step.step"
            data-animate
            :style="getStaggerStyle(index, 90, 380)"
          >
            <span class="workflow-step">{{ step.step }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="impact-section">
      <div class="section-shell">
        <div class="section-heading" data-animate>
          <p class="section-kicker">Measured Impact</p>
          <h2>Performance Indicators That Matter</h2>
          <p>
            StudySync supports better execution quality, faster review loops,
            and reliable visibility into progress at every stage.
          </p>
        </div>
        <div class="impact-grid">
          <article
            class="impact-stat-card"
            v-for="(metric, index) in impactStats"
            :key="metric.id"
            data-animate
            :style="getStaggerStyle(index, 85, 340)"
          >
            <strong class="count-up" :data-counter-id="metric.id">
              {{ formatCounter(metric) }}
            </strong>
            <p>{{ metric.label }}</p>
          </article>
        </div>
        <div class="detail-grid">
          <article
            class="detail-card"
            v-for="(detail, index) in detailHighlights"
            :key="detail.title"
            data-animate
            :style="getStaggerStyle(index, 75, 260)"
          >
            <h3>{{ detail.title }}</h3>
            <p>{{ detail.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="governance-section">
      <div class="section-shell">
        <div class="section-heading" data-animate>
          <p class="section-kicker">Reliability & Governance</p>
          <h2>Professional Foundation, Student-Friendly Experience</h2>
          <p>
            Operational confidence comes from secure defaults, transparent
            control, and clear ownership of your study data.
          </p>
        </div>
        <div class="governance-grid">
          <article
            class="governance-card"
            v-for="(item, index) in governanceItems"
            :key="item.title"
            data-animate
            :style="getStaggerStyle(index, 80, 320)"
          >
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="section-shell">
        <div class="cta-panel" data-animate>
          <p class="section-kicker">Get Started</p>
          <h2>Build Your Most Consistent Semester Yet</h2>
          <p>
            Launch your workspace, configure your goals, and begin tracking
            progress in a system designed for focus and accountability.
          </p>
          <div class="cta-actions">
            <button class="primary-btn" @click="navigateToApp">
              Create Free Account
            </button>
            <button
              class="secondary-btn cta-outline-btn"
              @click="navigateToLogin"
            >
              Sign In
            </button>
          </div>
          <p class="cta-note">
            No carousel. No clutter. Just clear workflows and measurable
            progress.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      heroStats: [
        {
          id: "hero-learners",
          label: "Learners Onboarded",
          value: 128000,
          suffix: "+",
          duration: 1600,
          display: 0,
        },
        {
          id: "hero-hours",
          label: "Study Hours Planned",
          value: 8900000,
          suffix: "+",
          duration: 1800,
          display: 0,
        },
        {
          id: "hero-teams",
          label: "Courses & Cohorts",
          value: 4200,
          suffix: "+",
          duration: 1500,
          display: 0,
        },
        {
          id: "hero-retention",
          label: "Weekly Retention",
          value: 96.2,
          suffix: "%",
          decimals: 1,
          duration: 1700,
          display: 0,
        },
      ],
      platformStats: [
        {
          id: "platform-sessions",
          label: "Focused Sessions Completed",
          value: 2640000,
          suffix: "+",
          duration: 1700,
          display: 0,
        },
        {
          id: "platform-goals",
          label: "Goals Delivered On Time",
          value: 675000,
          suffix: "+",
          duration: 1500,
          display: 0,
        },
        {
          id: "platform-quizzes",
          label: "Practice Quizzes Generated",
          value: 980000,
          suffix: "+",
          duration: 1600,
          display: 0,
        },
        {
          id: "platform-reviews",
          label: "Flashcard Reviews",
          value: 12300000,
          suffix: "+",
          duration: 1800,
          display: 0,
        },
        {
          id: "platform-minutes",
          label: "Productive Minutes This Month",
          value: 54800000,
          suffix: "+",
          duration: 1900,
          display: 0,
        },
        {
          id: "platform-rating",
          label: "Average Platform Rating",
          value: 4.9,
          suffix: "/5",
          decimals: 1,
          duration: 1300,
          display: 0,
        },
      ],
      featurePillars: [
        {
          icon: "📘",
          title: "Intelligent Planning",
          description:
            "Build balanced weekly plans using workload-aware scheduling and priority scoring.",
          points: [
            "Deadline-aware study blocks",
            "Priority and difficulty balancing",
            "Fast weekly planning view",
          ],
        },
        {
          icon: "🧠",
          title: "Retention Toolkit",
          description:
            "Turn notes into quizzes and spaced repetition sets that reinforce long-term recall.",
          points: [
            "Question generation workflows",
            "Flashcard repetition support",
            "Active recall-friendly structure",
          ],
        },
        {
          icon: "📈",
          title: "Progress Visibility",
          description:
            "Track completion rates, session quality, and consistency trends with clear dashboards.",
          points: [
            "Daily and weekly streak tracking",
            "Goal completion analytics",
            "Session output summaries",
          ],
        },
        {
          icon: "⏱️",
          title: "Focus Execution",
          description:
            "Use timers, session templates, and quick task capture to run concentrated blocks.",
          points: [
            "Pomodoro-ready controls",
            "Task-to-session conversion",
            "Distraction-resistant workflow",
          ],
        },
        {
          icon: "🤝",
          title: "Collaborative Momentum",
          description:
            "Coordinate with peers, share resources, and maintain accountability across study groups.",
          points: [
            "Shared progress checkpoints",
            "Resource alignment by topic",
            "Group study accountability",
          ],
        },
        {
          icon: "🛡️",
          title: "Operational Reliability",
          description:
            "Run your study operations on a stable and well-organized platform with secure defaults.",
          points: [
            "Role-aware access paths",
            "Persistent history and records",
            "Clean, maintainable interface",
          ],
        },
      ],
      workflowSteps: [
        {
          step: "01",
          title: "Define Goals",
          description:
            "Set measurable outcomes for each course and map goals to weekly checkpoints.",
        },
        {
          step: "02",
          title: "Plan Sessions",
          description:
            "Create focused study blocks with realistic duration, priority, and topic context.",
        },
        {
          step: "03",
          title: "Execute Deep Work",
          description:
            "Run distraction-light sessions with timers, tasks, and active recall workflows.",
        },
        {
          step: "04",
          title: "Review Performance",
          description:
            "Inspect outcomes, close gaps, and adjust the next cycle with data-backed decisions.",
        },
      ],
      impactStats: [
        {
          id: "impact-completion",
          label: "Average Weekly Completion Increase",
          value: 37,
          suffix: "%",
          duration: 1400,
          display: 0,
        },
        {
          id: "impact-speed",
          label: "Faster Revision Cycle",
          value: 2.8,
          suffix: "x",
          decimals: 1,
          duration: 1500,
          display: 0,
        },
        {
          id: "impact-uptime",
          label: "Platform Availability",
          value: 99.95,
          suffix: "%",
          decimals: 2,
          duration: 1600,
          display: 0,
        },
        {
          id: "impact-focus",
          label: "Average Focus Sessions per User",
          value: 146,
          suffix: "/month",
          duration: 1400,
          display: 0,
        },
      ],
      detailHighlights: [
        {
          title: "Weekly Command Center",
          description:
            "A single view for goals, deadlines, priority tasks, and progress snapshots keeps execution aligned and predictable.",
        },
        {
          title: "Mastery-Oriented Review",
          description:
            "Quizzes, flashcards, and notes are connected so every revision cycle reinforces retention instead of repeating busywork.",
        },
        {
          title: "Momentum Without Burnout",
          description:
            "Structured sessions and realistic pacing help maintain consistency while reducing last-minute cramming pressure.",
        },
      ],
      governanceItems: [
        {
          title: "Privacy-Aware by Design",
          text: "Your learning data stays organized under your account with clear visibility and control over what you share.",
        },
        {
          title: "Consistent Experience",
          text: "A unified interface across desktop and mobile keeps workflows predictable for both solo and group use.",
        },
        {
          title: "Scalable Structure",
          text: "From single-course planning to full-term workloads, StudySync remains responsive and manageable as complexity grows.",
        },
      ],
      revealObserver: null,
      counterObserver: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initializeAnimations();
    });
  },
  beforeUnmount() {
    if (this.revealObserver) {
      this.revealObserver.disconnect();
    }
    if (this.counterObserver) {
      this.counterObserver.disconnect();
    }
  },
  methods: {
    navigateToApp() {
      this.$router.push("/");
    },
    navigateToRegister() {
      this.$router.push("/register");
    },
    navigateToLogin() {
      this.$router.push("/login");
    },
    getStaggerStyle(index, step = 70, max = 350) {
      return { "--reveal-delay": `${Math.min(index * step, max)}ms` };
    },
    getAllCounters() {
      return [...this.heroStats, ...this.platformStats, ...this.impactStats];
    },
    findCounter(counterId) {
      return this.getAllCounters().find((counter) => counter.id === counterId);
    },
    formatCounter(counter) {
      const value = Number(counter.display || 0);
      const decimals = counter.decimals || 0;
      const fixed = value.toFixed(decimals);
      const [integerPart, decimalPart] = fixed.split(".");
      const formattedInteger = Number(integerPart).toLocaleString("en-US");
      const formattedDecimal = decimalPart ? `.${decimalPart}` : "";
      return `${counter.prefix || ""}${formattedInteger}${formattedDecimal}${counter.suffix || ""}`;
    },
    animateCounter(counter) {
      if (!counter || counter._finished || counter._animating) {
        return;
      }

      counter._animating = true;
      const duration = counter.duration || 1600;
      const targetValue = Number(counter.value);
      const startValue = 0;
      const startedAt = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        counter.display =
          startValue + (targetValue - startValue) * easedProgress;

        if (progress < 1) {
          window.requestAnimationFrame(tick);
          return;
        }

        counter.display = targetValue;
        counter._animating = false;
        counter._finished = true;
      };

      window.requestAnimationFrame(tick);
    },
    initializeAnimations() {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const revealElements = this.$el.querySelectorAll("[data-animate]");
      const counterElements = this.$el.querySelectorAll(".count-up");

      if (reduceMotion || !("IntersectionObserver" in window)) {
        revealElements.forEach((element) => element.classList.add("in-view"));
        this.getAllCounters().forEach((counter) => {
          counter.display = counter.value;
          counter._finished = true;
        });
        return;
      }

      this.revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              this.revealObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.14,
          rootMargin: "0px 0px -8% 0px",
        },
      );

      this.counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }
            const counterId = entry.target.getAttribute("data-counter-id");
            if (counterId) {
              this.animateCounter(this.findCounter(counterId));
            }
            this.counterObserver.unobserve(entry.target);
          });
        },
        {
          threshold: 0.42,
          rootMargin: "0px 0px -10% 0px",
        },
      );

      revealElements.forEach((element) => this.revealObserver.observe(element));
      counterElements.forEach((element) =>
        this.counterObserver.observe(element),
      );
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&display=swap");

.landing-page {
  --landing-bg: #f2f7fb;
  --landing-surface: #ffffff;
  --landing-surface-alt: #eff5fb;
  --landing-ink: #0f2438;
  --landing-muted: #5c7187;
  --landing-line: #d5e1ed;
  --landing-brand: #0e5fbf;
  --landing-brand-dark: #0a488f;
  --landing-accent: #0fb5b5;
  --landing-shadow-soft: 0 20px 45px rgba(18, 44, 73, 0.1);
  --landing-shadow-strong: 0 26px 60px rgba(15, 36, 56, 0.14);
  --landing-radius-xl: 26px;
  --landing-radius-lg: 18px;
  color: var(--landing-ink);
  background: radial-gradient(
      circle at 8% 5%,
      rgba(15, 181, 181, 0.12) 0%,
      transparent 34%
    ),
    radial-gradient(
      circle at 95% 10%,
      rgba(14, 95, 191, 0.14) 0%,
      transparent 40%
    ),
    var(--landing-bg);
  overflow: clip;
}

.landing-page,
.landing-page * {
  font-family: "Manrope", "Segoe UI", sans-serif !important;
}

.hero {
  position: relative;
  min-height: 100vh;
  padding: clamp(1rem, 1.5vw, 1.5rem) 0 4.5rem;
  background: linear-gradient(145deg, #0f2e4a 0%, #114a7a 52%, #0d7790 100%);
  color: #f5fbff;
  overflow: hidden;
}

.hero-decor {
  position: absolute;
  border-radius: 50%;
  filter: blur(8px);
  pointer-events: none;
}

.hero-decor-1 {
  width: 460px;
  height: 460px;
  top: -180px;
  right: -80px;
  background: rgba(255, 255, 255, 0.12);
  animation: orbitA 18s ease-in-out infinite;
}

.hero-decor-2 {
  width: 340px;
  height: 340px;
  left: -110px;
  bottom: -130px;
  background: rgba(15, 181, 181, 0.18);
  animation: orbitB 19s ease-in-out infinite;
}

.hero-decor-3 {
  width: 170px;
  height: 170px;
  left: 45%;
  top: 26%;
  background: rgba(255, 255, 255, 0.08);
  animation: orbitC 15s ease-in-out infinite;
}

.hero-shell,
.section-shell {
  width: min(1200px, calc(100% - 3rem));
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.hero-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: clamp(2rem, 4vw, 3.5rem);
  gap: 1rem;
}

.brand-block {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.brand-dot {
  width: 0.72rem;
  height: 0.72rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #7ce2e2 0%, #91c9ff 100%);
  box-shadow: 0 0 16px rgba(147, 214, 255, 0.7);
}

.brand-name {
  font-family: "Sora", "Manrope", sans-serif !important;
  font-size: 1.1rem;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: clamp(1.2rem, 3vw, 2.2rem);
  align-items: center;
}

.hero-copy {
  max-width: 700px;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(212, 237, 255, 0.4);
  border-radius: 999px;
  padding: 0.45rem 1rem;
  font-size: 0.84rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 1.2rem;
  background: rgba(255, 255, 255, 0.08);
}

.hero-title {
  font-family: "Sora", "Manrope", sans-serif !important;
  font-size: clamp(2rem, 5vw, 4.1rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 1.15rem;
}

.hero-subtitle {
  max-width: 62ch;
  font-size: clamp(1rem, 1.4vw, 1.18rem);
  color: rgba(238, 248, 255, 0.92);
  line-height: 1.72;
  margin-bottom: 1.8rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-bottom: 1.35rem;
}

.primary-btn,
.secondary-btn,
.text-action {
  border: none;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease,
    color 0.25s ease;
}

.primary-btn {
  background: linear-gradient(135deg, #1ea6c9 0%, #0e6ecd 100%);
  color: #ffffff;
  padding: 0.95rem 1.45rem;
  box-shadow: 0 10px 26px rgba(7, 61, 102, 0.36);
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 32px rgba(4, 44, 81, 0.42);
}

.secondary-btn {
  background: transparent;
  color: #f6fbff;
  border: 1px solid rgba(224, 241, 255, 0.52);
  padding: 0.95rem 1.35rem;
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-2px);
}

.text-action {
  padding: 0.6rem 0.9rem;
  font-size: 0.95rem;
  color: #f2f8ff;
  background: transparent;
  border: 1px solid rgba(223, 241, 255, 0.35);
}

.text-action:hover {
  background: rgba(255, 255, 255, 0.09);
}

.hero-trust-line {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  list-style: none;
  padding: 0;
  color: rgba(238, 248, 255, 0.9);
  font-size: 0.92rem;
}

.hero-trust-line li {
  position: relative;
  padding-left: 1rem;
}

.hero-trust-line li::before {
  content: "";
  width: 0.44rem;
  height: 0.44rem;
  border-radius: 50%;
  background: #93ddff;
  position: absolute;
  left: 0;
  top: 0.38rem;
}

.hero-panel {
  background: rgba(8, 27, 45, 0.58);
  border: 1px solid rgba(202, 228, 250, 0.28);
  border-radius: var(--landing-radius-xl);
  padding: clamp(1.2rem, 2.2vw, 1.8rem);
  backdrop-filter: blur(8px);
  box-shadow: 0 24px 50px rgba(6, 24, 38, 0.35);
}

.panel-title {
  font-size: 1.05rem;
  font-weight: 800;
  margin-bottom: 0.35rem;
}

.panel-subtitle {
  color: rgba(229, 243, 255, 0.86);
  font-size: 0.92rem;
  margin-bottom: 1rem;
}

.hero-stat-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
}

.hero-stat-card {
  padding: 0.95rem;
  border-radius: 14px;
  border: 1px solid rgba(216, 237, 255, 0.2);
  background: rgba(255, 255, 255, 0.07);
}

.hero-stat-card p {
  font-size: 0.83rem;
  color: rgba(225, 242, 255, 0.9);
  margin-bottom: 0.5rem;
}

.hero-stat-card strong {
  font-family: "Sora", "Manrope", sans-serif !important;
  font-size: clamp(1.15rem, 2.3vw, 1.9rem);
  line-height: 1.05;
  color: #ffffff;
}

.platform-section,
.pillars-section,
.workflow-section,
.impact-section,
.governance-section,
.cta-section {
  padding: clamp(3.5rem, 6vw, 5.5rem) 0;
}

.section-heading {
  margin: 0 auto clamp(2rem, 3vw, 2.8rem);
  max-width: 760px;
  text-align: center;
}

.section-kicker {
  display: inline-flex;
  border-radius: 999px;
  padding: 0.38rem 0.95rem;
  margin-bottom: 0.8rem;
  background: rgba(14, 95, 191, 0.11);
  border: 1px solid rgba(14, 95, 191, 0.23);
  color: var(--landing-brand-dark);
  letter-spacing: 0.07em;
  text-transform: uppercase;
  font-size: 0.78rem;
  font-weight: 700;
}

.section-heading h2 {
  font-family: "Sora", "Manrope", sans-serif !important;
  font-size: clamp(1.7rem, 4vw, 2.9rem);
  line-height: 1.14;
  letter-spacing: -0.015em;
  margin-bottom: 0.8rem;
  color: #0f2538;
}

.section-heading p {
  color: var(--landing-muted);
  line-height: 1.7;
  font-size: 1.02rem;
}

.platform-section {
  background: var(--landing-bg);
}

.platform-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.platform-stat-card {
  background: var(--landing-surface);
  border: 1px solid var(--landing-line);
  border-radius: var(--landing-radius-lg);
  padding: 1.2rem 1rem;
  box-shadow: var(--landing-shadow-soft);
  text-align: center;
}

.platform-stat-card strong {
  font-family: "Sora", "Manrope", sans-serif !important;
  font-size: clamp(1.35rem, 3vw, 2.2rem);
  line-height: 1.08;
  display: block;
  margin-bottom: 0.4rem;
  color: #083d75;
}

.platform-stat-card p {
  color: var(--landing-muted);
  font-size: 0.95rem;
}

.pillars-section {
  background: linear-gradient(180deg, #f8fbff 0%, #edf5fc 100%);
}

.pillars-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.pillar-card {
  border-radius: var(--landing-radius-lg);
  border: 1px solid var(--landing-line);
  background: rgba(255, 255, 255, 0.98);
  padding: 1.35rem 1.2rem;
  box-shadow: var(--landing-shadow-soft);
}

.pillar-icon {
  font-size: 1.5rem;
  margin-bottom: 0.7rem;
}

.pillar-card h3 {
  font-family: "Sora", "Manrope", sans-serif !important;
  font-size: 1.2rem;
  margin-bottom: 0.45rem;
}

.pillar-text {
  color: var(--landing-muted);
  line-height: 1.62;
  margin-bottom: 0.72rem;
  font-size: 0.95rem;
}

.pillar-card ul {
  margin: 0;
  padding-left: 1rem;
  display: grid;
  gap: 0.38rem;
  color: #2a435e;
  font-size: 0.9rem;
}

.workflow-section {
  background: var(--landing-surface);
}

.workflow-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.workflow-card {
  background: linear-gradient(180deg, #f6fbff 0%, #edf4fb 100%);
  border: 1px solid #d9e6f2;
  border-radius: var(--landing-radius-lg);
  padding: 1.2rem 1rem;
}

.workflow-step {
  font-family: "Sora", "Manrope", sans-serif !important;
  display: inline-block;
  font-size: 0.84rem;
  letter-spacing: 0.08em;
  color: #0e5fbf;
  margin-bottom: 0.55rem;
}

.workflow-card h3 {
  font-size: 1.1rem;
  margin-bottom: 0.45rem;
}

.workflow-card p {
  color: var(--landing-muted);
  line-height: 1.62;
  font-size: 0.94rem;
}

.impact-section {
  background: linear-gradient(180deg, #edf6ff 0%, #f8fcff 100%);
}

.impact-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.impact-stat-card {
  border-radius: var(--landing-radius-lg);
  border: 1px solid #cae0f4;
  background: #ffffff;
  padding: 1.2rem 1rem;
  text-align: center;
  box-shadow: var(--landing-shadow-soft);
}

.impact-stat-card strong {
  font-family: "Sora", "Manrope", sans-serif !important;
  font-size: clamp(1.35rem, 3vw, 2.1rem);
  color: #0b4d95;
  display: block;
  margin-bottom: 0.45rem;
}

.impact-stat-card p {
  color: #45627e;
  font-size: 0.93rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.detail-card {
  border-radius: var(--landing-radius-lg);
  border: 1px solid #d0e0ef;
  background: #ffffff;
  padding: 1.15rem 1rem;
}

.detail-card h3 {
  font-size: 1.06rem;
  margin-bottom: 0.45rem;
}

.detail-card p {
  color: var(--landing-muted);
  line-height: 1.62;
  font-size: 0.93rem;
}

.governance-section {
  background: var(--landing-surface);
}

.governance-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.governance-card {
  border-radius: var(--landing-radius-lg);
  border: 1px solid #dae6f1;
  background: linear-gradient(180deg, #ffffff 0%, #f3f9ff 100%);
  padding: 1.25rem 1rem;
  box-shadow: 0 12px 28px rgba(15, 36, 56, 0.08);
}

.governance-card h3 {
  font-size: 1.08rem;
  margin-bottom: 0.45rem;
}

.governance-card p {
  color: var(--landing-muted);
  line-height: 1.65;
}

.cta-section {
  background: radial-gradient(
      circle at 5% 95%,
      rgba(15, 181, 181, 0.1) 0%,
      transparent 30%
    ),
    radial-gradient(
      circle at 88% 8%,
      rgba(14, 95, 191, 0.1) 0%,
      transparent 36%
    ),
    #eff6fd;
}

.cta-panel {
  max-width: 880px;
  margin: 0 auto;
  text-align: center;
  padding: clamp(1.6rem, 3vw, 2.4rem);
  border-radius: var(--landing-radius-xl);
  border: 1px solid #cbdeef;
  background: rgba(255, 255, 255, 0.93);
  box-shadow: var(--landing-shadow-strong);
}

.cta-panel h2 {
  font-family: "Sora", "Manrope", sans-serif !important;
  font-size: clamp(1.65rem, 4vw, 2.6rem);
  margin-bottom: 0.8rem;
}

.cta-panel > p {
  color: #4b627b;
  line-height: 1.7;
}

.cta-actions {
  margin-top: 1.2rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.cta-note {
  margin-top: 0.95rem;
  font-size: 0.9rem;
  color: #5f7489;
}

.cta-outline-btn {
  color: #10283f;
  border: 1.5px solid #10283f;
  background: transparent;
}

.cta-outline-btn:hover {
  color: #10283f;
  background: rgba(16, 40, 63, 0.08);
}

[data-animate] {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 0.58s cubic-bezier(0.2, 0.7, 0.2, 1),
    transform 0.58s cubic-bezier(0.2, 0.7, 0.2, 1);
  transition-delay: var(--reveal-delay, 0ms);
}

[data-animate].in-view {
  opacity: 1;
  transform: translateY(0);
}

@keyframes orbitA {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-16px, 20px) scale(1.04);
  }
}

@keyframes orbitB {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(18px, -16px) scale(1.03);
  }
}

@keyframes orbitC {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-14px, 14px);
  }
}

@media (max-width: 1080px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }

  .hero-copy {
    max-width: none;
  }

  .platform-stats,
  .pillars-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .workflow-grid,
  .impact-grid,
  .detail-grid,
  .governance-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .hero-shell,
  .section-shell {
    width: min(1200px, calc(100% - 1.4rem));
  }

  .hero {
    min-height: auto;
    padding-bottom: 3.2rem;
  }

  .hero-topbar {
    margin-bottom: 2rem;
  }

  .hero-stat-grid {
    grid-template-columns: 1fr;
  }

  .hero-trust-line {
    flex-direction: column;
    gap: 0.55rem;
  }

  .platform-stats,
  .pillars-grid,
  .workflow-grid,
  .impact-grid,
  .detail-grid,
  .governance-grid {
    grid-template-columns: 1fr;
  }

  .primary-btn,
  .secondary-btn {
    width: 100%;
    justify-content: center;
  }

  .hero-actions,
  .cta-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .section-heading p {
    font-size: 0.96rem;
  }

  .workflow-card,
  .platform-stat-card,
  .impact-stat-card,
  .detail-card,
  .governance-card,
  .pillar-card {
    padding: 1.05rem 0.95rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-decor,
  [data-animate] {
    animation: none !important;
    transition: none !important;
  }
}
</style>

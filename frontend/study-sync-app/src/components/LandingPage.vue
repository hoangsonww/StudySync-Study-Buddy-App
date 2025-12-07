<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-background">
        <div class="floating-shape shape-1"></div>
        <div class="floating-shape shape-2"></div>
        <div class="floating-shape shape-3"></div>
      </div>
      <div class="hero-content">
        <div class="hero-badge">🎓 Trusted by 10,000+ Students Worldwide</div>
        <h1 class="hero-title">
          Master Your Studies with <br /><span class="gradient-text"
            >StudySync</span
          >
        </h1>
        <p class="hero-subtitle">
          The ultimate productivity platform built for ambitious learners. Track
          progress, collaborate seamlessly, and achieve academic excellence with
          AI-powered tools.
        </p>
        <div class="cta-buttons">
          <button class="btn-primary" @click="navigateToApp">
            <span>Start Learning Free</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button class="btn-secondary" @click="$router.push('/login')">
            <span>Sign In</span>
          </button>
        </div>
        <div class="hero-features">
          <div class="mini-feature">
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>No Credit Card</span>
          </div>
          <div class="mini-feature">
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span>Free Forever</span>
          </div>
          <div class="mini-feature">
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Instant Setup</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Social Proof Section -->
    <section class="social-proof">
      <div class="stats-container">
        <div class="stat-card">
          <div class="stat-number">10,000+</div>
          <div class="stat-label">Active Students</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">50,000+</div>
          <div class="stat-label">Study Sessions</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">98%</div>
          <div class="stat-label">Success Rate</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">4.9/5</div>
          <div class="stat-label">User Rating</div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="section-header">
        <span class="section-badge">FEATURES</span>
        <h2 class="section-title">Everything You Need to Excel</h2>
        <p class="section-subtitle">
          Powerful tools designed to boost your productivity and academic
          performance
        </p>
      </div>

      <div class="features-grid">
        <div
          class="feature-card"
          v-for="feature in topFeatures"
          :key="feature.title"
        >
          <div
            class="feature-icon-wrapper"
            :style="{ background: feature.color }"
          >
            <div class="feature-icon">{{ feature.icon }}</div>
          </div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works">
      <div class="section-header">
        <span class="section-badge">HOW IT WORKS</span>
        <h2 class="section-title">Get Started in 3 Simple Steps</h2>
      </div>
      <div class="steps-container">
        <div class="step-card">
          <div class="step-number">1</div>
          <div class="step-icon">📝</div>
          <h3>Create Your Account</h3>
          <p>Sign up in seconds and customize your learning dashboard</p>
        </div>
        <div class="step-arrow">→</div>
        <div class="step-card">
          <div class="step-number">2</div>
          <div class="step-icon">🎯</div>
          <h3>Set Your Goals</h3>
          <p>Define your study objectives and create a personalized plan</p>
        </div>
        <div class="step-arrow">→</div>
        <div class="step-card">
          <div class="step-number">3</div>
          <div class="step-icon">🚀</div>
          <h3>Start Learning</h3>
          <p>Access powerful tools and track your progress in real-time</p>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section">
      <div class="section-header">
        <span class="section-badge">TESTIMONIALS</span>
        <h2 class="section-title">Loved by Students Everywhere</h2>
      </div>
      <div class="testimonials-grid">
        <div
          class="testimonial-card"
          v-for="testimonial in testimonials"
          :key="testimonial.name"
        >
          <div class="quote-icon">"</div>
          <p class="testimonial-text">{{ testimonial.text }}</p>
          <div class="testimonial-author">
            <div class="author-avatar">{{ testimonial.avatar }}</div>
            <div>
              <div class="author-name">{{ testimonial.name }}</div>
              <div class="author-role">{{ testimonial.role }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-background">
        <div class="cta-shape cta-shape-1"></div>
        <div class="cta-shape cta-shape-2"></div>
      </div>
      <div class="cta-content">
        <h2>Ready to Transform Your Study Experience?</h2>
        <p>
          Join thousands of students achieving their academic goals with
          StudySync
        </p>
        <button class="btn-large" @click="navigateToApp">
          <span>Get Started Now - It's Free</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <p class="cta-note">
          ✨ No credit card required • Free forever • Cancel anytime
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topFeatures: [
        {
          icon: "📚",
          title: "Study Materials Library",
          description:
            "Organize all your study resources in one place with smart categorization",
          color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        },
        {
          icon: "🎯",
          title: "Quiz Generator",
          description:
            "Create and take interactive quizzes to test your knowledge",
          color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        },
        {
          icon: "📊",
          title: "Progress Tracking",
          description:
            "Visualize your learning journey with detailed analytics",
          color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        },
        {
          icon: "⏱️",
          title: "Pomodoro Timer",
          description: "Stay focused with proven time management techniques",
          color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        },
        {
          icon: "🤖",
          title: "AI Assistant",
          description:
            "Get instant help and personalized study recommendations",
          color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        },
        {
          icon: "🎴",
          title: "Flashcards",
          description: "Master concepts with interactive spaced repetition",
          color: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
        },
      ],
      testimonials: [
        {
          text: "StudySync completely transformed how I study. The progress tracking keeps me motivated, and the AI assistant is like having a personal tutor!",
          name: "Sarah Johnson",
          role: "Computer Science Student",
          avatar: "👩‍💻",
        },
        {
          text: "I've tried many study apps, but StudySync is by far the best. The Pomodoro timer and goal tracking features helped me ace my exams!",
          name: "Michael Chen",
          role: "Medical Student",
          avatar: "👨‍⚕️",
        },
        {
          text: "The quiz generator is a game-changer! I can create practice tests from my notes in minutes. My grades improved by 20% this semester.",
          name: "Emma Williams",
          role: "Business Major",
          avatar: "👩‍🎓",
        },
      ],
    };
  },
  methods: {
    navigateToApp() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap");

* {
  box-sizing: border-box;
}

.landing-page {
  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  color: #1a202c;
  overflow-x: hidden;
}

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  animation: float 20s infinite ease-in-out;
}

.shape-1 {
  width: 400px;
  height: 400px;
  background: white;
  top: -100px;
  right: -100px;
  animation-delay: 0s;
}

.shape-2 {
  width: 300px;
  height: 300px;
  background: white;
  bottom: -50px;
  left: -50px;
  animation-delay: 3s;
}

.shape-3 {
  width: 200px;
  height: 200px;
  background: white;
  top: 50%;
  left: 50%;
  animation-delay: 6s;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(30px, -30px) rotate(120deg);
  }
  66% {
    transform: translate(-20px, 20px) rotate(240deg);
  }
}

.hero-content {
  max-width: 900px;
  text-align: center;
  z-index: 1;
  animation: fadeInUp 1s ease-out;
}

.hero-badge {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.gradient-text {
  background: linear-gradient(to right, #ffd89b, #19547b, #ffd89b);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient 3s linear infinite;
}

@keyframes gradient {
  to {
    background-position: 200% center;
  }
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 2.5rem;
  line-height: 1.7;
  font-weight: 400;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary,
.btn-large {
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  font-family: "Inter", sans-serif;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background: white;
  color: #667eea;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: white;
  color: #667eea;
  transform: translateY(-3px);
}

.btn-large {
  background: white;
  color: #667eea;
  padding: 1.2rem 3rem;
  font-size: 1.2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
}

.btn-large:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.hero-features {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.mini-feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-size: 0.95rem;
}

.mini-feature svg {
  opacity: 0.9;
}

/* Social Proof */
.social-proof {
  padding: 4rem 2rem;
  background: white;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.stat-card {
  text-align: center;
  padding: 2rem 1.5rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 16px;
  transition: transform 0.3s ease;
  overflow: hidden;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  line-height: 1.2;
  word-break: keep-all;
  white-space: nowrap;
}

.stat-label {
  color: #64748b;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.4;
}

/* Features Section */
.features-section {
  padding: 6rem 2rem;
  background: linear-gradient(180deg, white 0%, #f8fafc 100%);
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-badge {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.section-title {
  font-size: 3rem;
  color: #1a202c;
  margin-bottom: 1rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.15);
}

.feature-icon-wrapper {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
}

.feature-card h3 {
  color: #1a202c;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  font-weight: 700;
}

.feature-card p {
  color: #64748b;
  line-height: 1.7;
  font-size: 1rem;
}

/* How It Works */
.how-it-works {
  padding: 6rem 2rem;
  background: white;
}

.steps-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
}

.step-card {
  flex: 1;
  min-width: 250px;
  max-width: 320px;
  text-align: center;
  padding: 2.5rem 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 20px;
  position: relative;
  transition: transform 0.3s ease;
}

.step-card:hover {
  transform: translateY(-10px);
}

.step-number {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.5rem;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.step-icon {
  font-size: 3rem;
  margin: 1.5rem 0 1rem;
}

.step-card h3 {
  color: #1a202c;
  margin-bottom: 0.8rem;
  font-size: 1.3rem;
  font-weight: 700;
}

.step-card p {
  color: #64748b;
  line-height: 1.6;
}

.step-arrow {
  font-size: 2.5rem;
  color: #cbd5e1;
  font-weight: 300;
}

/* Testimonials */
.testimonials-section {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.testimonials-section .section-badge {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.testimonials-section .section-title {
  color: white;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.testimonial-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: transform 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
}

.quote-icon {
  font-size: 4rem;
  color: #667eea;
  line-height: 1;
  margin-bottom: 1rem;
  font-family: Georgia, serif;
}

.testimonial-text {
  color: #334155;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.author-name {
  font-weight: 700;
  color: #1a202c;
  font-size: 1rem;
}

.author-role {
  font-size: 0.9rem;
  color: #64748b;
}

/* CTA Section */
.cta-section {
  padding: 6rem 2rem;
  background: white;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.cta-shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  opacity: 0.05;
}

.cta-shape-1 {
  width: 500px;
  height: 500px;
  top: -250px;
  right: -100px;
}

.cta-shape-2 {
  width: 400px;
  height: 400px;
  bottom: -200px;
  left: -100px;
}

.cta-content {
  position: relative;
  z-index: 1;
}

.cta-content h2 {
  font-size: 3rem;
  color: #1a202c;
  margin-bottom: 1rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.cta-content p {
  font-size: 1.3rem;
  color: #64748b;
  margin-bottom: 2.5rem;
}

.cta-note {
  margin-top: 1.5rem;
  font-size: 1rem;
  color: #94a3b8;
}

/* Footer */
.landing-footer {
  padding: 3rem 2rem 2rem;
  background: #0f172a;
  color: white;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto 2rem;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer-brand h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(to right, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-brand p {
  color: #94a3b8;
  font-size: 0.9rem;
}

.footer-links {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.footer-links a {
  color: #cbd5e1;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.95rem;
}

.footer-links a:hover {
  color: white;
}

.footer-copyright {
  text-align: center;
  color: #64748b;
  font-size: 0.9rem;
  padding-top: 2rem;
  border-top: 1px solid #1e293b;
  margin: 0;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .stats-container {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }

  .stat-card {
    padding: 1.5rem 1rem;
  }

  .stat-number {
    font-size: 2rem;
  }

  .stat-label {
    font-size: 0.9rem;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .btn-primary,
  .btn-secondary,
  .btn-large {
    justify-content: center;
  }

  .step-arrow {
    display: none;
  }

  .footer-content {
    flex-direction: column;
    text-align: center;
  }

  .cta-content h2 {
    font-size: 2rem;
  }
}
</style>

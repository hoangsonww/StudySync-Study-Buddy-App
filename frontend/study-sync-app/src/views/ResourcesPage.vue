<template>
  <div class="resources-page">
    <v-container>
      <h1 class="page-title">🔗 Learning Resources</h1>
      <p class="page-subtitle">
        Curated collection of educational resources and tools
      </p>

      <v-row class="mb-4">
        <v-col cols="12" md="3">
          <v-select
            v-model="selectedCategory"
            :items="categories"
            label="Category"
            variant="outlined"
            density="compact"
          />
        </v-col>
        <v-col cols="12" md="9">
          <v-text-field
            v-model="searchQuery"
            label="Search resources..."
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="compact"
            clearable
          />
        </v-col>
      </v-row>

      <v-row ref="resultsSection">
        <v-col
          v-for="resource in filteredResources"
          :key="resource.id"
          cols="12"
          md="6"
          lg="4"
        >
          <v-card class="resource-card" elevation="3">
            <v-card-title>
              <v-icon :color="resource.color" class="mr-2">
                {{ resource.icon }}
              </v-icon>
              {{ resource.title }}
            </v-card-title>
            <v-card-subtitle>
              <v-chip size="small" :color="resource.color">
                {{ resource.category }}
              </v-chip>
              <v-chip
                v-if="resource.free"
                size="small"
                color="success"
                class="ml-2"
              >
                Free
              </v-chip>
            </v-card-subtitle>
            <v-card-text>
              <p>{{ resource.description }}</p>
              <div class="mt-3">
                <v-chip
                  v-for="tag in resource.tags"
                  :key="tag"
                  size="x-small"
                  class="mr-1 mb-1"
                  variant="outlined"
                >
                  {{ tag }}
                </v-chip>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                :href="resource.url"
                target="_blank"
                color="primary"
                variant="elevated"
                size="small"
              >
                Visit Site
              </v-btn>
              <v-spacer />
              <v-rating
                :model-value="resource.rating"
                readonly
                density="compact"
                size="small"
                color="warning"
              />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-6">
        <v-col cols="12">
          <v-card elevation="3" class="pa-6">
            <h2 class="text-h5 mb-4">📚 Study Tips & Techniques</h2>
            <v-expansion-panels>
              <v-expansion-panel v-for="(tip, index) in studyTips" :key="index">
                <v-expansion-panel-title>
                  <v-icon color="primary" class="mr-2">{{ tip.icon }}</v-icon>
                  {{ tip.title }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <p>{{ tip.description }}</p>
                  <ul class="mt-2">
                    <li v-for="(point, i) in tip.points" :key="i">
                      {{ point }}
                    </li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-6">
        <v-col cols="12">
          <v-card elevation="3" class="pa-6">
            <h2 class="text-h5 mb-4">🎓 Popular Topics</h2>
            <div class="topics-grid">
              <v-chip
                v-for="topic in popularTopics"
                :key="topic"
                size="large"
                class="ma-2"
                color="primary"
                variant="outlined"
                @click="searchTopic(topic)"
              >
                {{ topic }}
              </v-chip>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "ResourcesPage",
  data() {
    return {
      searchQuery: "",
      selectedCategory: "All",
      categories: [
        "All",
        "Programming",
        "Mathematics",
        "Science",
        "Languages",
        "Design",
        "Business",
        "General",
      ],
      resources: [
        {
          id: 1,
          title: "Khan Academy",
          description:
            "Free online courses, lessons and practice for all subjects",
          category: "General",
          url: "https://www.khanacademy.org",
          icon: "mdi-school",
          color: "green",
          free: true,
          rating: 5,
          tags: ["Math", "Science", "Economics", "Arts"],
        },
        {
          id: 2,
          title: "Coursera",
          description: "Learn from top universities and companies worldwide",
          category: "General",
          url: "https://www.coursera.org",
          icon: "mdi-certificate",
          color: "blue",
          free: false,
          rating: 5,
          tags: [
            "Courses",
            "Certificates",
            "Specializations",
            "Machine Learning",
            "Data Science",
          ],
        },
        {
          id: 3,
          title: "freeCodeCamp",
          description: "Learn to code for free with interactive challenges",
          category: "Programming",
          url: "https://www.freecodecamp.org",
          icon: "mdi-code-braces",
          color: "green",
          free: true,
          rating: 5,
          tags: ["Web Dev", "JavaScript", "Python", "Projects"],
        },
        {
          id: 4,
          title: "MDN Web Docs",
          description: "Comprehensive web development documentation",
          category: "Programming",
          url: "https://developer.mozilla.org",
          icon: "mdi-web",
          color: "blue",
          free: true,
          rating: 5,
          tags: ["HTML", "CSS", "JavaScript", "Reference"],
        },
        {
          id: 5,
          title: "Duolingo",
          description: "Learn languages through fun, bite-sized lessons",
          category: "Languages",
          url: "https://www.duolingo.com",
          icon: "mdi-translate",
          color: "green",
          free: true,
          rating: 4,
          tags: ["Spanish", "French", "German", "Multiple Languages"],
        },
        {
          id: 6,
          title: "edX",
          description: "Online courses from leading universities",
          category: "General",
          url: "https://www.edx.org",
          icon: "mdi-school-outline",
          color: "red",
          free: false,
          rating: 5,
          tags: ["MOOCs", "University", "Professional"],
        },
        {
          id: 7,
          title: "LeetCode",
          description: "Practice coding problems and prepare for interviews",
          category: "Programming",
          url: "https://leetcode.com",
          icon: "mdi-code-tags",
          color: "orange",
          free: true,
          rating: 5,
          tags: ["Algorithms", "Interview Prep", "Coding Challenges"],
        },
        {
          id: 8,
          title: "Wolfram Alpha",
          description: "Computational intelligence for math and science",
          category: "Mathematics",
          url: "https://www.wolframalpha.com",
          icon: "mdi-calculator-variant",
          color: "red",
          free: true,
          rating: 5,
          tags: ["Calculator", "Equations", "Problem Solving"],
        },
        {
          id: 9,
          title: "Figma",
          description: "Collaborative interface design tool",
          category: "Design",
          url: "https://www.figma.com",
          icon: "mdi-palette",
          color: "purple",
          free: true,
          rating: 5,
          tags: ["UI/UX", "Design", "Prototyping"],
        },
        {
          id: 10,
          title: "YouTube Edu",
          description: "Educational videos on every subject imaginable",
          category: "General",
          url: "https://www.youtube.com/education",
          icon: "mdi-youtube",
          color: "red",
          free: true,
          rating: 4,
          tags: ["Videos", "Tutorials", "Lectures"],
        },
        {
          id: 11,
          title: "MIT OpenCourseWare",
          description: "Free lecture notes, exams, and videos from MIT",
          category: "General",
          url: "https://ocw.mit.edu",
          icon: "mdi-book-open-page-variant",
          color: "red",
          free: true,
          rating: 5,
          tags: ["MIT", "University", "Free Courses"],
        },
        {
          id: 12,
          title: "Stack Overflow",
          description: "Q&A community for programmers",
          category: "Programming",
          url: "https://stackoverflow.com",
          icon: "mdi-stack-overflow",
          color: "orange",
          free: true,
          rating: 5,
          tags: ["Q&A", "Community", "Programming Help"],
        },
        {
          id: 13,
          title: "Codecademy",
          description: "Interactive coding lessons and projects",
          category: "Programming",
          url: "https://www.codecademy.com",
          icon: "mdi-laptop",
          color: "blue",
          free: false,
          rating: 4,
          tags: ["Coding", "Interactive", "Projects"],
        },
        {
          id: 14,
          title: "Quizlet",
          description: "Study tools including flashcards and games",
          category: "General",
          url: "https://quizlet.com",
          icon: "mdi-cards",
          color: "blue",
          free: true,
          rating: 4,
          tags: ["Flashcards", "Study Tools", "Memorization"],
        },
        {
          id: 15,
          title: "TED-Ed",
          description: "Educational videos that spark curiosity",
          category: "General",
          url: "https://ed.ted.com",
          icon: "mdi-lightbulb-on",
          color: "red",
          free: true,
          rating: 5,
          tags: ["Videos", "Education", "Ideas"],
        },
        {
          id: 16,
          title: "Fast.ai",
          description: "Practical deep learning for coders",
          category: "Programming",
          url: "https://www.fast.ai",
          icon: "mdi-robot",
          color: "purple",
          free: true,
          rating: 5,
          tags: ["Machine Learning", "Deep Learning", "AI", "Python"],
        },
        {
          id: 17,
          title: "Google ML Crash Course",
          description: "Machine learning fundamentals with TensorFlow",
          category: "Programming",
          url: "https://developers.google.com/machine-learning/crash-course",
          icon: "mdi-google",
          color: "blue",
          free: true,
          rating: 5,
          tags: ["Machine Learning", "TensorFlow", "Data Science", "AI"],
        },
        {
          id: 18,
          title: "Kaggle",
          description: "Data science competitions and learning platform",
          category: "Programming",
          url: "https://www.kaggle.com/learn",
          icon: "mdi-chart-line",
          color: "cyan",
          free: true,
          rating: 5,
          tags: ["Machine Learning", "Data Science", "Python", "Competitions"],
        },
        {
          id: 19,
          title: "Udacity",
          description: "Tech-focused nanodegree programs",
          category: "Programming",
          url: "https://www.udacity.com",
          icon: "mdi-school",
          color: "blue",
          free: false,
          rating: 4,
          tags: [
            "Web Development",
            "Machine Learning",
            "Cloud Computing",
            "Mobile Development",
          ],
        },
        {
          id: 20,
          title: "AWS Training",
          description: "Learn cloud computing with AWS",
          category: "Programming",
          url: "https://aws.amazon.com/training",
          icon: "mdi-cloud",
          color: "orange",
          free: true,
          rating: 5,
          tags: ["Cloud Computing", "AWS", "DevOps", "Infrastructure"],
        },
        {
          id: 21,
          title: "Microsoft Learn",
          description: "Learn Microsoft technologies and cloud services",
          category: "Programming",
          url: "https://learn.microsoft.com",
          icon: "mdi-microsoft",
          color: "blue",
          free: true,
          rating: 5,
          tags: ["Cloud Computing", "Azure", "Cybersecurity", ".NET"],
        },
        {
          id: 22,
          title: "Cybrary",
          description: "Free cybersecurity training and certifications",
          category: "Programming",
          url: "https://www.cybrary.it",
          icon: "mdi-shield-lock",
          color: "red",
          free: true,
          rating: 4,
          tags: [
            "Cybersecurity",
            "Ethical Hacking",
            "Network Security",
            "Certifications",
          ],
        },
        {
          id: 23,
          title: "Flutter",
          description: "Build mobile apps with Google's UI toolkit",
          category: "Programming",
          url: "https://flutter.dev/learn",
          icon: "mdi-cellphone",
          color: "blue",
          free: true,
          rating: 5,
          tags: ["Mobile Development", "Flutter", "Dart", "Cross-platform"],
        },
        {
          id: 24,
          title: "React Native Docs",
          description: "Build native mobile apps using React",
          category: "Programming",
          url: "https://reactnative.dev/docs/getting-started",
          icon: "mdi-react",
          color: "cyan",
          free: true,
          rating: 5,
          tags: ["Mobile Development", "React", "JavaScript", "Cross-platform"],
        },
        {
          id: 25,
          title: "HubSpot Academy",
          description: "Digital marketing and sales training",
          category: "Business",
          url: "https://academy.hubspot.com",
          icon: "mdi-bullhorn",
          color: "orange",
          free: true,
          rating: 5,
          tags: [
            "Digital Marketing",
            "SEO",
            "Content Marketing",
            "Business Analytics",
          ],
        },
        {
          id: 26,
          title: "Google Analytics Academy",
          description: "Learn data analytics and measurement",
          category: "Business",
          url: "https://analytics.google.com/analytics/academy",
          icon: "mdi-google-analytics",
          color: "orange",
          free: true,
          rating: 5,
          tags: [
            "Business Analytics",
            "Data Analysis",
            "Digital Marketing",
            "Web Analytics",
          ],
        },
        {
          id: 27,
          title: "Canva Design School",
          description: "Graphic design tutorials and courses",
          category: "Design",
          url: "https://www.canva.com/designschool",
          icon: "mdi-palette-advanced",
          color: "purple",
          free: true,
          rating: 4,
          tags: ["Graphic Design", "Visual Design", "Branding", "Social Media"],
        },
        {
          id: 28,
          title: "Adobe Creative Cloud Tutorials",
          description: "Master Adobe creative software",
          category: "Design",
          url: "https://helpx.adobe.com/support.html",
          icon: "mdi-adobe",
          color: "red",
          free: false,
          rating: 5,
          tags: ["Graphic Design", "Photo Editing", "Video Editing", "UI/UX"],
        },
        {
          id: 29,
          title: "DataCamp",
          description: "Learn data science interactively",
          category: "Programming",
          url: "https://www.datacamp.com",
          icon: "mdi-database",
          color: "green",
          free: false,
          rating: 4,
          tags: ["Data Science", "Python", "R", "Machine Learning"],
        },
        {
          id: 30,
          title: "The Odin Project",
          description: "Full-stack web development curriculum",
          category: "Programming",
          url: "https://www.theodinproject.com",
          icon: "mdi-web",
          color: "orange",
          free: true,
          rating: 5,
          tags: ["Web Development", "JavaScript", "Ruby", "Full Stack"],
        },
      ],
      studyTips: [
        {
          icon: "mdi-brain",
          title: "Active Recall",
          description: "Test yourself frequently instead of passive reading",
          points: [
            "Close your notes and try to remember key concepts",
            "Use flashcards to quiz yourself",
            "Explain topics out loud without looking at notes",
            "Practice retrieving information regularly",
          ],
        },
        {
          icon: "mdi-repeat",
          title: "Spaced Repetition",
          description:
            "Review material at increasing intervals for better retention",
          points: [
            "Review new material within 24 hours",
            "Review again after 3 days, then 7 days",
            "Use apps like Anki for automated spacing",
            "Focus more on difficult topics",
          ],
        },
        {
          icon: "mdi-timer-sand",
          title: "Pomodoro Technique",
          description: "Break study time into focused intervals",
          points: [
            "Study for 25 minutes without distractions",
            "Take a 5-minute break",
            "After 4 sessions, take a 15-30 minute break",
            "Track your completed sessions",
          ],
        },
        {
          icon: "mdi-teach",
          title: "Feynman Technique",
          description: "Learn by teaching concepts in simple terms",
          points: [
            "Choose a concept and study it",
            "Explain it in simple language as if teaching a child",
            "Identify gaps in your understanding",
            "Review and simplify further",
          ],
        },
        {
          icon: "mdi-sitemap",
          title: "Mind Mapping",
          description: "Visualize connections between concepts",
          points: [
            "Start with main topic in the center",
            "Branch out to subtopics",
            "Use colors and images for memory",
            "Show relationships between ideas",
          ],
        },
      ],
      popularTopics: [
        "Web Development",
        "Data Science",
        "Machine Learning",
        "Python Programming",
        "Digital Marketing",
        "Graphic Design",
        "Business Analytics",
        "Mobile Development",
        "Cybersecurity",
        "Cloud Computing",
      ],
    };
  },
  computed: {
    filteredResources() {
      let filtered = this.resources;

      if (this.selectedCategory !== "All") {
        filtered = filtered.filter((r) => r.category === this.selectedCategory);
      }

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (r) =>
            r.title.toLowerCase().includes(query) ||
            r.description.toLowerCase().includes(query) ||
            r.tags.some((tag) => tag.toLowerCase().includes(query)),
        );
      }

      return filtered;
    },
  },
  methods: {
    searchTopic(topic) {
      this.searchQuery = topic;
      this.$nextTick(() => {
        if (this.$refs.resultsSection) {
          this.$refs.resultsSection.$el.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.resources-page {
  padding: 2em 1em;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.page-title {
  text-align: center;
  font-size: 3em;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.page-subtitle {
  text-align: center;
  font-size: 1.3em;
  color: #34495e;
  margin-bottom: 2.5em;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.resource-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  border-radius: 15px !important;
  overflow: hidden;
}

.resource-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25) !important;
}

.topics-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>

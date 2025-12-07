<template>
  <div class="study-materials-page">
    <v-container>
      <h1 class="page-title">📚 Study Materials Library</h1>
      <p class="page-subtitle">
        Organize and manage all your study materials in one place
      </p>

      <v-row class="mb-4">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="searchQuery"
            label="Search materials..."
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="compact"
            clearable
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="selectedCategory"
            :items="categories"
            label="Filter by Category"
            variant="outlined"
            density="compact"
          />
        </v-col>
        <v-col cols="12" md="2">
          <v-btn
            color="primary"
            block
            size="large"
            @click="openCreateDialog"
            prepend-icon="mdi-plus"
          >
            Add New
          </v-btn>
        </v-col>
      </v-row>

      <v-row v-if="loading" class="justify-center">
        <v-progress-circular indeterminate color="primary" size="64" />
      </v-row>

      <v-row v-else>
        <v-col
          v-for="material in filteredMaterials"
          :key="material._id"
          cols="12"
          md="6"
          lg="4"
        >
          <v-card class="material-card" elevation="3">
            <v-card-title class="text-h6">
              <v-icon :color="getCategoryColor(material.category)" class="mr-2">
                mdi-book-open-variant
              </v-icon>
              {{ material.title }}
            </v-card-title>
            <v-card-subtitle>
              <v-chip size="small" :color="getCategoryColor(material.category)">
                {{ material.category }}
              </v-chip>
            </v-card-subtitle>
            <v-card-text>
              <p class="material-description">{{ material.description }}</p>
              <div class="tags-container mt-2">
                <v-chip
                  v-for="tag in material.tags"
                  :key="tag"
                  size="x-small"
                  class="mr-1 mb-1"
                  variant="outlined"
                >
                  {{ tag }}
                </v-chip>
              </div>
              <p class="text-caption mt-2">
                Updated: {{ formatDate(material.updatedAt) }}
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                size="small"
                color="primary"
                variant="text"
                @click="viewMaterial(material)"
              >
                View
              </v-btn>
              <v-btn
                size="small"
                color="secondary"
                variant="text"
                @click="editMaterial(material)"
              >
                Edit
              </v-btn>
              <v-spacer />
              <v-btn
                size="small"
                color="error"
                variant="text"
                @click="confirmDelete(material)"
              >
                Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col
          v-if="filteredMaterials.length === 0"
          cols="12"
          class="text-center"
        >
          <v-icon size="64" color="grey">mdi-folder-open-outline</v-icon>
          <p class="text-h6 mt-4">No materials found</p>
          <p class="text-body-2">Start by adding your first study material!</p>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="createDialog" max-width="800px" persistent>
      <v-card>
        <v-card-title class="text-h5" style="padding-top: 24px">
          {{ editMode ? "Edit" : "Add New" }} Study Material
        </v-card-title>
        <v-card-text style="padding-top: 20px">
          <v-form ref="materialForm">
            <v-text-field
              v-model="formData.title"
              label="Title *"
              variant="outlined"
              :rules="[rules.required]"
            />
            <v-textarea
              v-model="formData.description"
              label="Description"
              variant="outlined"
              rows="3"
            />
            <v-select
              v-model="formData.category"
              :items="categories.filter((c) => c !== 'All')"
              label="Category *"
              variant="outlined"
              :rules="[rules.required]"
            />
            <v-textarea
              v-model="formData.content"
              label="Content"
              variant="outlined"
              rows="8"
              placeholder="Add your study notes, key points, or explanations here..."
            />
            <v-text-field
              v-model="formData.fileUrl"
              label="File URL (optional)"
              variant="outlined"
              placeholder="https://example.com/file.pdf"
            />
            <v-combobox
              v-model="formData.tags"
              label="Tags"
              variant="outlined"
              multiple
              chips
              closable-chips
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" variant="text" @click="closeDialog">
            Cancel
          </v-btn>
          <v-btn color="primary" variant="elevated" @click="saveMaterial">
            {{ editMode ? "Update" : "Create" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="viewDialog" max-width="900px">
      <v-card v-if="selectedMaterial">
        <v-card-title class="text-h5">
          <v-icon
            :color="getCategoryColor(selectedMaterial.category)"
            class="mr-2"
          >
            mdi-book-open-variant
          </v-icon>
          {{ selectedMaterial.title }}
        </v-card-title>
        <v-card-subtitle>
          <v-chip
            size="small"
            :color="getCategoryColor(selectedMaterial.category)"
          >
            {{ selectedMaterial.category }}
          </v-chip>
        </v-card-subtitle>
        <v-card-text>
          <p class="mb-4">
            <strong>Description:</strong> {{ selectedMaterial.description }}
          </p>
          <v-divider class="my-4" />
          <div class="content-viewer">
            <pre>{{ selectedMaterial.content }}</pre>
          </div>
          <v-divider class="my-4" />
          <div v-if="selectedMaterial.fileUrl" class="mb-4">
            <strong>Attached File:</strong>
            <v-btn
              :href="selectedMaterial.fileUrl"
              target="_blank"
              color="primary"
              variant="text"
              size="small"
              class="ml-2"
            >
              Open File
            </v-btn>
          </div>
          <div class="tags-container">
            <v-chip
              v-for="tag in selectedMaterial.tags"
              :key="tag"
              size="small"
              class="mr-1"
            >
              {{ tag }}
            </v-chip>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" variant="text" @click="viewDialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h6">Confirm Delete</v-card-title>
        <v-card-text>
          Are you sure you want to delete this material? This action cannot be
          undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" variant="text" @click="deleteDialog = false">
            Cancel
          </v-btn>
          <v-btn color="error" variant="elevated" @click="deleteMaterial">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script>
import api from "../api";
import { mapState } from "vuex";

export default {
  name: "StudyMaterialsPage",
  data() {
    return {
      materials: [],
      loading: false,
      searchQuery: "",
      selectedCategory: "All",
      categories: [
        "All",
        "Mathematics",
        "Science",
        "Programming",
        "Languages",
        "History",
        "General",
      ],
      createDialog: false,
      viewDialog: false,
      deleteDialog: false,
      editMode: false,
      selectedMaterial: null,
      formData: {
        title: "",
        description: "",
        category: "General",
        content: "",
        fileUrl: "",
        tags: [],
      },
      rules: {
        required: (value) => !!value || "Required.",
      },
      snackbar: false,
      snackbarText: "",
      snackbarColor: "success",
    };
  },
  computed: {
    ...mapState(["token"]),
    filteredMaterials() {
      let filtered = this.materials;

      if (this.selectedCategory !== "All") {
        filtered = filtered.filter((m) => m.category === this.selectedCategory);
      }

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (m) =>
            m.title.toLowerCase().includes(query) ||
            m.description.toLowerCase().includes(query) ||
            m.tags.some((tag) => tag.toLowerCase().includes(query)),
        );
      }

      return filtered;
    },
  },
  created() {
    this.fetchMaterials();
  },
  methods: {
    async fetchMaterials() {
      this.loading = true;
      try {
        const response = await api.get("/study-materials", {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        if (response.data.success) {
          this.materials = response.data.materials;
        }
      } catch (error) {
        this.showSnackbar("Error fetching materials", "error");
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    openCreateDialog() {
      this.editMode = false;
      this.formData = {
        title: "",
        description: "",
        category: "General",
        content: "",
        fileUrl: "",
        tags: [],
      };
      this.createDialog = true;
    },
    closeDialog() {
      this.createDialog = false;
      this.editMode = false;
    },
    async saveMaterial() {
      const { valid } = await this.$refs.materialForm.validate();
      if (!valid) return;

      try {
        if (this.editMode) {
          await api.put(
            `/study-materials/${this.selectedMaterial._id}`,
            this.formData,
            { headers: { Authorization: `Bearer ${this.token}` } },
          );
          this.showSnackbar("Material updated successfully", "success");
        } else {
          await api.post("/study-materials", this.formData, {
            headers: { Authorization: `Bearer ${this.token}` },
          });
          this.showSnackbar("Material created successfully", "success");
        }
        this.closeDialog();
        this.fetchMaterials();
      } catch (error) {
        this.showSnackbar("Error saving material", "error");
        console.error(error);
      }
    },
    viewMaterial(material) {
      this.selectedMaterial = material;
      this.viewDialog = true;
    },
    editMaterial(material) {
      this.editMode = true;
      this.selectedMaterial = material;
      this.formData = { ...material };
      this.createDialog = true;
    },
    confirmDelete(material) {
      this.selectedMaterial = material;
      this.deleteDialog = true;
    },
    async deleteMaterial() {
      try {
        await api.delete(`/study-materials/${this.selectedMaterial._id}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.showSnackbar("Material deleted successfully", "success");
        this.deleteDialog = false;
        this.fetchMaterials();
      } catch (error) {
        this.showSnackbar("Error deleting material", "error");
        console.error(error);
      }
    },
    getCategoryColor(category) {
      const colors = {
        Mathematics: "purple",
        Science: "blue",
        Programming: "green",
        Languages: "orange",
        History: "brown",
        General: "grey",
      };
      return colors[category] || "grey";
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    showSnackbar(text, color) {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbar = true;
    },
  },
};
</script>

<style scoped>
.study-materials-page {
  padding: 2em 1em;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #e3e9f0 100%);
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

.material-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  border-radius: 15px !important;
  overflow: hidden;
}

.material-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25) !important;
}

.material-description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 60px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
}

.content-viewer {
  background: #f5f5f5;
  padding: 1em;
  border-radius: 8px;
  max-height: 400px;
  overflow-y: auto;
}

.content-viewer pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: inherit;
  margin: 0;
}
</style>

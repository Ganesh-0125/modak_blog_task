<template>
  <form @submit.prevent="onSubmit" class="space-y-3 border p-6 rounded-lg shadow-lg bg-white">
    <div>
      <label class="block text-sm font-medium text-french-gray">Title of the post *</label>
      <input
        v-model="form.title"
        type="text"
        class="input"
        placeholder="Enter Blog Title"
        @blur="v$.title.$touch"
      />
      <span v-if="v$.title.$error" class="text-french-red text-xs">Required</span>
    </div>
    <div>
      <label class="block text-sm font-medium text-french-gray">Cover Image URL *</label>
      <input
        v-model="form.imgLink"
        type="text"
        class="input"
        placeholder="Enter image URL"
        @blur="v$.imgLink.$touch"
      />
      <span v-if="v$.imgLink.$error" class="text-french-red text-xs">Required</span>
    </div>
    <div>
      <label class="block text-sm font-medium text-french-gray">Content *</label>
      <QuillEditor
        ref="quillEditor"
        v-model:content="form.content"
        contentType="html"
        :options="editorOptions"
        class="w-full h-30"
      />
      <span v-if="v$.content.$error" class="text-french-red text-xs">
        Content is required
      </span>
    </div>
    <div class="flex gap-4">
      <button
        type="submit"
        class="btn btn-primary !bg-blue-400 hover:!bg-blue-500"
      >
        {{ isEditing ? 'Update' : 'Save' }}
      </button>
      <button type="button" class="btn !bg-gray-200 hover:!bg-gray-300" @click="$emit('cancel')">Cancel</button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from "vue";
import { useBlogStore } from "../store/index";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { useUserStore } from "../store/userStore";

const props = defineProps({ editing: Object });
const emit = defineEmits(["submit", "cancel"]);

const form = ref({ title: "", imgLink: "", content: "" });
const store = useBlogStore();
const router = useRouter();
const userStore = useUserStore();
const quillEditor = ref(null);

const isEditing = store.isEditing;

const rules = {
  title: { required },
  imgLink: { required },
  content: { required },
};
const v$ = useVuelidate(rules, form);

// Pre-fill form if editing
watch(
  () => props.editing,
  (newEditing) => {
    if (newEditing) {
      form.value.title = newEditing.title;
      form.value.imgLink = newEditing.imgLink;
      form.value.content = newEditing.content;
    }
  },
  { immediate: true }
);

const editorOptions = {
  modules: {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  },
  placeholder: "Write your blog content here...",
};

async function onSubmit() {
  if (!userStore.isAuthenticated) {
    alert("Please login to create a blog post");
    router.push("/login");
    return;
  }

  const htmlContent = quillEditor.value.getHTML();
  form.value.content = htmlContent;

  await v$.value.$validate();

  if (!v$.value.$error) {
    const blogData = {
      userId: userStore.user._id,
      title: form.value.title,
      imgLink: form.value.imgLink,
      content: form.value.content,
    };

    try {
      let success;
      if (isEditing) {
        success = await store.updatePost(store.blogBeingEdited, blogData);
      } else {
        success = await store.addBlog(blogData);
      }
      if (success) {
        router.push("/my-account");
        emit("submit", true);
      } else {
        emit("submit", false);
        alert("Failed to " + (isEditing ? "update" : "create") + " post.");
      }
    } catch (error) {
      console.error(
        isEditing ? "Error updating blog:" : "Error creating blog:",
        error.response?.data?.message || error.message
      );
      alert(
        "Failed to " + (isEditing ? "update" : "create") + " post: " +
        (error.response?.data?.message || "Server error")
      );
      emit("submit", false);
    }
  } else {
    console.error("Validation errors:", v$.value.$errors);
    alert("Please fill in all required fields correctly.");
    emit("submit", false);
  }
}
</script>

<style scoped>
.input {
  width: 100%;
  border-width: 1px;
  border-style: solid;
  border-color: var(--french-gray);
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  margin-top: 0.25rem;
  box-sizing: border-box;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  background-color: var(--french-gray);
  transition: background-color 0.2s;
  color: inherit;
  border: none;
  cursor: pointer;
}

.btn:hover {
  background-color: var(--french-gray-dark);
}

.btn-primary {
  background-color: var(--french-blue);
  color: #fff;
}

.btn-primary:hover {
  background-color: var(--french-blue-dark);
}

:deep(.ql-editor) {
  min-height: 500px;
}
</style>
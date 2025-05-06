<template>
    <form @submit.prevent="onSubmit" class="space-y-3 border p-6 rounded-lg shadow-lg  shadow-gray-400 bg-white" raised>
        <div>
            <label>Title of the post *</label>
            <input v-model="form.title" type="text" class="input" placeholder="Enter Blog Title"/>
            <span v-if="v$.title.$error" class="text-red-500 text-xs">Required</span>
        </div>
        <div>
            <label>Cover Image URL *</label>
            <input v-model="form.imgLink" type="text" class="input" placeholder="Enter image URL" />
            <span v-if="v$.imgLink.$error" class="text-red-500 text-xs">Required</span>
        </div>
        <div>
            <label>Content *</label>
            <QuillEditor ref="quillEditor" :options="editorOptions" class="w-full h-30 " />
            <span v-if="v$.content.$error" class="text-red-500 text-xs">Min 500, Max 5000 words</span>
        </div>
        <div class="flex gap-4">
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="button" class="btn" @click="cancel">Cancel</button>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { useBlogStore } from '../store/index.js';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { QuillEditor } from '@vueup/vue-quill';
import { useUserStore } from '../store/userStore';

// Custom validator for word count
const wordCount = (min, max) => helpers.withParams(
    { type: 'wordCount', min, max },
    (value) => {
        if (!value) return false;
        const text = value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        const wordLength = text.split(/\s+/).length;
        return wordLength >= min && wordLength <= max;
    }
);

const store = useBlogStore();
const router = useRouter();
const quillEditor = ref(null);
const userStore = useUserStore();
const form = ref({
    title: '',
    imgLink: '',
    content: '',
});

const rules = {
    title: { required },
    imgLink: { required },
    content: { required, wordCount: wordCount(500, 5000) },
};

const v$ = useVuelidate(rules, form);

async function onSubmit() {
    if (!userStore.isAuthenticated) {
        alert('Please login to create a blog post');
        router.push('/login');
        return;
    }

    console.log("Starting submission...");
    // Get plain text from QuillEditor
    const content = quillEditor.value.getText().trim();
    form.value.content = content; // Store as plain text

    await v$.value.$validate();
    console.log("Form Data:", form.value);
    console.log("Content Field (Plain Text):", form.value.content);

    if (!v$.value.$error) {
        const blogData = {
            title: form.value.title,
            imgLink: form.value.imgLink,
            content: form.value.content,
        };
        console.log("Data being sent to backend:", blogData);
        const success = await store.addBlog(blogData);
        if (success) {
            router.push('/'); // Direct route, no success message
        } else {
            alert("Failed to create the post. Please try again.");
        }
    } else {
        console.error("Validation errors:", v$.value.$errors);
    }
}

function cancel() {
    router.push('/');
}

const editorOptions = {
    modules: {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean'],
        ],
    },
    placeholder: 'Write your blog content here...',
};
</script>

<style scoped>
.input {
    width: 100%;
    border-width: 1px;
    border-style: solid;
    border-color: #d1d5db;
    border-radius: 0.375rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    margin-top: 0.25rem;
    box-sizing: border-box;
}

.btn {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-radius: 0.375rem;
    background-color: #e5e7eb;
    transition: background-color 0.2s;
    color: inherit;
    border: none;
    cursor: pointer;
}

.btn:hover {
    background-color: #d1d5db;
}

.btn-primary {
    background-color: #3b82f6;
    color: #fff;
}

.btn-primary:hover {
    background-color: #2563eb;
}
</style>
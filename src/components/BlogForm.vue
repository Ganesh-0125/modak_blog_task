<template>
    <form @submit.prevent="onSubmit" class="space-y-3 border p-6 rounded-lg shadow-lg bg-white">
        <div>
            <label class="block text-sm font-medium text-french-gray">Title of the post *</label>
            <input v-model="form.title" type="text" class="input" placeholder="Enter Blog Title" />
            <span v-if="v$.title.$error" class="text-french-red text-xs">Required</span>
        </div>
        <div>
            <label class="block text-sm font-medium text-french-gray">Cover Image URL *</label>
            <input v-model="form.imgLink" type="text" class="input" placeholder="Enter image URL" />
            <span v-if="v$.imgLink.$error" class="text-french-red text-xs">Required</span>
        </div>
        <div>
            <label class="block text-sm font-medium text-french-gray">Content *</label>
            <QuillEditor ref="quillEditor" :options="editorOptions" class="w-full h-30" />
            <span v-if="v$.content.$error" class="text-french-red text-xs">Min 500, Max 5000 words</span>
        </div>
        <div class="flex gap-4">
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="button" class="btn" @click="$emit('cancel')">Cancel</button>
        </div>
    </form>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useBlogStore } from '../store/index';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { QuillEditor } from '@vueup/vue-quill';
import { useUserStore } from '../store/userStore';

defineProps({
    editing: Object,
});

defineEmits(['submit', 'cancel']);

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

watch(
    () => props.editing,
    (newEditing) => {
        if (newEditing) {
            form.value.title = newEditing.title;
            form.value.imgLink = newEditing.imgLink;
            form.value.content = newEditing.content;
            if (quillEditor.value) {
                quillEditor.value.setHTML(newEditing.content);
            }
        } else {
            form.value.title = '';
            form.value.imgLink = '';
            form.value.content = '';
            if (quillEditor.value) {
                quillEditor.value.setHTML('');
            }
        }
    },
    { immediate: true }
);

async function onSubmit() {
    if (!userStore.isAuthenticated) {
        alert('Please login to create a blog post');
        router.push('/login');
        return;
    }

    const content = quillEditor.value.getText().trim();
    form.value.content = content;

    await v$.value.$validate();

    if (!v$.value.$error) {
        const blogData = {
            title: form.value.title,
            imgLink: form.value.imgLink,
            content: form.value.content,
        };
        emit('submit', blogData);
    } else {
        console.error('Validation errors:', v$.value.$errors);
    }
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
</style>
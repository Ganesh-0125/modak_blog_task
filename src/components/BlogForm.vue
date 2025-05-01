<template>
    <form @submit.prevent="onSubmit" class="space-y-6">
        <!-- <div>
            <label>Name of the author *</label>
            <input v-model="form.author" type="text" class="input" />
            <span v-if="v$.author.$error" class="text-red-500 text-xs">Required</span>
        </div> -->
        <!-- <div>
            <label>Gmail *</label>
            <input v-model="form.authorEmail" type="email" class="input" />
            <span v-if="v$.authorEmail.$error" class="text-red-500 text-xs">Valid email required</span>
        </div> -->
        <div>
            <label>Title of the post *</label>
            <input v-model="form.title" type="text" class="input" />
            <span v-if="v$.title.$error" class="text-red-500 text-xs">Required</span>
        </div>
        <!-- <div>
            <label>Date *</label>
            <input v-model="form.date" type="date" class="input cursor-pointer" />
            <span v-if="v$.date.$error" class="text-red-500 text-xs">Required</span>
        </div> -->
        <div>
            <label>Cover Image *</label>
            <input type="file" @change="onFileChange" />
            <span v-if="v$.cover.$error" class="text-red-500 text-xs">Required</span>
        </div>
        <!-- <div>
            <label>Author Image *</label>
            <input type="file" @change="onAuthorImageChange" />
            <span v-if="v$.authorImage.$error" class="text-red-500 text-xs">Required</span>
        </div> -->
        <!-- <div>
            <label>Author Designation *</label>
            <input v-model="form.designation" type="text" class="input" />
            <span v-if="v$.designation.$error" class="text-red-500 text-xs">Required</span>
        </div> -->
        <div>
            <label>Content *</label>
            <QuillEditor v-model="form.content" :options="editorOptions" class=" w-full h-30" />
            <span v-if="v$.content.$error" class="text-red-500 text-xs">Min 500, Max 5000 words</span>
        </div>
        <div class="flex gap-4">
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="button" class="btn" @click="cancel">Cancel</button>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import { useBlogStore } from '../store/index.js'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength } from '@vuelidate/validators'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { QuillEditor } from '@vueup/vue-quill'

const store = useBlogStore()
const router = useRouter()
const form = ref({
    author: '',
    authorEmail: '',
    title: '',
    date: '',
    cover: '',
    authorImage: '',
    designation: '',
    content: '',
})

const rules = {
    author: { required },
    authorEmail: { required, email },
    title: { required },
    date: { required },
    cover: { required },
    authorImage: { required },
    designation: { required },
    content: { required, minLength: minLength(500), maxLength: maxLength(5000) },
}

const v$ = useVuelidate(rules, form)

function onFileChange(e) {
    const file = e.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (ev) => { form.value.cover = ev.target.result }
        reader.readAsDataURL(file)
    }
}
function onAuthorImageChange(e) {
    const file = e.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (ev) => { form.value.authorImage = ev.target.result }
        reader.readAsDataURL(file)
    }
}
// function onSubmit() {
//     v$.value.$validate()
//     if (!v$.value.$error) {
//         store.addBlog({ ...form.value, id: Date.now().toString() })
//         router.push('/')
//     }
// }
function onSubmit() {
    v$.value.$validate();
    if (!v$.value.$error) {
        store.addBlog({
            title: form.value.title,
            imgLink: form.value.cover, // Use the cover image
            content: form.value.content,
        }).then((success) => {
            if (success) {
                alert("Post created successfully!"); // Show a pop-up
                router.push('/'); // Redirect to the blog list page
            } else {
                alert("Failed to create the post. Please try again.");
            }
        });
    }
}
function cancel() { router.push('/') }

const editorOptions = {
    modules: {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
        ]
    },
    placeholder: 'Write your blog content here...'
}
</script>

<style scoped>
.input {
    width: 100%;
    border-width: 1px;
    border-style: solid;
    border-color: #d1d5db; /* Tailwind's gray-300 */
    border-radius: 0.375rem; /* rounded-md */
    padding-left: 0.75rem;   /* px-3 */
    padding-right: 0.75rem;
    padding-top: 0.5rem;     /* py-2 */
    padding-bottom: 0.5rem;
    margin-top: 0.25rem;     /* mt-1 */
    box-sizing: border-box;
}

.btn {
    padding-left: 1rem;      /* px-4 */
    padding-right: 1rem;
    padding-top: 0.5rem;     /* py-2 */
    padding-bottom: 0.5rem;
    border-radius: 0.375rem; /* rounded-md */
    background-color: #e5e7eb; /* Tailwind's gray-200 */
    transition: background-color 0.2s;
    color: inherit;
    border: none;
    cursor: pointer;
}
.btn:hover {
    background-color: #d1d5db; /* Tailwind's gray-300 */
}

.btn-primary {
    background-color: #3b82f6; /* Tailwind's blue-500 */
    color: #fff;
}
.btn-primary:hover {
    background-color: #2563eb; /* Tailwind's blue-600 */
}
</style>
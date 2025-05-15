<template>
    <div class="mt-12">
        <h2 class="text-2xl font-bold mb-2">Leave a Reply</h2>
        <form @submit.prevent="submit" class="space-y-4">
            <div>
                <label>Comment *</label>
                <textarea v-model="comment" class="input" required></textarea>
            </div>
            <div>
                <label>Name *</label>
                <input v-model="name" class="input" required />
            </div>
            <div>
                <label>Email *</label>
                <input v-model="email" type="email" class="input" required />
            </div>
            <div>
                <input type="checkbox" v-model="subscribe" />
                <span class="ml-2 text-sm">Yes, I would like to be contacted by Modak for newsletters, promotions,
                    events, and marketing activities.</span>
            </div>
            <button type="submit" class="btn btn-primary">Post Comment <i class="pi pi-send ml-2"></i></button>
        </form>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const comment = ref('')
const name = ref('')
const email = ref('')
const subscribe = ref(false)
function submit() {
    // Store or send comment as needed
    comment.value = ''
    name.value = ''
    email.value = ''
    subscribe.value = false
}
</script>
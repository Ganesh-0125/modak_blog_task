<template>
    <div class="flex justify-between mt-12">
        <button v-if="prev" @click="goTo(prev._id)" class="flex items-center gap-2">
            <img :src="prev.imgLink" class="w-12 h-12 rounded-full" />
            <div>
                <div class="text-xs text-gray-500">Previous</div>
                <div class="font-bold">{{ prev.title }}</div>
            </div>
        </button>
        <div></div>
        <button v-if="next" @click="goTo(next._id)" class="flex items-center gap-2">
            <div>
                <div class="text-xs text-gray-500 text-right">Next</div>
                <div class="font-bold text-right">{{ next.title }}</div>
            </div>
            <img :src="next.imgLink" class="w-12 h-12 rounded-full" />
        </button>
    </div>
</template>
<script setup>
import { useBlogStore } from '../store/index.js'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
const props = defineProps({ currentId: String })
const store = useBlogStore()
const router = useRouter()
const idx = store.blogs.findIndex(b => b.id === props.currentId)
const prev = computed(() => store.blogs[idx - 1])
const next = computed(() => store.blogs[idx + 1])
function goTo(id) { router.push(`/blog/${id}`) }
</script>
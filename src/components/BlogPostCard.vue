<template>
    <div>
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
        <small>By {{ post.author.username }}</small>
    </div>
</template>
<script setup>
defineProps({ post: Object });
</script>
<template>
    <iframe
        width="560"
        height="315"
        :src="`https://player.vimeo.com/video/${props.videoId}`"
        title="Video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscopre;"
        allowfullscreen
    />
</template>

<script lang="ts" setup>
const props = defineProps({
    videoId: {
        type: Number,
        required: true
    }
})
</script>

<style scoped></style>
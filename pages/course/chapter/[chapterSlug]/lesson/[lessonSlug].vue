<template>
    <h3 class="font-bold mb-4">Lesson</h3>
    <p class="mb-2">This is a lesson</p>
    <p>{{ chapter.title }}</p>
    <p>{{ lesson.title }}</p>
</template>

<script setup>
const course = useCourse()
const route = useRoute()

const chapter = computed(() => {
    return course.chapters.find(
        (chapter) => chapter.slug === route.params.chapterSlug)
})

const lesson = computed(() => {
    return chapter.value.lessons.find(
        (lesson) => lesson.slug === route.params.lessonSlug)
})
</script>
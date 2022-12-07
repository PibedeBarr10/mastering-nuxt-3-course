<template>
    <!-- http://localhost:3000/course/chapter/1-chapter-1/lesson/1-introduction-to-typescript-with-vue-js-3 -->
    <h2>Lesson</h2>
    <p>
        This is a lesson
    </p>
    <p>
        {{ chapter.title }}
    </p>
    <p>
        {{ lesson.title }}
    </p>
</template>

<script setup>

const course = useCourse()
const route = useRoute()

const chapter = computed(() => {
    return course.chapters.find((chapter) => {
        return chapter.slug === route.params.chapterSlug
    })
})

const lesson = computed(() => {
    return chapter.value.lessons.find((lesson) => {
        return lesson.slug === route.params.lessonSlug
    })
})

</script>

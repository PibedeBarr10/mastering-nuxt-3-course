<template>
    <div v-if="lesson">
        <p class="mt-0 uppercase font-bold text-slate-400 mb-1">
            Lesson {{ chapter?.number }} - {{ lesson.number }}
        </p>
        <h2 class="font-bold text-lg my-0">
            {{ lesson.title }}
        </h2>
        <div class="flex space-x-4 mt-2 mb-8">
            <NuxtLink
                v-if="lesson.sourceUrl"
                :to="lesson.sourceUrl"
                class="font-normal text-md text-gray-500"
            >
                Download Source Code
            </NuxtLink>
            <NuxtLink
                v-if="lesson.downloadUrl"
                :to="lesson.downloadUrl"
                class="font-normal text-md text-gray-500"
            >
                Download Video
            </NuxtLink>
        </div>
        <VideoPlayer
            v-if="lesson.videoId"
            :videoId="lesson.videoId"
        />
        <p class="mb-6">
            {{ lesson.text }}
        </p>
        <LessonCompleteButton
            v-if="user"
            :model-value="isCompleted"
            @update:model-value="toggleComplete()"
        />
    </div>
</template>

<script setup lang="ts">
import { useCourseProgress } from '~/stores/courseProgress'
const course = await useCourse()
const route = useRoute()

const { chapterSlug, lessonSlug } = route.params
const lesson = await useLesson(chapterSlug, lessonSlug)

// initialization of store
const store = useCourseProgress()
const { initialize, toggleComplete } = store

// fetching user data
const user = useSupabaseUser()

initialize()

definePageMeta({
    middleware: [
        async function ({ params }, from) {
            const course = await useCourse()

            const chapter = course.value.chapters.find(chapter => chapter.slug === params.chapterSlug)
            if (!chapter) {
                return abortNavigation(
                    createError({
                        statusCode: 404,
                        message: 'Chapter not found'
                    })
                )
            }

            const lesson = chapter.lessons.find(lesson => lesson.slug === params.lessonSlug)
            if (!lesson) {
                return abortNavigation(
                    createError({
                        statusCode: 404,
                        message: 'Lesson not found'
                    })
                )
            }
        },
        'auth'
    ]
})

// Check if the current lesson is completed
const isCompleted = computed(() => {
    return store.progress?.[chapterSlug]?.[lessonSlug] || 0
})

const chapter = computed(() => {
    return course.value.chapters.find(
        (chapter) => chapter.slug === route.params.chapterSlug)
})


const title = computed(() => {
    return `${lesson.value?.title} - ${course.value.title}`
})
useHead({
    title
})

</script>
<template>
    <div>
        <div class="flex justify-between items-center w-full mb-12">
            <h1 class="font-medium">
                Course:
                <span class="font-bold">
                    {{ course.title }}
                </span>
            </h1>
            <UserCard />
        </div>

        <div class="w-full grid grid-cols-4 gap-4">
            <div class="md:mr-4 p-8 bg-white rounded-md col-span-4 md:col-span-1">
                <h3 class="text-lg font-bold mb-4">
                    Chapters
                </h3>
                <div
                    v-for="(chapter, index) in course.chapters"
                    :key="chapter.slug"
                    class="mb-2 flex flex-col"
                >
                    <h4 class="font-bold">
                        {{ chapter.title }}
                        <span
                            v-if="percentageCompleted && user"
                            class="text-emerald-500 text-sm"
                        >
                            {{ percentageCompleted.chapters[index] }}%
                        </span>
                    </h4>
                    <NuxtLink
                        v-for="(lesson, index) in chapter.lessons"
                        :key="lesson.slug"
                        :to="lesson.path"
                        class="flex flex-row space-x-1 no-underline prose-sm font-normal"
                    >
                        <span class="text-gray-500">
                            {{ index + 1 }}.
                        </span>
                        <span>{{ lesson.title }}</span>
                    </NuxtLink>
                </div>

                <div
                    v-if="percentageCompleted && user"
                    class="mt-8 text-sm font-medium text-gray-500 flex justify-between items-center"
                >
                    Course completion:
                    <span> {{ percentageCompleted.course }}% </span>
                </div>
            </div>

            <div class="p-8 bg-white rounded-md col-span-4 md:col-span-3">
                <NuxtErrorBoundary>
                    <NuxtPage />
                    <template #error="{ error }">
                        <p>
                            Oh no, something went wrong with the lesson!
                            <br />
                            <code>{{ error }}</code>
                        </p>
                        <div>
                            <button
                                class="hover:cursor-pointer bg-gray-500 text-white font-bold rounded-sm px-4 py-2"
                                @click="resetError(error)"
                            >
                                Reset
                            </button>
                        </div>
                    </template>
                </NuxtErrorBoundary>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useCourseProgress } from '~/stores/courseProgress'
import { storeToRefs } from 'pinia'

const user = useSupabaseUser()

// tutaj nie będzie pobierane 2 razy to samo dzięki cache'owaniu przez composable'a `useFetchWithCache`
const course = await useCourse()
const firstLesson = await useFirstLesson()

// Get chapter completion percentages
const { percentageCompleted } = storeToRefs(
    useCourseProgress()
)

const resetError = async (error) => {
    await navigateTo(firstLesson.path)
    error.value = null
}
</script>

<style scoped>
.router-link-active {
    @apply text-blue-500 font-bold;
}
</style>
<template>
    <div class="bg-gray-100">
        <div class="container mx-auto flex flex-col items-center h-full min-h-screen">
            <div class="my-12">
                <h1 class="text-center font-medium">
                    Course:
                    <span class="font-bold">
                        Mastering Nuxt
                    </span>
                </h1>
            </div>
    
            <div class="w-full grid grid-cols-4 gap-4">
                <div class="md:mr-4 p-8 bg-white rounded-md col-span-4 md:col-span-1">
                    <h3 class="text-lg font-bold mb-4">
                        Chapters
                    </h3>
                    <div
                        v-for="chapter in chapters"
                        :key="chapter.slug"
                        class="mb-2 flex flex-col"
                    >
                        <h4 class="font-bold">{{ chapter.title }}</h4>
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
                </div>
    
                <div class="p-8 bg-white rounded-md col-span-4 md:col-span-3">
                    <NuxtPage />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { chapters } = useCourse()
</script>

<style scoped>
.router-link-active {
    @apply text-blue-500 font-bold;
}
</style>
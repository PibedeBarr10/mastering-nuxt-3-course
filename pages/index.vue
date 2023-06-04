<template>
    <div class="flex justify-center mt-12">
        <NuxtLink
            :href="firstLesson.path"
            class="underline font-medium"
        >
            Go to first lesson
        </NuxtLink>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: false
})

const firstLesson = useFirstLesson()

</script>
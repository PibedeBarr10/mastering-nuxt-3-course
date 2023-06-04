<template>
    <div class="w-full max-w-2xl h-9">
        <h1 class="font-bold mb-2">
            Log in to {{ title }}
        </h1>
        <button class="bg-blue-500 text-white font-bold px-4 py-2 rounded-sm">
            Log in with Github
        </button>
    </div>
</template>

<script setup lang="ts">
const { title } = useCourse()
</script>
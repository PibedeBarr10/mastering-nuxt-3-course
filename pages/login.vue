<template>
    <div class="w-full max-w-2xl h-9">
        <h1 class="font-bold mb-2">
            Log in to {{ title }}
        </h1>
        <button
            class="bg-blue-500 text-white font-bold px-4 py-2 rounded-sm"
            @click="login()"
        >
            Log in with Github
        </button>
    </div>
</template>

<script setup lang="ts">
const { title } = useCourse()

const { auth } = useSupabaseClient()

const login = async () => {
    const { error } = await auth.signInWithOAuth({
        provider: 'github'
    })

    if (error) {
        console.error(error)
    }
}
</script>
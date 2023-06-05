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
const { query } = useRoute()

const { auth } = useSupabaseClient()
const user = useSupabaseUser()

watchEffect(async () => {
    if (user.value) {
        await navigateTo(query.redirectTo as string, {
            replace: true
        })
    }
})

const login = async () => {
    const redirectTo: string = `${window.location.origin}${query.redirectTo}`
    const { error } = await auth.signInWithOAuth({
        provider: 'github',
        options: { redirectTo }
    })

    if (error) {
        console.error(error)
    }
}
</script>
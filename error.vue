<template>
    <NuxtLayout>
        <div>
            <div
                v-if="error.statusCode === 404"
                class="mb-2"
            >
                <h1 class="text-xl font-bold">
                    {{ error.statusCode }}
                </h1>
                <p>I guess that page doesn't exist</p>
            </div>
            <div v-else>
                <h1 class="text-xl font-bold mb-4">Dang</h1>
                <p>It looks like something broke</p>
                <p class="mb-2">Sorry about that</p>
            </div>
            <p class="mb-4">
                <strong>{{ error.message }}</strong>
            </p>
            <p>
                Go to the
                <NuxtLink
                    class="hover:cursor-pointer font-bold text-blue-500"
                    @click="handleError"
                >
                    first lesson
                </NuxtLink>
            </p>
        </div>
    </NuxtLayout>
</template>

<script setup>
const error = useError()

const handleError = () => {
    clearError({
        redirect: '/course/chapter/1-chapter-1/lesson/1-introduction-to-typescript'
    })
}
</script>

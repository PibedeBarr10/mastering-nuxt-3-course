<template>
    <label
        class="px-4 py-2 rounded-sm font-bold"
        :class="[ modelValue ? 'bg-green-500 text-white' : 'bg-gray-200' ]"
    >
        <input
            type="checkbox"
            :value="modelValue"
            class="hidden"
            @input="() => $emit('update:modelValue', !modelValue)"
        />
        {{ modelValue ? 'Completed!' : 'Mark as complete' }}
    </label>
</template>

<script lang="ts" setup>
defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
::selection {
    display: none;
}
</style>
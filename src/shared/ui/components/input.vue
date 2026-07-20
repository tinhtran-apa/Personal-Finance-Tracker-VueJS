<template>
    <input v-model="model" class="py-2 px-3 shadow-sm rounded-xl w-full border border-input outline-none text-sm">
</template>

<script setup>
    const model = defineModel({
        type: [String, Number],
        default: ""
    })
</script>
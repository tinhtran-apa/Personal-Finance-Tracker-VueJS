<template>
    <input v-model="model" type="checkbox">
</template>

<script setup>
    const model = defineModel({
        type: Boolean,
        default: false
    })
</script>
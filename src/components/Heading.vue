<script setup lang="ts">
const props = defineProps<{
    id?: string;
}>();
</script>

<template>
    <h1 :id="props.id" class="title">
        <slot></slot>
    </h1>
</template>

<style scoped>
.title {
    font-size: 2rem;
    margin-bottom: 0.2rem;
    margin-top: 0.2rem;
    margin-left: 1rem;
}
</style>

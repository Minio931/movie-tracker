<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Show } from '@/types/Show';
import { useShowStore } from '@/store/show';
import ShowCard from '@/components/ShowCard.vue';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-vue';

const props = defineProps<{
    shows: Show[];
}>();

const showsContainerRef = ref<HTMLElement | null>(null);

const next = () => {
    if (showsContainerRef.value) {
        showsContainerRef.value.scrollBy({
            left: 200,
            behavior: 'smooth'
        });
    }
};

const prev = () => {
    if (showsContainerRef.value) {
        showsContainerRef.value.scrollBy({
            left: -200,
            behavior: 'smooth'
        });
    }
};


</script>

<template>
    <div class="shows-wrapper">
        <IconChevronLeft class="icon" @click="prev" />
        <div ref="showsContainerRef" class="shows-container">
            <ShowCard v-for="show in props.shows" :key="show.id" :show="show" />
        </div>
        <IconChevronRight class="icon" @click="next" />
    </div>
</template>

<style scoped>
.shows-container {
    display: flex;
    flex-direction: row;
    overflow: hidden;
    position: relative;
    gap: 1.1rem;
    padding: 1rem;
    justify-content: space-between;
    width: 100%
}

.icon {
    cursor: pointer;
    width: 3rem;
    height: 3rem;
    z-index: 10;
    padding: 0.5rem;
    transition: all 0.3s ease;
}

.shows-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 100%;
}
</style>
<script setup lang="ts">
import type { Show } from '@/types/Show';
import { useShowStore } from '@/store/show';
import { computed } from 'vue';

const props = defineProps<{
    show: Show;
}>();

const showsStore = useShowStore();

const cardClickHandler = () => {
    showsStore.hydrateModalData(props.show);
    showsStore.showModalDetails();
};

const image = computed(() => {
    return props.show.image;
});
const title = computed(() => {
    return props.show.name;
});
</script>

<template>
    <div @click="cardClickHandler" class="card-wrapper">
        <div class="card-image">
            <img :src="image" />
        </div>
        <h1 class="card-title">{{ title }}</h1>
    </div>
</template>

<style scoped>
.card-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 15rem;
    height: fit-content;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
}

.card-wrapper:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
<script setup lang="ts">
import { Show } from '@/types/Show';
import { useShowStore } from '@/store/show';
import { IconStarFilled, IconHeart, IconDeviceTv } from '@tabler/icons-vue';
import { computed, onMounted, ref, watch } from 'vue';

const showsStore = useShowStore();

const props = defineProps<{
    show: Show;
}>();
const heartIconRef = ref<HTMLElement | null>(null);
const firstShow = computed(() => props.show);
const numberOfSeasons = computed(() => props.show.numberOfSeasons);
const rating = computed(() => props.show.rating);
const isFavorite = computed(() => showsStore.isFavourite(firstShow.value.id));
const favourite = ref(isFavorite.value);

const toggleFavourite = computed(() => {
    return favourite.value ? 'Remove from favourites' : 'Add to favourites';
});


const favouriteButtonHandler = () => {
    if (favourite.value) {
        showsStore.removeFavourite(firstShow.value.id);
    } else {
        showsStore.addFavourite(firstShow.value.id);
    }
    favourite.value = !favourite.value;
    if (heartIconRef.value) {
        heartIconRef.value.style.fill = favourite.value ? '#ffcb74' : 'none';
        heartIconRef.value.style.stroke = favourite.value ? '#ffcb74' : '#111';
    }
};


onMounted(() => {
    if (heartIconRef.value) {
        heartIconRef.value.style.fill = isFavorite.value ? '#ffcb74' : 'none';
        heartIconRef.value.style.stroke = isFavorite.value ? '#ffcb74' : '#111';
    }
});
</script>

<template>
    <div v-if="firstShow" class="hero-container">
        <div class="show-credentials">
            <h1 class="title">{{ firstShow.name }}</h1>
            <div class="show-info">
                <span class="rating">
                    <IconStarFilled class="icon" />{{ rating }}
                </span>
                <span class="seasons">Seasons {{ numberOfSeasons }}</span>
                <span class="year">2019</span>
            </div>
            <div class="summary" v-html="firstShow.summary"></div>
            <div class="actions">
                <button @click="favouriteButtonHandler" class="buttons">
                    <IconHeart ref="heartIconRef" class="icon-heart" />
                    <span>
                        {{ toggleFavourite }}
                    </span>
                </button>
                <button class="buttons">
                    <IconDeviceTv class="icon-tv" />
                    <span>Watch</span>
                </button>
            </div>
        </div>
        <div class="image">
            <img :src="firstShow.imageOriginal" :alt="firstShow.name" />
        </div>
    </div>
</template>

<style scoped>
.hero-container {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 70vh;
    overflow: hidden;
    position: relative;
}

.show-credentials {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 45%;
    height: 100%;
    padding: 2rem;
    position: absolute;
    left: 0;
    background: var(--color-background);
    background: linear-gradient(to right, var(--color-background) 80%, transparent 100%);
}

.actions {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
}

.buttons {
    border-radius: 0.3rem;
    width: fit-content;
    height: 3rem;
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 0.5rem;
    font-size: 1.2rem;
    background-color: color-mix(in srgb, white, var(--color-background) 40%);
    color: var(--color-background);
    box-shadow: none;
    outline: none;
    border: none;
    padding: 0.2rem 1rem;
}

.buttons:nth-of-type(2) {
    background-color: var(--color-primary);
    color: var(--color-background);
}

.buttons:nth-of-type(2):hover {
    background-color: color-mix(in srgb, var(--color-primary), white 15%);
}

.buttons:hover {
    background-color: color-mix(in srgb, color-mix(in srgb, white, var(--color-background) 40%), white 15%);
}

.rating {
    display: flex;
    align-items: center;
    gap: 0.2rem;
    font-size: 1.2rem;
    color: var(--color-text);
}

.icon {
    color: var(--color-primary);
    width: 1rem;
}

.seasons {
    border-radius: 1.5rem;
    display: flex;
    padding: 0.1rem 0.7rem;
    align-items: center;
    justify-content: center;
    background-color: var(--color-primary);
    color: var(--color-background);
    font-size: 1rem;
}

.year {
    font-size: 1.2rem;
    color: var(--color-text);
}

.show-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    gap: 1rem;
}


.summary {
    margin-top: 2rem;
    font-size: 1rem;
    width: 90%;
    line-height: 1.5;
    color: color-mix(in srgb, white, var(--color-background) 40%);
}

.title {
    font-size: 2.5rem;
    color: var(--color-text);
}

.image {
    display: flex;
    width: 70%;
    justify-content: center;
    align-items: center;
}

.image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}
</style>

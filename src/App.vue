<script setup lang="ts">
import { computed, onBeforeMount, onMounted, watch } from 'vue'
import Navigation from './components/Navigation.vue';
import Popular from './components/Popular.vue';
import { useShowStore } from '@/store/show';
import ShowCardsContainer from './components/ShowCardsContainer.vue';
import Heading from './components/Heading.vue';
import Modal from './components/Modal.vue';
import ShowDetails from './components/ShowDetails.vue';
import { storeToRefs } from 'pinia';


const showsStore = useShowStore();
const { favourtesShows } = storeToRefs(showsStore);
const randomNumber = Math.floor(Math.random() * 10);
const shows = computed(() => showsStore.mostPopularShows);
const popularShows = computed(() => showsStore.mostPopularShows[randomNumber]);
const showModal = computed(() => showsStore.showModal);

watch(favourtesShows, (value) => {
  console.log(favourtesShows.value, 'nowe nie znam');
}, { deep: true });


onBeforeMount(() => {
  showsStore.fetchShows();
  showsStore.getFavourites();
  showsStore.getFavouriteShows();
});
onMounted(() => {
  console.log
});
</script>

<template>
  <Modal v-if="showModal">
    <ShowDetails />
  </Modal>
  <Navigation />
  <Popular v-if="popularShows" :show="popularShows" />
  <Heading id="shows">Shows</Heading>
  <ShowCardsContainer :shows="shows" />
  <Heading id="favourites">Favourites</Heading>
  <ShowCardsContainer v-if="favourtesShows" :shows="favourtesShows" />
</template>

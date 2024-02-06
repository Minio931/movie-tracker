<script setup lang="ts">
import { computed } from 'vue';
import Popular from './Popular.vue';
import { useShowStore } from '@/store/show';

const showsStore = useShowStore();
const modalShow = computed(() => showsStore.modalData);

</script>

<template>
    <div class="main">
        <Popular :show="modalShow" />
    </div>
</template>

<style scoped>
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90vw;
    height: fit-content;
}
</style>
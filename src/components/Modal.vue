<script setup lang="ts">
import { useShowStore } from '@/store/show';

const showsStore = useShowStore();

const backdropClickHandler = () => {
    showsStore.hideModalDetails();
};

</script>

<template>
    <div @click="backdropClickHandler" class="backdrop"></div>
    <div class="modal">
        <slot></slot>
    </div>
</template>

<style scoped>
.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
}

.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2rem;
    border-radius: 0.5rem;
    z-index: 100;
}
</style>

<script setup lang="ts">
import { IconSearch, IconSquareRoundedLetterS } from '@tabler/icons-vue';
</script>

<template>
    <nav class="navigation-container">
        <div class="navigation-wrapper">
            <div class="logo">
                <div class="logo-img-container">
                    <IconSquareRoundedLetterS class="logo-img" />
                </div>
                <h1 class="logo-type">ShowFlix</h1>
            </div>
            <ul class="navigation">
                <li class="navigation-item">
                    <a href="#show">Shows</a>
                </li>
                <li class="navigation-item">
                    <a href="#favourites">Favourites</a>
                </li>
            </ul>
        </div>
        <IconSearch class="search-icon" />
    </nav>
</template>

<style scoped>
.navigation-container {
    display: flex;
    width: 100%;
    height: fit-content;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem;
    z-index: 100;
}

.navigation-wrapper {
    width: 80%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
}

.navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
}

.navigation-item {
    margin: 0 1rem;
}

.navigation-item a {
    text-decoration: none;
    color: var(--text-color);
}

.navigation-item a:hover {
    color: var(--color-primary);
}

.search-icon {
    width: 2rem;
    height: 2rem;
    color: var(--text-color);
    cursor: pointer;
    justify-self: flex-end;
}

.logo {
    display: flex;
    align-items: center;
    justify-content: center;
}

.logo-img-container {
    width: 3rem;
    height: 3rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
}

.logo-img {
    width: 3.5rem;
    height: 3.5rem;
    object-fit: cover;
    border-radius: 100%;
    stroke: var(--color-primary);
}

.logo h1 {
    font-size: 1.5rem;
    margin-left: 0.5rem;
}
</style>
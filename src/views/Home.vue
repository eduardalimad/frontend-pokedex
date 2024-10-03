<template>
    <h1>Pokedex</h1>
    <div class="content-main">
      <CardInfo image="url-da-imagem-do-pokemon" name="Pikachu" :idNumber="25" @select-card="handleSelectCard" />
    </div>
    <transition name="slide">
      <Sidebar v-if="selectedCard" @close="handleCloseSidebar" :card="selectedCard" />
    </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CardInfo from '../components/CardInfo.vue';
import Sidebar from '../components/SideBar.vue';

const selectedCard = ref(null);

const handleSelectCard = (card:any) => {
  selectedCard.value = card;
};

const handleCloseSidebar = () => {
  selectedCard.value = null;
};
</script>

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-30%);
  opacity: 0;
}

.slide-leave {
  transform: translateX(0);
  opacity: 1;
}
</style>

<template>
  <div class="pokemon-card" @click="selectCard">
    <div class="container-img">
      <img
        :src="currentImage(idNumber)"
        :alt="name"
        class="pokemon-image"
        @error="handleError"
      />
    </div>
    <div class="pokemon-info">
      <h2 class="pokemon-name">{{ capitalizeFirstLetter(name) }}</h2>
      <p class="pokemon-level">Nº {{ idNumber }}</p>
      <section class="icon-favorites">
        <IconFavorites :isFavorited="isFavorite(idNumber)" />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFavoriteStore } from "@/stores/useFavoriteStore.js";
import { capitalizeFirstLetter } from "../utils/utils.js";
import IconFavorites from "./IconFavorites.vue";
import { computed, ref } from "vue";

const favoriteStore = useFavoriteStore();
const { isFavorite } = favoriteStore;

const props = defineProps({
  name: { type: String, required: true },
  idNumber: { type: Number, required: true },
});

const emit = defineEmits(["select-card"]);

const currentImageIndex = ref(0);
const generateImageUrls = (id: number) => {
  return [
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`,
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`,
  ];
};
const currentImage = (id: number) => {
  const imageUrls = generateImageUrls(id);
  return imageUrls[currentImageIndex.value];
};

const handleError = () => {
  setTimeout(() => {
    currentImageIndex.value++;
    if (currentImageIndex.value >= 4) {
      currentImageIndex.value = 3;
    }
  }, 1000);
};
const selectCard = () => {
  emit("select-card", { name: props.name, id: props.idNumber });
};
</script>

<style scoped lang="scss">
.pokemon-card {
  height: 16.5rem;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  position: relative;
  background: var(--background-card);
  .container-img {
    background-color: rgba(198, 204, 204, 0.11);
    padding: 1rem;
    border-radius: 0.4rem;
  }
  &:hover {
    transform: scale(1.05) translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  }
}
.icon-favorites {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 2px;
}
.pokemon-image {
  width: 100px;
  height: 100px;
}

.pokemon-name {
  font-size: 1em;
  margin: 4px 0;
}

.pokemon-level {
  color: var(--textGrey);
}

@media screen and (max-width: 584px) {
  .pokemon-card {
    height: 10rem;
    display: flex;
    justify-content: space-between;
    min-width: 240px;
    flex-wrap: wrap;
    .container-img {
      background-color: transparent;
      padding: 0rem;
      border-radius: 0.4rem;
    }
    .pokemon-image {
      width: 110px;
    }

    .pokemon-info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-end;
    }
  }
}
</style>

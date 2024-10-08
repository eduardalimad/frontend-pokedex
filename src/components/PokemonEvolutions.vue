<template>
  <div class="evolution-list">
    <div v-if="isLoading" class="loading">Carregando evoluções...</div>
    <div v-else>
      <div
        v-for="(evolution, index) in processedEvolutions"
        :key="index"
        class="evolution-item"
      >
        <img
        :src="currentImage(evolution.id)"
        class="pokemon-image"
        @error="handleError"
      />
        <section class="evolution-info-pokemon">
          <span>{{ evolution.species }}</span>
          <PokemonTypeList :types="typeData" :getColor="getColor" />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, type PropType } from "vue";
import PokemonTypeList from "./PokemonTypeList.vue";
import { getIdFromUrl } from "../utils/utils";
import type { PokemonEvolution, ProcessedEvolution, types } from "@/types/PokemonEvolution";

// Tipos personalizados
type TypeData = { name: string; url: string };
type Colors = Record<string, string>;

const props = defineProps({
  evolutionsData: {
    type: Array as () => PokemonEvolution[],
    required: true,
  },
  typeData: {
      type: Array as () => types[], 
      required: true,
    },
});
const isLoading = ref(true);
const processedEvolutions = ref<ProcessedEvolution[]>([]);
const colors = ref<Colors>({
  fire: "#fd7d24",
  grass: "#DEFDE0",
  electric: "#eed535",
  water: "#4592c4",
  ground: "#f7de3f",
  rock: "#a38c21",
  fairy: "#fceaff",
  poison: "#b97fc9",
  bug: "#729f3f",
  dragon: "#97b3e6",
  psychic: "#f366b9",
  flying: "rgba(144, 167, 218, 1)",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
  ghost: "#7b62a3",
});

const getColor = (typeName: string): string => {
  return colors.value[typeName] || "#000";
};

const currentImageIndex = ref(0);
const generateImageUrls = (id:number) => {
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


watch(
  () => props.evolutionsData,
  (newEvolutions) => {
    if (newEvolutions && newEvolutions.length) {
      isLoading.value = true;

      setTimeout(() => {
        processedEvolutions.value = newEvolutions.map((evolution: PokemonEvolution) => {
          const url = evolution.url;
          const id = getIdFromUrl(url ?? "");

          return {
            species: evolution.species,
            id,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
          } as ProcessedEvolution;
        });
        isLoading.value = false;
      }, 300);
    } else {
      processedEvolutions.value = [];
      isLoading.value = false;
    }
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.evolution-list {
  display: flex;
  flex-direction: column;
  padding: 1rem;

  .evolution-item {
    display: flex;
    align-items: center;
    margin: 5px 0;

    img {
      width: 5rem;
      height: 5rem;
      margin-right: 10px;
    }
    .evolution-info-pokemon {
      display: grid;
    }
  }
}
@media screen and (max-width: 584px) {
  .evolution-list {
    margin-bottom: 7rem;
  }
}
</style>

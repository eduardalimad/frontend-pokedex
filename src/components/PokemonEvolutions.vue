<template>
  <div class="evolution-list">
    <div v-if="isLoading" class="loading">Carregando evoluções...</div>
    <div v-else>
      <div v-for="(evolution, index) in processedEvolutions" :key="index" class="evolution-item">
        <img :src="evolution.image" :alt="evolution.species" class="image" />
        <section class="evolution-info-pokemon">
          <span>{{ evolution.species }}</span>
          <PokemonTypeList :types="typeData" :getColor="getColor" />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, type PropType } from 'vue';
import PokemonTypeList from './PokemonTypeList.vue';
import { getIdFromUrl } from '../utils/utils';
import type { ProcessedEvolution } from '@/types/PokemonEvolution';

// Tipos personalizados
type TypeData = { name: string; url: string }; 
type Colors = Record<string, string>; 

const props = defineProps({
  evolutionsData: {
    type: Array as PropType<ProcessedEvolution[]>, 
    required: true,
  },
  typeData: {
    type: Array as PropType<TypeData[]>, 
    required: true,
  },
});
const isLoading = ref(true);
const processedEvolutions = ref<ProcessedEvolution[]>([]);
const colors = ref<Colors>({ 
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#b97fc9',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: 'rgba(144, 167, 218, 1)',
  fighting: '#E6E0D4',
  normal: '#F5F5F5',
});

const getColor = (typeName :string) :string => {
  return colors.value[typeName] || '#000';

};

watch(() => props.evolutionsData, (newEvolutions) => {
  if (newEvolutions && newEvolutions.length) {
    isLoading.value = true;

    setTimeout(() => {
      processedEvolutions.value = newEvolutions.map((evolution: ProcessedEvolution) => {
        const url = evolution.url; 
        const id = getIdFromUrl(url ?? '');

        return {
          species: evolution.species,
          id,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
        };
      });
      isLoading.value = false;
    }, 300);
  }
}, { immediate: true });

</script>

<style lang="scss">

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
      .evolution-info-pokemon{
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
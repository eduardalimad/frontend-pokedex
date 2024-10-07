<template>
  <div class="sidebar" :class="{ 'dark-mode': isDarkMode }">
    <div class="div"></div>
    <header class="header">
      <section class="title-sidebar">
        <h2>{{capitalizeFirstLetter(card.name) }}</h2> 
        <span> #{{  card.id }}</span>
      </section>
      <button class="close-btn" @click="close">
        <font-awesome-icon icon="times" class="close-icon" size="lg" />
      </button>
    </header>

    <img v-if="!isLoading" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${card.id}.svg`"
      :alt="card.name" class="image" />

      <div class="menu" v-if="!isLoading">
        <button v-for="tab in tabs" :key="tab" :class="{ active: activeTab === tab }" @click="setActiveTab(tab)">
          {{ tab === 'stats' ? 'Estatísticas' : tab === 'evolutions' ? 'Evoluções' : 'Sobre' }}
        </button>
      </div>

    <PokemonAbout v-if="activeTab === 'about' && !isLoading" :aboutData="dataAbout"/>
    <PokemonStats v-else-if="activeTab === 'stats' && !isLoading" :stats="dataStats" />
    <PokemonEvolutions v-if="activeTab === 'evolutions' && !isLoading" :evolutionsData="dataEvolutions" :typeData="dataAbout.types" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import PokemonAbout from './PokemonAbout.vue';
import PokemonStats from './PokemonStats.vue';
import PokemonEvolutions from './PokemonEvolutions.vue';
import http from '../services/reports/index';
import { getIdFromUrl, capitalizeFirstLetter } from '../utils/utils';
import type { PokemonEvolution, Pokemon, Evolution, EvolutionDetail  } from '@/types/PokemonEvolution';


const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close']);
const isDarkMode = computed(() => localStorage.getItem('theme') === 'dark');
const activeTab = ref('about');
const tabs = ['about', 'stats', 'evolutions'];
const dataStats = ref([]);
const dataAbout = ref<Pokemon>({} as Pokemon);
const dataEvolutions =  ref<PokemonEvolution[]>([]);
const isLoading = ref(true);


const getInfoPokemon = async (id :number) => {
  isLoading.value = true;
  
  try {
    const res = await http.getPokemon(id);
    const idEvolutions = res.data.evolution_chain;

    const idE = await getIdFromUrl(idEvolutions.url);
 
    await getEvolutionData(idE);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

const getStatsPokemon = async (id :number) => {
  isLoading.value = true;
  try {
    const res = await http.getPokemonStats(id);
    dataStats.value = res.data.stats;
    dataAbout.value = res.data;

  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

const getEvolutionData = async (id: number) => {
  try {
    const res = await http.getEvolution(id);    
    dataEvolutions.value = getEvolutionDetails(res.data.chain);
  
    isLoading.value = false; 
  } catch (error) {
    console.log(error);
    isLoading.value = false; 
  }
};


function getEvolutionDetails(evolution: Evolution): Array<{ species: string; url: string; evolutionDetails: EvolutionDetail[] }> {
  const evolutions: Array<{ species: string; url: string; evolutionDetails: EvolutionDetail[] }> = [];

  function traverseEvolution(evo: Evolution) {
    const speciesName = evo.species.name;
    const speciesUrl = evo.species.url;

    const evolutionDetails: EvolutionDetail[] = evo.evolution_details.map(detail => ({
      min_level: detail.min_level, 
      trigger: { name: detail.trigger.name }, 
    }));

    evolutions.push({
      species: speciesName,
      url: speciesUrl,
      evolutionDetails: evolutionDetails,
    });

    if (evo.evolves_to.length > 0) {
      evo.evolves_to.forEach(traverseEvolution);
    }
  }

  traverseEvolution(evolution);
  return evolutions;
}

// Monitor changes to props.card.id
watch(() => props.card.id, (newId) => {
  if (newId) {
    getInfoPokemon(newId);
    getStatsPokemon(newId);
  }
});

// Initial load on component mount
onMounted(() => {
  getInfoPokemon(props.card.id);
  getStatsPokemon(props.card.id);
});

const setActiveTab = (tab: string) => {
  activeTab.value = tab;
};

const close = () => {
  emit('close');
};
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 5.5rem;
  right: 0;
  width: 450px;
  height: 90%;
  padding: 20px;
  background: var(--bgSideBar);
  border-radius: 12px;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: scroll;
  z-index: 5;

  .header {
    display: flex;
    justify-content: space-between;
    .title-sidebar{
      display: flex;
      gap: .5rem;
      align-items: flex-end;
      span{
        color: #a4acaf;;
      }
    }
  }

  .close-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 20px;
  }

  .close-icon {
    color: var(--button-color);
    font-size: 1.5rem;
  }

  .image {
    display: block;
    margin: auto;
    width: 10rem;
    height: 10rem;
  }

  .profile {
    text-align: center;
  }

  .menu {
    display: flex;
    justify-content: space-around;
    margin: 10px 0;

      button {
        background: transparent;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
        font-family: 'Arial', sans-serif;
        font-size: 16px;
        color: #555;
        transition: color 0.3s, border-bottom 0.3s;
      }

      button.active {
        color: #ff5722;
        border-bottom: 2px solid #ff5722;
        font-weight: bold;
      }
  }
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: var(--bgSideBar);
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #58555531;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555555c9;
  }
}
@media screen and (max-width: 584px) {
  .sidebar {
    width: 100%;
    top: 0rem;
    height: 100vh;
    
  }
}
</style>
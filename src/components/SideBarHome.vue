<template>
  <div class="sidebar" :class="{ 'dark-mode': isDarkMode }">
    <header class="header">
      <section class="title-sidebar">
        
        <h2>{{ capitalizeFirstLetter(card.name) }}</h2>
        <span> #{{ card.id }}</span>
        
      </section>
      <button class="close-btn" @click="close">
        <font-awesome-icon icon="times" class="close-icon" size="lg" />
      </button>
    </header>
    <button @click="toggleFavorite(card.id, card.name)" class="btn-favorite">
      <IconFavorites :isFavorited="isFavorite(card.id)" />
    </button>
    <img
        :src="currentImage(card.id)"
        :alt="card.name"
        class="image"
        @error="handleError"
      />
   

    <div class="menu" v-if="!isLoading">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="{ active: activeTab === tab }"
        @click="setActiveTab(tab)"
      >
        {{
          tab === "stats"
            ? "Estatísticas"
            : tab === "evolutions"
            ? "Evoluções"
            : "Sobre"
        }}
      </button>
    </div>

    <PokemonAbout
      v-if="activeTab === 'about' && !isLoading"
      :aboutData="dataAbout"
    />
    <PokemonStats
      v-else-if="activeTab === 'stats' && !isLoading"
      :stats="dataStats"
    />
    <PokemonEvolutions
      v-if="activeTab === 'evolutions' && !isLoading"
      :evolutionsData="dataEvolutions"
      :typeData="dataAbout.types"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import PokemonAbout from "./PokemonAbout.vue";
import PokemonStats from "./PokemonStats.vue";
import PokemonEvolutions from "./PokemonEvolutions.vue";
import IconFavorites from "./IconFavorites.vue";
import http from "../services/reports/index";
import { getIdFromUrl, capitalizeFirstLetter } from "../utils/utils";
import type {
  PokemonEvolution,
  Pokemon,
  Evolution,
  EvolutionDetail,
} from "@/types/PokemonEvolution";
import { useFavoriteStore } from "@/stores/useFavoriteStore";
import { handleHttpError } from "@/utils/httpErrorHandler";
import { useToast } from "vue-toastification";

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close"]);
const isDarkMode = computed(() => localStorage.getItem("theme") === "dark");
const activeTab = ref("about");
const tabs = ["about", "stats", "evolutions"];
const dataStats = ref([]);
const dataAbout = ref<Pokemon>({} as Pokemon);
const dataEvolutions = ref<PokemonEvolution[]>([]);
const isLoading = ref(true);
const favoriteStore = useFavoriteStore();
const { isFavorite, toggleFavorite } = favoriteStore;
const currentImageIndex = ref(0);
const toast = useToast()

const getInfoPokemon = async (id: number) => {
  isLoading.value = true;

  try {
    const res = await http.getPokemon(id);
    const idEvolutions = res.data.evolution_chain;
    const idPokemon = await getIdFromUrl(idEvolutions.url);
    await getEvolutionData(idPokemon);

  } catch (error) {
    
    const errorMessage = handleHttpError(error);
    toast.error(errorMessage)

  } finally {
    isLoading.value = false;
  }
};

const getStatsPokemon = async (id: number) => {
  isLoading.value = true;
  try {
    const res = await http.getPokemonById(id);
    dataStats.value = res.data.stats;
    dataAbout.value = res.data;
  } catch (error) {
    const errorMessage = handleHttpError(error);
    toast.error(errorMessage)
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
    const errorMessage = handleHttpError(error);
    toast.error(errorMessage)

  }finally {
    isLoading.value = false;
  }
};


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


function getEvolutionDetails(
  evolution: Evolution
): Array<{
  species: string;
  url: string;
  evolutionDetails: EvolutionDetail[];
}> {
  const evolutions: Array<{
    species: string;
    url: string;
    evolutionDetails: EvolutionDetail[];
  }> = [];

  function traverseEvolution(evo: Evolution) {
    const speciesName = evo.species.name;
    const speciesUrl = evo.species.url;

    const evolutionDetails: EvolutionDetail[] = evo.evolution_details.map(
      (detail) => ({
        min_level: detail.min_level,
        trigger: { name: detail.trigger.name },
      })
    );

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

watch(
  () => props.card.id,
  (newId) => {
    if (newId) {
      getInfoPokemon(newId);
      getStatsPokemon(newId);
    }
  }
);

onMounted(() => {
  getInfoPokemon(props.card.id);
  getStatsPokemon(props.card.id);
});

const setActiveTab = (tab: string) => {
  activeTab.value = tab;
};

const close = () => {
  emit("close");
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
  overflow-y: auto;
  z-index: 5;

  .header {
    display: flex;
    justify-content: space-between;

    .title-sidebar {
      display: flex;
      gap: 0.5rem;
      align-items: flex-end;

      span {
        color: #a4acaf;
      }
    }
    .close-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 20px;

      .close-icon {
        color: var(--button-color);
        font-size: 1.5rem;
      }
    }
  }

  .image {
    display: block;
    margin: 0 auto;
    width: 10rem;
    height: 10rem;
  }
  .btn-favorite {
    width: 3rem;
    height: 3rem;
    background-color: var(--background-card);
    border-radius: 4rem;
    border: solid 1px var(--background-dark-card);
    &:hover {
      transform: scale(1.05) translateY(-2px);
      box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
    }
  }

  .menu {
    display: flex;
    justify-content: space-around;
    margin: 10px 0;

    button {
      background: none;
      border: none;
      padding: 10px 20px;
      cursor: pointer;
      font-family: Arial, sans-serif;
      font-size: 16px;
      color: #555;
      transition: color 0.3s, border-bottom 0.3s;

      &.active {
        color: #ff5722;
        border-bottom: 2px solid #ff5722;
        font-weight: bold;
      }
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
    background: rgba(88, 85, 85, 0.19);
    border-radius: 8px;

    &:hover {
      background: rgba(85, 85, 85, 0.79);
    }
  }
}

@media screen and (max-width: 584px) {
  .sidebar {
    width: 100%;
    top: 0;
    height: 100vh;
  }
}
</style>

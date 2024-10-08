<template>
  <div class="content-main">
    <header class="header">
      <h1>Pokedex</h1>
      <section class="header-controls">
        <InputSearch @update:search="handleSearch" />
        <SelectTypesPokemon
          @update:selectedType="handleSelectedType"
          :resetSelection="resetSelection"
          @resetSelect="loadMore"
        />
      </section>
    </header>

    <section class="grid-container">
      <CardInfo
        v-for="(item, index) in filteredPokemon"
        :key="index"
        :name="item.name"
        :idNumber="Number(item.id)"
        @select-card="handleSelectCard"
        class="card-item"
      />
    </section>

    <transition name="slide">
      <SideBarHome
        v-if="selectedCard"
        @close="handleCloseSidebar"
        :card="selectedCard"
      />
    </transition>
    <div class="footer">
      <button
        v-if="!isLoading && filteredPokemon.length >= 24"
        @click="loadMore"
        class="load-more-button"
      >
        Carregar mais Pokémon
      </button>

      <button
        v-if="filteredPokemon.length > 50"
        @click="scrollToTop"
        class="scroll-to-top-button"
      >
        <font-awesome-icon :icon="['fas', 'arrow-up']" color="white" />
      </button>
    </div>
  </div>
  <div class="load" v-if="isLoading">
    <LoadSpinner />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import CardInfo from "../components/CardInfo.vue";
import InputSearch from "../components/InputSearch.vue";
import SelectTypesPokemon from "../components/SelectTypesPokemon.vue";
import SideBarHome from "../components/SideBarHome.vue";
import LoadSpinner from "@/components/LoadSpinner.vue";
import http from "../services/reports/index";
import { getIdFromUrl } from "../utils/utils";
import axios from "axios";
import type { PokemonTypes, PokemonItem } from "@/types/PokemonEvolution";

const isLoading = ref(false);
const dataList = ref<PokemonItem[]>([]);
const filteredPokemon = ref<PokemonTypes[]>([]);
const selectedCard = ref(null);
const limit = 24;
const offset = ref(0);
const selectedType = ref();
const resetSelection = ref(false);

let timeoutId: number | null = null;

const fetchPokemon = async (searchTerm: any) => {
  const query = searchTerm.trim().toLowerCase();
  searchTerm = null;

  if (!query) {
    filteredPokemon.value = [...dataList.value];
    return;
  }

  isLoading.value = true;

  try {
    const res = await http.getPokemonById(query);
    const pokemon = {
      id: res.data.id,
      name: res.data.name,
      types: res.data.types,
    };

    filteredPokemon.value = [pokemon];
  } catch (error) {
    console.error("Erro ao buscar Pokémon:", error);
    filteredPokemon.value = [];
  } finally {
    isLoading.value = false;
  }
};

const fetchTypeDetails = async (id: number) => {
  isLoading.value = true;
  try {
    const res = await http.getGroupPokemonByType(id);

    const pokemonPromises = res.data.pokemon.map(async (poke: any) => {
      const pokemonUrl = poke.pokemon.url;
      const pokemonRes = await axios.get(pokemonUrl);

      return {
        id: pokemonRes.data.id,
        name: pokemonRes.data.name,
        types: pokemonRes.data.types,
      } as PokemonTypes;
    });

    const pokemonDetails = await Promise.all(pokemonPromises);

    filteredPokemon.value = pokemonDetails;
    console.log(filteredPokemon.value, "aa");
  } catch (error) {
    console.error("Erro ao buscar detalhes do tipo:", error);
  } finally {
    isLoading.value = false;
  }
};

const loadMore = async () => {
  isLoading.value = true;
  try {
    const res = await http.getItens(limit, offset.value);
    console.log(res.data);
    
    const newData = res.data.results.map((item: any) => ({
      name: item.name,
      id: getIdFromUrl(item.url),
      types: [],
    }));

    dataList.value.push(...newData);
    filteredPokemon.value = [...dataList.value];
    offset.value += limit;

    scrollToBottom();
  } catch (error) {
    console.error("Erro ao carregar mais Pokémon:", error);
  } finally {
    isLoading.value = false;
  }
};

const handleSearch = (searchTerm: string): void => {
  resetSelection.value = true;

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    fetchPokemon(searchTerm);
  }, 300); 
};

const handleSelectCard = (card: any) => {
  selectedCard.value = card;
};

const handleCloseSidebar = () => {
  selectedCard.value = null;
};

const scrollToTop = () => {
  const container = document.querySelector(".content-main");
  container?.scrollTo({ top: 0, behavior: "smooth" });
};
const scrollToBottom = () => {
  const container = document.querySelector(".content-main");
  container?.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
};

const handleSelectedType = (typeId: number| string) => {
  selectedType.value = typeId;
  fetchTypeDetails(Number(typeId));
  scrollToTop();
};

onMounted(() => {
  loadMore();
});
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 5rem;
  padding: 0 4rem;
  justify-content: space-between;
}

.header-controls {
  display: flex;
  gap: 0.5rem;
}

.content-main {
  height: 85vh;
  overflow-y: auto;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: var(--bgSideBar);
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #8888885b;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
  padding: 2rem 4rem;
}
.footer {
  width: 100%;
  display: flex;
  bottom: 0;
  align-items: flex-start;
  justify-content: center;
  .load-more-button {
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: var(--blue-default);
  }
  .scroll-to-top-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: var(--red-default);
    border: none;
    border-radius: 4rem;
    width: 3rem;
    height: 3rem;
    &:hover {
      background-color: #ff53509d;
    }
  }
}
.load {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;
  justify-content: center;
  top: 0;
  z-index: 5;
  position: absolute;
  background: #01060a48;
}
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
@media screen and (max-width: 680px) {
  .header {
    padding: 2rem;
    h1 {
      display: none;
    }
  }
  .grid-container {
    padding: 2rem;
  }
}
@media screen and (max-width: 550px) {
  .header {
    .header-controls {
      display: flex;
    }
  }
  .grid-container {
    padding: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
  }
  .footer {
    margin-bottom: 5rem;
  }
}
</style>

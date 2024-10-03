<template>
  <div class="sidebar" :class="{ 'dark-mode': isDarkMode }">
    <header class="header">
      <h2>Pokemon</h2>
      <button class="close-btn" @click="close">
        <font-awesome-icon icon="times" class="close-icon" size="lg" />
      </button>
    </header>

    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
      :alt="card.name" class="image" />
    <section class="profile">
      <h2>{{ card.name }}</h2>
      <p><strong>#</strong> {{ card.id }}</p>
    </section>

    <div class="menu">
      <button v-for="tab in tabs" :key="tab" :class="{ active: activeTab === tab }" @click="setActiveTab(tab)">
        {{ tab === 'stats' ? 'Estatísticas' : 'Evoluções' }}
      </button>
    </div>

    <PokemonStats v-if="activeTab === 'stats'" :stats="card.stats" />
    <PokemonEvolutions v-if="activeTab === 'evolutions'" :evolutions="card.evolutions" />
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';
import PokemonStats from './PokemonStats.vue';
import PokemonEvolutions from './PokemonEvolutions.vue';
const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close']);
const isDarkMode = computed(() => localStorage.getItem('theme') === 'dark');
const activeTab = ref('evolutions');
const tabs = ['stats', 'evolutions'];

const setActiveTab = (tab) => {
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
  width: 400px;
  height: 92%;
  padding: 20px;
  background: var(--bgSideBar);
  border-radius: 12px;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);

  .header {
    display: flex;
    justify-content: space-between;
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
    width: 40%;
  }

  .profile {
    text-align: center;
  }

  .menu {
    display: flex;
    justify-content: space-around;
    margin: 10px 0;

    button {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--textDefault);
      padding: 0 10px;
      font-weight: 600;
      transition: border-bottom 0.3s;
      border-bottom: 2px solid transparent;

      &.active {
        border-bottom-color: orange;
      }
    }
  }
}
</style>
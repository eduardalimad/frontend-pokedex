<template>
  <nav class="navbar">
    <router-link to="/" aria-label="Ir para a Pokedex">
      Pokedex
      <IconPokeball :color="colorIconHome" />
    </router-link>
    <router-link to="/about">
      Sobre
      <IconPokeball :color="colorIconPokedex" />
    </router-link>

  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import IconPokeball from '../assets/icons/IconPokeball.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const iconColors = computed(() => {
  const baseColor = '#111111';
  const activeColor = '#f10c49';

  return {
    home: route.path === '/' ? activeColor : baseColor,
    pokedex: route.path === '/about' ? activeColor : baseColor,
  };
});


const colorIconHome = computed(() => iconColors.value.home);
const colorIconPokedex = computed(() => iconColors.value.pokedex);

</script>


<style scoped lang="scss">
$navbar-bg-color: #fbf8f8f2;
$navbar-shadow: rgba(0, 0, 0, 0.1);
$link-color: black;
$link-hover-color: #ff5350;
$link-active-color: #ff5350;

.navbar {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: $navbar-bg-color;
  box-shadow: 0 2px 5px $navbar-shadow;
  gap: 1rem;

}

.navbar a {
  cursor: pointer;
  padding: 10px;
  color: $link-color;
  transition: color 0.3s;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: $link-hover-color;
  }

  &.active {
    color: $link-active-color;
    font-weight: 600;
    transform: scale(0.95);
    transition: transform 0.1s;
  }
}

.router-link-active {
  color: $link-active-color !important;
  font-weight: 500;

}
</style>

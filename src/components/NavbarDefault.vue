<template>
  <nav class="navbar">
    <div class="navbar-content">
      <NavBarLink to="/" label="Pokedex" ariaLabel="Ir para a Pokedex" />
      <NavBarLink to="/about" label="Sobre" ariaLabel="Ir para Sobre" />
    </div>
    <SwitchButton />
  </nav>
</template>

<script setup lang="ts">
import NavBarLink from './NavbarLink.vue';
import SwitchButton from './SwitchButton.vue';


</script>


<style scoped lang="scss">
$navbar-shadow: rgba(0, 0, 0, 0.1);
$link-color: black;
$link-hover-color: #ff5350;
$link-active-color: #ff5350;

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 2px 5px $navbar-shadow;
  gap: 1rem;

 .navbar-content{
  display: flex;
 }
 
}
</style>

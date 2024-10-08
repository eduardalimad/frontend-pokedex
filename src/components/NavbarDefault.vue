<template>
  <nav class="navbar">
    <div class="navbar-content">
      <NavBarLink to="/" label="Pokedex" ariaLabel="Ir para a Pokedex" />
      <NavBarLink to="/favorites" label="Favorites" ariaLabel="Ir para meus favoritos" />
    </div>
    <SwitchButton />
  </nav>
</template>

<script setup lang="ts">
import NavBarLink from './NavbarLink.vue';
import SwitchButton from './SwitchButton.vue';


</script>


<style scoped lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  gap: 1rem;
  background-color: var(--bgNavbar);
  height: 5rem;
  .navbar-content{
    display: flex;
  }
}
</style>

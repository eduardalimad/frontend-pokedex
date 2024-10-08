<template>
<div v-if="favorites.length <= 0" class="container-msg">
  <span>Sua lista de favoritos está vazia. <br> 
    Nenhum Pokémon foi adicionado ainda.</span>
  <img src="../assets/img/sticker-icon.png" alt="Imagem pikachu triste" >
</div>
  <section class="grid-container" v-else>
    <CardInfo
      v-for="(item, index) in favorites"
      :key="index"
      :name="item.name"
      :idNumber="Number(item.id)"
      class="card-item"
    />
  </section>
</template>
<script setup lang="ts">
import CardInfo from "../components/CardInfo.vue";
import { useFavoriteStore } from "@/stores/useFavoriteStore";

const favoriteStore = useFavoriteStore();
const { favorites } = favoriteStore;
</script>
<style scoped lang="scss">
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
  padding: 2rem 4rem;
  height: 85vh;
  overflow-y: auto;

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
.container-msg{
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-wrap: wrap;
  height: 70vh;

}

@media screen and (max-width: 584px) {
  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
  }
  .container-msg{
  img{
    margin-top: -5rem;
  }
}
}
</style>

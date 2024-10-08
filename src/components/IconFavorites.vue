<template>
    <div class="favorite" @click="toggleFavorite">
      <span class="material-symbols-outlined" :class="{ 'favorited': isFavorited }">{{ icon }}</span>
    </div>
  </template>
  
  <script setup>
  import {computed, defineProps } from 'vue';
  
  const props = defineProps({
    isFavorited: {
      type: Boolean,
      required: true,
    },
  });
  
  const icon = computed(() => {
    return props.isFavorited ? 'favorite' : 'favorite';
  });
  
  </script>
  
  <style scoped lang="scss">
  .favorite {
    display: grid;
    place-items: center;
    .material-symbols-outlined {
      transition: color 0.3s ease;
      color: #ccc;
    
      &.favorited {
        color: red;
      }
    }
  }

</style>
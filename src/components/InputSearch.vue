<template>
    <div class="input-container">
    <label for="pokemon-type">Search Pokémon:</label>
      <input
        type="text"
        v-model="searchQuery"
        @input="onInput"
        placeholder="Procure por nome ou número..."
        class="search-input"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineEmits } from 'vue';
  
  const searchQuery = ref('');
  const emit = defineEmits(['update:search']);
  
  function onInput() {
    emit('update:search', searchQuery.value);
  }
  </script>
  
  <style scoped lang="scss">  
  .input-container {
    position: relative;
    max-width: 100%;
    margin: 20px auto;
    
    label {
      display: block;
      font-size: 12px;
    }

    @media(min-width: 768px) {
      max-width: 300px;
    }
  
    .search-input {
      width: 100%;
      padding: 10px 15px;
      font-size: var(--input-font-size);
      border: 2px solid var(--input-border-color);
      border-radius: 5px;
      outline: none;
      transition: all 0.3s ease;
      box-shadow: none;
      height: 2.5rem;
      background: var(--bgSideBar);
      color: var(--textDefault);
      &:hover {
        border-color: var(--input-hover-border-color);
      }
  
      &:focus {
        border-color: var(--input-focus-border-color);
        box-shadow: 0 0 8px rgba(74, 144, 226, 0.4);
      }
  
      &::placeholder {
        color: var(--placeholder-color);
        font-style: italic;
        font-size: small;
      }
    }
  }
  </style>
  
<template>
  <div class="select">
    <label for="pokemon-type">Select Type:</label>
    <select id="pokemon-type" v-model="selectedType" @change="emitSelectedType">
      <option value="" disabled>Select your option</option>
      <option v-for="type in types" :key="type.id" :value="type.id">
        {{ type.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  resetSelection: Boolean
});
const emit = defineEmits(['update:selectedType']);

const types = [
  { id: 1, name: 'Normal' },
  { id: 2, name: 'Fighting' },
  { id: 3, name: 'Flying' },
  { id: 4, name: 'Poison' },
  { id: 5, name: 'Ground' },
  { id: 6, name: 'Rock' },
  { id: 7, name: 'Bug' },
  { id: 8, name: 'Ghost' },
  { id: 9, name: 'Steel' },
  { id: 10, name: 'Fire' },
  { id: 11, name: 'Water' },
  { id: 12, name: 'Grass' },
  { id: 13, name: 'Electric' },
  { id: 14, name: 'Psychic' },
  { id: 15, name: 'Ice' },
  { id: 16, name: 'Dragon' },
  { id: 17, name: 'Dark' },
  { id: 18, name: 'Fairy' },
  { id: 19, name: 'Stellar' },
];

const selectedType = ref("");

const emitSelectedType = () => {
  emit('update:selectedType', selectedType.value);
};
watch(() => props.resetSelection, (newVal) => {
  if (newVal) {
    selectedType.value = "";
  }
});

</script>

<style lang="scss" scoped>  
.select {
  position: relative;
  width: 40%;
  max-width: 100%;
  margin: 20px auto;

  label {
    display: block;
    font-size: 12px;
  }

  select {
    width: 100%;
    padding: 0px 10px;
    font-size: var(--input-font-size);
    border: 2px solid var(--input-border-color);
    border-radius: 5px;
    outline: none;
    transition: all 0.3s ease;
    box-shadow: none;
    height: 2.5rem;
    background: var(--bgSideBar);
    color: var(--defaultColorText);

    option:first {
      color: #999;
    }

    &:hover {
      border-color: var(--input-hover-border-color);
    }

    &:focus {
      border-color: var(--input-focus-border-color);
      box-shadow: 0 0 8px rgba(74, 144, 226, 0.4);
    }
  }

  .selected-type {
    margin-top: 5px;
    font-size: 0.9em;
    color: #555;
    font-style: italic;
    font-size: small;
  }
}
</style>

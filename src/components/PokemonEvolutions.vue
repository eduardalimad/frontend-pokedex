<template>
  <div class="evolutions">
    <h3>Evoluções</h3>
    <div class="evolution-list">
      <div v-for="evolution in evolutions" :key="evolution.name" class="evolution-item">
        <img :src="evolution.image" alt="Evolução" />
        <span>{{ evolution.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  evolutions: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="scss">
.evolutions {
  margin-top: 20px;

  h3 {
    margin-bottom: 10px;
  }

  .evolution-list {
    display: flex;
    flex-direction: column;

    .evolution-item {
      display: flex;
      align-items: center;
      margin: 5px 0;

      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
    }
  }
}
</style>
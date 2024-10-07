<template>
  <div class="content-types">
    <div class="about-types">
      <div v-for="(item, index) in types" :key="index" class="type-item"
        :style="{ backgroundColor: getColor(item.type.name) }">
        <span class="type-name">{{ item.type.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  types: {
    type: Object,
    required: true,
  },
  getColor: {
    type: Function,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.content-types {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;

  .about-types {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;

    .type-item {
      padding: 4px 12px;
      min-width: 4rem;
      border-radius: 8px;
      font-weight: bold;
      text-align: center;
      transition: transform 0.3s ease;
      font-size: 75%;

      &:hover {
        transform: scale(1.05);
      }

      .type-name {
        font-size: 14px;
        color: #121212;;
      }
    }
  }
}
</style>
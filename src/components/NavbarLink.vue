<template>
  <router-link :to="to" :aria-label="ariaLabel" :class="{ active: isActive }">
    {{ label }}
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  to: { type: String, required: true },
  label: { type: String, required: true },
  ariaLabel: { type: String, required: true }
});

const route = useRoute();

const isActive = computed(() => route.path === props.to);

</script>

<style scoped lang="scss">
a {
  cursor: pointer;
  padding: 10px;
  transition: color 0.3s;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: var(--red-default);
  }

  &.active {
    color: var(--red-default);
    font-weight: 600;
    transform: scale(0.95);
    transition: transform 0.1s;
  }
}
</style>
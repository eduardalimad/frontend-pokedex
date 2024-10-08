<template>
  <div class="stats">
    <ul v-for="(item, id) in stats" :key="id">
      <li>
        <span
          >{{ capitalizeFirstLetter(item.stat.name) }}:
          <h5>{{ item.base_stat }}</h5>
        </span>
        <progress
          :value="item.base_stat"
          :max="100"
          :class="getProgressColor(item.base_stat)"
        ></progress>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { capitalizeFirstLetter } from "../utils/utils.js";

const props = defineProps({
  stats: {
    type: Object,
    required: true,
  },
});

const getProgressColor = (value: number) => {
  return value < 50 ? "progress-red" : "progress-green";
};
</script>

<style scoped lang="scss">
.stats {
  padding: 1rem;
  ul {
    list-style: none;
    padding: 0;
    margin-bottom: 0.5rem;

    li {
      display: flex;
      flex-direction: column;

      span {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    }
  }
}

progress {
  width: 100%;
  height: 0.5rem;
  border-radius: 0.8rem;
  overflow: hidden;
  appearance: none;

  /* Chrome, Safari, Opera */
  &::-webkit-progress-bar {
    background-color: #e0e0e0;
    border-radius: 18px;
  }

  &::-webkit-progress-value {
    border-radius: 18px;
  }

  /* Firefox */
  &::-moz-progress-bar {
    border-radius: 18px;
  }

  &.progress-red {
    &::-webkit-progress-value {
      background-color: var(--red-default);
    }

    &::-moz-progress-bar {
      background-color: var(--red-default);
    }
  }

  &.progress-green {
    &::-webkit-progress-value {
      background-color: var(--green-default);
    }

    &::-moz-progress-bar {
      background-color: var(--green-default);
    }
  }
}
</style>

<template>
    <div class="container-switch">
      <font-awesome-icon :icon="isDarkMode ? 'moon' : 'sun'" size="lg"   />
      <label class="switch" for="checkInput">
        <input type="checkbox" id="checkInput" @change="toggleTheme" :checked="isDarkMode" />
        <span class="slider round"></span>
      </label>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const isDarkMode = ref(false);

const applyTheme = () => {
    document.body.classList.toggle('dark-theme', isDarkMode.value);
    document.body.classList.toggle('light-theme', !isDarkMode.value);
    localStorage.setItem('theme', isDarkMode.value ? 'Dark' : 'Light');
};

const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
};

onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    isDarkMode.value = savedTheme === 'Dark';
    applyTheme();
});

watch(isDarkMode, applyTheme);
</script>

<style scoped lang="scss">
.container-switch {
    display: flex;
    align-items: center;
    gap: 10px;

    .switch {
        position: relative;
        display: inline-block;
        width: 62px;
        height: 32px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #eee8e8;
        transition: 0.4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        left: 6px;
        bottom: 8px;
        background-color: #2a2a29;
        transition: 0.4s;
    }

    input:checked+.slider {
        background-color: #aeb4b6;
    }

    input:checked+.slider:before {
        transform: translateX(36px);
    }

    .slider.round {
        border-radius: 50px;
    }

    .slider.round:before {
        border-radius: 60%;
    }
}
</style>
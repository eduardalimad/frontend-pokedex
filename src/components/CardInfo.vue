<template>
    <div class="pokemon-card" @click="selectCard">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
            :alt="name" class="pokemon-image" />
        <div class="pokemon-info">
            <h2 class="pokemon-name">{{ name }}</h2>
            <p class="pokemon-level">Nº {{ idNumber }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    image: { type: String, required: true },
    name: { type: String, required: true },
    idNumber: { type: Number, required: true }
});

const emit = defineEmits(['select-card']);
const selectCard = () => {
    emit('select-card', { image: props.image, name: props.name, id: props.idNumber });
};

</script>

<style scoped lang="scss">
.pokemon-card {
    width: 12rem;
    height: 14rem;
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8px);
    position: relative;
    background: var(--background-card);

    &:hover {
        transform: scale(1.05) translateY(-5px);
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);

    }
}

.pokemon-image {
    width: 100px;
    height: auto;
}

.pokemon-name {
    font-size: 1.5em;
    margin: 8px 0;
}

.pokemon-level {
    color: #555;
}

@media screen and (max-width: 425px) {
    .pokemon-card {
        width: 100%;
        height: 10rem;
        display: flex;
        justify-content: space-between;

        .pokemon-image {
            width: 110px;
        }

        .pokemon-info {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-end;
        }
    }
}
</style>
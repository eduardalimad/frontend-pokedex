<template>
    <div class="stats">
        <h3>Estatísticas</h3>
        <ul>
            <li>
                <span>HP: </span><strong>{{ stats.hp }}</strong>
                <progress :value="stats.hp" :max="100" :class="getProgressColor(stats.hp)"></progress>
            </li>
            <li>
                <span>Attack: </span><strong>{{ stats.attack }}</strong>
                <progress :value="stats.attack" :max="100" :class="getProgressColor(stats.attack)"></progress>
            </li>
            <li>
                <span>Defense: </span><strong>{{ stats.defense }}</strong>
                <progress :value="stats.defense" :max="100" :class="getProgressColor(stats.defense)"></progress>
            </li>
            <li>
                <span>Special Attack:</span> <strong> {{ stats.specialAttack }}</strong>
                <progress :value="stats.specialAttack" :max="100"
                    :class="getProgressColor(stats.specialAttack)"></progress>
            </li>
            <li><span>Special Defense:</span> <strong> {{ stats.specialDefense }}</strong>
                <progress :value="stats.specialDefense" :max="100"
                    :class="getProgressColor(stats.specialDefense)"></progress>
            </li>
            <li><span>Speed:</span> <strong> {{ stats.speed }}</strong>
                <progress :value="stats.speed" :max="100" :class="getProgressColor(stats.speed)"></progress>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    stats: {
        type: Object,
        required: true,
    },

});
const getProgressColor = (value) => {
    return value < 50 ? 'progress-red' : 'progress-green';
};
</script>

<style lang="scss">
.stats {
    margin-top: 20px;

    h3 {
        margin-bottom: 10px;
    }

    ul {
        list-style: none;
        padding: 0;


        li {
            margin: 5px 0;
            gap: 10px;
            display: flex;
            align-items: center;


        }
    }
}

progress {
    width: 100%;
    height: .5rem;
    border-radius: .8rem;
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
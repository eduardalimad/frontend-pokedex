<template>
  <div class="about-details">

    <div v-if="isLoading" class="loading">
      <LoadSpinner />
      <span>loading </span>
    </div>

    <div v-else>
      <div class="about-types">
        <h3>Types</h3>
        <PokemonTypeList :types="aboutData.types" :getColor="getColor" />
      </div>
      <div class="about-abilities">
            <h3>Abilities</h3>
            <p class="attribute-value" v-for="(item, id) in aboutData.abilities" :key="id"> {{ item.ability.name }},
            </p>
          <span class="attribute-title"> </span>
      </div>
      <div class="parent">
        <div class="div1">
          <section class="attribute-section">
            <font-awesome-icon :icon="['fas', 'weight-hanging']" />
            <p class="attribute-value"> {{ aboutData.weight }} </p>
          </section>
          <span class="attribute-title"> Weight</span>
        </div>
        <div class="div2">
          <section class="attribute-section">
            <font-awesome-icon icon="ruler-vertical" class="icon" size="lg" />
            <p class="attribute-value"> {{ aboutData.height }} </p>
          </section>
          <span class="attribute-title"> Height</span>
        </div>
     
      </div>
         
    </div>
  </div>

</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PokemonTypeList from './PokemonTypeList.vue';
import LoadSpinner from './LoadSpinner.vue';

type Colors = Record<string, string>; 

const isLoading = ref(true);
const props = defineProps({
  aboutData: {
    type: Object,
    required: true,
  },
});

const colors = ref<Colors>({ 
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#b97fc9',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: 'rgba(144, 167, 218, 1)',
  fighting: '#E6E0D4',
  normal: '#F5F5F5',
});

const getColor = (typeName :string) :string => {
  return colors.value[typeName] || '#000';

};

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});
</script>

<style scoped lang="scss">
.about-details {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .loading {
    text-align: center;
    height: 16rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .about-types, .about-abilities{
    padding: .5rem 1rem;
    display: flex; 
    flex-wrap: wrap;
    gap: .5rem;
    align-items: center;
    h3{
      color: var(--defaultColorText);
      font-weight: 600;
    }
  }
  .parent {
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: minmax(4rem, auto);
    grid-column-gap: 0px;
    grid-row-gap: 1rem;

    .attribute-section {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .attribute-title {
      font-size: 14px;
      color: var(--textGrey)
    }

    .attribute-abilities {
      display: flex;
      flex-wrap: wrap;
      font-size: 12px;
      flex-direction: column;
      align-items: center;
    }
  }

  .div1 {
    grid-area: 1 / 1 / 2 / 2;
    padding: .5rem 1rem;
    border-right: solid 2px #E0E0E0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;


  }

  .div2 {
    grid-area: 1 / 2 / 2 / 3;
    padding: .5rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

  }

  .about-group {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .about-title {
      margin-top: 5px;
    }


    .species-info,
    .attribute-value {
      font-size: 18px;
      color: #555;
    }

    .about-attribute {
      display: flex;
      flex-direction: column;
      gap: 5px;

      .attribute-value {
        font-size: 18px;
        color: #444;
      }
    }
  }
}
</style>
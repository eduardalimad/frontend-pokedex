import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Pokemon {
  id: number;
  name: string;
}

const saveToLocalStorage = (storeId: string, state: any) => {
  localStorage.setItem(storeId, JSON.stringify(state));
};

const loadFromLocalStorage = (storeId: string) => {
  const savedState = localStorage.getItem(storeId);
  return savedState ? JSON.parse(savedState) : null;
};

export const useFavoriteStore = defineStore('favoriteStore', () => {
  const favorites = ref<Pokemon[]>(loadFromLocalStorage('favoriteStore') || []);

  const isFavorite = (id: number) => {
    return favorites.value.some((fav) => fav.id === id);
  };

  const toggleFavorite = (id: number, name: string) => {
    if (isFavorite(id)) {

      favorites.value = favorites.value.filter((fav) => fav.id !== id);
    } else {

      favorites.value.push({ id, name });
    }
    saveToLocalStorage('favoriteStore', favorites.value);
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite
  };
});

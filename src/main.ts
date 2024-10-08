import './assets/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMoon, faSun, faTimes, faRulerVertical, faWeightHanging, faArrowUp   } from '@fortawesome/free-solid-svg-icons';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// Adicionando os ícones à biblioteca
library.add(faMoon, faSun, faTimes, faRulerVertical, faWeightHanging, faArrowUp);


const app = createApp(App)

app.use(Toast);
app.component('font-awesome-icon', FontAwesomeIcon); 
app.use(createPinia())
app.use(router)

app.mount('#app')

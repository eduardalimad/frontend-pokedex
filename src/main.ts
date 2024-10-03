import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faMoon, faSun,  faTimes);
const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon); 
app.use(createPinia())
app.use(router)

app.mount('#app')

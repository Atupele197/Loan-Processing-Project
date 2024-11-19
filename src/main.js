import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import router from './routers'
// main.js
import '@fortawesome/fontawesome-free/css/all.css';


const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        present: Aura
    },
});
app.use(router).mount('#app')


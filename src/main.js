import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import router from './routers'

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        present: Aura
    },
});
app.use(router).mount('#app')


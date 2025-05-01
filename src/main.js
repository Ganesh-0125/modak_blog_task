import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import './style.css';

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(PrimeVue);

import Button from 'primevue/button';
app.component('Button', Button);

app.mount('#app');
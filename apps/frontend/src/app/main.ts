// vue
import { createApp } from 'vue';

// packages & libraries
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// router
import router from './router/index';

// application & styles
import App from './App.vue';
import './assets/main.css';

// utility
import { addIcons } from './icons';

const app = createApp(App);
app.use(router);
addIcons();

app.component('FontAwesomeIcon', FontAwesomeIcon);

app.mount('#app');

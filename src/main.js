import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/index'
import store from './store/index'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import '../src/assets/css/custom.css';

// IMPORT TABLER TEMPLATE
import '@tabler/core/dist/css/tabler.css';
import '@tabler/core/dist/js/tabler.js';

createApp(App)
    .use(router)
    .use(store)
    .use(VueSweetalert2)
    .mount('#app')

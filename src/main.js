/* eslint-disable */
import Vue from 'vue';
import ShardsVue from 'shards-vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'; // Default lang is Chinese
Vue.use(Element, { locale });
import './assets/scss/main.scss';
// Styles
import 'bootstrap/dist/css/bootstrap.css';
import '@/scss/shards-dashboards.scss';
import '@/assets/scss/date-range.scss';
import VueLodash from 'vue-lodash';
import lodash from 'lodash';
Vue.use(VueLodash, { name: 'custom', lodash: lodash });
// Core
import App from './App.vue';
import router from './router';

// Layouts
import Default from '@/layouts/Default.vue';
import store from "./store";
import vuetify from './plugins/vuetify';  // Import Vuetify from the new plugins file

ShardsVue.install(Vue);

Vue.component('default-layout', Default);

Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue();

const vm = new Vue({

  router,
  store,
  vuetify,  // Include Vuetify if you are using it
  render: h => h(App)
}).$mount('#app'); // Ensure this matches the ID in your HTML

export default vm;

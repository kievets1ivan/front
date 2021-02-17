import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueSession from "vue-session";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import axios from "axios";

Vue.config.productionTip = false;
Vue.use(VueSession, { persist: true });

Vue.prototype.$axios = axios;
Vue.prototype.$hostname = "http://192.168.0.16:8000";

Vue.directive('blur', {
    inserted: function(el) {
        el.onfocus = (ev) => ev.target.blur()
    }
});

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
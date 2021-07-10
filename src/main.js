import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
axios.defaults.withCredentials=true;
import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes
});

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueCarousel from 'vue-carousel';

import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin, 
  InputGroupPlugin,
  IconsPlugin,
  VBHoverPlugin,
  TooltipPlugin,
  TabsPlugin,
  LinkPlugin,
  FormTimepickerPlugin,
  FormTextareaPlugin,
  FormDatepickerPlugin,
  ImagePlugin,
  ModalPlugin,
  TablePlugin,
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin, 
  InputGroupPlugin,
  IconsPlugin,
  VBHoverPlugin,
  TooltipPlugin,
  TabsPlugin,
  LinkPlugin,
  FormTimepickerPlugin,
  FormTextareaPlugin,
  FormDatepickerPlugin,
  ImagePlugin,
  ModalPlugin,
  TablePlugin,
  VueCarousel,
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  username: localStorage.username,
  // username: "hilla",
  login(username) {
    sessionStorage.clear()
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);

  },
  logout() {
    console.log("logout");
    localStorage.removeItem("username");
    this.username = undefined;
    routes.authenticated=false;
    sessionStorage.clear()

  }
};
console.log(shared_data);
// Vue.prototype.$root.store = shared_data;

new Vue({
  router,
  data() {
    return {
      store: shared_data
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000
      });
    }
  },
  render: (h) => h(App)
}).$mount("#app");
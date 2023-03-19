import Vue from 'vue'
import App from '../view/content.vue'

const myComponent = Vue.extend({
  render: h => h(App)
});

const app = new myComponent().$mount();
document.body.prepend(app.$el);

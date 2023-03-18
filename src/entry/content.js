import Vue from 'vue'
// import App from '../view/test-ext.vue'
import App from '../view/popup.vue'

const myComponent = Vue.extend({
  render: h => h(App)
});

const app = new myComponent().$mount();
document.body.prepend(app.$el);

// let el = document.querySelector('.comments-comment-texteditor');
// el.insertAdjacentHTML('afterend', app.$el);

// var a = document.getElementsByClassName('comment')
// a.addEventListener('click', function handleClick() {
//   let el = document.querySelector('.comments-comment-box__form');
//   el.insertAdjacentHTML('afterend', app.$el);
// });
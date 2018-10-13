import Vue from 'vue';
import axios from 'axios';

import App from './App.vue';
import router from './router';
import Alert from './components/alert.vue';
import url from './config/index';

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
Vue.prototype.$url = url;
// Vue.prototype.$delay = (callback) => {
//   setTimeout(callback, 300);
// };

Vue.filter('formatDateTime', timeStamp => new Date(timeStamp).toLocaleString());
Vue.filter('clock', (ms) => {
  let seconds = ms / 1000;
  let mins = Math.floor(seconds / 60);
  seconds %= 60;
  if (mins < 10) {
    mins = `0${mins}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${mins}:${seconds}`;
});

Vue.component('alert', Alert);
Vue.mixin({
  methods: {
    keepLinebreak(text) {
      return text.replace(/(?:\r\n|\r|\n)/g, '<br>');
    },
    deepCopy(obj) {
      return JSON.parse(JSON.stringify(obj));
    },

  },
});

Vue.prototype.$bus = new Vue();
Vue.directive('loading', {
  inserted: (el) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'loading-div';
    wrapper.style.position = 'absolute';
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    wrapper.style.zIndex = '999';
    wrapper.style.top = '0px';
    wrapper.style.left = '0px';
    wrapper.style.background = 'rgba(255, 255, 255, 1)';
    wrapper.innerHTML = '<div class="loading"></div>';
    el.appendChild(wrapper);
  },
  update: (el, binding) => {
    if (!binding.value) {
      const els = el.getElementsByClassName('loading-div');
      if (els.length > 0) {
        el.removeChild(els[0]);
      }
    }
  },
});


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

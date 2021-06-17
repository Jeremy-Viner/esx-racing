import Vue from 'vue';
import App from './App.vue';
import Nui from './utils/Nui';
import store from './utils/store'

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');

/// #if DEBUG
setTimeout(() => {
  Nui.emulate('some method', {
    arg: '🐌',
  });
}, 100);

document.addEventListener('keypress', event => {
  if (event.keyCode == 116) {
    // do something
  }
});
/// #endif

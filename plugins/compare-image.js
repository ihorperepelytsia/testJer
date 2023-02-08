import Vue from 'vue'

import vTwentyTwenty from 'vue-twentytwenty';

const TwentyTwenty = {
  install(Vue, options) {
    Vue.component('TwentyTwenty', vTwentyTwenty)
  }
}
Vue.use(TwentyTwenty)
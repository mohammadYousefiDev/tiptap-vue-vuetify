import Vue from 'vue'
import App from './App.vue'
import vuetify from 'vuetify'

Vue.use(vuetify)

Vue.config.productionTip = false

new Vue({
  vuetify: new vuetify(),
  render: h => h(App)
}).$mount('#app')

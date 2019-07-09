import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

import {Field, Button, Checkbox, Toast, Switch, Popup, Area, Dialog, CellGroup, NavBar} from 'vant'
import 'vant/lib/index.css'
import '../public/public.css'

Vue.config.productionTip = false


import Vconsole from 'vconsole'

new Vconsole()


Vue.use(Field)
Vue.use(Button)
Vue.use(Checkbox)
Vue.use(CellGroup)
Vue.use(Toast).use(Switch).use(Popup).use(Area).use(Dialog).use(NavBar)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")

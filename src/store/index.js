import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import loan from './loan/'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
})

export default function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      loan,
    },

    plugins: [vuexLocal.plugin],

    strict: process.env.DEBUGGING,
  })

  return Store
}

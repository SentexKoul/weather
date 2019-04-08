import Vue from 'vue'
import Vuex from 'vuex'
import services from '../modules/services/_store'
import weather from '../modules/weather/_store'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        services,
        weather
    }
})
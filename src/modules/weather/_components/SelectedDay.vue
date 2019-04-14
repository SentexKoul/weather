<template lang="pug">
    .weather__content(v-if="getSelectedDay")
        .weather__description
            p {{ getSelectedDay.weather[0].description }}
        .weather__icon
            img(:src="getSelectedDay.img")
        .weather__temperature
            p {{ kelvinToCelsius(getSelectedDay.temp.day) }}
                span &deg; 
            span {{ city }}
        
</template>

<script>
import weatherApi from '../_api/weatherApi.js'
import {mapGetters} from "vuex"

export default {
    props: [
        'city'
    ],
    computed: {
        ...mapGetters({
            getSelectedDay: "weather/getSelectedDay"
        }),
    },
    methods: {
        kelvinToCelsius(temp) {
            // Переводим кельвины в цельсия, удаляем дробную часть
            return Math.trunc(temp - 273)
        }
    }
}
</script>

<style lang="stylus" scoped>
    .weather
        &__content
            margin auto
            text-align center
        &__description
            p
                font-size 24px
                font-weight 300
                margin-bottom 25px
        &__icon
            height 126px
            width 126px
            margin 0 auto
            display flex
            background-color #60bee5
            border-radius 50%
            box-shadow  0 0 0 10px #50b8e2,
                        0 0 0 20px #3fb1df,
                        0 0 0 30px #30abdd,
                        0 0 0 40px #25a7db
            img
                max-width 80px
                margin auto
        &__temperature
            p
                font-size 116px
                line-height 140px
                font-weight 300
                span
                    position relative
                    top -30px
                    font-size 48px
                    vertical-align top

            span
                font-size 19px
                font-weight 300
</style>
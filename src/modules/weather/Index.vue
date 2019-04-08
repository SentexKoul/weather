<template lang="pug">
    .weather
        .weather__header
            p Сегодня, 21 апреля 2016
        .weather__main
                SelectedDay
        .weather__footer
            .weather__item(v-for="day in getDays", 
                                   :class="{ 'weather__item--active': day.active}",
                                   @click="selectDay(day)")
                img(:src="day.icon")
                p {{ day.date }}
            // transition(name="slide")
            //     FormCode
</template>

<script>
import FormCode from './_components/FormCode'
import weatherApi from "./_api/weatherApi.js"
import SelectedDay from "./_components/SelectedDay.vue"
import { mapGetters, mapActions } from "vuex"

export default {
    computed: {
        ...mapGetters({
            getDays: "weather/getDays",
            getSelectedDay: "weather/getSelectedDay"
        })
    },
    methods: {
        ...mapActions({
            updateSelectedDay: "weather/updateSelectedDay"
        }),
        selectDay(day) {
            this.getSelectedDay.active = false;
            this.updateSelectedDay(day)
        }
    },
    mounted() {
        this.updateSelectedDay(this.getDays[0]);
        weatherApi.getWeather()
        .then(response => {
            console.log(response)
        })
    },
    components: {
        FormCode,
        SelectedDay
    }
}
</script>

<style lang="stylus">
    .weather
        background-color #3eb1df
        min-height 100vh
        display flex
        flex-direction column
        &__header
            p
                font-size 13px
                line-height 48px
                text-align center
                margin 0
        &__main
            background-color #21a5da
            display flex
            align-items center
            flex 1
        &__footer   
            display flex
        &__item
            height 120px
            box-sizing border-box
            display flex
            justify-content center
            align-items center
            padding 22px 0
            flex-direction column
            flex auto
            cursor pointer
            &--active
                background-color #1c9dd1
            img
                max-width 60px
                margin-bottom 6px
            p
                font-size 10px
                font-weight 600
                margin 0


    .login
        padding-top 28px
        text-align center
        &__header
            img
                width 251px
        &__forms
            display flex
            .slide-enter
                transform translateX(100vw)
                position absolute
                opacity 0
            .slide-enter-active, .slide-leave-active
                transition .5s
                opacity 1
            .slide-leave-to
                transform translateX(-100vw)
                position absolute
                opacity 0
</style>
<template lang="pug">
    .weather
        .weather__header
            p(v-if="getSelectedDay" :data-text="dateDetail") {{ getSelectedDay.dt | moment("DD MMMM YYYY") }}
        .weather__main
            SelectedDay(:city="city")
        .weather__footer
            .weather__item(v-for="day in getDays",
                           :class="{ 'weather__item--active': day.active}"
                           @click="selectDay(day)")
                img(:src="day.img")
                p {{ day.dt | moment("DD MMMM") }}
</template>

<script>
import weatherApi from "./_api/weatherApi.js"
import SelectedDay from "./_components/SelectedDay.vue"
import { mapGetters, mapActions } from "vuex"

export default {
    data() {
        return {
            city: ''
        }
    },
    computed: {
        ...mapGetters({
            getDays: "weather/getDays",
            getSelectedDay: "weather/getSelectedDay",
            getWeather: "weather/getWeather"
        }),
        dateDetail() {
            let detail = ''
            this.getSelectedDay.id == 0 ? detail = 'Today ' :
            this.getSelectedDay.id == 1 ? detail = 'Tomorrow ' : detail = ''
            return detail
        }
    },
    methods: {
        ...mapActions({
            updateSelectedDay: "weather/updateSelectedDay",
            updateWeather: "weather/updateWeather",
            updateDays: "weather/updateDays"
        }),
        selectDay(day) {
            this.getSelectedDay.active = false
            this.updateSelectedDay(day)
        }
    },
    mounted() {
        weatherApi.getWeather()
        .then(response => {
            for(let day of response.data.list) {
                day.id = response.data.list.indexOf(day)
                this.updateDays(day)
            }

            this.updateSelectedDay(this.getDays[0]);
            this.city = response.data.city.name
        })
    },
    components: {
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
                &:before
                    content attr(data-text)
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
</style>
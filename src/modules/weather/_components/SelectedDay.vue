<template lang="pug">
    .weather__content(v-if="firstItem")
        .weather__description
            transition(:name="transition")
                p(:key="firstItem.id") {{ firstItem.weather[0].description }}
        .weather__icon
            transition(:name="transition")
                img(:src="firstItem.img", :key="firstItem.id")
        .weather__temperature
            transition(:name="transition")
                p(:key="firstItem.id") {{ kelvinToCelsius(firstItem.temp.day) }}
                    span &deg; 
            span {{ city }}
        
</template>

<script>
// import weatherApi from '../_api/weatherApi.js'
import {mapGetters} from "vuex"

export default {
    data() {
        return {
            prevLength: 3,
            startIndex: 0,
            direction: 1
        }
    },
    props: [
        'city',
        'dayId'
    ],
    computed: {
        ...mapGetters({
            getDays: "weather/getDays",
            getSelectedDay: "weather/getSelectedDay"
        }),
        shouldFade({ getDays, prevLength }) {
            return prevLength === 0 || getDays.length === 0 
        },
        transition({ shouldFade, direction }) {
            return shouldFade ? 'fade': direction > 0 ? 'out-left': 'out-right'
        },
        adjustedIndex({ limit, getDays, startIndex }) { 
            const itemCount = getDays.length
            const adjustedStart = limit(startIndex, itemCount)
            const adjusted = adjustedStart < 0 ? itemCount + adjustedStart : adjustedStart
            return adjusted
        },
        shifted({ getDays, adjustedIndex }) {
            const left = getDays.slice(0, adjustedIndex)
            const right = getDays.slice(adjustedIndex)
            return [...right, ...left]
        },
        firstItem: ({ shifted }) => shifted[0]
    },
    methods: {
        kelvinToCelsius(temp) {
            return Math.trunc(temp - 273)
        },
        prev() {
            this.slide(-1)
        },
        next() {
            this.slide(1)
        },
        slide(direction) {
            this.direction = direction
            this.startIndex = this.startIndex + direction
        },
        limit: (x, y) => x % y
    },
    watch: {
        getSelectedDay: function() {
            console.log('Выбран ' + this.getSelectedDay.id)
            console.log('firstItem ' + this.firstItem.id)
            this.getSelectedDay.id >= this.firstItem.id ? this.slide(1) : this.slide(-1)
        }
    }
}   
</script>

<style lang="stylus" scoped>
    .out-left-enter-active, .out-left-leave-active,
    .out-right-enter-active, .out-right-leave-active,
    .fade-enter-active, .fade-leave-active {
        transition: all .5s ease;
    }
    .out-left-enter, .out-left-leave-to,
    .out-right-enter, .out-right-leave-to, 
    .fade-enter, .fade-leave-to {
        opacity: 0;
        position: absolute;
        top 50%
        left 50%
        transform translate(-50%, -50%)
    }
    .out-left-leave-to, .out-right-enter {
        transform: translateX(-3em);
    }
    .out-left-enter, .out-right-leave-to {
        transform: translateX(3em);
    }

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
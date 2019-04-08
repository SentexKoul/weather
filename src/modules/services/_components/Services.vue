<template lang="pug">
    .services__content__list
        .services__content__list__item(v-for="(service, index) in getServiceList", 
                                       :class="{ 'active': service.active }", 
                                       @click="selectService(service)")
            .img-container
                img(:src="service.img_h" v-if="service.active === true")
                img(:src="service.img" v-else)
            p {{ service.title }}
            p.detail(v-if="service.selected_suboption") ({{ service.selected_suboption.name }})
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    computed: {
        ...mapGetters({
            getServiceList: "services/getServiceList",
            getCurrentService: "services/getCurrentService",
        })
    },
    methods: {
        ...mapActions({
            updateSelectedServices: "services/updateSelectedServices",
            updateCurrentService: "services/updateCurrentService"
        }),
        selectService(service) {
            if (service.sub_options) {
                if (service.active) {
                    service.selected_suboption = undefined;
                    this.updateSelectedServices(service);
                } else {
                    this.$modal.show('info-modal');
                    this.updateCurrentService(service);
                }
            } else {
                this.updateSelectedServices(service);
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    .services__content__list
        display flex
        flex-wrap wrap
        justify-content center
        margin-bottom 110px
        &__item
            // как эти бордеры сделать лучше, а?
            display flex
            justify-content flex-start
            align-items center
            flex-direction column
            width: 50%
            height 168px
            border: 1px solid #DEDEDE;
            border-bottom none
            padding 0 10px
            transition 0.3s
            &:nth-child(odd)
                border-right none
            &:last-child,
            &:nth-last-child(2) 
                border-bottom 1px solid #DEDEDE;
            @media (min-width: 768px)
                width 168px
                &:nth-child(2),
                &:nth-child(6),
                &:nth-child(10)
                    border-right none
                &:nth-child(9),
                &:nth-child(10)
                    border-bottom 1px solid #DEDEDE
            .img-container
                position relative
                width 50px
                height 50px
                margin 25px 0 10px
                &::before
                    position absolute
                    top 0
                    left 0
                    content ''
                    display block
                    background #fff
                    width 50px
                    height 50px
                    border-radius 50%
                img 
                    position absolute
                    top 0
                    left 0
                    width 50px
                    margin-bottom 10px
            p
                font-weight 300
                text-align center
                margin 0
                line-height 22px
                &.detail
                    font-size 12px
            &.active
                background #2EB14B
                color #fff
                .img-container
                    &::before
                        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
</style>


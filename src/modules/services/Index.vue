<template lang="pug">
    .services
        .services__title
            h2.title Выберите один или несколько вариантов
        .services__content
            Services
        .services__button.at-bottom
            el-button(class="btn" 
                   :disabled="getSelectedServices.length == 0",
                   :loading="loading",
                   @click="submitServices()") Хочу вернуть налог
        ModalInfo
        ModalDetails
</template>

<script>
import Services from './_components/Services'
import ModalInfo from './_components/ModalInfo.vue'
import ModalDetails from './_components/ModalDetails.vue'
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            loading: false,
        }
    },
    computed: {
        ...mapGetters({
            getSelectedServices: "services/getSelectedServices"
        })
    },
    methods: {
        submitServices() {
            this.loading = true;
            this.$router.push('/summary');
        }
    },
    components: {
        Services,
        ModalInfo,
        ModalDetails
    }
}
</script>

<style lang="stylus" scoped>
    .services
        &__title
            h2.title
                line-height 30px
</style>


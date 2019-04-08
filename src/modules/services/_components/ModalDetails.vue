<template lang="pug">
    modal(
          name='details-modal',
          transition='nice-modal-fade',
          classes='modal', 
          :pivot-y='0.6',
          height='auto',
          width="336px"
          :adaptive='true')
        .modal_details
          .modal_details_close(@click="hideModal()")
            img(src="../assets/close.png")
          .modal_details_title
            h2 Как приобрели недвижимость?
          .modal_details_select
            el-radio(v-for="item in getSuboptions" v-model="radio", :key="item.id" :label="item") {{ item.name }}
          .modal_details_submit
            button(class="btn", @click="confirmSelect()") Продолжить
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data () {
    return {
      radio: Object
    };
  },
  methods: {
    ...mapActions ({
      updateSelectedServices: "services/updateSelectedServices",
      updateSelectedSuboption: "services/updateSelectedSuboption"
    }),
    hideModal () {
      this.$modal.hide('details-modal');
    },
    confirmSelect() {
      this.updateSelectedSuboption(this.radio);
      this.updateSelectedServices(this.getCurrentService);
      this.hideModal();
    }
  },
  computed: {
    ...mapGetters({
      getSuboptions: "services/getSuboptions",
      getCurrentService: "services/getCurrentService"
    })
  },
}
</script>

<style lang="stylus" scoped>
  .modal_details
    position relative
    &_close
      position absolute
      top -80px
      right -20px
      img
        width 35px
    &_title
      h2
        line-height 30px
        margin 0
        font-size 18px
    &_select
      margin-top 16px
</style>

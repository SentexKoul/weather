<template lang="pug">
    modal(
          name='info-modal',
          transition='nice-modal-fade',
          classes='modal', 
          :pivot-y='0.6',
          height='auto',
          width="336px"
          :adaptive='true')
        .modal_info
          .modal_info_close(@click="hideModal()")
            img(src="../assets/close.png")
          .modal_info_title
            h2 Купили недвижимость
          .modal_info_text
            p Кому? Гражданам Российской Федерации, которые получают доходы, облагаемые по ставке 13%, кто купил или построил жильё и тем, кто погашает ипотечный кредит.
            p Размер вычета: 13%. При этом максимальный размер суммы, из которой предоставляется вычет, 2 млн руб. - при строительстве и приобретении жилья, 3 млн руб. - при приобретении жилья в ипотеку (с учётом выплаты процентов по кредиту). Если квартира была куплена до 2014 года, то лимита по процентам нет, и они могут быть возмещены в полном объеме.
            p Как получить? Предоставить в налоговый орган налоговую декларацию, справку 2-НДФЛ, документы, подтверждающие право на жильё, копии платёжных документов, заявление на получение вычета.
          .modal_info_submit
            button(class="btn", @click="showDetailsModal()") Продолжить
</template>

<script>

  export default {
  methods: {
    hideModal () {
      this.$modal.hide('info-modal');
    },
    showDetailsModal(){
      this.$modal.hide('info-modal');
      this.$modal.show('details-modal');
    }
  }  
}
</script>

<style lang="stylus" scoped>
  .modal_info
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
    &_text
      margin 11px 0 18px
      p
        font-weight 300
        line-height 22px
        font-size 16px
        &:not(:last-child)
          margin-bottom 15px   
</style>

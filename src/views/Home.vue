<template lang="pug">
    .container
        router-view
</template>

<script>
export default {
}
</script>

<style lang="stylus">
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600&subset=cyrillic');

    // global styles
    *, *::before, *::after
        box-sizing border-box

    body
        font-family: 'Open Sans', sans-serif;
        color #fff
        font-weight 400
        margin 0
        padding 0
        min-width 320px
        font-size 16px
        overflow-x hidden
        p
            margin 0
        img
            filter invert(100%)

    .container
        margin 0 auto
        min-height 100vh
        width 100%
        overflow hidden
        @media (min-width: 576px)
            width 540px
        @media (min-width: 768px)
            width 720px
</style>


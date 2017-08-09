<template lang="pug">
  nav.gnb
    ul
      router-link(to="/" tag="li" active-class="current-page" exact) 
        a(href) main
      router-link(to="/list" tag="li" active-class="current-page") 
        a(href) list
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="sass">

</style>

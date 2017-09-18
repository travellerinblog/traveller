<template lang="pug">
  transition(name="fade")
    span.error-message {{ writeErrorMessage }}
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'WriteError',
  computed: {
    ...mapGetters(['writeErrorMessage', 'showWriteErrorMessage'])
  }
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s
}
.fade-enter, .fade-leave-to  {
  opacity: 0
}
</style>

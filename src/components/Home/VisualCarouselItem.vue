<template lang="pug">
  transition(name="fade")
    .carousel-item(v-show="isVisible")
      slot
</template>

<script>
export default {
  name: 'VisualCarouselItem',
  computed: {
    isVisible () {
      return this.$parent.active_index === this.index
    }
  },
  data () {
    return {
      index: 0
    }
  }
}
</script>

<style scoped lang="scss">
  .carousel-item{
    position: absolute;
    width: 100%;
    img{
      width: 100%;
      height: auto;
    }
  }
  .fade-enter,
  .fade-leave-to{
    opacity: 0;
  }
  .fade-enter-active,
  .fade-leave-active{
    transition: opacity 0.4s;
  }
</style>

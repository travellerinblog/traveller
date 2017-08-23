<template lang="pug">
  transition(:name="slide")
    .carousel-item(v-show="isVisible")
      slot
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'VisualCarouselItem',
  props: ['index'],
  computed: {
    isVisible () {
      return this.getAcitveIndex === this.index
    },
    ...mapGetters(['getCarouselItems', 'getAcitveIndex', 'getScreenSize', 'slide'])
  }
}
</script>

<style scoped lang="scss">
@import '../../sass/App';
.carousel-item{
  position: absolute;
}
.slideleft-leave-active,
.slideleft-enter-active,
.slideright-leave-active,
.slideright-enter-active {
  transition: 1.5s;
}
.slideleft-enter {
  transform: translateX(125%);
}
.slideleft-leave-to {
  transform: translate(-125%);
}
.slideright-enter {
  transform: translateX(-125%);
}
.slideright-leave-to {
  transform: translate(125%);
}
@include mobile{
  .carousel-item {
    height: 253px;
  }
}
@include tablet{
  .carousel-item{
    height: 362px;
  }
}
</style>

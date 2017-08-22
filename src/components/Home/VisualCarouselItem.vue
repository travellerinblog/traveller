<template lang="pug">
  transition(name="slide")
    .carousel-item(v-show="isVisible" :class="getScreenSize")
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
    ...mapGetters(['getCarouselItems', 'getAcitveIndex', 'getScreenSize'])
  }
}
</script>

<style scoped lang="scss">
@import '../../sass/App';
.carousel-item{
  position: absolute;
}
.slide-leave-active,
.slide-enter-active {
  transition: 1.5s;
}
.slide-enter {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translate(-100%);
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

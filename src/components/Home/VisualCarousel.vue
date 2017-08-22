<template lang="pug">
    .carousel(:class="getScreenSize")
      slot
      .button-group(role="group" v-if="isTabletScreen")
        button.carousel-button.prev(type="button" aria-label="previous content" @click="prevItem")
        button.carousel-button.next(type="button" aria-label="next content" @click="nextItem")
      ul.indicators(role="tablist")
        li(role="presentation" v-for="n in itemCount" :aria-label="'item' + n")
          a(href role="tab" @click.prevent="gotoItem(n-1)" :aria-selected="getAcitveIndex === n-1" :class="{'active-tab': getAcitveIndex === n-1}" )
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'VisualCarousel',
  props: {
    index: {
      type: Number,
      default: 0
    }
  },
  mounted () {
    // this.autoPlayInit()
  },
  data () {
    return {
      autoplayTime: 3000,
      autoplayInterval: null
    }
  },
  computed: {
    ...mapGetters([
      'getScreenSize', 'isDesktopScreen', 'isTabletScreen', 'itemCount', 'getAcitveIndex'
    ])
  },
  methods: {
    prevItem () {
      this.stopAutoplay()
      this.$store.commit('prevItem')
    },
    nextItem (event) {
      if (event) {
        this.stopAutoplay()
      }
      this.$store.commit('nextItem')
    },
    gotoItem (n) {
      this.stopAutoplay()
      this.$store.commit('gotoItem', n)
    },
    stopAutoplay () {
      clearInterval(this.autoplayInterval)
    },
    startAutoplay () {
      this.autoplayInterval = setInterval(() => {
        this.nextItem()
      }, this.autoplayTime)
    },
    autoPlayInit () {
      this.$el.addEventListener('mouseenter', this.stopAutoplay)
      this.$el.addEventListener('mouseleave', this.startAutoplay)
      this.$el.addEventListener('focusin', this.stopAutoplay)
      this.$el.addEventListener('focusout', this.startAutoplay)
      this.startAutoplay()
    }
  }
}
</script>

<style scoped lang="scss" >
@import '../../sass/App';
.carousel {
  width: 100%;
  position: relative;
  overflow: hidden;
}
.carousel-button {
  position: absolute;
  top: 50%;
  width: 32px;
  height: 32px;
  transition: opacity 0.4s;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.6);
  border: none;
  border-radius: 100%;
  &.prev{
    left: 20px;
  }
  &.next{
    right: 20px;
  }
}
button[type="button"] {
  padding: 0;
}
.prev::after {
  content: '‹';
  position: absolute;
  top: -7px;
  left: 10px;
  font-size: 32px;
  color: rgb(244,67,11);
}
.next::after {
  content: '›';
  position: absolute;
  top: -7px;
  right: 10px;
  font-size: 32px;
  color: rgb(244,67,11);
}
.indicators {
  position: absolute;
  display: flex;
  justify-content: center;
  bottom: 20px;
  width: 100%;
  a {
    display: block;
    width: 32px;
    height: 2px;
    margin: 0px 4px;
    background-color: rgba(255,255,255,0.5);
    cursor: pointer;
  }
  .active-tab {
    background-color: rgb(255,255,255);
    cursor: default;
  }
}
@include mobile{
  .carousel{
    height: 253px;
  }
}
@include tablet{
  .carousel{
    height: 362px;
  }
}
</style>

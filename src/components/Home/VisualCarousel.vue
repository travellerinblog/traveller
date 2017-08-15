<template lang="pug">
    .carousel(:class="getScreenSize")
      slot
      .button-group(role="group" v-if="isTabletScreen")
        button.carousel-button.prev(type="button" aria-label="previous content" @click="prevItem") ‹
        button.carousel-button.next(type="button" aria-label="next content" @click="nextItem") ›
      ul.indicators(role="tablist")
        li(role="presentation" v-for="n in itemCount" :aria-label="'item' + n")
          a(href role="tab" @click.prevent="gotoItem(n-1)" aria-selected="false" :class="{'active-tab': getAcitveIndex === n-1}" )
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
    this.setItemIndex()

    // this.$el.addEventListener('mouseenter', this.pauseAutoplay)
    // this.$el.addEventListener('mouseleave', this.startAutoplay)
    // this.$el.addEventListener('focusin', this.pauseAutoplay)
    // this.$el.addEventListener('focusout', this.startAutoplay)

    // this.startAutoplay()
  },
  data () {
    return {
      // autoplayTime: 3000,
      // autoplayInterval: null
    }
  },
  computed: {
    ...mapGetters([
      'getScreenSize', 'isDesktopScreen', 'isTabletScreen', 'itemCount', 'getAcitveIndex'
    ])
  },
  methods: {
    setItemIndex () {
      this.$store.commit('setItemIndex')
    },
    prevItem () {
      this.$store.commit('prevItem')
    },
    nextItem (event) {
      this.$store.commit('nextItem')
    },
    gotoItem (n) {
      this.$store.commit('gotoItem', n)
    }
    // pauseAutoplay () {
    //   if (this.autoplayInterval) {
    //     this.autoplayInterval = clearInterval(this.autoplayInterval)
    //   }
    // },
    // startAutoplay () {
    //   this.autoplayInterval = setInterval(() => {
    //     this.nextItem()
    //   }, this.autoplayTime)
    // }
  }
}
</script>

<style scoped lang="scss" >
  .mobile.carousel{
    height: 253px;
  }
  .tablet.carousel{
    height: 362px;
  }
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
    background-color: rgba(202, 58, 13, 0.45);
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
    font-size: 30px;
    color: rgb(244,67,11);
  }
  .indicators {
    position: absolute;
    display: flex;
    justify-content: center;
    bottom: 20px;
    width: 100%;
    li {
    }
    a {
      display: block;
      width: 32px;
      height: 2px;
      margin: 0 8px;
      background-color: rgba(255,255,255,0.5);
    }
    .active-tab {
      background-color: rgb(255,255,255);
      cursor: default;
    }
  }
</style>

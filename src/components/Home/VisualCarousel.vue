<template lang="pug">
  .carousel
    slot
    button.prev(type="button" aria-label="previous content" @click="prevItem" v-if="!isDesktopScreen")
    button.next(type="button" aria-label="next content" @click="nextItem" v-if="!isDesktopScreen")
    ul.indicators(role="tablist")
      li(role="presentation" v-for="n in itemCount" :aria-label="'item' + n" )
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
        autoplayTime: 4000,
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
        this.$store.dispatch('prevItem')
      },
      nextItem (event) {
        if (event) {
          this.stopAutoplay()
        }
        this.$store.dispatch('nextItem')
      },
      gotoItem (n) {
        this.stopAutoplay()
        this.$store.dispatch('gotoItem', n)
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

<style scoped lang="scss">
  @import '../../sass/App';
  .carousel {
    width: 100%;
    position: relative;
    overflow: hidden;
  }
  button{
    position: absolute;
    width: 50px;
    padding: 0 5px;
    height: 100%;
    border: none;
    background: none;
    &::after{
      position: absolute;
      top: 50%;
      font-size: 50px;
      color: $color1;
      transform: scaleX(0.7);
    }
    &.prev {
      left: 0;
      &::after {
        content: '<';
        left: 10px;
      }
    }
    &.next {
      right: 0;
      &::after {
        content: '>';
        right: 10px;
      }
    }
  }
  
  button[type="button"] {
    padding: 0;
  }
  
  .indicators {
    position: absolute;
    display: flex;
    justify-content: center;
    bottom: 0;
    width: 100%;
    a {
      display: block;
      width: 32px;
      padding: 15px 0;
      margin: 0px 4px;
    }
    .active-tab::after {
      background-color: #fff;
      cursor: default;
    }
    a::after {
      content: '';
      display: block;
      width: 32px;
      height: 2px;
      background-color: rgba(#fff, 0.5);
    }
  }
  
  @include mobile {
    .carousel {
      height: 253px;
    }
  }
  
  @include tablet {
    .carousel {
      height: 362px;
    }
  }
</style>

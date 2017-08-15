<template lang="pug">
    ul.carousel
      slot
      .button-group(role="group" v-if="isTabletScreen")
        button.carousel-button.prev(type="button" aria-label="previous content" @click="prevItem") ‹
        button.carousel-button.next(type="button" aria-label="next content" @click="nextItem") ›
      ul.indicators(role="tablist")
        li(role="presentation" v-for="n in items_count" :aria-label="'item' + n")
          a(href role="tab" @click.prevent="gotoItem(n-1)" aria-selected="false" :class="{'active-tab': active_index === n-1}" ) 
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
    this.items.forEach((item, index) => {
      item.index = index
    })
  },
  data () {
    return {
      active_index: this.index,
      items: this.$children
    }
  },
  computed: {
    items_count () {
      return this.items.length
    },
    class_name (n) {
      return this.active_index === n ? 'indicator active-tab' : 'indicator'
    },
    ...mapGetters([
      'getScreenSize', 'isDesktopScreen', 'isTabletScreen'
    ])
  },
  methods: {
    prevItem () {
      this.active_index === 0 ? this.active_index = 3 : this.active_index--
    },
    nextItem () {
      this.active_index === 3 ? this.active_index = 0 : this.active_index++
    },
    gotoItem (n) {
      this.active_index = n
    }
  }
}
</script>

<style scoped lang="scss" >
  .carousel {
    position: relative;
    height: 770px;
  }
  .carousel-button {
    position: absolute;
    top: 50%;
    border: none;
    background-color: yellow;
    opacity: 0.7;
    transition: opacity 0.4s;
    transform: translateY(-50%);
    &:hover{
      opacity: 1;
    }
    &.prev{
      left: 20px;
    }
    &.next{
      right: 20px;
    }
  }
  .indicators {
    position: absolute;
    left: 50%;
    bottom: 40px;
    transform: translateX(-50%);
    li {
      float: left;
    }
    a {
      display: block;
      width: 20px;
      height: 3px;
      margin: 0 4px;
      background-color: yellow;
    }
    .active-tab {
      background-color: green;
      cursor: default;
    }
  }
</style>

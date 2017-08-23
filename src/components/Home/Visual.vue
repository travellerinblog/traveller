<template lang="pug">
  .visual-container
    .video.col(v-if="isDesktopScreen")
      video#bgvid(poster="https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/visual%2FOur%20Adventure%20WEARING%20KIMONOS%20in%20JAPAN.mp4_000058716.png?alt=media&token=86673f71-3437-4882-96b9-926ca7ec798f" playsinline autoplay muted loop)
        source(src="https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/visual%2FOur%20Adventure%20WEARING%20KIMONOS%20in%20JAPAN.mp4?alt=media&token=46ec0f7a-a308-4cdb-a6ac-6b26f8781d83" type="video/mp4")
      p.video-content 여행의 새로운 패러다임
    .image-carousel.col(v-if="!isDesktopScreen" role="region" aria-label="여행지 이미지 슬라이드")
      visual-carousel.carousel
        visual-carousel-item(v-for="(item, index) in getCarouselItems" :index="index" key="index")
          v-touch(tag="ul" daraggable="true" @swipeleft="nextItem" @swiperight="prevItem" :swipe-options="{ direction: 'horizontal'}").item-container.grid
            router-link(tag="li" to="/view" @dragstart.native="dragStart" @dragend.native="dragEnd" @click.native="gotoBlogView(getCarouselItems[index].key)")
              a(href)
                img(:src="item.contents[0]" :alt="item.country_kr")
                p.content {{ item.country_kr }}
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import VisualCarousel from './VisualCarousel.vue'
import VisualCarouselItem from './VisualCarouselItem.vue'
export default {
  name: 'Visual',
  data () {
    return {
      drag_start_point: null
    }
  },
  components: {
    VisualCarousel, VisualCarouselItem
  },
  beforeCreate () {
    this.$store.dispatch('setCarouselItem')
  },
  mounted () {
    // next Tick을 통해 데이터 갱신후 UI까지 완성되었을 때, callback 함수 실행
    this.$nextTick(function () {
      // 윈도우 사이즈가 변할때 이벤트가 발생하게 연결
      window.addEventListener('resize', this.getWindowWidth)
      // 접속했을 때의 윈도우 사이즈를 알아내기 위해 실행.
      this.getWindowWidth()
    })
  },
  computed: {
    ...mapGetters([
      'getScreenSize', 'isDesktopScreen', 'isTabletScreen', 'getCarouselItems'
    ])
  },
  methods: {
    getWindowWidth () {
      let width = document.documentElement.clientWidth
      this.$store.dispatch('setScreenSize', width)
    },
    dragStart () {
      this.drag_start_point = event.clientX
    },
    dragEnd () {
      this.drag_start_point > event.clientX ? this.$store.commit('nextItem') : this.$store.commit('prevItem')
    },
    ...mapMutations(['gotoBlogView', 'prevItem', 'nextItem'])
  }
}
</script>

<style lang="scss" scoped>
@import '../../sass/App';
@include desktop{
  .video{
  position: relative;
  width: 100%;
  height: 720px;
  overflow: hidden;
    video{
      width: 100%;
      height: auto;
    }
    .video-content{
      position: absolute;
      left: 242px;
      bottom: 214px;
      font-size: 56px;
      color: #fff
    }
  }
}
@include breakpoint(0px, 1199px){
  img {
    width: 125%;
    transform: translateY(-10%);
    user-drag: none; 
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
  .content {
    position: absolute;
    padding-top: 20px;
    padding-left: 40px;
    left: 0px;
    bottom: 0px;
    width: 125%;
    height: 76px;
    font-size: 23px;
    color: #fff;
    background-color: rgba(10,9,8,0.4);
  }
}
</style>


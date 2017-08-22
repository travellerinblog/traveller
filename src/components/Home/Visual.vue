<template lang="pug">
  div.grid
    .video.col(v-if="isDesktopScreen")
      video#bgvid(poster="https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/visual%2FOur%20Adventure%20WEARING%20KIMONOS%20in%20JAPAN.mp4_000058716.png?alt=media&token=86673f71-3437-4882-96b9-926ca7ec798f" playsinline autoplay muted loop)
        source(src="https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/visual%2FOur%20Adventure%20WEARING%20KIMONOS%20in%20JAPAN.mp4?alt=media&token=46ec0f7a-a308-4cdb-a6ac-6b26f8781d83" type="video/mp4")
      p.video-content 여행의 새로운 패러다임
    .image-carousel.col(v-if="!isDesktopScreen" role="region" aria-label="여행지 이미지 슬라이드")
      visual-carousel.carousel
        visual-carousel-item(v-for="(item, index) in getCarouselItems" :index="index" key="index")
          img(:src="item.src" :alt="item.alt")
          p.content {{ item.content }}
</template>

<script>
import {mapGetters} from 'vuex'
import VisualCarousel from './VisualCarousel.vue'
import VisualCarouselItem from './VisualCarouselItem.vue'
export default {
  name: 'Visual',
  components: {
    VisualCarousel, VisualCarouselItem
  },
  data () {
    return {
    }
  },
  updated () {
    this.getWindowWidth()
  },
  computed: {
    ...mapGetters([
      'getScreenSize', 'isDesktopScreen', 'isTabletScreen', 'getCarouselItems'
    ])
  },
  methods: {
    getWindowWidth (event) {
      let width = document.documentElement.clientWidth
      this.$store.dispatch('setScreenSize', width)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../sass/App';
@include mobile{
  img {
    transform: translateY(-15%);
  }
}
@include tablet{
  img{
    transform: translateY(-20%);
  }
}
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
    width: 100%;
  }
  .content {
    position: absolute;
    padding-top: 20px;
    padding-left: 40px;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 76px;
    font-size: 23px;
    color: #fff;
    background-color: rgba(10,9,8,0.4);
  }
}
</style>


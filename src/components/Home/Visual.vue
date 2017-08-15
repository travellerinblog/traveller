<template lang="pug">
  div(:class="getScreenSize")
    .video(v-if="isDesktopScreen")
      video#bgvid(poster="https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/visual%2FOur%20Adventure%20WEARING%20KIMONOS%20in%20JAPAN.mp4_000058716.png?alt=media&token=86673f71-3437-4882-96b9-926ca7ec798f" playsinline autoplay muted loop)
        source(src="https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/visual%2FOur%20Adventure%20WEARING%20KIMONOS%20in%20JAPAN.mp4?alt=media&token=46ec0f7a-a308-4cdb-a6ac-6b26f8781d83" type="video/mp4")
    .image-carousel(v-if="!isDesktopScreen" role="region" aria-label="여행지 이미지 슬라이드")
      visual-carousel
        visual-carousel-item(v-for="(item, index) in items" key="index")
          img(:src="item.src" :alt="item.alt")
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
      items: [
        {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/visual%2Fcarousel_img%2Fgwanghwamun.jpg?alt=media&token=b31abddb-19c3-4503-b466-4191321f33aa', alt: '대한민국 서울 광화문의 야경'},
        {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/visual%2Fcarousel_img%2Fmatterhorn.jpg?alt=media&token=a68b8630-c08c-4315-a014-e0381911e340', alt: '스위스 마테호른산이 보이는 산길'},
        {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/visual%2Fcarousel_img%2Fchiang-mai.jpg?alt=media&token=45d46ccb-3516-4524-be67-bc3c59e3fd43', alt: '태국 치앙마이의 사원'},
        {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/visual%2Fcarousel_img%2Fsydney-opera-house.jpg?alt=media&token=04fcbfee-ff3e-4a33-82f8-64b2e7da76ce', alt: '호주 시드니 오페라 하우스의 야경'}
      ]
    }
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
      'getScreenSize', 'isDesktopScreen', 'isTabletScreen'
    ])
  },
  methods: {
    findElements () {
      var forEach = Array.prototype.forEach
      var slideImages = document.querySelectorAll('.slide-img')
      forEach.call(slideImages, function (el, i) {
        el.index = i
      })
    },
    getWindowWidth (event) {
      let width = document.documentElement.clientWidth
      this.$store.dispatch('setScreenSize', width)
    }
  }
}
</script>

<style lang="scss" scoped>
  .video{
    width: 100%;
    height: 500px;
    overflow: hidden;
    video{
      width: 100%;
      height: auto;
      transform: translateY(-20%);
    }
  }
</style>


    //   li#slide-img-1.slide-img.active-img(role="tab panel" aria-hidden="false" aria-labelledby="slide-tabl-1")  
    //     img(src="https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/visual%2Fgwanghwamun.jpg?alt=media&token=e9ce6d00-947c-4598-b700-4acec3ef8796")
    //     p 대한민국
    //   li#slide-img-2.slide-img(role="tab panel" aria-hidden="true" aria-labelledby="slide-tabl-2")  
    //     img(src="https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/visual%2Fmatterhorn.jpg?alt=media&token=740e6ada-7e2e-4545-9771-0820f98048da")
    //     p 스위스
    //   li#slide-img-3.slide-img(role="tab panel" aria-hidden="true" aria-labelledby="slide-tabl-3")  
    //     img(src="https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/visual%2Fchiang-mai.jpg?alt=media&token=7e76406d-879c-4163-b413-4173378b3a36")
    //     p 태국
    //   li#slide-img-4.slide-img(role="tab panel" aria-hidden="true" aria-labelledby="slide-tabl-4")  
    //     img(src="https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/visual%2Fsydney-opera-house.jpg?alt=media&token=ba3bc762-08a4-42ee-8873-78b1055e5fac")
    //     p 호주
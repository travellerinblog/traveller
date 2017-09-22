<template lang="pug">
  .visual-container(:class="{'click-disable': clickDisable}")
    .video(v-show="isDesktopScreen")
      video#bgvid(poster="https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/visual%2FOur%20Adventure%20WEARING%20KIMONOS%20in%20JAPAN.mp4_000058716.png?alt=media&token=86673f71-3437-4882-96b9-926ca7ec798f" playsinline autoplay muted loop)
        source(src="https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/visual%2FOur%20Adventure%20WEARING%20KIMONOS%20in%20JAPAN.mp4?alt=media&token=46ec0f7a-a308-4cdb-a6ac-6b26f8781d83" type="video/mp4")
      .video-content
        p 
          strong 여행의 새로운 패러다임 
          em 당신의 여행은 어땠나요? 저희 트레블로에게 알려주세요
          button.btn-start(type="button" @click="showSignModal" v-if="userStatus === 'out'") 시작하기
            i.icon-next
          router-link.btn-write(:to="{name: 'Write', query: {id: userUid}}" tag="button" v-if="userStatus === 'in'") 여행 일지 쓰기
            i.icon-next
    .image-carousel(v-show="!isDesktopScreen" role="region" aria-label="여행지 이미지 슬라이드")
      visual-carousel.carousel
        visual-carousel-item(v-for="(item, index) in getCarouselItems" :index="index" key="index")
          v-touch(tag="ul" daraggable="true" @swipeleft="nextItem('drag')" @swiperight="prevItem('drag')" :swipe-options="{ direction: 'horizontal'}").item-container
            router-link(tag="li" :to="{ name: 'View', params: { id: getCarouselItems[index].key }}" @dragstart.native="dragStart" @dragend.native="dragEnd" @click.native="gotoBlogView(getCarouselItems[index].key)")
              a(href)
                img(:src="item.title_img" :alt="item.country_kr")
                p.content 
                  strong {{ item.title }}
                  em {{ item.country_kr }} | {{ item.name }} | 조회수 {{ item.view }}
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'
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
        'getScreenSize', 'isDesktopScreen', 'isTabletScreen', 'getCarouselItems', 'clickDisable', 'userStatus', 'userUid'
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
        this.drag_start_point > event.clientX ? this.$store.dispatch('nextItem', 'drag') : this.$store.dispatch('prevItem', 'drag')
      },
      ...mapMutations(['gotoBlogView', 'showSignModal']),
      ...mapActions(['prevItem', 'nextItem'])
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../sass/App';
  .visual-container {
    overflow: hidden;
  }
  .click-disable {
    pointer-events: none;
    cursor: default;
  }
  @include mobile {
    .image-carousel{
      height: 253px;
      a{
        position: relative;
        display: block;
        width: 100vw;
        height: 253px;
        overflow: hidden;
      }
    }
  }
  
  @include tablet {
    .image-carousel{
      height: 362px;
      a{
        position: relative;
        display: block;
        width: 100vw;
        height: 362px;
        overflow: hidden;
      }
    }
  }
  @include desktop {
    .video {
      position: relative;
      width: 100vw;
      height: 720px;
      overflow: hidden;
      video {
        width: 100%;
        height: auto;
      }
      .video-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 720px;
        background: rgba(#181818, 0.7);
        p {
          position: absolute;
          left: 10%;
          bottom: 16%;
          strong{
            display: block;
            font-size: 48px;
            color: #fff;
            margin-bottom: 20px;
          }
          em{
            height: 40px;
            line-height: 40px;
            display: block;
            font-size: 22px;
            color: #fff
          }
          .btn-start, .btn-write{
            display: block;
            height: 40px;
            line-height: 40px;
            font-size: 30px;
            color: #fff;
            background: none;
            border: 0 none;
            padding: 0;
            i{
              margin-left: 20px;
              &::before{
                display: inline-block;
                height: 35px;
                line-height: 40px;
                padding-top: 5px;
              }
            }
          }
        }
      }
    }
  }
  
  @include breakpoint(0px, 1199px) {
    .image-carousel{
      width: 100vw;
      overflow: hidden;
      a{
        position: relative;
        overflow: hidden;
        display: block;
      }
      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: auto;
        user-drag: none;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-drag: none;
        -webkit-user-select: none;
        -ms-user-select: none;
      }
      .content {
        box-sizing: border-box;
        position: absolute;
        left: 0px;
        bottom: 0px;
        width: 100vw;
        height: 76px;
        padding: 10px 60px 0 60px;
        color: #fff;
        background-color: rgba(#181818, 0.6);
        white-space : nowrap;
        overflow : hidden;
        text-overflow : ellipsis;
        strong{
          display: block;
          width: 100%;
          font-size: 20px;
          margin-bottom: 5px;
          white-space : nowrap;
          overflow : hidden;
          text-overflow : ellipsis;
        }
        em{
          font-size: 14px;
        }
      }
    }
  }
  @include breakpoint(1200px, 1276px) {
    .video {
      video {
        width: auto;
        height: 100%;
      }
    }
  }
</style>


<template lang="pug">
  div
    .video(v-if="false")
      video#bgvid(poster="https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/visual%2FOur%20Adventure%20WEARING%20KIMONOS%20in%20JAPAN.mp4_000058716.png?alt=media&token=86673f71-3437-4882-96b9-926ca7ec798f" playsinline autoplay muted loop)
        source(src="https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/visual%2FOur%20Adventure%20WEARING%20KIMONOS%20in%20JAPAN.mp4?alt=media&token=46ec0f7a-a308-4cdb-a6ac-6b26f8781d83" type="video/mp4")
    .image-carousel.tablet(role="region" aria-label="여행지 이미지 슬라이드" v-if="true")
      ul(role="tablist")
        li(role="presentation")
          a#slide-tab-1.indicator.active-tab(href="#slide-img-1" role="tab" aria-label="대한민국 서울 광화문의 야경" aria-control="slide-img-1" aria-selected="true")
        li(role="presentation")
          a#slide-tab-2.indicator(href="#slide-img-2" role="tab" aria-label="스위스 마테호른산이 보이는 산길" aria-control="slide-img-2" aria-selected="false")
        li(role="presentation")
          a#slide-tab-3.indicator(href="#slide-img-3" role="tab" aria-label="태국 치앙마이의 사원" aria-control="slide-img-3" aria-selected="false")
        li(role="presentation")
          a#slide-tab-4.indicator(href="#slide-img-4" role="tab" aria-label="호주 시드니 오페라 하우스의 야경" aria-control="slide-img-4" aria-selected="false")
      ul.panel-box
        li#slide-img-1.slide-img.active-img(role="tab panel" aria-hidden="false" aria-labelledby="slide-tabl-1")  
          img(src="https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/visual%2Fgwanghwamun-2088592_1280.jpg?alt=media&token=09fa46a6-7ea2-429f-bcf7-33f60ac5063a")
          p 대한민국
        li#slide-img-2.slide-img.active-img(role="tab panel" aria-hidden="true" aria-labelledby="slide-tabl-2")  
          img(src="https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/visual%2Fmatterhorn-2550695_1280.jpg?alt=media&token=44592f78-8879-45a0-be3a-75e6b96bee0b")
          p 스위스
        li#slide-img-3.slide-img.active-img(role="tab panel" aria-hidden="true" aria-labelledby="slide-tabl-3")  
          img(src="https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/visual%2Fchiang-mai-1670926_1280.jpg?alt=media&token=26a18054-88dc-4f6e-8eae-93c9cc436b46")
          p 태국
        li#slide-img-4.slide-img.active-img(role="tab panel" aria-hidden="true" aria-labelledby="slide-tabl-4")  
          img(src="https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/visual%2Fsydney-opera-house-1169155_1280.jpg?alt=media&token=6e6ac4d8-f2b8-48e7-92bc-3c5e7cf3577f")
          p 호주
      .button-group(role="group" v-if="false")
        input.prev-button(type="button" aria-label="previous content" value="‹")
        input.prev-button(type="button" aria-label="next content" value="›")


</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  .image-carousel.moblie{
    height: 505px;
  }
  .image-carousel.tablet{
    height: 725px;
  }
  .image-carousel{
    position: relative;
    overflow: hidden;
    ul[role="tablist"]{
      position: absolute;
      z-index: 1000;
      left: 50%;
      transform: translateX(-50%);
      bottom: 10px;  
      li{
        float: left;
        margin: 15px;
      }
      .indicator{
          display: block;
          width: 65px;
          height: 5px;
          background: rgba(200, 40, 80, 0.5);
      }
    }
    .panel-box{
        float: left;
      .slide-img{
        position: relative;
      }
      img {
        margin-bottom: -5px;
        width: auto;
        height: 100%;
      }
      p{
        position: absolute;
        left: 0;
        bottom: 0;
        padding-top: 40px;
        padding-left: 30px;
        height: 20%;
        width: 100%;
        text-align: left;
        font-size: 20px;
        color: #fff;
        background-color: rgba(0,0,0,0.5);
      }
    }
  }
</style>
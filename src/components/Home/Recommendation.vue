<template lang="pug">
  .recommend-container(:class="getScreenSize")
    .content-header.grid
      h1.header.col.col-m-2.col-t-2.col-d-2 우리가 강추한다!
    .content.grid
      router-link(:to="{ name: 'View', params: { id: 'list1' }}" @click.native="gotoBlogView('list1')").content-image.col.col-d-7.col-t-5
        img(:src="getRecommendItemImgSrc")
      router-link(:to="{ name: 'View', params: { id: 'list1' }}" @click.native="gotoBlogView('list1')").content-text.col.col-d-5.col-m-4.col-t-3
        h2.title {{getRecommendItem.title}}
        p.info {{getConvertedDate}}  |  {{getRecommendItem.country_kr}}  | {{ getRecommendItem.name}}
        p.text {{ getEllipsisText }}


</template>

<script scoped>
  import {mapGetters} from 'vuex'
  import axios from 'axios'
  export default {
    beforeCreate () {
      let api = 'https://traveller-in-blog.firebaseio.com/lists.json'
      axios.get(api).then((response) => {
        this.$store.dispatch('setRecommendItem', response.data)
      }).catch(error => console.log(error.message))
    },
    mounted () {
      // next Tick을 통해 데이터 갱신후 UI까지 완성되었을 때, callback 함수 실행
      this.$nextTick(function () {
        // 윈도우 사이즈가 변할때 이벤트가 발생하게 연결
        window.addEventListener('resize', this.getWindowWidth)
      })
    },
    updated () {
      this.setEllipsisText()
    },
    computed: {
      ...mapGetters(['getScreenSize', 'getRecommendItem', 'getConvertedDate', 'getEllipsisText', 'getRecommendItemImgSrc'])
    },
    methods: {
      gotoBlogView (key) {
        // router-view를 클릭하면, key값을 전달하여 해당 글이 보일 수 있도록 한다.
        this.$store.commit('gotoBlogView', key)
      },
      setEllipsisText () {
        this.$store.commit('setEllipsisText')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../sass/App';
  .recommend-container {
    overflow: hidden;
    margin-top: 20px;
    @extend %maxwidth;
    a {
      text-decoration: none;
    }
    background-color: rgba(244, 67, 11, 0.04);
    .header {
      color: rgb(10, 9, 8);
      font-weight: bold;
    }
    .content-image {
      overflow: hidden;
    }
    .content-text {
      background-color: rgb(255, 255, 255);
      .title {
        font-weight: bold;
        color: rgb(10, 9, 8);
      }
      .info {
        color: rgba(10, 9, 8, 0.65);
      }
      .text {
        color: rgba(10, 9, 8, 0.7);
        line-height: 1.4em
      }
    }
  }
  
  @include mobile {
    .recommend-container{
      margin-top: 20px;
    }
    .header {
      font-size: 16px;
      margin: 0 0 0 10px;
      line-height: 50px;
    }
    .content {
      height: 368px;
      margin: 0 16px 10px 10px;
    }
    .content-image {
      height: 215px;
    }
    img {
      width: 100%;
      height: auto;
    }
    .content-text {
      padding: 16px 16px;
      height: 153px;
      .title {
        font-size: 18px;
      }
      .info {
        margin-top: 10px;
        font-size: 12px;
      }
      .text {
        margin-top: 10px;
        font-size: 14px;
      }
    }
  }
  
  @include tablet {
    .recommend-container{
      margin-top: 30px;
    }
    .header {
      font-size: 18px;
      margin: 0 0 0 15px;
      line-height: 50px;
    }
    .content {
      height: 271px;
      margin: 0 35px 15px 15px;
    }
    .content-image {
      height: 100%;
      img {
        width: 100%;
        height: auto;
      }
    }
    .content-text {
      height: 100%;
      padding: 16px 16px;
      .title {
        font-size: 18px;
      }
      .info {
        margin-top: 10px;
        font-size: 14px;
      }
      .text {
        margin-top: 20px;
        font-size: 14px;
      }
    }
  }
  
  @include desktop {
    .recommend-container{
      margin-top: 40px;
    }
    .header {
      font-size: 28px;
      margin: 20px 0 20px 20px;
      line-height: 50px;
    }
    .content {
      height: 692px;
      margin: 0 36px 40px 20px;
    }
    .content-image {
      height: 100%;
      img {
        width: auto;
        height: 100%;
      }
    }
    .content-text {
      height: 100%;
      padding: 48px 56px;
      .title {
        font-size: 40px;
      }
      .info {
        margin-top: 20px;
        font-size: 18px;
      }
      .text {
        margin-top: 32px;
        font-size: 24px;
      }
    }
  }
</style>

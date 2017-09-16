<template lang="pug">
  .recommend-container(:class="getScreenSize")
    .content-header
      h1 우리가 강추한다!
    .content
      router-link(:to="{ name: 'View', params: { id: 'list1' }}" @click.native="gotoBlogView('list1')").content-image
        img(:src="getRecommendItemImgSrc" alt="추천 게시글 타이틀 이미지")
      router-link(:to="{ name: 'View', params: { id: 'list1' }}" @click.native="gotoBlogView('list1')").content-text
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
    background-color: rgba(#181818, 0.04);
    a {
      text-decoration: none;
      display: block;
    }
    .content-header h1 {
      color: #181818;
      font-weight: bold;
    }
    .content-image {
      overflow: hidden;
    }
    .content-text {
      box-sizing: border-box;
      overflow: hidden;
      background-color: #fff;
      .title {
        font-weight: bold;
        color: #181818;
      }
      .info {
        color: rgba(#181818, 0.65);
      }
      .text {
        color: rgba(#181818, 0.7);
      }
    }
  }
  
  @include mobile {
    .recommend-container{
      padding-top: 20px;
      padding-bottom: 20px;
    }
    .content-header h1 {
      font-size: 16px;
      margin: 0 0 0 10px;
      line-height: 50px;
    }
    .content {
      margin: 0 10px 10px 10px;
    }
    img {
      width: 100%;
      height: auto;
    }
    .content-text {
      padding: 16px 16px;
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
        line-height: 1.6em
      }
    }
  }
  
  @include tablet {
    .recommend-container{
      padding-top: 30px;
      padding-bottom: 30px;
    }
    .content-header h1 {
      font-size: 18px;
      margin: 0 0 0 15px;
      line-height: 50px;
    }
    .content {
      margin: 0 15px 15px 15px;
    }
    .content-image {
      float: left;
      width: 60%;
      height: 350px;
      img {
        width: auto;
        height: 150%;
      }
    }
    .content-text {
      float: left;
      width: 40%;
      height: 350px;
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
        line-height: 1.6em
      }
    }
  }
  
  @include desktop {
    .recommend-container{
      padding-top: 40px;
      padding-bottom: 40px;
    }
    .content-header h1 {
      font-size: 28px;
      margin: 20px 0 20px 20px;
      line-height: 50px;
    }
    .content {
      height: 692px;
      margin: 0 20px 40px 20px;
    }
    .content-image {
      float: left;
      width: 50%;
      height: 100%;
      img {
        width: auto;
        height: 100%;
      }
    }
    .content-text {
      float: left;
      width: 50%;
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
        font-size: 18px;
        line-height: 1.6em
      }
    }
  }
</style>

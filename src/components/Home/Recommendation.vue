<template lang="pug">
    .recommend-container(:class="getScreenSize")
      .content-header.grid
        h1.header.col.col-m-2.col-t-2.col-d-2 우리가 강추한다!
      .content.grid
        router-link(to="/view" @click.native="gotoBlogView('list1')").content-image.col.col-d-7.col-t-5
          img(:src="getRecommendItem.contents[0]")
        router-link(to="/view" @click.native="gotoBlogView('list1')").content-text.col.col-d-5.col-m-4.col-t-3
          h2.title {{getRecommendItem.title}}
          p.info {{getConvertedDate}}  |  {{getRecommendItem.country_kr}}  | {{ getRecommendItem.name}}
          p.text {{ getEllipsisText }}


</template>

<script>
import {mapGetters} from 'vuex'
export default {
  beforeCreate () {
    this.$store.commit('setRecommendItem')
  },
  updated () {
    this.setEllipsisText()
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['getScreenSize', 'getRecommendItem', 'getConvertedDate', 'getEllipsisText'])
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
a{
  text-decoration: none; 
}
.recommend-container{
  background-color: rgba(244, 67, 11, 0.04);
  .header{
    color: rgb(10,9,8);
    font-weight: bold;
  }
  .content-image{
    overflow: hidden;
  }
  .content-text{
    background-color: rgb(255,255,255);
    .title{
      font-weight: bold;
      color: rgb(10,9,8);
    }
    .info{
      color: rgba(10,9,8,0.65);
    }
    .text{
      color: rgba(10,9,8,0.7);
    }
  }
}


@media (max-width: 767px){
  .recommend-container{
      height: 498px;
  }
  .header{
    margin: 44px 0 0 16px;
    font-size: 16px;
  }
  .content{
    height: 368px;
    margin: 20px 16px 48px 16px;
  }
  .content-image{
    height: 215px;
  }
  img{
    width: 100%;
    height: auto;
  }
  .content-text{
    padding: 32px 16px;
    height: 153px;
    .title{
      font-size: 18px;
    }
    .info{
      margin-top: 10px;
      font-size: 12px;
    }
    .text{
      margin-top: 10px;
      font-size: 14px;
    }
  }
}
@media (min-width: 768px) and (max-width: 1199px){
  .recommend-container{
    height: 401px;
  }
  .header{
    margin: 44px 0 0 24px;
    font-size: 18px;
  }
  .content {
    height: 271px;
    margin: 20px 35px 48px 24px;
  }
  .content-image{
    height: 100%;
    img{
      width: 100%;
      height: auto;
    }
  }
  .content-text{
    height: 100%;
    padding: 20px 16px;
    .title{
      font-size: 18px;
    }
    .info{
      margin-top: 10px;
      font-size: 14px;
    }
    .text{
      margin-top: 20px;
      font-size: 14px;
    }
  }
}
@media (min-width: 1200px){
  .recommend-container{
    height: 936px;
  }
  .header{
    margin: 72px 0 0 40px;
    font-size: 28px;
  }
  .content{
    height: 692px;
    margin: 48px 36px 96px 40px;
  }
  .content-image{
    height: 100%;
    img {
      width: auto;
      height: 100%;
    }
  }
  .content-text{
    height: 100%;
    padding: 48px 56px;
    .title{
      font-size: 40px;
    }
    .info{
      margin-top: 20px;
      font-size: 18px;
    }
    .text{
      margin-top: 32px;
      font-size: 24px;
    }
  }
}
</style>

<template lang="pug">
  #app(v-cloak)
    .wrapper
      a.a11y-hidden(href="#content") 본문 바로가기 링크
      t-header
      router-view
      t-footer
</template>

<script>
  import THeader from './components/Home/THeader.vue'
  import TFooter from './components/Home/TFooter.vue'
  export default {
    name: 'app',
    data () {
      return {}
    },
    components: {
      THeader, TFooter
    }
  }
</script>

<style lang="scss">
  @import './sass/App';
  @font-face {
    font-family: 'Nanum Square';
    src: url('./assets/font/NanumSquareR.eot');
    src: url('./assets/font/NanumSquareR.eot?#iefix') format('embedded-opentype'), url('./assets/font/NanumSquareR.woff') format('woff'), url('./assets/font/NanumSquareR.ttf') format('truetype'), url('./assets/font/NanumSquareOTFR.svg#9e23ceb0c858ca37642ba540402577eb') format('svg');
    font-style: normal;
    font-weight: 400;
  }
  
  @font-face {
    font-family: 'Nanum Square';
    src: url('./assets/font/NanumSquareB.eot');
    src: url('./assets/font/NanumSquareB.eot?#iefix') format('embedded-opentype'), url('./assets/font/NanumSquareB.woff') format('woff'), url('./assets/font/NanumSquareB.ttf') format('truetype'), url('./assets/font/NanumSquareOTFB.svg#a41a1fda1fdf3dafd3394867a156b1cf') format('svg');
    font-style: normal;
    font-weight: 700;
  }
  
  @font-face {
    font-family: "travelericon";
    src: url("./assets/font/travelericon.eot");
    src: url("./assets/font/travelericon.eot?#iefix") format("embedded-opentype"), url("./assets/font/travelericon.woff") format("woff"), url("./assets/font/travelericon.ttf") format("truetype"), url("./assets/font/travelericon.svg#travelericon") format("svg");
    font-style: normal;
    font-weight: normal;
  }
  
  [class^="icon-"]:before,
  [class*=" icon-"]:before {
    font-family: "travelericon";
    font-style: normal;
    font-variant: normal;
    text-transform: none;
    speak: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  .icon-delete:before {
    content: "\62";
  }
  
  .icon-down:before {
    content: "\63";
  }
  
  .icon-hamburger:before {
    content: "\64";
  }
  
  .icon-next:before {
    content: "\65";
  }
  
  .icon-up:before {
    content: "\66";
  }
  
  .icon-back:before {
    content: "\61";
  }
  
  .icon-search:before {
    content: "\67";
  }
  
  #app {
    font-family: 'Nanum Square', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #0a0908;
  }
  
  [v-cloak] {
    display: none
  }
  
  .a11y-hidden {
    @extend %readable-hidden;
  }
</style>

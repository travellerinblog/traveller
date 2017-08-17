<template lang="pug">
  #app
    .wrapper
      a(href="#content" class="a11y-hidden ") 본문 바로가기 링크
      router-view
</template>

<script>
export default {
  name: 'app',
  data () {
    return {}
  }
}
</script>

<style lang="scss">
@import './sass/App';
@font-face {
  font-family: 'Nanum Square';
  src: url('./assets/font/NanumSquareR.eot');
  src: url('./assets/font/NanumSquareR.eot?#iefix') format('embedded-opentype'),
       url('./assets/font/NanumSquareR.woff') format('woff'),
       url('./assets/font/NanumSquareR.ttf')  format('truetype'),
       url('./assets/font/NanumSquareOTFR.svg#9e23ceb0c858ca37642ba540402577eb') format('svg');
  font-style: normal;
  font-weight: 400;
}
@font-face {
  font-family: 'Nanum Square';
  src: url('./assets/font/NanumSquareB.eot');
  src: url('./assets/font/NanumSquareB.eot?#iefix') format('embedded-opentype'),
       url('./assets/font/NanumSquareB.woff') format('woff'),
       url('./assets/font/NanumSquareB.ttf')  format('truetype'),
       url('./assets/font/NanumSquareOTFB.svg#a41a1fda1fdf3dafd3394867a156b1cf') format('svg');
  font-style: normal;
  font-weight: 700;
}
@font-face {
    font-family: 'Glyphter';
    src: url('./assets/font/Glyphter.eot');
    src: url('./assets/font/Glyphter.eot?#iefix') format('embedded-opentype'),
         url('./assets/font/Glyphter.woff') format('woff'),
         url('./assets/font/Glyphter.ttf') format('truetype'),
         url('./assets/font/Glyphter.svg#Glyphter') format('svg');
    font-weight: normal;
    font-style: normal;
}
[class*='icon-']:before{
	display: inline-block;
   font-family: 'Glyphter';
   font-style: normal;
   font-weight: normal;
   line-height: 1;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale
}
.icon-search24:before{content:'\0041';}
.icon-back:before{content:'\0042';}
.icon-delete:before{content:'\0043';}
.icon-down:before{content:'\0044';}
.icon-next:before{content:'\0045';}
.icon-up:before{content:'\0046';}
#app {
  font-family: 'Nanum Square','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #000;
}
</style>

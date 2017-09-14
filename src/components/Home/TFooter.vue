<template lang="pug">
  footer.grid
    h1.logo.col.col-d-1.col-t-2.col-m-1
      router-link(to="/" tag="a" href) Traveler
    nav.col.col-d-8.col-t-6.col-m-3
      ul
        router-link(to="/" tag="li") 
          a(href) 이용약관
        router-link(to="/" tag="li") 
          a(href) 개인정보
    div.col.col-d-3.col-t-8.col-m-4
      ul.copyright
        li Serom &amp; Dasom &amp; Ado
        li 2017 &copy; Traveler
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
  @import '../../sass/App.scss';
  .a11y-hidden {
    @extend %readable-hidden;
  }
  
  footer {
    z-index: 0;
    background: #fff;
    border-top: rgba(#181818, 0.2) 1px solid;
  }
  
  .logo a {
    display: inline-block;
    font-size: 20px;
    font-weight: 700;
    color: $color1;
    text-decoration: none;
  }
  
  nav ul {
    @include clearfix;
    li {
      float: left;
      font-size: 14px;
      a {
        color: rgba(#181818, 0.6);
        text-decoration: none;
      }
    }
    li:first-child {
      &::after {
        content: "|";
        display: inline-block;
        padding: 0 10px;
        font-size: 14px;
        color: rgba(#181818, 0.6);
      }
    }
  }
  
  .copyright {
    @include clearfix;
    li {
      font-size: 14px;
      a {
        color: rgba(#181818, 0.6);
      }
    }
  }
  
  @include mobile {
    footer {
      height: auto;
    }
    .logo a {
      margin-left: 10px;
    }
    nav ul {
      @include clearfix;
      float: right;
      margin-right: 10px;
    }
    .copyright {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
  
  @include tablet {
    footer {
      height: auto;
    }
    .logo a {
      margin-left: 15px;
    }
    nav ul {
      @include clearfix;
      float: right;
      margin-right: 15px;
    }
    .copyright {
      margin-left: 15px;
      margin-right: 15px;
    }
  }
  
  @include desktop {
    footer {
      height: 72px;
    }
    .logo a {
      margin-top: 28px;
      margin-left: 20px;
    }
    nav ul {
      margin-top: 30px;
    }
    .copyright {
      @include clearfix;
      float: right;
      margin-top: 30px;
      margin-right: 20px;
      li {
        float: left;
      }
      li:first-child {
        &::after {
          content: "|";
          display: inline-block;
          padding: 0 10px;
          font-size: 14px;
          color: rgba(#181818, 0.6);
        }
      }
    }
  }
  
  @include breakpoint(0px, 1199px) {
    .logo a {
      margin-top: 15px;
    }
    nav ul {
      margin-top: 18px;
    }
    .copyright {
      margin-top: 8px;
      li:first-child {
        float: left;
      }
      li:last-child {
        float: right;
      }
    }
  }
</style>
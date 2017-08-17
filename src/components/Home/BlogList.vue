<template lang="pug">
  .bloglist
    .bloglist-title
      h1 나 여기 왔다 갔다!
      a.more(href="/") 더보기
        i.icon-next
    .bloglist-body
      ul
        li
          a(href="/")
            figure
              div
                img(src="../../assets/1.jpg" alt="아랍공화국의 고요한 사막" title="이미지에 대한 상세 설명은 하단 내용 참조")
              figcaption
                strong 아랍공화국의 고요한 사막
                span 2017.08.22
                em 아랍공화국 | 다다
                  i.icon-next
        li
          a(href="/")
            figure
              div
                img(src="../../assets/2.jpg" alt="아랍공화국의 고요한 사막" title="이미지에 대한 상세 설명은 하단 내용 참조")
              figcaption
                strong 아랍공화국의 고요한 사막
                span 2017.08.22
                em 아랍공화국 | 다다
                  i.icon-next
        li
          a(href="/")
            figure
              div
                img(src="../../assets/3.jpg" alt="아랍공화국의 고요한 사막" title="이미지에 대한 상세 설명은 하단 내용 참조")
              figcaption
                strong 아랍공화국의 고요한 사막
                span 2017.08.22
                em 아랍공화국 | 다다
                  i.icon-next
        li
          a(href="/")
            figure
              div
                img(src="../../assets/4.jpg" alt="아랍공화국의 고요한 사막" title="이미지에 대한 상세 설명은 하단 내용 참조")
              figcaption
                strong 아랍공화국의 고요한 사막
                span 2017.08.22
                em 아랍공화국 | 다다
                i.icon-next
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
@import '../../sass/App';
.bloglist{
  @extend %maxwidth;
}
.bloglist-title{
  @include clearfix;
  h1{
    float: left;
    margin-bottom: 8px;
    color: #0a0908;
    font-weight: 700;
  }
  a{
    float: right;
    display: block;
    color: rgba(#000, .5);
    i{
      vertical-align: -2px;
      margin-left: 8px;
    }
  }
}
.bloglist-body{
  width: 100%;
  overflow: hidden;
  margin-bottom: 16px;
  ul{
    @include clearfix;
    position: relative;
    left: 0;
    width: auto;
    li{
      float: left;
      box-sizing: border-box;
      a{
        display: block;
      }
    }
  }
}
figure{
  position: relative;
  div{
    width: 100%;
    overflow: hidden;
    img{
      height: 100%;
      width: auto;
    }
  }
  figcaption{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 142px;
    box-sizing: border-box;
    padding: 20px;
    background: rgba(#000, .4);
    color: #fff;
    strong{
      @extend %text-ellipsis;
      display: block;
      font-size: 22px;
    }
    span{
      font-size: 16px;
      height: 30px;
      line-height: 30px;
      margin-top: 10px;
    }
    em{
      height: 30px;
      line-height: 30px;
      font-size: 16px;
    }
    i{
      line-height: 30px;
      font-size: 14px;
      vertical-align: -2px;
    }
  }
}
@include mobile{
  .bloglist-title{
    padding: 0 10px;
    height: 42px;
    line-height: 42px;
    h1{
      font-size: 18px;
      height: 42px;
      line-height: 42px;
    }
    a{
      font-size: 14px;
      i{
        font-size: 12px;
      }
    }
  }
  .bloglist-body{
    height: 254px;
  }
  li{
    padding: 0 10px;
    width: 100%;
  }
  figure{
    height: 254px;
    div{
      height: 254px;
      img{
        width: 100%;
        height: auto;
      }
    }
    figcaption{
      height: 76px;
      strong{
        font-size: 18px;
        height: 20px;
        line-height: 20px;
      }
      span{
        display: inline-block;
        font-size: 12px;
        height: 16px;
        line-height: 16px;
      }
      em{
        display: inline-block;
        font-size: 12px;
        height: 16px;
        line-height: 16px;
      }
      i{
        margin-left: 40px;
      }
    }
  }
}
@include tablet{
  .bloglist-title{
    padding: 0 15px;
    height: 42px;
    line-height: 42px;
    h1{
      font-size: 18px;
      height: 42px;
      line-height: 42px;
    }
    a{
      font-size: 14px;
      i{
        font-size: 12px;
      }
    }
  }
  .bloglist-body{
    height: 340px;
  }
  li{
    padding: 0 15px;
    width: 33.333%
  }
  figure{
    height: 340px;
    div{
      height: 340px;
      img{
        transform: translateX(-25%);
      }
    }
    figcaption{
      height: 116px;
      span{
        display: block;
        font-size: 12px;
        height: 16px;
        line-height: 16px;
      }
      em{
        display: inline-block;
        font-size: 12px;
        height: 16px;
        line-height: 16px;
      }
      i{
        margin-left: 40px;
      }
    }
  }
}
@include desktop{
  .bloglist-title{
    padding: 0 20px;
    height: 60px;
    line-height: 60px;
    h1{
      font-size: 28px;
      height: 60px;
      line-height: 60px;
    }
    a{
      font-size: 16px;
      i{
        font-size: 14px;
      }
    }
  }
  .bloglist-body{
    height: 680px;
  }
  li{
    padding: 0 20px;
    width: 25%;
  }
  figure{
    height: 680px;
    div{
      height: 680px;
      img{
        transform: translateX(-50%);
      }
    }
    figcaption{
      height: 142px;
      span{
        display: block;
      }
      em{
        display: inline-block;
      }
      i{
        margin-left: 40px;
      }
    }
  }
}
</style>
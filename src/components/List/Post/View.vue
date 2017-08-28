<template lang="pug">
  div(v-cloak)
    .content-head
      .title-img
        img(:src="getBlogViewItem.contents[0]")
      .title
        h1 {{getBlogViewItem.title}}
        p 
          strong by. {{getBlogViewItem.name}}
          b |
          span {{getBlogViewItem.write_date}}
    .content-body
      .cover
        .contents
          p.text {{getBlogViewItem.contents[1]}}
          img(:src="getBlogViewItem.contents[2]")
          img(:src="getBlogViewItem.contents[3]")
          p.text {{getBlogViewItem.contents[4]}}
          img(:src="getBlogViewItem.contents[5]")
          img(:src="getBlogViewItem.contents[6]")
          img(:src="getBlogViewItem.contents[7]")
          p.text {{getBlogViewItem.contents[8]}}
          img(:src="getBlogViewItem.contents[9]")
          img(:src="getBlogViewItem.contents[10]")
          p.text {{getBlogViewItem.contents[11]}}
          img(:src="getBlogViewItem.contents[12]")
          p.text {{getBlogViewItem.contents[13]}}
          img(:src="getBlogViewItem.contents[14]")
          img(:src="getBlogViewItem.contents[15]")
          img(:src="getBlogViewItem.contents[16]")
          img(:src="getBlogViewItem.contents[17]")
          img(:src="getBlogViewItem.contents[18]")
          p.text {{getBlogViewItem.contents[19]}}
          img(:src="getBlogViewItem.contents[20]")
          p.text {{getBlogViewItem.contents[21]}}
          img(:src="getBlogViewItem.contents[22]")
          p.text {{getBlogViewItem.contents[23]}}
          img(:src="getBlogViewItem.contents[24]")
        .reply
          .reply-write
            h1 댓글 작성
            div
              textarea
              button(type="button") 저장
          .reply-list
            ul
              li
                .reply-list-title
                  .title
                    strong by. {{getBlogViewItem.reply.reply1.name}}
                  .btns
                    span {{getBlogViewItem.reply.reply1.date}}
                    button.btn-edit(type="button") 수정
                    button.btn-delete(type="button") 삭제
                .reply-list-content
                  p {{getBlogViewItem.reply.reply1.reply_text}}
              li
                .reply-list-title
                  .title
                    strong by. {{getBlogViewItem.reply.reply1.name}}
                  .btns
                    span {{getBlogViewItem.reply.reply1.date}}
                    button.btn-save(type="button") 저장
                    button.btn-delete(type="button") 삭제
                .reply-list-content
                 textarea {{getBlogViewItem.reply.reply1.reply_text}}
              li
                .reply-list-title
                  .title
                    strong by. {{getBlogViewItem.reply.reply2.name}}
                  .btns
                    span {{getBlogViewItem.reply.reply2.date}}
                .reply-list-content
                  p {{getBlogViewItem.reply.reply2.reply_text}}

              li
                .reply-list-title
                  .title
                    strong by. {{getBlogViewItem.reply.reply3.name}}
                  .btns
                    span {{getBlogViewItem.reply.reply3.date}}
                .reply-list-content
                  p {{getBlogViewItem.reply.reply3.reply_text}}

              li
                .reply-list-title
                  .title
                    strong by. {{getBlogViewItem.reply.reply4.name}}
                  .btns
                    span {{getBlogViewItem.reply.reply4.date}}
                .reply-list-content
                  p {{getBlogViewItem.reply.reply4.reply_text}}
              li
                .reply-list-title
                  .title
                    strong by. {{getBlogViewItem.reply.reply5.name}}
                  .btns
                    span {{getBlogViewItem.reply.reply5.date}}
                .reply-list-content
                  p {{getBlogViewItem.reply.reply5.reply_text}}
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    beforeCreate () {
      this.$store.commit('gotoBlogView', this.$route.params.id)
    },
    computed: {
      ...mapGetters(['getBlogViewItem'])
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../sass/App';
  b{
    display: inline-block;
    padding: 0 10px;
    font-size: 14px;
  }
  .content-head{
    // position: fixed;
    // z-index: -1;
    width: 100vw;
    height: 700px;
    overflow: hidden;
    .title-img{
      height: 700px;
      img{
        width: 100%;
        height: auto;
      }
      &::after{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 700px;
        background: rgba(#000, .5);
      }
    }
    .title{
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 1220px;
      margin: -150px auto 0 auto;
      box-sizing: border-box;
      h1{
        font-size: 40px;
        color: #fff;
        margin-bottom: 10px;
        padding: 0 20px;
      }
      p{
        padding: 0 20px;
        strong {
          font-size: 20px;
          color: #fff;
          height: 30px;
          line-height: 30px;
        }
        span {
          font-size: 20px;
          color: #fff;
          height: 30px;
          line-height: 30px;
        }
        b{
          color: #fff;
          font-size: 14px;
          height: 30px;
          line-height: 30px;
        }
      }
    }
  }
  .content-body{
    position: relative;
    z-index: 1;
    width: 100%;
    overflow: hidden;
    // padding-top: 700px;
    .cover{
      background: #fff;
      padding-bottom: 100px;
      .contents{
        max-width: 1220px;
        margin: 0 auto;
        box-sizing: border-box;
        padding: 0 20px;
        img{
          width: 100%;
        }
        p{
          padding: 50px 0;
          font-size: 18px;
          line-height: 1.8em;
        }
      }
      .reply{
        max-width: 1220px;
        margin: 0 auto;
        box-sizing: border-box;
        padding: 0 20px;
        .reply-write{
          padding: 20px 0;
          h1{
            font-size: 20px;
            margin-bottom: 10px;
          }
          div{
            @include clearfix;
            textarea{
              box-sizing: border-box;
              float: left;
              width: 90%;
              height: 100px;
              border: 1px solid rgba( #000, 0.4);
              border-radius: 4px 0 0 4px;
            }
            button{
              box-sizing: border-box;
              float: left;
              display: block;
              width: 10%;
              height: 100px;
              background: #f4430b;
              border-radius: 0 4px 4px 0;
              border: 1px solid rgba( #000, 0.4);
              border-left: 0 none;
              font-size: 18px;
              color: #fff;
            }
          }
        }
      }
      .reply-list{
        ul{
          li{
            border: 1px solid rgba(#f4430b, .5);
            margin-bottom: 20px;
            border-radius: 4px;
            .reply-list-title{
              @include clearfix;
              padding: 20px;
              border-bottom: 1px solid rgba(#f4430b, .5);
              .title{
                display: block;
                float: left;
                height: 30px;
                line-height: 30px;
                b{
                  display: inline-block;
                  padding: 0 10px;
                  height: 30px;
                  line-height: 30px;
                  font-size: 14px;
                }
              }
              .btns{
                float: right;
                span{
                  height: 30px;
                  line-height: 30px;
                }
                button{
                  display: inline-block;
                  background: none;
                  padding: 0 10px;
                  height: 30px;
                  line-height: 30px;
                  border-radius: 4px;
                }
                .btn-edit{
                  border: 1px solid rgba(#f4430b, .5);
                  margin: 0 5px;
                }
                .btn-delete{
                  border: 1px solid rgba(#000, .5);
                }
                .btn-save{
                  border: 1px solid rgba(#f4430b, .5);
                  margin: 0 5px;
                }
              }
            }
            .reply-list-content{
              padding: 20px;
              font-size: 18px;
              line-height: 1.8em;
              textarea{
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }
  }
</style>

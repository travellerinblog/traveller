<template lang="pug">
  div(v-cloak)
    .content-head
      .title-img
        img(:src="getBlogViewItem.title_img")
      .title
        h1 {{getBlogViewItem.title}}
        p
          em(v-for="(item, index) in getBlogViewItemTag" :index="index" :key="index") {{ item }}
        p 
          strong by. {{getBlogViewItem.name}}
          b |
          span {{getBlogViewItem.write_date}}
    .content-body
      .cover
        .contents
          ul
            li(v-for="(item, index) in getBlogViewItemContents" :index="index" :key="index")
              p(v-if="item.key === 'text' ") {{ item.value }}
              img(v-else :src="item.value")
        .reply
          .reply-write
            h1 댓글 작성
            div
              textarea(@input="detectEventBinding('name', $event)" :value="reply.reply_text")
              button(type="button" @click="submitText()") 저장
          .reply-list
            ul
              li(v-for="(item, index) in getBlogViewItemReply" :index="index" :key="index")
                .reply-list-title
                  .title
                    strong by. {{item.name}}
                  .btns
                    span {{item.date}}
                    //- button.btn-save(v-if="item.clickedBtnEdit" type="button" @click="replyEdit(index), updateText(index)" :class="index") 저장
                    //- button.btn-edit(v-else type="button" @click="replyEdit(index)" :class="index") 수정
                    //- button.btn-delete(type="button") 삭제
                .reply-list-content
                  //- textarea(v-if="item.clickedBtnEdit" :class="index" @input="detectEventBinding('name', $event)" :value="reply.reply_text" v-text="item.reply_text")
                  p(:class="index") {{item.reply_text}}
</template>

<script>
  import {mapGetters} from 'vuex'
  import axios from 'axios'
  export default {
    data () {
      return {
        clickedBtnEdit: true,
        reply: {
          date: '',
          id: '아이디',
          name: '네임',
          reply_text: '',
          clickedBtnEdit: false
        }
      }
    },
    beforeCreate () {
      let api = 'https://traveller-in-blog.firebaseio.com/lists.json'
      axios.get(api).then((response) => {
        this.$store.dispatch('getReplyFireBase', response).then(response => {
          this.$store.commit('gotoBlogViewReply', this.$route.params.id)
        })
      }).catch(error => console.log(error.message))
      this.$store.commit('gotoBlogView', this.$route.params.id)
      this.$store.commit('gotoBlogViewReply', this.$route.params.id)
      this.$store.commit('gotoBlogViewTag', this.$route.params.id)
      this.$store.commit('gotoBlogViewContent', this.$route.params.id)
    },
    computed: {
      ...mapGetters(['getBlogViewItem', 'getBlogViewItemContents', 'getBlogViewItemReply', 'getBlogViewItemTag'])
    },
    methods: {
      replyEdit (index) {
        let URL = 'https://traveller-in-blog.firebaseio.com/lists/' + 'list1' + '/reply/' + index + '/clickedBtnEdit.json'
        axios.update(URL, this.reply.clickedBtnEdit)
            .then(function (response) {
              console.log(response)
            })
            .catch(function (error) {
              console.error(error.massage)
            })
      },
      submitText () {
        let URL = 'https://traveller-in-blog.firebaseio.com/lists/' + this.$route.params.id + '/reply.json'
        console.log('this', this.reply)
        axios.post(URL, this.reply)
            .then(response => {
              console.log('response:', response)
              this.reply.reply_text = ''
              let api = 'https://traveller-in-blog.firebaseio.com/lists.json'
              axios.get(api).then((response) => {
                this.$store.dispatch('getReplyFireBase', response).then(response => {
                  this.$store.commit('gotoBlogViewReply', this.$route.params.id)
                })
              }).catch(error => console.log(error.message))
            })
            .catch(function (error) {
              console.log('error', error)
            })
      },
      updateText (index) {
        // let URL = 'https://traveller-in-blog.firebaseio.com/lists/' + 'list1' + '/reply/' + index + '.json'
        // this.$http.update(URL, this.clickedBtnEdit)
        //           .then(function (response) {
        //             console.log(response)
        //           })
        //           .catch(function (error) {
        //             console.error(error.massage)
        //           })
      },
      detectEventBinding (target, e) {
        this.reply.reply_text = e.target.value
        let times = new Date()
        let month = (times.getMonth() + 1) < 10 ? '0' + (times.getMonth() + 1).toString() : (times.getMonth() + 1).toString()
        let day = times.getDate() < 10 ? '0' + times.getDate() : times.getDate()
        let hours = times.getHours() < 10 ? '0' + times.getHours() : times.getHours()
        let minute = times.getMinutes() < 10 ? '0' + times.getMinutes() : times.getMinutes()
        let second = times.getSeconds() < 10 ? '0' + times.getSeconds() : times.getSeconds()
        this.reply.date = times.getFullYear() + month + day + hours + minute + second
        console.log(this.reply.date)
      }
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
    position: fixed;
    z-index: -1;
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
      box-sizing: border-box;
      h1{
        font-size: 40px;
        color: #fff;
        margin-bottom: 10px;
      }
      p{
        em{
          font-size: 20px;
          color: #fff;
          height: 30px;
          line-height: 30px;
          margin-right: 10px;
          // &::before{
          //   content: "#";
          //   height: 30px;
          //   font-size: 20px;
          //   color: #fff;
          //   line-height: 30px;
          //   margin-right: 5px;
          // }
        }
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
    .cover{
      background: #fff;
      padding-top: 50px;
      padding-bottom: 100px;
      .contents{
        max-width: 1220px;
        margin: 0 auto;
        box-sizing: border-box;
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
        .reply-write{
          h1{
            font-size: 20px;
            margin-bottom: 10px;
          }
          div{
            @include clearfix;
            textarea{
              box-sizing: border-box;
              float: left;
              height: 100px;
              border: 1px solid rgba( #000, 0.4);
              border-radius: 4px 0 0 4px;
              font-size: 18px;
              line-height: 1.8em;
            }
            button{
              box-sizing: border-box;
              float: left;
              display: block;
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
        margin-top: 20px;
        ul{
          li{
            border: 1px solid rgba(#f4430b, .5);
            margin-bottom: 20px;
            border-radius: 4px;
            .reply-list-title{
              @include clearfix;
              border-bottom: 1px solid rgba(#f4430b, .5);
              .title{
                display: block;
                float: left;
                height: 30px;
                line-height: 30px;
                b{
                  display: inline-block;
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
              font-size: 18px;
              line-height: 1.8em;
              textarea{
                width: 100%;
                height: auto;
                border: 0 none;
                font-size: 18px;
                line-height: 1.8em;
              }
            }
          }
        }
      }
    }
  }
  @include mobile {
    .content-head{
      height: 100vh;
      .title-img{
        height: 100vh;
        img{
          width: auto;
          height: 100%;
        }
        &::after{
          height: 100vh;
        }
      }
      .title{
        margin: -200px auto 0 auto;
        h1{
          padding: 0 10px;
        }
        p{
          padding: 0 10px;
        }
      }
    }
    .content-body{
      padding-top: 100vh;
      .cover{
        .contents{
          padding: 0 10px;
        }
        .reply{
          padding: 0 10px;
          .reply-write{
            div{
              textarea{
                width: 80%;
                padding: 10px;
              }
              button{
                width: 20%;
              }
            }
          }
        }
        .reply-list{
          ul{
            li{
              .reply-list-title{
                padding: 10px;
                .title{
                  b{
                    padding: 0 10px;
                  }
                }
              }
              .reply-list-content{
                padding: 10px;
              }
            }
          }
        }
      }
    }
  }
  @include tablet {
    .content-head{
      height: 100vh;
      .title-img{
        height: 100vh;
        img{
          width: auto;
          height: 100%;
        }
        &::after{
          height: 100vh;
        }
      }
      .title{
        margin: -200px auto 0 auto;
        h1{
          padding: 0 15px;
        }
        p{
          padding: 0 15px;
        }
      }
    }
    .content-body{
      padding-top: 100vh;
      .cover{
        .contents{
          padding: 0 15px;
        }
        .reply{
          padding: 0 15px;
          .reply-write{
            div{
              textarea{
                width: 85%;
                padding: 15px;
              }
              button{
                width: 15%;
              }
            }
          }
        }
        .reply-list{
          ul{
            li{
              .reply-list-title{
                padding: 10px;
                .title{
                  b{
                    padding: 0 15px;
                  }
                }
              }
              .reply-list-content{
                padding: 15px;
              }
            }
          }
        }
      }
    }
  }
  @include desktop {
    .content-head{
      height: 700px;
      .title-img{
        height: 700px;
        img{
          width: 100%;
          height: auto;
        }
        &::after{
          height: 700px;
        }
      }
      .title{
        margin: -150px auto 0 auto;
        h1{
          padding: 0 20px;
        }
        p{
          padding: 0 20px;
        }
      }
    }
    .content-body{
      padding-top: 700px;
      .cover{
        .contents{
          padding: 0 20px;
        }
        .reply{
          padding: 0 20px;
          .reply-write{
            div{
              textarea{
                width: 90%;
                padding: 20px;
              }
              button{
                width: 10%;
              }
            }
          }
        }
        .reply-list{
          ul{
            li{
              .reply-list-title{
                padding: 10px;
                .title{
                  b{
                    padding: 0 20px;
                  }
                }
              }
              .reply-list-content{
                padding: 20px;
              }
            }
          }
        }
      }
    }
  }
</style>

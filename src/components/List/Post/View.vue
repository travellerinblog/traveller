<template lang="pug">
  div(v-cloak)
    .content-head
      .title-img
        img(:src="getBlogViewItem.title_img")
      .title
        h1 {{getBlogViewItem.title}}
        p
          router-link(v-for="(item, index) in getBlogViewItemTag" :index="index" :key="item.tag" :to="{ name: 'ListView', params: { id: 'search' }, query:{search: item }}" @click.native="filterTagList(item)" tag="a") {{ item }}
        p
          strong by. {{getBlogViewItem.name}}
          b |
          span {{getBlogViewItem.write_date}}
          b |
          span 조회수 {{getViewCount}}
        .btn-edits
          router-link.btn-edit(tag='button' :to="{ name: 'Edit', query:{'id': replyUserUid, 'key': this.$route.params.id }}") 수정
          button.btn-delete 삭제
    .content-body
      .cover
        .contents
          ul
            li(v-for="(item, index) in getBlogViewItemContents" :index="index" :key="index")
              p(v-if="item.key === 'text' ") {{ item.value }}
              img(v-else :src="item.value")
        .reply
          .btn-start(v-if="userStatus==='out'")
            button(type="button" @click="showSignModal") 시작하기
          .reply-write(v-else)
            h1 댓글 작성
            div
              textarea(@input="inputReplyText" :value="viewReplyData.reply_text" @click="resetReplytext")
              button(type="button" @click="submitText") 댓글 등록
          .reply-list
            ul
              li(v-for="(item, index) in getBlogViewItemReply" :index="index" :key="index")
                .reply-list-title
                  .title
                    strong by. {{item.name}}
                  .btns
                    span {{item.date}}
                    div(v-if="userStatus==='in'")
                      button.btn-edit(v-show="item.user_uid === replyUserUid && !showEditReply" type="button" @click="changeEditReply(index)") 수정
                      button.btn-save(v-show="showEditReply && index === replyEditable.index" type="button" @click="saveEditReply(item.key)" :id="'reply-save' + index") 저장
                      button.btn-cancel(v-show="showEditReply && index === replyEditable.index" type="button" @click="cancelEditReply(index)") 취소
                      button.btn-delete(v-show="item.user_uid === replyUserUid && !showEditReply" type="button" @click="askDeleteReply(index)") 삭제
                    .ask-delete(v-show="showDeleteReply.display" v-if="index === showDeleteReply.index")
                      p 댓글을 삭제하시겠습니까?
                      button.btn-delete(@click="deleteReply(item.key)") 삭제
                      button.btn-cancel(@click="closeDeleteReply") 취소
                .reply-list-content
                  p(:id="'reply'+index" :contenteditable="replyEditable.index === index && replyEditable.state === true" @blur="focusOut(index, item.key)" @input="editReplyText(item.reply_text)") {{item.reply_text}}
        .btn-contents
          router-link.btn-gotolist(tag="a" :to="{ name: 'ListView', params: { id: 'all' }}" @click.native="setAllBlogList") 목록으로
</template>

<script>
  let listApi = 'https://traveller-in-blog.firebaseio.com/lists.json'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import axios from 'axios'
  export default {
    beforeCreate () {
      axios.get(listApi).then((response) => {
        let payload = { 'data': response.data, 'id': null }
        this.$store.dispatch('setListsData', payload).then(response => {
          this.$store.dispatch('setChangeViewCount', { 'id': this.$route.params.id, 'list': payload.data })
          this.$store.commit('gotoBlogView', this.$route.params.id)
          this.$store.commit('gotoBlogViewReply', this.$route.params.id)
          this.$store.commit('gotoBlogViewTag', this.$route.params.id)
          this.$store.commit('gotoBlogViewContent', this.$route.params.id)
          this.$store.commit('setUserUid', JSON.parse(localStorage.getItem('user_uid')))
        })
      }).catch(error => console.log(error.message))
    },
    computed: {
      ...mapGetters(['getBlogViewItem', 'getBlogViewItemContents', 'getBlogViewItemReply', 'getBlogViewItemTag', 'getViewCount', 'viewReplyData', 'userStatus', 'replyUserUid', 'showDeleteReply', 'replyEditable', 'showEditReply', 'originalReplyText'])
    },
    methods: {
      ...mapMutations(['filterTagList', 'resetReplytext', 'setAllBlogList', 'showSignModal', 'askDeleteReply', 'closeDeleteReply', 'editReplyText']),
      ...mapActions(['inputReplyText', 'saveEditReply']),
      submitText () {
        let URL = 'https://traveller-in-blog.firebaseio.com/lists/' + this.$route.params.id + '/reply.json'
        this.$store.commit('checkReplyText')
        // 댓글이 빈칸일 때 댓글이 달리지 않도록.
        if (this.viewReplyData.reply_text === '댓글이 입력되지 않았습니다. 댓글을 입력해주세요') {
          return
        }
        axios.post(URL, this.viewReplyData).then(() => {
          axios.get(listApi).then(response => {
            let payload = { 'data': response.data, 'id': null }
            this.$store.commit('clearReplyData')
            this.$store.dispatch('setListsData', payload).then(() => {
              this.$store.commit('gotoBlogViewReply', this.$route.params.id)
            })
          }).catch(error => console.log(error.message))
        }).catch(error => console.log(error.message))
      },
      deleteReply (uid) {
        let replyApi = 'https://traveller-in-blog.firebaseio.com/lists/' + this.$route.params.id + '/reply/' + uid + '.json'
        axios.delete(replyApi).then(() => {
          axios.get(listApi).then(response => {
            let payload = { 'data': response.data, 'id': null }
            this.$store.dispatch('setListsData', payload).then(() => {
              this.$store.commit('gotoBlogViewReply', this.$route.params.id)
              this.$store.commit('closeDeleteReply')
            })
          }).catch(error => console.log(error.message))
        }).catch(error => console.log(error.message))
      },
      changeEditReply (index) {
        // 포커스를 주기 위해 수정해야할 리플 엘리먼트를 찾는다.
        let el = document.getElementById('reply' + index)
        // 수정 버튼을 누르면 저장이 보이도록 하는 mutation
        this.$store.commit('changeEditReply', index)
        // 렌더된 다음 포커스를 준다.
        this.$nextTick(() => {
          el.focus()
        })
      },
      cancelEditReply (index) {
        let el = document.getElementById('reply' + index)
        el.textContent = this.originalReplyText
        this.$store.commit('changeEditReply', index)
      },
      saveEditReply (key) {
        this.$store.dispatch('saveEditReply', {'reply_key': key, 'post_id': this.$route.params.id})
      },
      focusOut (index, key) {
        // 댓글의 blur 이벤트
        // blur에 그냥 취소를 연결하면, 저장 버튼을 눌렀을 때도 취소가 동작하기 때문에
        // blur 이벤트가 눌려진 타겟이 저장 버튼이면 저장을 수행하도록하고 아니면 취소를 수행
        if (event.relatedTarget && event.relatedTarget.id === 'reply-save' + index) {
          this.$store.dispatch('saveEditReply', {'reply_key': key, 'post_id': this.$route.params.id})
        } else {
          this.cancelEditReply(index)
        }
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
    .title-img{ 
      position: fixed; 
      z-index: -1; 
      width: 100vw; 
      height: 700px; 
      overflow: hidden; 
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
        background: rgba(#181818, .5); 
      } 
    } 
    .title{ 
      position: relative; 
      z-index: 1; 
      width: 100%; 
      max-width: 1220px; 
      box-sizing: border-box; 
      h1{ 
        font-size: 30px; 
        color: #fff; 
        margin-bottom: 10px; 
      } 
      p{ 
        a{ 
          font-size: 20px; 
          color: #fff; 
          height: 30px; 
          line-height: 30px; 
          margin-right: 10px; 
          text-decoration: none; 
          &::before{ 
            content: "#"; 
            height: 30px; 
            font-size: 20px; 
            color: #fff; 
            line-height: 30px; 
          } 
          &:hover{ 
            text-decoration: underline; 
          } 
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
    .btn-edits{
      button{
        padding: 0 20px;
        height: 30px;
        line-height: 30px;
        border: 0 none;
      }
      .btn-edit{
        background: rgba($color1, .8);
        color: #fff;
      }
      .btn-delete{
        background: rgba(#b0b0b0, .8);
        color: #fff;
        margin-left: 10px;
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
            text-align: right; 
            textarea{ 
              box-sizing: border-box; 
              width: 100%; 
              height: 100px; 
              border: 1px solid rgba( #181818, 0.4); 
              border-radius: 4px; 
              font-size: 18px; 
              line-height: 1.8em; 
            } 
            button{ 
              display: inline-block; 
              height: 30px; 
              line-height: 30px; 
              padding: 0 10px; 
              border: 1px solid $color1; 
              border-radius: 4px; 
              font-size: 16px; 
              background: $color1; 
              color: #fff; 
            } 
          } 
        } 
      } 
      .reply-list{ 
        margin-top: 20px; 
        ul{ 
          li{ 
            border: 1px solid rgba(#181818, .5); 
            margin-bottom: 20px; 
            border-radius: 4px; 
            .reply-list-title{ 
              @include clearfix; 
              border-bottom: 1px solid rgba(#181818, .5); 
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
                  border: 1px solid rgba($color1, .5); 
                  margin: 0 5px; 
                } 
                .btn-delete{ 
                  border: 1px solid rgba(#181818, .5); 
                } 
                .btn-save{ 
                  border: 1px solid rgba($color1, .5); 
                  margin: 0 5px; 
                }
                .ask-delete {
                  position: absolute;
                  width: 200px;
                  height: 50px;
                  border: 1px solid #aaa;
                  background-color: #fff;
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
      .btn-contents{ 
        max-width: 1220px; 
        margin: 0 auto; 
        box-sizing: border-box; 
        margin-top: 20px; 
        text-align: right; 
        .btn-gotolist{ 
          display: inline-block; 
          height: 30px; 
          line-height: 30px; 
          padding: 0 10px; 
          border: 1px solid $color1; 
          border-radius: 4px; 
          font-size: 16px; 
          color: $color1; 
          text-decoration: none; 
        } 
      } 
    } 
  } 
  @include mobile { 
    .content-head{ 
      .title-img{ 
        height: 500px; 
        img{ 
          width: auto; 
          height: 100%; 
        } 
        &::after{ 
          height: 500px; 
        } 
      } 
      .title{ 
        margin: 0 auto; 
        padding: 320px 0 100px 0; 
        h1{ 
          padding: 0 10px; 
        } 
        p{ 
          padding: 0 10px; 
        } 
      } 
      .btn-edits{
        margin-top: 20px;
        margin-left: 10px;
      } 
    } 
    .content-body{ 
      .cover{ 
        .contents{ 
          padding: 0 10px; 
        } 
        .reply{ 
          padding: 0 10px; 
          .reply-write{ 
            div{ 
              textarea{ 
                padding: 10px; 
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
        .btn-contents{ 
          padding: 0 10px; 
        } 
      } 
    } 
  } 
  @include tablet { 
    .content-head{ 
      .title-img{ 
        img{ 
          width: auto; 
          height: 120%; 
        } 
      } 
      .title{ 
        margin: 0 auto; 
        padding: 550px 0 100px 0; 
        h1{ 
          padding: 0 15px; 
        } 
        p{ 
          padding: 0 15px; 
        } 
      }
      .btn-edits{
        margin-top: 20px;
        margin-left: 15px;
      }  
    } 
    .content-body{ 
      .cover{ 
        .contents{ 
          padding: 0 15px; 
        } 
        .reply{ 
          padding: 0 15px; 
          .reply-write{ 
            div{ 
              textarea{ 
                padding: 15px; 
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
        .btn-contents{ 
          padding: 0 15px; 
        } 
      } 
    } 
  } 
  @include desktop { 
    .content-head{ 
      .title{ 
        margin: 0 auto; 
        padding: 550px 0 100px 0; 
        h1{ 
          padding: 0 20px; 
        } 
        p{ 
          padding: 0 20px; 
        } 
        .btn-edits{
          position: absolute;
          bottom: 106px;
          right: 0;
          margin-top: 0;
        }
      } 
    } 
    .content-body{ 
      .cover{ 
        .contents{ 
          padding: 0 20px; 
        } 
        .reply{ 
          padding: 0 20px; 
          .reply-write{ 
            div{ 
              textarea{ 
                padding: 20px; 
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
        .btn-contents{ 
          padding: 0 20px; 
        } 
      } 
    } 
  } 
</style> 
<template lang="pug">
  .countrylist
    .country-title
      h1 어디로 갈래?
      router-link.country-more(tag="a" :to="{ name: 'ListView', params: { id: 'all' }}" @click.native="setAllBlogList") 더보기
        i.icon-next
    .country-body
      v-touch(tag="ul" daraggable="true" @swipeleft="next" @swiperight="prev" :swipe-options="{ direction: 'horizontal'}")
        router-link( :to="{ name: 'ListView', params: { id: item.country }}" tag="li" @click.native="filterCountryList(item.country)" @dragstart.native="dragStart" @dragend.native="dragEnd" v-for="(item, index) in getCountryListItems" :key="item.country")
          a(href)
            figure
              div
                img(:src="item.src" :alt="item.alt") 
              figcaption
                strong {{ item.content }}
</template>

<script scoped>
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        drag_start_point: null
      }
    },
    computed: {
      ...mapGetters(['getCountryListItems'])
    },
    methods: {
      dragStart () {
        this.drag_start_point = event.clientX
      },
      dragEnd () {
        this.drag_start_point > event.clientX ? this.next() : this.prev()
      },
      filterCountryList (country) {
        this.$store.dispatch('setListsData', country)
      },
      setAllBlogList () {
        this.$store.commit('setAllBlogList')
      },
      next (event) {
        this.$store.commit('swipeCountryList', 'next')
      },
      prev () {
        this.$store.commit('swipeCountryList', 'prev')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../sass/App';
  .countrylist {
    margin-top: 20px;
    @extend %maxwidth;
  }
  
  .country-title {
    @include clearfix;
    h1 {
      float: left;
      margin-bottom: 8px;
      color: #181818;
      font-weight: 700;
    }
    a {
      float: right;
      display: block;
      color: rgba(#181818, .5);
      text-decoration: none;
      i {
        vertical-align: -2px;
        margin-left: 8px;
      }
    }
  }
  
  .country-body {
    position: relative;
    margin-bottom: 16px;
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    ul {
      @include clearfix;
      li {
        float: left;
        box-sizing: border-box;
        height: 480px;
        a {
          position: relative;
          display: block;
          width: 100%;
          height: 100%;
        }
        figure {
          div {
            position: relative;
            overflow: hidden;
            width: 100%;
            img {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              user-drag: none;
              user-select: none;
              -moz-user-select: none;
              -webkit-user-drag: none;
              -webkit-user-select: none;
              -ms-user-select: none;
            }
          }
          figcaption {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 58px;
            box-sizing: border-box;
            background: rgba(#181818, .4);
            color: #fff;
            strong {
              font-size: 22px;
              height: 58px;
              line-height: 58px;
            }
          }
        }
      }
    }
  }
  
  @include mobile {
    .country-title {
      padding: 0 10px;
      height: 42px;
      line-height: 42px;
      h1 {
        font-size: 18px;
        height: 42px;
        line-height: 42px;
      }
      a {
        font-size: 14px;
        i {
          font-size: 12px;
        }
      }
    }
    .country-body {
      height: 254px;
      ul {
        padding: 0 10px;
        li {
          width: 80%;
          a {
            height: 254px;
            figure {
              height: 254px;
              div {
                height: 254px;
                img {
                  width: 150%;
                  height: auto;
                }
              }
              figcaption {
                padding: 0 10px;
                strong {
                  font-size: 18px;
                }
              }
            }
          }
        }
        li:nth-child(2) {
          opacity: 0.5;
          width: 20%;
          a {
            figure {
              div {
                img {
                  width: auto;
                  height: 254px;
                }
              }
            }
          }
        }
      }
    }
  }
  
  @include tablet {
    .country-title {
      padding: 0 15px;
      height: 42px;
      line-height: 42px;
      h1 {
        font-size: 18px;
        height: 42px;
        line-height: 42px;
      }
      a {
        font-size: 14px;
        i {
          font-size: 12px;
        }
      }
    }
    .country-body {
      height: 340px;
      ul {
        padding: 0 15px;
        li {
          width: 45%;
          a {
            height: 340px;
            figure {
              height: 340px;
              div {
                overflow: hidden;
                height: 340px;
                img {
                  width: 150%;
                  height: auto;
                }
              }
              figcaption {
                padding: 0 15px;
                strong {
                  font-size: 18px;
                }
              }
            }
          }
        }
        li:nth-child(3) {
          opacity: 0.5;
          width: 10%;
          a {
            figure {
              div {
                img {
                  width: auto;
                  height: 340px;
                }
              }
            }
          }
        }
      }
    }
  }
  
  @include desktop {
    .country-title {
      padding: 0 20px;
      height: 60px;
      line-height: 60px;
      h1 {
        font-size: 28px;
        height: 60px;
        line-height: 60px;
      }
      a {
        font-size: 16px;
        i {
          font-size: 14px;
        }
      }
    }
    .country-body {
      height: 480px;
      ul {
        padding-left: 20px;
        padding-right: 20px;
        li {
          width: 30%;
          figure {
            height: 680px;
            div {
              height: 680px;
              img {
                width: auto;
                height: 110%;
              }
            }
            figcaption {
              padding: 0 20px;
            }
          }
        }
        li:nth-child(4) {
          opacity: 0.5;
          width: 10%;
          a {
            figure {
              div {
                img {
                  width: auto;
                  height: 110%;
                }
              }
            }
          }
        }
      }
    }
  }

  @include breakpoint(0px, 500px) {
    .country-body {
      ul {
        li {
          a {
            figure {
              div {
                img {
                  width: auto;
                  height: 100%;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
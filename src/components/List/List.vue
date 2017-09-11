<template lang="pug">
div
  .list-container
    h1.list-title 당신의 다음 목적지는 어디인가요?
    ul.list-filter
      li.country-and-city
        a.selected-country(href @click.prevent="toggleFilter('country')" :class="{'default-filter-msg': selectedCountryFilter === '보고싶은 나라를 선택하세요.'}") {{ selectedCountryFilter }}
          i.icon-down
        div.filter-container(v-show="showCountry")  
          ul.country-and-city-filter
            router-link( :to="{ name: 'ListView', params: { id: 'all' }}" tag="li" @click.native="setAllBlogList")
              a(href) 나라전체
            li(v-for="(country, index) in getCountryAndCityName" :key="'country' + index")
              a(href @click.prevent="toggleFilter(country.countryKey)") {{country.country}} 
              ul.city-filter(v-if="selectedCountryKey===country.countryKey" v-show="showCity")
                router-link( :to="{ name: 'ListView', params: { id: country.countryKey }}" tag="li" @click.native="filterCountryList(country.countryKey)")
                  a(href) 지역전체
                router-link(:to="{ name: 'ListView', params: { id: citygroup.key }}" tag="li" v-for="(citygroup, index) in country.citygroup" :key="'city' + index" @click.native="filterCityList(citygroup.key)")
                  a(href) {{ citygroup.city }}
      li.new-and-popular(:class="{'filter-open': showFilter === true}")
        a.selected-filter(href @click.prevent="toggleFilter('filter')") {{ selectedFilter }}
          i.icon-down
        ul.new-and-popular-filter(v-show="showFilter")
          router-link(v-show="selectedFilter==='인기순'" :to="{ name: 'ListView', params: { id: $route.params.id }}" tag="li"  @click.native="newListFilter")
            a(href) 최신순
          router-link(v-show="selectedFilter==='최신순'" :to="{ name: 'ListView', params: { id: $route.params.id }}" tag="li" @click.native="popularListFilter")
            a(href) 인기순
    router-view
  .goto-write
    h2.write-title 당신의 여행 일지를 트래블러스들에게 자랑하는 공간!
    router-link.write-link(:to="{name: 'Write', params: {id: 'wirte'}}") 여행 일지 쓰기
</template>
<script>
const listApi = 'https://traveller-in-blog.firebaseio.com/lists.json'
const locationApi = 'https://traveller-in-blog.firebaseio.com/locations.json'
import {mapGetters, mapMutations} from 'vuex'
import ListView from './ListView.vue'
import axios from 'axios'
export default {
  name: 'list',
  components: {
    ListView
  },
  mounted () {
    axios.get(listApi).then(response => {
      let payload = { 'data': response.data, 'id': this.$route.params.id, 'search': this.$route.query.search }
      console.log(payload.search)
      this.$store.dispatch('setListsData', payload).then(response => {
        this.$store.commit('makePageNumber', this.getFilteredList.length)
        this.$store.commit('newListFilter')
      })
    }).catch(error => console.log(error.message))
    axios.get(locationApi).then(response => {
      this.$store.dispatch('setCountryAndCity', response.data)
    }).catch(error => console.log(error.message))
  },
  computed: {
    ...mapGetters(['getFilteredList', 'getCountryAndCityName', 'selectedFilter', 'selectedCountryFilter', 'showFilter', 'showCountry', 'showCity', 'selectedCountryKey'])
  },
  methods: {
    setAllBlogList () {
      this.$store.commit('setAllBlogList', {'id': this.$route.params.id})
      this.$store.commit('makePageNumber', this.getFilteredList.length)
    },
    // 필터를 선택하면 보여지는 글의 개수가 달라지기 때문에, makePageNumber 실행 필요.
    filterCountryList (country) {
      this.$store.commit('setCountryAndCityData')
      this.$store.commit('filterCountryList', country)
      this.$store.commit('makePageNumber', this.getFilteredList.length)
    },
    filterCityList (city) {
      this.$store.commit('filterCityList', city)
      this.$store.commit('makePageNumber', this.getFilteredList.length)
    },
    ...mapMutations(['gotoBlogView', 'popularListFilter', 'newListFilter', 'toggleFilter'])
  }
}
</script>

<style lang="scss" scoped>
@import '../../sass/App';
* {
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: inherit;
}
.list-container {
  @extend %maxwidth;
  .list-title{
    color: rgb(10,9,8);
  }
}
.list-filter{
   @include clearfix;
  .icon-down{
    position: relative;
    top: 3px;
    float: right;
    font-size: 18px;
  }
   position: relative;
  .country-and-city{
    position: relative;
    .selected-country{
      display: block;
      font-weight: bold;
      color: rgba(244, 67, 11,0.7);
    }
    .default-filter-msg.selected-country{
      color: rgba(10, 9, 8, 0.7);
    }
    .filter-container {
      position: absolute;
      z-index: 50;
      overflow: hidden;
      background-color: #fff;
      border: 1px solid rgba(10, 9, 8, 0.34);
      border-radius: 2px;
      border-top: none;
      box-shadow: 0 1px 0px 0 rgba(10, 9, 8, 0.34);
    }
    .country-and-city-filter{
      position: absolute;
      z-index: 50;
      overflow-Y: scroll;
    }
    .city-filter{
      position: absolute;
    }
  }
  .new-and-popular{
    color: rgba(10,9,8, 0.7);
    .selected-filter{
      font-weight: bold;
    }
  }
}
.goto-write{
  width: 100%;
  text-align: center;
  background-color: rgb(244, 67, 11);
  .write-title{
    color: #fff;
  }
  .write-link {
    display: block;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 4px;
    box-shadow: 0 2px 3px 0 rgb(182,45,2);
  }
}
@include mobile {
  .list-container{
    padding: 56px 10px 0 10px;
  }
  .list-title {
    margin: 40px 0 0 0;
  }
  .list-filter{
    margin: 24px 0 0 0;
    height: 84px;
    .country-and-city{
      padding: 0 16px 0 0; 
      width: 100%;
      height: 36px;
      border: 1px solid rgba(10, 9, 8, 0.34);
      border-radius: 2px;
      box-shadow: 0 1px 0px 0 rgba(10, 9, 8, 0.34);
      font-size: 14px;
      .selected-country{
        margin: 10px 0 0 16px;
      }
      .filter-container {
        padding: 5px 0 0 0;
        top: 32px;
        left: -1px;
        width: 100%;
        height: 275px;
        box-sizing: content-box;
      }
      .country-and-city-filter{
        width: 120%;
        height: 290px;
        li{
          position: relative;
          width: 150px;
          margin: 0 0 0 16px;
          height: 36px;
        }
        .city-filter{
          top: 0; 
          left: 200px;
          li{
            height: 30px;
          }
        }
      }
    }
    .new-and-popular.filter-open{
      width: 100%;
      height: 70px;
    }
    .new-and-popular{
      position: absolute;
      margin: 12px 0 0 0;
      padding: 10px 16px 0 16px;
      width: 100%;
      height: 36px;
      border: 1px solid rgba(10, 9, 8, 0.34);
      border-radius: 2px;
      box-shadow: 0 1px 0px 0 rgba(10, 9, 8, 0.34);
      font-size: 14px;
      .new-and-popular-filter{
        margin: 14px 0 0 0;
      }
    }
  }
  .goto-write{
    margin: 32px 0 0 0;
    .write-title{
      margin: 0 47px 0 10px;
      padding: 32px 0 0 0;
      text-align: left;
      font-size: 20px;
    }
    .write-link {
      margin: 20px 0 0 10px;
      width: 104px;
      height: 34px;
      line-height: 34px;
      font-size: 13px;
    }
  }
}
@include tablet {
  .list-container{
    padding: 56px 0 0 15px;
  }
  .list-title{
    margin: 50px 0 0 0;
  }
  .list-filter{
    margin: 32px 0 0 0;
    .country-and-city{
      padding: 0 24px 0 0; 
      width: 370px;
      height: 36px;
      float: left;
      border: 1px solid rgba(10, 9, 8, 0.34);
      border-radius: 2px;
      box-shadow: 0 1px 0px 0 rgba(10, 9, 8, 0.34);
      font-size: 14px;
      .selected-country{
        margin: 10px 0 0 24px;
      }
      .filter-container {
        padding: 5px 0 0 0;
        top: 34px;
        left: -1px;
        width: 370px;
        height: 275px;
      }
      .country-and-city-filter{
        padding: 0 0 8px 0;
        width: 390px;
        height: 290px;
        li{
          position: relative;
          width: 150px;
          margin: 0 0 0 24px;
          height: 36px;
        }
        .city-filter{
          top: 0; 
          left: 150px;
          li{
            height: 30px;
          }
        }
      }
    }
    .new-and-popular.filter-open{
      width: 105px;
      height: 70px;
      border: 1px solid rgba(10,9,8,0.34);
      border-radius: 2px;
    }
    .new-and-popular{
      position: absolute;
      padding: 10px 8px 0 8px;
      top: 0;
      right: 24px;
      width: 105px;
      height: 36px;
      float: right;
      font-size: 14px;
      .new-and-popular-filter{
        margin: 14px 0 0 0;
      }
    }
  }
  .goto-write{
    margin: 40px 0 0 0;
    .write-title{
      margin: 56px 0 0 64px;
      width: 389px;
      text-align: left;
      font-size: 25px;
      float: left;
    }
    .write-link{
      margin: 68px 64px 0 0;
      width: 153px;
      height: 46px;
      float: right;
      line-height: 46px;
      font-size: 18px;
    }
  }
}
@include desktop {
  .list-container{
    padding: 56px 0 0 20px;
  }
  .list-title{
    font-size: 42px;
    margin: 117px 0 0 0;
  }
  .list-filter{
    margin: 64px 0 0 0;
    .country-and-city{
      padding: 0 32px 0 0; 
      width: 600px;
      height: 48px;
      float: left;
      border: 1px solid rgba(10, 9, 8, 0.34);
      border-radius: 2px;
      box-shadow: 0 1px 0px 0 rgba(10, 9, 8, 0.34);
      .selected-country{
        margin: 14px 0 0 32px;
        font-size: 18px;
      }
      .filter-container {
        padding: 14px 0 0 0;
        top: 45px;
        left: -1px;
        width: 600px;
        height: 330px;
      }
      .country-and-city-filter{
        padding: 0 0 8px 0;
        width: 630px;
        height: 336px;
        li{
          position: relative;
          width: 300px;
          margin: 0 0 0 32px;
          height: 48px;
        }
        .city-filter{
          top: 0; 
          left: 300px;
          li{
            height: 40px;
          }
        }
      }
    }
    .new-and-popular.filter-open{
      width: 140px;
      height: 89px;
      border: 1px solid rgba(10,9,8,0.34);
      border-radius: 2px;
    }
    .new-and-popular{
      position: absolute;
      padding: 13px 16px 0 16px;
      top: 0;
      right: 40px;
      width: 140px;
      height: 48px;
      float: right;
      font-size: 18px;
      .new-and-popular-filter{
        margin: 23px 0 0 0;
      }
    }
  }
  .goto-write{
    margin: 40px 0 0 0;
    height: 260px;
    .write-title{
      padding: 50px 0 0 0;
      font-size: 43px;
    }
    .write-link {
      margin: 21px auto 0 auto;
      width: 201px;
      height: 62px;
      line-height: 62px;
      font-size: 24px;
    }
  }
}
@include breakpoint(0px, 1199px){
  .list-title{
    font-size: 20px;
  }
  .goto-write{
    height: 182px;
  }
}

</style>

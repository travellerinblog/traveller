<template lang="pug">
  .write
    .write-title-container
      .title-text-container
        .title
          label.a11y-hidden(for="write-title") 제목을 입력하세요.
          input#write-title(:value="writeTitleValue" @click="clearInput('title')" @input="setTitleValue" @blur="inputValueCheck('title')")
          span.title-error(v-show="showTitleErrorMessage") {{ titleErrorMessage }}
        .tag
          label.a11y-hidden(for="write-tag") 태그를 입력하세요.
          input#write-tag(:value="writeTagValue" @click="clearInput('tag')" @input="setTagValue" @blur="inputValueCheck('tag')")
          span.tag-error(v-show="showTagErrorMessage") {{ tagErrorMessage }}
        form.title-image-form
          label(for="title-image-input") 대표이미지를 등록하세요
          input#title-image-input.a11y-hidden(type="file" name="title-image" @change="imageUpload('title')")
        span.title-image-error(v-show="showTitleImageProgress") {{imageProgressMessage}}
      .title-image-container 
        img(:src="wirteTitleImgUrl")
    .write-contents-container
      .country-and-city
        p.selected-country(tabindex="0" @click.prevent="toggleWriteCountryCity('country')" :class="{'default-filter-msg': selectedWriteCity === '여행지를 선택하세요.'}") {{ selectedWriteCity }}
          i.icon-down
        .select-container(v-show="showWriteCountry")  
          ul.country-and-city-select
            li.country(v-for="(country, index) in getCountryAndCityName" :key="'country' + index")
              a(href @click.prevent="toggleWriteCountryCity(country.countryKey)") {{country.country}} 
              ul.city-filter(v-if="selectedWriteCountryKey===country.countryKey" v-show="showWriteCity")
                li.city(v-for="(citygroup, index) in country.citygroup" :key="'city' + index")
                  input.a11y-hidden(type="checkbox" :id="citygroup.city" @change.prevent="setSelectedItem")
                  label(:for="citygroup.city") {{ citygroup.city }}
                li.city-btn
                  button.city-save-btn(type="submit" @click.prevent="selectComplete(getCountryAndCityName)") 저장
      form.date-setting
        .start-date(role="group")
          label(for="start-date") 여행 시작 날짜 
          input#start-date(type="date" @change="setDate('start')")
        .end-date(role="group")
          label(for="end-date") 여행 종료 날짜
          input#end-date(type="date" @change="setDate('end')")
        .date-btn
          button.date-save-btn(type="submit" @click.prevent="saveDate") 저장
          button.date-save-btn(type="reset" @click="resetDate") 취소
        span.date-error-message(v-show="showDateErrorMessage") {{ dateErrorMessage }}
      .input-contents  
        form.contents-image
          label(for="contents-image") 이미지를 추가하세요
          input#contents-image.a11y-hidden(type="file" name="contents-image" @change="imageUpload('content')")
        form.contents-text
          label(for="contents-text") 텍스트를 추가하세요
          button#contents-text.a11y-hidden(type="button" name="contents-text" @click="setContentsText")
      span.image-progress(v-show="showContentImageProgress") {{imageProgressMessage}}
      ul.write-contents-view
        li.contents-view-item(v-for="(content, index) in writeContentsData")
          textarea(v-if="content.key === 'text'" @input="addContentsText(index)" @blur="inputValueCheck(index)")
          span.text-error-message(v-if="content.key === 'text' && content.value.length === 0" v-show="showContentErrorMessage") {{ contentErrorMessage }}
          img(v-if="content.key === 'img'" :src="content.value")
          button.delete(type="button" @click="deleteContent(index)" aria-label="삭제") X
      form.write-button
        button(type="submit" @click.prevent="saveWriteData") 저장
        router-link.save-btn(to="/list/default" tag="button" @click="setListsData('default')") 취소
      span.error-message(v-show="showWriteErrorMessage") {{ writeErrorMessage }}
</template>

<script>
  const locationApi = 'https://traveller-in-blog.firebaseio.com/locations.json'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import axios from 'axios'
  export default {
    name: 'write',
    mounted () {
      this.$store.commit('resetTempData', {'start': window.document.querySelector('#start-date'), 'end': window.document.querySelector('#end-date')})
      axios.get(locationApi).then(response => {
        this.$store.dispatch('setCountryAndCity', response.data)
      }).catch(error => console.log(error.message))
    },
    computed: {
      ...mapGetters(['getCountryAndCityName', 'writeTitleValue', 'writeContentsData', 'writeTagValue', 'wirteTitleImgUrl', 'selectedWriteCity', 'selectedWriteCountryKey', 'showWriteCountry', 'showWriteCity', 'writeErrorMessage', 'showWriteErrorMessage', 'writeErrorMessage', 'dateErrorMessage', 'showDateErrorMessage', 'showTitleImageProgress', 'showContentImageProgress', 'imageProgressMessage', 'showTitleErrorMessage', 'titleErrorMessage', 'showTagErrorMessage', 'tagErrorMessage', 'contentErrorMessage', 'showContentErrorMessage'])
    },
    methods: {
      ...mapMutations(['changeEditable', 'toggleWriteCountryCity', 'selectComplete', 'setDate', 'resetDate', 'setContentsText', 'addContentsText', 'deleteContent']),
      ...mapActions(['setListsData']),
      clearInput (type) {
        let payload = { 'value': event.target.value, 'type': type }
        this.$store.commit('clearInput', payload)
      },
      setTitleValue (event) {
        this.$store.commit('setTitleValue', event.target.value)
      },
      setTagValue (event) {
        this.$store.commit('setTagValue', event.target.value)
      },
      inputValueCheck (type) {
        if (event.target.value === '') {
          this.$store.commit('inputValueCheck', type)
        }
      },
      imageUpload (type) {
        let payload = {'image': event.target.files[0], 'type': type, 'id': this.$route.params.id}
        this.$store.dispatch('setImageToStorage', payload)
      },
      setSelectedItem () {
        let payload = {'checked': event.target.checked, 'id': event.target.id}
        this.$store.commit('setSelectedItem', payload)
      },
      setDate (sort) {
        let payload = {'date': event.target.value, 'sort': sort}
        this.$store.commit('setDate', payload)
      },
      saveDate () {
        this.$store.commit('saveDate', {'start': window.document.querySelector('#start-date'), 'end': window.document.querySelector('#end-date')})
      },
      saveWriteData () {
        let payload = { 'id': this.$route.params.id, 'start': window.document.querySelector('#start-date'), 'end': window.document.querySelector('#end-date') }
        this.$store.dispatch('saveWriteData', payload)
      }
    }
  }
</script>

<style lang="scss" sconped>
@import '../../../sass/App';
* {
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: inherit;
}
label, button {
  cursor: pointer;
}
button {
  margin: 3px;
  font-size: 15px;
  background-color: #f4430b;
  border: 1px solid #f4430b;
  border-radius: 4px;
  color: #fff;
  font-weight: normal;
}
.write-title-container{
  height: 600px;
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  .title-text-container {
    margin: 55px 0 0 0;
    input, label {
      width: 500px;
      height: 35px;
      padding: 5px;
      border: 1px solid #aaa;
      background: rgba(256, 256, 256, 0.5);
    }
    label {
      padding: 0;
    }
    [class $= "error"] {
      padding: 0 10px;
      color: #fff;
      font-size: 15px;
    } 
    .title{
      position: absolute;
      bottom: 100px;
      font-size: 30px;
    }
    .tag{
      position: absolute;
      bottom: 55px;
      input {
        font-size: 20px;
      }
    }
    .title-image-form{
      position: absolute;
      font-size: 20px;
      label{
        padding: 0 5px;
        display: inline-block;
        width: 250px;
        height: 35px;
        line-height: 35px;
      }
    }
    .title-image-error{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%);
      transform: translateX(-50%);
      font-size: 25px;
    }
  }
}
.title-image-container{
  z-index: -1;
  position: fixed;
  width: 100vw;
  height: 600px;
  overflow: hidden;
  img{
    width: 100%;
    height: auto;
    padding: 0 0 5px 0;
  }
}
.write-contents-container{
  position: relative;
  z-index: 1;
  min-height: 450px;
  height: auto;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  .country-and-city {
    position: absolute;
    z-index: 50;
    width: 450px;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid rgba(10, 9, 8, 0.34);
    border-radius: 2px;
    box-shadow: 0 1px 0px 0 rgba(10, 9, 8, 0.34);
    font-size: 18px;
  }
  .select-container{
    margin: 0 0 0 20px;
    width: 500px;
    overflow: hidden;
  }
  .selected-country{
    margin: 3px 20px;
    height: 30px;
    line-height: 30px;
    font-weight: bold;
    color: rgba(244, 67, 11,0.7);
    white-space : nowrap;
    overflow : hidden;
    text-overflow : ellipsis;
  }
  .country-and-city-select{
    width: 470px;
    height: 200px;
    overflow-Y: scroll;
    .country {
      margin-top: 20px;
      width: 450px;
    }
    .city-filter {
      @include clearfix;
      font-size: 15px;
      li {
        margin: 5px;
      }
      .city {
        float: left;
        input:checked:checked + label::before{
          content: '✔';
          margin: 2px;
          font-size: 12px;
        }
      }
      .city-btn {
        float: right;
        margin-right: 25px;
      }
      button{
        margin-right: 2px;
        font-size: 15px;
        background-color: #f4430b;
        border: 1px solid #f4430b;
        border-radius: 4px;
        color: #fff;
        font-weight: normal;
      }
    }
  }
  .icon-down{
    position: relative;
    top: 3px;
    float: right;
    font-size: 18px;
  }
  .date-setting {
    @include clearfix;
    margin: 20px 0 0 620px;
    width: 600px;
    // height: 36px;
    font-size: 15px;
    // border: 1px solid rgba(10, 9, 8, 0.34);
    // border-radius: 2px;
    // box-shadow: 0 1px 0px 0 rgba(10, 9, 8, 0.34);
    input {
      margin: 2px 2px 0 0;
      height: 30px;
      font-size: 15px;
      border: none;
    }
    label {
      font-weight: bold;
    }
    .start-date {
      float: left;
    }
    .end-date {
      float: left;
    }
    .date-btn {
      float: right;
      margin: 3px 0 0 0;
      button {
        margin: 0 5px;
      }
    }
  }
  .date-error-message {
    @include clearfix;
    margin: 5px 0;
    float: left;
    font-size: 14px;
  }
}
.write-contents-view {
  padding: 30px 0 50px 0;
  margin: 0 auto;
  max-width: 1220px;
  .contents-view-item{
    position: relative;
  }
  textarea {
    margin: 20px 0 0 0;
    padding: 0 35px 0 0;
    width: 100%;
    height: 150px;
    overflow: visible;
    border: 1px solid rgba(10, 9, 8, 0.34);
  }
  img {
    margin: 15px 0 0 0;
    width: 100%;
  }
  .delete {
    position: absolute;
    top: 25px;
    right: 10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .text-error-message{
    font-size: 20px;
  }
}
.input-contents {
  z-index: 10;
  position: fixed;
  right: 30px;
  top: 50%;
  width: 220px;
  transform: translateY(-50%);
  font-size: 20px;
  form {
    margin: 20px 0 0 0;
    width: 100%;
    height: 30px;
    background: rgba(256, 256, 256, 0.5);
    border: 1px solid rgba(10, 9, 8, 0.34);
    text-align: center;
    line-height: 30px;
    color: #000;
  }
}
.image-progress{
  z-index: 5;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  transform: translateY(-50%);
  height: 30px;
  line-height: 30px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 20px;
}
.write-button {
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  button {
    margin: 0 15px 0 0;
    width: 80px;
    height: 30px;
  }
}
.selected-country, [for="contents-text"]{
  cursor: pointer;
}
@include mobile {
  .write-title-container{
    .title-text-container {
      input, label {
        display: block;
        width: 250px;
        height: 30px;
      }
      [class $= "error"] {
        font-size: 12px;
      }
      .title{
        bottom: 105px;
        font-size: 20px;
      }
      .tag{
        bottom: 60px;
        font-size: 10px;
      }
      .title-image-form{
        bottom: 15px;
      }
      .title-image-error{
        font-size: 20px;
      }
    }
  }
  .write-contents-container {
    .country-and-city {
      font-size: 15px;
      width: 97%;
      .select-container {
        width: 97%;
      }
      .country-and-city-select{
        width: 110%;
      }
      .country {
        width: 97%;
      }
      .city {
        font-size: 13px;
        input:checked:checked + label::before{
          content: '✔';
          margin: 2px;
          font-size: 8px;
        }
        .city-btn {
          margin : 0
        }
      }
      .city-btn button {
        margin-right: 20px;
      }
    }
    .date-setting {
      width: 97%;
      margin: 70px 10px 0 10px;
    }
  }
  .input-contents {
    right: 25px;
    width: 150px;
    form {
      width: 100%;
      margin-left: 10px;
      float: left;
      font-size: 15px;
    }
  }
.write-contents-view{
  margin: 10px;
  .text-error-message{
    font-size: 15px;
  }
  textarea{}
}
  .write-button {
    width: 100%;
    text-align: center;
  }
}

@include tablet {
  .write-title-container{
    .title-text-container {
      .title{
        font-size: 30px;
      }
      .tag{
        font-size: 20px;
      }
      .title-image-form{
        bottom: 15px;
        left: 10px;
      }
    }
  }
  .write-contents-container {
    .date-setting {
      margin: 70px 10px 0 10px;
    }
  }
  .input-contents {
    width: 200px;
    form {
      width: 100%;
      margin-left: 10px;
      float: left;
      font-size: 20px;
    }
  }
  .write-contents-view {
    margin: 30px 10px;
  }
}
@include desktop {
  .write-title-container{
    .title-text-container {
      margin: 55px 150px 0 150px;
      .title{
        font-size: 30px;
      }
      .tag{
        font-size: 20px;
      }
      .title-image-form{
        right: 30px;
        bottom: 55px;
      }
    }
  }
  .country-and-city {
    margin: 20px 150px 0 150px;
  }
  .write-contents-container {
    .date-error-message {
    }
  }
}
@include breakpoint(0px, 1199px) {
  .write-title-container{
    height: 60vw;
    .title-text-container {
      padding: 0 10px;
    }
  }
  .title-image-container{
    img{
      width: 100%;
      height: auto;
    }
  }
  .country-and-city {
    margin: 20px 10px 0 10px;
  }
}
</style>
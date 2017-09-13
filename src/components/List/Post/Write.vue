<template lang="pug">
  .write
      .write-title-container
        .title-container
        form.title-text-container
          fieldset.title
            legend.a11y-hidden 제목 입력 폼
            label.a11y-hidden(for="write-title") 제목을 입력하세요.
            input#write-title(:value="writeTitleValue" @click="clearInput('title')" @input="setTitleValue" @blur="inputValueCheck('title')" placeholder="제목을 입력하세요.")
            span.title-error(v-show="showTitleErrorMessage") {{ titleErrorMessage }}
          fieldset.tag
            legend.a11y-hidden 태그 입력 폼
            label.a11y-hidden(for="write-tag") 태그를 입력하세요.
            input#write-tag(:value="writeTagValue" @click="clearInput('tag')" @input="setTagValue" @blur="inputValueCheck('tag')" placeholder="태그를 입력하세요")
            span.tag-error(v-show="showTagErrorMessage") {{ tagErrorMessage }}
          fieldset.title-image-form
            legend.a11y-hidden 대표이미지 등록 폼
            label(for="title-image-input") 대표이미지를 등록하세요
            input#title-image-input.a11y-hidden(type="file" name="title-image" @change="imageUpload('title')" @click="clearFileValue")
          span.title-image-error(v-show="showTitleImageProgress") {{imageProgressMessage}}
        .title-image-container
          img(:src="wirteTitleImgUrl")
          .title-background(v-show="wirteTitleImgUrl")
      .write-contents-container
        .warp
          form
            .form-warp
              .country-and-city
                p.selected-country(tabindex="0" @click.prevent="toggleWriteCountryCity('country')" :class="{'default-filter-msg': selectedWriteCity === '여행지를 선택하세요.'}") {{ selectedWriteCity }}
                  i.icon-down
                .select-container(v-show="showWriteCountry")
                  .background-select-container(@click="toggleWriteCountryCity('country')")
                  ul.country-and-city-select
                    li.country(v-for="(country, index) in getCountryAndCityName" :key="'country' + index")
                      a(href @click.prevent="toggleWriteCountryCity(country.countryKey)") {{country.country}} 
                      div.city-filter(v-if="selectedWriteCountryKey===country.countryKey" v-show="showWriteCity")
                        ul
                          li.city(v-for="(citygroup, index) in country.citygroup" :key="'city' + index")
                            input.a11y-hidden(type="checkbox" :id="citygroup.city" @change.prevent="setSelectedItem")
                            label(:for="citygroup.city") {{ citygroup.city }}
                        button.city-save-btn(type="submit" @click.prevent="selectComplete(getCountryAndCityName)") 저장
              
              fieldset.date-setting
                legend.a11y-hidden 여행 날짜 입력 폼
                .start-date(role="group")
                  label(for="start-date") 여행 시작 날짜 : 
                  input#start-date(type="date" @change="setDate('start')")
                .end-date(role="group")
                  label(for="end-date") 여행 종료 날짜 : 
                  input#end-date(type="date" @change="setDate('end')")
                span.date-error-message(v-show="showDateErrorMessage") {{ dateErrorMessage }}
            fieldset.input-contents
              legend.a11y-hidden 이미지 택스트 입력 폼
              .contents-image
                label(for="contents-image") 이미지를 추가하세요
                input#contents-image.a11y-hidden(type="file" name="contents-image" @change="imageUpload('content')" @click="clearFileValue")
              .contents-text
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
            fieldset
              legend.a11y-hidden 글 저장 및 취소 폼
              button(type="submit" @click.prevent="saveWriteData") 저장
              span.error-message(v-show="showWriteErrorMessage") {{ writeErrorMessage }}
              router-link.save-btn(to="/" tag="button") 취소
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
      ...mapMutations(['changeEditable', 'toggleWriteCountryCity', 'selectComplete', 'setDate', 'setContentsText', 'addContentsText', 'deleteContent', 'clearFileValue']),
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
      saveWriteData () {
        let payload = { 'id': this.$route.params.id, 'start': window.document.querySelector('#start-date'), 'end': window.document.querySelector('#end-date') }
        this.$store.dispatch('saveWriteData', payload)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../sass/App';
  * {
    box-sizing: border-box;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  label,
  button {
    cursor: pointer;
  }
  
  button {
    margin: 3px;
    font-size: 15px;
    background-color: $color1;
    border: 1px solid $color1;
    border-radius: 4px;
    color: #fff;
    font-weight: normal;
  }
  
  .write-title-container {
    position: relative;
    width: 100%;
    height: 500px;
    border-bottom: 1px solid rgba(#181818, 0.2);
    .title-text-container {
      position: relative;
      max-width: 1220px;
      margin: 55px auto 0 auto;
      background: pink;
      input,
      label {
        border: 0 none;
        color: #bababa;
        width: auto;
        background: none;
      }
      [class $="error"] {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100;
        width: 100vw;
        height: 50px;
        line-height: 50px;
        display: block;
        text-align: center;
        color: #fff;
        font-size: 20px;
        background: $color1;
      }
      .title {
        position: absolute;
        left: 0;
        bottom: -420px;
        font-size: 56px;
      }
      .tag {
        position: absolute;
        left: 0;
        bottom: -450px;
        font-size: 20px;
      }
      .title-image-form {
        position: absolute;
        right: 0;
        bottom: -450px;
        label {
          display: inline-block;
          font-size: 20px;
        }
      }
      .title-image-error {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%);
        transform: translateX(-50%);
        font-size: 25px;
      }
    }
  }
  
  .title-image-container {
    z-index: -1;
    position: fixed;
    width: 100vw;
    height: 500px;
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
      padding: 0 0 5px 0;
    }
    .title-background{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 500px;
      background: rgba(#181818, 0.2);
    }
  }
  
  .write-contents-container {
    position: relative;
    z-index: 1;
    overflow: hidden;
    width: 100%;
    height: auto;
    min-height: 450px;
    background: #fff;
    .warp{
      width: 100%;
      max-width: 1220px;
      margin: 0 auto;
    }
    .form-warp{
      position: relative;
      z-index: 10;
      @include clearfix;
      padding-top: 20px;
    }
    .country-and-city {
      float: left;
      width: 450px;
      overflow: hidden;
      background-color: #fff;
      border: 1px solid #b0b0b0;
      border-radius: 2px;
      box-shadow: 0 1px 0px 0 #b0b0b0;
      font-size: 16px;
    }
    .select-container {
      position: absolute;
      z-index: 10;
      left: 0;
      top: 56px;
      width: 450px;
      overflow: hidden;
      border: 1px solid #b0b0b0;
      border-top: 0 none;
      .background-select-container{
        position: fixed;
        z-index: -1;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100%;
      }
    }
    .selected-country {
      width: 450px;
      height: 35px;
      padding: 0 20px;
      line-height: 35px;
      font-weight: bold;
      color: $color1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 16px;
    }
    .country-and-city-select {
      width: 470px;
      height: 200px;
      overflow-Y: scroll;
      background: #fff;
      .country {
        margin-top: 20px;
        padding: 0 20px;
        width: 450px;
        font-size: 16px;
      }
      .city-filter {
        font-size: 16px;
        margin-top: 20px;
        ul{
          @include clearfix;
        }
        .city {
          float: left;
          margin-right: 10px;
          height: 30px;
          line-height: 30px;
          input:checked:checked+label::before {
            content: '✔';
            margin: 2px;
            font-size: 12px;
          }
        }
        .city-save-btn {
          margin: 10px 0 0 0;
          padding: 0 10px;
          height: 30px;
          line-height: 30px;
          display: block;
          border-radius: 4px;
          background-color: $color1;
          border: 1px solid $color1;
          color: #fff;
          font-size: 15px;
          font-weight: normal;
        }
      }
    }
    .icon-down {
      position: relative;
      top: 3px;
      float: right;
      font-size: 18px;
    }
    .date-setting {
      position: relative;
      float: right;
      font-size: 15px;
      height: 35px;
      input {
        height: 35px;
        line-height: 35px;
        font-size: 16px;
        border: none;
        background: none;
        color: rgba( #181818, 0.4);
      }
      label {
        font-weight: bold;
        height: 35px;
        line-height: 35px;
        color: rgba( #181818, 0.4);
      }
      .start-date {
        float: left;
        height: 35px;
        line-height: 35px;
        border: 1px solid #b0b0b0;
        padding: 0 20px;
        box-shadow: 0 1px 0px 0 #b0b0b0;
      }
      .end-date {
        float: left;
        margin-left: 10px;
        height: 35px;
        line-height: 35px;
        border: 1px solid #b0b0b0;
        padding: 0 20px;
        box-shadow: 0 1px 0px 0 #b0b0b0;
      }
      .date-btn {
        float: right;
        margin: 3px 0 0 0;
        button {
          margin: 0 5px;
          padding: 0 10px;
          height: 35px;
          line-height: 35px;
        }
      }
    }
    .date-error-message {
      position: absolute;
      left: 0;
      bottom: -20px;
      font-size: 14px;
      color: $color1;
    }
  }
  
  .write-contents-view {
    padding: 30px 0 50px 0;
    min-height: 400px;
    .contents-view-item {
      position: relative;
      z-index: 1;
    }
    textarea {
      margin: 20px 0 0 0;
      padding: 0 35px 0 0;
      width: 100%;
      height: 150px;
      overflow: visible;
      border: 1px solid #b0b0b0;
      font-size: 18px;
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
      text-align: center;
      border-radius: none;
      background: none;
      color: $color1;
      border: 0 none;
      font-size: 30px;
      transform: scale(1.5, 1);
    }
    .text-error-message {
      font-size: 20px;
    }
  }
  
  .input-contents {
    position: fixed;
    z-index: 10;
    right: 30px;
    bottom: 20%;
    font-size: 20px;
    label{
      color: #b0b0b0;
    }
    .contents-image{
      height: 30px;
      text-align: center;
      line-height: 30px;
    }
  }
  
  .image-progress {
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
    text-align: center;
    margin: 40px 0;
    button {
      height: 40px;
      line-height: 40px;
      padding: 0 40px;
    }
    .save-btn{
      margin-left: 20px;
      background: #b0b0b0;
      border: 1px solid #b0b0b0;
    }
  }
  
  .selected-country,
  [for="contents-text"] {
    cursor: pointer;
  }
  
  // @include mobile {
  // }
  
  // @include tablet {
  // }
  
  // @include desktop {
  // }
  
  // @include breakpoint(0px, 1199px) {
  // }
</style>
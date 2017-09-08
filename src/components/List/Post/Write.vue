<template lang="pug">
  .write
    .write-title-container
      label.a11y-hidden(for="write-title") 제목을 입력하세요.
      input#write-title(:value="writeTitleValue" @click="clearInput('title')" @input="setTitleValue" @blur="inputValueCheck('title')")
      label.a11y-hidden(for="write-tag") 태그를 입력하세요.
      input#write-tag(:value="writeTagValue" @click="clearInput('tag')" @input="setTagValue" @blur="inputValueCheck('tag')") 
      form.title-image
        label(for="title-image-input") 대표이미지를 등록하세요
        input#title-image-input.a11y-hidden(type="file" name="title-image" @change="imageUpload('title')")
      img.title-image-view(:src="wirteTitleImgUrl")
    .write-contents-container
      .country-and-city
        .selected-country(tabindex="0" @click.prevent="toggleWriteCountryCity('country')" :class="{'default-filter-msg': selectedWriteCity === '여행지를 선택하세요.'}") {{ selectedWriteCity }}
          i.icon-down
        .select-container(v-show="showWriteCountry")  
          ul.country-and-city-select
            li(v-for="(country, index) in getCountryAndCityName" :key="'country' + index")
              a(href @click.prevent="toggleWriteCountryCity(country.countryKey)") {{country.country}} 
              ul.city-filter(v-if="selectedWriteCountryKey===country.countryKey" v-show="showWriteCity")
                li(v-for="(citygroup, index) in country.citygroup" :key="'city' + index")
                  input(type="checkbox" :id="citygroup.city" @change="setSelectedItem")
                  label(for="citygroup.city") {{ citygroup.city }}
                li
                  form
                    button.city-save-btn(type="submit" @click.prevent="selectComplete(getCountryAndCityName)") 저장
                    button.city-cancel-btn(type="submit" @click.prevent="toggleWriteCountryCity('cancel')") 취소
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
        .write-contents-view(v-for="(content, index) in writeContentsData")
          textarea(v-if="content.key === 'text'" @input="addContentsText(index)" @blur="inputValueCheck(index)")
          span(v-if="content.key === 'text' && content.value.length === 0") 텍스트를 입력해주세요.
          img(v-if="content.key === 'img'" :src="content.value")
          button(type="button" @click="deleteContent(index)") 삭제
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
    ...mapGetters(['getCountryAndCityName', 'writeTitleValue', 'writeContentsData', 'writeTagValue', 'wirteTitleImgUrl', 'selectedWriteCity', 'selectedWriteCountryKey', 'showWriteCountry', 'showWriteCity', 'writeErrorMessage', 'showWriteErrorMessage', 'writeErrorMessage', 'dateErrorMessage', 'showDateErrorMessage'])
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

<style lang="scss">
  .write-title-container{
    margin-top: 55px;
  }
  .title-image{
    label {
      cursor: pointer;
    }
  }
  .selected-country, [for="contents-text"]{
    cursor: pointer;
  }
</style>
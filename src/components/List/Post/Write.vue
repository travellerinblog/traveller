<template lang="pug">
  .write
    .write-title-container(:style=" 'background-image:url(' + wirteTitleImgUrl + ')' ")
      h1.write-title(:contenteditable="writeTitleEditable" @click="changeEditable('title')" @focus="changeEditable('title')" :value="writeTitleValue" @input="setTitleValue" @keydown="enterDetect('title')" tabindex="0") 제목을 입력하세요
      p.write-tag(:contenteditable="writeTagEditable" @click="changeEditable('tag')"  @focus="changeEditable('tag')" :value="writeTagValue" @input="setTagValue" @keydown="enterDetect('tag')" tabindex="0") 태그를 입력하세요
      form.title-image
        label(for="title-image") 대표이미지를 등록하세요
        input#title-image.a11y-hidden(type="file" name="title-image" @change="titleImageUpload")
    .write-contents-container
      form.contents-image
        label(for="contents-image") 이미지를 추가하세요
        input#contents-image.a11y-hidden(type="file" name="contents-image")
      form.contents-text
        label(for="contents-text") 텍스트를 추가하세요
        input#contents-text(type="text" name="contents-text" v-show="false")
      .write-contents-view
    form.write-button
      router-link.save-btn(to="/view/list1" tag="button") 저장
      router-link.save-btn(to="/list/default" tag="button" @click="setListsData('default')") 취소
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
export default {
  computed: {
    ...mapGetters(['writeTitleEditable', 'writeTitleValue', 'writeTagEditable', 'writeTagValue', 'wirteTitleImgUrl'])
  },
  methods: {
    ...mapMutations(['changeEditable']),
    ...mapActions(['setListsData']),
    setTitleValue (event) {
      this.$store.dispatch('setTitleValue', event)
    },
    setTagValue (event) {
      this.$store.dispatch('setTagValue', event)
    },
    enterDetect (sort) {
      var payload = {'event': event, 'sort': sort}
      this.$store.dispatch('enterDetect', payload)
    },
    titleImageUpload () {
      this.$store.dispatch('setTitleImageToStorage', event.target.files[0])
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
</style>
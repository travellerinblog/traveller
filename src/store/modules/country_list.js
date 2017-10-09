export default {
  state: {
    country_list_items: [
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/CountryList%2Fchina5.jpg?alt=media&token=7e71ce10-359c-409c-a8c2-f93e175b9c58', alt: '중국', content: '중국', country: 'china'},
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/CountryList%2Fcanada18-min.jpg?alt=media&token=06a0cf97-9b59-42d9-82f2-23e743f8b349', alt: '일본', content: '일본', country: 'japan'},
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/CountryList%2Fchina17.jpg?alt=media&token=cccecb62-bfa6-4b9a-baff-4ff6c902c551', alt: '대만', content: '대만', country: 'Taiwan'},
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/CountryList%2Fkorea7.jpg?alt=media&token=230d3913-358f-42c4-8338-5e5d0cbc1f1e', alt: '대한민국', content: '대한민국', country: 'Korea'},
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/CountryList%2Fthailand7.jpg?alt=media&token=f93801ba-061b-4479-863d-489a217ba381', alt: '미국', content: '미국', country: 'US'},
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/CountryList%2Fcanada7-min.jpg?alt=media&token=ec69930b-6988-474e-874b-1eb675e09a18', alt: '영국', content: '영국', country: 'uk'},
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/CountryList%2Fcanada19-min.jpg?alt=media&token=90c8bdae-3b39-4bb7-9fc2-6c615e6eac78', alt: '캐나다', content: '캐나다', country: 'Canada'},
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/CountryList%2Fthailand26.jpg?alt=media&token=0ac4eb57-dd58-4669-9f52-c6a40b621071', alt: '필리핀', content: '필리핀', country: 'Philippines'},
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/CountryList%2Fchina16.jpg?alt=media&token=5efc6f3a-bed9-4b43-8d98-27a130a0d8b5', alt: '그리스', content: '그리스', country: 'greece'},
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/CountryList%2Fthailand25.jpg?alt=media&token=1b17c6ee-3363-4824-a67d-0424b0a2efc2', alt: '이탈리아', content: '이탈리아', country: 'Italy'}
    ]
  },
  getters: {
    getCountryListItems (state) {
      return state.country_list_items
    }
  },
  mutations: {
    swipeCountryList (state, payload) {
      // 전달 받은 값에 따라서 이미지 슬라이드가 왼쪽으로 움직일지 오른쪽으로 움직일지 정한다.
      // next라면 배열 리스트의 첫번째 요소가 가장 뒤로가고
      // prev라면 배열 리스트의 마지막 요소가 가장 앞으로 온다.
      switch (payload) {
        case 'next':
          var firstItem = state.country_list_items.shift()
          state.country_list_items.push(firstItem)
          break
        case 'prev':
          var lastItem = state.country_list_items.pop()
          state.country_list_items.unshift(lastItem)
          break
      }
    }
  },
  actions: {}
}

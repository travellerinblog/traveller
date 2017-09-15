export default {
  state: {
    country_list_items: [
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/CountryList%2Fchina10.jpg?alt=media&token=eea89ae3-4309-4fea-866d-b80f99e9cd38', alt: '중국', content: '중국', country: 'china'},
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/CountryList%2Fcanada17.jpg?alt=media&token=4674f842-ce68-4c45-b9c3-1f0ad90c3fc9', alt: '캐나다', content: '캐나다', country: 'Canada'},
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/CountryList%2Fjapan15.jpg?alt=media&token=1d159ed9-95c5-421c-b9ad-771c8f32abd7', alt: '일본', content: '일본', country: 'japan'},
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/CountryList%2Fkorea5.jpg?alt=media&token=f60c9232-c796-45b6-a566-9dcc5e5816e9', alt: '대한민국', content: '대한민국', country: 'Korea'},
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/CountryList%2Fuk.jpg?alt=media&token=73a53c15-15fc-4262-ad9f-de231f8f0659', alt: '영국', content: '영국', country: 'uk'},
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/CountryList%2Ftaiwan.jpg?alt=media&token=b7e289b6-b1b5-418c-a3fa-7074d1c1b019', alt: '대만', content: '대만', country: 'Taiwan'},
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/CountryList%2FUS.jpg?alt=media&token=eda10492-1beb-4a22-a17e-7b7c380c7df6', alt: '미국', content: '미국', country: 'US'},
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/CountryList%2FPhilippines.jpg?alt=media&token=1f07e1e9-25bb-40a0-a1be-60dc0961b6bb', alt: '필리핀', content: '필리핀', country: 'Philippines'},
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/CountryList%2Fgreece.jpg?alt=media&token=0a597b14-9a23-472c-9ee3-99920aa95da6', alt: '그리스', content: '그리스', country: 'greece'},
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/CountryList%2FItaly.jpg?alt=media&token=41786354-e223-4d5c-b7bd-c7ede4424379', alt: '이탈리아', content: '이탈리아', country: 'Italy'}
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

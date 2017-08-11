// 1. 모바일의 기능들
// 1-1) 자동으로 이미지 변경
//  -. image active class 변경
//  -. tab active class 변경
//  -. aria-hidden 변경
//  -. aria-selected 변경
// 1-2) 탭을 눌렀을 때 이미지 변경
//  -. 1-1 동일 
//  -. 탭 눌렀을때 자동 변경 기능 정지
// 1-3) 드래그 동작으로 이미지 변경
//  -. 1-1 동일
//  -. 드래그 했을 때 자동 변경 기능 정지
// 2. 태블릿의 기능들 
// 2-1) 자동으로 이미지 변경
// 2-2) 탭을 눌렀을 때 이미지 변경
// 2-3) 드래그 동작으로 이미지 변경
//    => 모바일과 동일
// 2-4) prev/next 버튼을 눌러 사진 이미지 변경
// 3. 데스크탑 기능들
// 3-1) 비디오 재생
// 4. 윈도우 사이즈에 맞춰서 이미지 크기 변경 


//테스트 케이스
// 윈도우 사이즈가 1300일 때 isDesktopScreen이 true
// =>video div가 보인다.
// 윈도우 사이즈가 750일 때 getScreenSize는 'moblie', 
// => image-carousel에 mobile class가 있다 
// 윈도우 사이즈가 790일 때 getScreenSize는 'tablet', 
// => image-carousel에 tablet class가 있다 


describe("Visual.vue는", function(){
  var component = require('./../../src/components/Home/Visual.vue');
  it('', function(){
    expect().toBe();
  });
});



// example test 
// describe("App vue", function(){
//   var c = require('./../../src/App.vue');
//   it('데이터를 가져야 한다', function(){
//     expect(typeof c.data).toBe('function');
//   });
// });
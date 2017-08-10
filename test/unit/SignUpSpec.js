// 로그인 기능의 test
// 테스트 케이스를 작성해 봅시다. 
describe("signup.js", function(){
  var c = require('./../../src/components/SignUp/SignUp.vue');
  it('signUpByGoogle은 함수이다', function(){
    const google = c.methods.signUpByGoogle
    expect(typeof google).toBe('function');
  });
});
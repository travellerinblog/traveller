// test test 
describe("App vue", function(){
  var c = require('./../../src/App.vue');
  it('데이터를 가져야 한다', function(){
    expect(typeof c.data).toBe('function');
  });
});
define(function(require, exports, module) {
  require.async('slider');
  module.exports = {
    init:function(){
      $('.close-notice').on('click',function(){
        $(this).parent().slideUp();
      })

      $('.trade-header ul li').on('click',function(){
        $(this).addClass('active').siblings().removeClass('active');
      })
    }
  }
})

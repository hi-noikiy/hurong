define(function(require, exports, module) {
  require.async('slider');
  module.exports = {
    language: function() {
      $('.curbox').on('click', function() {
        var that = $(this);
        that.next('.lang-list').slideToggle();

      })

      $('.lang-list li').on('click', function() {
        var target = $('.lang-cur').html();
        $(this).parent().hide(), $('.lang-cur').html($(this).html()), $(this).html(target);
      })


    }
  }
})

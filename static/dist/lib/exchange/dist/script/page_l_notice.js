!function(){function e(e,o){function s(e,n,o){var s=o||200;setTimeout(function(){e.removeClass(n)},s)}var t=this,i=e||{},c=i.message?i.message:"",r=i.type||"succeed",a=i.long,l=$('<div id="notice" class="notice"><a href="" class="close">×</a><div class="message">'+c+"</div></div>"),u=$("body"),d=l.find(".message"),f=l.find(".close");return t.Init=function(e){var n;return u.find("#notice").length>0?(l=u.find("#notice"),d=l.find(".message"),f=l.find(".close"),"close"!=e&&l.addClass("reappear"),n=!1):(u.append(l),n=!0),"error"==r?l.addClass("error").removeClass("succeed"):l.removeClass("error").addClass("succeed"),setTimeout(function(){l.removeClass("reappear")},1e3),n},t.Open=function(){var e=t.Init();t.CloseNow=0,e&&(l.removeClass("notice_close").addClass("notice_open"),s(l,"notice_open"))},t.Close=function(){t.Init("close"),t.CloseNow=1,l.addClass("notice_close").removeClass("notice_open"),n[1]=setTimeout(function(){l.remove()},300)},t.Write=function(e){d.html(e||c)},function(){t.Open(),t.Write(),clearTimeout(n[0]),clearTimeout(n[1]),n[0]=a&&setTimeout(function(){t.Close()},a),f.click(function(){return t.Close(),!1}),l.hover(function(){clearTimeout(n[0])},function(){u.find("#notice").length<=0||(n[0]=a&&setTimeout(function(){t.Close()},a))})}(),t}var n=[];"function"==typeof define?define("static/js/exchange/dist/script/page_l_notice",[],function(){return e}):"undefined"!=typeof exports?module.exports=e:window.Notice=e}();
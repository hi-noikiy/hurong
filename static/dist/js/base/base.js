var loadUrl=function(e){$("#content").empty(),$.ajax({type:"get",url:e,cache:!1,dataType:"html",success:function(e){$("#content").html(e)},error:function(n){$("#content").html("<div class='row'><h1>此路径不存在："+e.substring(e.indexOf("u=")+2)+"</h1></div>")}})},loadUrl2Div=function(e,n){$("#"+n).empty(),$.ajax({type:"get",url:e,cache:!1,dataType:"html",success:function(e){$("#"+n).html(e)},error:function(r){$("#"+n).html("<div class='row'><h1>此路径不存在："+e.substring(e.indexOf("u=")+2)+"</h1></div>")}})};$(document).ajaxSuccess(function(e,n,r){if("true"==n.getResponseHeader("nologin")){var t=JSON.parse(n.responseText.replace(/\\/g,"\\\\"));layer.msg("登录超时",{time:2e3,ico:2},function(){window.location.href=t.loginUrl})}});var permissions=function(){var e=HRY_permissions.split(","),n=$("[permissions]");if(n.length>0)for(var r=0;r<n.length;r++){var t=$(n[r]),i=t.attr("permissions");-1==e.indexOf(i)&&t.remove()}};define(function(require,exports,module){module.exports={loadUrl:loadUrl}});var guid=function(){function e(){return(65536*(1+Math.random())|0).toString(16).substring(1)}return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()},pageTimer={},clearPageTimer=function(){try{for(var e in pageTimer)window.clearInterval(pageTimer[e])}catch(e){}};
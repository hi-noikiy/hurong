define(function(require,exports,module){this.md5=require("js/base/utils/hrymd5"),this.validate=require("js/base/validate"),module.exports={init:function(){$("#regBtn").on("click",function(){var e=$("#username").val(),s=$("#password").val(),i=$("#registCode").val(),a=$("#registSmsCode").val(),o=$("#check_deal").get(0).checked;return e?validate.check_mobile(e)?s?validate.check_password(s)?i?a?o?void $.ajax({type:"post",url:_ctx+"/registService",data:{username:e,password:md5.md5(s),registCode:i,registSmsCode:a,referralCode:$("#referralCode").val()},cache:!1,dataType:"json",success:function(e){e?e.success?layer.msg("注册成功",{icon:1,time:1500},function(){window.location.href=_ctx+"/login"}):layer.msg(e.msg,{icon:2}):layer.msg("注册失败",{icon:2})},error:function(e){}}):void layer.msg("请同意注册协议",{icon:2}):void layer.msg("短信验证码不能为空",{icon:2}):void layer.msg("图形验证码不能为空",{icon:2}):void layer.msg("密码格式不正确",{icon:2}):void layer.msg("密码不能为空",{icon:2}):void layer.msg("手机号格式不正确",{icon:2}):void layer.msg("手机号不能为空",{icon:2})})},refreshCode:function(){$("#img_captcha").on("click",function(){$(this).attr("src",_ctx+"/sms/registcode.jpg?t="+(new Date).getTime())})},sendsms:function(){$("#sendsmsBtn").on("click",function(){var e=$("#username").val(),s=$("#password").val(),i=$("#registCode").val();return e?validate.check_mobile(e)?s?validate.check_password(s)?i?($(this).attr("disabled","disabled"),void $.ajax({type:"post",url:_ctx+"/sms/registSmsCode",data:{username:e,registCode:i},cache:!1,dataType:"json",success:function(e){if(e)if(e.success){layer.msg("发送成功",{icon:1});var s=120;window.clearInterval(i);var i=window.setInterval(function(){s-=1,0==s?($("#sendsmsBtn").html("发送验证码"),$("#sendsmsBtn").removeAttr("disabled"),window.clearInterval(i)):$("#sendsmsBtn").html(s+"秒后重新发送")},1e3)}else $("#sendsmsBtn").removeAttr("disabled"),layer.msg(e.msg,{icon:2});else $("#sendsmsBtn").removeAttr("disabled"),layer.msg("发送失败",{icon:2})},error:function(e){}})):void layer.msg("图形验证码不能为空",{icon:2}):void layer.msg("密码格式不正确",{icon:2}):void layer.msg("密码不能为空",{icon:2}):void layer.msg("手机号格式不正确",{icon:2}):void layer.msg("手机号不能为空",{icon:2})})}}});
define(function(require, exports, module){
	require("style/css/mobile/css/css.css");
	require("style/js/layer/css/layer.css");
	require("style/js/mobile/js/zepto.js");
	require("style/js/mobile/js/public.js");
	this.validate = require("style/js/validate");
	this.md5 = require("style/js/hrymd5");
	require("style/js/googleauth/utf");
	require("style/js/googleauth/qrcode");
	require("style/js/googleauth/jquery.qrcode");
	function  google(tokenId){
		var mobile=$(".mobile").val();
		debugger;
		$.ajax({
			type : "post",
			url : _ctx + "/mobile/user/apppersondetail/sendgoogle",
			cache : false,
			dataType : "json",
			data:{tokenId:tokenId},
		success : function(data) {
			if(data.success){
				
				$(".text-con").val(data.obj.googleKey);
				//data.obj.company为app.properties里配置公司英文名称
				jQuery('#qrcodeTable').qrcode({
			         render    : "canvas",                
			         text :"otpauth://totp/"+data.obj.company+":"+data.obj.userName+"?secret="+data.obj.googleKey,  
			         width : "180",               //二维码的宽度
	                 height : "180",
			     });
				$(".mobile").val(data.obj.userName);
			}else{
				layer.msg(data.msg);

			}
		},
		eerror:function(e){
			alert(e)
		}
		});
		
		
	}
	

	
	module.exports = {
		init : function(){
			debugger;
			//判断是否已经登录
			if(tokenId!=""){
				$("#isToken").html("<a href='"+basepath+"/html/coins.htm?tokenId="+tokenId+"'>交易中心</a><a href='"+basepath+"/html/user/user-index.html?tokenId="+tokenId+"'>我的资产</a>");
				$("#logo").attr("href",ctx_+"/static/wap/html/coins.htm?tokenId="+tokenId);

			}else{
				$("#isToken").html("<a href='"+basepath+"/html/coins.htm'>交易中心</a><a href='"+basepath+"/html/user/login.htm' >登录</a><a href='"+basepath+"/html/user/reg.htm'>注册</a>");
			}
			if(tokenId!=""){
				//跳转到首页
				$("#bbjy").on("click",function(){
					window.open(basepath + "/html/coins.htm?tokenId="+tokenId,"_self");
				})
				//我的账户
				$("#wdzh").on("click",function(){
					window.open(basepath + "/html/user/user-index.html?tokenId="+tokenId,"_self");
				})
				//设置
				$("#sz").on("click",function(){
					window.open(basepath + "/html/user/account.html?tokenId="+tokenId,"_self");
				})
				google(tokenId);
				
				$("#submitBtn").on("click",function(){debugger;
				
				debugger;
				var googlekey = $(".text-con").val();
				var accountGoogleWord = $("#accountGoogleWord").val();
				var accountpwSmsCode =$("#accountpwSmsCode").val();
				if(!accountGoogleWord){
					layer.msg("谷歌认证码不能为空", {icon: 2});
					return ;
				
				}
				
				//$("#submitBtn").attr("disabled","disabled");
				$.ajax({
					type : "post",
					url : _ctx + "/mobile/user/apppersondetail/yzgoogle",
					data : {
						codes : accountGoogleWord,
						savedSecret:googlekey,
					},
					cache : false,
					dataType : "json",
					success : function(data) {
						if(data.success){
							
							layer.msg(data.msg, {icon: 1,time:1000},function(){
								//跳转到个人中心
								window.open(basepath + "/html/user/account.html?tokenId="+tokenId,"_self");
							})

						}else{
							layer.msg(data.msg);

						}
					},
					
				});
				
			});
			
			}

			
		}
	}
})
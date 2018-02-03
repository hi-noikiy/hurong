define(function(require, exports, module) {
	
	this.md5 = require("js/base/utils/hrymd5")
	this.validate = require("js/base/validate");
	
	module.exports = {
		
		//初始化方法
		init : function(){
			try{
				window.clearInterval(regTimer);
			}catch(e){
			}
			
			var referralCode = $("#referralCode").val();
			if(referralCode!=null&&referralCode!=""){
				$('#referralCode').attr("disabled","disabled");
			}
			
			//注册提交
			$("#regBtn").on("click",function(){
				debugger;
				var email = $("#email").val();
				var password = $("#password").val();
				var registCode = $("#registCode").val();
				var check_deal = $("#check_deal").get(0).checked
				if(!email){
					layer.msg(youxiangbunengweikong, {icon: 2});
					return ;
				}
				if(!validate.check_email(email)){
					layer.msg(youxianggeshibuzhengque, {icon: 2});
					return ;
				}
				
				if(!password){
					layer.msg(mimabunengweikong, {icon: 2});
					return ;
				}
				if(!validate.check_password(password)){
					layer.msg(mimageshibuzhengque, {icon: 2});
					return ;
				}
				
				if(!registCode){
					layer.msg(tuxingyanzhengmaweikong, {icon: 2});
					return ;
				}
				if(!check_deal){
					layer.msg(qingtongyixieyi, {icon: 2});
					return ;
				}
				
				$("#regBtn").attr("disabled","disabled");

				$.ajax({
					type : "post",
					url : _ctx + "/registService",
					data : {
						email : email,
						password : md5.md5(password),
						registCode : registCode,
						referralCode : $("#referralCode").val()
					},
					cache : false,
					dataType : "json",
					success : function(data) {
						if(data){
							if(data.success){
								layer.msg(zhucechenggongqingjihuo, {icon: 1,time:1500},function(){
									window.location.href = _ctx+"/login";
								})
								
							}else{
								$("#regBtn").removeAttr("disabled");// 按钮可用
								layer.msg(data.msg, {icon: 2})
								//刷新验证码
								$("#img_captcha").attr("src", _ctx + "/sms/registcode.jpg?t=" + new Date().getTime());
							}
						}else{
							layer.msg(zheceshibai, {icon: 2})
						}
					},
					error : function(e) {
						
					}
				});
				
			});
			
		},
		//刷新验证码
		refreshCode : function(){
			
			$("#img_captcha").on("click",function(){
				$(this).attr("src", _ctx + "/sms/registcode.jpg?t=" + new Date().getTime());
			})
		},
		//发送短信
		sendsms :function(){
			$("#sendsmsBtn").on("click",function(){
				var username = $("#username").val();
				var password = $("#password").val();
				var registCode = $("#registCode").val();
				if(!username){
					layer.msg(shoujibuweikong, {icon: 2});
					return ;
				}
				if(!validate.check_mobile(username)){
					layer.msg(shoujigeshibuzhengque, {icon: 2});
					return ;
				}
				
				if(!password){
					layer.msg(mimabunengweikong, {icon: 2});
					return ;
				}
				if(!validate.check_password(password)){
					layer.msg(mimageshibuzhengque, {icon: 2});
					return ;
				}
				if(!registCode){
					layer.msg(tuxingyanzhengmaweikong, {icon: 2});
					return ;
				}

				$(this).attr("disabled","disabled");
				$.ajax({
					type : "post",
					url : _ctx + "/sms/registSmsCode",
					data : {
						username : username,
						registCode : registCode
					},
					cache : false,
					dataType : "json",
					success : function(data) {
						if(data){
							if(data.success){
								layer.msg(fasongchenggong, {icon: 1})
								
								var time = 120;
								window.clearInterval(regTimer);
								// 开启点击后定时数字显示
								var regTimer = window.setInterval(function() {
									time = time - 1;
									if (time == 0) {
										$("#sendsmsBtn").html(fasongyanzhengma);
										$("#sendsmsBtn").removeAttr("disabled");// 按钮可用
										window.clearInterval(regTimer);
									} else {
										$("#sendsmsBtn").html(time+miaochongxinfasong);
									}

								}, 1000);
								
							}else{
								$("#sendsmsBtn").removeAttr("disabled");// 按钮可用
								layer.msg(data.msg, {icon: 2})
							}
						}else{
							$("#sendsmsBtn").removeAttr("disabled");// 按钮可用
							layer.msg(fasongshibai, {icon: 2})
						}
					},
					error : function(e) {
						
					}
				});
				
			});
		}
		

	}
});
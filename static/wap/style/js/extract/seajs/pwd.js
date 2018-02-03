define(function(require, exports, module){
	require("style/css/mobile/css/css.css");
	require("style/js/layer/css/layer.css");
	require("style/js/mobile/js/public.js");
	this.md5 = require("style/js/hrymd5");
	this.validate = require("style/js/validate");
	function addpwd(wv_valicode){
		debugger;
		var oldPassWord = $("#oldpwd").val();
		var newPassWord = $("#pwd").val();
		var reNewPassWord = $("#repwd").val();
		
		if(!oldPassWord){
			layer.msg('原始登录密码不能为空', {icon: 2});
			return ;
		}
		if(!newPassWord){
			layer.msg('新登录密码不能为空', {icon: 2});
			return ;
		}
		if(newPassWord==oldPassWord){
			layer.msg('新登录密码不能和原始登录密码一致', {icon: 2});
			return ;		
		}
		if(!validate.check_password(newPassWord)){
			layer.msg('新密码格式不正确', {icon: 2});
			return ;
		}
		if(!reNewPassWord){
			layer.msg('第二次密码不能为空', {icon: 2});
			return ;
		}
		if(newPassWord!=reNewPassWord){
			layer.msg('两次密码不一致', {icon: 2});
			return ;
		
		}
		
		$("#submitBtn").attr("disabled","disabled");
		$.ajax({
			type : "post",
			url : ctx_ + "/mobile/user/apppersondetail/appdlpwd.do",
			data : {
				oldPassWord : md5.md5(oldPassWord),
				newPassWord : md5.md5(newPassWord),
				reNewPassWord : md5.md5(reNewPassWord),
				valicode:wv_valicode,
				tokenId : tokenId
			},
			cache : false,
			dataType : "json",
			success : function(data) {
				debugger;
				if(data){
					debugger;
					if(data.success){
						
						
						layer.msg(data.msg, {icon: 1,time:1500},function(){
							window.open(basepath + "/html/user/user-index.html?tokenId="+tokenId,"_self");
						});
					}else{
						if(data.msg=="请先登录"){
							window.open(basepath + "/html/user/login.htm","_self");
							return false;
						}
						if(data.obj==null){
							layer.msg(data.msg, {icon: 2});
						}else{
							if(data.obj.googleState==1&&data.obj.phoneState==1){
								$(".verifyLayout2").show();
								$(".phone_num").val(data.obj.phone)
							}else if(data.obj.googleState==1){
								$(".verifyLayout1").show();
							}else if(data.obj.phoneState==1){
								$(".phone_num").val(data.obj.phone)
								$(".verifyLayout").show();
							}
						}
						
						
						
						$("#submitBtn").removeAttr("disabled");
					}
				}else{
					layer.msg("修改失败", {icon: 2})
					$("#submitBtn").removeAttr("disabled");
				}
			},
			error : function(e) {
				
			}
		});
		
	
		
	}
	
	
	module.exports = {
			
	sendsms :function(){
				
		//发送短信
		$("#getPhoneCode1").on("click",function(){
			debugger;
			$("#getPhoneCode1").attr("disabled","disabled");
			$(this).html("已发送");
			$.ajax({
				type : "post",
				url : _ctx + "/mobile/user/apppersondetail/getPhone",
				data : {
					tokenId : tokenId,
				},
				cache : false,
				dataType : "json",
				success : function(data) {
					if(data){
						debugger;
						if(data.success){
							layer.msg("发送成功", {icon: 1})

							var time = 120;
						window.clearInterval(pageTimer["setaphone"]);
						// 开启点击后定时数字显示
						pageTimer["setaphone"] = window.setInterval(function() {
							
							time = time - 1;
							if (time == 0) {
								
								$("#getPhoneCode1").html("点击");
								$("#getPhoneCode1").removeAttr("disabled");// 按钮可用
								$("#getPhoneCode1").html("重新发送");// 按钮可用
								window.clearInterval(pageTimer["setaphone"]);
							} else {
								$("#getPhoneCode1").html(time+"秒重新发送" );
							}

						}, 1000);

						}else{
							$("#getPhoneCode1").removeAttr("disabled");// 按钮可用
							layer.msg(data.msg, {icon: 2})
							if(data.msg=="请登录或重新登录"){
								window.open(basepath + "/html/user/login.htm","_self");
							}
						}
					}else{
						$("#getPhoneCode1").removeAttr("disabled");// 按钮可用
						layer.msg(fasongshibai, {icon: 2})
					}
				},
				error : function(e) {

				}
			});

		});
		//发送短信
		$("#getPhoneCode2").on("click",function(){
			debugger;
			$("#getPhoneCode2").attr("disabled","disabled");
			$(this).html("已发送");
			$.ajax({
				type : "post",
				url : _ctx + "/mobile/user/apppersondetail/getPhone",
				data : {
					tokenId : tokenId,
				},
				cache : false,
				dataType : "json",
				success : function(data) {
					if(data){
						debugger;
						if(data.success){
							layer.msg("发送成功", {icon: 1})

							var time = 120;
						window.clearInterval(pageTimer["setaphone"]);
						// 开启点击后定时数字显示
						pageTimer["setaphone"] = window.setInterval(function() {
							
							time = time - 1;
							if (time == 0) {
								
								$("#getPhoneCode2").html("点击");
								$("#getPhoneCode2").removeAttr("disabled");// 按钮可用
								$("#getPhoneCode2").html("重新发送");// 按钮可用
								window.clearInterval(pageTimer["setaphone"]);
							} else {
								$("#getPhoneCode2").html(time+"秒重新发送" );
							}

						}, 1000);

						}else{
							$("#getPhoneCode2").removeAttr("disabled");// 按钮可用
							layer.msg(data.msg, {icon: 2})
							if(data.msg=="请登录或重新登录"){
								window.open(basepath + "/html/user/login.htm","_self");
							}
						}
					}else{
						$("#getPhoneCode2").removeAttr("disabled");// 按钮可用
						layer.msg(fasongshibai, {icon: 2})
					}
				},
				error : function(e) {

				}
			});

		});
				
			},

		init : function(){
			//清除定时器
			clearPageTimer()
			
			$("#submitBtn").on("click",function(){
				debugger;
				addpwd();
			});
			
			//手机确认
			$(".submit-phone").on("click",function(){
				debugger;
				var valicode1=$("#phone_verifyCode1").val();
				var valicode2=$("#phone_verifyCode2").val();
				var valicode=valicode1;
				if(valicode1==""){
					valicode=valicode2;
				}
				if(!valicode){
					layer.msg('短信验证码不能为空', {icon: 2});
					return ;
				}
				addpwd(valicode)
			});
			
			//谷歌确认
			$(".submit-google").on("click",function(){
				debugger;
				var valicode1=$("#googlee_verifyCode1").val();
				var valicode2=$("#googlee_verifyCode2").val();
				var valicode=valicode1;
				if(valicode1==""){
					valicode=valicode2;
				}
				if(!valicode){
					layer.msg('谷歌验证码不能为空', {icon: 2});
					return ;
				}
				addpwd(valicode)
				
			})
			
			
			
			$('.dialog-close').on('click',function(){
				$('.dialog-close').parent().parent().hide()
			})
			//双重验证的切换
			$('.btns').find('span').on('click',function(){
								      var ind=$(this).index();
								      $(this).addClass('cur').siblings().removeClass('cur');
								      if(ind==0){
								          $('.verify-form').show();
								          $('.verify-form1').hide();
								      }else{
								    	  $('.verify-form1').show();
								    	  $('.verify-form').hide();
								      }
								    })
			//
		}
		
	}
})
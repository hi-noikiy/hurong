define(function(require, exports, module){
	require("style/css/mobile/css/css.css");
	require("style/js/layer/css/layer.css");
	require("style/js/extract/common/login.js");
	require("style/js/mobile/js/zepto.js");
	require("style/js/mobile/js/public.js");
	require("style/js/form.js");
	this.md5 = require("style/js/hrymd5");
	
	module.exports = {

			sendsms :function(){
				
				
				//发送短信
				$("#getPhoneCode1").on("click",function(){
					debugger;
					var phone =$(".phone_num").val();
					var username = $("#email").val();
					var password = $("#pwd").val();
					$("#getPhoneCode1").attr("disabled","disabled");
					$(this).html("已发送");
					$.ajax({
						type : "post",
						url : _ctx + "/mobile/user/apppersondetail/getPhone",
						data : {
							mobile : phone,
							username : username,
							password : md5.md5(password)
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
				$("#getPhoneCode").on("click",function(){
					var phone =$(".phone_num").val();
					var username = $("#email").val();
					var password = $("#pwd").val();
					$("#getPhoneCode").attr("disabled","disabled");
					$(this).html("已发送");
					$.ajax({
						type : "post",
						url : _ctx + "/mobile/user/apppersondetail/getPhone",
						data : {
							mobile : phone,
							username : username,
							password : md5.md5(password)
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
										
										$("#getPhoneCode").html("点击");
										$("#getPhoneCode").removeAttr("disabled");// 按钮可用
										$("#getPhoneCode").html("重新发送");// 按钮可用
										window.clearInterval(pageTimer["setaphone"]);
									} else {
										$("#getPhoneCode").html(time+"秒重新发送" );
									}

								}, 1000);

								}else{
									$("#getPhoneCode").removeAttr("disabled");// 按钮可用
									layer.msg(data.msg, {icon: 2})
									if(data.msg=="请登录或重新登录"){
										window.open(basepath + "/html/user/login.htm","_self");
									}
								}
							}else{
								$("#getPhoneCode").removeAttr("disabled");// 按钮可用
								layer.msg(fasongshibai, {icon: 2})
							}
						},
						error : function(e) {

						}
					});

				});
				
				
				//谷歌登录认证
				$(".googlee_submit").on("click",function(){
					debugger;
					var verifyCode1 = $("#googlee_verifyCode1").val();
					var verifyCode2 = $("#googlee_verifyCode2").val();
					var verifyCode=verifyCode1;
					if(verifyCode1==""){
						 verifyCode=verifyCode2;
					}
					var username = $("#email").val();
					var password = $("#pwd").val();
					if(!verifyCode){
						layer.msg("谷歌验证不能为空", {icon: 2});
						return ;
					}
					$.ajax({
						type : "post",
						url : _ctx + "/mobile/user/apppersondetail/googleAuth",
						data :{
							username:username,
							password:md5.md5(password),
							verifyCode:verifyCode
							
						},
						cache : false,
						dataType : "json",
						success : function(data) {
							if(data.success){
								
								layer.msg("登录成功", {icon: 1});
								window.open(basepath + "/html/user/user-index.html?tokenId="+data.obj.UUID,"_self");

							}else{
								layer.msg(data.msg);
								$(".googlee_verifyCode").val("");
							}
						},
						
					});
					
				})
				
				//手机登录认证				
				$(".submit-phone").on("click",function(){
					debugger;
					var verifyCode1 = $("#wv_valicode1").val();
					var verifyCode2=$("#wv_valicode2").val();
					var verifyCode=verifyCode1
					if(verifyCode1==""){
						verifyCode=verifyCode2
					}
					var username = $("#email").val();
					var password = $("#pwd").val();
					if(!verifyCode){
						layer.msg("短信验证码不能为空", {icon: 2});
						return ;
					}
					
					
					$.ajax({
						type : "post",
						url : _ctx + "/mobile/user/apppersondetail/PhoneAuth",
						data :{
							username:username,
							password:md5.md5(password),
							verifyCode:verifyCode
							
						},
						cache : false,
						dataType : "json",
						success : function(data) {
							if(data.success){
								
								layer.msg("登录成功", {icon: 1});
								window.open(basepath + "/html/user/user-index.html?tokenId="+data.obj.UUID,"_self");

							}else{
								layer.msg(data.msg);
								$("#wv_valicode").val("");
							}
						},
						
					});
			
				});

			},

			
		init : function() {
			//初始化页面链接
			$("#reg").attr('href',_ctx+'/static/wap/html/user/reg.htm'); 
			//加载logo 	
			$.ajax({
				url: ctx_ + "/mobile/nouser/logo",
				type:"post",
				dataType:'json',
				success:function(data){
					//加载logo 	
					var url=ctx_+"/"+data.obj;
					log.style.backgroundImage="url("+url+")";
					
				}
			})
			
			
			
			$("#sublogin").on("click",function(){
				var username = $("#email").val();
				var password = $("#pwd").val();
				if(username=="" || username==null){
					$('#emailmsg').html('<font style="color:red">邮箱不能为空</font>');
					return false;
				}else if(vali.pwd==0){
					$('#pwdmsg').html('<font style="color:red">密码不能为空</font>');
					return false;
				}else{
					var username = $("#email").val();
					var password = $("#pwd").val();
					$.ajax({
						type : "post",
						url : _ctx + "/mobile/nouser/applogin.do",
						data : {
							username : username,
							password : md5.md5(password)
						},
						cache : false,
						async:false,
						dataType : "json",
						success : function(data) {
							if(data){
								if(data.success){
									if(data.obj.googleState==1&&data.obj.phoneState==1){
										$(".verifyLayout2").show();
										$(".phone_num").val(data.obj.phone)
									}else if(data.obj.googleState==1){
										$(".verifyLayout1").show();
									}else if(data.obj.phoneState==1){
										$(".phone_num").val(data.obj.phone)
										$(".verifyLayout").show();
									}else{
										layer.msg("登录成功", {icon: 1});
										window.open(basepath + "/html/user/user-index.html?tokenId="+data.obj.UUID,"_self");
									}
									
									
								}else{
									layer.msg(data.msg, {icon: 2});
								}
							}else{
								layer.msg("邮箱或密码错误", {icon: 2})
							}
						},
						error : function(e) {
							
						}
					});
				}
			})
				
			
			
		
			$('.dialog-close').on('click',function(){
					$(this).parent().parent().hide()
				})
			//
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
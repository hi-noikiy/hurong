define(function(require, exports, module){
	require("style/css/mobile/css/css.css");
	require("style/css/intlTelInput/intlTelInput.css");
	require("style/js/layer/css/layer.css");
	require("style/js/mobile/js/zepto.js");
	require("style/js/mobile/js/public.js");
	require("style/js/intlTelInput/intlTelInput.js");
	
	module.exports = {
			
			sendsms :function(){
				
				if(tokenId!=""){
					$("#isToken").html("<a href='"+basepath+"/html/coins.htm?tokenId="+tokenId+"' class='a-on'>交易中心</a><a href='"+basepath+"/html/user/user-index.html?tokenId="+tokenId+"' class='a-on'>我的资产</a>");
					$("#logo").attr("href",ctx_+"/static/wap/html/coins.htm?tokenId="+tokenId);

				}else{
					$("#isToken").html("<a href='"+basepath+"/html/coins.htm' class='a-on'>交易中心</a><a href='"+basepath+"/html/user/login.htm' class='a-on'>登录</a><a href='"+basepath+"/html/user/reg.htm'>注册</a>");
				}
				
				
				//发送短信
				$("#getPhoneCode").on("click",function(){
					debugger;
					var selected_flag =$(".selected-flag").attr("title");
					selected_flag=selected_flag.split(":");
					selected_flag=selected_flag[1].replace(/(^\s*)|(\s*$)/g, "");;
					var mobile=$("#wv_phone").val();
					if(!mobile){
						layer.msg('手机号码不能为空', {icon: 2});
						return ;

					}
					mobile =selected_flag+" "+mobile;
					$("#getPhoneCode").attr("disabled","disabled");
					$(this).html("已发送");
					$.ajax({
						type : "post",
						url : _ctx + "/mobile/user/apppersondetail/getPhone",
						data : {
							mobile:mobile,
							tokenId:tokenId
							//accountPassWord : md5.md5(accountPassWord),
							//reaccountPassWord : md5.md5(reaccountPassWord)
						},
						cache : false,
						dataType : "json",
						success : function(data) {
							debugger
							if(data){
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

			},

		init : function(){
			
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
			
			var isReal = 0;
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
				
			//提交手机认证				
			$("#submit-phone").on("click",function(){
				debugger;
				var selected_flag =$(".selected-flag").attr("title");
				selected_flag=selected_flag.split(":");
				selected_flag=selected_flag[1].replace(/(^\s*)|(\s*$)/g, "");;
				var mobile=$("#wv_phone").val();
				mobile =selected_flag+" "+mobile;
				
				
				var verifyCode = $("#wv_valicode").val();
				if(!mobile){
					$("#wv_phone").parent().next('.phone_note').show().text('手机号不能为空');
					return ;
				}
				if(!verifyCode){
					$("#wv_valicode").parent().parent().next('.phone_note').show().text('短信验证码不能为空');
					return ;
				}
				
				
				$.ajax({
					type : "post",
					url : _ctx + "/mobile/user/apppersondetail/setPhone",
					data :{mobile:mobile,verifyCode:verifyCode},
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
							verifyCode.val("");
						}
					},
					
				});
		
			});
		
				
				$.ajax({
					url: ctx_ + "/mobile/user/apppersondetail/regreg",
					type:"post",
					data : {tokenId:tokenId,language:"zh_CN"},
					dataType:'json',
					success:function(data){
						if(data.success){
							$("#serviceEmail").html(data.obj.serviceEmail)
							$("#servicePhone").html(data.obj.servicePhone)
						}else{
							layer.msg(data.msg, {icon: 2});
						}
					}
				});
				
				//退出
				$("#logout").on("click",function(){
					
					sessionStorage.clear(); 
					$.ajax({
					url: ctx_ + "/mobile/user/apppersondetail/logout.do",
					type:"post",
					data : {tokenId:tokenId},
					dataType:'json',
					success:function(data){
						if(data.success){
							window.open(basepath + "/html/coins.htm","_self");
						}else{
							layer.msg(data.msg, {icon: 2,time:1500},function(){
								window.open(basepath + "/html/user/login.htm","_self");
							});
						}
					}
				});
				})
			}
	//
			
			//intlTelInput --jia
			  $("#wv_phone").intlTelInput();
			
			//		
			
			
		}
	}
})
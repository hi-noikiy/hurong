define(function(require, exports, module){
	require("style/css/mobile/css/css.css");
	require("style/js/layer/css/layer.css");
	require("style/js/layer/layer.min.js");
	require("style/js/mobile/js/zepto.js");
	require("style/js/mobile/js/public.js");
	
	module.exports = {
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
				//实名认证
				$("#smrz").on("click",function(){
					//是否已实名
					$.ajax({
						url: ctx_ + "/mobile/user/apppersondetail/isrealandpwd",
						type:"post",
						data : {tokenId:tokenId},
						dataType:'json',
						success:function(data){
							if(data!="" && data!=null){
								if(data.success){
									
									if(data.obj.user.states=='0'){
										window.open(basepath + "/html/user/roveath.html?tokenId="+tokenId,"_self");
									}else if(data.obj.user.states=='1'){
										window.open(basepath + "/html/user/wait.html?tokenId="+tokenId,"_self");
									}else if(data.obj.user.states=='2'){
										window.open(basepath + "/html/user/realinfo.html?tokenId="+tokenId,"_self");
									}else if(data.obj.user.states=='3'){
										window.open(basepath + "/html/user/roveath.html?tokenId="+tokenId,"_self");
									}
								}else{
									layer.msg(data.msg, {icon: 2});
									window.open(basepath + "/html/user/login.htm","_self");
								}
							}
						}
					});
				})
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
				
				$.ajax({
					url: ctx_ + "/mobile/user/apppersondetail/isrealandpwd.do",
					type:"post",
					data : {tokenId:tokenId},
					dataType:'json',
					success:function(data){
						if(data!="" && data!=null){
							if(data.success){
								debugger;
								$("#username").text(data.obj.user.username);
								$("#phoneState").val(data.obj.user.phoneState);
								$("#googleState").val(data.obj.user.googleState)
								isReal = data.obj.user.isReal;
							}else{
								layer.msg(data.msg, {icon: 2});
								window.open(basepath + "/html/user/login.htm","_self");
							}
						}
					}
				});
				//修改登录密码
				$("#updlogin").on("click",function(){
					window.open(basepath + "/html/user/pwd.html?tokenId="+tokenId,"_self");
				})
				//我的消息
				$('#mynews').on('click',function(){
					window.open(basepath + "/html/user/mynews.html?tokenId="+tokenId,"_self");
				})
				//手机验证
				$('#setPhone').on('click',function(){
					
					if($("#phoneState").val()==0){
						window.open(basepath + "/html/user/setPhone.html?tokenId="+tokenId,"_self");
					}else{
						window.open(basepath + "/html/user/unbindPhone.html?tokenId="+tokenId,"_self");
					}
					
				})
				//谷歌验证
				$('#setGoogle').on('click',function(){
					
					if($("#googleState").val()==0){
						window.open(basepath + "/html/user/setGoogle.html?tokenId="+tokenId,"_self");
					}else{
						window.open(basepath + "/html/user/unbindGoogle.html?tokenId="+tokenId,"_self");
					}
				})
				//修改交易密码
				$("#updtran").on("click",function(){
					window.open(basepath + "/html/user/pwd_tran.html?tokenId="+tokenId,"_self");
				})
				//推荐返佣
				
				$("#recommend").on("click",function(){
					window.open(basepath + "/html/user/recommend.html?tokenId="+tokenId,"_self");
				})
								
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
		}
	}
})
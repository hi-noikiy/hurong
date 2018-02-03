define(function(require, exports, module){
	require("style/css/bootstrap/css/bootstrap.min.css");
	require("style/css/mobile/css/css.css");
	require("style/js/layer/css/layer.css");
	require("style/js/mobile/js/zepto.js");
	require("style/js/mobile/js/public.js");
	this.md5 = require("style/js/hrymd5");
	
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
				
				
				$("#submitBtn1").on("click",function(){debugger
					var accountGoogleWord = $("#accountGoogleWord").val();
					var PassWord = $("#PassWord").val();
					if(!PassWord){
						layer.msg("登录密码不能为空", {icon: 2});
						return ;
					}
					if(!accountGoogleWord){
						layer.msg("谷歌验证码不能为空", {icon: 2});
						return ;
					
					}
					
				$.ajax({
					type : "post",
					url : _ctx + "/mobile/user/apppersondetail/jcgoogle",
					data : {
						codes : accountGoogleWord,
						PassWord : md5.md5(PassWord)
					},
					cache : false,
					dataType : "json",
					success : function(data) {
						debugger;
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
	//
			
				
			
			
		}
	}
})
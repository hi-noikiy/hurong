define(function(require, exports, module){
	require("style/css/mobile/css/css.css");
	require("style/js/layer/css/layer.css");
	require("style/js/mobile/js/zepto.js");
	require("style/js/index.js");
	require("style/js/mobile/js/public.js");
	require("style/js/extract/common/user-index.js");
	
	
	function trueName(){
		var states=$("#states").val();
		if(states=='0'){
			layer.msg("请先实名", {icon: 2});
			return false;
		} 
		if(states=='1'){
			layer.msg("实名正在审核，请等待！", {icon: 2});
			return false;
		}
		
		if(states=='3'){
			layer.msg("实名已拒绝请重新提交审核", {icon: 2});
			return false;
		}
		
		return true;
	}
	
	
	
	module.exports = {
		init : function(){
			debugger;
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
				
				$("#logo").on("click",function(){
					window.open(basepath + "/html/coins.htm?tokenId="+tokenId,"_self");
				})
				$("#bbjy").on("click",function(){
					window.open(basepath + "/html/coins.htm?tokenId="+tokenId,"_self");
				})
				$("#sz").on("click",function(){
					window.open(basepath + "/html/user/account.html?tokenId="+tokenId,"_self");
				})
				
				$.ajax({
					url: ctx_ + "/mobile/user/apppersondetail/isrealandpwd.do",
					type:"post",
					data : {tokenId:tokenId},
					dataType:'json',
					success:function(data){
						if(data!="" && data!=null){
							if(data.success){
								//账户余额
								if(data.obj.myAccount.hotMoney == "" || data.obj.myAccount.hotMoney==null){
									$("#zhzcgj").text("0.00");
								}else{
									$("#zhzcgj").text(data.obj.myAccount.hotMoney);
									$("#languageCode").text(data.obj.languageCode);
								}
								//币
								;
								$("#index_ul1_tmpl").tmpl(data.obj.coinAccount).appendTo("#index_ul1");
								// 用户实名状态
								$("#states").val(data.obj.user.states);
								//后台是否开启充币需要实名
								$("#isChongbi").val(data.obj.isChongbi);
								//后台是否开启提币需要实名
								$("#isTibi").val(data.obj.isTibi);
							}else{
								layer.msg(data.msg, {icon: 2});
								window.open(basepath + "/html/user/login.htm","_self");
							}
						}
					}
				});
			}
			
		
			
			
			
			//充值 提现 去交易
			$("#index_ul1").on("click","li",function(){
				
				$("#index_ul1 #rmb").html("<a class='chongzhi' href='"+ basepath +"/html/user/user_ebank.html?tokenId="+tokenId+"'><span class='icon_cz'></span>充值</a>" +
						"<a class='tixian' href='"+ basepath +"/html/user_exchange/rmbot.html?tokenId="+tokenId+"'><span class='icon_tb'></span>提现</a>" 
						);
				
				
				$("#index_ul1 #rmb").delegate(".chongzhi","click",function(){
				    
					var isChongbi =$("#isChongbi").val();
					if(isChongbi==1){
						 return true;
					}
					return trueName();
				});
				$("#index_ul1 #rmb").delegate(".tixian","click",function(){
					var isTibi =$("#isTibi").val();
					if(isTibi==1){
						 return true;
					}
					return trueName();
				});
			})
			$("#index_ul1").delegate(".congbi","click",function(){
				var isChongbi =$("#isChongbi").val();
				if(isChongbi==1){
					 return true;
				}
				return trueName();
			});
			$("#index_ul1").delegate(".tibi","click",function(){
			    
				var isTibi =$("#isTibi").val();
				if(isTibi==1){
					 return true;
				}
				return trueName();
			});
			
			
			
			//收起/展开
			$("#index_ul1").on("click","li",function(){
				var a_lenght = $(this).children(".showAndhide");
		        var s_lenght_s = a_lenght.children("a").length;
		        if (s_lenght_s == 2) {
		            $(".ul1 li .showAndhide a").css("width", "3.71rem");
		        } else {
		            $(".ul1 li .showAndhide a").css("width", "2.47rem");
		        }

		        if ($(this).children("i").hasClass('bg-click')) {
		            $(".ul1 li .showAndhide").hide();
		            $(".ul1 li i").removeClass('bg-click1').addClass('bg-click');
		            $(this).children("i").removeClass('bg-click').addClass('bg-click1');
		            $(this).children("i").siblings('.showAndhide').show();
		        } else {
		            $(this).children("i").removeClass('bg-click1').addClass('bg-click');
		            $(this).children("i").siblings('.showAndhide').hide();
		        }
			})
		}
	}
})
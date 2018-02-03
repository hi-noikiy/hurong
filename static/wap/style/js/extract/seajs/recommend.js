define(function(require, exports, module){
	require("style/css/mobile/css/css.css");
	require("style/js/layer/css/layer.css");
	require("style/js/mobile/js/zepto.js");
	require("style/js/mobile/js/public.js");
	require("style/js/mobile/js/clipboard.min.js");
	
	module.exports = {
		init : function(){
			var isReal = 0;
			if(tokenId!=""){
				//跳转到首页
				$("#bbjy").on("click",function(){
					window.open(basepath + "/html/coins.htm?tokenId="+tokenId,"_self");
				})
				//我的资产
				$("#wdzh").on("click",function(){
					window.open(basepath + "/html/user/user-index.html?tokenId="+tokenId,"_self");
				})
				//设置
				$("#sz").on("click",function(){
					window.open(basepath + "/html/user/account.html?tokenId="+tokenId,"_self");
				})
				
				
				$.ajax({
					type : "post",
					url : _ctx + "/mobile/user/apppersondetail/getRecommend",
					data : {
						tokenId : tokenId,
					},
					cache : false,
					dataType : "json",
					success : function(data) {
						debugger
						//我的邀请码
						$("#inviteLink").html(data.obj.Commend.obj.commendCode);
						//链接
						$("#inviteLink1").val(data.obj.Commend.obj.commendLink);
						//人数
						$("#num").html(data.obj.Commend.obj.commendCount);
						//返佣记录
						$("#rebateRecord").html("")
						for (var i=0;i<data.obj.CommendInfo.length;i++)
						{
							$("#rebateRecord").append("<tr><td>"+data.obj.CommendInfo[i].fixPriceCoinCode+"</td><td>"+data.obj.CommendInfo[i].deawalMoney+"</td><td>"+data.obj.CommendInfo[i].surplusMoney+"</td>\</tr>");
						}
						
					}
				});
				
				
				
				
				
			}
			var clipboard = new Clipboard('.copy-btn');

		    clipboard.on('success', function(e) {debugger
		        layer.msg('复制成功',{
		        	icon: 1,
		        	time: 500 
		        })
		    });

		    clipboard.on('error', function(e) {
		        console.log(e);
		    });
			
			}
		}
	
})
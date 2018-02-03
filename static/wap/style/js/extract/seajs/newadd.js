define(function(require, exports, module){
	require("style/css/mobile/css/css.css");
	require("style/js/layer/css/layer.css");
	require("style/js/mobile/js/zepto.js");
	require("style/js/mobile/js/public.js");
	

	module.exports = {
		init : function(){
			var str = location.href;
			var meter = str.split("?")[1];
			var tokenId = meter.split("&")[0];
			tokenId = tokenId.split("=")[1];
			var symbol = meter.split("&")[1];
			symbol = symbol.split("=")[1];
			var hotMoney = meter.split("&")[2];
			hotMoney = hotMoney.split("=")[1];

			$("#go").on("click", function() {
				;
				window.open(basepath + "/html/user_exchange/coinout.html?tokenId=" + tokenId + "&symbol=" + symbol+ "&hotMoney=" + hotMoney,"_self");
			})
			$("#symbol").html("新增"+symbol+"提币地址");
			
			$("#currencyType").val(symbol);
			
			$("#savepublickey").on("click",function(){
				var publicKey = $("#publicKey").val();
				if(!publicKey){
					layer.msg("提币地址不能为空",{icon:2});
					return false;
				}
				var reg = /^[a-zA-Z\d~\!@#\$%\^&\*\(\)\._\+]+$/;
				if(!reg.test(publicKey)){
	        		layer.msg("提币地址不能包含汉字",{icon:2});
	        		return false;
	        	}
					var currencyType=$("#currencyType").val();
					var publicKey=$("#publicKey").val();
					var	remark=$("#remark").val();
						$.ajax({
							type : "post",
							url : _ctx + "/user/publickeylist/save",
							data : {
								currencyType :currencyType,
								publicKey :publicKey,
								remark : remark,
								
							},
							dataType : "json",
							success : function(data) {
								if(data.success){
									layer.msg(data.msg, {icon: 1});
									setTimeout(function(){
										window.open(basepath + "/html/user_exchange/coinout.html?tokenId=" + tokenId + "&symbol=" + symbol+ "&hotMoney=" + hotMoney,"_self");
									},1000);
								}else{
									layer.msg(data.msg, {icon: 1});
									
								}
							},
							error : function(e) {
								
							}
						});
				
				
				
				
			})
			
		}
	}
})
define(function(require,exports,module){
	this._table = require("js/base/table");
	
	module.exports = {
		renderTime : function(){
			$("td[name=createlong]").each(function(index,element){
				
				$(element).html(TimestampFormat('Y-m-d H:i:s',$(element).html()/1000));
				
			})
		},
		init : function(){
			//加载base
			require("base");
			
			$("#select").on("change",function(){
				$("#currencyType").val($(this).find("option:selected").val());
			})
			
			$("#savepublickey").on("click",function(){
				
				var publicKey = $("#publicKey").val();
				if(!publicKey){
					layer.msg(qiangbaoisnull,{icon:2});
					return false;
				}
				var reg = /^[a-zA-Z\d~\!@#\$%\^&\*\(\)\._\+]+$/;
				if(!reg.test(publicKey)){
	        		layer.msg(qianbaobunengbaohanhanzi,{icon:2});
	        		return false;
	        	}
				
				var currencyType = $("#currencyType").val();
				if(currencyType=="TV"||currencyType=="tv"){
					var remark = $("#remark").val();
					if(remark==undefined||remark==""){
						layer.msg(qingxieremark,{icon:2});
						return false;
					}
				}
				
				
				$("#withdraw_address_form").ajaxSubmit({
					type : 'post',
					url : _ctx + "/user/publickeylist/save",
					dataType : 'JSON',
					success : function(data){
						if(data.success){
							layer.msg(data.msg, {icon: 1,time:1000},function(){
								loadUrl(_ctx+"/user/publickeylist/index");
							})
						}else{
							layer.msg(data.msg, {icon: 2,time:1000},function(){
								loadUrl(_ctx+"/user/publickeylist/index");
							})
						}
					}
				})
			})
			
			$("#tablepublic").on("click","#deletePub",function(){
				var value = $(this).siblings().val();
				layer.confirm(isdelete, {
					title:msg,
	    			btn: [quding,quxiao]
				}, function(){
					$.ajax({
						type : "POST",
						dataType : "JSON",
						url : _ctx + "/user/publickeylist/delete",
						cache : false,
						data : {id:value},
						success : function(data) {
							layer.closeAll('dialog');
							loadUrl(_ctx+"/user/publickeylist/index");
						}
					})
				})
			})	
		}
		
		/*getPublickey : function() {
			$("#savepublickey").on("click",function(){
				var tableObj = document.getElementById("tablepublic");
				var trObjArr = tableObj.rows;
				var Publickey = "";
				if(trObjArr.length > 0){
					for (var i = 0; i < trObjArr.length; i++){
						Publickey = trObjArr[i].publicKey ;
						if($("#publicKey").val() == Publickey){}
							layer.msg("钱包公钥不能重复",{icon:2});
							return false;
					}
				}
			});
		}*/
		
	}
})
define(function(require,exports,module){
	this._table = require("js/base/table");
	
	module.exports = {
		init : function(){
			//加载base
			require("base");
			if($('#surname').val()==""){
				$('#surname').removeAttr("disabled");
				$('#truename').removeAttr("disabled");
			}
			//查询银行
			$.ajax({
				type : "POST",
				dataType : "JSON",
				url : _ctx + "/user/bankcard/bank",
				cache : false,
				success : function(data) {
					var obj = eval(data.obj);
					var html = "";
					for(var i=0;i<obj.length;i++){
						html += "<option value="+obj[i].itemName+">"+obj[i].itemName+"</option>"
					}
					$("#bankselect").append(html);
				}
			})
			//查询省
			$.ajax({
				type : "POST",
				dataType : "JSON",
				url : _ctx + "/user/bankcard/area",
				cache : false,
				success : function(data) {
					var obj = eval(data.obj);
					var html = "";
					for(var i=0;i<obj.length;i++){
						html += "<option value="+obj[i].key+">"+obj[i].province+"</option>"
					}
					$("#province").append(html);
				}
			})
			//获取选中的省
			$("#province").on("change",function(){
				//得到下拉列表的相应的值
				var id = this.value;
				var selectName = $(this).find("option:selected").val();
				//给隐藏文本框赋值
				$("#provinceValue").val(selectName);
				$("#bankProvince").val($(this).find("option:selected").text());
				$("#city option").remove();
				//查询市
				$.ajax({
					type : "POST",
					dataType : "JSON",
					url : _ctx + "/user/bankcard/city/"+$("#provinceValue").val(),
					cache : false,
					success : function(data) {
						var obj = eval("["+data.obj+"]");
						var html = "";
						for(var i=0;i<obj.length;i++){
							html += "<option value="+obj[i].city+">"+obj[i].city+"</option>"
						}
						$("#city").append(html);
					}
				})
			});
			//添加银行卡
			$("#addBankcard").on("click",function(){
				var bankselect = $("#bankselect").val();
				var province = $("#province").val();
				var subBank = $("#subBank").val();
				var subBankNum = $("#subBankNum").val();
				var cardName = $("#cardName").val();
				var cardNumber = $("#cardNumber").val();
				var surname = $("#surname").val();
				var truename = $("#truename").val();
 				if(!bankselect){
					layer.msg(qingxuanzeyinhang,{icon:2});return false;
				}
				if(!province){
					layer.msg(qingxuanzesuozaidi,{icon:2});return false;
				}
				if(!subBank){
					layer.msg(kaihuzhihangbunengweikong,{icon:2});return false;
				}
				if(!cardNumber){
					layer.msg(yinhangkahaobunengweikong,{icon:2});return false;
				}
				
				if(!surname ){
					layer.msg(xingminisnull, {icon: 2});
					return false;
				}
				if(!truename ){
					layer.msg(xingshibuzheng, {icon: 2});
					return false;
				}
				
				$("#addBankcard").attr("disabled",true);
				
				$("#cardForm").ajaxSubmit({
					 type: "post",
			         url: _ctx + "/user/bankcard/saveBankCard",
			         dataType: "JSON",
			         success: function(data) {
			        	 $("#addBankcard").attr("disabled",false);
			        	 if(data!=undefined){
			        		 if(data.success){
			        			 layer.msg(tianjiacehngg,{icon:1,time:1500},function(){
			        				 loadUrl(_ctx+"/user/bankcard/index");
			        			 })
			        		 }else{
			        			 layer.msg(data.msg, {icon: 2});
			        		 }
			        	 }
			         }
				})
			})
			//删除
			$("#div_list").on("click","span",function(){
				var id = $(this).find("#bandId").val();
				layer.confirm(isdelete, {
	    			btn: [quding,quxiao]
				}, function(){
					$.ajax({
						type : "POST",
						dataType : "JSON",
						url : _ctx + "/user/bankcard/removeBankCard",
						cache : false,
						data : {id:id},
						success : function(data) {
							if(data.success){
								layer.closeAll('dialog');
								loadUrl(_ctx+"/user/bankcard/index");
							}else{
								layer.msg(data.msg, {icon: 2});
							}
						}
					})
				})
			})
		}
	}
})

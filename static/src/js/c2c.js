define(function(require, exports, module) {
	

	
	module.exports = {
		/**
		 * 查看订单详细信息
		 */
		getdeatil  : function(){
			
			//查看订单详细
			$("#billDetail").on("click","a[transactionnum]",function(){
				var transactionnum = $(this).attr("transactionnum");
				layer.open({
					  title: false,
					  type: 2,
					  shadeClose: false,
					  move : false,
					  scrollbar  : false,
					  shade: 0.8,
					  area: ['33%', '70%'],
					  content: _ctx+"/user/getc2cTransaction/"+transactionnum
				}); 
			})
			
			//支付完成
			$("#billDetail").on("click","a[transactionnum1]",function(){
				var transactionnum = $(this).attr("transactionnum1");
				layer.confirm('确认支付!', {
					  btn: ['确认','取消'] //按钮
					}, function(){
					    
						$.ajax({
							type : "post",
							url : _ctx+"/user/payc2cTransaction/"+transactionnum,
							cache : false,
							dataType : "json",
							success : function(data) {
								if(data){
									if(data.success){
										window.location.reload()
									}else{
										layer.msg(data.msg);
									}
								}
							},
							error : function(e) {
							}
						});
						
						
					}, function(){
						layer.close();
				});
			})
			
			//交易失败
			$("#billDetail").on("click","a[transactionnum2]",function(){
				var transactionnum = $(this).attr("transactionnum2");
				var remark = $("#failRemark").html();
				$('#faildiv').removeClass("hide");
				layer.open({
					  title: false,
					  type: 1,
					  shadeClose: false,
					  move : false,
					  scrollbar  : false,
					  shade: 0.8,
					  area: ['400px', '200px'],
					  content:$('#faildiv'),
					  btn: ['确定'],
					  btnAlign: 'c',
				      yes: function(index, layero){
				    	 
				    	 $.ajax({
								type : "post",
								url : _ctx+"/user/failc2cTransaction/"+transactionnum,
								cache : false,
								dataType : "json",
								data :{
									remark : remark
								},
								success : function(data) {
									if(data){
										if(data.success){
											window.location.reload()
										}else{
											layer.msg(data.msg);
										}
									}
								},
								error : function(e) {
								}
						});
				    	 
				     },
				     cancel : function(index){
				    	 $('#faildiv').addClass("hide");
				    	 layer.closeAll();
				     }
				}); 
			
			})
			
			//关闭交易
			$("#billDetail").on("click","a[transactionnum3]",function(){
				var transactionnum = $(this).attr("transactionnum3");
				var remark = $("#closeRemark").html();
				
				$('#closediv').removeClass("hide");
				layer.open({
					  title: false,
					  type: 1,
					  shadeClose: false,
					  move : false,
					  scrollbar  : false,
					  shade: 0.8,
					  area: ['400px', '200px'],
					  content:$('#closediv'),
					  btn: ['确定'],
					  btnAlign: 'c',
				      yes: function(index, layero){
				    	 
				    	 $.ajax({
								type : "post",
								url : _ctx+"/user/closec2cTransaction/"+transactionnum,
								cache : false,
								dataType : "json",
								data :{
									remark : remark
								},
								success : function(data) {
									if(data){
										if(data.success){
											window.location.reload()
										}else{
											layer.msg(data.msg);
										}
									}
								},
								error : function(e) {
								}
						});
				    	 
				     
				    	 
				     },
				     cancel : function(index){
				    	 $('#closediv').addClass("hide");
				    	 layer.closeAll();
				     }
				}); 
			})
			
		},
		//添加页面提交方法
		init : function(){
			
			var formartInput = function(obj){

				obj.value = obj.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
				obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
				obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
				obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数  
				if(obj.value.indexOf(".")< 0 && obj.value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
					obj.value= parseFloat(obj.value); 
				} 
			
			}
			
			$("#buyNumber").on("input",function(){
				
				formartInput(this);
				
				var count = 0;
				if(this.value!=""){
					count = parseFloat(this.value).toFixed(2);
				}
				
				var price = 0;
				if($("#buyUnitPrice").val()!=""){
					price = parseFloat($("#buyUnitPrice").val()).toFixed(2);
				}
				
				$($("#buyfinish").find("span")[0]).html(Math.floor(count*price*100)/100);
			});
			$("#sellNumber").on("input",function(){
				
				formartInput(this);

				var count = 0;
				if(this.value!=""){
					count = parseFloat(this.value).toFixed(2);
				}
				
				var price = 0;
				if($("#sellUnitPrice").val()!=""){
					price = parseFloat($("#sellUnitPrice").val()).toFixed(2);
				}
				
				$($("#sellfinish").find("span")[0]).html(Math.floor(count*price*100)/100);
			
			});
			
			
			 //买
			 $("#buyBtn").on("click",function(){
				 	var username = $("#username").val();
				 	if(username==undefined||username==""){
				 		layer.alert('请先登录后再进行交易', {
				 			  skin: 'layui-layer-molv' //样式类名
				 			  ,closeBtn: 0
				 			});
				 		return false;
				 	}
				 	
				 	var coinCode = $("#coinCode").val();
				 	var transactionCount = $("#buyNumber").val();
				 	var transactionPrice = $("#buyUnitPrice").val();
				 	
					$.ajax({
						type : "post",
						url : _ctx+"/user/createTransaction",
						cache : false,
						data : {
							coinCode : coinCode,
							transactionType : 1,
							transactionCount : transactionCount,
							transactionPrice : transactionPrice
						},
						dataType : "json",
						success : function(data) {
							
							if(data){
								if(data.success){
									layer.open({
										  title: false,
										  type: 2,
										  shadeClose: false,
										  move : false,
										  scrollbar  : false,
										  shade: 0.8,
										  area: ['33%', '70%'],
										  content: _ctx+"/user/getc2cTransaction/"+data.obj,
										  cancel: function(index){
											  window.location.reload() ;
										  } 
									}); 
								}else{
									layer.msg(data.msg);
								}
							}
					 	
						},
						error : function(e) {
							
						}
					});
				 	
			 })
			 
			  //卖
			 $("#sellBtn").on("click",function(){

				 	var username = $("#username").val();
				 	if(username==undefined||username==""){
				 		layer.alert('请先登录后再进行交易', {
				 			  skin: 'layui-layer-molv' //样式类名
				 			  ,closeBtn: 0
				 			});
				 		return false;
				 	}
				 	
				 	var coinCode = $("#coinCode").val();
				 	var transactionCount = $("#sellNumber").val();
				 	var transactionPrice = $("#sellUnitPrice").val();
				 	
					$.ajax({
						type : "post",
						url : _ctx+"/user/createTransaction",
						cache : false,
						data : {
							coinCode : coinCode,
							transactionType : 2,
							transactionCount : transactionCount,
							transactionPrice : transactionPrice
						},
						dataType : "json",
						success : function(data) {
							
							if(data){
								if(data.success){
									layer.open({
										  title: false,
										  type: 2,
										  shadeClose: false,
										  move : false,
										  scrollbar  : false,
										  shade: 0.8,
										  area: ['33%', '70%'],
										  content: _ctx+"/user/getc2cTransaction/"+data.obj,
										  cancel: function(index){
											  window.location.reload() ;
										  } 
									}); 
								}else{
									layer.msg(data.msg);
								}
							}
					 	
						},
						error : function(e) {
							
						}
					});
				 
			 })
		}
	

	}
});
define(function(require, exports, module) {

	module.exports = {
			sendvail : function(type){
				if(type=="login"){
					var username = $("#username").val();
					var password = $("#password").val();
					var marketlogin=$(".market").val();
					if(!username){
						layer.msg(youxiangbunengweikong, {icon: 2});
						return ;
					}
					if(!password){
						layer.msg(mimabunengweikong, {icon: 2});
						return ;
					}
					$.ajax({
						type : "post",
						url : _ctx + "/loginService",
						data : {
							username : username,
							password : md5.md5(password)
						},
						cache : false,
						dataType : "json",
						success : function(data) {
							if(data){
								if(data.success){
									if(marketlogin=="ket"){
										window.location.href = _ctx+"/market.do";

									}else{
										window.location.href = _ctx+"/user/center";

									}
									//layer.msg("登录成功", {icon: 1,time:1000},function(){
									//})
								}else{
									layer.msg(data.msg, {icon: 2})
								}
							}else{
								layer.msg(data.msg, {icon: 2})
							}
						},
						error : function(e) {
							
						}
					});
				}else if(type=="setpw"){
					 oldPassWord = $("#oldPassWord").val();
					 newPassWord = $("#newPassWord").val();
					 reNewPassWord = $("#reNewPassWord").val();
					var pwSmsCode = $("#pwSmsCode").val();
					
					if(!oldPassWord){
						layer.msg(yuanshidengluisnull, {icon: 2});
						return ;
					}
					if(!newPassWord){
						layer.msg(xindenglumimaisnull, {icon: 2});
						return ;
					}
					if(newPassWord==oldPassWord){
						layer.msg(newoldisnot, {icon: 2});
						return ;		
					}
					if(!validate.check_password(newPassWord)){
						layer.msg(xinmimageshi, {icon: 2});
						return ;
					}
					if(!reNewPassWord){
						layer.msg(ercimimaisnull, {icon: 2});
						return ;
					}
					if(newPassWord!=reNewPassWord){
						layer.msg(liangcimima, {icon: 2});
						return ;
					
					}
					
					$.ajax({
						type : "post",
						url : _ctx + "/user/setpw",
						data : {
							oldPassWord : md5.md5(oldPassWord),
							newPassWord : md5.md5(newPassWord),
							reNewPassWord : md5.md5(reNewPassWord),
						},
						cache : false,
						dataType : "json",
						success : function(data) {
							if(data.success){
									layer.msg(xiugaichenggong, {icon: 1,time:1000},function(){
										//跳转到个人中心
										window.location.href = _ctx+"/user/center";
									})
								}else{
									layer.msg(data.msg, {icon: 2});
									$("#submitBtn").removeAttr("disabled");
								}
						},
						error : function(e) {
							
						}
					});
				}else if(type=="btcget"){
					var coinType = $("#coinType").val();
					var withdrawCode = $("#withdrawCode").val();
					//var accountPassWord = $("#accountPassWord").val();
					var currencyType = $("#currencyType").val();
					var btcNum = $("#inputNumWit").val();
					var btcKey = $("#btcKey").val();
					var pacecurrecy=$("#issued_sub_key_c").val();
					var shouxufei=$("#shouxufei").text();
					var shouxu="";
					if(pacecurrecy!=null){
						shouxu=$("#issued_sub_key_c").val();
					}else{
					    shouxu=$("#shouxufei").text() == "" ? "0" : $("#shouxufei").text(); //田朋雨改
					}
					if(shouxu==null||shouxu==""){
						layer.msg(qingtianjiaqianbaodizhi, {
							icon : 2
						});
					}
					if($("#issued_sub_key_c").val()!=null&&$("#issued_sub_key_c").val()>=btcNum){
						layer.msg(tibishouxugeibunengdayutibishul, {
							icon : 2
						});
						return false;
					}
					if(btcKey==null){
						layer.msg(qingtianjiaqianbaodizhi, {
							icon : 2
						});
						return false;
					}
					if(btcNum ==null || btcNum==""){
						layer.msg(qingshurutibishuliang, {
							icon : 2
						});
						return false;
					}
					$.ajax({
						type : "post",
						url : _ctx + "/user/publickeylist/getOrder",
						dataType : "JSON",
						data : {
							coinType : coinType,
							withdrawCode : withdrawCode,
							//accountPassWord : md5.md5(accountPassWord),
							currencyType : currencyType,
							btcNum : btcNum,
							btcKey : btcKey,
							shouxufei:shouxu
						},
						success : function(data) {
							if(data!=undefined&&data.success){
								layer.msg(shengqingchenggong,{icon:1,time:1500},function(){
									loadUrl(_ctx + "/user/btc/get")
								});
								try {
									//发送后台语音提醒消息
									pushOrder("tibi");
								} catch (e) {
								}
								
							}else{
								layer.msg(data.msg, {icon : 2});
								$("#oktx").attr("disabled", false);
								$('#table').bootstrapTable('refresh');
								$("#oktx").removeAttr("disabled");// 按钮可用
							}
						}
					})
				}else if(type=="setagoogle"){
					
					var accountGoogleWord = $("#accountGoogleWord").val();
					var PassWord = $("#PassWord").val();
				$.ajax({
					type : "post",
					url : _ctx + "/google/jcgoogle",
					data : {
						codes : accountGoogleWord,
						PassWord : md5.md5(PassWord)
					},
					cache : false,
					dataType : "json",
					success : function(data) {
						if(data.success){
							
							layer.msg(data.msg, {icon: 1,time:1000},function(){
								//跳转到个人中心
								window.location.href = _ctx+"/user/center";
							})

						}else{
							layer.msg(data.msg);

						}
					},
					
				});
				}else if(type=="setphone"){
					
					var mobile=$("#mobile-number").val();
					var verifyCode = $("#verifyCode1").val();
					
					$.ajax({
						type : "post",
						url : _ctx + "/phone/setPhone",
						data :{mobile:mobile,verifyCode:verifyCode},
						cache : false,
						dataType : "json",
						success : function(data) {
							if(data.success){
								
								layer.msg(data.msg, {icon: 1,time:1000},function(){
									//跳转到个人中心
									window.location.href = _ctx+"/user/center";
								})

							}else{
								layer.msg(data.msg);
								$("#verifyCode").val("");
							}
						},
						
					});
				}else if(type=="rmbwithdraw"){
					var transactionMoney = $("#transactionMoney").val();
					var accountPassWord = $("#accountPassWord").val();
					var custromerAccountNumber =  $("#custromerAccountNumber").val();
					var withdrawCode = $("#withdrawCode").val();
					if(!custromerAccountNumber){
						layer.msg("请选择银行卡!",{icon:2});
						return false;
					}
					if(!transactionMoney){
						layer.msg("提现金额不能为空!",{icon:2});
						return false;
					}
					if(!validate.isNumber(transactionMoney)){
		        		 layer.msg("金额必须为数字",{icon:2});
		        		 return false;
			         }
					$("#withdraw").ajaxSubmit({
						 type: "post",
				         url: _ctx + "/user/rmbWithdraw/rmbwithdraw",
				         dataType: "JSON",
				         data : {
				        	 accountPassWord : md5.md5(accountPassWord)
				         },
				         resetForm : true,
				         beforeSubmit : function(formData, jqForm, options) {
						 },
				         success: function(data) {
				        	 if(data!=undefined){
				        		 if(data.success){
				        			 layer.msg(shengqingchenggong, {icon: 1,time:1000},function(){
				        				 loadUrl(_ctx+"/user/rmbWithdraw/index");
				        			 });
				        			try{
				        			//发送后台语音提醒消息
						        	 pushOrder("rmbout");
				        		 	} catch (e) {
									}
				        		 }else{
				        			 layer.msg(data.msg, {icon: 2});
				        		 }
				        	 }
				        	 
				         }
					})
				}else if(type=='rmbdeposit'){
					var surname = $('#surName').val();
					var remitter = $('#remitter').val();
					var bankCode = $('#bank_code').val();
					var bankAmount = $('#bank_Amount').val();
					var bankName = $('#bank_name').val();
					$.ajax({
						type : "post",
						url : _ctx + "/user/rmbdeposit/rmbdeposit",
						data :{
							surname:surname,
							remitter:remitter,
							bankCode:bankCode,
							bankAmount:bankAmount,
							bankName:bankName
							},
						cache : false,
						dataType : "json",
						success : function(data) {
							if(data.success){
								$("#sendBtn1").removeAttr("disabled");// 按钮可用
								$("#sendBtn1").html(chongxinfasong);// 按钮可用
//								$("#sendBtn").html("点击");
								$("#sendBtn").removeAttr("disabled");// 按钮可用
								$("#sendBtn").html(chongxinfasong);// 按钮可用
//								clearInterval(pageTimer["setapw"]);
								$("#queding").removeAttr("disabled");
								$("#queding1").removeAttr("disabled");
								$("#queding2").removeAttr("disabled");
								clearInterval(pageTimer["login"]);
								
								$(".verifyLayout").hide();
					        	 $("#generate_single").attr("disabled",false);
								 $("#generate_single").empty().text(""+shengchenghuikuandan+"");
								 
								 $("#bankAccount").empty().html("<b>"+data.obj.accountNumber+"</b>");
					         	 $("#bankName_").empty().html(data.obj.bankName);
					         	 $("#bankAddress").empty().html(data.obj.bankAddress);
					         	 $("#accountName").empty().html(data.obj.accountName);
					         	 $("#remittanceMoney").empty().html("<b>"+data.obj.transactionMoney+" ("+huikuanshitianxiejine+")</b>");
					         	 $("#transactionNum").empty().text(data.obj.transactionNum);
					         	 $("#remark").empty().html("<b>"+data.obj.remark+"  ("+huikuanshibeizhuneirong+")</b>");
					         	 $("#wenxintishi").empty().html(data.obj.remark);
								 
					        	 layer.open({
								   type: 1,
								   title: '',
								   area: ['500px', '550px'],
								   scrollbar: false,   // 父页面 滚动条 禁止
								   shadeClose: false, //点击遮罩关闭
								   content: $('#Popup')
							     });
					        	 
					        	 $('#table').bootstrapTable('refresh');
					        	 try{
						        	 //发送后台语音提醒消息
						        	 pushOrder("rmbin");
								 } catch (e) {
							     }
							}else{
								layer.msg(data.msg);
								$("#verifyCode").val("");
							}
						},
						
					});
				
				
				}
			}
		}
		
});

define(function(require, exports, module){
	require("style/css/mobile/css/css.css");
	require("style/js/layer/css/layer.css");
	require("style/js/mobile/js/zepto.js");
	require("style/js/mobile/js/public.js");
	require("style/js/mobile/js/public.js");
	require("style/js/extract/common/rmbot.js");
	this.md5 = require("style/js/hrymd5");
	this.validate = require("style/js/validate");
	
	var maxpage=null;

	//分页
	function page(current,maxpage){
		 	var sp = Number(current) - 1;//startpage
	        var ep =Number(current) + 2;//endpage
	        var eoff = ep - maxpage;//tp:totalpage
	        if(eoff>0){
	                sp = sp - eoff;
	        }
	        if(sp<=0){
	            ep = ep -sp + 1;
	        }
	        var str = '';
	        if(current != 1)
	            str = str + '<ul><li>上一页</li>'
	        else
	            str = str + '<ul><li>上一页</li>'
	        for(var i= sp;i<=ep;i++){
	            if(i>0&& i<=maxpage){
	                if(i == current)
	                    str = str + "<li class='pitch' >"+i+"</li>";
	                else
	                    str = str + '<li>'+i+'</li>';
	            }
	        }
	        
	        if(current != maxpage)
	            str = str + '<li>下一页</li></ul>';
	        else
	            str = str + '<li>下一页</li></ul>';
	        $("#information").html(str);
	
	  
		
		
	}
	
	
	function records(wv_valicode){
		var okhotMoney = $("#hotmoney").text();//可用金额
		var transactionMoney = $("#money_rmb").val();//当前输入金额
		var maxWithdrawMoneyOneTime = $("#maxWithdrawMoneyOneTime").val();//单笔最多
		var i, j, strTemp;
		 var actualMoney=null;
	    strTemp = "0123456789";
	    
		//银行选择
		var bankselect = $("#bankselect").val();
		if(bankselect==""){
			layer.msg("请选择银行", {icon: 2});
			return;
		}
		;
		if(transactionMoney==""){
			layer.msg("请输入提现金额", {icon: 2});
			return;
		}
		if(parseInt(transactionMoney)>parseInt(okhotMoney)){
			layer.msg('不可大于可提现金额', {icon: 2});
			return false;
		}else if(parseInt(transactionMoney)>parseInt(maxWithdrawMoneyOneTime)){
			layer.msg('单笔不得超过'+maxWithdrawMoneyOneTime+$(".languageCode").html(), {icon: 2});
			return false;
		}else{
			if(transactionMoney.length>0){
				for (i = 0; i < transactionMoney.length; i++) {
			         j = strTemp.indexOf(transactionMoney.charAt(i));
			         if (j == -1) {
			        	 layer.msg('金额必须为数字', {icon: 2});
			        	 return false;
			         }else{
			        	 
			        	  actualMoney = parseInt(transactionMoney) * ($("#witfee").val()/100);
			        	 $("#actualMoney").val(actualMoney);
						 var actualMoney_b = parseInt(transactionMoney) - actualMoney;
						 $("#true_daozhang").empty().val("手续费"+actualMoney+$(".languageCode").html()+"实际到账金额 "+actualMoney_b+$(".languageCode").html());
						 ""
			         }
			     }
			}
		}

		//提现
		$.ajax({
			url: ctx_ + "/mobile/user/apprmbwithdraw/rmbwithdraw.do",
			type:"post",
			data : { fee:actualMoney,bankCardId:bankselect,transactionMoney:transactionMoney,tokenId:tokenId,valicode:wv_valicode},
			dataType:'json',
			success:function(data){
				if(data.success){
        			 layer.msg("申请成功!", {icon: 1,time:1500},function(){
        				 window.open(basepath + "/html/user/user-index.html?tokenId="+tokenId,"_self");
        			 });
        		 }else{
        			 
        			 if(data.obj==null){
        				 layer.msg(data.msg, {icon: 2});
	        			 if(data.msg=="请重新登录"){
	        				 window.open(basepath + "/html/user/login.htm","_self");
	        			 }
	        			 return;
        			 }
        			 
        			 if(data.obj.googleState==1&&data.obj.phoneState==1){
							$(".verifyLayout2").show();
							$(".phone_num").val(data.obj.phone)
						}else if(data.obj.googleState==1){
							$(".verifyLayout1").show();
						}else if(data.obj.phoneState==1){
							$(".phone_num").val(data.obj.phone)
							$(".verifyLayout").show();
						}
        			 
        			 
        		 }
			}
		});
	}
	
	//提现记录
	function Delta_records(){
		var current =sessionStorage.getItem("coinout_page");
		var limit=4;
		var offset=(current*limit)-limit;
		$.ajax({
			url: ctx_ +"/user/rmbdeposit/list",
			type:"post",
			dataType:'json',
			data: {tokenId : tokenId,
			   limit:limit,
			   offset:offset,
			   sortOrder:"asc" ,
			   transactionType:'tixian'},
			success:function(data){
				var rows =data.rows;
				$("#list").html("<tr><th>提现金额</th><th>手续费</th><th>状态</th><th>驳回原因</th></tr>");
				;
				for (var i = 0; i < rows.length; i++) {
					
					//1线上充值,2线上提现 3线下充值 4线下取现
					var transactionType =rows[i].transactionType;
					if(transactionType==1){
						transactionType="线上充值"
					}else if(transactionType==2){
						transactionType="线上提现"
					}else if(transactionType==3){
						transactionType="线下充值"
					}else if(transactionType==4){
						transactionType="线下取现"
					}
					//1待审核 2已完成 3已否决
					var status=rows[i].status;
					if(status==1){
						status="待审核"
					}else if(status==2){
						status="已完成"
					}else if(status==3){
						status="已否决"
					}
					var rejectionReason=rows[i].rejectionReason;
					if(rejectionReason!=null){
						rejectionReason= rows[i].rejectionReason;
					}else{
						rejectionReason= '-';
					}
					
					$("#list").append("<tr><td>"+rows[i].transactionMoney+"</td><td>"+rows[i].fee+"</td><td>"+status+"</td><td>"+rejectionReason+"</td></tr>")
				}
				maxpage=data.page;
				   page(current,maxpage);
				
			}
		});
	}
	
	module.exports = {
		init : function(){
			//清除定时器
			clearPageTimer()
			
			if(tokenId!=""){
				//获取手续费费率
				$.ajax({
					url: ctx_ + "/mobile/user/apppersondetail/isrealandpwd.do",
					type:"post",
					data : {tokenId:tokenId},
					dataType:'json',
					success:function(data){
						if(data!="" && data!=null){
							if(data.success){
								
									$("#hotmoney").text(data.obj.myAccount.hotMoney);
									$("#witfee").val(data.obj.witfee);
									$("#maxWithdrawMoney").val(data.obj.maxWithdrawMoney);
									$("#maxWithdrawMoneyOneTime").val(data.obj.maxWithdrawMoneyOneTime);
									$(".languageCode").html(data.obj.languageCode);
								
							}else{
								layer.msg(data.msg, {icon: 2});
								window.open(basepath + "/html/user/login.htm","_self");
							}
						}
					}
				});
			}
			
			
			
			
			//回显用户姓和名
			$.ajax({
				url: ctx_ + "/mobile/user/apppersondetail/isrealandpwd.do",
				type:"post",
				data : {tokenId:tokenId},
				dataType:'json',
				success:function(data){
					if(data!="" && data!=null){
						if(data.success){
							
							
								$("#ming").val(data.obj.user.truename);
								$("#xing").val(data.obj.user.surname);
															
						}else{
							layer.msg(data.msg, {icon: 2});
							window.open(basepath + "/html/user/login.htm","_self");
						}
					}
				}
			});
			
			   sessionStorage.setItem("coinout_page", "1");
			   
			   //点击分页
		$("#information").on("click","ul li",function(){  
			debugger;
			   var value = $(this).html();
			 var coinout_page=  sessionStorage.getItem("coinout_page");
			 
			 if(value!="上一页"&&value!="下一页"){
				 sessionStorage.setItem("coinout_page",value);
			 } else if(value=="上一页"&&coinout_page!=1){
				 value=coinout_page-1;
				 sessionStorage.setItem("coinout_page",value);
			 }
			 
			 if(value!="上一页"&&value!="下一页"){
				 sessionStorage.setItem("coinout_page",value);
			 } else if(value=="下一页"&&coinout_page!=maxpage){
				 value=parseInt(coinout_page)+1;
				 sessionStorage.setItem("coinout_page",value);
			 }
			$(this).addClass("pitch");
			Delta_records(tokenId);
		});  
			//提现记录
			Delta_records();
			//加载当前账户银行
			$.ajax({
				url: ctx_ + "/mobile/user/appbankcode/findBankCard.do",
				type:"post",
				data : {tokenId:tokenId},
				dataType:'json',
				success:function(data){
					if(data!="" && data!=null){
						if(data.success){
							var obj = eval(data.obj);
							var html = "";
							var cardNumber =sessionStorage.getItem("cardNumber"); 
							for(var i=0;i<obj.length;i++){
								if(obj[i].cardNumber==cardNumber){
									sessionStorage.removeItem("cardNumber");
									html += "<option selected = 'selected' value="+obj[i].id+">"+obj[i].cardNumber+" "+obj[i].cardBank+"</option>"
								}
									html += "<option value="+obj[i].id+">"+obj[i].cardNumber+" "+obj[i].cardBank+"</option>"
							}
							$("#bankselect").append(html);
						}else{
							layer.msg(data.msg, {icon: 2});
							window.open(basepath + "/html/user/login.htm","_self");
						}
					}
				}
			});
			$("#money_rmb").bind('input propertychange', function() {
				var okhotMoney = $("#hotmoney").text();//可用金额
				var transactionMoney = $("#money_rmb").val();//当前输入金额
				var maxWithdrawMoneyOneTime = $("#maxWithdrawMoneyOneTime").val();//单笔最多
				if(transactionMoney==""){
					transactionMoney=0;
				}
				var i, j, strTemp;
			    strTemp = "0123456789";
				if(parseInt(transactionMoney)>parseInt(okhotMoney)){
					layer.msg('不可大于可提现金额', {icon: 2});
					return false;
				}else if(parseInt(transactionMoney)>parseInt(maxWithdrawMoneyOneTime)){
					layer.msg('单笔不得超过'+maxWithdrawMoneyOneTime+$(".languageCode").html(), {icon: 2});
					return false;
				}else{
					if(transactionMoney.length>0){
						for (i = 0; i < transactionMoney.length; i++) {
					         j = strTemp.indexOf(transactionMoney.charAt(i));
					         if (j == -1) {
					        	 layer.msg('金额必须为数字', {icon: 2});
					        	 return false;
					         }else{
					        	var witfee= $("#witfee").val()
					        	 var actualMoney = parseInt(transactionMoney) *(witfee/100);
								 var actualMoney_b = parseInt(transactionMoney) - actualMoney;
								 $("#true_daozhang").empty().val("手续费"+actualMoney+$(".languageCode").html()+",实际到账金额 "+actualMoney_b+$(".languageCode").html());
					         }
					     }
					}else{
						$("#true_daozhang").empty().val("");
					}
				}
			})
			
			//确认提现
			$("#submit").on("click",function(){
				records()
				
			})
			//手机确认
			$(".submit-phone").on("click",function(){
				
				var valicode1=$("#phone_verifyCode1").val();
				var valicode2=$("#phone_verifyCode2").val();
				var valicode=valicode1;
				if(valicode1==""){
					valicode=valicode2;
				}
				if(!valicode){
					layer.msg('短信验证码不能为空', {icon: 2});
					return ;
				}
				records(valicode)
			});
			//谷歌确认
			$(".submit-google").on("click",function(){
				debugger;
				var valicode1=$("#googlee_verifyCode1").val();
				var valicode2=$("#googlee_verifyCode2").val();
				var valicode=valicode1;
				if(valicode1==""){
					valicode=valicode2;
				}
				if(!valicode){
					layer.msg('谷歌验证码不能为空', {icon: 2});
					return ;
				}
				records(valicode)
				
			})
			
			$('.dialog-close').on('click',function(){
				$(this).parent().parent().hide()
			})
			//双重验证的切换
			$('.btns').find('span').on('click',function(){
								      var ind=$(this).index();
								      $(this).addClass('cur').siblings().removeClass('cur');
								      if(ind==0){
								          $('.verify-form').show();
								          $('.verify-form1').hide();
								      }else{
								    	  $('.verify-form1').show();
								    	  $('.verify-form').hide();
								      }
								    })
			//
		},
		bank : function(){
			if(tokenId!=""){
				//加载银行
				$.ajax({
					url: ctx_ + "/mobile/user/apprmbdeposit/selectRedisBank.do",
					type:"post",
					data : {tokenId:tokenId},
					dataType:'json',
					success:function(data){
						;
						if(data!="" && data!=null){
							if(data.success){
								var obj = eval(data.obj.key);
								var html = "";
								var bank=eval(obj)
								$("#bankname").val(bank[0].itemName)
								for(var i=0;i<bank.length;i++){
									html += "<option value="+bank[i].itemName+">"+bank[i].itemName+"</option>"
								}
								$("#bank").append(html);
							}
						}
					}
				});
				//选择银行
				$("#selbank").on("change",function(){
					$("#bankname").val($(this).val());
				})
				//查询省
				$.ajax({
					type : "POST",
					dataType : "JSON",
					url : ctx_ + "/mobile/user/appbankcode/findArea.do",
					data : {tokenId:tokenId}, 
					cache : false,
					success : function(data) {
						var obj = eval(data.obj);
						var html = "";
						for(var i=0;i<obj.length;i++){
							html += "<option value="+obj[i].key+">"+obj[i].province+"</option>"
						}
						$("#p1").append(html);
					}
				})
				//获取选中的省
				$("#p1").on("change",function(){
					//得到下拉列表的相应的值
					var id = this.value;
					var selectName = $(this).find("option:selected").val();
					//给隐藏文本框赋值
					$("#provinceValue").val(selectName);
					$("#c1 option").remove();
					//查询市
					$.ajax({
						type : "POST",
						dataType : "JSON",
						url : ctx_ + "/mobile/user/appbankcode/appcity/"+$("#provinceValue").val(),
						data : {tokenId:tokenId},
						cache : false,
						success : function(data) {
							var obj = eval("["+data.obj+"]");
							var html = "";
							for(var i=0;i<obj.length;i++){
								html += "<option value="+obj[i].city+">"+obj[i].city+"</option>"
							}
							$("#c1").append(html);
						}
					})
				});
				//添加银行卡
				$("#addBankcard").on("click",function(){
				var bankname =$("#bank  option:selected").text();//银行
					var p1 = $("#p1  option:selected").text();//省
					var c1 = $("#c1").val();//市
					var subBank = $("#subBank").val();//开户支行
					var subBankNum = 123;//银行机构代码
					/*var cardName = $("#name").val();*///持卡人
					var ming =$("#ming").val();//持卡名
					var xing =$("#xing").val();//持卡姓
					var account = $("#account").val();//银行卡号
					
					if(!bank){
						layer.msg("请选择银行",{icon:2});
						return false;
					}
					if(p1=="-1"){
						layer.msg("请选择银行卡所在地",{icon:2});
						return false;
					}
					if(!subBank){
						layer.msg("开很支行不能为空",{icon:2});
						return false;
					}
					if(!account){
						layer.msg("银行卡号不能为空",{icon:2});
						return false;
					}
					//保存银行卡
					$.ajax({
						 type: "post",
				         url: ctx_ + "/mobile/user/appbankcode/saveBankCard.do",
				         data : {bankname:bankname,p1:p1,c1:c1,subBank:subBank,subBankNum:subBankNum,trueName:ming,surName:xing,account:account,tokenId:tokenId},
				         dataType: "JSON",
				         success: function(data) {
				        	 if(data!=undefined){
				        		 if(data.success){
				        			 sessionStorage.setItem("cardNumber", data.obj.cardNumber);
				        			 layer.msg("添加成功",{icon:1,time:1500},function(){
				        			 window.open(basepath + "/html/user_exchange/rmbot.html?tokenId="+tokenId ,"_self");
				        			 })
				        		 }else{
				        			 layer.msg(data.msg, {icon: 2});
				        			 if(data.msg=="请重新登录"){
				        				 window.open(basepath + "/html/user/login.htm","_self");
				        			 }
				        		 }
				        	 }
				         }
					})
				})
			}
		},
		//发送短信
		sendsms :function(){
			
			//发送短信
			$("#getPhoneCode1").on("click",function(){
				debugger;
				$("#getPhoneCode1").attr("disabled","disabled");
				$(this).html("已发送");
				$.ajax({
					type : "post",
					url : _ctx + "/mobile/user/apppersondetail/getPhone",
					data : {
						tokenId : tokenId,
					},
					cache : false,
					dataType : "json",
					success : function(data) {
						if(data){
							debugger;
							if(data.success){
								layer.msg("发送成功", {icon: 1})

								var time = 120;
							window.clearInterval(pageTimer["setaphone"]);
							// 开启点击后定时数字显示
							pageTimer["setaphone"] = window.setInterval(function() {
								
								time = time - 1;
								if (time == 0) {
									
									$("#getPhoneCode1").html("点击");
									$("#getPhoneCode1").removeAttr("disabled");// 按钮可用
									$("#getPhoneCode1").html("重新发送");// 按钮可用
									window.clearInterval(pageTimer["setaphone"]);
								} else {
									$("#getPhoneCode1").html(time+"秒重新发送" );
								}

							}, 1000);

							}else{
								$("#getPhoneCode1").removeAttr("disabled");// 按钮可用
								layer.msg(data.msg, {icon: 2})
								if(data.msg=="请登录或重新登录"){
									window.open(basepath + "/html/user/login.htm","_self");
								}
							}
						}else{
							$("#getPhoneCode1").removeAttr("disabled");// 按钮可用
							layer.msg(fasongshibai, {icon: 2})
						}
					},
					error : function(e) {

					}
				});

			});
			//发送短信
			$("#getPhoneCode2").on("click",function(){
				debugger;
				$("#getPhoneCode2").attr("disabled","disabled");
				$(this).html("已发送");
				$.ajax({
					type : "post",
					url : _ctx + "/mobile/user/apppersondetail/getPhone",
					data : {
						tokenId : tokenId,
					},
					cache : false,
					dataType : "json",
					success : function(data) {
						if(data){
							debugger;
							if(data.success){
								layer.msg("发送成功", {icon: 1})

								var time = 120;
							window.clearInterval(pageTimer["setaphone"]);
							// 开启点击后定时数字显示
							pageTimer["setaphone"] = window.setInterval(function() {
								
								time = time - 1;
								if (time == 0) {
									
									$("#getPhoneCode2").html("点击");
									$("#getPhoneCode2").removeAttr("disabled");// 按钮可用
									$("#getPhoneCode2").html("重新发送");// 按钮可用
									window.clearInterval(pageTimer["setaphone"]);
								} else {
									$("#getPhoneCode2").html(time+"秒重新发送" );
								}

							}, 1000);

							}else{
								$("#getPhoneCode2").removeAttr("disabled");// 按钮可用
								layer.msg(data.msg, {icon: 2})
								if(data.msg=="请登录或重新登录"){
									window.open(basepath + "/html/user/login.htm","_self");
								}
							}
						}else{
							$("#getPhoneCode2").removeAttr("disabled");// 按钮可用
							layer.msg(fasongshibai, {icon: 2})
						}
					},
					error : function(e) {

					}
				});

			});
			
		}
		
	}
})
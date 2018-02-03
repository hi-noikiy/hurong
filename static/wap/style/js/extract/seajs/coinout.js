define(function(require, exports, module) {
	require("style/css/mobile/css/css.css");
	require("style/js/mobile/js/zepto.js");
	require("style/js/mobile/js/public.js");
	require("style/js/layer/css/layer.css");
	require("style/js/form.js");
	require("style/js/base.js")

	this.md5 = require("style/js/hrymd5")
	this.validate = require("style/js/validate");
	var poundage_type=null;
	
	require("style/js/extract/common/coinout.js");
	var maxpage=null;
	
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
	
	function information(tokenId){
		var current =sessionStorage.getItem("coinout_page");
		var limit=4;
		var offset=(current*limit)-limit;
		debugger
		$.ajax({
			   type: "POST",
			   url : ctx_ + "/mobile/user/appbtc/list",
			   data: {
				   tokenId : tokenId,
				   limit:limit,
				   offset:offset,
				   sortOrder:"asc" 
			   },
			   dataType : 'json',
			   success: function(data){
				   if(data){
					  
					   var rows=data.rows;
					$("#list").html("<tr><th>到账数量</th><th>手续费</th><th>实际到账货币</th><th>时间</th><th>状态</th><th>驳回原因</th></tr>");
					   for(var i=0;i<rows.length;i++){
						   var status=rows[i].status;
						   var remark =rows[i].rejectionReason
							if(remark==null){
								remark="-"
							}
							//1待审核 2已完成 3已否决
							 if(status==1){
								status="待审核"
							}else if(status==2){
								status="已完成"
							}else if(status==3){
								status="已否决"
							}
							 var transactionMoney=rows[i].transactionMoney;
							 var fee=rows[i].fee;
							 var Actual_account=transactionMoney-fee;
							 $("#list").append("<tr><th>"+rows[i].transactionMoney+"</th><th>"+rows[i].fee+"</th><th>"+Actual_account+"</th><th>"+rows[i].created+"</th><th>"+status+"</th><th>"+remark+"</th></tr>");
					   }
					   maxpage=data.page;
					   page(current,maxpage);
					   
				   }
			   }
			});
			
	}
	
	// / 查询提币费率
	function rate(symbol, tokenId) {
		$.ajax({
			url : ctx_ + "/mobile/user/appbtc/findcurrcy",
			type : "post",
			data : {
				coinCode : symbol,
				tokenId : tokenId
			},
			dataType : 'json',
			success : function(data) {
				if(data.success){
					//单次提币最小数量
					$("#leastPaceNum").html(data.obj[0].leastPaceNum)
					//一天提币最大数量
					$("#oneDayPaceNum").html(data.obj[0].oneDayPaceNum)
					$("#select").html("")
					if(data.obj[2]==1){
						//固定费率
						var rate=data.obj[1]
						$("#rate").val(rate);
						$("#select").html("<option>"+rate+"</option>")
						poundage_type=1;
					}
					if(data.obj[2]==2){
						poundage_type=2;
						//手动配置
						 $("#fee").show();
						var rates=data.obj[1];
						rates=rates.split(",");
						$("#rate").val(rates);
						for(var i=0;i<rates.length;i++){
							$("#select").append("<option>"+rates[i]+"</option>")
						}

					}
					
					
					
					
				}
			}
		});

	}

	// 初始化提币地址
	function address(tokenId,symbol) {
		$("#address").html("")

		$.ajax({
			url : ctx_ + "/mobile/user/appbtc/selectwallet",
			type : "post",
			data : {
				tokenId : tokenId
			},
			dataType : 'json',
			success : function(data) {
				if(data.success){
					var rows = data.obj
					if (rows.length <= 0) {
						$("#address")
						.html(
						"<li><p style='text-align: center; margin-top: 0.2rem'>暂无提币地址!</p></li>")
					}

					for (var i = 0; i < rows.length; i++) {
						if(rows[i].currencyType==symbol){
							$("#address").append(
									"<li>"
									+ "<p>虚拟货币类型："
									+ rows[i].currencyType
									+ "</p>"
									+ "<p>公钥号："
									+ rows[i].publicKey
									+ "</p>"
									+ "<p>备注："
									+ rows[i].remark
									+ "</p>"
									+ "<p style='text-align:right;padding-right:3%;'>"
									+ "<button style='margin-right:10px;' class='select' value="
									+ rows[i].publicKey
									+ " >选择</button>"
									+ "<button class='delete' value="
									+ rows[i].id
									+ " style='float: right;' >删除</button>"
									+ "</p>" + "</li>");
						}

					}
				}else{
					layer.msg(data.msg, {
						icon : 2
					})
					if(data.msg=="请登录或重新登录"){
						window.open(basepath + "/html/user/login.htm","_self");
					}
				}
			}
		});

	}

	// 提币
	function addCoin(tokenId,wv_valicode) {
		var btcKey = $("#btcKey").html();
		var coinType = $("#coinType").val();
		var btcNum = $("#btcNum").val();
		//固定的
		var shouxufei = $("#currcy").html();

		if(btcKey==null){
			layer.msg("请选择提币地址", {
				icon : 2
			});
			return false;
		}
		if(btcNum ==null || btcNum==""){
			layer.msg("请输入提币数量", {
				icon : 2
			});
			return false;
		}

		$.ajax({
			url : ctx_ + "/mobile/user/appbtc/getbtc",
			type : "post",
			dataType : 'json',
			data : {
				btcKey : btcKey,
				coinType : coinType,
				btcNum : btcNum,
				tokenId : tokenId,
				pacecurrecy : shouxufei,
				valicode:wv_valicode
			},
			success : function(data) {
				if (data != "" && data != null) {
					if (data.success) {
						layer.msg("提币申请成功", {
							icon : 1,item :1000
						},function(){
							window.open(basepath + "/html/user/user-index.html?tokenId="+tokenId,"_self");
						})
					} else {
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

			}

		})

	}

	module.exports = {

			sendsms :function(){
				var str = location.href;
				var meter = str.split("?")[1];
				var tokenId = meter.split("&")[0];
				tokenId = tokenId.split("=")[1];
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
				
						
					},
			init : function() {
				var str = location.href;
				var meter = str.split("?")[1];
				var tokenId = meter.split("&")[0];
				tokenId = tokenId.split("=")[1];
				var symbol = meter.split("&")[1];
				symbol = symbol.split("=")[1];
				var hotMoney = meter.split("&")[2];
				hotMoney = hotMoney.split("=")[1];
				$("#hotMoney").html(hotMoney + " " + symbol)
				$("#newadd").attr(
						"href",
						"./newadd.html?tokenId=" + tokenId + "&symbol=" + symbol
						+ "&hotMoney=" + hotMoney)
						var coinType = sessionStorage.getItem("coinType")
						var btcKey = sessionStorage.getItem("btcKey")
						if(coinType!=null||btcKey!=null){
							$("#coinType").val(coinType); 
							$("#btcKey").html(btcKey);
							sessionStorage.removeItem("coinType")
							sessionStorage.removeItem("btcKey")
						}
				//加载提币历史
				information(tokenId);
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
					   information(tokenId);
				});  
				
				
				//返回
				$("#go").on("click",function(){

					window.open(basepath + "/html/user/user-index.html?tokenId="+tokenId,"_self");
				});

				//页面提币默认赋值
				$(".symbol").html(symbol);

				if (tokenId != null) {
					var str = window.parent.document.referrer;
					if (str.indexOf("newadd") >= 0) {
						// 隐藏提币
						$('#content1').hide();
						// 显示提币地址列表
						$('#content2').show();
					}

					if (tokenId != null) {
						var str = window.parent.document.referrer;
						;
						if (str.indexOf("newadd") >= 0) {
							console.log('jiayan')
							// 隐藏提币
							$('#content1').hide();
							// 显示提币地址列表
							$('#content2').show();
						}

						$("#addCoin").on("click", function() {
							addCoin(tokenId);
						})
						//手机确认
						$(".submit-phone").on("click",function(){
							debugger;
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
							addCoin(tokenId,valicode)
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
							addCoin(tokenId,valicode)
							
						})
						// 提币费率
						rate(symbol, tokenId);
						$("#btcNum").html(0)
						var account = null;
						$('#btcNum').bind('input propertychange', function() {
							if(poundage_type==1){
								var btcNum = $(this).val();
								var rate=$("#select").val();
								var fee = btcNum * (rate / 100);
								$("#currcy").html(fee)
								$("#true_coin").val(btcNum - fee);
							}else{
								var btcNum = $(this).val();
								var rate=$("#select").val();
								$("#currcy").html(rate)
								if(btcNum==null||btcNum==""){
									$("#true_coin").val(0);
								}else{
									$("#true_coin").val(btcNum-rate);
								}
							}
							
						})
						$("#select").click(function(){
							var btcNum = $("#btcNum").val();
							var rate=$("#select").val();
							$("#currcy").html(rate)
							if(btcNum==null||btcNum==""){
								
							}else{
								$("#true_coin").val(btcNum-rate);
							}
							
						});
						
						
						// 初始化提币地址
						address(tokenId,symbol);
						// 选择
						$("body").on("click", ".select", function() {
							var btcKey = $(this).val();

							sessionStorage.setItem("coinType", symbol)
							sessionStorage.setItem("btcKey", btcKey)
							window.location.reload();

						});
						// 删除
						$("body").on("click", ".delete", function() {
							var id = $(this).val();
							layer.confirm('您确定要删除吗？', {
								btn: ['确定','取消'] //按钮
							}, function(){
								$.ajax({
									url : ctx_ + "/mobile/user/appbtc/delete",
									type : "post",
									data : {
										id : id
									},
									dataType : 'json',
									success : function(data) {

										if (data) {
											if (data.success) {
												;
												layer.msg("成功", {
													icon : 1
												});
												address(tokenId,symbol);
											} else {
												layer.msg("失败", {
													icon : 2
												});
											}
										}
									}

								})
							}, function(){
								layer.msg("取消删除");
							});


						});

					}
				}
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

			}
	}
})
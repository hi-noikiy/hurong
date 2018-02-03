define(function(require,exports,module){
	this._table = require("js/base/table");
	this.validate = require("js/base/validate");
	require('lib/google/css/second.css');
	require('lib/google/css/global.css');
	require("js/base/secondvail");
	this.firstvail = require("js/base/firstvail");

	module.exports = {
			init : function(){

				//法币的位数
				var keepDecimalForRmb = $("#keepDecimalForRmb").val();
				
				var oneNum = Math.floor(Math.random()*9+1);
				var twoNum = Math.floor(Math.random()*9+1);
				var xiaoshu = parseFloat("0."+oneNum+twoNum);
				$("#xiaoshu").html("."+oneNum+twoNum);

				tool.switchTab();
				tool.switchTab({ele:".form_box",tabList:".payment_li",boxList:".payment_form_box"});
				/***************充值表单******************************/
				$(".form .recharge_num").each(function(index, elemesssnt) {
					$(this).on('blur',function(){
						$(this).parents('form').find('.rechargecount').html('0.00');
						if(isNumber(this.value)){
							var num = parseFloat(this.value);
							var maxNum = parseFloat($(this).parents('form').find('input[name="maxnum"]').val());
							var minNum = parseFloat($(this).parents('form').find('input[name="minnum"]').val());

							if(maxNum<num)
							{
								showMsg(chongzhijinebunengdayu+"￥"+maxNum.toFixed(2)+yuan);
								this.value="";
								return;
							}else if(minNum>num)
							{
								showMsg(chongzhijinebunengdiyu+"￥"+minNum.toFixed(2)+yuan);
								this.value="";
								return;
							}
							else
							{
								var fee = parseFloat($(this).parents('form').find('input[name="fee"]').val());
								var total = num * (1-fee);

								var rechargeType = $(this).attr('recharge-type');
								//if(rechargeType == 'offline')
								//{
								total += parseFloat($(this).parents('form').find('input[name="randNum"]').val());
								//}
								var total = total.toFixed(2);
								$(this).parents('form').find('.rechargecount').html(total);

								return;
							}
						}
						this.value="";
					});
				});

				$("#Popup").hide();

				$.ajax({
					type : "POST",
					dataType : "JSON",
					url : _ctx + "/user/rmbdeposit/selectRedisBank",
					cache : false,
					success : function(data) {
						var json = eval(data.obj);
						var html = "";

						for(var i=0;i<json.length;i++){
							html += "<li class='morebank' id='li"+json[i].id+"'><input type='hidden' value='"+json[i].id+"'/><input type='hidden' name='bankName' id='bankName' value='"+json[i].itemName+"'/>" +
							"<img width='128px' height='38px' src="+_ctx+"/"+json[i].remark2+"></li>";
						}
						html += "<li id='showOther' class='morebank' style='display: none;' ><a >"+chakangengduo+"+</a></li>"+
						"<li id='closeOther'  class='morebank' style='display: block;' ><a >"+shouqi+" -</a></li>";
						//<i class='icon_checked'></i>
						$("#bankList").append(html);
						var bankpage = $('#bankList').children('li');
						for(var i=8;i<bankpage.length;i++){
							if($(bankpage[i]).attr("id")=="showOther"){
								$(bankpage[i]).css("display","");
								continue;
							}
							$(bankpage[i]).css("display","none");
						}
					}
				})

				var bankFlag = false;
				var remitterFlag = 0;
				var bankCodeFlag = 0;
				var bankAmountFlag = 0;
				var selectedBankName = 0;

				//查看更多
				$("#bankList").on("click","li[id=showOther]",function(){
					var bankpage = $('#bankList').children('li');
					for(var i=0;i<bankpage.length;i++){
						if($(bankpage[i]).attr("id")=="showOther"){
							$(bankpage[i]).css("display","none");
							continue;
						}
						$(bankpage[i]).css("display","");
					}
				})

				//收起
				$("#bankList").on("click","li[id=closeOther]",function(){
					var bankpage = $('#bankList').children('li');
					for(var i=8;i<bankpage.length;i++){
						if($(bankpage[i]).attr("id")=="showOther"){
							$(bankpage[i]).css("display","");
							continue;
						}
						$(bankpage[i]).css("display","none");
					}
				})
				//高亮
				$("#bankList").on("click","li",function(){
					$("#bankList li i").each(function(){
						$("#bankList li i").removeClass("icon_checked");
					});
					var html = "<i class='icon_checked'></i>";
					$(this).append("<i class='icon_checked'></i>");
					bankFlag = true;
					selectedBankName = $(this).find('input').eq(1).val();
					$('#bank_name').val(selectedBankName)
				})
//				//汇款人姓名
//				$("#remitter").on("blur",function(){
//					var name = this.value;
//					if(name==''){
//						layer.msg(huikuanrenxiangmingbitian, {icon: 2});
//						remitterFlag = 1;
//					}else{
//						//var reg = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
//						if(validate.isNumber(name)){
//							layer.msg(huikuanrenxingmingnumber, {icon: 2});
//							remitterFlag = 2;
//						}else{
//							remitterFlag = 0;
//						}
//					}
//				})
				//银行卡号
				$("#bankCode").on("input",function(){
					var code = this.value;
					$('#bank_code').val(code)
					if(!validate.isNumber(code)){
						$("#bankCode_message").html(yinhangkahaobixuweishuzi);
					}else{
						$("#bankCode_message").html("");
					}

				})
				//金额
				$("#bankAmount").on("input",function(){
					
					var money = parseFloat(this.value)+xiaoshu;
					$('#bank_Amount').val(money)
					var minRechargeMoney = $("#minRechargeMoney").val();//单笔不能少于
					if(!validate.isNumber(money)){
						$("#bankAmount_message").html(chongzhijinebixuweishuzi);
					}else{
						$("#bankAmount_message").html("");
						
						if(parseInt(money)<parseInt(minRechargeMoney)){
							$("#bankAmount_message").html(danbibunengshaoyu+minRechargeMoney);
							bankAmountFlag = 3;
						}else{
							bankAmountFlag = 0;
							var fee = $("#rechargeFeeRate").val()/100*money;
							$("#promptShow").empty().text(shouxufeie+fee.toFixed(keepDecimalForRmb)+"RMB, "+shijidaozhangjine+(money-fee).toFixed(keepDecimalForRmb)+"RMB ,  "+qingyangeanzhaohuikuan);
						}
					}
				})
				//生成银行汇款单
				$("#generate_single").on("click",function(){
					var minRechargeMoney = $("#minRechargeMoney").val();
					if(bankFlag==false){
						layer.msg(qingxuanzeyinhang, {icon: 2});
						return false;
					}
					if(remitterFlag==1){
						layer.msg(huikuanrenxiangmingbitian,{icon: 2});
						return false;
					}/*else if(remitterFlag==2){
					layer.msg('汇款人姓名必须为中文', {icon: 2});
					return false;
				}*/
					if($('#remitter').val()==""){
						layer.msg(huikuanrenxiangmingbitian,{icon: 2});
						return
					}else if(validate.isNumber($('#remitter').val())){
						layer.msg(huikuanrenxingmingnumber, {icon: 2});
						return
					}
					if($('#surName').val()==''){
						layer.msg(huikuanrenxiangmingbitian,{icon: 2});
						return
					}else if(validate.isNumber($('#surName').val())){
						layer.msg(huikuanrenxingmingnumber, {icon: 2});
						return
					}
					var bankCode = $("#bankCode").val();
					if(bankCode==undefined||bankCode==""){
						$("#bankCode_message").html(yinhangkahaobunengweikong);
						return false;
					}
					if(!validate.isNumber(bankCode)){
						$("#bankCode_message").html(yinhangkaisunmber);
						return false;
					}

					var bankAmount = $("#bankAmount").val();
					if(bankAmount==undefined||bankAmount==""){
						$("#bankAmount_message").html(chongzhijinebunengweikong);
						return false;
					}
					if(!validate.isNumber(bankAmount)){
						$("#bankAmount_message").html(chongzhijinebixuweishuzi);
						return false;
					}
					if(parseInt(bankAmount)>99999999999999){
						layer.msg(jingeguoda, {icon: 2});
						return false;
					}
					var minRechargeMoney = $("#minRechargeMoney").val();//单笔不能少于
					if(parseInt(bankAmount)<parseInt(minRechargeMoney)){
						$("#bankAmount_message").html(danbibunengshaoyu+minRechargeMoney);
						return false;
					}


					$("#generate_single").attr("disabled",true);
					$("#generate_single").empty().text("Loading...");
					$("#cg_bankForm_offline").ajaxSubmit({
						type: "post",
						url: _ctx + "/sencodvail",
						dataType: "JSON",
						data : {
				        	 selectedBankName:selectedBankName,xiaoshu:xiaoshu,type:'7'},
						//resetForm : true,
						success: function(data) {
					         if(data.success){
									if(data.success){
										var phone =data.obj.phoneState;
										var google=data.obj.googleState;
										
										if(google==1&&phone==0){
											
											$(".verifyLayout1").show();
											$('.dialog-close').on('click',function(){
												$(this).parent().parent().hide()
											})
											
										}else if(google==0&&phone==1){
											//alert(data.obj.uuid)
											$('#key').val(data.obj.uuid)
											$(".verifyLayout").show();
											$('.dialog-close').on('click',function(){
												$(this).parent().parent().hide()
											})

										}else if(google==1&&phone==1){
											
											$('#mobile-form').css('display','none');
											$(".verifyLayout2").show();
											 $('.verify-form1').hide();
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
										    $('.dialog-close').on('click',function(){
												$(this).parent().parent().hide()
											})
										
										}else{
											firstvail.sendvail("rmbdeposit");
											//window.location.href = _ctx+"/user/center";
										}
									}else{
										
										layer.msg(data.msg, {icon: 2})
									}
								}else{
					        	 layer.alert(data.msg);
					        	 
					         }
					         }
					})
				})



				$("#sendBtn,#sendBtn1").on("click",function(){
					var username=	$("#username").val();
					$(this).attr("disabled","disabled");
					$(this).html(yifasong);
					$.ajax({
						type : "post",
						url : _ctx + "/sms/smsPhone",
						data:{username:username},
						cache : false,
						dataType : "json",
						success : function(data) {
							if(data){
								if(data.success){
									layer.msg(fasongchenggong, {icon: 1})

									var time = 120;
									window.clearInterval(pageTimer["login"]);
									// 开启点击后定时数字显示
									pageTimer["login"] = window.setInterval(function() {
										time = time - 1;
										if (time == 0) {
//											$("#sendBtn1").html("点击");
											$("#sendBtn1").removeAttr("disabled");// 按钮可用
											$("#sendBtn1").html(chongxinfasong);// 按钮可用
//											$("#sendBtn").html("点击");
											$("#sendBtn").removeAttr("disabled");// 按钮可用
											$("#sendBtn").html(chongxinfasong);// 按钮可用
//											clearInterval(pageTimer["setapw"]);
											clearInterval(pageTimer["login"]);
										} else {
											$("#sendBtn").html(time+miaochongxinfasong );
											$("#sendBtn1").html(time+miaochongxinfasong );
										}

									}, 1000);

								}else{
									$("#sendBtn").removeAttr("disabled");// 按钮可用
									$("#sendBtn1").removeAttr("disabled");// 按钮可用
									layer.msg(data.msg, {icon: 2})
								}
							}else{
								$("#sendBtn1").removeAttr("disabled");// 按钮可用
								$("#sendBtn").removeAttr("disabled");// 按钮可用

								layer.msg(fasongshibai, {icon: 2})
							}
						},
						error : function(e) {

						}
					});

				});





				//分页bootstrapTable插件
				var conf = {

						url : _ctx + "/user/rmbdeposit/list",
						columns : [ {
							field : 'state',
							checkbox : true,
							align : 'center',
							valign : 'middle',
							value : "id",
							visible : false,
							searchable : false
						},
						{
							title : 'id',
							field : 'id',
							align : 'center',
							visible : false,
							sortable : false,
							searchable : false
						},
						{
							title : chongzhileixingone,
							field : 'transactionType',
							align : 'center',
							visible : true,
							sortable : false,
							searchable : true,
							formatter:function(value,row,index){
								//1线上充值,2线上提现 3线下充值 4线下取现
								if(value==1){
									return xianshangchongzhi;
								}else if(value==2){
									return xiashangtixian;
								}else if(value==3){
									return xianxiatixian;
								}else if(value==3){
									return xianxiaquxian;
								}
							}
						},
						{
							title : chongzhijine,
							field : 'transactionMoney',
							align : 'center',
							visible : true,
							sortable : false,
							searchable : true
						},
						{
							title : shouxufei,
							field : 'fee',
							align : 'center',
							visible : true,
							sortable : false,
							searchable : true
						},
						{
							title : dingdanhao,
							field : 'transactionNum',
							align : 'center',
							visible : true,
							sortable : false,
							searchable : true
						},
						{
							title : shijian,
							field : 'created_long',
							align : 'center',
							visible : true,
							sortable : false,
							searchable : true,
							formatter : function(value,row,index){
								return TimestampFormat('Y-m-d H:i:s', value/1000);
							}
						},
						{
							title : zhaungtai,
							field : 'status',
							align : 'center',
							visible : true,
							sortable : false,
							searchable : true,
							formatter:function(value,row,index){
								//1待审核 2已完成 3已否决
								if(value==1){
									return daishenhe;
								}else if(value==2){
									return yiwancheng;
								}else if(value==3){
									return yifoujue;
								}
							}
						},{
							title : bohuiyuanyin,
							field : 'rejetionReason',
							align : 'center',
							visible : true,
							sortable : false,
							searchable : true,
							formatter:function(value,row,index){
								//1待审核 2已完成 3已否决
								if(row.rejectionReason!=null){
									return row.rejectionReason;
								}else{
									return '-';
								}
							}
						},{
							title : caozuo,
							align : 'center',
							visible : true,
							sortable : false,
							searchable : false,
							formatter:function(value,row,index){
								return '<a class="xiangqing" transactionnum="'+row.transactionNum+'">'+chakanxiangqing+'</a>';
							}
						}
						],
						queryParams : function queryParams(params) {
							return {
								limit:params.limit,
								offset:params.offset,
								sortOrder: params.order,
								status:$($("#status").find(".selected")[0]).attr("value"),
								transactionType:"chongzhi"
							};
						}
				}
				_table.initTable($("#table"), conf);

				//充值筛选条件
				$("#status").on("click","a",function(){
					$(this).siblings().removeClass('selected');
					$(this).addClass('selected');
					$("#table").bootstrapTable('refresh',null);
				})
				
				/**
				 * 查看订单详细信息
				 */
				$('#table').on('click','.xiangqing',function(){
					//alert($(this).attr('transactionnum'))
					var transactionNum=$(this).attr('transactionnum')
					layer.open({
						  title: false,
						  type: 2,
						  shadeClose: false,
						  move : false,
						  scrollbar  : false,
						  shade: 0.8,
						  area: ['33%', '70%'],
						  content: _ctx+"/user/rmbdeposit/details/"+transactionNum
					}); 
					
				})
			}
	}
})

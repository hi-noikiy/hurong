define(function(require, exports, module){
	require("style/css/mobile/css/css.css");
	require("style/js/layer/css/layer.css");
	require("style/js/mobile/js/zepto.js");
	require("style/js/index.js");
	require("style/js/mobile/js/public.js");
	require("style/js/Fnc.js");
	require("style/js/recharge.js");
	require("style/js/extract/common/user_ebank.js");
	//分页
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
        $("#Delta_records").html(str);

  
	
	
}



	//冲值记录
	function Delta_records(){
		var current =sessionStorage.getItem("coinout_page");
		var limit=4;
		var offset=(current*limit)-limit;
		$.ajax({
			url: ctx_ +"/user/rmbdeposit/list",
			type:"post",
			dataType:'json',
			data:{
				tokenId : tokenId,
				   limit:limit,
				   offset:offset,
				   sortOrder:"asc" ,
				transactionType:'chongzhi'},
			success:function(data){
				var rows =data.rows;
				$("#list").html("<tr><th>类型</th><th>金额</th><th>手续费</th><th>状态</th><th>驳回原因</th></tr>");
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
					
					$("#list").append("<tr><th>"+transactionType+"</th><th>"+rows[i].transactionMoney+"</th><th>"+rows[i].fee+"</th><th>"+status+"</th><th>"+rejectionReason+"</th></tr>")
				}
				
				  maxpage=data.page;
				   page(current,maxpage);
			}
		});
		
	}
	
	module.exports = {
		init : function(){
			$("#Popup").hide();
			
			//定义一个局部变量
			var bankName0 = '';
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
				//跳转到首页 我的账户 设置
				$("#bbjy").on("click",function(){
					window.open(basepath + "/html/coins.htm?tokenId="+tokenId,"_self");
				})
				$("#wdzh").on("click",function(){
					window.open(basepath + "/html/user/user-index.html?tokenId="+tokenId,"_self");
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
								
						
									$("#huikuanrenming").val(data.obj.user.truename);
									$("#huikuanrenxing").val(data.obj.user.surname);
								
							}else{
								layer.msg(data.msg, {icon: 2});
								window.open(basepath + "/html/user/login.htm","_self");
							}
						}
					}
				});
			}
			   sessionStorage.setItem("coinout_page", "1");
			   
			//冲值记录
			Delta_records();
			
			  //点击分页
			$("#Delta_records").on("click","ul li",function(){  
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
				Delta_records();
			});  
			
			
		
			//加载银行
			$.ajax({
				url: ctx_ + "/mobile/user/apprmbdeposit/selectRedisBank.do",
				type:"post",
				data : {tokenId:tokenId},
				dataType:'json',
				success:function(data){
					if(data!="" && data!=null){
						;
						if(data.success){
							var obj = eval(data.obj);
							var html = "";
							var key =eval(obj.key)
							$("#bankName").val(key[0].itemName);
							for(var i=0;i<key.length;i++){
								if(key[i].itemName=="招商银行"){
									html += "<option selected='selected' value="+key[i].itemName+">"+key[i].itemName+"</option>"
								}else{
									html += "<option value="+key[i].itemName+">"+key[i].itemName+"</option>"
								}
								
							}
							$("#selbank").append(html);
							$("#minRechargeMoney").val(data.obj.minRechargeMoney);
							$("#rechargeFeeRate").val(data.obj.rechargeFeeRate);
						}else{
							layer.msg(data.msg, {icon: 2});
						}
					}
				}
			});
			//选择银行
			$("#selbank").on("change",function(){
				;
				var value=$("#selbank").val();
				$("#bankName").val(value);
			})
			
			var bankCodeFlag = 0;
			var bankAmountFlag = 0;
			//银行卡号
			$("#bankcode").on("blur",function(){
				var code = this.value;
				if(code==''){
					layer.msg('银行卡号必填', {icon: 2});
					bankCodeFlag = 0;
				}else{
					 var i, j, strTemp;
				     strTemp = "0123456789";
				     if (code.length == 0) return 0
				     for (i = 0; i < code.length; i++) {
				         j = strTemp.indexOf(code.charAt(i));
				         if (j == -1) {
				        	 layer.msg('银行卡号必须为数字', {icon: 2});
				        	 bankCodeFlag = 1;
				         }else{
				        	 bankCodeFlag = 2;
				         }
				     }
				}
			})
			//金额
			$("#over_num").on("blur",function(){
				var money = this.value;
				if(money==''){
					layer.msg('金额不能为空', {icon: 2});
					bankAmountFlag = 00;
				}else{
					var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
					if(!reg.test(money)){
						layer.msg('金额格式不正确', {icon: 2});
						bankAmountFlag = 1;
					}else{
						bankAmountFlag = 2;
						var rechargeFeeRate=$("#rechargeFeeRate").val();
						var true_money=money*(rechargeFeeRate/100);
						true_money=money-true_money
						;
						$("#over_num_p").empty().text("实际到账金额:"+true_money+"RMB,请严格按照当前金额汇款。");
					}
				}
			})
			//生成充值汇款单
			$("#rmbsubmit").on("click",function(){
				if(bankCodeFlag==0){
					layer.msg('银行卡号必填', {icon: 2});
					return false;
				}else if(bankCodeFlag==1){
					layer.msg('银行卡号必须为数字', {icon: 2});
					return false;
				}
				if(bankAmountFlag==0){
					layer.msg('金额不能为空', {icon: 2});
					return false;
				}else if(bankAmountFlag==1){
					layer.msg('金额格式不正确', {icon: 2});
					return false;
				}
				
				$("#rmbsubmit").attr("disabled",true);
				$("#rmbsubmit").empty().text("Loading...");
				debugger;
				var bankName=$(".bankName p").text()
				$.ajax({
					url: ctx_ + "/mobile/user/apprmbdeposit/rmbdeposit.do",
					type:"post",
					data : {tokenId:tokenId,surname:$("#huikuanrenxing").val(),remitter:$("#huikuanrenming").val(),bankCode:$("#bankcode").val(),bankAmount:$("#over_num").val(),bankName:bankName},
					dataType:'json',
					success:function(data){
						if(data!="" && data!=null){;
							if(data.success){
								$("#rmbsubmit").attr("disabled",false);
								 $("#rmbsubmit").empty().text("生成银行汇款单");
								 
								 $("#bankAccount").empty().html("<b>"+data.obj.accountNumber+"</b>");
					         	 $("#bankName_").empty().html(data.obj.bankName);
					         	 $("#bankAddress").empty().html(data.obj.bankAddress);
					         	 $("#accountName").empty().html(data.obj.accountName);
					         	 $("#remittanceMoney").empty().html("<b>"+data.obj.transactionMoney+" (汇款时时填写金额)</b>");
					         	 $("#transactionNum").empty().text(data.obj.transactionNum);
					         
					         	 $("#remark").empty().html("<b>"+data.obj.remark+"  (汇款时备注内容)</b>");
					         	 $('#bremark').empty().html(data.obj.remark);
								 
					        	 layer.open({
								   type: 1,
								   title: '',
								   area: ['90%', 'auto'],
								   scrollbar: false,   // 父页面 滚动条 禁止
								   shadeClose: false, //点击遮罩关闭
								   content: $('#Popup'),
								   end: function () {
									   window.open(basepath + "/html/user/user-index.html?tokenId="+tokenId,"_self");
						            }
							     });
					        	 Delta_records();
							}
						}
					}
				});
			})
			
			
			$('.select-content').on('click',function(e){
			     $(document).one("click", function() {
			         $(".ui-select").find("ul").remove().end().find(".selected i").removeClass("rotate")
			      });

			      e.stopPropagation();
			     var that=$(this),
			          t = $(this).find('select option'),
			          m=that.find('.ui-select').find('ul').length,
			          n=$('<ul class="options"></ul>'),
			          s = $(".defaultValue").text(),
			          a = !1,
			          d = t && t.length || 0;
			          if(!m){
			            that.find(".selected i").addClass("rotate");
			            for(var i=0;i<d;i++){
			              var slist= $('<li value="" ' + (a ? 'class="current"' : "") + ">" + t[i].text + "</li>");
			              slist.on('click',function(){
			                var curcon=$(this).text(),
			                targetItem=$(this).parent().parent().parent().find('.defaultValue');
			                 targetItem.text(curcon);

			              })
			              n.append(slist);
			            }
			             return(
			             that.find('.ui-select').append(n)
			             )
			          }else{

			            $(".ui-select").find("ul").remove().end().find(".selected i").removeClass("rotate").end().prev("select").data("display", !1)
			          }





			   })
			//
		}
	}
})
define(function(require, exports, module) {
	require("style/css/mobile/css/css.css");
	require("style/js/mobile/js/zepto.js");
	require("style/js/mobile/js/public.js");
	require("style/js/layer/css/layer.css");
	require("style/js/form.js");

	this.md5 = require("style/js/hrymd5")
	this.validate = require("style/js/validate");

	require("style/js/extract/common/user-bank.js");
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
	//充币记录
	function Charge_record(){
		debugger;
		var current =sessionStorage.getItem("coinout_page");
		var limit=1;
		var offset=(current*limit)-limit;
		$.ajax({
			url: ctx_ +"/user/btc/list",
			type:"post",
			dataType:'json',
			data:{
				   limit:limit,
				   offset:offset,
				   sortOrder:"asc",type:'',status:''},
			success:function(data){
				debugger;
				var rows =data.rows;
				$("#list").html("<tr><th>数量(个)</th><th>手续费</th><th>币种</th><th>时间</th><th>状态</th><th>备注</th></tr>");
				for (var i = 0; i < rows.length; i++) {
					var status=rows[i].status;
					var remark =rows[i].remark
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
					
				
	
					$("#list").append("<tr><th>"+rows[i].transactionMoney+"</th><th>"+rows[i].fee+"</th><th>"+rows[i].coinCode+"</th><th>"+rows[i].created+"</th><th>"+status+"</th><th>"+remark+"</th></tr>")
				}
				  maxpage=data.page;
				   page(current,maxpage);
				
			}
		});
	}	
	
	module.exports = {
			
			
			getPublicKey : function(){
				var str=location.href; 
				var meter=str.split("?")[1];
				var tokenId=meter.split("&")[0];
				tokenId=tokenId.split("=")[1];
				var id=meter.split("&")[1];
				id=id.split("=")[1];
				//获得币地址
				$.ajax({
					type : "post",
					url : _ctx + "/mobile/user/appbtc/getPublicKey",
					cache : false,
					data:{
						accountId : id
					},
					dataType : "json",
					success : function(data) {
						;
						if(data!=undefined&&data.success&&data.obj!=undefined&&data.obj!=""){
							$("#publicKeyValue").html(data.obj);
							$("#createPublicKey").addClass("hide");
						}else{
							$("#publicKeyValue").html("");
							$("#createPublicKey").removeClass("hide");
						}
					},
					error : function(e) {
					}
				});
				//生成币地址
				$("#createPublicKey").on("click",function(){
					;
					$(this).attr("disabled","disabled");
					
					//$("#coincode3").html($(this).html());
					//$("#coincode4").html($(this).html());
					$.ajax({
						type : "post",
						url : _ctx + "/mobile/user/appbtc/createPublicKey",
						cache : false,
						data:{
							accountId : id
						},
						dataType : "json",
						success : function(data) {
							;
							if(data!=undefined){
								if(data.success&&data.obj!=undefined&&data.obj!=""){
									$("#publicKeyValue").html(data.obj);
									$("#createPublicKey").addClass("hide");
									$("#createPublicKey").removeAttr("disabled");
								}else{
									layer.msg(data.msg, {icon: 2,time:2000},function(){
										$("#createPublicKey").removeAttr("disabled");
									})
								}
							}else{
								$("#createPublicKey").removeAttr("disabled");
							}
							
						},
						error : function(e) {
							$("#createPublicKey").removeAttr("disabled");
						}
					});
					
				});
				
			},	

		// 初始化方法
		init : function() {
			debugger;
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
			Charge_record(tokenId);
		});  
			Charge_record();
			
			
			
		}

	}

})
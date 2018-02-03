define(function(require, exports, module) {

	this.md5 = require("js/base/utils/hrymd5");
	require("lib/jquery/jquery.tmpl.min.js");

	module.exports = {
		// 初始化方法
		init : function() {
			// banner图
			$.ajax({
				url : _ctx + "/banner",
				type : "post",
				dataType : 'json',
				success : function(data) {
					if (data.obj != null) {
						var html = ""	
						for (var i = 0; i < data.obj.length; i++) {
							if(i==data.obj.length-1){
								html += "<li style=\"background:url("+_ctx+"/"+data.obj[i].picturePath+") no-repeat center top; \"></li>";
							}else{
								html += "<li style=\"background:url("+_ctx+"/"+data.obj[i].picturePath+") no-repeat center top; display:none;\"></li>";
							}
							$("#banner_box").empty();
							$("#banner_box").append(html);
						}
					}
				}
			});

			// 最新动态
			$.ajax({
				url : _ctx + "/article",
				type : "post",
				dataType : 'json',
				data : {
					type : 4
				},
				success : function(data) {
					// 最新公告
					if (data != null && data.obj != null && data.obj[0] != null) {
						$("#news_zxgg").html(data.obj[0].title);
						$("#news_zxgg").attr("href", _ctx + "/news/info/" + data.obj[0].id);
					}
				}
			});
			
			// 新闻资讯
			$.ajax({
				url : _ctx + "/article",
				type : "post",
				dataType : 'json',
				data : {
					type : 5
				},
				success : function(data) {
					if (data.obj != null) {
						var html ="";
						for(var i=0 ; i<data.obj.length; i++){
							html += "<li><a href=\""+_ctx+"/news/info/"+data.obj[i].id+"\">"+data.obj[i].title+"</a><span>18-10-04</span></li>";
						}
						$("#xwzx").append(html);
					}
				}
			});
			// 行业动态
			$.ajax({
				url : _ctx + "/article",
				type : "post",
				dataType : 'json',
				data : {
					type : 6
				},
				success : function(data) {

					if (data.obj != null) {
						var html ="";
						for(var i=0 ; i<data.obj.length; i++){
							html += "<li><a href=\""+_ctx+"/news/info/"+data.obj[i].id+"\">"+data.obj[i].title+"</a><span>18-10-04</span></li>";
						}
						$("#hydt").append(html);
					}
				
				}
			});
			// 友情链接
			$.ajax({
				url : _ctx + "/friend",
				type : "post",
				dataType : 'json',
				success : function(data) {
					
					if (data.obj != null) {
						var html ="";
						for(var i=0 ; i<data.obj.length; i++){
							html += "<li><a target=\"_blank\" href=\""+data.obj[i].linkUrl+"\"><img src=\""+_ctx+"/"+data.obj[i].picturePath+"\" alt=\""+data.obj[i].name+"\"></a></li>";
						}
						$("#friendlink").html(html);
					}
					
				}
			});
			// 交易对区
			var loadChangeArea = function(){
				$.ajax({
					url : _ctx + "/klinevtwo/indexv1",
					type : "post",
					dataType : 'json',
					success : function(data) {
						
						if (data != undefined) {
							
							var  areaname ="";  //交易区
							for(var i=0 ; i<data.length; i++){
								if(i==0){
									areaname += " <li class=\"active\"  areaname=\""+data[i].areaname+"\"><i class=\"iconfont icon-star\"  ></i>"+data[i].areanameview+"</li>";
								}else{
									areaname += " <li areaname=\""+data[i].areaname+"\" ><i class=\"iconfont icon-star\"></i>"+data[i].areanameview+"</li>";
								}
							}
							$("#areaname").html(areaname);
							
							var html ="";  //交易区下的交易对
							if(data!=undefined&&data.length>1){
								//默认第一个交易区显示 
								var list = data[0].data;
								//创建交易区html
								html = createHtml(list);
							}
							$("#changearea").html(html);
						}
						
					}
				});
			}
			loadChangeArea();
			
			
			
		      //切换交易区
		      $('.close-notice').on('click',function(){
		        $(this).parent().slideUp();
		      })
		      
		      
		      //切换交易区
		      $('.trade-header ').on('click',"ul li",function(){
		        $(this).addClass('active').siblings().removeClass('active');
		        var areaname = $(this).attr("areaname");
		        
				$.ajax({
					url : _ctx + "/klinevtwo/indexv1",
					type : "post",
					dataType : 'json',
					success : function(data) {
						
						if (data != undefined) {
							
							var html ="";  //交易区下的交易对
							if(data!=undefined&&data.length>1){
								var list = data[0].data;
								//遍历数据获得选中的交易区数据
								for(var i=0 ; i<data.length ;i++){
									if(areaname==data[i].areaname){
										list = data[i].data;
									}
								}
								//创建html
								html = createHtml(list);
							}
							
							$("#changearea").html(html);
						}
						
					}
				});
		        
		      })
		      
		      
		      var createHtml = function(list){
		    	  	var html = "";
					for(var i=0 ; i<list.length; i++){
						var obj = list[i];
						
						if(obj.isShoucang){
							html += "<tr><td><i coincode=\""+obj.coinCode+"\" type=\"shoucang\" class=\"iconfont icon-star red-txt\"></i><a href=\""+_ctx+"/market?symbol="+obj.coinCode+"\"><img src=\""+_ctx+"/"+obj.picturePath+"\" style=\"height:20px\" >"+obj.coinCode+"</a></td>";
						}else{
							html += "<tr><td><i coincode=\""+obj.coinCode+"\" type=\"shoucang\" class=\"iconfont icon-star \"></i><a href=\""+_ctx+"/market?symbol="+obj.coinCode+"\"><img src=\""+_ctx+"/"+obj.picturePath+"\" style=\"height:20px\" >"+obj.coinCode+"</a></td>";
						}
						
						if(Number(obj.currentExchangPrice)>=Number(obj.lastExchangPrice)){
							html += "<td><span class=\"red-txt\"> "+obj.currentExchangPrice+"</span> </td>"
						}else{
							html += "<td><span class=\"green-txt\"> "+obj.currentExchangPrice+"</span> </td>"
						}
						
						if(Number(obj.RiseAndFall>=0)){
							html += "<td class=\"red-txt\"><i class=\"iconfont red-txt icon-arrows-4-7\"></i>+"+obj.RiseAndFall+"%</td>"
						}else{
							html += "<td class=\"green-txt\"><i class=\"iconfont red-txt icon-arrows-4-7\"></i>-"+obj.RiseAndFall+"%</td>"
						}
						
						if(Number(obj.currentExchangPrice)>=Number(obj.lastExchangPrice)){
							html += "<td><span class=\"red-txt\">"+obj.maxPrice+"/"+obj.minPrice+"</span> </td>"
						}else{
							html += "<td><span class=\"green-txt\">"+obj.maxPrice+"/"+obj.minPrice+"</span> </td>"
						}
						
						if(Number(obj.RiseAndFall>=0)){
							html += "<td><span class=\"red-txt\">"+obj.yesterdayPrice+"</span></td>"
						}else{
							html += "<td><span class=\"green-txt\">"+obj.yesterdayPrice+"</span></td>"
						}
						html += "<td>"+obj.transactionSum+"</td></tr>"
											
					}
					return html;
		      }
		      
		      
		      /**
		       * 添加收藏
		       */
		      $("#changearea").on("click","i[type=shoucang]",function(){
		    	  var coincode = $(this).attr("coincode");
		    	  //删除
		    	  if($(this).hasClass("red-txt")){
		    		  
		    			$.ajax({
							url : _ctx + "/removeCustomerCollection",
							type : "post",
							dataType : 'json',
							data : {
								coinCode : coincode
							},
							success : function(data) {
								
								if (data != undefined) {
									if(!data.success){
										layer.msg(data.msg);
									}else{
										layer.msg(data.msg);
										loadChangeArea();
									}
								}
								
							}
						});
		    		  
		    	  }else{
	    		  //添加
						$.ajax({
							url : _ctx + "/addCustomerCollection",
							type : "post",
							dataType : 'json',
							data : {
								coinCode : coincode
							},
							success : function(data) {
								
								if (data != undefined) {
									if(!data.success){
										layer.msg(data.msg);
									}else{
										layer.msg(data.msg);
										loadChangeArea();
									}
								}
								
							}
						});
		    	  }
		    	  
		    	  
		      });
		      
		      
			

		}

	}
});
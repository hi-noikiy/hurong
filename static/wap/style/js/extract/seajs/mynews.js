define(function(require, exports, module){
	require("style/css/mobile/css/css.css");
	require("style/js/layer/css/layer.css");
	require("style/js/mobile/js/zepto.js");
	require("style/js/mobile/js/public.js");
	
	module.exports = {
		init : function(){
			if(tokenId!=""){
				//跳转到首页
				$("#bbjy").on("click",function(){
					window.open(basepath + "/html/coins.htm?tokenId="+tokenId,"_self");
				})
				//我的账户
				$("#wdzh").on("click",function(){
					window.open(basepath + "/html/user/user-index.html?tokenId="+tokenId,"_self");
				})
				//设置
				$("#sz").on("click",function(){
					window.open(basepath + "/html/user/account.html?tokenId="+tokenId,"_self");
				})
				debugger;
				$.ajax({
					   type: "POST",
					   data:{tokenId:tokenId},
					   url: _ctx + "/mobile/user/appCenter/list",
					   success: function(data){
						  var obj= eval('(' + data + ')');
						  $('#msg').html("");
						  for(var i=0;i<obj.rows.length;i++){
									  $('#msg')
											.append(
													" <ul class='bullet_uls uls1 newsList'><li><a  style='color: #000; font-weight: bold;'>"
															+ obj.rows[i].title
															+ "</a><span>"
															+ obj.rows[i].sendDate
															+ "</span></li><div class='newsDetail col-xs-12'>"
															+ obj.rows[i].content
															+ "</div> </ul>")
						  }
					   }
					});
				
				
				
			}
			//消息详情
			/* $('active.newsList li').on('click',function(){
				 var that=$(this);
				 that.next('div').slideToggle();
				 
			 })*/
			$("#msg").on("click","ul li",function(){  
				var that=$(this);
				that.next('div').slideToggle();
			}); 

			//消息详情
			}
		}
	
})
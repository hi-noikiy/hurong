
define(function(require, exports, module) {
	this.validate = require("js/base/validate");
	this.md5 = require("js/base/utils/hrymd5");
	require('lib/clipboard.min.js')
	module.exports = {

		//初始化方法
		init : function(){
			//清除定时器

			clearPageTimer(); 
			google();


			function  google(){
				var username=$(".username").val();
				$.ajax({
					type : "post",
					url : _ctx + "/user/setcommendfind",
					data:{username:username},
					cache : false,
					dataType : "json",
					success : function(data) {
						$(".coss").html('<tr><td >返佣币种</td><td style="padding-left: 20px;">已返佣金额</td>  <td style="padding-left: 20px;">未返佣金额</td></tr>');
						var html = '';
						for(var i=0;i<data.obj.length;i++){
							var sa="";
							if(data.obj[i].fixPriceCoinCode==null){
								sa=wu;
							}else{
								sa=data.obj[i].fixPriceCoinCode;
							}
							html +='<tr>'+
							'<td>'+sa+
							'</td>'+'<td >'+data.obj[i].deawalMoney+'</td>'+'<td >'+data.obj[i].surplusMoney+
							'</td>'+'<tr>';
						}
						$("#aab").html(html);
						//$(".cossno").text(data.obj[i].entrustNum);
					},
					eerror:function(e){
						alert(e)
					}
				});


			}
			var clipboard = new Clipboard('.copy-btn');

			clipboard.on('success', function(e) {debugger
				layer.msg('复制成功',{
					icon: 1,
					time: 500 
				})
			});

			clipboard.on('error', function(e) {
				console.log(e);
			});



		}


	}


});
define(function(require, exports, module){
	require("style/css/mobile/css/css.css");
	require("style/js/mobile/js/zepto.js");
	require("style/js/index.js");
	require("style/js/mobile/js/public.js");
	require("superslide");

	function getcookie(objname){//获取指定名称的cookie的值
		var arrstr = document.cookie.split("; ");
		for(var i = 0;i < arrstr.length;i ++){
			var temp = arrstr[i].split("=");
			if(temp[0] == objname) return unescape(temp[1]);
		}
	}
	module.exports = {

			init : function(){
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

				log.style.backgroundImage="url("+ctx_+"/hryfile/9/3/ae66aeb1140a4bb2bf1d71e94e820423.png)";

				//判断是否已经登录
				if(tokenId!=""){
					$("#isToken").html("<a href='"+basepath+"/html/coins.htm?tokenId="+tokenId+"' class='a-on'>交易中心</a><a href='"+basepath+"/html/user/user-index.html?tokenId="+tokenId+"'>我的资产</a>");
					$("#logo").attr("href",ctx_+"/static/wap/html/coins.htm?tokenId="+tokenId);

				}else{
					$("#isToken").html("<a href='"+basepath+"/html/coins.htm' class='a-on'>交易中心</a><a href='"+basepath+"/html/user/login.htm' >登录</a><a href='"+basepath+"/html/user/reg.htm'>注册</a>");
				}


				//在一个对象后面添加一个方法
				Array.prototype.unique = function (){
					var res = [];
					var json = {};
					for(var i = 0; i < this.length; i++){
						if(!json[this[i]]){
							res.push(this[i]);
							json[this[i]] = 1;
						}
					}
					return res;
				}

				//交易区
				$.ajax({
					url: ctx_ + "/mobile/nouser/appmarketlist.do",
					type:"post",
					dataType:'json',
					data : {'tokenId':tokenId},
					success:function(data){
						if(data!=undefined){
							$("#click_sort1_tbody").empty();
							var coins = [];
							for(var i=0;i<data.length;i++){
								var change =  data[i].coinCode.split("_")[1];
								coins.push(change);
							}

							var quchong = coins.unique();

							for(var i=0; i<quchong.length;i++){
								var change = quchong[i];
								if(i==0){
									$("#tags_coin").append("<li><a style='width: 1.8rem' class=\"s-aClick tags_coin_click\" change=\""+change+"\" href=\"#\">"+change+"交易区</a></li>")

									for(var a=0;a<data.length;a++){
										var activeChange =  data[a].coinCode.split("_")[1];

										if(activeChange==change){
											//默认交易区
											var activeData = [];
											activeData.unique();
											activeData.push(data[a]);

											$("#productInfo_tmp").tmpl(data[a]).appendTo("#click_sort1_tbody");
										}
									}


								}else{
									$("#tags_coin").append("<li><a  href=\"#\" style='width: 1.8rem' class=\"tags_coin_click\" change=\""+change+"\">"+change+"交易区&nbsp&nbsp&nbsp&nbsp</a></li>")
								}
							}
							debugger;
							if(quchong.length>=3){
								$(".mr_frbox").slide({
						            titCell: "",
						            mainCell: ".mr_frUl ul",
						            autoPage: true,
						            effect: "leftLoop",
						            autoPlay: false,
						            vis: 3
					         });	
								
							}else{
								$('.mr_frBtnL').css('display','none'),$('.mr_frBtnR').css('display','none')
							}
						}
					}
				});
				$("#tags_coin").on("click","li",function(){

					$(this).parent().find('li').children().removeClass('s-aClick');
					//$(this).closest("#tags_coin").find("li").children().removeClass('s-aClick');
					$(this).children().toggleClass("s-aClick");
					$("#click_sort1_tbody").empty();
					var activeChange = $(this).children().attr("change");
					$.ajax({
						url: ctx_ + "/mobile/nouser/appmarketlist.do",
						type:"post",
						dataType:'json',
						data : {'tokenId':tokenId},
						success:function(data){
							if(data!=undefined){
								
								for(var i=0;i<data.length;i++){
									var change =  data[i].coinCode.split("_")[1];
									if(activeChange==change){
										//激活交易区
										var activeData = [];
										activeData.push(data[i]);
										$("#productInfo_tmp").tmpl(data[i]).appendTo("#click_sort1_tbody");
									}
								}
							}
						}
					});
				})

				//公告
				$.ajax({
					url: ctx_ + "/mobile/nouser/apparticle.do",
					type:"post",
					dataType:'json',
					data : {type:4},
					success:function(data){

						if(data!=null&&data.obj!=null&&data.obj[0]!=null){
							var html = "<a href='javascript:void(0)' onclick='window.open(\"news/detail/-id=1511.htm?id="+data.obj[0].id+"\",\"_self\");'>"+data.obj[0].title+"</a>";
							$("#gonggao").html(html);
						}
					}
				});


				

			},
			banner : function(){
				$.ajax({
					url: ctx_ + "/mobile/nouser/appbanner.do",
					type:"post",
					dataType:'json',
					success:function(data){
						if(data.obj!=null){
							var html = "";
							var li = "";
							var width = 0;
							for(var i=0;i<data.obj.length;i++){
								html += "<div><a><img class=\"img-responsive\" src=\""+ctx_+"/"+data.obj[i].picturePath+"\"/></a></div>";
								li += "<li></li>";
								width += document.body.clientWidth;
							}
							$("#bannerDiv").css("width",width);
							$("#bannerDiv").html(html);
							$("#position").html(li);
						}else{
							$("#bannerDiv").html("<div><a><img class=\"img-responsive\" src=\"../style/images/banner/banner1.jpg\" alt=\"互融云\" /></a></div>");
							$("#bannerDiv").css("width",document.body.clientWidth);
						}
					}
				});
			},
			content : function(){
				//详情页自带的js
				$(".bullet_p .bull_click").click(function() {
					$(this).addClass('actives').siblings().removeClass('actives');
					var  index =  $(".bullet_p .bull_click").index(this);
					$("#box_bull > ul").eq(index).show().siblings().hide();
				});

				var id = window.location.href.split("?")[1].split("=")[1];

				//首页公告详情页
				$.ajax({
					url: ctx_ + "/mobile/nouser/getContent.do",
					type:"post",
					dataType:'json',
					data : {id:id},
					success:function(data){
						if(data!=null){
							$("#title").text(data.obj.title);
							$("#createtime").text(data.obj.modified);
							$("#content").html(data.obj.content);
						}
					}
				});
			}
	}
})



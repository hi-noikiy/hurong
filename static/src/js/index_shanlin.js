define(function(require, exports, module) {
	
	this.md5 = require("js/base/utils/hrymd5");
	require("lib/jquery/jquery.tmpl.min.js");
	require("lib/highcharts/highcharts.js");
	//require("lib/highcharts/exporting.js");
	require("lib/highcharts/highcharts-zh_CN.js");
	//<!-- layer CSS -->
	require("lib/layer/css/layer.css");
	
	module.exports = {
		init: function(){
			  //行情列表
			  $.ajax({
				url:_ctx+"/klinevtwo/index.do",
				type:"get",
				dataType:'json',
				success:function(data){
					if(data!=undefined){
						var n = [];
						var html = '';
						for(var i = 0; i < data.length; i++){
							if (n.indexOf(data[i].coinCode.split("_")[1]) == -1){
								n.push(data[i].coinCode.split("_")[1]);
							}
						}
						for(var i=0;i<n.length;i++){
							html += '<li><h3>'+n[i]+'市场</h3>'+
							'<table><tbody><tr><th>市场</th><th>最新价</th><th>涨跌幅</th><th>成交额<span></span></th></tr>';
							for(var j=0;j<data.length;j++){
								if(n[i] == data[j].coinCode.split("_")[1]){
									data[j].coinCode = data[j].coinCode.replace('_','/');
									html += 
									'<tr>'+
									'<td>'+data[j].coinCode+'</td>'+
									'<td>'+data[j].currentExchangPrice+'</td>';
									if(data[j].RiseAndFall>0){
										html += '<td class="downCent">+'+data[j].RiseAndFall+'</td>';
									}else if(data[j].RiseAndFall<0){
										html += '<td class="downCent">-'+data[j].RiseAndFall+'</td>';
									}else{
										html += '<td class="downCent">'+data[j].RiseAndFall+'</td>';
									}
									html += '<td class="alignRight">'+data[j].transactionSum+'</td>'+
									'</tr>';
								}
							}
							html += '</tbody></table>'+
							'<div class="bottomBg"><span class="tableDown"></span></div>'+
							'</li>';
						}
						$("#marketArea").html(html);
					}
				}
			});
			//最新动态
			$.ajax({
				url:_ctx+"/article",
				type:"post",
				dataType:'json',
				data : {type:4},
				success:function(data){
					$("#zxdt4_tmp").tmpl(data.obj).appendTo("#zxdt4");
					if(data!=null&&data.obj!=null&&data.obj[0]!=null){
						$("#news_zxgg").html(data.obj[0].title);
						$("#news_zxgg").attr("href",_ctx+"/news/info/"+data.obj[0].id);
					}
				}
			});
			//行业动态
			$.ajax({
				url:_ctx+"/article",
				type:"post",
				dataType:'json',
				data : {type:6},
				success:function(data){
					$("#hydt6_tmp").tmpl(data.obj).appendTo("#hydt6");
				}
			});
		},
		login: function(){
			$("#loginBtn").on("click",function(){
				var username = $("#username").val();
				var password = $("#password").val();
				var marketlogin=$(".market").val();
				if(!username){
					layer.msg(youxiangbunengweikong, {icon: 2});
					return ;
				}
				if(!password){
					layer.msg("密码不能为空", {icon: 2});
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
								window.location.href = _ctx+"/user/center";
							}else{
								layer.msg(data.msg, {icon: 2})
							}
						}else{
							layer.msg(data.msg, {icon: 2})
						}
					}
				});
			})
		},
		hcharts: function(){
			//格式化时间
		    function time(time){
		        var datetime = new Date(time);
		        var year = datetime.getFullYear();
		        var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
		        var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
		        var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
		        var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
		        return datetime;
		    }
			
			$.ajax({
				url:_ctx+"/tradeAreaSL",
				type:"post",
				dataType:'json',
				success:function(data){
					var html = "";
					$("#dealBox").html(html);
					for(var i=0;i<data.length;i++){
						html += '<li class="dealOne">'+
							'<div class="amountTop">'+data[i].tradePair.replace('_','/')+'<span>¥'+data[i].newMoney+'</span></div>'+
							'<div class="amountBottom">成交额：<span class="amountInfo">'+data[i].amount+'</span><span class="amountItem">'+data[i].tradePair.split('_')[0]+'</span>';
							''
							if(data[i].RiseAndFall>0){
								html += '<em class="upSign">-'+data[i].riseAndFall+'%</em>';
							}else if(data[i].RiseAndFall<0){
								html += '<em class="downSign">-'+data[i].riseAndFall+'%</em>';
							}else{
								html += '<em class="upSign">-'+data[i].riseAndFall+'%</em>';
							}
							html += '</div>'+
							'<div id="container'+i+'" style="min-width:100px;height:120px"></div>'+
							'</li>';
					}
					$("#dealBox").html(html);
					for(var i=0;i<data.length;i++){
						var datah = [];
						debugger
						var datatime = [];
						if(data[i].list!=null){
							var leg = 4;
							if(data[i].list.length<5){
								leg = data[i].list.length;
							}
							for(var j=leg;j>=0;j--){
								datah.push(data[i].list[j].maxPrice);
								datatime.push(data[i].list[j].transactionEndTime);
								//console.log(time(data[i].list[j].transactionEndTime));
							}
						}
						var now = time(datatime[0]);
						$('#container'+i).highcharts({
					        chart: {
					            type: 'area'
					        },
					        title: {
					            text: ''
					        },
					        xAxis: {
					        	type: 'datetime',
					        	dateTimeLabelFormats: {   
		                            day: '%H:%M',  
		                        }
					        },
					        yAxis: {
					            title: {
					                text: data[i].tradePair.replace('_','/')
					            },
					            labels: {
					                formatter: function () {
					                    return this.value;
					                }
					            }
					        },
					        tooltip: {
					            xDateFormat:'%Y-%m-%d %H:%M'
					        },
					        plotOptions: {
					        	series: {
					        		pointStart : Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes()),
					                pointInterval: 300 * 1000 //5分钟
					            }
					        },
					        series: [{
					            name: data[i].tradePair.split('_')[0],
					            data: datah
					        }]
					    });
					}
				}
			});
		}
	}
})
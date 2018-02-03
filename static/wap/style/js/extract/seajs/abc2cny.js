define(function(require, exports, module) {
	require("style/css/mobile/css/css.css");
	require("style/css/bootstrap/css/boot.css");
	require("style/js/layer/css/layer.css");
	require("style/js/mobile/js/zepto.js");
	require("style/js/mobile/js/public.js");
	require("style/js/index.js");
	require("style/js/bootstrap/js/jquery.cookie.js");
	require("style/js/bootstrap/js/bootstrap.js");
	require("style/js/mobile/js/zepto.js");
	require("style/js/extract/common/abc2cny.js");
	var maxpage = null;

	//分页
	function Historical_delegation_page(current, maxpage) {
		var sp = Number(current) - 1;//startpage
		var ep = Number(current) + 2;//endpage
		var eoff = ep - maxpage;//tp:totalpage
		if (eoff > 0) {
			sp = sp - eoff;
		}
		if (sp <= 0) {
			ep = ep - sp + 1;
		}
		var str = '';
		if (current != 1)
			str = str + '<ul><li>上一页</li>'
			else
				str = str + '<ul><li>上一页</li>'
				for (var i = sp; i <= ep; i++) {
					if (i > 0 && i <= maxpage) {
						if (i == current)
							str = str + "<li class='pitch' >" + i + "</li>";
						else
							str = str + '<li>' + i + '</li>';
					}
				}

		if (current != maxpage)
			str = str + '<li>下一页</li></ul>';
		else
			str = str + '<li>下一页</li></ul>';
		$("#Historical_delegation").html(str);

	}

	var maxpage = null;

	//分页
	function Transaction_history_page(current, maxpage) {
		debugger;
		var sp = Number(current) - 1;//startpage
		var ep = Number(current) + 2;//endpage
		var eoff = ep - maxpage;//tp:totalpage
		if (eoff > 0) {
			sp = sp - eoff;
		}
		if (sp <= 0) {
			ep = ep - sp + 1;
		}
		var str = '';
		if (current != 1)
			str = str + '<ul><li>上一页</li>'
			else
				str = str + '<ul><li>上一页</li>'
				for (var i = sp; i <= ep; i++) {
					if (i > 0 && i <= maxpage) {
						if (i == current)
							str = str + "<li class='pitch' >" + i + "</li>";
						else
							str = str + '<li>' + i + '</li>';
					}
				}

		if (current != maxpage)
			str = str + '<li>下一页</li></ul>';
		else
			str = str + '<li>下一页</li></ul>';
		$("#Transaction_history").html(str);

	}

	function dataAssignment() {
		var str = location.href;
		var meter = str.split("?")[1];
		var tokenId = meter.split("&")[0];
		tokenId = tokenId.split("=")[1];
		var symbol = meter.split("&")[1];
		symbol = symbol.split("=")[1];
		// 页面数据赋值
		$
		.ajax({
			url : ctx_ + "/mobile/nouser/appmarketlist.do",
			type : "post",
			dataType : 'json',
			success : function(data) {

				var coins = [];
				var urlHuoBi = symbol.split("_")[0];
				var urlFaBi = symbol.split("_")[1];

				for (var i = 0; i < data.length; i++) {
					var huobi = data[i].coinCode.split("_")[0];
					var fabi = data[i].coinCode.split("_")[1];
					if (huobi == urlHuoBi && urlFaBi == fabi) {
						debugger;
						// 最新成交价
						var currentExchangPrice = parseFloat(data[i].currentExchangPrice);
						// 24小时交易量
						var transactionSum = parseFloat(data[i].transactionSum);
						// 最高价
						var maxPrice = parseFloat(data[i].maxPrice);
						// 最低价
						var minPrice = parseFloat(data[i].minPrice);
						// 给页面法币赋值
						$(".legal_tender").html(fabi)
						$("#title").html(huobi + "对" + fabi);
						$(".new_price").html(
								currentExchangPrice.toFixed(4));
						$(".24h_max").html(maxPrice.toFixed(4));
						$(".24h_min").html(minPrice.toFixed(4));
						$(".24h_count").html(transactionSum.toFixed(4));
					}

				}

			}
		});
	}

	//买卖委托
	function buy_selling() {
		var str = location.href;
		var meter = str.split("?")[1];
		var tokenId = meter.split("&")[0];
		tokenId = tokenId.split("=")[1];
		var symbol = meter.split("&")[1];
		symbol = symbol.split("=")[1];

		$
		.ajax({
			type : "POST",
			url : ctx_ + "/mobile/nouser/buy_selling",
			data : {
				symbol : symbol
			},
			success : function(data) {
				var obj = eval('(' + data.obj + ')');
				//卖
				var asks = obj.depths.asks;
				//买
				var bids = obj.depths.bids;
				$("#view_depth_ask")
				.html(
				"<tr class='j-bg-c'><td></td><td>单价</td><td style='padding-right: 10px;'>数量</td></tr>")
				$("#view_new_price").html("<tr class='j-bg-c'><td></td><td>单价</td><td style='padding-right: 10px;'>数量</td></tr>")
				if (asks.length == 0) {
					$("#view_depth_ask")
					.append(
					"<tr class='j-bg-c' ><td>暂无</td><td> </td><td> </td></tr>")
				}
				if (bids.length == 0) {
					$("#view_new_price")
					.append(
					"<tr class='j-bg-c' ><td>暂无</td><td>  </td><td> </td></tr>")
				}
				for (var i = 0; i < asks.length; i++) {

					// 卖出委托
					$("#view_depth_ask").append(
							"<tr class='j-bg-c' ><td>卖出</td><td>"
							+ asks[i][0] + "</td><td>"
							+ asks[i][1] + "</td></tr>")
				}
				for (var i = 0; i < bids.length; i++) {

					// 买入委托
					$("#view_new_price").append(
							"<tr class='j-bg-c' ><td>买入</td><td>"
							+ bids[i][0] + "</td><td>"
							+ bids[i][1] + "</td></tr>")
					//$("#view_new_price")
					//.append(
					//"<tr class='j-bg-c buys' ><td>买入</td><td>"+bids[i][0]+"</td><td>"+bids[i][1]+"</td></tr>")
				}

			}
		});

	}

	// 历史委托
	function Historical_delegation(vs) {

		var current = sessionStorage.getItem("Historical_delegation_page");
		var limit = 4;
		var offset = (current * limit) - limit;

		var typeone = vs;
		var str = location.href;
		var meter = str.split("?")[1];
		var tokenId = meter.split("&")[0];
		tokenId = tokenId.split("=")[1];
		$
		.ajax({
			url : ctx_ + "/mobile/user/appCenter/appentrustList",
			type : "post",
			dataType : 'json',
			data : {
				limit : limit,
				offset : offset,
				sortOrder : "asc",
				typeone : typeone,
				querypath : 'center',
				type : 'history',
				tokenId : tokenId
			},
			success : function(data) {
				var rows = data.rows;
				$("#more_history")
				.html(
				"<tr><th>时间</th><th>类型</th><th>种类</th><th>价格</th><th>个数(个)</th><th>剩余(个)</th><th>状态</th></tr>");
				for (var i = 0; i < rows.length; i++) {
					var type = rows[i].type;
					var entrustSum = rows[i].entrustSum;
					var entrustCount = rows[i].entrustCount;
					var surplusEntrustCount = rows[i].surplusEntrustCount;
					var status = rows[i].status;
					if (type == 1) {
						type = "买";
					} else {
						type = "卖";
					}
					if (status == 0) {
						status = "未成交"
					} else if (status == 1) {
						status = "部分成交"
					} else if (status == 2) {
						status = "已完成"
					} else if (status == 3) {
						status = "部分成交已撤销"
					} else if (status == 4) {
						status = "已撤销"
					}
					$("#more_history").append(
							"<tr><th>" + rows[i].entrustTime
							+ "</th><th>" + type + "</th><th>"
							+ rows[i].coinCode + "</th><th>"
							+ rows[i].entrustPrice
							+ "</th><th>"
							+ rows[i].entrustCount
							+ "</th><th>"
							+ rows[i].surplusEntrustCount
							+ "</th><th>" + status
							+ "</th></tr>")
				}
				maxpage = data.page;
				Historical_delegation_page(current, maxpage);
			}
		});
	}

	var limit = 4;
	// 我的委托
	function My_commission() {
		var str = location.href;
		var meter = str.split("?")[1];
		var tokenId = meter.split("&")[0];
		tokenId = tokenId.split("=")[1];
		$
		.ajax({
			url : ctx_ + "/mobile/user/appCenter/appentrustList",
			type : "post",
			dataType : 'json',
			data : {
				limit : limit,
				offset : '0',
				sortOrder : 'asc',
				typeone : '0',
				querypath : 'center',
				type : 'current',
				tokenId : tokenId
			},
			success : function(data) {
				var rows = data.rows;
				$("#table_current")
				.html(
				"<tr><th>类型</th><th>价格</th><th>个数(个)</th><th>剩余(个)</th><th>状态</th><th>操作</th></tr>");
				for (var i = 0; i < rows.length; i++) {
					var type = rows[i].type;
					var entrustSum = rows[i].entrustSum;
					var entrustCount = rows[i].entrustCount;
					var surplusEntrustCount = rows[i].surplusEntrustCount;
					var status = rows[i].status;
					var entrustPrice = rows[i].entrustPrice;
					if (type == 1) {
						type = "买";
					} else {
						type = "卖";
					}
					if (status == 0) {
						status = "未成交"
					} else if (status == 1) {
						status = "部分成交"
					} else if (status == 2) {
						status = "已完成"
					} else if (status == 3) {
						status = "部分成交已撤销"
					} else if (status == 4) {
						status = "已撤销"
					}
					$("#table_current").append(
							"<tr><th>" + type + "</th><th>"
							+ entrustPrice + "</th><th>"
							+ entrustCount + "</th><th>"
							+ surplusEntrustCount + "</th><th>"
							+ status + "</th><th><a id="
							+ rows[i].entrustNum + ","
							+ rows[i].fixPriceCoinCode + ","
							+ rows[i].coinCode + ","
							+ rows[i].entrustPrice + ","
							+ rows[i].type
							+ ">撤销</a></th></tr>")
				}

			}
		});
	}

	// 交易记录
	function Transaction_history(type) {
		var current = sessionStorage.getItem("Transaction_history_current");
		var limit = 4;
		var offset = (current * limit) - limit;
		var str = location.href;
		var meter = str.split("?")[1];
		var tokenId = meter.split("&")[0];
		tokenId = tokenId.split("=")[1];
		$
		.ajax({
			url : ctx_ + "/mobile/user/appCenter/apptradeslist",
			type : "post",
			dataType : 'json',
			data : {
				limit : limit,
				offset : offset,
				sortOrder : "asc",
				type : type,
				transactionType : 'chongzhi',
				tokenId : tokenId
			},
			success : function(data) {
				var rows = data.rows;

				$("#Tran_history")
				.html(
				"<tr><th>时间</th><th>类型</th><th>种类</th><th>单价</th><th>数量(个)</th><th>金额</th><th>手续费单位</th><th>手续费</th></tr>");
				for (var i = 0; i < rows.length; i++) {
					var type = rows[i].type;
					if (type == 1) {
						type = "买";
					} else {
						type = "卖";
					}

					$("#Tran_history").append(
							"<tr><th>" + rows[i].transactionTime
							+ "</th><th>" + type + "</th><th>"
							+ rows[i].coinCode + "</th><th>"
							+ rows[i].transactionPrice
							+ "</th><th>"
							+ rows[i].transactionCount
							+ "</th><th>"
							+ rows[i].transactionSum
							+ "</th><th>" + rows[i].coin
							+ "</th><th>"
							+ rows[i].transactionFee
							+ "</th></tr>")
				}
				maxpage = data.page;
				Transaction_history_page(current, maxpage);
			}
		});
	}
	//页面初始化程序
	module.exports = {
			init : function() {
				//页面数据赋值
				dataAssignment();
				window.setInterval(dataAssignment, 1000);
				//我的委托批量撤销
				$("#bulk_Revocation").on("click",function(){
					$.ajax({
					url : ctx_ + "/mobile/nouser/trades/cancelOrder",
					type : "post",
					dataType : 'json',
					data : {
						coinCode : symbol,
						tokenId : tokenId
					},
					success : function(data) {
						debugger
					if(data.success){
						layer.msg(data.msg, {icon: 1});
					}else{
						layer.msg(data.msg, {icon: 2});
					}

					}
				})
					
				})
				
				//买卖委托
				buy_selling();
				window.setInterval(buy_selling,500);
				//加载logo 	
				$.ajax({
					url : ctx_ + "/mobile/nouser/logo",
					type : "post",
					dataType : 'json',
					success : function(data) {
						//加载logo 	
						var url = ctx_ + "/" + data.obj;
						log.style.backgroundImage = "url(" + url + ")";

					}
				})
				var str = location.href;
				var meter = str.split("?")[1];
				var tokenId = meter.split("&")[0];
				tokenId = tokenId.split("=")[1];
				var symbol = meter.split("&")[1];
				symbol = symbol.split("=")[1];

				// 判断是否已经登录
				if (tokenId != "") {
					$("#isToken").html(
							"<a href='" + basepath + "/html/coins.htm?tokenId="
							+ tokenId + "' class='a-on'>交易中心</a><a href='"
							+ basepath
							+ "/html/user/user-index.html?tokenId="
							+ tokenId + "' >我的账户</a>");
					$("#logo").attr("href",
							ctx_ + "/static/wap/html/coins.htm?tokenId=" + tokenId);

				} else {
					$("#isToken")
					.html(
							"<a href='"
							+ basepath
							+ "/html/coins.htm' class='a-on'>交易中心</a><a href='"
							+ basepath
							+ "/html/user/login.htm'>登录</a><a href='"
							+ basepath
							+ "/html/user/reg.htm'>注册</a>");
				}

				//买卖手续费

				$.ajax({
					type : "POST",
					dataType : "JSON",
					url : _ctx + "/mobile/nouser/appgetAccountInfo",
					data : {
						symbol : symbol,
						tokenId : tokenId
					},
					success : function(data) {
						$("#buy_fee").html(data.obj.coinFee.buyFeeRate)
						$("#sell_fee").html(data.obj.coinFee.sellFeeRate)
					}
				})

				// 跳转到首页
				$("#bbjy").on(
						"click",
						function() {
							window.open(basepath + "/html/coins.htm?tokenId="
									+ tokenId, "_self");
						})
						$("#logo").on(
								"click",
								function() {
									window.open(basepath + "/html/coins.htm?tokenId="
											+ tokenId, "_self");
								})

								if (tokenId != "") {
									// 我的委托
									My_commission(limit);
									//我的委托
									window.setInterval(My_commission, 1000);

									//我的委托 显示10页
									$("#ten").on("click", function() {
										limit = 10;
										My_commission(limit)
									})
									//我的委托显示20页
									$("#twenty").on("click", function() {
										limit = 20;
										My_commission(limit)
									})
									//我的委托显示全部页
									$("#hundred").on("click", function() {
										limit = 100;
										My_commission(limit)
									})

									sessionStorage.setItem("Historical_delegation_page", "1");
									
									// 历史委托
									Historical_delegation(0);

									//历史委托点击分页
									$("#Historical_delegation")
									.on(
											"click",
											"ul li",
											function() {
												debugger;
												var value = $(this).html();
												var Historical_delegation_page = sessionStorage
												.getItem("Historical_delegation_page");

												if (value != "上一页" && value != "下一页") {
													sessionStorage.setItem(
															"Historical_delegation_page",
															value);
												} else if (value == "上一页"
													&& Historical_delegation_page != 1) {
													value = Historical_delegation_page - 1;
													sessionStorage.setItem(
															"Historical_delegation_page",
															value);
												}

												if (value != "上一页" && value != "下一页") {
													sessionStorage.setItem(
															"Historical_delegation_page",
															value);
												} else if (value == "下一页"
													&& Historical_delegation_page != maxpage) {
													value = parseInt(Historical_delegation_page) + 1;
													sessionStorage.setItem(
															"Historical_delegation_page",
															value);
												}
												$(this).addClass("pitch");
												Historical_delegation(0);
											});

									$("#history")
									.html(
									"<span>上一页</span><a class='pitch' id='1' >1</a><span>下一页</span>")

									sessionStorage.setItem("Transaction_history_current", "1");
									// 交易历史
									Transaction_history(0);
									//点击分页
									$("#Transaction_history")
									.on(
											"click",
											"ul li",
											function() {
												debugger;
												var value = $(this).html();
												Transaction_history_current = sessionStorage
												.getItem("Transaction_history_current");

												if (value != "上一页" && value != "下一页") {
													sessionStorage.setItem(
															"Transaction_history_current",
															value);
												} else if (value == "上一页"
													&& Transaction_history_current != 1) {
													value = Transaction_history_current - 1;
													sessionStorage.setItem(
															"Transaction_history_current",
															value);
												}

												if (value != "上一页" && value != "下一页") {
													sessionStorage.setItem(
															"Transaction_history_current",
															value);
												} else if (value == "下一页"
													&& Transaction_history_current != maxpage) {
													value = parseInt(Transaction_history_current) + 1;
													sessionStorage.setItem(
															"Transaction_history_current",
															value);
												}
												$(this).addClass("pitch");
												Transaction_history(0);
											});

									// 我的委托撤销
									$("#table_current")
									.on(
											"click",
											"a[id]",
											function() {
												var sid = $(this).attr("id");
												var split = sid.split(',');
												var coincode = split[2] + '_' + split[1];

												var entrustPrice = split[3];
												var type = split[4];

												layer
												.confirm(
														"你确定要撤销吗？",
														{
															title : ' ',
															btn : [ "确定", "取消" ]
														},
														function() {
															$
															.ajax({
																type : "POST",
																dataType : "JSON",
																url : _ctx
																+ "/mobile/nouser/trades/appCancelExEntrust",
																cache : false,
																data : {
																	entrustNums : split[0],
																	entrustPrice : entrustPrice,
																	type : type,
																	coinCode : coincode,
																	tokenId : $(
																			"#tokenId")
																			.val()
																},
																success : function(
																		data) {

																	layer
																	.msg(
																			data.msg,
																			{
																				icon : 1,
																				time : 2000
																			},
																			function() {
																				My_commission();
																			})

																}
															})
														})
											})

								} else {
									// 我的委托
									$("#table_current").html("<tr><td>登陆后显示</td></tr>")
									// 委托历史
									$("#more_history").html("<tr><td>登陆后显示</td></tr>")
									// 交易历史
									$("#Tran_history").html("<tr><td>登陆后显示</td></tr>")
								}

				if (tokenId != "") {

					// 跳转到首页 我的账户 设置
					$("#bbjy").on(
							"click",
							function() {
								window.open(basepath + "/html/coins.htm?tokenId="
										+ tokenId, "_self");
							})
							$("#wdzh").on(
									"click",
									function() {
										window.open(basepath
												+ "/html/user/user-index.html?tokenId="
												+ tokenId, "_self");
									})
									$("#sz").on(
											"click",
											function() {
												window.open(basepath
														+ "/html/user/account.html?tokenId="
														+ tokenId, "_self");
											})

											$
											.ajax({
												url : ctx_
												+ "/mobile/user/apppersondetail/isrealandpwd.do",
												type : "post",
												data : {
													tokenId : tokenId
												},
												dataType : 'json',
												success : function(data) {
													if (data != "" && data != null) {
														if (data.success) {
															if (data.obj.isTrade == "1") {
																$("#huikuanren").val(
																		data.obj.user.truename);
															} else {
																if (data.obj.user.states == '0') {
																	layer
																	.msg(
																			"请先实名",
																			{
																				icon : 2,
																				time : 1500
																			},
																			function() {
																				window
																				.open(
																						basepath
																						+ "/html/user/user-index.html?tokenId="
																						+ tokenId,
																				"_self");
																			});
																	return;
																}
																if (data.obj.user.states == '1') {
																	layer
																	.msg(
																			"实名正在审核，请等待！",
																			{
																				icon : 2,
																				time : 1500
																			},
																			function() {
																				window
																				.open(
																						basepath
																						+ "/html/user/user-index.html?tokenId="
																						+ tokenId,
																				"_self");
																			});
																	return;
																}

																if (data.obj.user.states == '3') {
																	layer
																	.msg(
																			"实名已拒绝请重新提交审核",
																			{
																				icon : 2,
																				time : 1500
																			},
																			function() {
																				window
																				.open(
																						basepath
																						+ "/html/user/user-index.html?tokenId="
																						+ tokenId,
																				"_self");
																			});
																	return;
																}
															}
															$("#huikuanren").val(
																	data.obj.user.truename);

														} else {
															$("#wdzh").empty().text("登录");
															$("#wdzh")
															.attr(
																	"href",
																	basepath
																	+ "/html/user/login.htm");
														}
													}
												}
											});
				}

				// 买
				$("#coinpricein").on("blur", function() {
					if ($(this).val() != '' && $(this).val() != null) {
						var regex = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
						if (!regex.test($(this).val())) {
							layer.msg("价格必须为数字", {
								icon : 2
							});
							return false;
						}
					}
				})

				$('#coinpricein').bind('input propertychange', function() {
					var coinpricein = $('#coinpricein').val();
					var numberin = $("#numberin").val();
					$("#coinin_sumprice").val(coinpricein * numberin)

				});

				// 买入数量
				$("#numberin").on("blur", function() {
					var coinpricein = $("#coinpricein").val();
					if (coinpricein == "") {
						layer.msg("请先输入买入价格", {
							icon : 2
						});
						$(this).val('');
						return false;
					}
					var regex = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
					if (!regex.test($(this).val())) {
						layer.msg("买入数量不合法", {
							icon : 2
						});
						return false;
					}
					$("#coinin_sumprice").val(coinpricein * $(this).val());
				})

				$('#numberin').bind('input propertychange', function() {
					var coinpricein = $('#coinpricein').val();
					var numberin = $("#numberin").val();
					$("#coinin_sumprice").val(coinpricein * numberin)

				});

				// 买入
				$("#trustbtnin").on("click", function() {
					var coinpricein = $("#coinpricein").val();
					var regex = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
					if (coinpricein == '' || coinpricein == null) {
						layer.msg("请填写买入价格", {
							icon : 2
						});
						return false;
					}
					if (!regex.test(coinpricein)) {
						layer.msg("价格必须为数字", {
							icon : 2
						});
						return false;
					}

					var numberin = $("#numberin").val();
					if (numberin == '' || numberin == null || numberin <= 0) {
						layer.msg("请填写正确的数量", {
							icon : 2
						});
						return false;
					}
					if (!regex.test(numberin)) {
						layer.msg("数量必须为数字", {
							icon : 2
						});
						return false;
					}

					$.ajax({
						url : ctx_ + "/mobile/nouser/trades/appadd.do",
						type : "post",
						dataType : 'json',
						data : {
							entrustPrice : coinpricein,
							type : 1,
							coinCode : symbol,
							entrustCount : numberin,
							entrustWay : 1,
							tokenId : tokenId
						},
						success : function(data) {
							if (data.success) {
								$("#coinpricein").val("");
								$("#numberin").val("");
								$("#coinin_sumprice").val("");
								layer.msg(data.msg, {
									icon : 1,
									time : 1500
								});
							} else {
								layer.msg(data.msg, {
									icon : 2,
									time : 1500
								});
							}
						}
					})
				})

				// 卖
				$("#coinpriceout").on("blur", function() {
					if ($(this).val() != '' && $(this).val() != null) {
						var regex = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
						if (!regex.test($(this).val())) {
							layer.msg("价格必须为数字", {
								icon : 2
							});
							return false;
						}
					}
				})

				$('#coinpriceout').bind('input propertychange', function() {
					var coinpriceout = $('#coinpriceout').val();
					var numberout = $("#numberout").val();
					$("#coinout_sumprice").val(coinpriceout * numberout)

				});
				// 卖出数量
				$("#numberout").on("blur", function() {
					var coinpriceout = $("#coinpriceout").val();
					if (coinpriceout == "") {
						layer.msg("请先输入卖出价格", {
							icon : 2
						});
						$(this).val('');
						return false;
					}
					var regex = /^[1-9]+([.]{1}[0-9]+){0,1}$/;
					if (!regex.test($(this).val())) {
						layer.msg("价格不合法", {
							icon : 2
						});
						return false;
					}
					;

					$("#coinout_sumprice").val(coinpriceout * $(this).val());
				})
				$('#numberout').bind('input propertychange', function() {
					var coinpriceout = $('#coinpriceout').val();
					var numberout = $("#numberout").val();
					$("#coinout_sumprice").val(coinpriceout * numberout)

				});

				// 卖出
				$("#trustbtnout").on("click", function() {
					var coinpriceout = $("#coinpriceout").val();
					var regex = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
					if (coinpriceout == '' || coinpriceout == null) {
						layer.msg("请填写卖出价格", {
							icon : 2
						});
						return false;
					}
					if (!regex.test(coinpriceout)) {
						layer.msg("价格必须为数字", {
							icon : 2
						});
						return false;
					}

					var numberout = $("#numberout").val();
					if (numberout == '' || numberout == null || numberout <= 0) {
						layer.msg("卖出数量不合法", {
							icon : 2
						});
						return false;
					}
					if (!regex.test(numberout)) {
						layer.msg("数量必须为数字", {
							icon : 2
						});
						return false;
					}

					$.ajax({
						url : ctx_ + "/mobile/nouser/trades/appadd.do",
						type : "post",
						dataType : 'json',
						data : {
							entrustPrice : coinpriceout,
							type : 2,
							coinCode : symbol,
							entrustCount : numberout,
							entrustWay : 1,
							tokenId : tokenId
						},
						success : function(data) {
							if (data.success) {
								$("#coinpriceout").val("");
								$("#numberout").val("");
								$("#coinout_sumprice").val("");
								layer.msg(data.msg, {
									icon : 1,
									time : 1500
								});
							} else {
								layer.msg(data.msg, {
									icon : 2,
									time : 1500
								});
							}
						}
					})
				})
			}
	}
})
define(function(require, exports, module) {
	this._table = require("js/base/table");

	module.exports = {

		// 添加页面提交方法
		init : function() {
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
				}, {
					title : 'id',
					field : 'id',
					align : 'center',
					visible : false,
					sortable : false,
					searchable : false
				}, {
					title : chongzhileixing,
					field : 'transactionType',
					align : 'center',
					visible : true,
					sortable : false,
					searchable : true,
					formatter : function(value, row, index) {
						// 1线上充值,2线上提现 3线下充值 4线下取现
						if (value == 1) {
							return xianshangchongzhi;
						} else if (value == 2) {
							return xianshangtixian;
						} else if (value == 3) {
							return xianxiaxhongzhi;
						} else if (value == 4) {
							return xainxiaquxian;
						}
					}
				}, {
					title : chongzhijine,
					field : 'transactionMoney',
					align : 'center',
					visible : true,
					sortable : false,
					searchable : true
				}, {
					title : shouxufei,
					field : 'fee',
					align : 'center',
					visible : true,
					sortable : false,
					searchable : true
				}, {
					title : dingdanhao,
					field : 'transactionNum',
					align : 'center',
					visible : true,
					sortable : false,
					searchable : true
				}, {
					title : shijian,
					field : 'created',
					align : 'center',
					visible : true,
					sortable : false,
					searchable : true
				}, {
					title : zhaungtai,
					field : 'status',
					align : 'center',
					visible : true,
					sortable : false,
					searchable : true,
					formatter : function(value, row, index) {
						// 1待审核 2已完成 3已否决
						if (value == 1) {
							return daishenhe;
						} else if (value == 2) {
							return yiwancheng;
						} else if (value == 3) {
							return yifoujue;
						}
					}
				} ],
				queryParams : function queryParams(params) {
				    return {
				        limit:params.limit,
				        offset:params.offset,
				        sortOrder: params.order,
				        transactionType:$($("#transactionType").find(".selected")[0]).attr("value")
				       
				    };
				}
			}
			//_table.initTable($("#table"), conf);
			
			
			//充值类型事件
			$("#transactionType").on("click","a",function(){
				$(this).siblings().removeClass("selected");
				$(this).addClass("selected");
				$("#table").bootstrapTable('refresh',null);
			})
			
			$('.noticeCloseNews').on('click',function(){
				$('.noticeTips').parent().hide()
			})
			
		
		
		},
		messageList : function(){
			
			$.ajax({
				type : "get",
				url : _ctx +"/user/oamessage/list",
				cache : false,
				dataType : "json",
				success : function(data) {
					if(data!=undefined){
						if(data.rows!=undefined&&data.rows.length>0){
							$(".noticeNewsHref").attr("sid",data.rows[0].id).html(data.rows[0].title);
						}else{
							$("#messageDiv").addClass("hide");
						}
					}else{
						$("#messageDiv").addClass("hide");
					}
				},
				error : function(e) {
					$("#messageDiv").addClass("hide");
				}
			});
			
			$(".noticeNewsHref").on("click",function(){
				loadUrl(_ctx +"/user/oamessage/read/"+$(this).attr("sid"));
			})
			
		}

	}

});
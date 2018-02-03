define(function(require, exports, module) {
	require("style/css/mobile/css/css.css");
	require("style/js/layer/css/layer.css");
	require("style/js/mobile/js/zepto.js");
	require("style/js/mobile/js/public.js");
	require("style/js/extract/common/-corpid=0.js");
	require("style/js/form.js");
	this.md5 = require("style/js/hrymd5");

	module.exports = {
		init : function() {
			

			//公告
			$.ajax({
				url: ctx_ + "/mobile/nouser/apparticle.do",
				type:"post",
				dataType:'json',
				data : {type:4},
				success:function(data){
					$("#box_bull").html("")
					var obj=data.obj;
					;
					
					for(var i=0;i<obj.length;i++){
						$("#box_bull").append("<li><a href='detail/-id=1511.htm?id="+obj[i].id+"'style='color: #000; font-weight: bold;'>"+obj[i].title+"</a><span>"+obj[i].modified.split(" ")[0]+"</span></li>")
					}
				}
			});
			
			}
	}
})

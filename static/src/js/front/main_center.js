define(function(require,exports,module) {

	
	
	require("lib/exstatic/static/lib/jquery/jquery-migrate-1.1.0.min.js");
	require("lib/exstatic/static/lib/gritter/js/jquery.gritter.js");
	require("lib/exstatic/static/lib/jquery-ui/ui/minified/jquery-ui.min.js");
	require("lib/exstatic/static/lib/bootstrap/js/bootstrap.min.js");
	require("lib/exstatic/static/lib/slimscroll/jquery.slimscroll.min.js");
	require("lib/exstatic/static/lib/jquery-cookie/jquery.cookie.js");
/*	require("lib/exstatic/static/lib/flot/jquery.flot.min.js");
	require("lib/exstatic/static/lib/flot/jquery.flot.resize.min.js");
	require("lib/exstatic/static/lib/flot/jquery.flot.pie.min.js");*/
	require("lib/exstatic/static/lib/sparkline/jquery.sparkline.js");
	require("lib/exstatic/static/lib/jquery-jvectormap/jquery-jvectormap-1.2.2.min.js");
	require("lib/exstatic/static/lib/jquery-jvectormap/jquery-jvectormap-world-mill-en.js");
	require("lib/exstatic/static/lib/bootstrap-datepicker/js/bootstrap-datepicker.js");
	require("lib/exstatic/static/js/common/1.0/dashboard.min.js ");
	require("lib/exstatic/static/js/common/1.0/apps.min.js");
	
	
	//<!-- layer CSS -->
	require("lib/layer/css/layer.css");
	//<!-- Bootstrap-table CSS -->
	require("lib/bootstrap-table/css/bootstrap-table.css");
	require("lib/bootstrap-table/css/bootstrap-editable.css");
	require("lib/bootstrap-table/css/examples.css");

	module.exports = {
		
		init : function(){
			if($.cookie('Language')=='' || $.cookie('Language')==null || $.cookie('Language')=='en'){
				layer.msg("Welcome In!", {icon: 1,time: 1000});
			}else{
				layer.msg("欢迎进入", {icon: 1,time: 1000});
			}
			
			
			App.init();
			Dashboard.init();
			
			require("lib/bootstrap-validator/js/bootstrapValidator.js");
			//初化化bootstrap table
			require("lib/bootstrap-table/bootstrap-table.js");
			require("lib/bootstrap-table/bootstrap-table-zh-CN.js");
			require("lib/bootstrap-table/bootstrap-table-export.js");
			require("lib/bootstrap-table/tableExport.js");
			require("lib/bootstrap-table/bootstrap-table-editable.js");
			require("lib/bootstrap-table/bootstrap-editable.js");
			//require("lib/bootstrap-table/ga.js")
			//加载base
			require("base");
			
			//加载menu
			var menu = require("js/base/menu");
			menu.loadstaticmenu();
			
			loadUrl(_ctx+"/user/index");
		}
	}
	

});


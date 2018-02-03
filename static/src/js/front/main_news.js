define(function(require,exports,module) {

	
	require('js/setmenu.js')
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
			
			App.init();
			Dashboard.init();
			//加载base
			require("base");

			var cate=window.location.href.split('index/')[1];
			var split1 = window.location.href.split('?').length>1?window.location.href.split('?')[1]:'';
			var categoryId = split1.split('&').length>1?split1.split('&')[0].split('=')[1]:split1.split('=')[1];
			var id = split1.split('&').length>1?split1.split('&')[1].split('=')[0]=='id'?split1.split('&')[1].split('=')[1]:'':'';
			
			$('#artic_category li a').map(function(){
			    if($(this).attr('categoryid')==cate){
			        $(this).parent().addClass('active');
			    }else{
			        return $(this).attr('categoryid');
			    }
			}).get();
			
			$("#artic_category li input").each(function(){
				if(categoryId==$(this).val()){
					var $this = $(this).siblings().eq(0);
					var $this_1 = $(this).siblings().eq(1);
					$this.next().slideToggle();
					$this.parent().toggleClass('open');
					
					$('#accordion').find('.submenu').not($this.next()).slideUp().parent().removeClass('open');
					if(id!=null && id!='' && id!=undefined){
						$this_1.find('input').each(function(index){debugger
							if($(this).val()==id){
								$this_1.find('li').eq(index).css("background-color","#337ab7");
								$this_1.find('li').eq(index).find('a').css("color","#fff");
							}
						})
					}else{
						$this_1.find('li').eq(0).css("background-color","#337ab7");
						$this_1.find('li').eq(0).find('a').css("color","#fff");
					}
				}
			})
			
//			$("#artic_category").on("click","a[categoryid]",function(){
//				var form = "<form id=\"hry_catgory_pageform\" action=\"/news/index\" method=\"post\">" 
//					 + "<input type=\"hidden\" name=\"limit\" value=\"5\" >"
//					 + "<input type=\"hidden\" name=\"offset\" value=\"0\" >"
//					 + "<input type=\"hidden\" name=\"categoryid\" value=\""+$(this).attr("categoryid")+"\" >"
//					 + "</form>";
//				$("#artic_category").append(form);
//				$("#hry_catgory_pageform").submit();
//
//				
//			});
			
		}
	
	}
	

});


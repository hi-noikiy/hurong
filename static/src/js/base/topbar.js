define(function(require,exports,module){
	
	module.exports = {
		
		language : function(){
			var language = $("#language").val();
		    var yuyan = $("#language").val();
		    var yy = $("#language").val();
		    var yy1 = $("#language").val();
		    if(language == "" || language == null){
			    language = "简体中文";
		    }else if(language == "en"){
			    language = "English";
		    }else if(language == "zh_CN"){
			    language = "简体中文";
		    }
		    if(yy == "zh_CN"){
			    yy = "英文";
			    yy1 = "en";
		    }else{
			    yy = "Chinese";
			    yy1 = "zh_CN";
		    }
		    $("#slide_lang dt span").html('<i class=\'icon_lang icon_lang_'+yuyan.toLowerCase()+'\'></i>');
		    $("#slide_lang_box a").html('<i class=\'icon_lang icon_lang_'+yy1.toLowerCase()+'\'></i>'+yy);
		    $("#slide_lang dt").on('click',function() {
		    	//获取下当前url地址
		    	var url = '';
		    	if(location.href.split('?').length>1){
		    		url = "?" +location.href.split('?')[1];
		    	}
		    	var split = window.document.location.pathname+url;
		    	
		        $("#slide_lang_box").slideToggle()
		        $(this).toggleClass('cur');
		        if($("#tokenId").val()!=""){
		        	if($("#language").val() == "zh_CN"){
					    $("#slide_lang_box a").attr("href",_ctx + "/language.do?language=en&split="+split+"&tokenId="+$("#tokenId").val());
				    }else{
					    $("#slide_lang_box a").attr("href",_ctx + "/language.do?language=zh_CN&split="+split+"&tokenId="+$("#tokenId").val());
				    }
		        }else{
		        	if($("#language").val() == "zh_CN"){
		        		$("#slide_lang_box a").attr("href",_ctx + "/language.do?language=en&split="+split);
		        	}else{
		        		$("#slide_lang_box a").attr("href",_ctx + "/language.do?language=zh_CN&split="+split);
		        	}
		        }
	        })
	        $("#slide_lang_box a").on('click',function() {
	    	   var slidecon=$("#slide_lang dt span").html();
	           //$("#slide_lang dt span").html('<i class=\'icon_lang icon_lang_'+yy1.toLowerCase()+'\'></i>'+yy);
	           $('#slide_lang_box a').html(slidecon)
	           $("#slide_lang dd").hide()
		    })
		}
	}
})
//获取地址栏参数
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
    var cate=GetQueryString('activeId');
    var newsId=GetQueryString('newsId')
	//顶部的导航栏
//	$('.nav li').map(function(){
//	    if($(this).attr('activeId')==cate){
//	        $(this).addClass('active');
//	    }else{
//	        return $(this).attr('activeId');
//	    }
//	}).get();
	
	//新闻资讯的左侧导航栏

	$('#artic_category li').map(function(){
		
		if($(this).find('a').attr('categoryid')==newsId){
			console.log($(this).find('a').attr('categoryid'))
			$(this).addClass('active')	
		}else{
			return $(this).find('a').attr('categoryid');
		}
	}).get();
	

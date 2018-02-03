<!DOCTYPE html>
<html>
<head>
	<#include "/base/base.ftl">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<meta name="viewport" content="width=device-width, initial-scale=1">-->
    <meta name="description" content="">
    <meta name="author" content="">
	<!--title及ico-->
	<@HryTopOrFooter url="base/title.ftl"/> 
	<link rel="icon" type="image/x-icon"  />
	<!-- ================== BEGIN BASE CSS STYLE =============== -->
	<link href="${ctx}/static/${version}/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
	<link href="${ctx}/static/${version}/lib/exstatic/css/font-awesome.min.css" rel="stylesheet" />
	<link href="${ctx}/static/${version}/lib/exstatic/css/animate.min.css" rel="stylesheet" />
	<link href="${ctx}/static/${version}/lib/exstatic/css/web-responsive.min.css" rel="stylesheet" />
	<link href="${ctx}/static/${version}/lib/exstatic/css/mdefault.css" id="theme" rel="stylesheet" />
	<link href="${ctx}/static/${version}/lib/exstatic/css/test.less" rel="stylesheet/less" type="text/css" />
	<link href="${ctx}/static/${version}/lib/exstatic/css/index.css" rel="stylesheet"/>
	<!-- ================== END BASE CSS STYLE ================== -->
	
	<link href="${ctx}/static/${version}/lib/exstatic/css/web.min.css" rel="stylesheet" />
	<link href="${ctx}/static/${version}/lib/exstatic/css/item/index.css" rel="stylesheet" />
	<link href="${ctx}/static/${version}/lib/exstatic/css/item/global.css" rel="stylesheet" />
	<link href="${ctx}/static/${version}/lib/exstatic/css/item/common.css" rel="stylesheet" />
	
</head>
<body>
<style>
    table#marketlist td {
        border: 0px !important;
        border-bottom-color: #fff !important;
    }
    a.siteTypeSelect,
    a.skipToOtherWeb {
	color: #ffffff;
	background: rgba(39,74,127,0.3);
}
	.header.navbar .navbar-nav>li>a.btn-blue{
	background-color: rgba(39,155,253,0.35);
}
 #trans-tooltip,
    #tip-arrow-bottom,
    #tip-arrow-top{
	display:none;
}
</style>
	<!-- 交易所 start -->
	<!-- begin #page-container -->
    <div id="page-container" class="in">
	    <!-- begin #header -->
        <div id="header" class="header navbar navbar-transparent " style="position:absolute;">
        	
            <!-- begin container -->
            <div class="container">
                <!-- begin navbar-header -->
                <div class="navbar-header" >
	                
					<@HryTopOrFooter url="base/logo.ftl"/>
						
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#header-navbar">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
				</div>
				
                <!-- end navbar-header -->
                
             
                <!-- begin navbar-collapse -->
               <input id="language" value="${locale}" type="hidden">
               <input id="tokenId" value="${tokenId}" type="hidden">
               <#if isOpenLanguage=='0'>
				 <div class="foot_lang" style="margin-top:20px;">
	                <dl id="slide_lang"  class="">
	                   <dt style="background:none;">
	                     <span><i class="icon_lang icon_lang_zh_cn"></i></span><i class="icon_gray_arrows"></i>
	                   </dt>
	                   <dd id="slide_lang_box">
	                  	  <#if locale == 'zh_CN'>
	                  	  	<a href="javascript:void(0);" class=""><i class="icon_lang icon_lang_en"></i></a>
	                  	  <#elseif locale == 'en'>
	                  	    <a href="javascript:void(0);" class=""><i class="icon_lang icon_lang_en"></i></a>
	                  	  </#if>
	                   </dd>
	                </dl>
	            </div>
	            </#if>
                  <ul class="navbar-right">
                  	<#if user==null>
                  	<li class="clearfix" style="line-height:20px;">
                  		<i><img src="${ctx}/static/${version}/lib/exstatic/img/avator.png" width="20" alt=""></i>
						<a class="text-bold text-white no-underline" href="${ctx}/login"><@spring.message code="Login"/></a>
						<span class="text-gray">or</span>
						<a class="text-bold text-white no-underline" href="${ctx}/reg"><@spring.message code="register"/></a>
					</li>
					
					<#else>            
					<li user-Islogin class="dropdown clearfix" style="line-height:20px;">
					  <i><img src="${ctx}/static/${version}/lib/exstatic/img/avator.png" width="20" alt=""></i>
					  <a href="${ctx}/user/center<#if tokenId??>.do</#if>"  style="color:#fff;">${user.username}<!--<b class="caret"></b>--></a>
					  <a href="${ctx}/logout<#if tokenId??>.do</#if>" style="margin-left:10px;color:#fff;"><@spring.message code="logout"/></a>
						<#--<ul class="dropdown-menu animated fadeInLeft">
							<li><a href="${ctx}/user/center"><@spring.message code="personCenter"/></a></li>
							<li><a href="${ctx}/logout"><@spring.message code="logout"/></a></li>
						</ul>-->
					</li>
					
					</#if>
                          
                  </ul>
				<#if hasico!>
					<#include '/base/index_ico_top.ftl'>
				<#else>
					<ul class="nav navbar-nav navbar-left">
						<li>
						    <a style="color:#70beff" href="${ctx}<#if tokenId??>/index.do</#if>" style="color:#fff;"><@spring.message code="Index"/></a>
						</li>
						<li><a target="_blank" href="${ctx}/market<#if tokenId??>.do</#if>" style="color:#fff;" ><@spring.message code="Tradinghall"/></a></li>
						<#if hasc2c==true><li><a target="_blank" href="${ctx}/c2c" style="color:#fff;" ><@spring.message code="c2cIndex"/></a></li></#if>
						
						<li <#if showColor=='3'>class="active"</#if>><a href="${cxt}/news/index/5.do?showColor=3&newsId=5"  style="color:#fff;"><@spring.message code="NewsInformation"/></a></li>
						<li <#if showColor=='4'>class="active"</#if>><a href="${ctx}/news/help<#if tokenId??>.do?categoryId=<#if locale == 'zh_CN'>37<#else>68</#if>&showColor=4<#else>.do?categoryId=<#if locale == 'zh_CN'>37<#else>68</#if>&showColor=4</#if>" style="color:#fff;"><@spring.message code="Helpcenter"/></a></li>
						<li <#if showColor=='5'>class="active"</#if>><a href="${ctx}/news/aboutus<#if tokenId??>.do?categoryId=<#if locale == 'zh_CN'>87<#else>74</#if>&tokenId=${tokenId}&showColor=5<#else>.do?categoryId=<#if locale == 'zh_CN'>87<#else>74</#if>&showColor=183</#if>" style="color:#fff;"><@spring.message code="guanyuwomen"/></a></li>
                  </ul>
        
				</#if>
                </div>
                
                <!-- end navbar-collapse -->
            </div>
            <!-- end container -->
        </div>
        <!-- end #header -->

	            
	<!--home start-->
        <!-- begin #home -->
        <div id="home" class="content has-bg home">
            <!-- begin content-bg -->
            <div class="index_banner_box" id="index_banner_box">
                <div class="banner_big_box" id="banner_big_box">
                </div>
                <div class="index_t">
                    <div class="banner_box" id="banner_box">
                   
                    </div>
                    <div class="section floor_top">
                        <!-- 轮播的页码  开始 -->
                        <ul id="page_list">
                        
                        </ul>
                    </div>
                </div>
                
                
                
                
                
            </div>
            <!-- end content-bg -->
            <!-- begin login -->
            
            <!-- end login -->
        </div>
        <!-- end #home -->
        <!----start:公告--->
        <div class="container announce-box">
            <i class="fa fa-volume-up fl"></i>
            <div class="notice_active fl">
            <ul style="height:40px;line-height:40px;overflow:hidden;">
              	<!-- <@spring.message code="zuixingonggao"/> --> 
              	<li style="margin-left:15px;" > 
              	 <a id="news_zxgg   style="color:red"></a>
              	</li>
              	<li style="margin-left:15px;" > 
              	 <a  id="news_zxgg1"  style="color:red"></a>
              	</li>
            </ul>
            </div>
           <!--  <a style="margin-left: 15px; color:red" id="news_zxgg" class="annouce-more" ></a>
            <a style="margin-left: 15px; color:red" id="news_zxgg1" class="annouce-more" ></a> -->
        </div>
        <!----end：公告 -->
        
       
        
        <!----begin：{{' A48 '| translate}}区 -->
            <div class="tabtablecon" style="border-top:1px solid #dcdcdc;">
            <div class="mr_frbox"> 
              
		        <div class="mr_frUl">
		        <img class="mr_frBtnL prev" src="${ctx}/static/${version}/lib/exstatic/img/mfrL.png" width="28" height="46" />
		            <ul id="changeArea">
		            
					 <!--<li class=""><a class="" href="#deal0" change="BCT" aria-expanded="false">BCT交易区</a></li> -->
		            </ul>
		            <img class="mr_frBtnR next" src="${ctx}/static/${version}/lib/exstatic/img/mfrR.png" width="28" height="46" />
		        </div>
		        
		      </div>
                <div role="tabpanel" class="tab-pane active" id="deal1" style="display:inline-block;width:100%;">
                            <!--start：{{' A48 '| translate}}区table-->
                            <table class="marketlist table table-valign-middle table-striped table-hover" id="marketlist" cellspacing="0" cellpadding="0">
								<thead>
									<tr style="height: 45px;color: #333333;background:#e3e6eb;">
									    <th></th>
									    <th></th>
									    <th></th>
									    <th></th>
                                        <th><@spring.message code="bizhong"/></th>
                                        <th><@spring.message code="zuixinchengjiaojia"/></th>
                                        <th><@spring.message code="24hourjiaoyiliang"/></th>
                                        <th><@spring.message code="zuigaojiazuidijia"/></th>
                                        <th><@spring.message code="zuorishoupanjia"/></th>
                                        <th><@spring.message code="rizhangdie"/></th>
                                        <th><@spring.message code="KLine"/></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
									    <th></th>
									</tr>
								</thead>
								<tbody style="color:#000; font-size:14px;" id="productInfo">
								</tbody>
							</table>
                            <!--end：{{' A48 '| translate}}区table-->
                        </div>
                    </div>
       
        <!-- end-{{' A48 '| translate}}区 -->
         <!-- begin #team -->
        <div class="content" style="padding: 30px 15px 30px;">
            <!-- begin container -->
            <div class="container">
               
                <!-- begin row -->
                <div class="row">
                    <!-- begin col-3 -->
                    <div class="col-md-3 col-sm-3 ">
                        <!-- begin team -->
                        <div class="team">             
                            <div class="image">
                                <img src="${ctx}/static/${version}/lib/exstatic/img/index/ya_one.png" width="55" alt="Ryan Teller" />
                            </div>
                            <div class="info">
								<h4 class="name"><@spring.message code="jiaoyikuaijiefangxin"/></h4>
								<div class="title text-theme">
									<p><@spring.message code="zhuanyezhongshenfangyujiagou"/></p>
									<p><@spring.message code="lengqianbao_lixian_save"/></p>
								</div>
						    </div>                  

                        </div>
                        <!-- end team -->
                    </div>
                    <!-- end col-3 -->
                    <!-- begin col-3 -->
                    <div class="col-md-3 col-sm-3">
                        <!-- begin team -->
                        <div class="team">             
                            <div class="image">
                                <img src="${ctx}/static/${version}/lib/exstatic/img/index/ya_two.png" width="55" alt="Jonny Cash" />
                            </div>
                           <div class="info">
								<h4 class="name"><@spring.message code="gongkaitouming"/></h4>
								<div class="title text-theme">
									<p><@spring.message code="safe_kekao_touming"/></p>
									<p><@spring.message code="kaiyuanproject"/></p>
								</div>
						   </div>                   
                        </div>
                        <!-- end team -->
                    </div>
                    <!-- end col-3 -->
                    <!-- begin col-3 -->
                    <div class="col-md-3 col-sm-3">
                        <!-- begin team -->
                        <div class="team">             
                            <div class="image">
                                <img src="${ctx}/static/${version}/lib/exstatic/img/index/ya_three.png" width="55" alt="Mia Donovan" />
                            </div>
                              <div class="info">
								<h4 class="name"><@spring.message code="quanshifuwu"/></h4>
								<div class="title text-theme">
									<p><@spring.message code="zhuanyeshuzizichanyujiaoyi"/></p>
									<p><@spring.message code="kefu24houronline"/></p>
								</div>
						      </div>                        
                        </div>
                        <!-- end team -->
                    </div>
                    <!-- end col-3 -->
                    
                    <!-- begin col-3 -->
                    <div class="col-md-3 col-sm-3" style="padding: 0;">
                        <!-- begin team -->
                        <div class="team">             
                            <div class="image">
                                <img src="${ctx}/static/${version}/lib/exstatic/img/index/ya_four.png" width="55" alt="Mia Donovan" />
                            </div>
                            <div class="info">
							   <h4 class="name"><@spring.message code="quanzhunbeijin"/></h4>
								<div class="title text-theme">
									<p><@spring.message code="shuzibaozheng"/></p>
									<p><@spring.message code="RMBbaozheng"/></p>
								</div>
						    </div>
                        </div>
                        
                    </div>
                    <!-- end col-3 -->
                    
                </div>
                <!-- end row -->
            </div>
            <!-- end container -->
        </div>
        <!-- end #team -->
        
        <!-- start banner2 -->
		  <!-- <div class="banner_two">
		  	<img src="${ctx}/static/${version}/lib/exstatic/img/index_banner2.jpg" style="width:100%;" alt="">
		  </div>  -->
		<!-- end banner2 -->
        <div class="index-news" style="padding-bottom:0;">
            <div  class="container" data-animation="true" data-animation-type="fadeInLeft">
                

                <div  class="col-xs-12 col-sm-4 col-md-4 col-lg-4 fadeInLeft contentAnimated" data-animation="true" data-animation-type="fadeInLeft">
                    <div class="secTitle clearfix">
                        <h4 class="fl" style="margin-top: 10px;"><@spring.message code="xinwenzixun"/></h4>
                        <a class="fr" href="${ctx}/news/index/5"><@spring.message code="more"/></a>
                    </div>
                    <ul id="xwzx5">
                    </ul>
                </div>
                <div  class="col-xs-12 col-sm-4 col-md-4 col-lg-4 fadeInLeft contentAnimated" data-animation="true" data-animation-type="fadeInLeft">
                    <div class="secTitle clearfix">
                        <h4 class="fl" style="margin-top: 10px;"><@spring.message code="news"/></h4>
                        <a class="fr" href="${ctx}/news/index/4"><@spring.message code="more"/></a>
                    </div>
                    <ul id="zxdt4">
                    </ul>
                </div>
                
                  <div  class="col-xs-12 col-sm-4 col-md-4 col-lg-4 fadeInLeft contentAnimated" data-animation="true" data-animation-type="fadeInLeft">
                    <div class="secTitle clearfix">
                        <h4 class="fl" style="margin-top: 10px;"><@spring.message code="hangyedongtai"/></h4>
                        <a class="fr" href="${ctx}/news/index/6"><@spring.message code="more"/></a>
                    </div>
                    <ul id="hydt6">
                    </ul>
                </div>
            </div>
        </div>
        
         <div class="flinks" style="background: #f6f6f6;">
            <div class="container" style="padding: 0;" id="divFriend">
            </div>
        </div> 
        
        <!-- 交易所end -->
	
<div class="clear"></div>
      
      	<div class="page-footer"   style="margin-top: 0px;position:relative;">
        	<@HryTopOrFooter url="base/footer.ftl"/>
        </div> 
        
        
 </div>
</body>
</html>

<!--币种信息模板 -->
<script id="productInfo_tmp" type="text/x-jquery-tmpl">
    <tr name="index_produtc_table">
		<td></td>
        <td></td>
        <td></td>
        <td></td>
         <td>
            <span class="cionpic" style="display: inline-block;">
                <img  src="/{{= picturePath}}" style="width: 20px;">
            </span>
            <a href="${ctx}/market<#if tokenId??>.do?symbol={{= coinCode}}&tokenId=${tokenId}</#if>" target="_blank" style="color:#000;">
                <span class="bizhong_en" style="colo:#000">{{= name}}</span> 
            </a>
        </td>
        <td>
            <!--上升用rate_up 下降用rate_down--->
                
                    <!--箭头向上用fa-long-arrow-up 箭头向下用fa-long-arrow-down--->
           {{if (currentExchangPrice>lastExchangPrice)}}
                <span class="rate_up">{{= Number(currentExchangPrice).toFixed(4)}}
                	<span ><i class="fa fa-long-arrow-up rate_up"></i></span>
                </span>
           {{/if}}	
            
           {{if (currentExchangPrice<lastExchangPrice)}}
                <span class="rate_down">{{= Number(currentExchangPrice).toFixed(4)}}
                	<span ><i class="fa fa-long-arrow-down rate_down"></i></span>
                </span
           {{/if}}	 
           
           {{if (currentExchangPrice==lastExchangPrice)}}
                <span>{{= Number(currentExchangPrice).toFixed(4)}}</span>
           {{/if}}	 
                
               
        </td>
        <td>{{= Number(transactionSum).toFixed(4) }}</td>
        <td>{{= Number(maxPrice).toFixed(4)}}/{{= Number(minPrice).toFixed(4)}}</td>
        <td>{{= Number(yesterdayPrice).toFixed(4)}}</td>
        <td>
            
             {{if (RiseAndFall>0)}}
                <span class="rate_up">{{= RiseAndFall}}%</span>
                	<span ><i class="fa fa-long-arrow-up rate_up"></i></span>
                 </span>
             {{/if}}	 
             {{if (RiseAndFall<0)}}
                <span class="rate_down">{{= RiseAndFall}}%</span>
                	<span ><i class="fa fa-long-arrow-down rate_down"></i></span>
               </span>
             {{/if}}	 
             {{if (RiseAndFall==0)}}
                <span >{{= RiseAndFall}}%</span>
                	
             {{/if}}	 
        </td>
		<td><a href="${ctx}/market?symbol={{= coinCode}}" target="_blank"><i class="fa fa-line-chart fa-fw" ></i></a></td>
		<td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</script>
<!-- 最新动态 行业动态 行业动态 -->
<script id="zxdt4_tmp" type="text/x-jquery-tmpl">
	<li><a href="${ctx}/news/info/{{= id}}">{{= title}}</a></li>
</script>
<script id="xwzx5_tmp" type="text/x-jquery-tmpl">
	<li><a href="${ctx}/news/info/{{= id}}">{{= title}}</a></li>
</script>
<script id="hydt6_tmp" type="text/x-jquery-tmpl">
	<li><a href="${ctx}/news/info/{{= id}}">{{= title}}</a></li>
</script>
<!-- 友情链接 -->
<script id="divFriend_tmp" type="text/x-jquery-tmpl">
	<div class='linkcontent clearfix col-md-2 col-sm-2'  style='display:inline-block;margin-top: 20px;'>
		<a style=''  href='{{= linkUrl}}' target='_blank'>
		<img style='display: inline-block;width: 165px;height: 60px;' alt=''  src="${ctx}/{{= picturePath}}">
		</a>
	</div>
</script> 

<script type="text/javascript"  src="${ctx}/static/${version}/lib/jquery/jquery.js"></script>
<script type="text/javascript"  src="${ctx}/static/${version}/lib/jquery/jquery.cookie.js"></script>
<script type="text/javascript"  src="${ctx}/static/${version}/js/i18n_base.js"></script>
<script type="text/javascript"  src="${ctx}/static/${version}/lib/seajs/sea.js"></script>
<script type="text/javascript">
 seajs.config({
    base: "${ctx}/static/${version}",
    alias: {
      <!-- 基础框架JS -->
      "jquery": "lib/exstatic/static/lib/jquery/jquery-1.9.1.min.js",
      "superslide": "lib/exstatic/js/jquery.SuperSlide2.js",
      "jqueryForm": "lib/jqueryForm/jquery.form.js",
      <!-- layer -->
      "layer" : "lib/layer/layer.js",
      <!-- 自定义JS -->
      "base": "js/base/base.js"
    },
    preload: ['jquery','jqueryForm','layer'],
    map:[
		['.js','.js?v=${t}']//映射规则
	]
  });
 
 seajs.use(["js/main","js/index","js/login"],function(m,obj,login,t){
	 m.init();
	
	 obj.gundong();
	 obj.init();
	 login.init();
 });
</script>





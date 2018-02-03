<!DOCTYPE html>
<html>

<head>
	<#include "/base/base.ftl">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<meta name="viewport" content="width=device-width, initial-scale=1">-->
    <meta name="description" content="">
    <meta name="author" content="">


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
</style>

<#--<@HryTopOrFooter url="base/topbar.ftl"/>-->

<!-- begin #page-container -->
    <div id="page-container" class="in">
        <!-- begin #header -->
        <div id="header" class="header navbar navbar-transparent navbar-fixed-top" style="position: absolute;top:30px;">
            <!-- begin container -->
            <div class="container">
                <!-- begin navbar-header -->
                <div class="navbar-header" >
					<style>
						.dropdown-menu {
							padding: 0;
							margin: 0;
						}
						.navbar-brand .open .dropdown-menu {
							display: inline-flex;
						}
					</style>
					
					<@HryTopOrFooter url="base/logo.ftl"/>
					<input id="language" value="${locale}" type="hidden"> 
					<#if isOpenLanguage=='0'>
					 <div class="foot_lang" style="margin-top:28px;">
		                <dl id="slide_lang"  class="">
		                   <dt>
		                     <span><i class="icon_lang icon_lang_zh_cn"></i></span><i class="icon_gray_arrows"></i>
		                   </dt>
		                   <dd id="slide_lang_box"   style="width:102px;">
		                  	  <#if locale == 'zh_CN'>
		                  	  	<a href="javascript:void(0);" class=""><i class="icon_lang icon_lang_en"></i>English</a>
		                  	  <#elseif locale == 'en'>
		                  	    <a href="javascript:void(0);" class=""><i class="icon_lang icon_lang_en"></i>简体中文</a>
		                  	  </#if>
		                   </dd>
		                </dl>
		            </div>		
		            </#if>
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#header-navbar">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
				</div>
                
                
            </div>
            <!-- end container -->
        </div>
        <!-- end #header -->

        <!-- begin #home -->
        <div class="page-banner page-banner-home login-h">
            <div class="banner-slogan">
                <div class="container">
                    <div role="tabpanel" class="reg-container col-md-5 col-sm-5 col-md-offset-4 col-sm-offset-4">

                        <!--注册表{{' A84 '| translate}}-->
                            <div role="tabpanel" class="tab-pane " id="reg1" style="background: rgba(148,169,200,0.8);">
                               	<form method="post"  class="login-form" >
                                    <div class="login-container">
                                        <h3 style="border-bottom: 1px solid #fff;color: #fff;" class="text-center"><@spring.message code="zhuce"/></h3>

                                        <div class="row" style="padding: 30px 0;">
                                            <div class="form-group  col-xs-12 col-sm-12">
                                               <i class="posa fa fa-envelope" style="top: 11px; font-size:22px;"></i>
                                               <input name="email" id="email" class="form-control input-lg" style="padding-left:50px" type="text" placeholder="<@spring.message code="please_write_email"/>"/>
                                            </div>
                                            <div class="form-group  col-xs-12 col-sm-12">
                                            	<i class="posa fa fa-keyboard-o"></i>
                                                <input name="password" id="password" class="form-control input-lg" style="padding-left:50px" type="password" placeholder="<@spring.message code="denglumimma"/>"/>
                                            </div>
                                            <div class="form-group  col-xs-12 col-sm-12">
                                                <i class="posa megico"></i>
                                                <div class="code-form-input clearfix">
                                                  <input style="padding-left:10px;outline:none; border:0px" name="registCode" id="registCode" class="form-picode input-lg" type="text" placeholder="<@spring.message code="tuxingyanzhengma"/>">
                                                  <span class="pull-right code-span"> <img id="img_captcha" title="换一张" src="${ctx}/sms/registcode?${t}" alt="换一张" width="80" > </span>
                                                </div>
                                            </div>
                                           <div class="form-group  col-xs-12 col-sm-12">
                                            	<i class="posa fa fa-user"></i>
                                                <input name="referralCode" id="referralCode" value="${commendCode}" class="form-control input-lg" style="padding-left:50px" type="text" placeholder="<@spring.message code="tuijianrenshoujihao"/>"/>
                                            </div>
                                            <div class="checkbox form-group  col-xs-12 col-sm-5  col-md-12 " style="height:20px;">
											    <label>
											      <input type="checkbox" id="check_deal"> <@spring.message code="woyiyuedu"/>  <a href="javascript:;" data-toggle="modal" data-target="#reg_pro">《<@spring.message code="zhucexieyi"/>》</a>
											    </label>
											</div>
                                            
                                            
                                            <div class="form-group  col-xs-12 col-sm-12">
                                                <button class="btn btn-primary-light btn-lg col-xs-12"  type="button"   id="regBtn" style="margin-bottom: 10px;"><@spring.message code="zhuce"/></button>
                                                <a class="pull-right"  href="${ctx}/login" style="color: #fff;"><@spring.message code="Login"/></a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        
                        
                    </div>

                </div>
            </div>
            <!-- /.banner-slogan -->
		
        </div>
        <!-- end #home -->

  		  
    </div>
    <!-- end #page-container -->
	<div class="page-footer">
    		<@HryTopOrFooter url="base/footer.ftl"/>
    </div>
</body>
</html>


<div class="modal fade ng-scope" id="reg_pro" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog" style="z-index:9999">
    <div class="modal-content  p-0 bg-dark" style="height:500px;overflow-y:auto;">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title"><@spring.message code="xieyi1"/></h4>
      </div>
      <div class="modal-body">
        <p class="text-left">   ${regreg}   
<!--<@spring.message code="xieyi2"/></br>
<@spring.message code="xieyi3"/></br>
<@spring.message code="xieyi4"/></br>
<@spring.message code="xieyi5"/></br>
<@spring.message code="xieyi6"/></br>
<@spring.message code="xieyi7"/></br>
<@spring.message code="xieyi8"/></br>
<@spring.message code="xieyi9"/></br>
<@spring.message code="xieyi10"/></br>
<@spring.message code="xieyi11"/></br>
<@spring.message code="xieyi12"/></br>
<@spring.message code="xieyi13"/></br>
<@spring.message code="xieyi14"/></br>
<@spring.message code="xieyi15"/></br>
<@spring.message code="xieyi16"/></br>
<@spring.message code="xieyi17"/></br>
<@spring.message code="xieyi18"/></br>
<@spring.message code="xieyi19"/></br>
<@spring.message code="xieyi20"/></br>
<@spring.message code="xieyi21"/></br>
<@spring.message code="xieyi22"/></br>
<@spring.message code="xieyi23"/></br>
<@spring.message code="xieyi24"/></br>
<@spring.message code="xieyi25"/></br>
<@spring.message code="xieyi26"/></br>
<@spring.message code="xieyi27"/></br>
<@spring.message code="xieyi28"/></br>
<@spring.message code="xieyi29"/></br>
<@spring.message code="xieyi30"/></br>
<@spring.message code="xieyi31"/></br>
<@spring.message code="xieyi32"/></br>
<@spring.message code="xieyi33"/></br>
<@spring.message code="xieyi34"/></br>
<@spring.message code="xieyi35"/></br>
<@spring.message code="xieyi36"/></br>
<@spring.message code="xieyi37"/></br>
<@spring.message code="xieyi38"/></br>
<@spring.message code="xieyi39"/></br>
<@spring.message code="xieyi40"/></br>
<@spring.message code="xieyi41"/></br>
<@spring.message code="xieyi42"/></br>
<@spring.message code="xieyi43"/></br>
<@spring.message code="xieyi44"/></br>
<@spring.message code="xieyi45"/></br>
<@spring.message code="xieyi46"/></br>
<@spring.message code="xieyi47"/></br>
<@spring.message code="xieyi48"/></br>
<@spring.message code="xieyi49"/></br>
<@spring.message code="xieyi50"/></br>
<@spring.message code="xieyi51"/></br>
<@spring.message code="xieyi52"/></br>
<@spring.message code="xieyi53"/></br>
<@spring.message code="xieyi54"/></br>
<@spring.message code="xieyi55"/></br>
<@spring.message code="xieyi56"/></br>
<@spring.message code="xieyi57"/></br>
<@spring.message code="xieyi58"/></br>
<@spring.message code="xieyi59"/></br>
<@spring.message code="xieyi60"/></br>
<@spring.message code="xieyi61"/></br>
<@spring.message code="xieyi62"/></br>
<@spring.message code="xieyi63"/></br>
<@spring.message code="xieyi64"/></br>
<@spring.message code="xieyi65"/></br>
<@spring.message code="xieyi66"/></br>
<@spring.message code="xieyi67"/></br>
<@spring.message code="xieyi68"/></br>
<@spring.message code="xieyi69"/></br>
<@spring.message code="xieyi70"/></br>
<@spring.message code="xieyi71"/></br>
<@spring.message code="xieyi72"/></br>
<@spring.message code="xieyi73"/></br>
<@spring.message code="xieyi74"/></br>
<@spring.message code="xieyi75"/></br>
<@spring.message code="xieyi76"/></br>
<@spring.message code="xieyi77"/></br>
<@spring.message code="xieyi78"/></br>
<@spring.message code="xieyi79"/></br>
<@spring.message code="xieyi80"/></br>
<@spring.message code="xieyi81"/></br>
<@spring.message code="xieyi82"/></br>
<@spring.message code="xieyi83"/></br>
<@spring.message code="xieyi84"/></br>
<@spring.message code="xieyi85"/></br>
<@spring.message code="xieyi86"/></br>
<@spring.message code="xieyi87"/></br>
<@spring.message code="xieyi88"/></br>
<@spring.message code="xieyi89"/></br>
<@spring.message code="xieyi90"/></br>
<@spring.message code="xieyi91"/></br>
<@spring.message code="xieyi92"/></br>
<@spring.message code="xieyi93"/></br>
<@spring.message code="xieyi94"/></br>
<@spring.message code="xieyi95"/></br>
<@spring.message code="xieyi96"/></br>
<@spring.message code="xieyi97"/></br>
<@spring.message code="xieyi98"/></br>
<@spring.message code="xieyi99"/></br>
<@spring.message code="xieyi100"/></br>
<@spring.message code="xieyi101"/></br>
<@spring.message code="xieyi102"/></br>
<@spring.message code="xieyi103"/></br>
<@spring.message code="xieyi104"/></br>
<@spring.message code="xieyi105"/></br>
<@spring.message code="xieyi106"/></br>
<@spring.message code="xieyi107"/></br>
<@spring.message code="xieyi108"/></br>
<@spring.message code="xieyi109"/></br>
<@spring.message code="xieyi110"/></br>-->
        </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal"><@spring.message code="guanbi"/></button>
      </div>
    </div>
  </div>
</div>


<script src="${ctx}/static/${version}/lib/google/js/jquery.min.js"></script>
<script type="text/javascript"  src="${ctx}/static/${version}/lib/seajs/sea.js"></script>
<script type="text/javascript" >
 seajs.config({
    base: "${ctx}/static/${version}",
    alias: {
      <!-- 基础框架JS -->
      "jquery": "lib/exstatic/static/lib/jquery/jquery-1.9.1.min.js",
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
 
 seajs.use(["js/main","js/reg","js/base/topbar","js/i18n_base"],function(m,reg,t){
	 m.init();
	 //注册页js
	 reg.init();
	 reg.refreshCode();
	 reg.sendsms(); 
	 t.language();
	 
 });
</script>




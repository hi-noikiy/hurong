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
	<link href="${ctx}/static/${version}/lib/verify/css/drag.css" rel="stylesheet" type="text/css">
	<link rel="stylesheet" type="text/css" href="${ctx}/static/${version}/lib/google/css/global.css">
    <link rel="stylesheet" type="text/css" href="${ctx}/static/${version}/lib/google/css/google.css">
    <link rel="stylesheet" type="text/css" href="${ctx}/static/${version}/lib/google/css/second.css">
</head>
<script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1264472947'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s19.cnzz.com/z_stat.php%3Fid%3D1264472947%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));</script><style>
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
.main {
    width: 349px;
    margin: 0 auto;
    padding-bottom: 20px;
}
#cnzz_stat_icon_1264472947{
display: none;
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

                        <!-- Tab panes -->
                        <div class="tab-content">
                            <!--登陆表{{' A84 '| translate}}-->
                            <div role="tabpanel" class="tab-pane active" id="login1" style="background: rgba(10,45,88,0.8);">
                                <form method="post"  class="login-form" >
                                    <div class="login-container">
                                        <h3 style="border-bottom: 1px solid #fff;color: #fff;" class="text-left"><@spring.message code="Login"/></h3>

                                        <div class="row" style="padding: 30px 0;">
                                            <div class="form-group  col-xs-12 col-sm-12">
                                               <i class="posa fa fa-envelope" style="top: 11px;font-size:22px;"></i>
                                               <input type="hidden" class="market" value="${market}" >
                                               <input name="username" id="username" class="form-control input-lg" style="padding-left:50px" type="text" placeholder="<@spring.message code="please_write_email"/>"/>
                                            </div>
                                            <div class="form-group  col-xs-12 col-sm-12">
                                            	<i class="posa fa fa-keyboard-o"></i>
                                                <input name="password" id="password" class="form-control input-lg" style="padding-left:50px" type="password" placeholder="<@spring.message code="please_write_pwd"/>"/>
                                            </div>
                                             
                                             <div class="form-group  col-xs-12 col-sm-12">
											        <div id="drag"></div>
                                            </div>
                                             
											                                            <div class="form-group  col-xs-12 col-sm-12">
                                                <button class="btn btn-primary-light btn-lg col-xs-12"  type="button"   id="loginBtn" style="margin-bottom: 10px;"><@spring.message code="Login"/></button>
                                                
                                                <a class="pull-left"  href="${ctx}/reg" style="color: #fff;"><@spring.message code="register"/></a>
                                                <a class="pull-right"  href="${ctx}/forgetpwd/forgetpwd/1" style="color: #fff;"><@spring.message code="forgotpassword"/></a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            
                        </div>
                    </div>

                </div>
            </div>
            <!-- /.banner-slogan -->
		
        </div>
        <!-- end #home -->

        <div class="page-footer"   style="">
        	<@HryTopOrFooter url="base/footer.ftl"/>
        </div>
        
    </div>
    <!-- end #page-container -->




 <div class="verifyLayout">
    <div class="dialog_bg"></div>
    <div class="main dialogcon">
        <!---<a href="/"><img ng-src="/resources/img/logo-cn.svg" class="icon-logo" src="/resources/img/logo-cn.svg"></a>-->
         <div class="dialog-close">×</div>
        <!--banner -->
        <div class="verify middle ng-scope" ng-controller="googleVerifyCtr">
            <!-- 谷歌二次验证 -->
            <!-- ngIf: verifyType==1 -->


            <!-- 手机二次验证 -->
            <!-- ngIf: verifyType==2 -->
            <form class="verify-form ng-scope ng-pristine ng-valid" action="/user/login.html" method="post" id="mobile-form" ng-if="verifyType==2">
                <div class="verify-title"><span class=""><@spring.message code="shoujirenzheng"/></span></div>
                <input type="text" readonly="" name="email" ng-model="email" style="display:none;" class="ng-pristine ng-valid">
                <input type="hidden" name="operationType" value="mobile">
                <div class="filed">
                    <input style="width:186px;" type="text" id="verifyCode" name="verifyCode" class="ipt">
                    <button type="button" id="sendBtn" class="btn btn-grey" ><@spring.message code="fasongyanzhengma"/></button>
                    <p class="Validform_checktip f-nomargin f-left Validform_wrong"></p>
                </div>
                <div class="filed">
                    <input type="button"  value="<@spring.message code="queding"/>" class="btn btn-orange btn-block phone" class="mobile-btn">
                </div>
            </form>
            <!-- end ngIf: verifyType==2 -->

            <!-- 谷歌或手机二次验证 -->
            <!-- ngIf: verifyType==0 -->
        </div>
    </div>
  </div>



 <div class="verifyLayout1">
      <div class="dialog_bg"></div>
    <div class="main dialogcon">
            <!--<a href="/"><img  class="icon-logo" src="/resources/img/logo-cn.svg"></a>-->
            <!--banner -->
            <div class="dialog-close">×</div>
            <div class="verify middle">
                <!-- 谷歌二次验证 -->
                <!-- ngIf: verifyType==1 -->
                <form class="verify-form" action="" method="post" id="googleVerify-form">
                    <div class="verify-title"><span class=""><@spring.message code="gugerenzheng"/></span></div>
                    <input type="text" readonly="" name="email" style="display:none;" class="n">
                    <input type="hidden" name="operationType" value="google">
                    <div class="filed">
                        <input type="text" id="password" name="verifyCode" class="ipt googlee" id="verifyCode1">
                        <p class="Validform_checktip f-nomargin f-left"></p>
                    </div>
                    <div class="filed">
                        <input type="button"  value="<@spring.message code="queding"/>" class="btn btn-orange btn-block goog" class="googleVerify-btn">
                    </div>
                </form>
                <!-- end ngIf: verifyType==1 -->


                <!-- 手机二次验证 -->
                <!-- ngIf: verifyType==2 -->

                <!-- 谷歌或手机二次验证 -->
                <!-- ngIf: verifyType==0 -->
            </div>
             </div>
        </div>
    </div>


 <div class="verifyLayout2">
         <div class="dialog_bg"></div>
    <div class="main dialogcon">
            <!--<a href="/"><img class="icon-logo" src="/resources/img/logo-cn.svg"></a>-->
            <!--banner -->
             <div class="dialog-close">×</div>
            <div class="verify middle">
                <!-- 谷歌二次验证 -->
                <!-- ngIf: verifyType==1 -->


                <!-- 手机二次验证 -->
                <!-- ngIf: verifyType==2 -->

                <!-- 谷歌或手机二次验证 -->
                <!-- ngIf: verifyType==0 -->
                <div>
                    <div class="verify-title"><span class=""><@spring.message code="erciyanzheng"/></span></div>
                    <div class="btns">
                        <span class="btn cur"><@spring.message code="gugerenzheng"/></span><span class="btn"><@spring.message code="shoujirenzheng"/></span>
                    </div>
                    <form class="verify-form" action="" method="post" id="googleVerify-form">

                        <input type="text" id="email" name="email" style="display:none;">
                        <input type="hidden" name="operationType" value="google">
                        <div class="label f-left"><@spring.message code="gugeyanzhengma"/></div>
                        <div class="filed">
                            <input type="text" name="verifyCode" class="ipt  secondg" datatype="*" nullmsg="该字段不能为空">
                            <p class="Validform_checktip f-nomargin f-left"></p>
                        </div>
                        <div class="filed">
                            <input type="button"  value="<@spring.message code="queding"/>" class="btn btn-orange btn-block googleVerifyb " class="">
                        </div>
                    </form>
                    <form class="verify-form1" action="" method="post" id="mobile-form">
                        <div class="label f-left"><@spring.message code="duanxinyanzhengma"/></div>
                        <input type="text" readonly="" name="email" style="display:none;" class="">
                        <input type="hidden" name="operationType" value="mobile">
                        <div class="filed">
                            <input style="width:186px;" type="text" id="password" name="verifyCode" class="ipt secondp">
                            <button type="button" id="sendBtn1" class="btn btn-grey"><@spring.message code="fasongyanzhengma"/></button>
                            <p class="Validform_checktip f-nomargin f-left"></p>
                        </div>
                        <div class="filed">
                            <input type="button"  value="<@spring.message code="queding"/>" class="btn btn-orange btn-block mobileb" class="">
                        </div>
                    </form>
                </div>
                <!-- end ngIf: verifyType==0 -->
            </div>
        </div>
    </div>
    </div>

</body>
</html>
<script src="${ctx}/static/${version}/lib/google/js/jquery.min.js"></script>
<script type="text/javascript"  src="${ctx}/static/${version}/lib/seajs/sea.js"></script>
<script type="text/javascript"  src="${ctx}/static/${version}/lib/verify/js/drag.js"></script>
<script type="text/javascript"  src="${ctx}/static/${version}/lib/jquery/jquery.cookie.js"></script>
<script type="text/javascript">
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
 
 seajs.use(["js/main","js/login","js/base/topbar","js/i18n_base","js/base/secondvail","js/base/firstvail"],function(m,login,t,o,mg,fi){
	 m.init();
	 //登录页js
	 login.init();
	 t.language();
	 mg.mgvail("login");
	 
 });
</script>
<script type="text/javascript">
        $('#drag').drag();
</script>



<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>谷歌验证</title>
    <#include "/base/base.ftl">
    <link rel="stylesheet" type="text/css" href="${ctx}/static/${version}/lib/google/css/global.css">
    <link rel="stylesheet" type="text/css" href="${ctx}/static/${version}/lib/google/css/google.css">
</head>

<body>
<div class="container-fluid person-con">
    <div class="wrap">
        <div class="">
            <div class="midContainer">
                  <div class="">
            <div class="midContainer" >
              <!--  <div class="safetitle">绑定谷歌验证</div>-->
              	<div class="row" style="margin-bottom:15px;">
				<div class="panel_wrap_head wrap_head">
					<div class="">
						<ul class="wrap_tabs" role="tablist" id="RMBtab">
							<li role="presentation" class="active pull-left">
								<a href=""><@spring.message code="shezhigugeyanzhengma"/></a>
							</li>

						</ul>
					</div>
				</div>
			</div>
                <div class="safecontent">
                    <form id="googleAuthen-form" action="" method="post" style="padding:0;overflow: hidden;margin-top: -12px" class="">
                        <input type="hidden" name="secretKey" value="XXN4VSWT74IKUMND">
                        <ul class="googleAuthen-items">
                            <li class="f-cb">
                                <div class="item-title" style="line-height:34px;"> <@spring.message code="firstgoogle"/>: </div>
                                <div class="item-body downloads f-fl">
                                    <a href="https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8" target="_blank"><i class="icon-googleAuthen icon-googleAuthen-ios"></i></a>
                                    <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2" target="_blank"><i class="icon-googleAuthen icon-googleAuthen-play"></i></a>
                                </div>
                            </li>
                            <li>
                                <div class="item-title "><@spring.message code="secondgoogle"/></div>
                                <div class="item-body">
                                    <div class="code">
                                        <div class="ewm" id="ewm">
<div id="qrcodeTable"></div>
                                        </div>
                                        <div class="text">
                                            <span class="secret-tag"><@spring.message code="miwen"/>: </span>
                                            <input class="text-con"  class="googlekey">
                                          	<input type="hidden"  class="mobile" />
                                            <button class="secret-tag" id="sendb" style="cursor:pointer;"><@spring.message code="shuaxin"/></button>
                                           <!-- <input type="hidden" value="${user.mobile}" class="mobile" />-->
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li style="margin-bottom: 0">
                                <div class="item-title"><@spring.message code="threegoogle"/>： </div>
                                <div class="item-body">
                                    <div class="faCode">
                                        <input  type="password" id="accountGoogleWord" datatype="*" nullmsg="The password code should not be empty.">
                                        <input type="hidden" name="password" id="accountGoogleWord">
                                        <p class="f-nomargin Validform_checktip"></p><!--填写提示语句的地儿，校验我没加，如果这个用不到，可以删掉-->
                                    </div>
                                    <div id="errorMsg"></div>
                                </div>
                            </li>
                        </ul>
                       <div class="btns"><span class="btn btn-orange" id="submitBtn"><@spring.message code="qiyong"/></span></div>
                    </form>
                </div>
            </div>
        
        </div>
    </div>
 </div>
</body>

</html>
<script type="text/javascript"  src="${ctx}/static/${version}/lib/seajs/sea.js"></script>
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
seajs.use(["js/front/user/setgoogle","js/i18n_base"],function(o){
	o.init();
	o.sendsms();
	o.sendb();
});


</script>	
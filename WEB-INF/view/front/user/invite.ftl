<!DOCTYPE html>
<html  lang="en">
<head>
<#include "/base/base.ftl">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta content="" name="description">
<meta content="" name="author">
<@HryTopOrFooter url="base/title.ftl"/>
<!-- ================== BEGIN BASE CSS STYLE =============== -->
<link href="${ctx}/static/${version}/lib/exstatic/css/bootstrap.min.css" rel="stylesheet">
<link href="${ctx}/static/${version}/lib/exstatic/css/font-awesome.min.css" rel="stylesheet">
<link href="${ctx}/static/${version}/lib/exstatic/css/style.min.css" rel="stylesheet" />

</head>
<body >
	<!-- topbar -->
	<div id="page-container" class="container fade  ng-scope in">
		<!-- 头部导航 -->
	
		<input type="hidden" name="tokenId" id="tokenId" value="${tokenId}"/>
		<!-- 中间切换区域 -->
		<div id="content" class="content col-md-10 col-sm-10"  style="margin: 0px; min-height: 800px; padding: 0;">
			<#import "/base/spring.ftl" as spring/>
			<style>
				i.form-control-feedback {
					right: 10px;
				}
			</style>
            <div class="container-fluid person-con">
				<!-- begin page-header -->
				<div class="row" style="margin-bottom:15px;">
					<div class="panel_wrap_head wrap_head">
						<div class="">
							<ul class="wrap_tabs">
								<li role="presentation" class="active pull-left">
									<a href="javascript:void(0);"><@spring.message code="yaoqingtuijian"/></a>
								</li>
	
							</ul>
						</div>
					</div>
				</div>
				<!-- end page-header -->
				<!-- 邀请推荐中间内容 -->
					<div class="invite ng-scope">
					<div class="f-cb">
						<div class="inviteLink f-fl">
							<div class="item ng-binding" style="margin-top:25px;">
								<label><@spring.message code="wodeyaoqingma"/>： </label><span id="inviteLink">${info.commendCode}</span>
								<span class="iconfont fa fa-file-text icon-copy copy-btn" data-clipboard-target="#inviteLink" title="复制到剪切板"></span>
							</div>
							<div class="item">
								<label><@spring.message code="yaoqinglianjie"/>： </label>
								<input id="inviteLink1" type="text" name="inviteLink" value="${info.commendLink}" readonly="">
								<span class="iconfont fa fa-file-text icon-copy copy-btn" data-clipboard-target="#inviteLink1" title="复制到剪切板"></span>
							</div>
						</div>

						<div class="inviteData f-fr">
							<table>
								<colgroup style="width:50%"></colgroup>
								<colgroup style="width:50%"></colgroup>
								<tbody>
									<tr>
										<th><img src=""><@spring.message code="yituijianpengyou"/></th>
									</tr>
									<tr>
										<td><strong class="ng-binding">${info.commendCount}</strong></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<!-- 邀请推荐中间内容结束 -->
				
                  
			</div>
			<!--end page-container --->
			  <div class="container-fluid person-con">
				<!-- begin page-header -->
				<div class="row" style="margin-bottom:15px;">
					<div class="panel_wrap_head wrap_head">
						<div class="">
							<ul class="wrap_tabs">
								<li role="presentation" class="active pull-left">
									<a href="javascript:void(0);"><@spring.message code="fanyongjilu"/></a>
								</li>
	
							</ul>
						</div>
					</div>
				</div>
				<div class="Commission">
				 <table>
				  <thead>
				   <tr>
				    <th><@spring.message code="fanyongbizhong"/></th>
				    <th><@spring.message code="yifanyongjine"/></th>
				    <th><@spring.message code="weifanyongjine"/></th>
				   </tr>
				  </thead>
				  <tbody id="aab">
				  </tbody>
				 </table>
				</div>
				</div>
</body>


<#include "/base/base.ftl">


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
seajs.use(["js/front/user/setcommend","js/i18n_base"],function(o){
	o.init();
});


</script>

</html>





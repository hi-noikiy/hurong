<!DOCTYPE html>
<html lang="en">
<head>
	<#include "/base/base.ftl">
	<meta charset="UTF-8">
	<!-- <link href="css/public.css" rel="stylesheet" /> -->
	<link href="${ctx}/static/${version}/css/local.css" rel="stylesheet" />
	<link href="${ctx}/static/${version}/css/index.css" rel="stylesheet" />
	<title>首页</title>
</head>
<body>
	<#include "/header_shanlin.ftl">
	<!--banner图 -->
	<div class="bannerBox">
		<div class="xy-banner">
			<div class="loginInner">
				<h3><@spring.message code="Login"/></h3>
				<form>
					<ul>
						<li>
							<span class="loginUsername icon-ren"></span>
							<input type="text" id="username" class="loginInput" />
						</li>
						<li>
							<span class="loginPassword icon-suo"></span>
							<input type="password" id="password" class="loginInput" />
						</li>
						<li>
							<input type="button" id="loginBtn" class="submitBtn" value="<@spring.message code="Login"/>" />
						</li>
						<li class="bottomHandle">
							<span class="fl"><a href="#"><@spring.message code="forgotpassword"/></a></span>
							<span class="fr">
								<a href="#"><@spring.message code="meiyouzhanghao"/>？</a>
								<a href="#" class="regOnce" ><@spring.message code="freeregistration"/></a>
							</span>
						</li>
					</ul>
				</form>
			</div>
		</div>
	</div>
	<div class="noticeBox">
		<div class="noticeCon">
			<a id="news_zxgg" style="color:red"></a>
		</div>
	</div>
<!-- 	内容区 -->
	<div class="content">
		<div class="container">
			<ul class="dealBox" id="dealBox">
				
			</ul>
			<ul class="marketBox" id="marketArea">
				
			</ul>
		</div>
		<div class="section section_1">
			<div class="container">
				<div class="sectionTop">
					<div class="sectionTitle"><@spring.message code="xinshouzhiyin"/></div>
					<div class="sectionText"><@spring.message code="weinintigongzuixizhi"/></div>
					<div class="sectionBorder"></div>
				</div>
				<div class="sectionBottom">
					<div class="stepBox">
						<div class="stepTitle"><@spring.message code="yonghuzhuce"/></div>
						<div class="stepCenter">
							<div class="stepNum">1</div>
							<div class="stepWord"><@spring.message code="xinyonghuzhucejike"/></div>
						</div>
						<div class="onceBtn"><@spring.message code="lijizhuce"/></div>
					</div>
					<span class="stepIcon"></span>
					<div class="stepBox">
						<div class="stepTitle"><@spring.message code="shimingrenzheng"/></div>
						<div class="stepCenter">
							<div class="stepNum">2</div>
							<div class="stepWord"><@spring.message code="jinxingshimingrenzheng"/></div>
						</div>
						<div class="onceBtn"><@spring.message code="lijirenzheng"/></div>
					</div>
					<span class="stepIcon"></span>
					<div class="stepBox">
						<div class="stepTitle"><@spring.message code="chongbijiaoyi"/></div>
						<div class="stepCenter">
							<div class="stepNum">3</div>
							<div class="stepWord"><@spring.message code="chongbimianshouxufei"/></div>
						</div>
						<div class="onceBtn bigButton"><@spring.message code="jinrujiaoyizhongxin"/></div>
					</div>
					<span class="stepIcon"></span>
					<div class="stepBox">
						<div class="stepTitle"><@spring.message code="tuijianjiangli"/></div>
						<div class="stepCenter">
							<div class="stepNum">4</div>
							<div class="stepWord"><@spring.message code="yaoqingrenjiangli"/></div>
						</div>
						<div class="onceBtn"><@spring.message code="tuijianlianjie"/></div>
					</div>
				</div>
			</div>
		</div>
		<div class="section section_2">
			<div class="container">
				<div class="sectionTop">
					<div class="sectionTitle"><@spring.message code="zuixinzixun"/></div>
					<div class="sectionText"><@spring.message code="weinintigongzuixindehangyedongtai"/></div>
					<div class="sectionBorder"></div>
				</div>
				<div class="sectionBottom">
					<div class="newsBox fl" id="zxdt4">
						<div class="newsTitle"><@spring.message code="guanfanggonggao"/><span><a href="${ctx}/news/index/4"><@spring.message code="more"/></a></span></div>
						
					</div>	
					<div class="newsBox fr" id="hydt6">
						<div class="newsTitle"><@spring.message code="yeneidongtai"/><span><a href="${ctx}/news/index/6"><@spring.message code="more"/></a></span></div>
					</div>		 	
				</div>
			</div>
		</div>
		<div class="section section_3">
			<div class="container">
				<div class="sectionTop">
					<div class="sectionTitle"><@spring.message code="onebi"/></div>
					<div class="sectionText"><@spring.message code="yidongkehuduanliulanhangqing"/></div>
					<div class="sectionBorder"></div>
				</div>
				<div class="sectionBottom paddingDown">
					<div class="phoneL fl"></div>
					<div class="phoneC fl">
						<div class="loadBox">
						<a href="#">
							<span class="phoneIcon  pnone_1"></span><span class="cut"></span>iphone 下载
						</a>
						</div>
						<div class="loadBox">
						<a href="#">
							<span class="phoneIcon pnone_2"></span><span class="cut"></span>Android 下载
						</a>
						</div>
					</div>
					<div class="phoneR fl">
						<img src="${ctx}/static/${version}/img/index/code_1.png" height="156" width="156" />
					</div>
				</div>
			</div>
		</div>
		<div class="section section_4">
			<div class="container">
				<div class="sectionTop">
					<div class="sectionTitle"><@spring.message code="onebi"/></div>
					<div class="sectionText"><@spring.message code="yidongkehuduanliulanhangqing"/></div>
					<div class="sectionBorder"></div>
				</div>
				<div class="sectionBottom">
					<div class="safeBox">
						<div class="safeImg"><img src="${ctx}/static/${version}/img/index/safe_1.png" /></div>
						<div class="safeWord"><@spring.message code="yidongkehuduanliulanhangqing"/></div>
					</div>
					<div class="safeBox">
						<div class="safeImg"><img src="${ctx}/static/${version}/img/index/safe_2.png" /></div>
						<div class="safeWord"><@spring.message code="zhuanyejinrong"/></div>
					</div>
					<div class="safeBox">
						<div class="safeImg"><img src="${ctx}/static/${version}/img/index/safe_3.png" /></div>
						<div class="safeWord"><@spring.message code="zijinliuzhuan"/></div>
					</div>
					<div class="safeBox">
						<div class="safeImg"><img src="${ctx}/static/${version}/img/index/safe_4.png" /></div>
						<div class="safeWord"><@spring.message code="7X24"/></div>
					</div>
				</div>
			</div>
		</div>
		<div class="section section_5">
			<div class="container">
				<div class="sectionTop">
					<div class="sectionTitle"><@spring.message code="onebi"/></div>
					<div class="sectionText"><@spring.message code="yidongkehuduanliulanhangqing"/></div>
					<div class="sectionBorder"></div>
				</div>
				<div class="sectionBottom">
					<div class="offerBox">
						<div class="offerImg"><img src="${ctx}/static/${version}/img/index/net_1.png" /></div>
						<div class="offerWord"><@spring.message code="wangluoanquanrenzheng"/></div>
					</div>
					<div class="offerBox">
						<div class="offerImg"><img src="${ctx}/static/${version}/img/index/net_2.png" /></div>
						<div class="offerWord"><@spring.message code="wangluoanquanrenzheng"/></div>
					</div>
					<div class="offerBox">
						<div class="offerImg"><img src="${ctx}/static/${version}/img/index/net_3.png" /></div>
						<div class="offerWord"><@spring.message code="wangluoanquanrenzheng"/></div>
					</div>
					<div class="offerBox">
						<div class="offerImg"><img src="${ctx}/static/${version}/img/index/net_4.png" /></div>
						<div class="offerWord"><@spring.message code="wangluoanquanrenzheng"/></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<#include "/footer_shanlin.ftl">
</body>
</html>
<!-- 最新动态 -->
<script id="zxdt4_tmp" type="text/x-jquery-tmpl">
	<div class="axisBox">
		<div class="timeLeft">{{= created}}<span class="yellowBall"></span></div>
		<div class="newsRight">
			<div class="newsName">{{= title}}</div>
			<div class="newsItem">{{if (content.length>30)}}{{= content.substr(0,30)}}.....{{else}}{{= content}}{{/if}}</div>
		</div>
	</div>
</script>
<!-- 行业动态 -->
<script id="hydt6_tmp" type="text/x-jquery-tmpl">
	<div class="axisBox">
		<div class="timeLeft">{{= created}}<span class="yellowBall"></span></div>
		<div class="newsRight">
			<div class="newsName">{{= title}}</div>
			<div class="newsItem">{{if (content.length>30)}}{{= content.substr(0,30)}}.....{{else}}{{= content}}{{/if}}</div>
		</div>
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
 
 seajs.use(["js/index_shanlin","js/login"],function(i){
	 i.init();
	 i.login();
	 i.hcharts();
 });
</script>
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
<link href="${ctx}/static/${version}/lib/exstatic/css/animate.min.css" rel="stylesheet">
<link href="${ctx}/static/${version}/lib/exstatic/css/web-responsive.min.css" rel="stylesheet">
<link href="${ctx}/static/${version}/lib/exstatic/css/mdefault.css" id="theme" rel="stylesheet">
<link href="${ctx}/static/${version}/lib/exstatic/css/test.less" rel="stylesheet/less" type="text/css">
<link href="${ctx}/static/${version}/lib/exstatic/css/style.min.css" rel="stylesheet" />

<link rel="stylesheet" href="${ctx}/static/${version}/css/c2c/module.base.css">
<link rel="stylesheet" href="${ctx}/static/${version}/css/c2c//module.common.css">
<link rel="stylesheet" href="${ctx}/static/${version}/css/c2c//module.user.css">
<link rel="stylesheet" href="${ctx}/static/${version}/css/c2c//safe.css">

</head>
<body >
		<@HryTopOrFooter url="base/header_news.ftl"/>
		<input type="hidden" id="username" value="${user.username!}" />
		<input type="hidden" id="coinCode" value="${activeCoin!}" />
		<!-- 中间切换区域 -->
		<div id="content" class="content container-fluid "  style="margin: 0px; min-height: 800px;">
			
			<!--页面中部内容开始-->
	<div class="bk-onekey financen " style="padding-top: 22px;">
		<div class="container">
			<div class="finance-rd" style="width:100%; margin-left:0;">
				<div class="bk-tabList">
					<div class="bk-c2c-nav bk-band clearfix">
						<#if coinList ??>
						<#list coinList as coin >
							<#if activeCoin==coin>
								<a  class="active" href="${ctx}/c2c/${coin}">${coin}</a>
							<#else>
								<a  href="${ctx}/c2c/${coin}">${coin}</a>
							</#if>
						</#list>
						</#if>
						<a class="introabtn " href="#" target="_blank"><i class="fa fa-cube fa-fw"></i><@spring.message code="caozuoshuoming"/></a>
					</div>
					<div class="bk-tabList-bd bk-onekey-form bk-c2c-contlist">
						<div class="bk-tabList-list-usdt active">
							<div class="no-usdt-w ">
								
								
							</div>

<div class="bk-c2c-bd">
    <div class="row">
        <div class="col-xs-12">
            <div class="row">
                <div class="col-xs-6 buy">
                    <h3 class="b-title"><@spring.message code="buy"/> ${activeCoin!}</h3>
                    <div id="buyDefaultForm"><div class="form-group has-feedback form-subline"><label for="buyUnitPrice" class="control-label"><span class="buyDefaultLabel"><@spring.message code="buyprice"/></span> (￥)
                            </label> <div class="input-group">
                            <input type="hidden" value="${c2cBuyPrice!0}"> 
                            <input type="text" id="buyUnitPrice" name="buyUnitPrice" readonly="readonly" value="${c2cBuyPrice!0}" class="form-control form-second"></div></div>
                             <div class="form-group has-feedback form-subline">
                             <label for="buyNumber" class="control-label"><@spring.message code="buycount"/>(${activeCoin!})</label>
                              <div class="input-group">
                                  <input type="text" id="buyNumber" name="buyNumber" class="form-control form-second">
                              </div></div> 
                              <div id="buyfinish">
                          			 <@spring.message code="xuyao"/> <span>0.00</span> CNY
                        	  </div>
                         <div class="form-group"><button id="buyBtn" type="button" class="btn btn-danger btn-block ft16">
            <@spring.message code="lijimairu"/>
                            </button></div></div>
                </div>

                <div class="col-xs-6 sell">
                    <h3 class="b-title"><@spring.message code="sell"/> ${activeCoin!}</h3>
                    <div id="sellDefaultForm"><div class="form-group has-feedback form-subline">
                    <label for="buyUnitPrice" class="control-label"><span class="sellDefaultLabel"><@spring.message code="sellprice"/></span> (￥)
                            </label> <div class="input-group"><input type="hidden" value="${c2cSellPrice!0}">
                             <input type="text" id="sellUnitPrice" name="sellUnitPrice" readonly="readonly" value="${c2cSellPrice!0}" class="form-control form-second"></div></div>
                              <div class="form-group has-feedback form-subline">
                              <label for="sellNumber" class="control-label"><@spring.message code="sellcount"/> (${activeCoin!})</label> <div class="input-group">
                              <input type="text" id="sellNumber" name="sellNumber" class="form-control form-second"></div></div> 
                              <div id="sellfinish">
                            		<@spring.message code="kede"/> <span>0.00</span> CNY
                      		  </div> 
                        <div class="form-group"><button id="sellBtn" type="button" class="btn btn-second btn-block ft16">
          <@spring.message code="lijimaichu"/>
                            </button></div></div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-xs-6">
            <div class="exchangetlist" id="usdtcnybuylist">
                <div class="shd">
                    <span><@spring.message code="shanghu"/></span>
                    <b><@spring.message code="chengjiaoshuliang"/></b>
                    <span class="typeshow"><@spring.message code="type"/></span>
                    <a><@spring.message code="state"/></a>
                </div>
                <div class="bd">
                    <div class="tempWrap" style="overflow:hidden; position:relative; height:64px">
                    <ul style="height: 1248px; position: relative; padding: 0px; margin: 0px; top: -32px;">
                    	<li style="height: 32px;"></li>
                    	<#if buyList??>
                    	<#list buyList as o>
                    		<li style="height: 32px;"><span><i class="fa fa-user fa-fw"></i>${o.userName}</span><b>${o.transactionCount}&nbsp;&nbsp;${o.coinCode}</b><span class="typeshow"><@spring.message code="buy"/></span><a><@spring.message code="jiaoyiwancheng"/></a>
                    		</li>
                    	</#list>
                    	</#if>
                	</ul>
                	</div>
                </div>

            </div>



        </div>

        <div class="col-xs-6">
            <div class="exchangetlist" id="usdtcnyselllist">
                <div class="shd">
                    <span><@spring.message code="shanghu"/></span>
                    <b><@spring.message code="chengjiaoshuliang"/></b>
                    <span class="typeshow"><@spring.message code="type"/></span>
                    <a><@spring.message code="state"/></a>
                </div>
                <div class="bd">
                	<ul style="height: 1248px; position: relative; padding: 0px; margin: 0px; top: -32px;">
                    	<li style="height: 32px;"></li>
                    	<#if sellList??>
                    	<#list sellList as o>
                    	<li style="height: 32px;"><span><i class="fa fa-user fa-fw"></i>${o.userName}</span><b>${o.transactionCount}&nbsp;&nbsp;${o.coinCode}</b><span class="typeshow"><@spring.message code="sell"/></span><a><@spring.message code="jiaoyiwancheng"/></a></li>
                    	</#list>
                    	</#if>
                	</ul>
                </div>

            </div>
        </div>

    </div>


</div>


</div>

</div>

<div class="usdtnote">
	<div class="notecont">
		<@spring.message code="c2cshuoming"/>
	</div>
</div>

<div class="bk-pageTit" id="exchangeRecord">
	<h4 class="pull-left"><@spring.message code="zuijinduihuanjilu"/>
		<a class="btn card-add" role="button" onclick="goCard()"><i class="iconfont icon-tianjialeimu"></i><@spring.message code="more"/></a>
	</h4>
	<div class="clearfix"></div>
	<div class="table-responsive ">
		<table id="billDetail" class="table table-striped table-bordered table-hover">
			<thead>
			<tr>
				<th width="15%"><@spring.message code="time"/></th>
				<th width="20%" style="text-align:left;"><@spring.message code="type"/></th>
				<th width="10%" style="text-align:left;"><@spring.message code="shuliang"/></th>
				<th width="10%" style="text-align:left;"><@spring.message code="price"/>(￥)</th>
				<th width="10%" style="text-align:left;"><@spring.message code="totalprice"/>(￥)</th>
				<th width="10%" style="text-align:center;"><@spring.message code="state"/></th>
				<th width="10%" style="text-align:center;">订单信息</th>
				<th width="25%" style="text-align:center;"><@spring.message code="caozhuo"/></th>
			</tr>
			</thead>
			<tbody>
			<#if orderList?? && (orderList?size > 0)>
			<#list orderList as o>
			<tr class="wait" style="font-size:12px;" >
				<td width="15%">${(o.transactionTime?string("yyyy-MM-dd HH:dd:ss"))!}</td>
				<td width="10%" style="text-align:left;">${o.coinCode}<#if o.transactionType==1>(买入)<#else>(卖出)</#if></td>
				<td width="10%" style="text-align:left;">${o.transactionCount}</td>
				<td width="10%" style="text-align:left;">${o.transactionPrice}</td>
				<td width="10%" style="text-align:left;">${o.transactionMoney}</td>
				<td width="10%"  style="text-align:center;">
					<#if o.status==1>
							<#if o.status2==1>
							未支付
							<#elseif o.status2==2 >
							已支付
							</#if>
					<#elseif o.status==2>
					已完成
					<#else>
					已否决
					
					<#if o.status2==3>
					(交易关闭)
					<#elseif o.status2==4 >
					(交易失败)
					</#if>
					
					</#if>
				</td>
				<td width="10%" style="text-align:center;">
					<a href="javascript:void(0)"  transactionnum="${o.transactionNum}"  ><font color="red"><#if o.transactionType==1>付款信息<#else>收款信息</#if></font></a>
				</td>
				<td width="25%" style="text-align:center;">
					<#if o.status==1>
						<#if o.transactionType==1>
							<#if o.status2!=2>
								<a href="javascript:void(0)"  transactionnum1="${o.transactionNum}"  ><font color="red">支付完成</font></a>
								<a href="javascript:void(0)"  transactionnum3="${o.transactionNum}"  ><font color="red">交易关闭</font></a>
							</#if>
							<#if o.status2==2>
							<a href="javascript:void(0)"  transactionnum2="${o.transactionNum}"  ><font color="red">交易失败</font></a>
							</#if>
						</#if>
					</#if>
				</td>
			</tr>
			</#list>
			<#else>
			<tr>
				<td colspan="6"><div class="bk-norecord"><p><i class="bk-ico info"></i></p></div></td>
			</tr>
			</#if>
			<tr></tr>
			</tbody>
		</table>
	</div>
</div>
</div>
</div>
</div>
</div>
</div>
<!--页面中部内容结束-->

					
		</div>
		
		<!-- 底部锚点 -->
		<a href="javascript:void(0);" class="btn btn-icon btn-circle btn-success btn-scroll-to-top fade" data-click="scroll-top"><i class="fa fa-angle-up"></i></a>
	</div>
	<div class="page-footer col-md-12 col-sm-12 ng-scope"  >
			<@HryTopOrFooter url="base/footer.ftl"/>
	</div>
</body>



<div id='closediv' class="hide">
  <h3>是否确认关闭交易？</h3>
  <textarea id="closeRemark" style="width:80%;"  rows="3" cols="20">请填写关闭原因</textarea>
</div>

<div id='faildiv' class="hide">
  <h3>是否确认交易失败？</h3>
  <textarea id="failRemark"  style="width:80%;"  rows="3" cols="20">请填写失败原因</textarea>
</div>

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
 
 seajs.use(["js/front/main_news","js/c2c"],function(m,c2c){
 
	 m.init();
	 
	 c2c.init();
	 
	 c2c.getdeatil();
	 
 });
</script>
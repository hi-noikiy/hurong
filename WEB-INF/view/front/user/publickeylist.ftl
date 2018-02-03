<#import "/base/spring.ftl" as spring/>
 	<style>
 		i.form-control-feedback{
 		 right:15px;
 		}
 	</style>	
 	
 	<div class="container-fluid person-con">
 	
				<!-- begin page-header -->
				<div class="row" style="margin-bottom:15px;">
					<div class="panel_wrap_head wrap_head">
						<div class="">
							<ul class="wrap_tabs" role="tablist" id="RMBtab">
								<li role="presentation" class="active pull-left">
									<a href=""><@spring.message code="huobitixiandizhiguanli"/></a>
								</li>
	
							</ul>
						</div>
					</div>
				</div>
				<!-- end page-header -->

				<!---start:{{' A62 '| translate}}{{' A44 '| translate}}表{{' A84 '| translate}}---->
				<form class="form-horizontal withdraw-form RMB-widthdraw p-20" id="withdraw_address_form" name="withdraw_address_form"  >
					<div class="form-group">
							<label class="col-sm-3 control-label"><@spring.message code="xunihuobileixing"/>:</label>
							<div class="col-sm-6">
								<select id = "select"  ng-model="formData.type" class="form-control"> 
									<#list listProduct as list>
                           			<option  value="${list.coinCode}" >${list.coinCode}</option>
                           			</#list>
                         		</select>
                         		<input type="hidden" name="currencyType" id="currencyType"  value="${listProductFirst}" />
							</div>
							
						</div>
						
						<div class="form-group">
							<label class="col-sm-3 control-label"><@spring.message code="qianbaogongyao"/>:</label>
							<div class="col-sm-6">

								<input type="text" id="publicKey" name="publicKey" require class="form-control" placeholder="">

							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-3 control-label"><@spring.message code="beizhu"/>：</label>
							<div class="col-sm-6">
								<input type="textarea" name="remark" id="remark"  required class="form-control" placeholder="">
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-6 col-sm-offset-3">
								<button type="button" id="savepublickey" class="btn btn-primary form-control f-s-16"><@spring.message code="querentijiao"/></button>
								</div>
						</div>
				</form>
				<!---end:{{' A62 '| translate}}{{' A44 '| translate}}表{{' A84 '| translate}}---->

			</div>
			<!--end page-container --->
 	
 	
 	<!-- begin page-container -->
			<div class="container-fluid person-con">
			
				<!-- begin page-header -->
				<div class="row" style="margin-bottom:15px;">
					<div class="panel_wrap_head wrap_head">
						<div class="">
							<ul class="wrap_tabs" role="tablist" id="RMBtab">
								<li role="presentation" class="active pull-left">
									<a href=""><@spring.message code="huobitixiandizhi"/></a>
								</li>
							</ul>
						</div>
					<!--	<small class="fa fa-download pull-right text-info m-t-10 f-s-16"></small>-->
					</div>
				</div>
				<!-- end page-header -->

				<!-- begin row -->
				
				<div class="row">
					<!-- begin col-3 -->
					<div class="col-sm-12">
						<div class="table-responsive fund-dtable">
							<table class="table" id="tablepublic">
								<thead>
								<tr class="active">
									<th><@spring.message code="gongyaohao"/></th>
									<th><@spring.message code="tianjiashijian"/></th>
									<th><@spring.message code="bideleixing"/></th>
									<th><@spring.message code="beizhu"/></th>
									<th><@spring.message code="caozuo"/></th>
								</tr>
								</thead>
								<tbody>
								<!--begin 循环{{' A25 '| translate}}-->
								<#list listPublic as list>
								<tr ng-repeat= "item in accountList">
									<td>${list.publicKey}</td>
								 	<td name="createlong">${list.create_long}</td>
								 	<td>${list.currencyType}</td>
								 	<td>${list.remark}</td>
								 	<td><input type="hidden" value="${list.id}" id="deletePubValue" /><input type="button" value='<@spring.message code="shanchu"/>' id="deletePub" /></td>
								</tr>
								</#list>
								<!--end 循环{{' A25 '| translate}}-->
								<!--begin 没有{{' A25 '| translate}}的时候-->
								<!--<tr ng-if="accountList==null">
									<td  colspan="5" class="no-recode text-center" >
										<i class="fa fa-info-circle"></i>
									</td>
								</tr>-->
								<!--end 没有{{' A25 '| translate}}的时候--->
								</tbody>
							</table>
						</div>
					</div>
					<!-- end col-3 -->
				</div>
				<!-- end row -->
<#include "/base/base.ftl">
<script type="text/javascript">
seajs.use(["js/front/user/publickeylist"],function(p){
	p.init();
	p.renderTime();
});
</script>
<script type="text/javascript"  src="${ctx}/static/${version}/js/front/user/jquery.form.js"></script>
</div>
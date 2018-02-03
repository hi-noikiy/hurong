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
							<ul class="wrap_tabs" role="tablist" id="RMBtab">
								<li role="presentation" class="active pull-left">
									<a href=""><@spring.message code="tianjiayinhangka"/></a>
								</li>
	
							</ul>
						</div>
					</div>
				</div>
				<!-- end page-header -->

				<!---start:添加{{' A93 '| translate}}{{' A98 '| translate}}表{{' A84 '| translate}}---->
				<form class="form-horizontal p-t-30 bank-manage-add form-all" name="cardForm" id="cardForm" method="post">
					<div class="form-group">
						<label class="col-sm-3 control-label"><@spring.message code="xuanzeyinhang"/>：</label>
						<div class="col-sm-5">
							<select required class="form-control" id="bankselect" name="cardBank" >
								<option value=""><@spring.message code="qingxuanze"/></option>
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label"><@spring.message code="yinhangkasuozaidi"/>：</label>
						<input type="hidden" id="provinceValue"   />
						<input type="hidden" name="bankProvince" id="bankProvince" />
						<div class="col-sm-5">
							<select required class="form-control" id="province" style="width:45%; float:left;" >
								<option value=""><@spring.message code="qingxuanze"/></option>
							</select>
							<select required class="form-control" id="city" name="bankAddress" style="width:45%; float:right;">
								<option value=""><@spring.message code="qingxuanze"/></option>
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label"><@spring.message code="kaihuzhihang"/>：</label>
						<div class="col-sm-5">
							<input type="text" ng-model="formData.subBank" name="subBank" id="subBank" required class="form-control" placeholder="">
						</div>
					</div>
		
					<#if user.surname!=null>
					<div class="form-group">
						<label class="col-sm-3 control-label"><@spring.message code="chikarenxingshi"/>：</label>
						<div class="col-sm-5">
							<input type="text" required class="form-control" name="surName" id="surname" value="${user.surname}" readonly="true">
						</div>
					</div>
					
					
					<div class="form-group">
						<label class="col-sm-3 control-label"><@spring.message code="chikarenmingzi"/>：</label>
						<div class="col-sm-5">
							<input type="text" required class="form-control" name="trueName" id="truename" value="${user.truename}" readonly="true">
						</div>
					</div>
				<#else>
					<div class="form-group">
						<label class="col-sm-3 control-label"><@spring.message code="chikarenxingshi"/>：</label>
						<div class="col-sm-5">
							<input type="text" required class="form-control" name="surName" id="surname" value="${user.surname}" >
						</div>
					</div>
					
					
					<div class="form-group">
						<label class="col-sm-3 control-label"><@spring.message code="chikarenmingzi"/>：</label>
						<div class="col-sm-5">
							<input type="text" required class="form-control" name="trueName" id="truename" value="${user.truename}" >
						</div>
					</div>
				</#if>
			
					<div class="form-group">
						<label class="col-sm-3 control-label"><@spring.message code="yinhangkazhanghao"/>：</label>
						<div class="col-sm-5">
							<input type="text" required class="form-control" name="cardNumber" id="cardNumber">
						</div>
					</div>

					<div class="form-group">
						<div class="col-sm-5 col-sm-offset-3">
							<button type="button"  class="btn btn-primary form-control" id="addBankcard"><@spring.message code="tianjiayinhangka"/></button>
						</div>
					</div>
				</form>
				<!---end:添加{{' A93 '| translate}}{{' A98 '| translate}}表{{' A84 '| translate}}---->
			</div>
			<!--end page-container --->

			<!-- begin page-container -->
			<div class="container-fluid person-con min-hg">
				<!-- begin page-header -->
				<div class="row" style="margin-bottom:15px;">
					<div class="panel_wrap_head wrap_head">
						<div class="">
							<ul class="wrap_tabs" role="tablist" id="RMBtab">
								<li role="presentation" class="active pull-left">
									<a href="javascript:void(0);"><@spring.message code="wodeyinhangka"/></a>
								</li>
							</ul>
						</div>
					<!--	<small class="fa fa-download pull-right text-info m-t-10 f-s-16"></small>-->
					</div>
				</div>
				<!-- end page-header -->

				<!-- begin {{' A70 '| translate}}{{' A93 '| translate}}{{' A98 '| translate}} -->
				<div class="row p-t-20" id="div_list">
					<#list list as list>
					<div class="col-sm-6" ng-repeat="item in list">
						<dl class="mybankcard">
							<dt class="bank-name p-l-20 p-r-20 clearfix">
								<span class="pull-left">${list.cardBank}</span>
								<!-- <a href=":;" ng-click="remove($event)"  bcid={{item.id}}><i  class="fa fa-trash pull-right"></i></a> -->
							<span ><input type="hidden" id="bandId" value="${list.id}" /><i class="fa fa-trash pull-right"></i><span>
							</dt>
							<dd>${list.cardNumber}</dd>
							<dd><@spring.message code="xingshi"/>：${list.surName}</dd>
							<dd><@spring.message code="huming"/>：${list.trueName}</dd>
							<dd><@spring.message code="chengshi"/>：${list.bankProvince} ${list.bankAddress}</dd>
							<dd><@spring.message code="zhihang"/>：${list.subBank}</dd>
							<!--<dd><@spring.message code="yinhangjigoudaima"/>：${list.subBankNum}</dd>-->
						</dl>
					</div>
					</#list>
				</div>
				<!-- end {{' A70 '| translate}}{{' A93 '| translate}}{{' A98 '| translate}} -->
</div>
<#include "/base/base.ftl">
<script type="text/javascript">
seajs.use(["js/front/user/bankcard"],function(bc){
	bc.init();
});
</script>
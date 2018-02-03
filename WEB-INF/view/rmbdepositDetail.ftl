<html  lang="en">
<head>
<#include "/base/base.ftl">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta content="" name="description">
<meta content="" name="author">


<style type="text/css">
body { background:#FFF;  color:#666;}
.mtitle { font-size:24px; text-align:left;  }
.mtitle h3 { margin:0px; padding-left:20px; color:#666;   }
.privilege .tb-list2 {font-size:14px;}
.privilege .tb-list2 b { color:#f00;}
.privilege .tb-list2 th {border:1px solid #f3da91; background-color:#fffbef ; text-align:right; height:28px; line-height:28px; padding-right:15px;}
.privilege .tb-list2 td {border:1px solid #f3da91; background-color:#fff; text-align:left; height:28px; line-height:28px; padding-left:15px;}
.privilege .tb-list2 tr {height:40px;}
.privilege .do a { width:140px;}
.privilege .do a h4 { width:125px;}
a.alibtn_orange35 { background-color: #de211d; border-color: #de211d; padding: 0px 12px; height:35px; border-radius: 3px; transition: all .2s linear;  font-size: 16px;   color: #fff;  }
</style>
</head>

<body>
<!-- 头部 -->

<div class="mtitle">
<h3><@spring.message code="shenqinghuikuandan"/></h3>
</div>
<div class="main-bd" style="padding:10px 20px; border:none;">
  <div class="mention">
    <div class="privilege">
     
      <table width="100%" class="tb-list2">
     		<tbody>
          <th scope="row"><@spring.message code="huiruyinhangzhanghu"/>：</th>
          <td><span >${obj.ourAccountNumber!}</span></td>
        </tr>
        <tr>
          <th scope="row"><@spring.message code="huiruyinhang"/>：</th>
          <td><span>${obj.bankName!}</span></td>
        </tr>
        <tr>
          <th scope="row"><@spring.message code="huiruyinhangzhihang"/>：</th>
          <td><span>${obj.bankAddress!}</span></td>
        </tr>
        <tr>
          <th scope="row"><@spring.message code="shoukuanren"/>：</th>
          <td><span>${obj.appOurAccount!}</span></td>
        </tr>
        <tr>
          <th scope="row"><@spring.message code="money"/>：</th>
          <td><span style="color:red;">${obj.transactionMoney!} (<@spring.message code="huikuanshitianxiejine"/>)</span></td>
        </tr>
        <tr>
          <th scope="row"><@spring.message code="dingdanhao"/>：</th>
          <td><span>${obj.transactionNum!}</span></td>
        </tr>
           <tr>
             <th scope="row"><@spring.message code="beizhu"/>：</th>
             <td><span style="color:red;">${obj.remark!} (<@spring.message code="huikuanshibeizhuneirong"/>)</span></td>
           </tr>
           <tr>
             <th scope="row"><@spring.message code="zhuangtai"/>：</th>
            <#if obj.status==1>
         <td><@spring.message code="daishenhe"/> (<@spring.message code="a00"/>) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
         <#elseif obj.status==2>
          <td><@spring.message code="yiwancheng"/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
         <#else>
          <td><@spring.message code="yifoujue"/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
         </#if>
           </tr>
        
      </tbody></table>
     

      <p>&nbsp;</p>
		<hr/>      
      
      <div class="">
      <p><@spring.message code="wenxintishi"/>:<span style="color:red;"><@spring.message code="2hourzidongchongzhi"/></span> ,<@spring.message code="2hourzidongchongzhi_tishi"/></p>
      </div>

    </div>
  </div>
</div>
<!--页面中部内容结束-->


</body></html>
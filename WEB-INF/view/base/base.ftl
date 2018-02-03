<meta name="renderer" content="webkit"> 
<#import "/base/spring.ftl" as spring/>
<!-- 时间戳 -->
<#assign t="${.now?long}">
<!-- js版本 -->
<#assign version="src">
<#assign domain="http://127.0.0.1:8098">
<#assign ctx="http://127.0.0.1:8098">
<#assign i18n="true">
<script type="text/JavaScript">
	var _ctx = "${ctx}";
	var _version="${version}";
	var _domain ="${domain}";
	var _hasico ="${hasico}";
</script>


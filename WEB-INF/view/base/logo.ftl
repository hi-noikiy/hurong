<#include "/base/base.ftl">

<script type="text/JavaScript">
	window.nofind=function(){
				var img=event.srcElement; 
				img.src=_ctx+"/static/"+_version+"/lib/exstatic/img/logo.png"; 
				img.onerror=null;
	}
</script>

<div class="navbar-brand ng-scope">
	<span class="brand-logo">
	<a href="/">
	  	<h1 class="brand-logo">
	  		<img id="logo_img" src="/${siteLogo!}" style="vertical-align:top;height:40px;"/>
	    </h1>
 	</a>
	</span>
</div>
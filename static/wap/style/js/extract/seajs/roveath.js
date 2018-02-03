define(function(require, exports, module){
	require("style/css/bootstrap/css/bootstrap.min.css");
	require("style/css/google/css/intlTelInput.css");
	require("style/css/mobile/css/css.css");
	require("style/css/mobile/css/roveath.css");
	require("style/js/layer/css/layer.css");
	require("style/js/mobile/js/zepto.js");
	require("style/js/googleauth/intlTelInput.js");
	require("style/js/jquery/jquery.form1.js");
	require("style/js/jquery/jquery.form2.js");
	this._table = require("style/js/base/table");
	require("style/js/base/base.js");
	require("style/js/upload/bootstrap-fileinput.js");	
	require("style/js/index.js");
	require("style/js/index.js");
	require("style/js/mobile/js/public.js");
	this.validate = require("style/js/validate");




	module.exports = {


			img:function(e){
				//图片回显
				for (var i = 0; i < e.target.files.length; i++) {  
					var file = e.target.files.item(i);  
					if (!(/^image\/.*$/i.test(file.type))) {  
						continue; //不是图片 就跳出这一次循环  
					}  
					//实例化FileReader API  
					var freader = new FileReader();  
					freader.readAsDataURL(file);  
					freader.onload = function(e) {  
						$("#picImg"+1).attr("src",e.target.result);  
					}  
				}
			},

			init : function(){
				//加载logo 	
				$.ajax({
					url: ctx_ + "/mobile/nouser/logo",
					type:"post",
					dataType:'json',
					success:function(data){
						//加载logo 	
						var url=ctx_+"/"+data.obj;
						log.style.backgroundImage="url("+url+")";
						
					}
				})
				var radios =$('input[name="type"]')
				for (var i = 0; i < radios.length; i++) {
					radios[i].indexs = i + 1;
					radios[i].onchange = function () {
						if (this.checked) {
							$('#authenticationForm1').hide();
							$('#authenticationForm2').hide();
							$('#authenticationForm'+ this.indexs).show();


						}
					}
					//清空所有数据
					radios[i].onclick=function () {
						$('#authenticationForm1')[0].reset();
						$('#authenticationForm2')[0].reset();
						for(var i=1;i<7;i++){
							$("#picImg"+i).attr("src",""); 
						}
					}
				}



				var str=location.href; 
				var meter=str.split("?")[1];
				var tokenId=meter.split("&")[0];
				tokenId=tokenId.split("=")[1];
				
				//判断是否已经登录
				if(tokenId!=""){
					$("#isToken").html("<a href='"+basepath+"/html/coins.htm?tokenId="+tokenId+"' class='a-on'>交易中心</a><a href='"+basepath+"/html/user/user-index.html?tokenId="+tokenId+"' class='a-on'>我的资产</a>");
					$("#logo").attr("href",ctx_+"/static/wap/html/coins.htm?tokenId="+tokenId);

				}else{
					$("#isToken").html("<a href='"+basepath+"/html/coins.htm' class='a-on'>交易中心</a><a href='"+basepath+"/html/user/login.htm' class='a-on'>登录</a><a href='"+basepath+"/html/user/reg.htm'>注册</a>");
				}

				if(tokenId!=""){
					//是否已实名
					$.ajax({
						url: ctx_ + "/mobile/user/apppersondetail/isrealandpwd",
						type:"post",
						data : {tokenId:tokenId},
						dataType:'json',
						success:function(data){
							if(data!="" && data!=null){
								if(data.success){
									if(data.obj.user.states=='0'){

									}else if(data.obj.user.states=='1'){
										$("#name").text(data.obj.user.truename);
										$("#card").text(data.obj.user.cardcode);
										window.open(basepath + "/html/user/realinfo.html?tokenId="+tokenId,"_self");
									}else if(data.obj.user.states=='2'){
										$("#name").text(data.obj.user.truename);
										$("#card").text(data.obj.user.cardcode);
										window.open(basepath + "/html/user/wait.html?tokenId="+tokenId,"_self");
									}else if(data.obj.user.states=='3'){
										$("#states").html("实名申请已拒绝,请重新认证。")
									}
								}else{
									layer.msg(data.msg, {icon: 2});
									window.open(basepath + "/html/user/login.htm","_self");
								}
							}
						}
					});
				
					$("#sub").on("click",function(){
						debugger;
						var sign=1;
						var trueName = $("#trueName").val();
						var surname = $("#surname").val();
						var cardType = $("#cardType").val();
						var country =$("#country").val();
						var cardId = $("#cardId").val();
						var picIDa = $("#picIDa"+sign).val();
						var picIDb = $("#picIDb"+sign).val();
						var picIDc = $("#picIDc"+sign).val();
						var type = $("#Type");

						if(!surname){
							layer.msg('姓不能为空', {icon: 2});
							return ;
						}else{
							var reg = /^[\u4e00-\u9fa5]+$/;
							if(!reg.test(surname)){
								layer.msg("姓氏必须为中文", {icon: 2});
								return false;
							}


						}
						if(!trueName){
							layer.msg('名不能为空', {icon: 2});
							return false;
						}else{
							var reg = /^[\u4e00-\u9fa5]+$/;
							if(!reg.test(trueName)){
								layer.msg("名必须为中文", {icon: 2});
								return false;
							}
						}
						if(!cardId){
							layer.msg("证件号不能为空", {icon: 2});
							return false;
						}
						if(!validate.check_card(cardId)){
							layer.msg("证件号格式不正确", {icon: 2});
							return false;
						}

						
						if(!picIDa || picIDa.length==0){
							layer.msg("请上传身份证正面照", {icon: 2});
							return false;
						}
						if(!picIDb || picIDb.length==0){
							layer.msg('请上传身份证背面照', {icon: 2});
							return false;
						}
						if(!picIDc || picIDc.length==0){
							layer.msg('请上传手持本人身份证正面照', {icon: 2});
							return false;
						}
						$("#sub").attr("disabled","disabled");


						$("#authenticationForm1").ajaxSubmit({
							type: "post",
							url: _ctx + "/mobile/user/apppersondetail/waprealname?tokenId="+tokenId,
							dataType: "JSON",
							data : {},
							resetForm : true,
							success: function(data) {
								if(data!="" && data!=null){
									if(data.success){

										layer.msg(data.msg, {icon: 1,time:1000},function(){
											window.location.href = _ctx + "/static/wap/html/user/account.html?tokenId="+tokenId;	
										});
									}else{
										layer.msg(data.msg, {icon: 2});
										$("#sub").attr("disabled",false);
									}}

							}


						})


					})

					$("#btn-submit2").on("click",function(){
						debugger;
						var sign=2;

						var trueName = $("#trueName"+sign).val();
						var surname = $("#surname"+sign).val();
						var cardType = $("#cardType").val();
						var cardId = $("#cardId"+sign).val();
						var picIDa = $("#picIDa"+sign).val();
						var picIDb = $("#picIDb"+sign).val();
						var picIDc = $("#picIDc"+sign).val();
						if(!surname){
							layer.msg('姓不能为空', {icon: 2});
							return ;
						}
						if(!trueName){
							layer.msg('名不能为空', {icon: 2});
							return false;
						}
						if(!cardId){
							layer.msg("证件号不能为空", {icon: 2});
							return false;
						}
						

						if(!picIDa || picIDa.length==0){
							layer.msg("请上传护照封面", {icon: 2});
							return false;
						}
						if(!picIDb || picIDb.length==0){
							layer.msg('请上传护照个人信息页', {icon: 2});
							return false;
						}
						if(!picIDc || picIDc.length==0){
							layer.msg('请上传本人护照照片', {icon: 2});
							return false;
						}
						$("#btn-submit2").attr("disabled","disabled");
						$("#authenticationForm2").ajaxSubmit({
							type: "post",
							url: _ctx + "/mobile/user/apppersondetail/waprealname?tokenId="+tokenId,
							dataType: "JSON",
							data : {},
							resetForm : true,
							success: function(data) {
								if(data!="" && data!=null){
									if(data.success){

										layer.msg(data.msg, {icon: 1,time:1000},function(){
											window.location.href = _ctx + "/static/wap/html/user/account.html?tokenId="+tokenId;	
										});
									}else{
										layer.msg(data.msg, {icon: 2});
										 $("#btn-submit2").removeAttr("disabled");// 按钮可用
									}}
							}
						})


					})
					
					
					
	    $("#picIDa2").on("change",function(event){
			 // var e=event;
			  var f=document.getElementById("picIDa2").value;

			   for (var i = 0; i < event.target.files.length; i++) {  
		            var file = event.target.files.item(i);  
		            if(!/\.(jpg|png|JPG|PNG)$/.test(f)){
		            	 layer.alert(tupiangeshi);
		            	 return false;
		            }
		        	if(((event.target.files[i].size).toFixed(2))>=(1024*1024)){
		                  
		        		layer.msg(tupianxianzhi,{icon: 2});
				                 return false;
				          }
		            //实例化FileReader API  
		            var freader = new FileReader();  
		            freader.readAsDataURL(file);  
		            freader.onload = function(event) {  
		                $("#picImg"+4).attr("src",event.target.result);  
		            }  
		        }
		  })
		  
		  
		  
		  
		   $("#picIDb2").on("change",function(event){
			 // var event=event;
			  var f=document.getElementById("picIDb2").value;

			   for (var i = 0; i < event.target.files.length; i++) {  
		            var file = event.target.files.item(i);  
		            if(!/\.(jpg|png|JPG|PNG)$/.test(f)){
		            	 layer.alert(tupiangeshi);
		            	 return false;
		            }
		        	if(((event.target.files[i].size).toFixed(2))>=(1024*1024)){
		                  
		        		layer.msg(tupianxianzhi, {icon: 2});
				                 return false;
				          }
		            //实例化FileReader API  
		            var freader = new FileReader();  
		            freader.readAsDataURL(file);  
		            freader.onload = function(event) {  
		                $("#picImg"+5).attr("src",event.target.result);  
		            }  
		        }
		  })
		  
		  
		  
		   $("#picIDc2").on("change",function(event){
			  //var e=event;
			  var f=document.getElementById("picIDc2").value;

			   for (var i = 0; i < event.target.files.length; i++) {  
		            var file = event.target.files.item(i);  
		            if(!/\.(jpg|png|JPG|PNG)$/.test(f)){
		            	 layer.alert(tupiangeshi);
		            	 return false;
		            }
		        	if(((event.target.files[i].size).toFixed(2))>=(1024*1024)){
		                  
		        		layer.msg(tupianxianzhi, {icon: 2});
				                 return false;
				          }
		            //实例化FileReader API  
		            var freader = new FileReader();  
		            freader.readAsDataURL(file);  
		            freader.onload = function(event) {  
		                $("#picImg"+6).attr("src",event.target.result);  
		            }  
		        }
		  })
		  
					




					$("#picIDa1").on("change",function(event){

						//var e = event  || window.event;
						// var ae=event;
						// var e=event.srcElement ? event.srcElement : event.target;
						var f=document.getElementById("picIDa1").value;
						for (var i = 0; i < event.target.files.length; i++) {  
							var file = event.target.files.item(i);  
							/*   if (!(/^image\/.*$/i.test(file.type))) {  
			                continue; //不是图片 就跳出这一次循环  
			            } */
							if(!/\.(jpg|png|JPG|PNG)$/.test(f)){
								layer.alert("图片类型必须是jpg,png中的一种");
								return false;
							}
							if(((event.target.files[i].size).toFixed(2))>=(1024*1024)){

								layer.msg("请上传小于1M图片",{icon: 2});
								return false;
							}
							//实例化FileReader API  
							var freader = new FileReader();  
							freader.readAsDataURL(file);  
							freader.onload = function(event) {  
								$("#picImg"+1).attr("src",event.target.result);  
							}  
						}
					})


					$("#picIDb1").on("change",function(event){

						var f=document.getElementById("picIDb1").value;
						for (var i = 0; i < event.target.files.length; i++) {  
							var file = event.target.files.item(i);  
							if(!/\.(jpg|png|JPG|PNG)$/.test(f)){
								layer.alert("图片类型必须是jpg,png中的一种");
								return false;
							}
							if(((event.target.files[i].size).toFixed(2))>=(1024*1024)){

								layer.msg("请上传小于1M图片",{icon: 2});
								return false;
							}
							//实例化FileReader API  
							var freader = new FileReader();  
							freader.readAsDataURL(file);  
							freader.onload = function(event) {  
								$("#picImg"+2).attr("src",event.target.result);  
							}  
						}
					})

					$("#picIDc1").on("change",function(event){

						var f=document.getElementById("picIDb1").value;
						for (var i = 0; i < event.target.files.length; i++) {  
							var file = event.target.files.item(i);  
							if(!/\.(jpg|png|JPG|PNG)$/.test(f)){
								layer.alert("图片类型必须是jpg,png中的一种");
								return false;
							}
							if(((event.target.files[i].size).toFixed(2))>=(1024*1024)){

								layer.msg("请上传小于1M图片",{icon: 2});
								return false;
							}
							//实例化FileReader API  
							var freader = new FileReader();  
							freader.readAsDataURL(file);  
							freader.onload = function(event) {  
								$("#picImg"+3).attr("src",event.target.result);  
							}  
						}
					})




				}
			}
	}
})
define(function(require, exports, module) {
	//require("lib/google/js/jquery.slider.min.js");
	require("lib/bootstrap/css/bootskrap.min.css");
	require("lib/layer/layer.js");
	require("lib/layer/css/layer.css");
	this.md5 = require("js/base/utils/hrymd5")
	this.validate = require("js/base/validate");


	
	module.exports = {
		init : function(){
//			function isFormReady(){
//				  var csessionid = $("#forgotPwd1-form input[name='csessionid']").val();
//				  var email=$("#forgotPwd1-form input[name='email']").val();
//				  if(csessionid && email){
//				    $("#btn-ok").attr('disabled',false);
//				  }else{
//				    $("#btn-ok").attr('disabled',true);
//				  }
//				}
//			$("#slider1").slider({
//		        width: 330,
//		        height: 40,
//		        sliderBg: "rgb(134, 134, 131)",
//		        color: "#fff",
//		        fontSize: 14,
//		        bgColor: "#66bb6a",
//		        textMsg: "请按住滑块，拖动到最右边",
//		        successMsg: "验证通过了哦", 
//		        validateMsg:"请输入验证码",
//		        successColor: "red", 
//		        time: 400, 
//		        callback: function() {
//		        // $('#btn-ok').attr("disabled",false);
//		        }
//		    });
//			$("#nc_1_scale_submit").on("click",function(){debugger;
//			   var code= $("#nc_1_captcha_input").val();
//			   $.ajax({
//					type : "post",
//					url : _ctx + "/forgetpwd/codevail",
//					data : {
//						registCode:code
//					},
//					cache : false,
//					dataType : "json",
//					success : function(data) {debugger;
//						if(data){
//							if(data.success){
//
//							}else{
//								layer.msg(data.msg, {icon: 2})
//							}
//						}else{
//							layer.msg("登录失败", {icon: 2})
//						}
//					},
//					error : function(e) {
//						
//					}
//				});
//			   
//			   
//			})
			$("#btn-ok").on("click",function(){debugger;
			var passwd = $("#regiterPassword").val();
			var confirmpwd = $("#rePwd").val();
			var email =$(".email").val();
			if(passwd == "" || passwd == undefined){
				layer.msg(mimabunengweikong, {icon: 2});
				return false;
			}
			if(passwd == "" || passwd == undefined){
				layer.msg(qingshuru, {icon: 2});
				return false;
			}
			if(!validate.check_password(passwd)){
				layer.msg(mimageshibuzhengque, {icon: 2});
				return false;
			}
			if(passwd!=confirmpwd){
				layer.msg(passowordssecond, {icon: 2});
				return false;
			}
			$.ajax({
				type : "post",
				url : _ctx + "/forgetpwd/secondstep",
				data : {
					passwd: md5.md5(passwd),
					email :email

				},
				cache : false,
				dataType : "json",
				success : function(data) {
					if(data){
						if(data.success){
							layer.msg(data.msg, {icon: 1},function(){
								window.location.href = _ctx+"/login";
							})
						
						}else{
							layer.msg(data.msg, {icon: 2})
						}
					}else{
						layer.msg("登录失败", {icon: 2})
					}
				},
				error : function(e) {
					
				}
			});
			})
		},
//		 refreshCode: function(){
//				
//				$("#img_captcha").on("click",function(){
//					$(this).attr("src", _ctx + "/sms/registcode.jpg?t=" + new Date().getTime());
//				})
//			}
			
			
	}
})
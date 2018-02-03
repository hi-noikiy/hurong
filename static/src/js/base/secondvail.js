define(function(require, exports, module) {
	this.firstvail = require("js/base/firstvail");

	module.exports = {
		// var typ="login";
		mgvail : function(typ) {
			$(".mobileb").on("click", function() {
				var username = $("#username").val();
				var verifyCode = $(".secondp").val();
				if (!verifyCode) {
					layer.msg(shoujirenzhengbuweikong, {
						icon : 2
					});
					return;

				}
				$(".mobileb").attr("disabled", "disabled");
				$.ajax({
					type : "post",
					url : _ctx + "/phone/PhoneAuth",
					data : {
						verifyCode : verifyCode,
						username : username
					},
					cache : false,
					dataType : "json",
					success : function(data) {
						if (data) {
							if (data.success) {
								firstvail.sendvail(typ);
								/*
								 * layer.msg(data.msg, {icon: 1},function(){
								 * //window.location.href = _ctx+"/user/center"; })
								 */
							} else {
								$(".mobileb").removeAttr("disabled");
								layer.msg(data.msg, {
									icon : 2
								})
							}
						} else {
							$(".mobileb").removeAttr("disabled");
							layer.msg(data.msg, {
								icon : 2
							})
						}
					},
					error : function(e) {

					}
				});
			})

			$(".googleVerifyb").on("click", function() {
				var username = $("#username").val();

				var verifyCode = $(".secondg").val();
				if (!verifyCode) {
					layer.msg(gugerenzhengbuweikong, {
						icon : 2
					});
					return;

				}

				$(".googleVerifyb").attr("disabled", "disabled");

				$.ajax({
					type : "post",
					url : _ctx + "/google/googleAuth",
					data : {
						username : username,
						codes : verifyCode
					},
					cache : false,
					dataType : "json",
					success : function(data) {
						if (data) {
							if (data.success) {
								firstvail.sendvail(typ);
							} else {
								$(".googleVerifyb").removeAttr("disabled");
								layer.msg(data.msg, {
									icon : 2
								})
							}
						} else {
							$(".googleVerifyb").removeAttr("disabled");
							layer.msg("登录失败", {
								icon : 2
							})
						}
					},
					error : function(e) {

					}
				});
			})

			$(".goog").on("click", function() {
				var username = $("#username").val();

				var verifyCode = $(".googlee").val();
				if (!verifyCode) {
					layer.msg(gugerenzhengbuweikong, {
						icon : 2
					});
					return;

				}
				$(".goog").attr("disabled", "disabled");
				$.ajax({
					type : "post",
					url : _ctx + "/google/googleAuth",
					data : {
						username : username,
						codes : verifyCode
					},
					cache : false,
					dataType : "json",
					success : function(data) {
						if (data) {
							if (data.success) {
								firstvail.sendvail(typ);
							} else {
								$(".goog").removeAttr("disabled");
								layer.msg(data.msg, {
									icon : 2
								})
							}
						} else {
							$(".goog").removeAttr("disabled");
							layer.msg("登录失败", {
								icon : 2
							})
						}
					},
					error : function(e) {

					}
				});
			})

			$(".phone").on("click", function() {
				var username = $("#username").val();
				var verifyCode = $("#verifyCode").val();
				if (!verifyCode) {
					layer.msg(shoujirenzhengbuweikong, {
						icon : 2
					});
					return;

				}
				$(".phone").attr("disabled","disabled");
				$.ajax({
					type : "post",
					url : _ctx + "/phone/PhoneAuth",
					data : {
						verifyCode : verifyCode,
						username : username
					},
					cache : false,
					dataType : "json",
					success : function(data) {
						if (data) {
							if (data.success) {
								firstvail.sendvail(typ);

							} else {
								$(".phone").removeAttr("disabled");
								layer.msg(data.msg, {
									icon : 2
								})
							}
						} else {
							$(".phone").removeAttr("disabled");
							layer.msg(data.msg, {
								icon : 2
							})
						}
					},
					error : function(e) {

					}
				});
			})
		}
	}
});

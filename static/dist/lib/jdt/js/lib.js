function bsStep(i){$(".step").each(function(){var t,d=$(this);i>d.find("li").length?(console.log("您输入数值已超过步骤最大数量"+d.find("li").length+"！！！"),t=d.find("li").length):t=void 0==i&&void 0==d.data("step")?1:void 0==i&&void 0!=d.data("step")?$(this).data("step"):i,$(this).find("li").removeClass("active"),$(this).find("li:lt("+t+")").addClass("active")})}
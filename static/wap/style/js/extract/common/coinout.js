$('.more').click(function() {
		$('.hidden').show();
		$('.selecmore').hide();
	})
	$('.addbanks').click(function() {
			console.log('jiayan')
				//隐藏提币
			$('#content1').hide();
			//显示提币地址列表
			$('#content2').show();
		})
		//返回按钮
	$('.returns').click(function() {
			//隐藏提币
			$('#content1').css('display', 'block');
			//显示提币地址列表
			$('#content2').css('display', 'none');
		})
		//选中地址
	$(function() {
		$(".xz_bank_ul_dizhi li p").click(function() {
			var bankk = $(this).children("i").text();
			var weihao = $(this).children("span").text().substr(-4);
			var wallet_id = $(this).children("input").val();
			$("#bankk").text(bankk);
			$("#weihao").text(weihao);
			$(".wallet_id").val(wallet_id);
			$(".wallet_id").attr('id', wallet_id + 'cl');
			//隐藏提币
			$('#content1').css('display', 'block');
			//显示提币地址列表
			$('#content2').css('display', 'none');
		})
	})
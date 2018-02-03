<!DOCTYPE html>
<html lang="en">
<head>
	<#include "/base/base.ftl">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style type="text/css">
		.caozuo{
			position: fixed;
			bottom: 0;
			left: 0;
			height: 100px;
			background-color: white;
			width: 100%;
		}
		.caozuo input{
			font-size: 30px;
		}
		.caozuo input[type=text]{
			width: 100%;
		}
	</style>
</head>
<body>
    <h1>小小聊天室  欢迎：进入VIP尊享聊天室</h1>
   	当前在线人数：<span id="onlineLength"></span>人</br>
	当前用户:<span>${user.username}</span>
    <div>
		<ul class="liebiao">
			
		</ul>
    </div>
    
    <div class="caozuo" align='center'>
        <input type="text" id="content"/>
        <input type="button" id="fayan" value="发言"/>
        <input type="button" id="clear" value="清屏"/>
        <!--<a href="/logout" style='text-decoration:none;' id="logout">退出</a>-->
    </div>

</body>
<script type="text/javascript" src="http://127.0.0.1:3000/socket.io/socket.io.js"></script>
<script type="text/javascript" src="${ctx}/static/${version}/js/chat/1.9.1.min.js"></script>
<script type="text/javascript">
    var socket = io.connect('ws://127.0.0.1:3000');
    //var socket = io();
    
    //进入了房间
    socket.emit('join','${user.username}');

    //发送聊天内容
    $("#content").on("keydown",function(e){
        if(e.keyCode==13){
            socket.emit('liaotian',{
                "name":$("#yonghu").text(),
                "content":$("#content").val()
            });
            $("#content").val("");
        }
    })
    $("#fayan").on("click",function(){
        socket.emit('liaotian',{
            "name": '${user.username}',
            "content": $("#content").val()
        });
        $("#content").val("");
    })

    //监听服务端聊天室内容
    socket.on('liaotian',function(msg){
        $(".liebiao").append("<li><b>"+msg.name+" : "+msg.content+"</b>"+"&nbsp;&nbsp;&nbsp;&nbsp;"+time()+"</li>");
    })

    //监听在线人数
    socket.on('onlineLength',function(num){
        $("#onlineLength").text(num);
    })

    //谁加入了 
    socket.on('notice',function(msg){
        $(".liebiao").append("<li>----------------------"+msg+"---------------------</li>");
    })

    //谁退出了
    //手动退出
    //关闭浏览器
    socket.on('allMessageLogout',function(msg){
        $(".liebiao").append("<li>----------------------"+msg+"---------------------</li>");
    })

    //清屏
    $("#clear").on('click',function(){
        $(".liebiao").find("li").remove();
    })

    //格式化时间
    function time(){
        var datetime = new Date();
        var year = datetime.getFullYear();
        var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
        var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
        var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
        return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
    }
</script>

</html>
var index=0;
//获得li的个数，也是图片的个数
var imgnum=$('.banner ul li').length;
var nmun='';
$('.banner').hover(function(){
    //鼠标移动到上面停止到当前画面轮播
    clearInterval(p);
    //左右两边的切换按钮显示
    $('.banner .u').fadeIn();
},function(){
    //鼠标移开继续开始轮播
    pic();
    //两边切换按钮隐藏
    $('.banner .u').fadeOut();
 });

function pic(){
//轮播切换图片的函数，思路就是通过定时器不停的改变index的值，选择对应的图片页面进行显示

    p=setInterval(function(){

        index++;

        if(index>=imgnum){
            //当index大于图片总个数时回到第一屏
            index=0;
        }

        //通过index显示对应图片
        selectimg(index);

    },3000);

}

//通过index显示对应的图片，并隐藏这张图片的其他图片
function selectimg(index){
    $('.banner ul li').eq(index).fadeIn(600).siblings().fadeOut(600);
    //同时把下面的小按钮加上选中样式，其他取消
    $('.con a').eq(index).addClass('active').siblings('a').removeClass('active');
}

//往左切换
$('.banner .left').click(function(){
    index-=1;
    if(index<0){
            index=imgnum-1;
        }
    selectimg(index);

});

//往右边切换
$('.banner .right').click(function(){
    index+=1;
    if(index>imgnum-1){
            index=0;
        }
    selectimg(index);

});

//把所有下面的小按钮选择的根据图片张数写入对应个数到页面
for(var ni=0;ni<imgnum;ni++){
    nmun +="<a href='javascript:;'></a>";
}
$('.banner .con').html(nmun);
$('.banner .con a').eq(0).addClass('active');

//点击圆点时选择对应的图
$('.con a').each(function(i){
$(this).click(function(){
    //点击对应的圆点,并改变index
    index=i;
    $('.banner ul li').eq(i).fadeIn(600).siblings().fadeOut(600);
    $(this).addClass('active').siblings('a').removeClass('active');
});
});

//默认开始加载
pic();

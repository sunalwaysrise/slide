/**
 * @author luwenbin@live.com
 */
function slide(configs){
    configs.dom.style.position="absolute";
    configs.parentDom.style.position="relative";
    function slides(){
    	$(configs.parentDom).animate({configs.slide:-configs.distance}, configs.speed,function(){
    		var dom=$(dom).children(childrenDom).eq(0).clone();
		$(dom).append(dom);
		$(dom).children(childrenDom).remove();
		$(dom).css({"left":0});
	})
    }
    if(configs.auto){
    	var c2=setInterval("slides()", configs.time);
    	$("#section2_3A").hover(
    		function(){clearInterval(c2)},
    		function(){c2 = setInterval("slides()", configs.time);
    	});
    }else{
    	slides()
    }
}

//使用
slide({
	dom:"content",//
	auto:true, //设置自动  true 或 false,
	time:"1500", //自动时间间隔
	distance:"200",//一次滑动的距离
	speed:"fast",//滑动速度
	parentDom:"parent", //父节点
	childrenDom:"children",//子元素名称
	slide:"top" //滑动方向，top 或 left
})

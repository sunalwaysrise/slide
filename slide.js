/**
 * @author luwenbin@live.com
 */
//内容的定向滑动
function slide(configs){
    configs.dom.style.position="absolute";
    configs.parentDom.style.position="relative";
    function slides(){
    	$(configs.parentDom).animate({configs.slide:-configs.distance}, configs.speed,function(){
    		var dom=$(dom).children(childrenDom).eq(0).clone();
		$(dom).append(dom);
		$(dom).children(childrenDom).remove();
		$(dom).css({configs.slide:0});
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


//内容的轮换
function move(config){
	var t = n = count = 0;
	function slide(){
		count = $(config.dom).children(config.children).size();
		$(config.dom).children(config.children).hide();
		$(config.dom).children(config.children).eq(0).show();
		for(i;i<count;i++){
			$(config.navDom).append("<a>"(Number(i)+1)"</a>");
		}
		$(config.navDom).eq(0).addClass(config.navDomOn);
		$(condig.navDom).children("a").click(function() {
			var i = $(this).index();
			n = i
			if (i >= count) return;
			$(config.dom).children(config.children).filter(":visible").fadeOut(500);
			$(config.dom).children(config.children).eq(i).fadeIn(1000);
			$(this).addClass(config.navDomOn).siblings().removeClass(config.navDomOn);
		});
		t = setInterval("slide()", config.speed);
		$(config.parentDom).hover(function(){clearInterval(t)}, function(){t = setInterval("slide()", config.speed);});
	}
	function autoplay(){
		n = n >= (count - 1) ? 0 : n + 1;
		$(config.navDom).children("a").eq(n).trigger('click');
	}
}
move({
	dom:"",//元素
	children:"",//子元素的标签
	parentDom:"",//父元素
	navDom:"",//导航的id
	navDomOn:"",//获得焦点时的样式
	speed:""//轮换的速度
})




//弹出内容始终居中间显示
var _obj1=$("#object");
$(window).resize(function(){if(_obj1.attr("data_v")!="o"){return false;}setPosition(_obj1);});
$(window).scroll(function(){if(_obj1.attr("data_v")!="o"){return false;}setPosition(_obj1);});
function setPosition(_obj) {
	var t = document.documentElement.scrollTop || document.body.scrollTop;
	var viewHeight = $(window).height(), viewWidth = $(window).width(), _objHeight = _obj.height(), _objWidth = _obj.width();
	var dialogTop = (viewHeight / 2) - (_objHeight / 2) + t;
	var dialogLeft = (viewWidth / 2) - (_objWidth / 2);
	_obj.css({top : dialogTop,left : dialogLeft});
}


//滑动显示
var lens=$("#content li").length;
  //console.log("总数"+lens)
  window.count=0;
  $("#goNext").click(function(){
    count > (lens-2) ? count=0 : count=count+1;
    //console.log(count);
    $("#content li").fadeOut();
    $("#content li").eq(count).fadeIn();
  })
  $("#goPrev").click(function(){
    count < 1 ? count=(lens-1) : count=count-1;
    //console.log(count);
    $("#content li").fadeOut();
    $("#content li").eq(count).fadeIn();
  })

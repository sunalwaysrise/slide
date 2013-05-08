/*
author: luwenbin@live.com
*/
var l={
	xhr:window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest(),
	getArgs:function(argName){
		if(!argName){return}
		var args = {},query = location.search.substring(1),pairs = query.split("&"); 
		for(var i = 0; i < pairs.length; i++) {
			var pos = pairs[i].indexOf('=');
			if (pos == -1) continue;
			var argname = pairs[i].substring(0,pos),value = pairs[i].substring(pos+1);
			value = decodeURIComponent(value);
			if(argName==argname){return value;}
		}
	},
	checkEmail:function(val,obj){
		var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		if(!myreg.test(val)){
			obj.addClass("error").val("data error!").focus();
			return false;
		}
	},
	setPosition:function(_obj){
		var t = document.documentElement.scrollTop || document.body.scrollTop;
		var viewHeight = $(window).height(), viewWidth = $(window).width(), _objHeight = _obj.height(), _objWidth = _obj.width();
		var dialogTop = (viewHeight / 2) - (_objHeight / 2) + t;
		var dialogLeft = (viewWidth / 2) - (_objWidth / 2);
		_obj.css({top : dialogTop,left : dialogLeft});
	},
    throttle:function(fn, delay, mustRunDelay){
    	var timer = null;
    	var t_start;
    	return function(){
    		var context = this, args = arguments, t_curr = +new Date();
    		clearTimeout(timer);
    		if(!t_start){
    			t_start = t_curr;
    		}
    		if(t_curr - t_start >= mustRunDelay){
    			fn.apply(context, args);
    			t_start = t_curr;
    		} else {
    			timer = setTimeout(function(){
    				fn.apply(context, args);
    			}, delay);
    		}
    	}
    },
    tabs:function(config){
    	var lTabNav=config.nav,lContent=config.content,lActive=config.active;
    	var T=$("#"+lTabNav),C=$("#"+lContent);
    	T.children("li").eq(0).addClass();
    	C.children("li").eq(0).show();
    	T.children("li").click(function(){
    		var _this=$(this),_index=_this.index();
    		T.children("li").removeClass(lActive);
    		_this.addClass(lActive);
    		C.children("li").hide();
    		C.children("li").eq(_index).show();
    	})
    },
    ajax:{},
    jsonPage:{},
    dialog:{}
}
$.extend(l.ajax,{
	basic:function(config){
		var url=config.url,method=config.method,data=config.data,anysc=config.anysc,before=config.before,success=config.success,error=config.error,tmpdata,tempdate2=[];
		if(!url){return false;}
		anysc!=false ? anysc=true:anysc=false;
		if(typeof(data)=="string" || typeof(data)=="number"){
			tmpdata=data;
		}
		if(typeof(data)=="object"){
			for (i in data){
				tempdate2.push(i+"="+data[i]);
			}
			tmpdata=tempdate2.join("&");
		}
		if(typeof(data)=="undefined"){
			tmpdata="null";
		}
		method=method.toUpperCase();
		if(method!="GET"){
		    l.xhr.open("POST",url,anysc);
		    l.xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		    l.xhr.send(tmpdata);
		}else{
		    l.xhr.open("GET",url+"?"+tmpdata,anysc);
		    l.xhr.send();				
		}
		l.xhr.onreadystatechange=function(){
			if(l.xhr.readyState==0||l.xhr.readyState==1){
				//尚未链接；
			}else if(l.xhr.readyState==2){
				if(typeof(before)=="function"){
					before();
				}
			}else if(l.xhr.readyState==4){
				if(l.xhr.status==200){
					//console.log(l.xhr.responseText);
					if(typeof(success)=="function"){
						success(l.xhr.responseText);
					}
				}else if(l.xhr.status==404){
					return "request 404";
				}else{
					if(typeof(error)=="function"){
						error();
					}
				}
			}
		}
	},
	get:function(_config){
		var config={};
		if(!_config.url){return false;}
		config.url=_config.url;
		config.method="get";
		config.anysc=true;
		if(_config.data){config.data=_config.data;}
		if(_config.before){config.before=_config.before;}
		if(_config.success){config.success=_config.success;}
		if(_config.error){config.error=_config.error;}
		l.ajax.basic(config);
	},
	post:function(_config){
		var config={};
		if(!_config.url){return false;}
		config.url=_config.url;
		config.method="post";
		config.anysc=true;
		if(_config.data){config.data=_config.data;}
		if(_config.before){config.before=_config.before;}
		if(_config.success){config.success=_config.success;}
		if(_config.error){config.error=_config.error;}
		l.ajax.basic(config);
	}
})
//实例 l.ajax.get({url:"url",data:"data",before:"before",success:"success",error:"error"});
//实例 l.ajax.baisc({url:"url",data:"data",method:"post",anysc:false,before:"before",success:"success",error:"error"});
$.extend(l.jsonPage,{
	_data:"",
	_nav:"",
	_content:"",
	_length:"",
	_perPageLength:"",
	index:function(data,perPageLength,nav,content){
		this._perPageLength=perPageLength;
		this._data=data;
		this._length=data.length;
		this._nav=$(nav);
		this._content=$(content);
		this.setPage();
		if(this._perPageLength>=this._length){
			this.setContent(0,this._perPageLength);
		}else{
			this.setContent(0,this._length);
		}
	},
    setPage:function(){
    	if(!this._length){return }
    	if(this._length>=this._perPageLength){
    		var max=Math.ceil(this._length / this._perPageLength),tmp=[],next;
    		max>2 ? next=this._perPageLength*2 : next=this._length;
    		tmp.push("<a data_beginRow='"+ 0 +"' data_endRow='"+ this._perPageLength +"'></a>");
    		for(var i=0;i<max;i++){
    			var beginRow = i * this._perPageLength,endRow = beginRow + this._perPageLength;
				if (endRow > length) {endRow = length;}
    			tmp.push("<a data_beginRow='" + beginRow + "' data_endRow='" + endRow + "'>"+(i+1)+"</a>");
    		}
    		tmp.push("<a data_beginRow='"+ this._perPageLength +"' data_endRow='"+ next +"'></a>");
    		tmp.join("");
    		this._nav.html(tmp);
    	}else{
    		this._nav.html("<a>1</a>");
    	}
    	this.selected();
    },
    setContent:function(beginRow,endRow){
    	if(!this._data){return}
    	var tmp=[];
    	this._content.html("");
    	for (beginRow; beginRow < endRow; beginRow++){
			tmp.push('<li>' + this._data[beginRow].content +'</li>');
		}
		tmp.join("");
		this._content.html(tmp);
    },
    selected:function(o){
    	var beginRow=o.attr("data_beginRow"),endRow=o.attr("data_endRow"),prev,prev2,next;
    	beginRow>this._perPageLength ? prev=beginRow-this._perPageLength : prev=0;
    	this._length>endRow ? prev2=endRow : prev2=beginRow ;
    	next=endRow+this._perPageLength;
    	if(next>this._length){next=this._length;}
    	o.siblings().removeClass("NavOn");o.addClass("NavOn");
    	this._nav.eq(0).attr({"data_beginRow":prev,"data_endRow":beginRow});
    	this._nav.last().attr({"data_beginRow":prev2,"data_endRow":next});
    	this.setContent(beginRow,endRow);
    }
})
/*
l.jsonPage.index(data,"10","#nav","#content")
$("#nav").live("click",function(){var o=$(this);l.jsonPage.selected(o);})
*/
$.extend(l.dialog,{
	creater:function(){
		if(!$("#lDialogBox")){
		    $(body).append('<div id="lDialogBox"><div class="lDialogBoxTitle"><div id="lDialogBoxTitle"></div><div id="lDialogClose"></div></div><div id="lDialogBoxContent"></div><div id="lDialogBoxBtn"></div></div>');
	    }
		$("#lDialogBox").css({"position":"absolute","zIndex":"1000"}).show();
		l.setPosition($("#lDialogBox"));
	},
	alert:function(config){
		this.creater();
		var title=config.title,content=config.content,btn=config.btn;
		if(!title){title="error";}
		if(!content){content="error";}
		if(!btn){btn="确定";}
		$("#lDialogBoxTitle").html(title);
		$("#lDialogBoxContent").html(content);
		$("#lDialogBoxBtn").html('<a id="lDialogTrue">'+btn+'</a>');
		if(config.lock=="lock"){
			$(window).resize(function(){l.throttle(this.lock(), 50, 100)});
		}
		this.selected();
	},
	confirm:function(config){
		this.creater();
		var title=config.title,content=config.content,btn1=config.btn1,btn2=config.btn2;
		if(!title){title="error";}
		if(!content){content="error";}
		if(!btn1){btn1="确定";}
		if(!btn2){btn2="取消";}
		$("#lDialogBoxTitle").html(title);
		$("#lDialogBoxContent").html(content);
		$("#lDialogBoxBtn").html('<a id="lDialogTrue">'+btn1+'</a><a id="lDialogFalse">'+btn2+'</a>');
		if(config.lock=="lock"){
			$(window).resize(function(){l.throttle(this.lock(), 50, 100)});
		}
		this.selected();
	},
	selected:function(){
		$("#lDialogTrue").live('click',function(){
			//
			this.close();
		});
		$("#lDialogFalse").live('click',function(){
			//
			this.close();
		});
		$("#lDialogClose").live('click',function(){
			this.close();
		});
	},
	close:function(){
		$("#lDialogBox,#lDialogLock").hide();
		$("#lDialogBoxTitle,#lDialogBoxContent,#lDialogBoxBtn").html("");
	},
	lock:function(){
		if(!$("#lDialogLock")){
			$(body).append('<div id="lDialogLock"></div>');
		}
		var lockWidth=$(window).width(),lockHeight=$(window).height();
		$("#lDialogLock").css({
			"width":lockWidth,
			"height":lockHeight,
			"position":"absolute",
			"zIndex":"999",
			"background":"#ddd",
			"opacity":"0.3",
			"filter":"Alpha(opacity=30)"
		}).show("fast");
	}
})
//l.dialog.alert({title:"title",content:"content",lock:"lock",btn:"OK"});
//l.dialog.confirm({title:"title",content:"content",lock:"lock",btn1:"OK",btn2:"CANCEL"});


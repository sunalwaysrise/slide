/*
author: luwenbin@live.com
*/
var l={
  xhr:window.XMLHttpRequest||window.ActiveXObject("Microsoft.XMLHTTP"),
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
	ajax:function(url,method,data){
		if(!url){return}
		if(method!="get"){method="get"}
	},
    jsonPage:{
    },
    dialog:{
    }
}
$.extend(l.ajax,{
	get:function(url,data){
	},
	post:function(url,data){
	}
})
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
$.extend(l.dialog,{
	creater:function(){
		if($("#lDialogBox")){return;}
		$(body).append('<div id="lDialogBox"><div id="lDialogBoxTitle"></div><div id="lDialogBoxContent"></div><div id="lDialogBoxBtn"></div></div>');
		l.setPosition($("#lDialogBox"));
	},
	alert:function(title,content,btn){
		this.creater();
		var title=title,content=content,btn=btn;
		if(!title){title="error";}
		if(!content){content="error";}
		if(!btn){btn="确定";}
		$("#lDialogBoxTitle").html(title);
		$("#lDialogBoxContent").html(content);
		$("#lDialogBoxBtn").html('<a id="lDialogTrue">'+btn+'</a>');
		this.selected();
	},
	confirm:function(title,content,btn1,btn2){
		this.creater();
		var title=title,content=content,btn1=btn1,btn2=btn2;
		if(!title){title="error";}
		if(!content){content="error";}
		if(!btn1){btn1="确定";}
		if(!btn2){btn2="取消";}
		$("#lDialogBoxTitle").html(title);
		$("#lDialogBoxContent").html(content);
		$("#lDialogBoxBtn").html('<a id="lDialogTrue">'+btn1+'</a><a id="lDialogFalse">'+btn1+'</a>');
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
	},
	close:function(){
		$("#lDialogBox").hide();
		$("#lDialogBoxTitle,#lDialogBoxContent").html("");
	}
})
/*
l.jsonPage.index(data,"10","#nav","#content")
$("#nav").live("click",function(){var o=$(this);l.jsonPage.selected(o);})
*/
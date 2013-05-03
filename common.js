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
    	if(this._length>=this._perPageLength){
    		var max=Math.ceil(this._length / this._perPageLength),tmp=[];
    		for(var i=0;i<max;i++){
    			var beginRow = i * this._perPageLength,endRow = beginRow + this._perPageLength;
				if (endRow > length) {endRow = length;}
    			tmp.push("<a data_beginRow='" + beginRow + "' data_endRow='" + endRow + "'>"+(i+1)+"</a>");
    		}
    		tmp.join("");
    		this._nav.html(tmp);
    	}else{
    		this._nav.html("<a>1</a>");
    	}
    	this.selected();
    },
    setContent:function(beginRow,endRow){
    	var tmp=[];
    	this._content.html("");
    	for (beginRow; beginRow < endRow; beginRow++){
			tmp.push('<li>' + this._data[beginRow].content +'</li>');
		}
		tmp.join("");
		this._content.html(tmp);
    },
    selected:function(){
    	var beginRow=$(this).attr("data_beginRow"),endRow=$(this).attr("data_endRow");
    	this.setContent(beginRow,endRow);
    }
})

// l.jsonPage.index(data,"10","#nav","#content")

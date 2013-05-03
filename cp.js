var test=[
{a:"a1",b:"a2",c:[0,1,2,3,4,5,6,7,8,9]},
{a:"a2",b:"a4",c:[0,1,2,3,4,5,6,7,8,9]},
{a:"a3",b:"a6",c:[0,1,2,3,4,5,6,7,8,9]}
];
var n=[];
for(x in test){
	var n1={a:"",b:"",c:[]},n2={a:"",b:"",c:[]},n3={a:"",b:"",c:[]},n4={a:"",b:"",c:[]};
	for (i in test[x].c){
		if(test[x].c[i]<2){
		    n1.a=test[x].a;
		    n1.b=test[x].b;
		    n1.c.push(test[x].c[i]);
		}else if(test[x].c[i]>=2 && test[x].c[i]<4){
		    n2.a=test[x].a;
		    n2.b=test[x].b;
		    n2.c.push(test[x].c[i]);
		}else if(test[x].c[i]>=4 && test[x].c[i]<7){
		    n3.a=test[x].a;
		    n3.b=test[x].b;
		    n3.c.push(test[x].c[i]);
		}else if(test[x].c[i]>=7 && test[x].c[i]<10){
			n4.a=test[x].a;
		    n4.b=test[x].b;
		    n4.c.push(test[x].c[i]);
		}
	}
	var tmp = [];
	if (n1.a != "") {tmp.push(n1);}
	if (n2.a != "") {tmp.push(n2);}
	if (n3.a != "") {tmp.push(n3);}
	if (n4.a != "") {tmp.push(n4);}
	tmp.join(",");
	n.push(tmp);
}
console.log(n);
var _all=n,__all=[],_tmp=[];
(function a(i,_all,__all,_tmp){
	for(var j=0;j<_all[i].length;j++){
		var tt=[];
		for(var i=0,len=_tmp.length;i<len;i++){
			tt.push(_tmp[i]);
		}
		if(i+1<_all.length){
            tt.push(_all[i][j]);
            a(i+1,_all,__all,tt);
        }else{
            var bb=[];
            for(var i=0,len=tt.length;i<len;i++){
            	bb.push(tt[i]);
            }
            // bb.push(tt);
            bb.push(_all[i][j]);
            __all.push(bb);
        }
	}
})(0,_all,__all,_tmp)
console.log(__all);

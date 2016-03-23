// JavaScript Document
// JavaScript Document
// 事件绑定
function addEvent(obj,sEvent,fn)
{
	if(obj.addEventListener){
		obj.addEventListener(sEvent,fn,false);
	}else{
		obj.attachEvent('on'+sEvent,fn);
	}
}
function getStyle(obj, name){
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];
}
//运动框架开始
function move(obj, json, options)
{
	options=options||{};
	options.type=options.type||'ease-out';
	options.time=options.time||300;
	
	var start={};
	var dis={};
	
	for(var name in json){
		start[name]=parseFloat(getStyle(obj, name));
		dis[name]=json[name]-start[name];
	}
	
	var count=Math.round(options.time/30);
	var n=0;
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		n++;
		
		//
		for(var name in json){
			switch(options.type){
				case 'linear':
					var cur=start[name]+dis[name]*n/count;
					break;
				case 'ease-in':
					var a=n/count;
					
					var cur=start[name]+dis[name]*a*a*a;
					break;
				case 'ease-out':
					var a=1-n/count;
					
					var cur=start[name]+dis[name]*(1-a*a*a);
					break;
			}
			
			if(name=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}else{
				obj.style[name]=cur+'px';
			}
		}
		
		if(n==count)
		{
			clearInterval(obj.timer);
			options.fn && options.fn();
		}
	}, 30);
}
//运动框架结束
	

addEvent(window,'load',function(){
	//穿墙函数


		function d2a(n){
	return n*Math.PI/180;
}
function a2d(n){
	return n*180/Math.PI;
}

var lastX,lastY;	//前一次的鼠标坐标

document.onmousemove=function (ev){
	var oEvent=ev||event;
	
	lastX=oEvent.clientX;
	lastY=oEvent.clientY;
};

function addWall(oDiv){
	var oS=oDiv.children[0];
	
	//移入之前的，最后一次的坐标
	oDiv.onmouseenter=function (){
		//找方向
		var cx=oDiv.offsetLeft+oDiv.offsetWidth/2;
		var cy=oDiv.offsetTop+oDiv.offsetHeight/2;
		
		var a=lastX-cx;
		var b=cy-lastY;	//y反着
		
		var ang=90-a2d(Math.atan2(b, a));
		
		if(ang>=-45 && ang<=45){
			//上
			oS.style.left=0;
			oS.style.top='-150px';
			
			move(oS, {left: 0, top: 0});
		}else if(ang>=45 && ang<=135){
			//右
			oS.style.left='150px';
			oS.style.top=0;
			
			move(oS, {left: 0, top: 0});
		}else if(ang>=135 && ang<=225){
			//下
			oS.style.left=0;
			oS.style.top='150px';
			
			move(oS, {left: 0, top: 0});
		}else{
			//左
			oS.style.left='-150px';
			oS.style.top=0;
			
			move(oS, {left: 0, top: 0});
		}
	};
	
	oDiv.onmouseleave=function (){
		//找方向
		var cx=oDiv.offsetLeft+oDiv.offsetWidth/2;
		var cy=oDiv.offsetTop+oDiv.offsetHeight/2;
		
		var a=lastX-cx;
		var b=cy-lastY;	//y反着
		
		var ang=90-a2d(Math.atan2(b, a));
		
		if(ang>=-45 && ang<=45){
			//上
			move(oS, {left: 0, top: -150});
		}else if(ang>=45 && ang<=135){
			//右
			move(oS, {left: 150, top: 0});
		}else if(ang>=135 && ang<=225){
			//下
			move(oS, {left: 0, top: 150});
		}else{
			//左
			move(oS, {left: -150, top: 0});
		}
	};
}
var oDiv=document.getElementById('addwall');
	var aDiv=oDiv.getElementsByTagName('div');
	for(var i=0;i<aDiv.length;i++){
		addWall(aDiv[i]);
	}
//穿墙结束
});
//拖拽
addEvent(window,'load',function(){
	//move
	var i=0;

function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
}
//time,fn	-->json
function move(obj,json,opational){
	
	var opational = opational || {};
	opational.time = opational.time || 300;
	opational.fn = opational.fn || null;
	opational.type = opational.type || 'ease-out';
	
	var start={};
	var dis={};
	for(var key in json){
		start[key]=parseInt(getStyle(obj,key));
		dis[key]=json[key]-start[key];
	}
	
	var count=Math.round(opational.time/30);
	var n=0;
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		
		for(var key in json){
			//办事
			switch(opational.type){
				case 'linear':
					var a = n/count;
					var cur=start[key]+dis[key]*a;
					break;
				case 'ease-in':
					var a=n/count;
					var cur=start[key]+dis[key]*a*a*a
					break;
				case 'ease-out':
					var a=1-n/count;
					var cur=start[key]+dis[key]*(1-a*a*a)
					break;	
			}
			
			if(key=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}else{
				obj.style[key]=cur+'px';
				
			}	
		}
		
		if(n==count){
			clearInterval(obj.timer);
			opational.fn && opational.fn();
			console.log(i++)	
		}
	},30);
}
//点击拖拽
var aLi=document.getElementById('ul1').children;
	var zIndex=2;
	
	//布局转换
	var aPos=[];
	for(var i=0;i<aLi.length;i++){
		aPos.push({left:aLi[i].offsetLeft,top:aLi[i].offsetTop});	
		aLi[i].style.left=aPos[i].left+'px';
		aLi[i].style.top=aPos[i].top+'px';
	}
	for(var i=0;i<aLi.length;i++){
		aLi[i].style.position='absolute';	
		aLi[i].style.margin=0;
		aLi[i].index=i;
	}
	
	//添加拖拽
	for(var i=0;i<aLi.length;i++){
		drag(aLi[i]);
	}	
	
	//拖拽封装
	function drag(obj){
		obj.onmousedown=function(ev){
			obj.style.zIndex=zIndex++;
			clearInterval(obj.timer);//防止运动过程中按下
			
			var oEvt=ev||event;
			var disX=oEvt.clientX-obj.offsetLeft;
			var disY=oEvt.clientY-obj.offsetTop;
			document.onmousemove=function(ev){
				var oEvt=ev||event;
				obj.style.left=oEvt.clientX-disX+'px';
				obj.style.top=oEvt.clientY-disY+'px';	
				
				//交换位置
				var nearObj=findNearest(obj);//碰撞检测+找最近
				if(nearObj && nearObj!=obj){
					
					var n=obj.index;//拿着的obj索引
					var m=nearObj.index;//被撞的索引
					
					for(var i=0;i<aLi.length;i++){
						//←	li.index>n && li.index<=m	n到m不含n
						if(aLi[i].index>n && aLi[i].index<=m){
							aLi[i].index--;
							move(aLi[i],aPos[aLi[i].index]);	
						}else if(aLi[i].index<n && aLi[i].index>=m){
							//→ li.index<n && li.index>=m n到m不含n
							aLi[i].index++;
							move(aLi[i],aPos[aLi[i].index]);
						}
						
					}
					obj.index=m;//obj的索引等于被撞到的 near(m)
				}
				
			};
			document.onmouseup=function(){
				document.onmousemove=document.onmouseup=null;
				
				move(obj,aPos[obj.index]);//回自个位置
				
				obj.releaseCapture&&obj.releaseCapture();
			};
			obj.setCapture&&obj.setCapture();
			return false;	
		};	
	}
	
	function findNearest(obj){
		var minDis=99999999999999;//距离
		var minDisIndex=-1;//下标
		for(var i=0;i<aLi.length;i++){
			//if(obj==aLi[i]) continue;//放过自己
			if(collTest(obj,aLi[i])){//撞到了
				//找最近
				var dis=getDis(obj,aLi[i]);//求obj到被撞的房子距离
				if(dis<minDis){
					minDis=dis;
					minDisIndex=i;	
				}
			}
		}
		if(minDisIndex==-1){//没撞到
			return null;
		}else{
			return aLi[minDisIndex]	//丢出去最近的li	
		}
	}
	
	function getDis(obj1,obj2){//obj1到obj2的房子的距离
		var a=aPos[obj2.index].top-obj1.offsetTop;
		var b=aPos[obj2.index].left-obj1.offsetLeft;
		return Math.sqrt(a*a+b*b);
	}
	
	function collTest(obj1,obj2){//要和obj2的房子
		var l1=obj1.offsetLeft;
		var t1=obj1.offsetTop;
		var r1=obj1.offsetLeft+obj1.offsetWidth;
		var b1=obj1.offsetTop+obj1.offsetHeight;
		
		var l2=aPos[obj2.index].left//obj2的房子位置
		var t2=aPos[obj2.index].top;
		var r2=aPos[obj2.index].left+obj2.offsetWidth;
		var b2=aPos[obj2.index].top+obj2.offsetHeight;
		
		if(l1>r2 || t1>b2 || r1<l2 || b1<t2){//obj1和obj2的房子
			//没撞到	
			return false;
		}else{
			//撞到
			return true;
		}
	}

	
});













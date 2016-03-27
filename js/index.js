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
			oS.style.left=0;
			oS.style.top='-150px';
			
			move(oS, {left: 0, top: 0});
		}else if(ang>=135 && ang<=225){
			//下
			oS.style.left=0;
			oS.style.top='-150px';
			
			move(oS, {left: 0, top: 0});
		}else{
			//左
			oS.style.left=0;
			oS.style.top='-150px';
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
			move(oS, {left: -150, top: 0});
		}else if(ang>=45 && ang<=135){
			//右
			move(oS, {left: -150, top: 0});
		}else if(ang>=135 && ang<=225){
			//下
			move(oS, {left: -150, top: 0});
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

//rock
addEvent(window,'load',function(){
	var oUl = document.getElementById("rock");
	var aLi = oUl.children;
	var len = aLi.length;
	
	//角度：360/len*i
	for(var i = 0; i < len; i++){
		
		aLi[i].style.transition = "1s all ease " + (len - i)*200 +"ms"
		aLi[i].style.transform = "rotateY("+360/len*i+"deg) translateZ(300px)";
	}
	
	
	var y = 0;
	var x = 150;
	var speedX = 0;
	var speedY = 0;
	var lastX = 0;
	var lastY = 0;
	var timer = null;
	var count = 0;
	oUl.onmousedown = function(ev){
		clearInterval(timer);
		var disX = ev.clientX - y;
		var disY = ev.clientY - x;
		
		document.onmousemove = function(ev){
			
			y = ev.clientX - disX;
			x = ev.clientY - disY;
			
			if(x > 600){
				x = 600;
			} else if(x < -600){
				x = -600;	
			}
			
			speedX = x - lastX;
			speedY = y - lastY;
			lastX = x;
			lastY = y;		
			
			
			oUl.style.transform = "perspective(800px) rotateX("+-x/10+"deg) rotateY("+y/10+"deg)";
		};
		
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
			
			clearInterval(timer);
			timer = setInterval(function(){
				
				x += speedX;
				y += speedY;
				
				speedX *= 0.95;
				speedY *= 0.95;
				
				//关定时器 判断速度
				if(Math.abs(speedX) < 1){
					speedX = 0;
				}
				if(Math.abs(speedY) < 1){
					speedY = 0;
				}
				
				if(speedX == 0&& speedY == 0){
					clearInterval(timer);
				}
				document.title = count++;
				oUl.style.transform = "perspective(800px) rotateX("+-x/10+"deg) rotateY("+y/10+"deg)"
				
			},30);
			
			
		};
		
		return false;	
	};
	
	
	
	
});

//3d盒子
addEvent(window,'load',function(){
	var oDiv = document.getElementById("div1");
	
	var y = 0;//纵轴
	var x = 0;//横轴
	oDiv.onmousedown = function(ev){
		var disX = ev.clientX - y;
		var disY = ev.clientY - x;
		
		document.onmousemove = function(ev){
			
			y = ev.clientX - disX;
			x = ev.clientY - disY;
			
			document.title = y;
		
			oDiv.style.transform = "perspective(800px) rotateX("+-x+"deg) rotateY("+y+"deg)";
		};
		
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
		};
		
		return false;	
	};
	
	
});







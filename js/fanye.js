// JavaScript Document
function id(obj){
	return document.getElementById(obj);
}


	var lm,mx;
	var md=false;
	var sh=0;
	var en=false;
	var oPartone=document.getElementById('part-one-cont');
	var pag=oPartone.getElementsByTagName("div");
	alert(pag.length)
	if(pag.length>0){
		pag[0].style.zIndex=2;
	}
	for(i=0;i<pag.length;i++){
		pag[i].className="pag";
		pag[i].innerHTML+="<span class=tip>第 "+(i+1)+"/"+pag.length+" 页 提示：左右拖拽翻页</span>";
		pag[i].id="pag"+i;
		pag[i].i=i;
		pag[i].onmousedown=function(e){
			if(!en){
				if(!e){e=e||window.event;}
				lm=this.offsetLeft;
				mx=(e.pagX)?e.pagX:e.x;
				this.style.cursor="w-resize";
				md=true;
				if(document.all){
					this.setCapture();
				}else{
					window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
				}
			}
		}
		pag[i].onmousemove=function(e){
			if(md){
				en=true;
				if(!e){e=e||window.event;}
				var ex=(e.pagX)?e.pagX:e.x;
				this.style.left=ex-(mx-lm)+350;
				
				
				
				
				if(this.offsetLeft<75){
					var cu=(this.i==0)?page.length-1:this.i-1;
					pag[sh].style.zIndex=0;
					pag[cu].style.zIndex=1;
					this.style.zIndex=2;
					sh=cu;
				}
				if(this.offsetLeft>75){
					var cu=(this.i==pag.length-1)?0:this.i+1;
					pag[sh].style.zIndex=0;
					pag[cu].style.zIndex=1;
					this.style.zIndex=2;
					sh=cu;
				}
				
				
				
				
				
				
				
			}
		}
		pag[i].onmouseup=function(){
			this.style.cursor="default";
			md=false;
			if(document.all){
				this.releaseCapture();
			}else{
				window.releaseEvents(Event.MOUSEMOVE|Event.MOUSEUP);
			}
			flyout(this);
		}
	}

function flyout(obj){
	if(obj.offsetLeft<75){
		if(		(obj.offsetLeft + 350 - 20)	>	-275	){
			obj.style.left=obj.offsetLeft + 350 - 20;
			window.setTimeout("flyout(id('"+obj.id+"'));",0);
		}else{
			obj.style.left=-275;
			obj.style.zIndex=0;
			flyin(id(obj.id));
		}
	}
	if(obj.offsetLeft>75){
		if(		(obj.offsetLeft + 350 + 20)	<	1125	){
			obj.style.left=obj.offsetLeft + 350 + 20;
			window.setTimeout("flyout(id('"+obj.id+"'));",0);
		}else{
			obj.style.left=1125;
			obj.style.zIndex=0;
			flyin(id(obj.id));
		}
	}
}
function flyin(obj){
	if(obj.offsetLeft<75){
		if(		(obj.offsetLeft + 350 + 20)	<	425		){
			obj.style.left=obj.offsetLeft + 350 + 20;
			window.setTimeout("flyin(id('"+obj.id+"'));",0);
		}else{
			obj.style.left=425;
			en=false;
		}
	}
	if(obj.offsetLeft>75){
		if(		(obj.offsetLeft + 350 - 20)	>	425		){
			obj.style.left=obj.offsetLeft + 350 - 20;
			window.setTimeout("flyin(id('"+obj.id+"'));",0);
		}else{
			obj.style.left=425;
			en=false;
		}
	}
}
//移动翻页结束

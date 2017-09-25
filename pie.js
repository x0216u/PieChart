(function($){
	$.fn.extend({
		pie:function(options){
			var pie=new pieEffect(this,options);
			canvas.addEventListener("mousemove",function(e){
             var pp = getEventPosition(e);
             pie.drew(pp);       	
           },false);
           	canvas.addEventListener("click",function(e){
            var pp = getEventPosition(e);
            pie.drew(pp,true);     
           
          },false);
		}
		
	})
	var myDiv=document.createElement("div");
	var clickDiv=document.createElement("div");
	var canvas=document.createElement("canvas");
	var ctx=canvas.getContext("2d");
	var ctop=0,cleft=0;
	var defaults={
		color:["#6A5ACD","#4682B4","#EEB4B4","#FAEBD7","#4EEE94","#63B8FF","#8B658B","#76EEC6","#97FFFF","#BBFFFF","#D1EEEE"],
		data:["5","8","29","15","20","40"],
		angel:[],
		sum:0
	}
		 
    canvas.addEventListener("mouseleave",function(e){
    	 myDiv.style.display="none";
    	// clickDiv.style.display="none";
        },false);
    canvas.addEventListener("mouseout",function(e){
    	 myDiv.style.display="none";
    	// clickDiv.style.display="none";
        },false);
	var pieEffect=function(ele,options){
		if(options==null||typeof(options)=="undefined")
		     options={};
	    this.paintDiv();
		canvas.width=ele[0].clientWidth;
        canvas.height=ele[0].clientHeight;
        ele[0].appendChild(canvas)
        ctop=ele[0].offsetTop;
        cleft=ele[0].offsetLeft;
		defaults=$.extend({},defaults,options)
		this.getSum();
		this.drew();

	}
	pieEffect.prototype={
		getSum:function(){
				for(var i=0;i<defaults.data.length;i++){
	             defaults.sum+=parseInt(defaults.data[i]);	
	           }
	 
		},
		paintDiv:function(){	
			myDiv.style.height=80+"px";
			myDiv.style.width=100+"px";
			myDiv.style.display="none";
			myDiv.style.backgroundColor="#F0FFF0"
			myDiv.style.borderRadius ="5px"
			myDiv.style.opacity="0.8"
			myDiv.style.float="left";
			myDiv.style.position="absolute";
			myDiv.style.border="1px solid #3d8cdb";
			document.body.appendChild(myDiv);
			clickDiv.style.height=180+"px";
			clickDiv.style.width=220+"px";
			clickDiv.style.display="none";
			clickDiv.style.backgroundColor="#F0FFF0"
			clickDiv.style.borderRadius ="5px"
			clickDiv.style.opacity="0.8"
			clickDiv.style.float="left";
			clickDiv.style.position="absolute";
			clickDiv.style.border="1px solid #3d8cdb";
			var a= document.createElement("a");
			a.style.color="blue";
		//	a.style.marginLeft="200px";
			$(a).attr("href","javascript:void(0)");
			$(a).css("position","absolute").css("top","0").css("right","0")
			a.innerText="关闭";
			$(a).attr('title',"关闭");
			$(a).attr('onclick',"$(this).parent().css('display','none')");
			
		    var title=document.createElement("div");
		    $(title).css("background-color","#DCDCDC");
		    $(title).css("position","absolute").css("top","0").css("width","220px").css("height","20px");
		    title.innerText="我的自定义窗口";
		    title.style.opacity="0.6";
		    clickDiv.appendChild(title);
		    clickDiv.appendChild(a);
			var cdiv=document.createElement("div");
			clickDiv.appendChild(cdiv);
			document.body.appendChild(clickDiv);
			
		
		},
		drew:function(p,flag){
			var begin=end=0;
	       for(var i=0;i<defaults.data.length;i++){
			//画一个半角
	         ctx.beginPath();
	         if(i>5){
	         	defaults.color.push(bgColor())	
	         }
		     ctx.fillStyle=defaults.color[i];
		     ctx.strokeStyle="#FFFFFF";
		     ctx.moveTo(200,200);
	         defaults.angel.push((parseFloat(defaults.data[i])/defaults.sum)*Math.PI*2) 	
	         begin=end;
	         end=defaults.angel[i]+begin;
	         ctx.arc(200,200,120,begin,end,false);
	         ctx.lineTo(200,200);
	         ctx.stroke();
             ctx.fill();
             if(p && ctx.isPointInPath(p.x, p.y)){
          //如果传入了事件坐标，就用isPointInPath判断一下
            //如果当前环境覆盖了该坐标，就将当前环境的index值放到数组里
           //  $("#myDiv").css("left",p.x+left);
           //  $("#myDiv").css("top",p.y+top);
           //  $("#myDiv").css("display","block");
                var mLeft=cleft+p.x;
                var mTop=ctop+p.y;
               //点击事件
              if(flag){
              	
           	   clickDiv.style.marginLeft=mLeft-100+"px";
               clickDiv.style.marginTop=mTop-100+"px";
               clickDiv.style.display="block";
               clickDiv.style.position="absolute";
               clickDiv.style.border="1px solid "+defaults.color[i];
               clickDiv.childNodes[2].innerHTML="<br>当前数值:<br>"+defaults.data[i]+"<br>颜色:<br>"+defaults.color[i];
               
                }
                else{
               
                myDiv.style.height=80+"px";
			    myDiv.style.width=100+"px";
                myDiv.style.marginLeft=mLeft+"px";
                myDiv.style.marginTop=mTop+"px";
                myDiv.style.display="block";
                myDiv.style.position="absolute";
                myDiv.style.border="1px solid "+defaults.color[i];
                myDiv.innerHTML="数值:<br>"+defaults.data[i]+"<br>颜色:<br>"+defaults.color[i];
                }
             }
            ctx.closePath();
	     }			
		}		
	}
	function closeDiv(){
		 clickDiv.style.display="none";	
	}
	function bgColor(){
             return  '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6); 
         }

     function bgColor2(){
             var r=Math.floor(Math.random()*256);
             var g=Math.floor(Math.random()*256);
             var b=Math.floor(Math.random()*256);
             return "rgb("+r+','+g+','+b+")";//所有方法的拼接都可以用ES6新特性`其他字符串{$变量名}`替换
         }
	function getEventPosition(ev){
    var x, y;
    if (ev.layerX || ev.layerX == 0) {
    x = ev.layerX;
    y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
    x = ev.offsetX;
    y = ev.offsetY;
    }
  return {x: x, y: y};
}
})(jQuery)

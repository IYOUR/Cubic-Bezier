var numA_x,numA_y,numB_x,numB_y;
	var MoveDerction = true;
	var ExportArray = new Array([100]);
	//根据贝塞尔曲线值设置动画transition属性
	function move() {
	var CubicBezier= numA_x +' , '+ numA_y + ' , ' + numB_x +' , '+ numB_y;
	var change1 = document.getElementById('demo1');	
	var change2 = document.getElementById('demo2');
	var change = document.getElementById('demo3Main');
    MoveTime()
	if (MoveDerction) {
	change1.style.width ="100%";
	change2.style.left ="90%";
	change.style.transform = 'rotateZ(360deg)';
	change1.style.transition = TimeString;
	change2.style.transition = TimeString;
	change.style.transition = TimeString;
	change1.style.transitionTimingFunction = 'cubic-bezier(' + CubicBezier +')';
	change2.style.transitionTimingFunction = 'cubic-bezier(' + CubicBezier +')';
	change.style.transitionTimingFunction = 'cubic-bezier(' + CubicBezier +')';	
	MoveDerction = false;
	Location_xy()
	
	}
	else {
	change1.style.width ="40px";
	change2.style.left ="0px";
	change.style.transform = 'rotateZ(0deg)';
	change1.style.transition = TimeString;
	change2.style.transition = TimeString;
	change.style.transition = TimeString;
	change1.style.transitionTimingFunction = 'cubic-bezier(' + CubicBezier +')';
	change2.style.transitionTimingFunction = 'cubic-bezier(' + CubicBezier +')';
	change.style.transitionTimingFunction = 'cubic-bezier(' + CubicBezier +')';	
	MoveDerction = true;
	 }	
	
	}	
	//显示代码导出div
	function Open(){
		 
		
		 var bezier=document.getElementById('demo1').style.transition;
		 ExportArray='Demo{-webkit-transition:all'+bezier+';transition:all'+bezier+';}';
		 var Text=document.getElementById('Text').value=ExportArray;
		 //console.log(ExportArray);
	}
	
	//获取设置时间
	function MoveTime() {
    var MoveTime_x = document.getElementById("MoveTime").value;
 	TimeString =MoveTime_x+'s';
	}

	var canvas=document.getElementById("canvas"),
    ctx=canvas.getContext("2d");
    Drag=false;
    radius=10;
	circles=[{x:0,y:400},{x:335,y:335},{x:65,y:65},{x:400,y:0}];//贝塞尔曲线端点与控制点默认参数
	canvas.onmousedown=canvasClick;
	canvas.onmouseup=Dragging;
	canvas.onmouseout=Dragging;
	canvas.onmousemove=MoveDraw;
	//控制点是否拖动
	function Dragging(){	
 	 Drag=false;
	}

	var previousCircle;
	//canvas点击事件
	function canvasClick(e){
	var clickX=e.pageX-canvas.offsetLeft;//获取鼠标焦点坐标
	var clickY=e.pageY-canvas.offsetTop;
	for(i=1;i<3;i++){
	   var circle=circles[i];
	   var distance=Math.sqrt(Math.pow(circle.x-clickX,2)+Math.pow(circle.y-clickY,2));//获得鼠标焦点与控制点的距离
	   if(distance<=radius){
			 previousCircle=circle;
             Drag=true;
			 DrawBezier();
			 return;
		   }
		
		}
	
	}	

	//鼠标拖动圆点事件
	function MoveDraw(e){
	var moveX=e.pageX-canvas.offsetLeft;
	var moveY=e.pageY-canvas.offsetTop;
	if(Drag==true){
		  previousCircle.x=moveX;
		  previousCircle.y=moveY;
		  DrawBezier();
		}else{
	canvas.style.cursor="default";
	for(i=1;i<3;i++){
		var circle=circles[i];
		var distance=Math.sqrt(Math.pow(circle.x-moveX,2)+Math.pow(circle.y-moveY,2));
		if(distance<=radius){
			
		    canvas.style.cursor="pointer";
			}
		}
	DrawBezier();
		}
	
	}

	//绘制贝塞尔曲线
	DrawBezier()
	function DrawBezier(){
	//连接控制点与端点
	  ctx.clearRect(0,0,canvas.width,canvas.height);
	  ctx.globalAlpha=0.85;
	  ctx.beginPath();
	  ctx.moveTo(circles[0].x,circles[0].y);
	  ctx.lineTo(circles[1].x,circles[1].y);
	  ctx.moveTo(circles[2].x,circles[2].y);
	  ctx.lineTo(circles[3].x,circles[3].y);
	  ctx.lineWidth=3;
	  ctx.strokeStyle="#ddd";
	  ctx.stroke();
      
	 for(i=1;i<3;i++){
	  var circle=circles[i]
	  //绘制控制点
	  ctx.beginPath();
	  ctx.arc(circle.x,circle.y,radius,0,2*Math.PI);
	  ctx.strokeStyle="#64bb5d";
	  ctx.lineWidth=0;
	  ctx.fillStyle="#64bb5d";
	  ctx.fill();
	  ctx.stroke();
	 }
	  //绘制贝塞尔曲线
	  ctx.beginPath();
	  ctx.moveTo(circles[0].x,circles[0].y);
	  ctx.bezierCurveTo(circles[1].x,circles[1].y,circles[2].x,circles[2].y,circles[3].x,circles[3].y);
	  ctx.lineWidth=3;
	  ctx.strokeStyle='#64bb5d';
	  ctx.stroke();
      Location_xy()

	 }
	 
	//获取贝塞尔曲线坐标值并换算	 
	function Location_xy(){
   	for(i=1;i<3;i++){
   	var CubicBezier= numA_x +' , '+ numA_y + ' , ' + numB_x +' , '+ numB_y;//拼凑CubicBezier值字符串
   	var OutPut = document.getElementById('OutPut');
   	   OutPut.value=CubicBezier;
	   var BezierA_x=Math.floor(circles[1].x);
	   var BezierA_y=Math.floor(circles[1].y);
	   var BezierB_x=Math.floor(circles[2].x);
	   var BezierB_y=Math.floor(circles[2].y);
	   numA_x = BezierA_x/400;
	   numA_y = 1-BezierA_y/400;
	   numB_x = BezierB_x/400;
	   numB_y = 1-BezierB_y/400;
	   numA_x = numA_x.toFixed(2);
	   numA_y = numA_y.toFixed(2);  
	   numB_x = numB_x.toFixed(2);
	   numB_y = numB_y.toFixed(2); 
   		}

	}  
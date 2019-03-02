/*******采用canvas画钟表，每秒钟画一次，并且覆盖原来的，实现了指针走动不重复******/
function drawClock(){
	var today=new Date();
	var h=today.getHours();
	var m=today.getMinutes();
	var s=today.getSeconds();
	var c=document.getElementById("clock").getContext('2d');
	/*****画钟表外框********/
	c.imageSmoothingEnabled = true;  //抗锯齿
	//钟表左耳外圆
	c.fillStyle="#FFCB00";    
	c.arc(30,30,28,0,360);
	c.fill();
	//钟表左耳內圆
	c.beginPath();     
	c.fillStyle="#ffc";
	c.arc(30,30,23,0,360);
	c.fill();
	//钟表右耳外圆
	c.beginPath();         
	c.fillStyle="#FFCB00";    
	c.arc(150,30,28,0,360);
	c.fill();
	//钟表右耳内圆
	c.beginPath();    
	c.fillStyle="#ffc";
	c.arc(150,30,23,0,360);
	c.fill();
	//钟表脚架
	c.beginPath();   
	c.lineWidth=3;
	c.fillStyle="#FFA500";
	c.moveTo(60,130);
	c.lineTo(10,153);
	c.lineTo(170,153);
	c.lineTo(120,130);
	c.fill();
	//钟表主体外圆
	c.beginPath();     
	c.strokeStyle="#FFCB00"
	c.fillStyle="#FFDF00";
	c.arc(90,80,70,0,360);
	c.stroke();
	c.fill();
	//钟表主体内圆
	c.beginPath();    
	c.lineWidth=2;
	c.fillStyle="#ffd";
	c.arc(90,80,60,0,360);
	c.fill();
	//钟表主体内圆圆点
	c.beginPath();    
	c.fillStyle="#000";
	c.arc(90,80,5,0,360);
	c.fill();
	//短线1
	c.beginPath();   
	c.lineWidth=2;
	c.strokeStyle="#FFA500";
	c.moveTo(120,28);
	c.lineTo(115,36.7);
	c.stroke();
	//短线2
	c.beginPath();   
	c.lineWidth=2;
	c.strokeStyle="#FFA500";
	c.moveTo(142,50);
	c.lineTo(133.3,55);
	c.stroke();
	//钟表右短线3
	c.beginPath();   
	c.lineWidth=3;
	c.strokeStyle="#FFA500";
	c.moveTo(150,80);
	c.lineTo(135,80);
	c.stroke();
	//短线4
	c.beginPath();   
	c.lineWidth=2;
	c.strokeStyle="#FFA500";
	c.moveTo(142,110);
	c.lineTo(133.3,105);
	c.stroke();
	//短线5
	c.beginPath();   
	c.lineWidth=2;
	c.strokeStyle="#FFA500";
	c.moveTo(120,132);
	c.lineTo(115,123.3);
	c.stroke();
	//钟表下短线6
	c.beginPath();   
	c.lineWidth=3;
	c.strokeStyle="#FFA500";
	c.moveTo(90,125);
	c.lineTo(90,140);
	c.stroke();
	//短线7
	c.beginPath();   
	c.lineWidth=2;
	c.strokeStyle="#FFA500";
	c.moveTo(60,132);
	c.lineTo(65,122.7);
	c.stroke();
	//短线8
	c.beginPath();   
	c.lineWidth=2;
	c.strokeStyle="#FFA500";
	c.moveTo(39.3,110);
	c.lineTo(48,105);
	c.stroke();
	//钟表左短线9
	c.beginPath();   
	c.lineWidth=3;
	c.strokeStyle="#FFA500";
	c.moveTo(45,80);
	c.lineTo(30,80);
	c.stroke();
	//短线10
	c.beginPath();   
	c.lineWidth=2;
	c.strokeStyle="#FFA500";
	c.moveTo(39.3,50);
	c.lineTo(48,55);
	c.stroke();
	//短线11
	c.beginPath();   
	c.lineWidth=2;
	c.strokeStyle="#FFA500";
	c.moveTo(60,28);
	c.lineTo(65,36.7);
	c.stroke();
	//钟表上短线12
	c.beginPath();   
	c.lineWidth=3;
	c.strokeStyle="#FFA500";
	c.moveTo(90,20);
	c.lineTo(90,35);
	c.stroke();
	//数字1
	c.beginPath();
	c.lineWidth=1;
	c.strokeStyle="#ff0000";
	c.font="12px 隶书"
	c.strokeText("1",110,46);
	//数字2
	c.beginPath();
	c.lineWidth=1;
	c.strokeStyle="#ff0000";
	c.font="12px 隶书"
	c.strokeText("2",126,60);
	//数字3
	c.beginPath();
	c.lineWidth=1;
	c.strokeStyle="#ff0000";
	c.font="20px 隶书"
	c.strokeText("3",124,88);
	//数字4
	c.beginPath();
	c.lineWidth=1;
	c.strokeStyle="#ff0000";
	c.font="12px 隶书"
	c.strokeText("4",125,109);
	//数字5
	c.beginPath();
	c.lineWidth=1;
	c.strokeStyle="#ff0000";
	c.font="12px 隶书"
	c.strokeText("5",110,123);
	//数字6
	c.beginPath();
	c.lineWidth=1;
	c.strokeStyle="#ff0000";
	c.font="20px 隶书"
	c.strokeText("6",85,122);
	//数字7
	c.beginPath();
	c.lineWidth=1;
	c.strokeStyle="#ff0000";
	c.font="12px 隶书"
	c.strokeText("7",65,122);
	//数字8
	c.beginPath();
	c.lineWidth=1;
	c.strokeStyle="#ff0000";
	c.font="12px 隶书"
	c.strokeText("8",51,108);
	//数字9
	c.beginPath();
	c.lineWidth=1;
	c.strokeStyle="#ff0000";
	c.font="20px 隶书"
	c.strokeText("9",47,86);
	//数字10
	c.beginPath();
	c.lineWidth=1;
	c.strokeStyle="#ff0000";
	c.font="12px 隶书"
	c.strokeText("10",50,60);
	//数字11
	c.beginPath();
	c.lineWidth=1;
	c.strokeStyle="#ff0000";
	c.font="12px 隶书"
	c.strokeText("11",64,47);
	//数字12
	c.beginPath();
	c.lineWidth=1;
	c.strokeStyle="#ff0000";
	c.font="20px 隶书"
	c.strokeText("12",80,50);

    /******时针、分针、秒针走动函数实现*********/
	function hours(h,m){     //时针
	    var hx,hy,radian;
	    var angle=90-h%12*30;   
		if(radian>0 && radian<=2*Math.PI){
			radian=angle/180*Math.PI+m*Math.PI/360;
			hx=90+20*Math.cos(radian);
			hy=80-20*Math.sin(radian);
		}else if(radian<=0 && radian>-Math.PI/2){
			radian=angle/180*Math.PI-m*Math.PI/360;
			hx=90+20*Math.cos(radian);
			hy=80-20*Math.sin(radian);
		}
		else if(radian<=-Math.PI/2 && radian>-3/2*Math.PI){
			radian=angle/180*Math.PI-m*Math.PI/360;
			hx=90+20*Math.cos(radian);
			hy=80-20*Math.sin(radian);
		}
		else{
			radian=angle/180*Math.PI-m*Math.PI/360;
			hx=90+20*Math.cos(radian);
			hy=80-20*Math.sin(radian);
		}
		c.beginPath();   
		c.lineWidth=3;
		c.strokeStyle="#000";
		c.moveTo(90,80);
		c.lineTo(hx,hy);
		c.stroke();
	}
	function minutes(m){    //分针
		var mx,my;
		var angle=90-m*6;
		var radian=angle/180*Math.PI;
		if(radian>0 && radian<=2*Math.PI){
			mx=90+35*Math.cos(radian);
			my=80-35*Math.sin(radian);
		}else if(radian<=0 && radian>-Math.PI/2){
			mx=90+35*Math.cos(radian);
			my=80-35*Math.sin(radian);
		}
		else if(radian<=-Math.PI/2 && radian>-3/2*Math.PI){
			mx=90+35*Math.cos(radian);
			my=80-35*Math.sin(radian);
		}
		else{
			mx=90+35*Math.cos(radian);
			my=80-35*Math.sin(radian);
		}
		c.beginPath();   
		c.lineWidth=2;
		c.strokeStyle="#000";
		c.moveTo(90,80);
		c.lineTo(mx,my);
		c.stroke();
	}
	function seconds(s){     //秒针
		var sx,sy;
		var angle=90-s*6;
		var radian=angle/180*Math.PI;
		if(radian>0 && radian<=2*Math.PI){
			sx=90+50*Math.cos(radian);
			sy=80-50*Math.sin(radian);
		}else if(radian<=0 && radian>-Math.PI/2){
			sx=90+50*Math.cos(radian);
			sy=80-50*Math.sin(radian);
		}
		else if(radian<=-Math.PI/2 && radian>-3/2*Math.PI){
			sx=90+50*Math.cos(radian);
			sy=80-50*Math.sin(radian);
		}
		else{
			sx=90+50*Math.cos(radian);
			sy=80-50*Math.sin(radian);
		}
		c.beginPath();   
		c.lineWidth=1;
		c.strokeStyle="#000";
		c.moveTo(90,80);
		c.lineTo(sx,sy);
		c.stroke();
	}
	hours(h,m);
	minutes(m);
	seconds(s);
}
setInterval("drawClock()",1000);
/***********************白色框中电子表显示****************************/
function time(){      
	var today=new Date();
	var h=today.getHours();
	var m=today.getMinutes();
	var s=today.getSeconds();
	var eleelectronicClock=document.getElementById("#electronicClock");
	//添加一个0在number前面
	function checkTime(i){
		if (i<10) {
			i="0"+i;
		}
	  	return i
	}
	h=checkTime(h);
	m=checkTime(m);
	s=checkTime(s);
	console.log(electronicClock.value);
	electronicClock.value=h+":"+m+":"+s;
}
setInterval('time()',1000);

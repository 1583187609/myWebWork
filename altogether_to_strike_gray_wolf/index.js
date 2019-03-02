//存在本地存储里面
var left=[14,100,190,18,104,196,23,120,202]
var bottom=[220,265,238,160,188,168,85,106,84];
var gameHistory=[];
//存在网页页面里面
var level=0;  //游戏关卡
var produceIsShow=true;   //游戏规则说明是否显示
var Score=0,bestScore=0;
var thisScore;   //每一关的score
var showMs,beatMs,slectMs;   //狼出现图片的切换时间以及击打狼图片的切换时间、以及选择洞口的间隔时间，单位为毫秒
//定义一个选择器
function $(a){
	return document.querySelectorAll(a);
}
//游戏开始界面
function startPage(){
	$("#start-btn")[0].onclick=function(){
		$("#start-cover")[0].style.display="none";
		$("#score-record")[0].style.display="block";
		$("#progress")[0].style.display="block";
		$("#ready-btn")[0].style.display="block";
		$("#s-query-btn")[0].style.display="block";
		$("#level")[0].style.display="block";
		$("#rank-bg")[0].setAttribute("src","img/game_bg.jpg");
		startGame();
	}
	$("#rule-btn")[0].onclick=function(){
		if(produceIsShow){$("#game-produce")[0].style.display="block";}
		else{$("#game-produce")[0].style.display="none";}
		produceIsShow=!produceIsShow;
	}
	$("#s-query-btn")[0].onclick=function(){
		$("#record-cover")[0].style.display="block";
		showHistory();
	}
}
startPage();
//开始游戏
function startGame(){
	level++;
	thisScore=0;
	showMs=110-level*10;
	beatMs=220-level*20;
	slectMs=2750-level*250;
	$("#level span")[0].innerText=level;
	$("#progress img")[0].style.left=0;
	if(level==1){$("#score-record")[0].innerText="0";}
	$("#ready-btn")[0].onclick=function(){
		var hole=$("#hole")[0];
		var coutDownTime=3;
		
		hole.setAttribute("src","");
		$("#count-down")[0].innerText=coutDownTime;
		$("#ready-btn")[0].style.display="none";
		$("#s-query-btn")[0].style.display="none";
		$("#count-down")[0].style.display="block";
		var countDown=setInterval(function(){
			var ms=1000/3;   //ms秒执行一次，设计游戏时长为一分钟
			coutDownTime--;
			$("#count-down")[0].innerText=coutDownTime;
			if(coutDownTime==0){
				$("#level")[0].style.display="none";
				$("#count-down")[0].style.display="none";
				clearInterval(countDown);
				var timer=setInterval(function(){
					var img=$("#progress img")[0];
					img.style.left=img.offsetLeft-1+"px";
					if(img.offsetLeft==-180){
						clearInterval(timer);
						clearInterval(selectHole);
						overPage();
					}
				},ms);
				var selTime=1000;
				var selectHole=setInterval(function(){
					var I=0;
					var wolfType;
					var n=Math.floor(Math.random()*5);
					var holeNum=Math.floor(Math.random()*10);
					if(n>3){wolfType="x";}
					else{wolfType="h";}
					var wolfShow=setInterval(function(){
						var isFirstBeat=true;
						I++;
						hole.style.left=left[holeNum]+"px";
						hole.style.bottom=bottom[holeNum]+"px";
						hole.src="img/"+wolfType+I+".png";
						if(I==5){
							clearInterval(wolfShow);
						}
						hole.onclick=function(){
							if(isFirstBeat){
								var J=4;
								isFirstBeat=!isFirstBeat;
								if(wolfType=="h"){
									Score+=10;
									thisScore+=10;
								}else{
									Score-=10;
									thisScore-=10;
								}
								$("#score-record")[0].innerText=Score;
								var successBeat=setInterval(function(){
									J++;
									hole.src="img/"+wolfType+J+".png";
									if(J==9){
										clearInterval(successBeat);
									}
								},beatMs);
							}
						}
					},showMs);
				},slectMs);
			}
		},1000)
	}
}
//游戏结账界面
function overPage(){
	if(Score>bestScore){bestScore=Score;}
	$("#over-cover")[0].style.display="block";
	$("#evaluate b")[0].innerText=thisScore;
	$("#current-score b")[0].innerText=Score;
	$("#current-level span")[0].innerText=level;
	$("#best-score b")[0].innerText=bestScore;
	if(thisScore<level*50+50){
		gameRecord();
		level=0;
		Score=0;
		$("#pass-hint")[0].innerText="再接再厉";
	}else{
		$("#pass-hint")[0].innerText="恭喜通关";
	}
	$("#continue-btn")[0].onclick=function(){
		var txt=$("#pass-hint")[0].innerText;
		if(txt=="再接再厉"){level=0;}
		$("#over-cover")[0].style.display="none";
		$("#ready-btn")[0].style.display="block";
		$("#s-query-btn")[0].style.display="block";
		$("#level")[0].style.display="block";
		hole.setAttribute("src","");
		startGame();
	}
	$("#restart-btn")[0].onclick=function(){
		gameRecord();
		level=0;
		Score=0;
		$("#over-cover")[0].style.display="none";
		$("#ready-btn")[0].style.display="block";
		$("#s-query-btn")[0].style.display="block";
		$("#level")[0].style.display="block";
		hole.setAttribute("src","");
		startGame();
	}
	$("#query-btn")[0].onclick=function(){
		$("#over-cover")[0].style.display="none";
		$("#record-cover")[0].style.display="block";
		showHistory();
	}
}
//结束游戏
function overGame(){
    //空函数	
}
//记录游戏信息
function gameRecord(){
	var obj={};
	var dateTime=new Date(),
		y=dateTime.getFullYear(),
	 	mon=dateTime.getMonth(),
	 	d=dateTime.getDate(),
	 	h=dateTime.getHours(),
		min=dateTime.getMinutes();
		s=dateTime.getSeconds();
	function checkTime(i){
		if (i<10) {
			i="0"+i;
		}
	  	return i
	}
	mon=checkTime(mon);
	d=checkTime(d);
	h=checkTime(h);
	min=checkTime(min);
	s=checkTime(s);
	obj.level=level;
	obj.y=y;
	obj.mon=mon;
	obj.d=d;
	obj.h=h;
	obj.min=min;
	obj.s=s;
	obj.score=Score;
	gameHistory.unshift(obj);
}

//显示历史信息
function showHistory(){
	var tr,td1,td2,td3,tab,caption,tr,th1,th2,th3,fragment;
	var recordLength=gameHistory.length;
	$("#record-cover label span")[0].innerText=bestScore;
	$("#record-cover label span")[0].innerText=bestScore;
	if(recordLength>10){
		gameHistory.length=10;
	}
	fragment=document.createDocumentFragment();
	tab=$("#history")[0];
	tab.innerHTML="";
	caption=document.createElement("caption");
	tr=document.createElement("tr");
	th1=document.createElement("th");
	th2=document.createElement("th");
	th3=document.createElement("th");
	fragment.appendChild(caption);
	fragment.appendChild(tr);
	tr.appendChild(th1);
	tr.appendChild(th2);
	tr.appendChild(th3);
	th1.className="level";
	th2.className="time";
	th3.className="score";
	caption.innerHTML="我的历史战绩"
	th1.innerText="关卡";
	th2.innerText="时间";
	th3.innerText="分数";
	for(var i=0;i<recordLength;i++){
		tr=document.createElement("tr");
		td1=document.createElement("td");
		td2=document.createElement("td");
		td3=document.createElement("td");
		fragment.appendChild(tr);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		td1.className="level";
		td2.className="time clear";
		td3.className="score";
		td1.innerText=gameHistory[i].level;
		td2.innerText=gameHistory[i].y+"."+gameHistory[i].mon+"."+gameHistory[i].d+" "+gameHistory[i].h+":"+gameHistory[i].min+":"+gameHistory[i].s;
		td3.innerText=gameHistory[i].score;
	}
	tab.appendChild(fragment);
}
$("#back-btn")[0].onclick=function(){
	$("#record-cover")[0].style.display="none";
	$("#ready-btn")[0].style.display="block";
	$("#s-query-btn")[0].style.display="block";
	$("#level")[0].style.display="block";
	hole.setAttribute("src","");
	startGame();
}
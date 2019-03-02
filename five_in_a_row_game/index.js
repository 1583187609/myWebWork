/************************************************************
************************   棋盘布局             **********************
* **********************************************************/
var pen=document.querySelector("#canvas-1").getContext("2d");
var deg=Math.PI/180;
function $(a){
	return document.querySelector(a);
}
//画棋盘
for(var i=0;i<15;i++){
	pen.moveTo(62,i*34+62);
	pen.lineTo(538,i*34+62);
	pen.moveTo(i*34+62,62);
	pen.lineTo(i*34+62,538);	
}
pen.lineWidth=1;
pen.stroke();
//画圆点
for(var i=0;i<3;i++){
	for(var j=0;j<3;j++){
		var x,y;
		x=62+3*34+j*34*4;
		y=62+3*34+i*34*4;
		pen.beginPath();
		pen.fillStyle="#000";
		pen.arc(x,y,4,0,360*deg);
		pen.fill();
	}
}
//写文字
pen.beginPath();
pen.fillStyle="white";
pen.font="900 40px 华文行楷";
pen.fillText("白方",62,35);
pen.font="900 18px 微软雅黑";
pen.fillText("剩余棋子数：",160,30);
pen.beginPath();
pen.fillStyle="black";
pen.font="900 40px 华文行楷";
pen.fillText("黑方",62,590);
pen.font="900 18px 微软雅黑";
pen.fillText("剩余棋子数：",160,590);
pen.fill();
//设置棋子位置
var N=0;
var chessboardCover=$("#chessboard-cover");
var fragment=document.createDocumentFragment();
for(var i=0;i<15;i++){
	for(var j=0;j<15;j++){
		var chessPiece=document.createElement("div");
		N++;
		fragment.appendChild(chessPiece);
		chessPiece.id="chess-"+N;
		chessPiece.className="chessPiece";
		chessPiece.style.top=62-17+i*34+"px";
		chessPiece.style.left=62-17+j*34+"px";
		chessPiece.innerText=N;
	}
}
chessboardCover.appendChild(fragment);
/************************************************************
************************   体验游戏             **********************
* **********************************************************/
//开始游戏    程序入口
var color;    //棋子颜色 代表的那一方
var effectChess=[];     //生效的五颗棋子,决定胜负的五颗棋子
var chessPieces=document.querySelectorAll(".chessPiece");
var length=chessPieces.length;
function startGame(){
	color="black";  //规定黑方先走
	$("#white-chess-num").value=112;
	$("#black-chess-num").value=113;
	selectPositon(color);
	dropChess();
}
startGame();
//选择落子位置
function selectPositon(){
	for(var i=0;i<length;i++){
		chessPieces[i].onmouseover=function(){
			this.classList.add(color+"-hover");
		}
		chessPieces[i].onmouseleave=function(){
			this.classList.remove(color+"-hover");
		}
	}
}
//落子
function dropChess(){
	for(var i=0;i<length;i++){
		chessPieces[i].onclick=function(){
			var num=this.innerText;
			if(this.classList.contains("white") || this.classList.contains("black")){
				$("#alert-window").style.display="block";
			}else{
				this.classList.add(color);
				if(color=="black"){
					$("#black-chess-num").value=$("#black-chess-num").value-1;
					$("#white-think").style.display="block";
					$("#black-think").style.display="none";
				}else{
					$("#white-chess-num").value=$("#white-chess-num").value-1;
					$("#white-think").style.display="none";
					$("#black-think").style.display="block";
				}
				judge(num);
			}
		}
	}
}
//判断是否获胜
function judge(num){   //判断
	var n,idNum,count,direction;
	var dirArr=["ltr","ttb","lttrb","rttlb"];
	num=parseInt(num);
	for(var k=0;k<4;k++){     //从左到右，从上到下、从左上到右下，从右上到左下四个方向来遍历
		count=0;
		effectChess.length=0;
		direction=dirArr[k];
		switch(direction){
			case "ltr": n=1; break;
			case "ttb": n=15; break;
			case "lttrb": n=16; break;
			case "rttlb": n=14; break;
		}
		for(var i=1;i<5;i++){
			var isFriend;
			idNum=num-n*i;
			if(idNum>0){
				isFriend=$("#chess-"+idNum).classList.contains(color);
				if(isFriend){
					count++;
					effectChess.push($("#chess-"+idNum));
					//存在一点小bug，当靠在最左侧从左上往右下排列好四颗，然后往上数两行的最右侧排列好一颗，则会弹出获胜框
					if(idNum%15==1){   //如果取得的点是最左边一列的话，则不再往左数了
						break;
					}
				}else{
					break;
				}
			}
		}
		for(var j=1;j<5;j++){
			var isFriend;
			idNum=num+n*j;
			if(idNum<=225){
				isFriend=$("#chess-"+idNum).classList.contains(color);
				if(isFriend){
					count++;
					effectChess.push($("#chess-"+idNum));
					if(idNum%15==0){
						break;    //如果取得的点是最右边一列的话，则不再往右数了
					}
				}else{
					break;
				}
			}
		}
		console.log(count)
		if(count>=4){
			effectChess.push($("#chess-"+num));
				if(color=="white"){
					$("#win-box b").innerText="白";
				}else{
					$("#win-box b").innerText="黑";
				}
			$("#win-box").style.display="block";
			break;
		}else if(count<0 && $("#black-chess-num").value==0){     //当count小于4且黑棋子用完时，显示平局
			$("#win-box p").innerHTML="平局";
			$("#win-box").style.display="block";
		}
	}
	if(color=="black"){
		color="white";
	}else{
		color="black";
	}
}
//给再来一局按钮绑定事件
$("#again-btn").onclick=function(){
	$("#win-box").style.display="none";
	for(var i=0;i<length;i++){
		chessPieces[i].className="chessPiece";
	}
	startGame();
}
//给继续游戏按钮绑定事件
$("#continue-btn").onclick=function(){
	$("#win-box").style.display="none";
	$("#win-box p").style.display="block";
	$("#again-btn").style.display="block";
	$("#query-btn").style.display="block";
	for(var i=0;i<length;i++){
		chessPieces[i].className="chessPiece";
	}
	for(var i=0;i<effectChess.length;i++){
		effectChess[i].style.boxShadow="none";
	}
	startGame();
}
//给查看详情按钮绑定事件
$("#query-btn").onclick=function(){
	$("#continue-btn").style.display="block";
	$("#win-box p").style.display="none";
	$("#again-btn").style.display="none";
	$("#query-btn").style.display="none";
	for(var i=0;i<effectChess.length;i++){
		effectChess[i].style.boxShadow="0 0 5px 5px orange";
	}
}
//给ok按钮绑定事件
$("#ok-btn").onclick=function(){
	$("#alert-window").style.display="none";
}

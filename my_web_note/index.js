function $(a){
	return document.querySelectorAll(a);
}
//数据库
var htmlPagesName=[
		"wait-to-adept-tag.html",
		"standard-attribute.html",
		"table.html",
		"html-question-and-answer.html",
		"html-note.html"
	]
var cssPagesName=[
		"css-page-1.html",
		"css-page-2.html",
		"css-page-3.html",
		"css-page-4.html",
		"css-question-and-answer.html",
		"css-note.html"
	]
var javascriptPagesName=[
		"js2-1126.html",
		"rexgularExpression.html",
		"js2-1127.html",
		"js-notice-concept.html",
		"js-page-4.html",
		"js-question-and-answer.html",
		"js-note.html"
	]
var jqueryPagesName=[
		"jquery-page-1.html",
		"jquery-page-2.html",
		"jquery-page-3.html",
		"jquery-page-4.html",
		"jquery-question-and-answer.html",
		"jquery-note.html"
	]
var reserve1PagesName=[
		"reserve1-page-1.html",
		"reserve1-page-2.html",
		"reserve1-page-3.html",
		"reserve1-page-4.html",
		"reserve1-question-and-answer.html",
		"reserve1-note.html"
	]
var reserve2PagesName=[
		"reserve2-page-1.html",
		"reserve2-page-2.html",
		"reserve2-page-3.html",
		"reserve2-page-4.html",
		"reserve2-question-and-answer.html",
		"reserve2-note.html"
	]
var reserve3PagesName=[
		"reserve3-page-1.html",
		"reserve3-page-2.html",
		"reserve3-page-3.html",
		"reserve3-page-4.html",
		"reserve3-question-and-answer.html",
		"reserve3-note.html"
	]
var reserve4PagesName=[
		"reserve4-page-1.html",
		"reserve4-page-2.html",
		"reserve4-page-3.html",
		"reserve4-page-4.html",
		"reserve4-question-and-answer.html",
		"reserve4-note.html"
	]
var summaryPagesName=[
		"css-selector-wait-to-memory.html",
		"summary-page-2.html",
		"summary-page-3.html",
		"summary-page-4.html",
		"summary-question-and-answer.html",
		"summary-note.html"
	]
var arraysCollect=[
	htmlPagesName,
	cssPagesName,
	javascriptPagesName,
	jqueryPagesName,
	reserve1PagesName,
	reserve2PagesName,
	reserve3PagesName,
	reserve4PagesName,
	summaryPagesName    //summaryPagesName只能放在这个倒数第一的位置，因为程序中有相关设定
]

//点击左上角按钮实现页面固定或流动
var fixedBtn=$(".fixed")[0];
var fix=false;
fixedBtn.onclick=function(){
	if(fix==false){
		this.style.background=" url(Database/flowed_icon.jpg) no-repeat 50%/70%";
		$(".banner")[0].style.display="none";
		$("footer")[0].style.display="none";
		fix=true;
	}
	else{
		this.style.background=" url(Database/fixed_icon.jpg) 0 0/100%";
		$(".banner")[0].style.display="block";
		$("footer")[0].style.display="block";
		fix=false;
	}
}
//点击左侧或右侧的标题栏，实现面板的展开或者折叠
var foldBtns=$("[class$='-part'] h2 .fold");
for(var i=0;i<foldBtns.length;i++){
	$("[class$='-content']")[i].style.display="block";
	foldBtns[i].onclick=function(){
		var contentNode=this.parentNode.parentNode.children[1];
		var h2Order=this.parentNode.getAttribute("data-h");
		if(contentNode.style.display=="block"){
			contentNode.style.display="none";
			this.innerText="展开";
		}
		else{
			contentNode.style.display="block";
			this.innerText="折叠";
		}
		
		if(h2Order!=null && contentNode.style.display=="none"){
			$(".separation-line")[h2Order].style.top=32+"px";
		}
		if(h2Order!=null && contentNode.style.display=="block"){
			$(".separation-line")[h2Order].style.top=300+"px";
		}
	}
}
//点击navAsBtn时，实现左侧目录及其中间show区域和右侧问答、笔记区域的显示内容改变
var navAsBtn=$("nav a");
var aOrder=0;
var inText="Html";
for(var i=0;i<navAsBtn.length;i++){
	navAsBtn[i].onclick=function(){
		inText=this.innerText;
		aOrder=this.getAttribute("data-order");
		var newQaSrc,newNoteSrc,newShowSrc;
		for(var x=0;x<1;x++){
			var qaIndex=arraysCollect[aOrder].length-2;
			var	noteIndex=arraysCollect[aOrder].length-1;
			for(var y=0;y<1;y++){
				newQaSrc=inText+"/"+arraysCollect[aOrder][qaIndex];
				newNoteSrc=inText+"/"+arraysCollect[aOrder][noteIndex];
				newShowSrc=inText+"/"+arraysCollect[aOrder][0];
			}
		}
		for(var j=0;j<navAsBtn.length;j++){
			navAsBtn[j].style.backgroundColor="#009";
			$("#catalogue ul")[j].style.display="none";
		}
		this.style.backgroundColor="#0cf";
		$("#catalogue ul")[aOrder].style.display="block";
		for(var a=0;a<$(".H2Span").length;a++){
			$(".H2Span")[a].innerText=inText;
		}
		$("#q-and-a iframe")[0].setAttribute("src",newQaSrc);
		$("#note iframe")[0].setAttribute("src",newNoteSrc);
		$(".show iframe")[0].setAttribute("src",newShowSrc);
		clickMenuA();
	}
}
//点击左侧menu上方里面的链接时，中间的show区域显示内容发生相应变化
function clickMenuA(){
	var presentUl=$("#catalogue ul")[aOrder];
	var ulAs=presentUl.getElementsByTagName("a");
	for(var i=0;i<ulAs.length;i++){
		ulAs[i].onclick=function(){
			var order=this.getAttribute("data-order");
			var newSrc=inText+"/"+arraysCollect[aOrder][order];
			$(".show iframe")[0].setAttribute("src",newSrc);
		}
	}
}
clickMenuA();
//点击左侧menu下方里面的链接时，中间的show区域显示内容发生相应变化
var summaryAs=$("#summary a");
for(var i=0;i<summaryAs.length;i++){
	summaryAs[i].onclick=function(){
		var order=this.getAttribute("data-order");
		var newSrc="Summary/"+arraysCollect[arraysCollect.length-1][order]
		$(".show iframe")[0].setAttribute("src",newSrc);
	}
}
//上下拖动左侧或者右侧中间的细线,可改变左侧或者右侧上下盒子的高度,可以自由调整,但是有限度
var line=$(".main .separation-line");
for(var i=0;i<line.length;i++){
	line[i].onmousedown=function(event){
		var order=this.getAttribute("data-order");
		var my=event.y;  //获取当前鼠标的坐标（相对于浏览器的文档窗口）
		var oy=line[order].offsetTop;
		line[order].parentNode.onmousemove=function(e){
			var upCon,downCon,upUlIf,downUlIf;
			var upConH,downConH,upUlIfH,downUlIfH;
			var moveY=e.y-my;
			upCon=line[order].parentNode.querySelectorAll("[class$='-content']")[0];
			downCon=line[order].parentNode.querySelectorAll("[class$='-content']")[1];
			upUlIf=line[order].parentNode.querySelectorAll("[class$='-content']")[0].children[0];
			downUlIf=line[order].parentNode.querySelectorAll("[class$='-content']")[1].children[0];
			upConH=upCon.offsetHeight;
			downConH=downCon.offsetHeight;
			upUlIfH=upUlIf.offsetHeight;
			downUlIfH=downUlIf.offsetHeight;
			console.log("upConH="+upConH+",upUlIfH="+upUlIfH+",downConH="+downConH+",downUlIfH="+downUlIfH)
			console.log("moveY="+moveY)
			if(upConH<=550 && downConH<=550){
				line[order].style.top=e.y-(my-oy)+"px";
				upCon.style.height=upConH+moveY+"px";
				downCon.style.height=downConH-moveY+"px";
				if(upConH<upUlIfH){
					upUlIf.style.height=upUlIfH+moveY+"px";
				}
				if(downConH<downUlIfH){
					downUlIf.style.height=downUlIfH-moveY+"px";
				}
			}else{
				console.log("超出限制了！")
			}
		}
		document.onmouseup=function(){
			line[order].parentNode.onmousemove=line[order].onmouseup=null; //给鼠标移动和鼠标放开赋值null
		}
	}
}
//点击添加按钮
var addBtns=$(".add");
for(var i=0;i<addBtns.length;i++){
	addBtns[i].onclick=function(){
		$(".shade-box")[0].style.display="block";
		var partOrder;
		if(this.parentNode.parentNode.getAttribute("id")=="q-and-a"){
			partOrder=0;
		}else{
			partOrder=1;
		}
		$(".shade-box figure")[partOrder].style.display="block";
		$(".shade-box figure")[partOrder].getElementsByTagName("span")[0].innerText=inText;
	}
}
//点击批量删除按钮
var delBtns=$(".del");
for(var i=0;i<delBtns.length;i++){
	delBtns[i].onclick=function(){
		var checkboxNum=0
		var partOrder;
		if(this.parentNode.parentNode.getAttribute("id")=="q-and-a"){
			partOrder=0;
		}else{
			partOrder=1;
		}
		var checkBoxs= $("iframe")[partOrder+1].contentWindow.document.getElementsByTagName("input");
		for(var i=0;i<checkBoxs.length;i++){
			if(checkBoxs[i].checked==true){
				checkboxNum++;
			}
		}
		if(checkboxNum==0 && partOrder==0){
			alert("请选中你想要删除的问答！");
		}else if(checkboxNum!=0 && partOrder==0){
			confirm("确认删除"+checkboxNum+"条问答么？");
		}else if(checkboxNum==0 && partOrder==1){
			alert("请选中你想要删除的笔记！");
		}else if(checkboxNum!=0 && partOrder==1){
			confirm("确认删除"+checkboxNum+"条笔记么？");
		}
	}
}
//点击全选按钮
var allSelBtns=$(".allSel");
for(var i=0;i<allSelBtns.length;i++){
	allSelBtns[i].onclick=function(){
		var partOrder;
		if(this.parentNode.parentNode.getAttribute("id")=="sel-1"){
			partOrder=0;
		}else{
			partOrder=1;
		}
		var checkBoxs= $("iframe")[partOrder+1].contentWindow.document.getElementsByTagName("input");
		for(var i=0;i<checkBoxs.length;i++){
			checkBoxs[i].style.display="block";
			checkBoxs[i].checked=true;
		}
	}
}
//点击全不选按钮
var allNoSelBtns=$(".allNoSel");
for(var i=0;i<allNoSelBtns.length;i++){
	allNoSelBtns[i].onclick=function(){
		var partOrder;
		if(this.parentNode.parentNode.getAttribute("id")=="sel-1"){
			partOrder=0;
		}else{
			partOrder=1;
		}
		var checkBoxs= $("iframe")[partOrder+1].contentWindow.document.getElementsByTagName("input");
		for(var i=0;i<checkBoxs.length;i++){
			checkBoxs[i].style.display="block";
			checkBoxs[i].checked=false;
		}
	}
}
//点击取消选择按钮
var cancelSelBtn=$(".cancelSel");
for(var i=0;i<cancelSelBtn.length;i++){
	cancelSelBtn[i].onclick=function(){
		var partOrder;
		if(this.parentNode.parentNode.getAttribute("id")=="sel-1"){
			partOrder=0;
		}else{
			partOrder=1;
		}
		var checkBoxs= $("iframe")[partOrder+1].contentWindow.document.getElementsByTagName("input");
		for(var i=0;i<checkBoxs.length;i++){
			checkBoxs[i].style.display="none";
			checkBoxs[i].checked=false;
		}
	}
}
//点击关闭遮罩
$(".close-btn")[0].onclick=function(){
	$(".shade-box")[0].style.display="none";
	for(var i=0;i<3;i++){
		$(".shade-box figure")[i].style.display="none";
	}
}
//点击提交按钮
$(".submit-btn")[0].onclick=function(){
	alert("已成功提交！")
}

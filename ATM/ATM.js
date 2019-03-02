//基本函数
function $(a){
	return document.querySelector(a);
}
function $$(a){
	return document.querySelectorAll(a);
}
//全局变量
var hasCard=false;
var activeInpId=null;
var currentUser=null;   //当前登录的用户
var moveToUser=null;    //转账给对方，对方的账户
var currentCard=null;   //插入的当前信用卡
var users=userInfo.users;  //信用卡的所有用户
var useingCardY;   //记录使用中的信用卡最开始的坐标值Y值
//窗口加载函数
window.onload=function(){
	enterPage(0);
	inputNumber();
	inputOkAndDel();
	keyboardInput();
	createCards();
	moveCard();
	clickPageBtn();  
	$("#money-ward").onclick=function(){    //点击出钞口的遮罩可以打开与关闭这个遮罩
		if(this.className=="openWard"){this.className="";
		}else{this.className="openWard";}
	}
	document.onselectstart=new Function("event.returnValue=false");   //不允许选中网页上的内容
}
//进入某个页面
function enterPage(pageNum){
	$(".page-show") && $(".page-show").classList.remove("page-show");
	$$(".page")[pageNum].classList.add("page-show");
	if(pageNum==6){   //查询余额页面
		$$(".page")[pageNum].querySelector('input').value=currentUser.balance;
	}else if(pageNum==7){    //消费记录页面
		$("#payLists").innerHTML="";
		showPayHistory();
	}else if($$(".page")[pageNum].querySelector('input')){   //pageNum不等于6且有输入框的页面
		var inp="";
		if(pageNum==5){  //转账页面
			inp=$("#another-card-inp");
			$("#another-card-inp").parentNode.style.display="block";
			$("#move-money-inp").parentNode.style.display="none";
		}else{
			inp=$$(".page")[pageNum].querySelector('input');
		}
		inp.value="";
		inp.focus();
		activeInpId=inp.id;
	}
}
//点击数字按键并输入数字
function inputNumber(){
	for(var i=0;i<10;i++){
		$$(".num-btn")[i].onclick=function(){
			if(!$("#window-cover")){    //当提示窗口不存在时，才允许输入
				$("#"+activeInpId).value+=this.innerHTML;
				if(activeInpId.substring(activeInpId.length-8)=='card-inp'){   //登录时输入的卡号和转账时对方的卡号
					var cardNumLength=$("#"+activeInpId).value.split("-").join("").length;
					if(cardNumLength%4==0){$("#"+activeInpId).value+="-";}	
				}
				judgeInputFormat($("#"+activeInpId).value);
				$("#"+activeInpId).focus();
			}else{      //当提示窗口存在时，不允许输入，并且当用户再点击时，提示窗口边框闪烁
				windowBoxBlink();
			}
		}
	}
}
//点击确认、删除按键，实现相应功能
function inputOkAndDel(){
	$("#ok").onclick=function(){
		if(!$("#window-cover")){    //当提示窗口不存在时，才允许输入
			judgeInputResult($("#"+activeInpId).value);
			$("#"+activeInpId).focus();
		}else{      //当提示窗口存在时，不允许输入，并且当用户再点击时，提示窗口边框闪烁
			windowBoxBlink();
		}
	}
	$("#del").onclick=function(){
		if(!$("#window-cover")){    //当提示窗口不存在时，才允许输入
			var v=$("#"+activeInpId).value;
			if(v.substr(-1)=="-"){$("#"+activeInpId).value=v.substring(0,v.length-2);
			}else{$("#"+activeInpId).value=v.substring(0,v.length-1);}
			$("#"+activeInpId).focus();
		}else{      //当提示窗口存在时，不允许输入，并且当用户再点击时，提示窗口边框闪烁
			windowBoxBlink();
		}
	}
}
//真实键盘输入
function keyboardInput(){
	document.onkeydown=function(e){
		var keyCode=e.keyCode;
		if((keyCode>=48 && keyCode<=57) || (keyCode>=96 && keyCode<=105) || keyCode==8){  //0——9 和小键盘区域的0——9；8：backSpace键
			if(!$("#window-cover")){    //当提示窗口不存在时，才允许输入
				$("#"+activeInpId).oninput=function(){
					if(activeInpId.substring(activeInpId.length-8)=='card-inp'){   //登录时输入的卡号和转账时对方的卡号
						var inpVal=$("#"+activeInpId).value;
						var cardNumLength=inpVal.split("-").join("").length;
						if(cardNumLength%4==0 && cardNumLength>0){$("#"+activeInpId).value+="-";}
						if(keyCode==8 && inpVal.substr(-1)=="-"){
							$("#"+activeInpId).value=inpVal.substring(0,inpVal.length-1);
						}
					}
				}
			}else{      //当提示窗口存在时，不允许输入，并且当用户再点击时，提示窗口边框闪烁
				windowBoxBlink();
			}
			judgeInputFormat($("#"+activeInpId).value);
		}else if(keyCode==13){    //enter键
			if($("#window-cover")){$("#window-cover").remove();}
			else{judgeInputResult($("#"+activeInpId).value);}
		}else if(keyCode==123){    //F12键，网页打开检查快捷键
		}else{     //禁止输入非数字
			e.keyCode=0; 
			e.returnValue=false; 
		}
	}
	//禁止中文输入法
	$("#"+activeInpId).addEventListener('compositionend',function(e){
		$("#"+activeInpId).value ="";  
		hintWinow("alert","禁止使用中文输入法输入中文！");
	},false);
}
//提示窗口边框闪烁
function windowBoxBlink(){
	var isHasBoxShadow=false;
	var time=0;
	setTimeout(function(){
		for(var a=0;a<6;a++){
			time+=100;
			setTimeout(function(){
				if($("#window-box")){
					isHasBoxShadow=!isHasBoxShadow;
					if(!isHasBoxShadow){$("#window-box").style.boxShadow="0 0 20px 5px #00f";}
					else{$("#window-box").style.boxShadow="none";}
				}
			},time)
		}
	},100);
}
//点击页面上的按钮，跳转到相应页面
function clickPageBtn(){
	var moneyBtns=$$(".money-btn");
	var backCardBtns=$$(".back-card-btn");
	var backHomeBtns=$$(".back-home-btn");
	for(var i=0;i<moneyBtns.length;i++){
		(function(i){
			moneyBtns[i].onclick=function(){enterPage(i+3);}
		})(i)
	}
	for(var j=0;j<backCardBtns.length;j++){
		backCardBtns[j].onclick=function(){
			hasCard=false;
			enterPage(0);
			currentUser=null;   
			moveToUser=null;
			currentCard.style.cssText="display:block;left:0;top:"+useingCardY+"px;";
			$("#card-line").style.display="none";
		}
	}
	for(var k=0;k<backHomeBtns.length;k++){
		backHomeBtns[k].onclick=function(){enterPage(2);}
	}
}
//在进行输入时，判断输入格式是否正确
function judgeInputFormat(inpVal){ 
	switch(activeInpId){
		case "card-inp": 
			if(inpVal.length>=23){
				$("#"+activeInpId).value=inpVal.substr(0,23);
				hintWinow("alert","账号位数已达19位，请按确认键！")
			}
			break;
		case "password-inp": 
			if(inpVal.length>=6){
				$("#"+activeInpId).value=inpVal.substr(0,6);
				hintWinow("alert","密码位数已达6位，请按确认键！")
			}
			break;
		case "put-money-inp":
		    if(inpVal.substr(0,1)==0){
				hintWinow("alert","第一位数字不能为0，请重新输入！");
				$("#"+activeInpId).value="";
			}else if(inpVal>10000){
				$("#"+activeInpId).value=inpVal.substr(0,5);
				hintWinow("alert","每次存款金额不能超过<b>10,000</b>元！");
			}else{showMoney(inpVal);}
			break;
		case "out-money-inp":
			if(inpVal.substr(0,1)==0){
				hintWinow("alert","第一位数字不能为0，请重新输入！");
				$("#"+activeInpId).value="";
			}
			if(inpVal>10000){
				$("#"+activeInpId).value=inpVal.substr(0,5);
				hintWinow("alert","每次取款金额不能超过<b>10,000</b>元！");
			}
		    break;
		case "another-card-inp":
			if(inpVal.length>=23){
				$("#"+activeInpId).value=inpVal.substr(0,23);
				hintWinow("alert","账号位数已达19位，请按确认键！");
			}
			break;
		case "move-money-inp":
			if(inpVal.substr(0,1)==0){
				hintWinow("alert","第一位数字不能为0，请重新输入！");
				$("#"+activeInpId).value="";
			}
			if(inpVal>1000000){
				$("#"+activeInpId).value=inpVal.substr(0,7);
				hintWinow("alert","每次转账金额不能超过<b>1,000,000</b>元！");
			}
			break;
		case "balance-inp": break;
		default:hintWinow("alert","请选择有效的输入框进行输入！"); return 0;
	}
}
//在输入完成后，按下确认键时，判断输入结果是否正确
function judgeInputResult(inpVal){
	switch(activeInpId){
		case "card-inp":   //欢迎页面输入账号
			if(inpVal.length<23){hintWinow("alert","账号位数不足19位！");}
			else{
				for(var i=0;i<users.length;i++){
					if(inpVal==users[i].cardNum){
						hasCard==true;
						enterPage(1);
						currentUser=users[i];
						break;
					}else if(i==users.length-1){hintWinow("alert","不存在此账户！");}
				}
			}
			break;
		case "password-inp":     //登录页面输入密码
			if(inpVal.length<6){hintWinow("alert","密码位数不足6位！");return;}
			if(currentUser.password==inpVal){enterPage(2);
			}else{hintWinow("alert","您输入的账号或密码有误！");}
			break;
		case "put-money-inp":     //存款页面输入存款金额
			if(inpVal==""){hintWinow("alert","存款金额不能为空！"); return;}
			if(inpVal>10000){hintWinow("alert","每次存款金额不得超过<b>10,000</b>元");}
			else{
				if(inpVal%100==0){
					currentUser.balance+=parseInt(inpVal);
					hintWinow("alert","<b>"+inpVal+'</b>元人民币已存到您的账户，请在"查询余额"或"消费记录"中进行查看！');
					createPayInfo("存入",inpVal);
					$("#"+activeInpId).value="";
					$("#money-box").innerHTML="";
					$("#money-box").style.height=0;
					$(".openWard") && $("#money-ward").classList.remove("openWard");
				}else{hintWinow("alert","只支持存入百元钞票！");}
			}
			break;
		case "out-money-inp":      //取款页面取出存款
			if(inpVal==""){hintWinow("alert","取款金额不能为空！"); return;}
			if(inpVal>10000){hintWinow("alert","每次取款金额不得超过<b>10,000</b>元");}
			else{
				if(inpVal%100==0){
					if(currentUser.balance>=parseInt(inpVal)){
						currentUser.balance-=parseInt(inpVal);
						showMoney(inpVal);
						hintWinow("alert","请在出钞口取走您的<b>"+inpVal+"</b>元钞票！");
						createPayInfo("取出",inpVal)
						$("#"+activeInpId).value="";
						$("#money-box").style.height=0;
						$("#money-box").onclick=function(){
							this.innerHTML="";
							$("#money-ward").classList.remove("openWard");
							$("#money-box").onclick=null;  
						}
					}else{hintWinow("alert","您的余额不足，余额为<b>"+currentUser.balance+"</b>元！");}
				}else{hintWinow("alert","只支持取出百元钞票！");}
			}
			break;
		case "another-card-inp":    //转账页面输入对方账号
			if(inpVal.length<23){hintWinow("alert","账号位数不足19位！");}
			else{
				for(var i=0;i<users.length;i++){
					if(inpVal==users[i].cardNum){
						if(inpVal==currentUser.cardNum){
							hintWinow("alert","对方账号不能是本卡账号，请重新输入！");
							$("#"+activeInpId).value="";
						}else{
							$("#move-money-inp").parentNode.style.display="block";
							$("#another-card-inp").parentNode.style.display="none";
							activeInpId="move-money-inp";
							$("#"+activeInpId).focus();
							moveToUser=users[i];
						}
						break;
					}else if(i==users.length-1){hintWinow("alert","不存在此账户！");}
				}
			}
			break;
		case "move-money-inp":     //转账页面输入转账金额
			if(inpVal==""){hintWinow("alert","转账金额不能为空！"); return;}
			if(inpVal>1000000){hintWinow("alert","每次转账金额不得超过<b>1,000,000</b>元");}
			else if(currentUser.balance<parseInt(inpVal)){hintWinow("alert","您的余额不足，余额为<b>"+currentUser.balance+"</b>元！");}
			else{
				hintWinow("confirm","请确认转账信息<br />对方姓名：<b>"+moveToUser.name+"</b><br />转账金额：<b>"+inpVal+"</b>元",function(isExe){
					if(isExe){
						currentUser.balance-=parseInt(inpVal);
						moveToUser.balance+=parseInt(inpVal);
						hintWinow("alert","成功转账"+inpVal+"元！");
						createPayInfo("转入",inpVal);
						createPayInfo("转出",inpVal);
					}
				});
			}
			break;
		case "balance-inp":      //查询余额页面显示余额
			hintWinow("alert","您的余额为<b>XXX</b>元");
			break;
		default:
			hintWinow("alert","请选择有效的输入框再按确认键！");
			return 0;
	}
}
//出钞口中根据金额来显示相应数额的人民币，每增加一百元，高度则增加1px，上限一万元
function showMoney(inpVal){
	var fragment,count;   //count计数已放入多少张100元钞票
	var r,g,b;   //rgb颜色值
	$("#money-ward").classList="openWard";
	$("#money-box").innerHTML="";
	fragment=document.createDocumentFragment();
	count=parseInt(inpVal/100);
	r=g=b=200;
	for(var i=1;i<=count;i++){
		var RMB=document.createElement("img");
		RMB.classList.add("RMB");
		RMB.src="RMB.jpg";
		r=g=b=b-2;
		RMB.style.cssText="border:1px solid rgb("+r+","+g+","+b+");top:"+(i-1)+"px;z-index:"+(1000-i)+";";
		$("#money-box").style.cssText="height:"+i+"px;";
		fragment.appendChild(RMB);
	}
	$("#money-box").appendChild(fragment);
}
//根据用户的输入，用弹出窗口进行相应的提示
function hintWinow(type,msg,cb){
	if(!$("#window-cover")){
		var fragment=document.createDocumentFragment();
		var windowCover=document.createElement("div");
		var windowBox=document.createElement("div");
		var windowHead=document.createElement("div");
		var windowBody=document.createElement("div");
		var windowFoot=document.createElement("div");
		var windowOk=document.createElement("button");
		var textBox=document.createElement("div");
		windowCover.id="window-cover";
		windowBox.id="window-box";
		windowHead.id="window-head";
		windowBody.id="window-body";
		textBox.id="text-box";
		textBox.innerHTML=msg;
		windowFoot.id="window-foot";
		windowOk.id="window-ok-btn";
		windowOk.innerText="确定";
		windowCover.appendChild(windowBox);
		windowBox.appendChild(windowHead);
		windowBox.appendChild(windowBody);
		windowBox.appendChild(windowFoot);
		windowBody.appendChild(textBox);
		windowFoot.appendChild(windowOk);
		if(type=="alert"){
			windowHead.innerText="温馨提示";
			windowOk.onclick=function(){
				windowCover.remove();
				$("#"+activeInpId).focus();
			}
			windowBox.onkeydown=function(e){
				if(e.keyCode==13){
					windowCover.remove();
					$("#"+activeInpId).focus();
				}
			}
		}else if(type=="confirm"){
			var windowCancel=document.createElement("button");
			windowHead.innerText="消息确认";
			windowCancel.id="window-cance-btn";
			windowCancel.innerText="取消";
			windowFoot.appendChild(windowCancel);
			windowOk.onclick=function(){
				windowCover.remove();
				$("#"+activeInpId).focus();
				cb(true);
			}
			windowCancel.onclick=function(){
				windowCover.remove();
				$("#"+activeInpId).focus();
				cb(false);
			}
			document.onkeydown=function(e){
				if(e.keyCode==13){
					windowCover.remove();
					$("#"+activeInpId).focus();
					cb(true);
				}
			}
		}
		fragment.appendChild(windowCover);
		$("#screen").appendChild(fragment);
		//实现提示窗口的文字垂直居中显示
		var marTop=(88-textBox.offsetHeight)/2;
		textBox.style.marginTop=marTop+"px";
		if(textBox.offsetHeight==22){textBox.style.textAlign="center";}
	}
}
//根据用户的数量生成相应的信用卡数量
function createCards(){
	var fragment=document.createDocumentFragment();
	var takeSpace=document.createElement("div");
	for(var j=0;j<users.length;j++){
		var card=document.createElement("div");
		var i=document.createElement("i");
		var img=document.createElement("img");
		var b=document.createElement("b");
		var em=document.createElement("em");
		var span=document.createElement("span");
		var strong=document.createElement("strong");
		card.classList.add("cards");
		card.id="card-"+j;
		card.style.top=170*j+5+"px";
		i.innerText="银联";
		img.src="zgjsyh.jpg";
		b.innerText=users[j].cardNum;
		em.innerText="◁ ATM";
		span.innerText="持卡人签名：";
		strong.innerText=users[j].name;
		card.appendChild(i);
		card.appendChild(img);
		card.appendChild(b);
		card.appendChild(em);
		card.appendChild(span);
		card.appendChild(strong);
		fragment.appendChild(card);
	}
	takeSpace.classList.add("take-space");
	takeSpace.style.top=170*users.length+"px";
	fragment.appendChild(takeSpace);
	$("#cards-box").appendChild(fragment);
}
// 移动（拖动）信用卡
function moveCard(){
	for(var i=0;i<users.length;i++){
		$("#card-"+i).onmousedown=function(d){
			var dx=d.x,dy=d.y;
			var dOffX=d.offsetX,dOffY=d.offsetY;
			var visibleX=document.documentElement.clientWidth; 
			var leftest=visibleX/2-350,rightest=visibleX/2-150,topest=400,bottomest=600;
			currentCard=this;
			useingCardY=this.offsetTop;
			currentCard.style.cssText="position:fixed;left:"+(dx-dOffX)+"px;top:"+(dy-dOffY)+"px;"
			document.onmousemove=function(m){
				var left=currentCard.offsetLeft+(m.x-dx);
				var top=currentCard.offsetTop+(m.y-dy);
				//信用卡缩小至一定范围时，旋转90度
				if(left>=leftest && left<=rightest && top>=topest && top<=bottomest){
					currentCard.style.transform="rotateZ(90deg)";
				}else{currentCard.style.transform="rotateZ(0deg)";}
				//信用卡继续缩小范围时，直接被ATM机吸附进去
				if(hasCard==false){     //如果还没有插入卡，则插入，否则不能插入
					if(left>=leftest+60 && left<=rightest-60 && top>=topest+60 && top<=bottomest-60){
						hasCard=true;
						currentCard.style.display="none";
						$("#card-line").style.display="block";
						enterPage(1);
						currentUser=users[currentCard.id.substr(-1)];
					}
				}
				currentCard.style.top=top+"px";
				currentCard.style.left=left+"px";
				dx=m.x;
				dy=m.y;
			}
			document.onmouseup=function(){document.onmousemove=null;}
		}
	}
}
//生成消费记录，每次消费之后都会生成消费信息，并存储在信用卡的payHistory数组中
function createPayInfo(type,inpVal){
	var money=parseInt(inpVal);
	var dateTime=new Date(),
		y=dateTime.getFullYear(),
	 	mon=dateTime.getMonth()+1,
	 	d=dateTime.getDate(),
	 	h=dateTime.getHours(),
		min=dateTime.getMinutes();
		s=dateTime.getSeconds();
	function checkTime(i){
		if (i<10) {i="0"+i;}
	  	return i;
	}
	mon=checkTime(mon);
	d=checkTime(d);
	h=checkTime(h);
	min=checkTime(min);
	s=checkTime(s);
	if(type=="转入"){
		moveToUser.payHistory.unshift({y,mon,d,h,min,s,type,money});
	}else{
		if(type=="取出" || type=="转出"){money=money*(-1);}
		currentUser.payHistory.unshift({y,mon,d,h,min,s,type,money});
	}
}
//在消费记录页面中列出消费清单
function showPayHistory(){
	var sIndex,eIndex;  //每一页装的信息的开始和结束的下标
	var length=currentUser.payHistory.length;   //消费记录总条数
	var pagesCount=Math.ceil(length/9),currentPageNum=1;
	if(length<10){
		sIndex=0;
		eIndex=length-1;
	}else{
		sIndex=0;
		eIndex=8;
	}
	loadPage();
	$("#foward-btn").onclick=function(){   //上一页按钮
		if(currentPageNum==1){hintWinow("alert","已经是第一页了！")}
		else{
			sIndex-=9;
			eIndex=sIndex+9;
			currentPageNum--;
			loadPage();
		}
	}
	$("#behind-btn").onclick=function(){   //下一页按钮
		if(currentPageNum==pagesCount){hintWinow("alert","已经是最后一页了！")}
		else{
			sIndex+=9;
			if((length-currentPageNum*9)>9){eIndex+=9;}
			else{eIndex=length-1;}
			currentPageNum++;
			loadPage();
		}
	}
	function loadPage(){
		if(length>0){
			var fragment=document.createDocumentFragment();
			for(var i=sIndex;i<eIndex+1;i++){
				var ul,li_0,li_1,li_2,li_3;
				var payItem=currentUser.payHistory[i]
				ul=document.createElement("ul");
				li_0=document.createElement("li");
				li_1=document.createElement("li");
				li_2=document.createElement("li");
				li_3=document.createElement("li");
				fragment.appendChild(ul);
				ul.appendChild(li_0);
				ul.appendChild(li_1);
				ul.appendChild(li_2);
				ul.appendChild(li_3);
				ul.classList.add("payList","clear");
				li_0.className="payOrder";
				li_1.classList.add("payTime","clear");
				li_2.className="payType";
				li_3.className="paySum";
				li_0.innerHTML=i+1;
				li_1.innerHTML="<span>"+payItem.y+"."+payItem.mon+"."+payItem.d+"</span><span>"+payItem.h+":"+payItem.min+":"+payItem.s+"<span>";
				li_2.innerText=payItem.type;
				li_3.innerText=payItem.money+"￥";
			}
			$("#payLists").innerText="";
			$("#payLists").appendChild(fragment);
			$("#headline strong").innerText=length;
			$("#payHisFoot strong").innerText=pagesCount;
			$$("#payHisFoot strong")[1].innerText=currentPageNum;
		}else{hintWinow("alert","暂时还没有消费记录哦！");}
	}
}
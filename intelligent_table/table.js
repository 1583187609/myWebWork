//数据信息
//备用数据一
//var caption="XXX公司XXX表";
//var colGroups=[["第一季度","1月","2月","3月"]];
//var rowGroups=[["行政办公费","办公费","会务费","计算机维护费","交际应酬费","汽车费用","水电费","邮电费"]];
//var datas=[];    //存储数据区域的数据。以obj={rowIndex: ,colIndex: ,value: }形式存储

//备用数据二
var caption="XXX公司XXX表";
var colGroups=[["第一季度","1月","2月","3月"],["第二季度","4月","5月","6月"],["第三季度","7月","8月","9月"],["第四季度","10月","11月","12月"]];
var rowGroups=[["行政办公费","办公费","会务费","计算机维护费","交际应酬费","汽车费用","水电费","邮电费"],["部门支出","销售部","业务部","工程部","生产部","管理部"],["营业额","P系列","荣耀系列","畅享系列","Mate系列"]];
var datas=[];     //存储数据区域的数据。以obj={rowIndex: ,colIndex: ,value: }形式存储

//定义一个选择器工具
function $(a){
	return document.querySelector(a);
}
//全局变量
var rowLength=0,colLength=0;   //得到要生成表格的行数和列数
for(var i=0;i<rowGroups.length;i++){
	for(var j=0;j<rowGroups[i].length;j++){
		rowLength++;
	}
}
for(var i=0;i<colGroups.length;i++){
	for(var j=0;j<colGroups[i].length;j++){
		colLength++;
	}
}
//生成表格，并给行列标题填上内容，设定只读数据区域
var rowGroupsIndex=0;
var cm=0,cn=0,rm=0,rn=0,rd=0;     //标题行列m,n,行数据
var fragment,table,caption;
fragment=document.createDocumentFragment();
table=document.createElement("table");
caption=document.createElement("caption");
fragment.appendChild(table);
table.appendChild(caption);
caption.innerText="XXX公司XXXX表";
for(var i=0;i<rowLength+1;i++){
	var tr=document.createElement("tr");
	for(var j=0;j<colLength+1;j++){
		var cell;
		//th单元格
		if(i==0 || j==0){
			cell=document.createElement("th");
			if(i==0 && j==0){
				cell.innerText="";
			//第一行上的列标题
			}else if(i==0 && j>0){
				cell.innerText=colGroups[cm][cn];
				if(cn==0){
					var span=document.createElement("span");
					var txt=cell.childNodes[0];
					cell.className="group-head";
					cell.insertBefore(span,txt);
					span.id="col-btn-"+cm;
					span.innerText="-";
				}
				cn++;
				if(cn>colGroups[cm].length-1){
					cn=0;
					cm++;
				}
			}
			//第一列上的行标题
			else if(i>0 && j==0){
				cell.innerText=rowGroups[rm][rn];
				if(rn==0){
					var span=document.createElement("span");
					var txt=cell.childNodes[0];
					cell.className="group-head";
					cell.insertBefore(span,txt);
					span.id="row-btn-"+rm;
					span.innerText="-";
				}
				rn++;
				if(rn>rowGroups[rm].length-1){
					rn=0;
					rm++;
				}
			}
		//数据单元格
		}else{
			var inp=document.createElement("input");
			cell=document.createElement("td");
			cell.appendChild(inp);
			//给表格设定只读数据区域
			if(i>0 && rd==0){
				inp.className="readonly-data";
				inp.setAttribute("readonly",true);
			}
			if(j==colLength){
				rd++;
				if(rd>rowGroups[rowGroupsIndex].length-1){
					rowGroupsIndex++;
					rd=0;
				}
			}
		}
		tr.appendChild(cell);
	}
	table.appendChild(tr);
}
document.body.appendChild(fragment);
//实现表格展开折叠的效果
for(var i=0;i<colGroups.length;i++){
	$("#col-btn-"+i).onclick=function(){   //折叠或展开各个月份
		var nextCell=$("table").rows[0].cells[this.parentNode.cellIndex+1];
		var rowStart,rowEnd,colStart,colEnd;
		var colGroupsIndex=this.id.slice(-1);
		rowStart=0;
		colStart=this.parentNode.cellIndex+1;
		rowEnd=rowLength;
		colEnd=colStart+colGroups[colGroupsIndex].length-2;
		if(nextCell.style.display!="none"){
			this.parentNode.children[0].innerHTML="+";
			selectArea(rowStart,rowEnd,colStart,colEnd,"none");
		}else{
			this.parentNode.children[0].innerHTML="-";
			selectArea(rowStart,rowEnd,colStart,colEnd,"table-cell");
		}
	}
	//定义一个函数，规定从几行几列到几行几列隐藏或显示
	function selectArea(rowStart,rowEnd,colStart,colEnd,displayType){
		for(var i=0;i<rowLength+1;i++){
			for(var j=0;j<colLength+1;j++){
				if(i>=rowStart && j>=colStart && i<=rowEnd && j<=colEnd){
					$("table").rows[i].cells[j].style.display=displayType;
				}
			}
		}
	}
}
for(var i=0;i<rowGroups.length;i++){
	$("#row-btn-"+i).onclick=function(){   //折叠或展开各个行组
		var nextRow=$("table").rows[this.parentNode.parentNode.rowIndex+1];
		var rowStart=nextRow.rowIndex;
		var rowGroupsIndex=this.id.slice(-1);
		var rowEnd=rowStart+rowGroups[rowGroupsIndex].length-2;
		if(nextRow.style.display!="none"){
			this.parentNode.children[0].innerHTML="+";
			for(var j=rowStart;j<=rowEnd;j++){
				$("table").rows[j].style.display="none";
			}
		}else{
			this.parentNode.children[0].innerHTML="-";
			for(var j=rowStart;j<=rowEnd;j++){
				$("table").rows[j].style.display="table-row";
			}
		}
	}
}
//当单元格内的input获得焦点时
var hintBox;
var inputs=document.querySelectorAll("input");
hintBox=document.createElement("div");
document.body.appendChild(hintBox);
hintBox.id="hint-box";
for(var i=0;i<inputs.length;i++){
	inputs[i].onfocus=function(){
		var left,top,colIndex,rowIndex,rowTxt,colTxt;     //提示框的位置，行列号
		left=this.offsetParent.offsetLeft+this.offsetParent.offsetWidth-10;
		top=this.offsetParent.offsetTop-4;
		colIndex=this.parentNode.cellIndex;
		rowIndex=this.parentNode.parentNode.rowIndex;
		rowTxt=$("table").rows[rowIndex].cells[0].innerText;
		colTxt=$("table").rows[0].cells[colIndex].innerText;
		$("#hint-box").style.cssText="display:block;left:"+left+"px;top:"+top+"px;"
		if(this.hasAttribute("readonly")){
			$("#hint-box").innerText="此处只可读，不可编辑！";
			$("#hint-box").style.boxShadow="0 0 10px 3px #0f0";
		}else{
			$("#hint-box").innerHTML="<b>行：</b><span>"+rowTxt+"</span><br /><b>列：</b><span>"+colTxt+"</span>";
		}
		if($(".activeInput")){
			$(".activeInput").classList.remove("activeInput");
		}
		this.classList.add("activeInput");
		this.style.textAlign="left";
	}
	inputs[i].onblur=function(){
		var colIndex=this.parentNode.cellIndex;
		var rowIndex=this.parentNode.parentNode.rowIndex;
		if(this.value.length>0 && this.hasAttribute("readonly")==false){
			var obj={};
			obj.rowIndex=rowIndex;
			obj.colIndex=colIndex;
			obj.value=this.value;
			datas.push(obj);
			this.style.cssText="background-color:yellow;text-align:right;";
		}
	}
	inputs[i].oninput=function(){      //即时输入及时提醒
		var reg=/\D/g;  
		var rowTxt,colTxt;
		var colIndex=this.parentNode.cellIndex;
		var rowIndex=this.parentNode.parentNode.rowIndex;
		rowTxt=$("table").rows[rowIndex].cells[0].innerText;
		colTxt=$("table").rows[0].cells[colIndex].innerText;
		if(reg.test(this.value) && this.value.length>0){       //如果包含非数字
			this.value="";
			$("#hint-box").innerText="输入内容必须为纯数字！"
			$("#hint-box").style.boxShadow="0 0 10px 3px #f00";
		}else{                                               //如果是纯数字
			$("#hint-box").style.boxShadow="none";
			$("#hint-box").innerHTML="<b>行：</b><span>"+rowTxt+"</span><br /><b>列：</b><span>"+colTxt+"</span>";
		}
	}
}
//调整行宽和列高，类似于excel表格的操作
document.onmousemove=function(e){
	if(e.target.tagName=="TH" || e.target.tagName=="TD"){
		var cell=e.target;
		var cellX=e.offsetX;
		var cellY=e.offsetY;
		var cellW=cell.offsetWidth;
		var cellH=cell.offsetHeight;
		for(var i=0;i<colLength+1;i++){
			for(var j=0;j<rowLength+1;j++){
				if(i==0 || j==0){
					if(cellX>cellW-20 && cell.parentNode.rowIndex==0){
						cell.style.cursor="col-resize";
					}else if(cellY>cellH-10 && cell.cellIndex==0){
						cell.style.cursor="row-resize";
					}else{
						cell.style.cursor="auto";
					}
				}
			}
		}
		cell.onmousedown=function(down){
			var downX=down.x;
			var downY=down.y;
			cell.onmousemove=function(move){
				if(cell.style.cursor=="col-resize"){
					move.target.style.width=move.target.offsetWidth+(move.x-downX)+"px";
					downX=move.x;
				}else if(cell.style.cursor=="row-resize"){
					move.target.parentNode.style.height=move.target.parentNode.offsetHeight+(move.y-downY)+"px";
					downY=move.y;
				}
			}
			document.onmouseup=function(){
				cell.onmousemove=null;
			}
		}
	}
}
//点击表格外部区域时，取消表格内蓝色框的标记效果
document.onclick=function(){
	if(document.activeElement.tagName=="BODY"){
		if($(".activeInput")){
			$(".activeInput").classList.remove("activeInput");
		}
		$("#hint-box").style.display="none";
		console.log(datas)
	}
}



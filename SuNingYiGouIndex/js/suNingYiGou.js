function $(a){
	return document.querySelector(a);
}






/************************************************************/
//文档顶部导航条的关闭
function advClose(){    
	$("#advStrip").style.display="none";
}
/************************************************************/
//当窗口滚动到一定位置时，文档顶部nav和和窗口底端出现
window.onscroll=function(){
	//IE6-10:对于没有doctype声明的页面里使用  document.body.scrollTop；对于有doctype声明的页面使用 document.documentElement.scrollTop；
	//safari 比较特别，有自己获取scrollTop的函数 ： window.pageYOffset ；
	//火狐等等相对标准些的浏览器就省心多了，直接用 document.documentElement.scrollTop；
	var top=window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
	if(top>=800){
		$("nav").setAttribute("style","position: fixed;top:0;left:50%;margin-left:-596px;");
		$("#backTopUl").style.display="block";
	}else{
		$("nav").setAttribute("style","position: static;margin: 0 auto;");
		$("#backTopUl").style.display="none";
	}
}
/************************************************************/
//定位根据选择的城市的改变而改变
$("#province").options[0].selected=true;   //初始化“请选择”选项
function chooseProvince(v){
	var city = [];  //声明数组
   	city[0]=['东城','西城','宣武','崇文','海淀','朝阳','丰台','门头沟','昌平','延庆','怀柔','密云','顺义','平谷','通县','大兴','房山'];
   	city[1]=['黄浦','徐汇','长宁','静安','普陀','虹口','杨浦','闵行','宝山','嘉定','浦东','金山','松江','青浦','奉贤','崇明'];
   	city[2]=['和平区','河东区','河北区','河西区','南开区','红桥区','东丽区','西青区','津南区','北辰区','武清区','宝坻区','滨海新区','宁河区','静海区','蓟州区'];
   	city[3]=['渝中区','大渡口区','江北区','沙坪坝区','九龙坡区','南岸区','北碚区','渝北区','巴南区','万州区','涪陵区','永川区','璧山区','大足区','綦江区','江津区','合川区','黔江区','长寿区','南川区','铜梁区','潼南区','荣昌区','开州区','梁平区','城口县','丰都县','垫江县','忠县','云阳县','奉节县',
   	'巫山县','巫溪县','石柱土家族自治县','秀山土家族苗族自治县','酉阳土家族自治县','彭水苗族土家族自治县'];
   	city[4]=['石家庄','唐山','秦皇岛','邯郸','邢台','保定','张家口','承德','沧州','廊坊','衡水'];
   	city[5]=['太原','大同','阳泉','长治','晋城','朔州','晋中','运城','忻州','临汾','吕梁'];
   	city[6]=['沈阳','大连','鞍山','抚顺','本溪','丹东','锦州','营口','阜新','辽阳','盘锦','铁岭','朝阳','葫芦岛'];
   	city[7]=['长春','吉林','四平','辽源','通化','白山','松原','白城','延边'];
   	city[8]=['哈尔滨','齐齐哈尔','鸡西','鹤岗','双鸭山','大庆','伊春','佳木斯','七台河','牡丹江','黑河','绥化','大兴安岭'];
   	city[9]=['南京','无锡','徐州','常州','苏州','南通','连云港','淮安','盐城','扬州','镇江','泰州','宿迁'];
   	city[10]=['杭州','宁波','温州','嘉兴','湖州','绍兴','金华','衢州','舟山','台州','丽水'];
   	city[11]=['合肥','芜湖','蚌埠','淮南','马鞍山','淮北','铜陵','安庆','黄山','滁州','阜阳','宿州','巢湖','六安','亳州','池州','宣城'];
   	city[12]=['福州','厦门','莆田','三明','泉州','漳州','南平','龙岩','宁德'];
   	city[13]=['南昌','景德镇','萍乡','九江','新余','鹰潭','赣州','吉安','宜州','抚州','上饶'];
   	city[14]=['济南','青岛','淄博','枣庄','东营','烟台','潍坊','威海','济宁','泰安','日照','莱芜','临沂','德州','聊城','滨州','菏泽'];
   	city[15]=['郑州','开封','洛阳','平顶山','焦作','鹤壁','新乡','安阳','濮阳','许昌','漯河','三门峡','南阳','商丘','信阳','周口','驻马店'];
   	city[16]=['武汉','黄石','襄樊','十堰','荆州','宜昌','荆门','鄂州','孝感','黄冈','咸宁','随州','恩施'];
   	city[17]=['长沙','株洲','湘潭','衡阳','邵阳','岳阳','常德','张家界','益阳','郴州','永州','怀化','娄底','湘西'];
   	city[18]=['台北','高雄','基隆','台中','台南','新竹','嘉义']
   	city[19]=['广州','深圳','珠海','汕头','韶关','佛山','江门','湛江','茂名','肇庆','惠州','梅州','汕尾','河源','阳江','清远','东莞','中山','潮州','揭阳','云浮'];
   	city[20]=['海口','三亚'];
   	city[21]=['成都','自贡','攀枝花','泸州','德阳','绵阳','广元','遂宁','内江','乐山','南充','宜宾','广安','达州','眉山','雅安','巴中','资阳','阿坝','甘孜','凉山'];
   	city[22]=['贵阳','六盘水','遵义','安顺','铜仁','毕节','黔西南','黔东南','黔南'];
   	city[23]=['昆明','曲靖','玉溪','保山','昭通','丽江','普洱','临沧','文山','红河','西双版纳','楚雄','大理','德宏','怒江','迪庆'];
   	city[24]=['西安','铜川','宝鸡','咸阳','渭南','延安','汉中','榆林','安康','商洛'];
   	city[25]=['兰州','嘉峪关','金昌','白银','天水','武威','张掖','平凉','酒泉','庆阳','定西','陇南','临夏','甘南'];
   	city[26]=['西宁','海东','海北','黄南','海南','果洛','玉树','海西'];
   	city[27]=['拉萨','昌都','山南','日喀则','那曲','阿里','林芝'];
   	city[28]=['南宁','柳州','桂林','梧州','北海','防城港','钦州','贵港','玉林','百色','贺州','河池','来宾','崇左'];
   	city[29]=['呼和浩特','包头','乌海','赤峰','通辽','鄂尔多斯','呼伦贝尔','巴彦淖尔','乌兰察布','兴安','锡林郭勒','阿拉善'];
   	city[30]=['银川','石嘴山','吴忠','固原','中卫'];
   	city[31]=['乌鲁木齐','克拉玛依','石河子','阿拉布','图木舒克','五家渠','北屯','吐鲁番','哈密','和田','阿克苏','喀什','伊犁','塔城','阿勒泰','奎屯','博乐','昌吉','阜康','库尔勒','阿图什','乌苏'];
   	city[32]=['中西区','东区','南区','湾仔区','九龙区','观塘区','深水埗区','黄大仙区','油尖旺区','离岛区','葵青区','北区','西贡区','沙田区','大埔区','荃湾区','屯门区','元朗区'];
   	city[33]=['澳门半岛','花地玛堂区','圣安多尼堂区','大堂区','望德堂区','风顺堂区','澳门离岛','嘉模堂区','圣方济各堂区'];
   	//当province改变时，town中遍历添加option选项
   	$("#town").length=1;
   	for(var i=0;i<city[v].length;i++){
   		var op=new Option(city[v][i],i);    //new Option("文本","值",true,true),后面两个true分别表示默认被选中和有效
   		$("#town").add(op);
   	}
}
//当town改变时，定位也随之改变
function chooseTown(){
	var provinceName=$("#province").options[$("#province").selectedIndex].innerHTML;
	var townName=$("#town").options[$("#town").selectedIndex].innerHTML;
	$("#position").innerHTML=provinceName+" "+townName;
}
/************************************************************/  	
//banner轮播区域
function turnsPlayPicture(){
	var cirs=document.getElementsByClassName("lunboCircle")[0].getElementsByTagName("i");
	var leftDis=$(".lunboUl").offsetLeft;
	//banner图片轮播
	$(".lunboUl").style.left=leftDis-830+"px";
	if(leftDis==-2490){
		$(".lunboUl").style.left=0+"px";
	}
	//banner橙色小圆轮播
	function turnsPlayCircle(n){
		for(var i=0;i<cirs.length;i++){
			cirs[i].style.backgroundColor="#aaa";
		}
		cirs[n].style.backgroundColor="#FF3500";
	}
	switch(leftDis){
		case 0: turnsPlayCircle(1); break;
		case -830: turnsPlayCircle(2); break;
		case -1660: turnsPlayCircle(3); break;
		case -2490: turnsPlayCircle(0); break;
	}
}
var turnsPlayPicTimer=setInterval("turnsPlayPicture()",3000);
//鼠标进入轮播区域时，图片停止轮播，离开轮播区域时，图片继续轮播
function stopTurnsPic(){
	clearInterval(turnsPlayPicTimer);
}
function continueTurnsPic(){
	turnsPlayPicTimer=setInterval("turnsPlayPicture()",3000);
}
//鼠标点击轮播区域的灰白色矩形块，切换轮播图片
function directionLeft(){
	var left=$(".lunboUl").offsetLeft;
	if(left==0){
		$(".lunboUl").style.left="-2490px";
	}
	else{
		$(".lunboUl").style.left=left+830+"px";
	}
}
function directionRight(){
	var left=$(".lunboUl").offsetLeft;
	if(left==-2490){
		$(".lunboUl").style.left="0px";
	}
	else{
		$(".lunboUl").style.left=left-830+"px";
	}
}
/************************************************************/
//轮播图下方adv广告动画效果
var adv2_lis=$("#advUl_2").getElementsByTagName("li");
for(var i=0;i<adv2_lis.length;i++){
	adv2_lis[i].addEventListener("mouseenter",function(){
		for(var j=0;j<adv2_lis.length;j++){
			adv2_lis[j].firstChild.style.width="50px";
			adv2_lis[j].lastChild.style.width="0";
		}
		this.firstChild.style.width="0";
		this.lastChild.style.width="662px";
	})
}
/************************************************************/
//登录注册页面
function openLoginRegisterPage(n){      //打开登录注册页面
	if(n==1){
		$("#login").style.display="block";
		$("#register").style.display="none";
	}else{
		$("#login").style.display="none";
		$("#register").style.display="block";
	}
	$("#loginRegisterBg").style.display="block";
}
$(".closeIcon").onclick=function(){    //关闭登录注册页面
	$("#loginRegisterBg").style.display="none";
}
//苏宁易购用户信息数据库
var user={
	name:"一一一",
	code:111,
	word:111
}
//登录验证

/************************************************************/
//热点新闻轮播
function hotNewsTurnsPlay(){
	$("#hotNews ul").style.top=$("#hotNews ul").offsetTop-100+"px";
	if($("#hotNews ul").offsetTop<-200){
		$("#hotNews ul").style.top=0+"px";
	}
}
setInterval("hotNewsTurnsPlay()",2500);
/************************************************************/
//家居、手机、食品、服装hover型面板菜单
var tabMenus=$("#jiaShouShiFu h2").getElementsByTagName("span");
var tabCons=$("#jiaShouShiFu ul").getElementsByTagName("li");
for(var i=0;i<tabMenus.length;i++){
	tabMenus[i].addEventListener("mouseover",function(){
		for(var j=0;j<tabMenus.length;j++){
			tabMenus[j].style.backgroundColor="#ffa500";
			tabCons[j].style.display="none";
		}
		var n=this.id.substr(-1,1);    //取得被选中的tabMenus[i]的id的最后一个字符，即字符1,2,3,4
		this.style.backgroundColor="#ffc";
		$("#li_"+n).style.display="block";
	})
}
/************************************************************/
//猜你喜欢部分点击展开、点击收起折叠面板
var isFold=true;   //是否折叠
function foldTab(){
	if(isFold==true){
		$("#caiNiXiHuan").style.height="auto";
		$(".cnxhBtn").innerHTML="点击收起<span>></span>";
		$(".cnxhBtn").childNodes[1].style.transform="rotate(-90deg)";
		isFold=false;
	}else{
		$("#caiNiXiHuan").style.height="381px";
		$(".cnxhBtn").innerHTML="点击展开<span>></span>";
		$(".cnxhBtn").childNodes[1].style.transform="rotate(90deg)";
		isFold=true;
	}
}




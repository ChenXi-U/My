function run(){
	startTime();
	document.getElementById('time-start').innerHTML="开始计时";
	oTimeover = document.querySelector('.timeover');
	oTimeover.classList.add('off');
	//getmessage();
	getCity();
	Temp();
}
function startTime(){
	var today=new Date();
	var h=today.getHours();
	var m=today.getMinutes();
	var s=today.getSeconds();// 在小于10的数字前加一个‘0’
	m=checkTime(m);
	s=checkTime(s);
	h=checkTime(h);
	document.getElementById('time').innerHTML="当前时间："+h+":"+m+":"+s;
	t=setTimeout(function(){startTime()},500);
}
function checkTime(i){
	if (i<10){
		i="0" + i;
	}
	return i;
}
function doTimer() {
	times++;
	if (times%2==1) {
		timecount=0;
		timename = setInterval(function () {
			timecount++;
			second = timecount%60;
			hour = timecount/3600%24;
			minute = timecount/60%60; 
			minute = Math.floor(minute);
			hour = Math.floor(hour);
			hour = checkTime(hour);
			minute = checkTime(minute);
			second = checkTime(second); 
			document.getElementById('time-start').innerHTML="已学习："+hour+":"+minute+":"+second;
		},1000);
	}
	else
	{
		clearInterval(timename);
		times=0;
		oTimeover.classList.remove('off');
		oTimeover.classList.add('on');
		document.getElementById('text1').innerHTML="本次学习结束";
		document.getElementById('text2').innerHTML="休息一下吧!";
		document.getElementById('text3').innerHTML="本次学习："+hour+"小时"+minute+"分钟"+second+"秒";
		document.getElementById('text4').innerHTML="再接再励!";
		document.getElementById('w-timeover').style.opacity=1;
		document.getElementById('time-start').innerHTML="开始计时";
	}
}
function closetimeover(){
		document.getElementById('w-timeover').style.opacity=0;
		oTimeover.classList.remove('on');
		oTimeover.classList.add('off');
}
function getmessage() {
	getLocation();
}
function getLocation()
{
	if (navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(showPosition,showError);	}
	else
	{
		alert("该浏览器不支持获取地理位置。");
	}
}
function showPosition(position)
{
	console.log("纬度："+position.coords.latitude);
	console.log("经度："+position.coords.longitude);
}
function showError(error)
{
	switch(error.code) 
	{
		case error.PERMISSION_DENIED:
			alert( "用户拒绝对获取地理位置的请求。");
			break;
		case error.POSITION_UNAVAILABLE:
			alert( "位置信息是不可用的。");
			break;
		case error.TIMEOUT:
			alert("请求用户地理位置超时。")
			break;
		case error.UNKNOWN_ERROR:
			alert("未知错误。")
			break;
	}
}
function getCity() {
	var oCity = returnCitySN.cname;
	var a = oCity.indexOf("省",0);
		if(a >= 0){
		oCity = oCity.substring(a+1);
		}
	oCity = oCity[0]+oCity[1];
	console.log(oCity);
	document.getElementById("city").innerHTML=oCity;
	$.ajax({
		url: 'http://pv.sohu.com/cityjson?ie=utf-8',
		dataType: "script",
    	async: false,
		success: function(){
		var url = encodeURI("http://wthrcdn.etouch.cn/weather_mini?city="+oCity);
			$.ajax({
    			url: url,
    			data:"",
    			dataType:"jsonp",
    			async: false,
    			success:function(data){
    				var tempdata = data.data.forecast[0];
    				console.log(tempdata);
    				var a = tempdata.high.indexOf(" ",0),
    					b = tempdata.low.indexOf(" ",0);
						if(a >= 0){
						tempdata.high = tempdata.high.substring(a+1);
						}
						if(b >= 0){
						tempdata.low = tempdata.low.substring(a+1);
						}
    				document.getElementById("temp").innerHTML=tempdata.type+" "+tempdata.high+"~"+tempdata.low;
  				}
    		})
		}
	});
}
function Temp() {
}

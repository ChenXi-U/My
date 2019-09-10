function run(){
	startTime();
	document.getElementById('time-start').innerHTML="开始计时";
	oTimeover = document.querySelector('.timeover');
	oTimeover.classList.add('off');
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
/*
此插件基于Jquery
插件名：jquery.countdown(倒计时插件)
开发者 usual2970
版本 1.0
Blog：http://t.qq.com/usual2970
*/
(function($){
	$.countdown=function(options){
		var opts=$.extend({},$.countdown.defaults,options);
		$.countdown.init(opts);
	}
	$.countdown.init=function(opts){
		
		var target=Date.parse(opts.target_time);
		left_time(target,opts);
	}

	function left_time(target,opts){
		var obj_date=new Date();
		var now =obj_date.getTime();
		var slot=target-now;
		if(target<=0) return false;
		var days=Math.floor(slot/1000/60/60/24);
		var temp=slot%(1000*60*60*24);
		var hours=Math.floor(temp/1000/60/60);
		hours=hours<10?"0"+hours:hours;
		temp=temp%(1000*60*60);
		var minutes=Math.floor(temp/1000/60);
		minutes=minutes<10?"0"+minutes:minutes;
		temp=temp%(1000*60);
		var seconds=Math.floor(temp/1000);
		temp=temp%1000;
		var seconds_float=Math.floor(temp/(opts.interval));
		seconds=seconds<10?"0"+seconds:seconds;
		seconds=opts.interval!=1000?seconds+"."+seconds_float:seconds;

		$("#"+opts.id).html(days+"天"+hours+"小时"+minutes+"分"+seconds+"秒");
		if(now<=target){
			$("#"+opts.id).data("timer",setTimeout(function(){left_time(target,opts);},opts.interval));
		}
		else{
			$("#"+opts.id).html(opts.end_content);
			clearTimeout($("#"+opts.id).data("timer"));
		}

	}


	$.countdown.stop=function(id){
		clearTimeout($(id).data("timer"));
	}

	$.countdown.start=function(id){
		
	}

	$.countdown.defaults={
		id:"countdown",
		target_time:"2013-11-9 00:00:00",
		end_content:"已结束",
		interval:1000
	}
})(jQuery);
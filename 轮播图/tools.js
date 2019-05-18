var tools = {
	/* 获取元素的某一条样式
	 * @param obj <DOMObject>  要获取样式的元素
	 * @param attr <string>    样式名
	 * @return <string>  样式值
	 */
	getStyle: function (obj, attr) {
		if(obj.currentStyle) {
			// IE兼容
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj, false)[attr];
		}
	},
	/* 添加事件监听
	 * @param obj <DOMObject> 监听事件得DOM对象
	 * @param type <string> 事件类型（不带on)
	 * @param fn <Function> 事件预处理函数
	 * @param [isCapture] <Boolean> 是否捕获，默认为false
	 */
	on: function (obj, type, fn, isCapture) {
		// isCapture如果没有传的话默认值为false
		isCapture = isCapture === undefined ? false : isCapture;
		if(obj.attachEvent){
			// IE
			obj.attachEvent('on'+type, fn);
		}else{
			obj.addEventListener(type, fn, isCapture);
		}
	},
	move: function (obj, attr, end, time, fn) {
		clearInterval(obj.timer); //在运动之前清除上一次的timer
		let start = parseInt(this.getStyle(obj, attr)); //获取起点值
		let distance = end - start; //计算总距离
		let steps = Math.floor(time / 20); //根据时间计算总步数, 为了避免超出终点值，向下取整
		let speed = distance / steps; //速度  px/步
		//开始运动
		let n = 0; //记录当前步数
		obj.timer = setInterval(function () {
			n++;
			obj.style[attr] = start + n*speed + "px";
			// 如果到达终点（步数走完）
			if(n === steps) {
				clearInterval(obj.timer);
				obj.style[attr] = end + "px"; //避免运动结束还没到终点，将最后运动位置直接附上end
				fn && fn();
			}
		}, 20);
	},
}
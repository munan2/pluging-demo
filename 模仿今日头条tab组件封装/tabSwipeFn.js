(function () {
	/**
	 * [模仿今日头条tabL类效果实现点击某一个标签，选中标签呈现在可见区域，且刷新被选中标签位置不变]
	 * @param {[Object]} settings [description]
	 * settings = {
	 *     parentElement: 父元素
	 * }
	 */
	function TabSwipe (settings) {
		return this.init(settings);
	}
	TabSwipe.prototype = {
		init: function (settings) {
			this.parentElement = settings.parentElement;
			this.childrenTag = this.parentElement.children('a');
			this.nowIndex = getUrlParam('tab');
			this.currentUrl = window.location.href;
			this.moveLeft = 0;
			this.disLength = 0;
			this.navListWidth = 0;
			this.clientWidth = document.documentElement.clientWidth;
			this.flag = true;//第一次得到距离中间最近的元素Index后就不用再次获得
			this.getMiddle();
			this.sureLocation();
			this.clickEvent();
		},
		getMiddle: function () {
			for (let i=0; i<this.childrenTag.length; i++) {
				if (this.childrenTag.eq(i).hasClass('active')) {
					this.childrenTag.eq(i).removeClass('active');
				}
				this.navListWidth += this.childrenTag[i].offsetWidth;
				if (this.navListWidth >= this.clientWidth/2 && this.flag) {
					this.middleIndex = i;
					this.flag = false;
				}
			}
		},
		sureLocation: function () {
			var disIndex = this.childrenTag.length - this.middleIndex -1
			//点击某个tab后，刷新页面该tab被选中，并确定在可见区域的位置
			if (this.nowIndex < this.middleIndex) {
				this.moveLeft = 0;
			} else if (this.nowIndex < this.childrenTag.length - this.middleIndex -1){
				for (let j=0, disIndex=this.nowIndex-this.middleIndex; j<disIndex; j++) {
					this.moveLeft += this.childrenTag[j].offsetWidth;
				}
			} else {
				for (let j=0, disIndex=this.childrenTag.length-this.nowIndex; j<disIndex; j++) {
					this.disLength += this.childrenTag[j].offsetWidth;
				}
				this.moveLeft = this.navListWidth - this.disLength;
			}
			this.parentElement.scrollLeft(this.moveLeft);
			this.childrenTag.eq(this.nowIndex).addClass('active');
		},
		clickEvent: function () {
			var _this = this;
			this.parentElement.on('click', 'a', function () {
				_this.nowIndex = $(this).index();
				if (_this.currentUrl.indexOf('tab') > 0) {
					_this.currentUrl = _this.currentUrl.replace(/(?![?&])(tab)=\w+/gi,'tab=' + _this.nowIndex);
				} else {
					_this.currentUrl.indexOf('?') > 0 ? _this.currentUrl += '&tab=' + _this.nowIndex : _this.currentUrl += '?tab=' + _this.nowIndex ;
				}
				window.location.href = _this.currentUrl;
			});
		}
	}
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if (r != null) return unescape(r[2]); return 0; //返回参数值
	}
	window.TabSwipe = TabSwipe;
})();

(function () {
	function Tab (settings) {
		return this.init(settings);
	}
	Tab.prototype = {
		init: function (settings) {
			this.settings = settings;
			this.tabBox = document.getElementsByClassName(settings.dom)[0];
			this.tabBox.innerHTML = settings.content;
			this.oUl = this.tabBox.firstChild;
			this.oUlChild = this.oUl.children;
			this.tabConetent = this.oUl.nextElementSibling;
			if (settings.click) {
				this.clickEvent();
			}
			if (settings.hover) {
				this.hoverEvent();
			}
			this.ajaxFn(0);
		},
		clickEvent: function () {
			var _this = this;
			this.oUl.onclick = function (e) {
				_this.eventFn(e, _this);
			};
		},
		hoverEvent: function () {
			var _this = this;
			this.oUl.onmouseover = function (e) {
				_this.eventFn(e, _this);
			};
		},
		eventFn: function (e, _this) {
			var e = e || window.event;
			var target = e.target || e.srcElement;
			var data = target.getAttribute('data-uid');
			for (var i = 0; i < _this.oUlChild.length; i++) {
				_this.oUlChild[i].className = '';
			}
			target.className = 'selected';
			_this.ajaxFn(data);
		},
		ajaxFn: function (data) {
			var _this = this;
			$.ajax({
				type: 'get',
				dataType: 'text',
				data: data,
				url: this.settings.ajaxUrl,
				success: function (data) {
					_this.tabConetent.innerHTML = data;
				}
			});
		}
	};
	window.Tab = Tab;
})();

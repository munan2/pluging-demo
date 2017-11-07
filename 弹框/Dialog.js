(function () {
	function Dialog (settings) {
		return this.init(settings);
	}
	Dialog.prototype = {
		init: function (settings) {
			this.className = settings.className;
			this.content = settings.content;
			this.container = document.createElement('div');
			this.container.className = this.className;
			this.container.innerHTML = this.content;
			$('body').append(this.container);
			this.closeName = document.querySelector('.' + settings.closeName);
			this.closeName.onclick = this.close.bind(this);
		},
		close: function () {
			this.container.remove();
			$('html,body').css('overflow', 'auto');
		}
	}
	window.Dialog = Dialog;
})();
## 弹框封装
1. 封装一个Dialog类，这个类有一个参数settings，settings是一个对象

	```
	{
		content: '<form action="javascript:;" class="regist-container form-container">'
					+ '<h3 class="login-title">欢迎注册</h3>'
					+ '<p><input type="text" placeholder="请输入手机号" class="username input-text"></p>'
					+ '<p><input type="text" placeholder="请输入短信验证码" class="input-text" id="phonecode"><button for="phonecode" class="phonecode-btn">获取短信验证码</button></p>'
					+ '<span class="fail-regist tag">验证码错误</span>'
					+ '<p><input type="password" placeholder="请设置6-18位登录密码" class="pwd input-text"></p>'
					+ '<p><button class="regist">立即注册</button></p>'
					+ '<span class="dialog-close">x</span>'
			   + '</form>',
		className: 'dialog-container',
		close: true,
		closeName: 'dialog-close'
	}
	```
settings里可以写弹框内部的内容，弹框容器的类名，是否有关闭按钮，关闭的按钮的类名
2. 弹框类的封装

```
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
```
这里需要特别注意的是：

- 关闭点击事件触发这个类的close函数时，注意this的指向发生了变化，所以需要使用bind()来绑定this指向。
- 注册和登录，是一个form表单，form表单在提交时，会自动刷新页面，所以这里不想让它自动刷新，就需要把action设置成javascript:;阻止其默认行为



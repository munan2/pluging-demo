## Tab类封装的心里路程
### 题目：
用原生JS写出TAB切换类，包括tab的创建、删除、排序；以及点击/滑过事件的配置，确保在同一个页面可以同时调用不同的类，且不会互相干扰；晋级考察：tab切换时利用ajax方法从后端获取要展示的内容
### DOM常用方法和属性复习
因为好久没有使用JS原生写代码了，而且也有一段时间没有专心码码了，写代码时内心是奔溃的，在写的时候不停地查资料找方法，下面我要再一次再一次再一次记录一下这些方法：
### 获取页面中元素的方法
1. getElementById()
2. getElementsByTagName()
3. getElementsByClassName()有兼容问题
4. querySelector()
5. querySelectorAll() 兼容性，ie6-8不兼容

### 描述节点之间关系
1. 获取孩子节点：
	+ .children 获取孩子节点
		**注意没有()，，，总是不经意加上了()**
	+ .childNodes 包括换行等节点
	
		```
		<ul id="parent">
			<li>111
				<a href="">link</a>
			</li>
			<li>222</li>
			<li>333</li>
		</ul>
		var oP = document.getElementById('parent');
		console.log(oP.children);//[li, li, li]
		console.log(oP.childNodes);// [text, li, text, li, text, li, text]
		```
	+ .firstChild/firstElementChild 
		- firstChild这个方法有问题，假设父节点和子节点有空格，那么第一个子节点是空白节点
		- firstElementChild这个方法没有上述问题，但是有兼容性ie678不支持
		
		**所以这个方法可以慎用，可以直接用chilren[0]**
		
		```
		<div id="aa">
			<a href="" >lalalala</a>
			<a href="" >hahhaha</a>
		</div>
		var oA = document.getElementById('aa');
		console.log(oA.firstChild);//#text
		console.log(oA.firstElementChild);//<a href="" >lalalala</a>
		```
		
	+ .lastChild/lastElementChild
2. 获取父节点
	- parentNode 获取父节点
	
3. 获取相邻节点
	- nextSibling/nextElementSibling 
		- 一样的问题，有换行空格就会返回#text
		- nextElementSibling 有兼容性的问题
	
	```
	var oA = document.getElementById('aa');
	var oB = document.getElementById('bb');
	console.log(oA.nextSibling);//#text
	console.log(oA.nextElementSibling);//<a href="" id="bb">2222</a>
	```
	这里可以封装一下，判断一个nextSibling的nodeType是不是元素节点，不是就往下取

	```
	function nextElementSib (node) {
		while(node.nextSibling && node.nextSibling.nodeType !== 1) {
			node = node.nextSibling;
		}
		return node.nextSibling;
	}
	```
	
	- previousSibling/previousElementSibling
	
### DOM的操作，增删改
1. 增加(这几个还比较常用，记得比较清楚)
	- createElement()
	- document.createDocumentFragment()
	- appendChild()
	- insertBefore()
2. 删除 
	- removeChild()
3. 替换
	- replaceChild()
4. 复制
	- cloneNode(boolean)  参数为true，是深复制，复制本身和子节点， false是浅复制，只复制本身
	
### DOM自定义属性
1. attributes/getAttribute()
	
	**注意attributes的用法**

	```
	<a href="#" data-id="1" id="aa">12</a>
	<script>
		var oA = document.getElementById('aa');
		console.log(oA.getAttribute('data-id'));
		console.log(oA.attributes['data-id'].value);
	</script>
	```

2. setAttribute(name, value)
3. removeAttribute(name)

### 封装思路
1. 创建一个类，在这个类首先返回其初始化的函数，这个初始化的函数里写的是关于Tab类的属性，
2. 将类的方法都定义在原型方法里  
	在封装的时候首先给一个配置setting，其是一个对象，这个对象里写了对于Tab的配置参数。  
这里一开始我把dom结构也放在了参数里

```
var settingsTwo = {
	content: '<ul class="tab-container">'
				+ '<li data-uid="0" class="selected">yes</li>'
				+ '<li data-uid="1">no</li>'
				+ '<li data-uid="2">not sure</li>'
			+ '</ul>'
			+ '<div class="subtab-container">'
			+  '</div>',
	dom: 'tab-box-two',
	click: false,
	hover: true,
	ajaxUrl: './teacher.json'
};
```
后来听取他人的建议，可以把DOM结构直接在页面中写，这里一开始写在配置setting里可能受了之前封装弹出框的影响。。。没有进一步思考，这两个差别在哪里。


	
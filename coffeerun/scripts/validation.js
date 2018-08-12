// 添加一个IIFE模块
(function (window) {
	'use strict';
	var App = window.App || {};

	var Validation = {
		isCompanyEmail:function (email) {
			// 将字符串放置在正斜杠(//)之间可以构成正则表达式，
			// 在斜杠之间我们指定了一个字符串必须由一个或多个字符(.+)和@sina.com组成。
			// 结尾处的$表示字符串必须以@sina.com.cn结尾
			return /.+@sina\.com$/.test(email);
		}
	};

	App.Validation = Validation;
	window.App = App;
})(window);
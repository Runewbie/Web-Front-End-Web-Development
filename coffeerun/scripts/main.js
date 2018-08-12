//使用IIFE模式
(function (window) {
	'use strict';
	var FORM_SELECTOR = '[data-coffee-order="form"]';
	var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
	var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';

	var App = window.App;
	var Truck = App.Truck;
	var DataStore = App.DataStore;
	var RemoteDataStore = App.RemoteDataStore;
	var FormHandler = App.FormHandler;
	// 将input事件和有效性校验绑定
	var Validation = App.Validation;
	var CheckList = App.CheckList;
	// 创建RemoteDataStore实例
	var remoteDS = new RemoteDataStore(SERVER_URL);

	var webshim = window.webshim;
	//创建Truck实例
	// var myTK = new Truck('1',new DataStore());
	//使用RemoteDataStore 的实例 remoteDS
	var myTK = new Truck('1',remoteDS);
	window.myTK = myTK;

	var checkList = new CheckList(CHECKLIST_SELECTOR);
	checkList.addClickHandler(myTK.deliverOrder.bind(myTK));
	var formhandler = new FormHandler(FORM_SELECTOR);

	// formhandler.addSubmitHandler(myTK.createOrder.bind(myTK));
	formhandler.addSubmitHandler(function (data) {
		// myTK.createOrder.call(myTK,data);
		// Deferred对象执行使用then注册的回调函数
		return 	myTK.createOrder.call(myTK,data) //返回Deferred对象
				.then(function () {
					checkList.addRow.call(checkList,data);
				},
				function () { //使用then处理失败的情况
					alert('Server unreachable.Try ahain later.');
				}
				);
	});

	// 将input事件和有效性校验绑定
	formhandler.addInputHandler(Validation.isCompanyEmail);

	myTK.printOrders(checkList.addRow.bind(checkList));

	webshim.polyfill('forms forms-ext');
	webshim.setOptions('forms',{addValidators:true, lazyCustomMessages:true});
	// console.log(formhandler);
})(window);

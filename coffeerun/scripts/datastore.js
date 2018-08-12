// 用IIFE模式编写模块
(function(window) {
  'use strict';
  // 放置要运行的代码
  /*声明一个本地变量APP，如果window上存在App属性，那么就将它赋值给本地App，
  否则引用一个空对象*/
  var App = window.App || {};
  var Promise = window.Promise; //创建Promise对象

  function DataStore() {
    // console.log('running the DataStore function');
    this.data = {};
  }

  function promiseResolvedWith(value) {
  	var promise = new Promise(function (resolve,reject) {
  		resolve(value);
  	});
  	return promise;
  }

  //添加add方法
  DataStore.prototype.add = function(key,val) {
  	// this.data[key] = val;

  	// var promise = new Promise(function (resolve, reject) {
  	// 	this.data[key] = val;
  	// 	resolve(null);
  	// }.bind(this));

  	// return promise;

  	return promiseResolvedWith(null);
  };

  //查询特定键名
  DataStore.prototype.get = function(key) {
  	// return this.data[key];
  	return promiseResolvedWith(this.data[key]);
  };

  //查询所有键名
  DataStore.prototype.getAll = function() {
  	// return this.data;
  	return promiseResolvedWith(this.data);
  };

  //删除信息
  DataStore.prototype.remove = function(key) {
  	// delete this.data[key];
  	return promiseResolvedWith(this.data[key]);
  };

  App.DataStore = DataStore;
  window.App = App;
})(window);

/*
	提供用于管理美食车的功能，比如创建、交付订单，打印等待中的订单列表。
*/
// 使用IIFE和构造函数创建一个Truck类型
(function(window) {
    'use strict';
    var App = window.App || {};

    function Truck(truckId, db) {
        this.truckId = truckId;
        this.db = db;
    }
    App.Truck = Truck;
    window.App = App;
    // 添加订单
    Truck.prototype.createOrder = function(order) {
        console.log('Adding order for ' + order.emailAddress);
        return this.db.add(order.emailAddress, order); //返回Deferred对象
    };
    // 删除订单
    Truck.prototype.deliverOrder = function(customerId) {
        console.log('delivering order for ' + customerId);
        return this.db.remove(customerId); //返回Deferred对象
    };
    // 打印订单
    Truck.prototype.printOrders = function(prtinFn) {
        // var customerIdArray = Object.keys(this.db.getAll());
        // console.log('Truck # ' + this.truckId + ' has pending orders');
        // customerIdArray.forEach(function (id) {
        // 	console.log(this.db.get(id));
        // }.bind(this));
        // //下面的代码等同于上面
        // // customerIdArray.forEach(function (id) {
        // // 	console.log(this.db.get(id));
        // // },this);

        /*使用.then*/
        return this.db.getAll().then(function (order) {
        	var customerIdArray = Object.keys(order);
        	console.log('Truck # ' + this.truckId + ' has pending orders');
	        customerIdArray.forEach(function (id) {
	        	console.log('order= '+order[id]);
	        	console.log('customerIdArray= '+customerIdArray[id]);
	        	if (prtinFn) {
	        		prtinFn(order[id]);
	        	}
	        }.bind(this));
        }.bind(this));
    };
})(window);
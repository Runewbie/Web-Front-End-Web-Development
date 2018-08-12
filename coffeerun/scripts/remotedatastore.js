// 创建一个IIFE模块
(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function RemoteDataStore(url) {
        if (!url) {
            throw new Error('No remote URL supplied.');
        }
        this.serverUrl = url;
    }
    // 向服务器发送数据
    RemoteDataStore.prototype.add = function(key, val) {
        // 使用jQuery的post方法
        return $.post(this.serverUrl, val, function(serverResponse) { //返回Deferred对象
            // 添加回调函数
            console.log(serverResponse);
        });
    };
    // 从服务器检索数据
    RemoteDataStore.prototype.getAll = function(cb) {
        // 使用jQuery的post方法
        return $.get(this.serverUrl, function(serverResponse) {//返回Deferred对象
            if (cb) {
            	console.log(serverResponse);
	            // 添加回调函数
	            cb(serverResponse);
            }
        });
    };
    // 获取单个订单
    RemoteDataStore.prototype.get = function(key, cb) {
        return $.get(this.serverUrl + '/' + key, function(serverResponse) {//返回Deferred对象
            if (cb) {
            	console.log(serverResponse);
            	cb(serverResponse);
            }
        });
    };
    // 从服务器删除数据
    RemoteDataStore.prototype.remove = function(key) {
        return $.ajax(this.serverUrl + '/' + key, {//返回Deferred对象
            type: 'DELETE'
        });
    };

    App.RemoteDataStore = RemoteDataStore;
    window.App = App;
})(window);
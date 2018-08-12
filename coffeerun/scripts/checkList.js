// 添加IIFE模块代码
(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function CheckList(selector) {
        if (!selector) {
            throw new Error('NO selector provided');
        }
        this.$element = $(selector);
        if (this.$element.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }


    CheckList.prototype.addRow = function(coffeeOrder) {
    	// 移除匹配的相应邮箱地址的已有行
    	this.removeRow(coffeeOrder.emailAddress);

    	// 使用咖啡订单信息创建一个新的Row实例
    	var rowElement = new Row(coffeeOrder);

    	// 把新的Row实例的$element属性添加到清单中
    	this.$element.append(rowElement.$element);
    };

    CheckList.prototype.removeRow = function(email) {
    	this.$element
	    	.find('[value="'+email+'"]')
	    	.closest('[data-coffee-order="checkbox"]')
	    	.remove();
    };

    CheckList.prototype.addClickHandler = function(fn) {
    	this.$element.on('click', 'input', function(event) {
    		var email = event.target.value;
    		// fn(email);
    		fn(email).then(function () {
    			this.removeRow(email);
    		}.bind(this));
    	}.bind(this));;
    };
    
    function Row(coffeeOrder) {
        var $div = $('<div></div>', {
            'data-coffee-order': 'checkbox',
            'class': 'checkbox'
        })
        var $lable = $('<lable></lable>');
        var $checkBox = $('<input></input>', {
            type: 'checkbox',
            value: coffeeOrder.emailAddress
        });
        var descripion = coffeeOrder.size + ' ';
        if (coffeeOrder.flavor) {
            descripion += coffeeOrder.flavor + ' ';
        }
        descripion += coffeeOrder.coffee + ', ';
        descripion += ' (' + coffeeOrder.emailAddress + ')';
        descripion += ' [' + coffeeOrder.strength + 'x]';
        $lable.append($checkBox);
        $lable.append(descripion);
        $div.append($lable);
        this.$element = $div;
    }

    App.CheckList = CheckList;
    window.App = App;
})(window);
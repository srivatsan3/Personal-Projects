(function(){

	'use strict';

	angular.module('ShoppingListApp',[])
	.controller('ShoppingListController',ShoppingListController)
	.controller('AlreadyBoughtController',AlreadyBoughtController)
	.provider('ShoppingList',ShoppingListProvider)
	
	ShoppingListController.$inject = ['ShoppingList'];
	function ShoppingListController(ShoppingList){

		var Shpctrl = this;
		Shpctrl.items = ShoppingList.getItems();
		Shpctrl.itemName = "";
		Shpctrl.itemQuantity = "";

		Shpctrl.addItem = function(){
			try{
				ShoppingList.addItem(Shpctrl.itemName, Shpctrl.itemQuantity);
			}
			catch(error){
				Shpctrl.errorMessage = error.message;
			}
		};

		Shpctrl.removeItem = function(itemIndex) {
			ShoppingList.removeItem(itemIndex);
		};

		Shpctrl.boughtItems = function(itemIndex){
			ShoppingList.buyItem(itemIndex);
		}
	}



	AlreadyBoughtController.$inject = ['ShoppingList']
	function AlreadyBoughtController(ShoppingList){
		var boughtctrl =  this;
		boughtctrl.items = ShoppingList.getBoughtItems();

	}

	function ShoppingListService(){
		var service = this;
		var items = [];

		service.addItem = function(itemName, quantity){
			var item = {
				name: itemName,
				quantity: quantity
			};
			items.push(item);
		};
		var toBuyItems = items;
		var boughtItems = [];
		service.removeItem = function(itemIndex){
			items.splice(itemIndex,1);
		};
		service.buyItem = function(index){
			boughtItems.push(toBuyItems[index]);
			toBuyItems.splice(index,1)
		}
		service.getItems = function(){
			return toBuyItems;
		};

		service.getBoughtItems = function(){
			return boughtItems;
		};
	}


	function ShoppingListProvider(){
		var provider = this;
		provider.$get = function(){
			var shoppingList = new ShoppingListService();
			return shoppingList;
		};
	}
})();
$angular.module('appModule')
.factory('businessService', function($http){
	var service = {};
	
	service.index = function(){
		var business = checkLogin();
	}
})
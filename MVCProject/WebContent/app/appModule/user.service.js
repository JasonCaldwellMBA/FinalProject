$angular.module('appModule')
.factory('userService', function($http){
	var service = {};
	
	service.index = function(){
		var user = checkLogin();
	}
})
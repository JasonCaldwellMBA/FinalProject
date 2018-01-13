angular.module('appModule')
.factory('userService', function($http){
	var service = {};
	var BASE_URL = "http://localhost:8080/MVCProject/api/"
		
	service.show = function(id){
		return $http({
			method : "GET",
			url : BASE_URL + "user/" + id
		})
	}
	service.indexRequests = function(id){
		return $http({
			method : "GET",
			url : "api/user/" + id + "/request/"
		})
	}
	return service;
})
$angular.module('appModule')
.factory('userService', function($http){
	var service = {};
	
	service.index = function(){
		return $http({
			method : "GET",
			url : "api/user"
		})
	}
	service.show = function(id){
		return $http({
			method : "GET",
			url : "api/user/" + id
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

service.addVehicle = function(id){
	return $http({
		method : "PUT"
	})
}
angular.module('appModule')
.factory('businessService', function($http){
	var service = {};
	
	
	service.show = function(id){
		return $http({
			method : "GET",
			url : "/api/business/" + id
		})
	}
	return service;
})
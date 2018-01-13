angular.module('appModule')
.factory('businessService', function($http){
	var service = {};
	
	service.index = function(){
		return $http({
			method : "GET",
			url : "api/business"
		})
	}
	
	service.show = function(id){
		return $http({
			method : "GET",
			url : "api/business/" + id
		})
	}
//	service.indexQuotes = function(id){
//		return $http({
//			method : "GET"
//			url : "api/business/" + id + "quote/"
//		})
//	}
	
	return service;
})
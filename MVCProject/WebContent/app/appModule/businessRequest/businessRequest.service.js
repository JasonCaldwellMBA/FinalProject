angular.module('appModule')
.factory('businessRequestService', function($http){
	var service = {};
	
	service.indexRequests = function(){
		return $http({
			method : 'GET',
			url : 'api/request'
		})
	}
	
	service.show = function(request){
		return $http({
			method : 'GET',
			url : 'api/request/' + request.id
		})
	}
	
	return service;
})
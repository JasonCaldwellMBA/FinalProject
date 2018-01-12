angular.module('appModule')
.factory('busService', function($http){
	var service = {};
	
	
	service.show = function(id){
		return $http({
			method : "GET",
			url : "api/business/" + id
		})
	}
})
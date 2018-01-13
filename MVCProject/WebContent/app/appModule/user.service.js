$angular.module('appModule')
.factory('userService', function($http){
	var service = {};
	
	service.show = function(id){
		return $http({
			method : 'GET',
			url : 'api/user' + id
		})
	}
})
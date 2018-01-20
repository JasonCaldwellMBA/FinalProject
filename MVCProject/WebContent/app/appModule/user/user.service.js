angular.module('appModule')
.factory('userService', function($http, authService){
	var service = {};
		
	service.show = function(id){
		return $http({
			method : "GET",
			url : 'api/' +  "user/" + id
		})
	}

	service.indexRequests = function(id){
		return $http({
			method : 'GET',
			url : "user/" + id + "/request/"
		})
	}

	service.update = function (user) {
		var id = authService.getToken(); 
		return $http({
			method: 'PUT',
			url: 'api/' +  'user/' + id, 
			headers: {
				'content-type': 'application/json'
			},
			data: user
		});
	}
	service.destroy = function () {
		var id = authService.getToken(); 
		return $http({
			method: 'DELETE',
			url: 'api/' +  'user/' + id
		}); 
	}
	return service;
})
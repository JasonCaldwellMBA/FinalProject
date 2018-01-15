angular.module('appModule')
.factory('userService', function($http, authService){
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
			method : 'GET',
			url : "user/" + id + "/request/"
		})
	}

	service.update = function (user) {
		var id = authService.getToken(); 
		return $http({
			method: 'PUT',
			url: BASE_URL + 'user/' + id, 
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
			url: BASE_URL + 'user/' + id
		}); 
	}
	return service;
})
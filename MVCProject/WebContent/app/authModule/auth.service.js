angular.module('authModule')
	.factory('authService', function($http, $cookies, $location){
		var service = {}; 
		var BASE_URL = "http://localhost:8080/MVCProject/"
		service.userRegister = function(user){
			return $http({
				method: 'POST',
				url: BASE_URL + 'api/register',
				headers: {
					'content-type': 'application/json'
				},
				data: user
			});
		}
		service.businessRegister = function(business){
		}
		service.login = function(entity){
			
		}
		service.logout = function(entity){
			
		}
		service.getToken = function(){
			
		}
		service.setToken = function(id){
			
		}
		service.removeToken = function(){
			
		}
		service.isEntity = function(){
			
		}
		return service; 
	}); 
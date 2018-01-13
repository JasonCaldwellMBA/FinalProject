angular.module('authModule')
	.factory('authService', function($http, $cookies, $location){
		var service = {}; 
		var BASE_URL = "http://localhost:8080/MVCProject/"
		service.register = function(user){
			return $http({
				method: 'POST',
				url: BASE_URL + 'api/auth/user/register',
				headers: {
					'content-type': 'application/json'
				},
				data: user
			});
		}
		service.login = function(user){
			return $http({
				method: 'POST',
				url: BASE_URL + 'api/auth/user/login',
				headers: {
					'content-type': 'application/json'
				},
				data: user
			}); 
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
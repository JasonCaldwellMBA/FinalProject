angular.module('authModule')
	.factory('authService', function($http, $cookies, $location){
		var service = {}; 
		var BASE_URL = "http://localhost:8080/MVCProject/"
		service.userRegister = function(user){
			return $http({
				method: 'POST',
				url: BASE_URL + 'api/user/register',
				headers: {
					'content-type': 'application/json'
				},
				data: user
			});
		}
		service.businessRegister = function (business) {
			return $http({
				method: 'POST',
				url: BASE_URL + 'api/business/register',
				headers: {
					'content-type': 'application/json'
				},
				data: business
			}); 
		}
		service.login = function(entity){
			return $http({
				method: 'GET',
				url: BASE_URL + 'api/login',
				headers: {
					'content-type': 'application/json'
				},
				data: entity
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
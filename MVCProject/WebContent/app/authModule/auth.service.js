angular.module('authModule')
	.factory('authService', function($http, $cookies, $location){
		var service = {}; 
		service.register = function(user){
			return $http({
				method: 'POST',
				url:  'api/auth/user/register',
				headers: {
					'content-type': 'application/json'
				},
				data: user
			});
		}
		service.login = function(user){
			return $http({
				method: 'PUT',
				url:  'api/auth/user/login',
				headers: {
					'content-type': 'application/json'
				},
				data: user
			}); 
		}
		service.registerBusiness = function(business){
			return $http({
				method: 'POST',
				url:  'api/auth/business/register',
				headers: {
					'content-type': 'application/json'
				},
				data: business
			});
		}
		service.businessLogin = function(business){
			return $http({
				method: 'PUT',
				url:  'api/auth/business/login',
				headers: {
					'content-type': 'application/json'
				},
				data: business
			}); 
		}
		service.logout = function(){
			if(removeToken() | removeBusToken()){
				return true; 
			}else{
				return false; 
			}
		}
		var removeToken = function(){
			$cookies.remove('userId'); 
            if ($cookies.get('userId') == null) {
                return true; 
            }
            return false; 
		}
		service.getToken = function(){
			let id = $cookies.get('userId'); 
            return id; 
		}
		service.setToken = function(id){
			
			$cookies.put('userId', parseInt(id)); 
            if (id == $cookies.get('userId')) {
                return true; 
            }
            return false; 
		}
		service.isUser = function(){
			if ($cookies.get('userId')) {
                return true;
            }
            return false; 
		}
		var removeBusToken = function(){
			$cookies.remove('busId'); 
			if ($cookies.get('busId') == null) {
				return true; 
			}
			return false; 
		}
		service.getBusToken = function(){
			let id = $cookies.get('busId'); 
			return id; 
		}
		service.setBusToken = function(id){
			
			$cookies.put('busId', parseInt(id)); 
			if (id == $cookies.get('busId')) {
				return true; 
			}
			return false; 
		}
		service.isBus = function(){
			if ($cookies.get('busId')) {
				return true;
			}
			return false; 
		}
		return service; 
	}); 
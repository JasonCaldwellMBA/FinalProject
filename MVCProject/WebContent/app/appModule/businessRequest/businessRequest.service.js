angular.module('appModule')
.factory('businessRequestService', function($http, $cookies){
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
	
	service.createQuote = function(quote, rid){
		return $http({
			method : 'POST',
			url : 'api/business/'
				+ $cookies.get('busId') 
				+ '/request/' 
				+ rid 
				+ '/quote',
            headers: {
                'content-type': 'application/json'
            },
            data: quote
		})
	}
	
	return service;
})
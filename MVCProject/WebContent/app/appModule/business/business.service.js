angular.module('appModule')
.factory('businessService', function($http, authService){
	var service = {};
	var BASE_URL= 'http:localhost:8080/MVCProject/api/'
	service.index = function(){
		return $http({
			method: "GET",
			url: BASE_URL + "/business"
		});
	}
	service.show = function(id){
		return $http({
			method : "GET",
			url : BASE_URL + "/business/" + id
		})
	}
	service.indexQuotes = function(id){
		return $http({
			method : "GET",
			url : BASE_URL + "business/" + id + "/quote/"
		})
	}
	service.getQuote = function(bid, qid){
		return $http({
			method : "GET",
			url : BASE_URL + "/business/" + bid + "/quote/" + qid
		})
	}
	service.update = function(business){
		return $http({
			method : "PUT",
			url : "api/business/" + business.id,
			headers: {
				'content-type' : 'application/json'
			},
			data : business
		})
	}
	service.destroy = function () {
		var id = authService.getBusToken();
		return $http({
			method: 'DELETE',
			url: 'api/business/' + id
		});
	}


	return service;
})

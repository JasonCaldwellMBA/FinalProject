angular.module('appModule')
.factory('businessService', function($http, authService){
	var service = {};
	service.index = function(){
		return $http({
			method: "GET",
			url: 'api/' +  "business"
		});
	}
	service.show = function(id){
		return $http({
			method : "GET",
			url : 'api/' +  "business/" + id
		})
	}
	service.indexQuotes = function(id){
		return $http({
			method : "GET",
			url : 'api/' +  "business/" + id + "/quote/"
		})
	}
	service.getQuote = function(bid, qid){
		return $http({
			method : "GET",
			url : 'api/' +  "business/" + bid + "/quote/" + qid
		})
	}
	service.update = function(business){
		return $http({
			method : "PUT",
			url : 'api/' +  "business/" + business.id,
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
			url: 'api/' +  'business/' + id
		});
	}


	return service;
})

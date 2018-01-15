angular.module('appModule')
.factory('businessService', function($http){
	var service = {};
	
	service.index = function(){
		return $http({
			method : "GET",
			url : "api/business"
		})
	}
	service.show = function(id){
		return $http({
			method : "GET",
			url : "api/business/" + id
		})
	}
	service.indexQuotes = function(id){
		return $http({
			method : "GET",
			url : "api/business/" + id + "/quote/"
		})
	}
	service.getQuote = function(bid, qid){
		return $http({
			method : "GET",
			url : "api/business/" + bid + "/quote/" + qid
		})
	}
	service.updateBusiness = function(business, contact){
		return $http({
			method : "PUT",
			url : "/api/business/" + business.id
			headers: {
				'content-type' : 'application/json'
			},
			data : business
		}).then(function(res){
			$http({
				method : "PUT",
				url : "/api/contact/" + contact.id
			})
		})
	}
	
	
	return service;
})
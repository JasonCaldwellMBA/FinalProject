angular.module('appModule')
.factory('businessService', function($http, authService){
	var service = {};
<<<<<<< HEAD
	var BASE_URL= 'http://localhost:8080/MVCProject/api/'
=======
	var BASE_URL= 'http://localhost:8080/MVCProject/api/';
>>>>>>> 65439cd5a2c15dbcc1ece2a53efd990d0d9fa492
	service.index = function(){
		return $http({
			method: "GET",
			url: BASE_URL + "business"
<<<<<<< HEAD
		}); 
=======
		});
>>>>>>> 65439cd5a2c15dbcc1ece2a53efd990d0d9fa492
	}
	service.show = function(id){
		return $http({
			method : "GET",
			url : BASE_URL + "business/" + id
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
			url : BASE_URL + "business/" + bid + "/quote/" + qid
		})
	}
	service.update = function(business){
		return $http({
			method : "PUT",
			url : BASE_URL + "business/" + business.id,
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
			url: BASE_URL + 'business/' + id
		});
	}


	return service;
})

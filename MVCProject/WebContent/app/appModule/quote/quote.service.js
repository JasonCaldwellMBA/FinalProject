angular.module('appModule')
    .factory('quoteService', function ($http, $cookies, authService) {
        var service = {};

        service.index = function () {
            var bizId = authService.getBusToken(); 
            return $http({
                method : "GET",
                url : 'api/' +  "business/" + bizId + "/quote/"
            })
        }
        service.requestQuotes = function (rid) {
            var userId = authService.getToken();
            return $http({
                method: 'GET',
                url: 'api/' +  'user/' + userId + '/request/' + rid + '/quote'
            });
        };
	    	service.show = function(bid, qid){
	    		return $http({
	    			method : "GET",
	    			url : 'api/' +  "business/" + bid + "/quote/" + qid
	    		})
	    	}

        service.createQuote = function (quote, rid) {
            return $http({
                method: 'POST',
                url: 'api/business/'
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
        service.updateQuote = function (quote) {
            // var businessId = authService.getBusToken(); 
            return $http({
                method: 'PUT',
                url: 'api/' +  'business/' + quote.business.id + '/quote/' + quote.id,
                headers: {
                    'content-type': 'application/json'
                },
                data: quote
            })
        }
        service.deleteQuote = function(id){
	        	var bizId = authService.getBusToken();
	        	return $http({
	        		method : 'DELETE',
	        		url : 'api/' +  'business/' + bizId + '/quote/' + id,
	        	})
        }

        return service;
    })
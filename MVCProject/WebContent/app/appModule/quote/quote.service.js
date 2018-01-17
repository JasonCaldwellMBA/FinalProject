angular.module('appModule')
    .factory('quoteService', function ($http, $cookies, authService) {
        var service = {};
        var BASE_URL = 'http://localhost:8080/MVCProject/api/'

        service.index = function () {
            var bizId = authService.getBusToken(); 
            return $http({
                method : "GET",
                url : BASE_URL + "business/" + bizId + "/quote/"
            })
        }
        service.requestQuotes = function (rid) {
            var userId = authService.getToken();
            return $http({
                method: 'GET',
                url: BASE_URL + 'user/' + userId + '/request/' + rid + '/quote'
            });
        };

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
                url: BASE_URL + 'business/' + quote.business.id + '/quote/' + quote.id,
                headers: {
                    'content-type': 'application/json'
                },
                data: quote
            })
        }


        return service;
    })
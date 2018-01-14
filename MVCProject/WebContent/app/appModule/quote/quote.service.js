angular.module('appModule')
    .factory('quoteService', function ($http, $cookies, authService) {
        var service = {}; 
        var BASE_URL = 'http://localhost:8080/MVCProject/api/' 
        
        service.requestQuotes = function (rid) {
            var userId = authService.getToken(); 
            return $http({
                method: 'GET',
                url: BASE_URL + 'user/' + userId + '/request/' +  rid + '/quote'
            }); 
        }; 
        return service; 
    })
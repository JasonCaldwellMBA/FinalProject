angular.module('appModule')
    .factory('quoteService', function ($http, $cookies, authService) {
        var service = {}; 
        var BASE_URL ='http://localhost/MVCProject/api/' 
        service.requestQuotesIndex = function (rid) {
            var id = authService.getToken(); 
            return $http({
                method: 'GET',
                url: BASE_URL + 'user/' + id + '/request/' + rid
            }); 
        }; 
    })
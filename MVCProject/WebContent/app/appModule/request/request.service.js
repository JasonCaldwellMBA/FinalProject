angular.module('appModule')
    .factory('requestService', function($http, authService){
        var service = {}; 
        var BASE_URL = 'http://localhost:8080/MVCProject/api/'; 

        service.index = function () {
        	var userId = authService.getToken();
            return $http({
                method: 'GET', 
                url: BASE_URL + 'user/' + userId + '/request',
                headers: {
                    'content-type': 'application/json'
                }
            }); 
        }
        service.show = function (id) {
          var userId = authService.getToken(); 
            return $http({
                method: 'GET',
                url: BASE_URL +'user/'+ userId + '/request/' + id,
                headers: {
                    'content-type': 'application/json'
                }
            });
        }
        service.create = function (request) {
            var userId = authService.getToken(); 
            return $http({
                method: 'POST',
                url: BASE_URL + userId + '/request',
                headers: {
                    'content-type': 'application/json'
                },
                data: request
            })
        }
        service.update = function (request) {
            var userId = authService.getToken(); 
            return $http({
                method: 'PUT',
                url: BASE_URL + userId + 'request/' + request.id,
                headers: {
                    'content-type':'application/json'
                },
                data : request
            })
        }
        service.destroy = function (id) {
            var userId = authService.getToken(); 
            return $http({
                method: 'DELETE',
                url: BASE_URL + userId + 'request/' + id,
                headers: {
                    'content-type': 'application/json'
                }
            })
        }
        return service; 
    })
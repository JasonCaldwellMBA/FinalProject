angular.module('appModule')
    .factory('vehicleService', function($http, authService){
        var service = {}; 
        var BASE_URL = 'http://localhost:8080/MVCProject/api/'; 

        service.index = function () {
             var userId = authService.getToken(); 
            return $http({
                method: 'GET', 
                url: BASE_URL + 'user/' + userId + '/vehicle',
            }); 
        }
        service.show = function (id) {
            var userId = authService.getToken(); 
            return $http({
                method: 'GET',
                url: BASE_URL +'user/'+ userId + '/vehicle/' + id,
                headers: {
                    'content-type': 'application/json'
                }
            });
        }
        service.create = function (vehicle) {
            var userId = authService.getToken(); 
            return $http({
                method: 'POST',
                url: BASE_URL + userId + '/vehicle',
                headers: {
                    'content-type': 'application/json'
                },
                data: vehicle
            })
        }
        service.update = function (vehicle) {
            var userId = authService.getToken(); 
            return $http({
                method: 'PUT',
                url: BASE_URL + userId + '/vehicle/' + vehicle.id,
                headers: {
                    'content-type':'application/json'
                },
                data:vehicle
            })
        }
        service.destroy = function (id) {
            var userId = authService.getToken(); 
            return $http({
                method: 'DELETE',
                url: BASE_URL + userId + 'vehicle/' + id,
                headers: {
                    'content-type': 'application/json'
                }
            })
        }
        return service; 
    })
angular.module('appModule')
    .factory('vehicleService', function($http, authService){
        var service = {}; 
        
        service.index = function () {
             var userId = authService.getToken(); 
            return $http({
                method: 'GET', 
                url: 'api/' +'user/' + userId + '/vehicle',
            }); 
        }
        service.show = function (id) {
            var userId = authService.getToken(); 
            return $http({
                method: 'GET',
                url: 'api/' + 'user/'+ userId + '/vehicle/' + id,
            });
        }
        service.create = function (vehicle) {
            var userId = authService.getToken(); 
            return $http({
                method: 'POST',
                url: 'api/' +  'user/' +  userId + '/vehicle',
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
                url: 'api/' +  'user/' + userId + '/vehicle/' + vehicle.id,
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
                url: 'api/' +  'user/' + userId + '/vehicle/' + id
            }); 
        }
        return service; 
    })
angular.module('notificationModule')
    .factory('notificationService', function ($http, authService) {
        var service = {}
        var BASE_URL = 'http://localhost:8080/MVCProject/api/'
        service.index = function (uid) {
            return $http({
                method: 'GET',
                url: BASE_URL + 'user/' + uid + '/notification'
            }); 
        }
        service.bizIndex = function (bizId) {
            return $http({
                method: 'GET',
                url: BASE_URL + 'business/' + bizId + '/notification'
            }); 
        }
        service.create = function (notification) {
            return $http({
                method: 'POST',
                url: BASE_URL + 'create/notification',
                headers: {
                    'content-type': 'application/json'
                },
                data: notification
            }); 
        }
        service.destroy = function (n) {
            console.log(n.id); 
            return $http({
                method: 'DELETE',
                url: BASE_URL + 'notification/' + n.id,
                headers: {
                    'content-type': 'application/json'
                }
            }); 
        }
        return service; 
    })
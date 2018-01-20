angular.module('notificationModule')
    .factory('notificationService', function ($http, authService) {
        var service = {}
        service.index = function (uid) {
            return $http({
                method: 'GET',
                url:  'api/user/' + uid + '/notification'
            }); 
        }
        service.bizIndex = function (bizId) {
            return $http({
                method: 'GET',
                url:  'api/business/' + bizId + '/notification'
            }); 
        }
        service.create = function (notification) {
            return $http({
                method: 'POST',
                url:  'api/create/notification',
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
                url:  'api/notification/' + n.id,
                headers: {
                    'content-type': 'application/json'
                }
            }); 
        }
        return service; 
    })
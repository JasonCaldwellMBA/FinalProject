angular.module('appModule')
    .factory('requestService', function ($http, authService) {
        var service = {};

        service.index = function () {
            var userId = authService.getToken();
            return $http({
                method: 'GET',
                url: 'api/' +  'user/' + userId + '/request',
            });
        }
        service.indexAllRequests = function () {
            return $http({
                method: 'GET',
                url: 'api/' +  'request'
            })
        }
        service.show = function (id) {
            var userId = authService.getToken();
            return $http({
                method: 'GET',
                url: 'api/' +  'user/' + userId + '/request/' + id,
            });
        }
        service.showForBiz = function (request) {
            return $http({
                method: 'GET',
                url: 'api/' +  'request/' + request.id
            })
        }
        service.create = function (request) {
            var userId = authService.getToken();
            return $http({
                method: 'POST',
                url: 'api/' +  'user/' + userId + '/vehicle/' + request.vehicle.id + '/request',
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
                url: 'api/' +  'user/' + userId + '/vehicle/' + request.vehicle.id + '/request/' + request.id,
                headers: {
                    'content-type': 'application/json'
                },
                data: request
            })
        }
        service.destroy = function (request) {
            var userId = authService.getToken();
            return $http({
                method: 'DELETE',
                url: 'api/' +  'user/' + userId + '/vehicle/' + request.vehicle.id + '/request/' + request.id,
                headers: {
                    'content-type': 'application/json'
                }
            })
        }
        return service;
    })
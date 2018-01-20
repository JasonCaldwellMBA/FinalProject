angular.module('appModule')
    .factory('certificationService', function($http, $cookies, authService){
        var service = {}; 

        service.index = function () {
            var bizId = authService.getBusToken(); 
            return $http({
                method: 'GET', 
                url: 'api/' +  'business/' + bizId + '/certification',
            }); 
        }
        
        service.show = function (certid) {
        	var bizId = authService.getBusToken(); 
        	return $http({
        		method: 'GET', 
        		url: 'api/' +  'business/' + bizId + '/certification/' + certid
        	}); 
        }
        
        service.addCertification = function (certification) {
            var bizId = authService.getBusToken(); 
            return $http({
                method: 'POST',
                url: 'api/' +  'business/' +  bizId + '/certification/',
                headers: {
                    'content-type': 'application/json'
                },
                data: certification
            })
        }
        
        service.updateCertification = function (certification) {
            var bizId = authService.getBusToken(); 
            return $http({
                method: 'PUT',
                url: 'api/' +  'business/' + bizId + '/certification/' + certification.id,
                headers: {
                    'content-type':'application/json'
                },
                data: certification
            })
        }
        
        service.destroy = function (certification) {
            var bizId = authService.getBusToken(); 
            return $http({
                method: 'DELETE',
                url: 'api/' +  'business/' + bizId + '/certification/' + certification.id,
            }); 
        }
        return service; 
    })
angular.module('appModule')
    .factory('certificationService', function($http, $cookies, authService){
        var service = {}; 
        var BASE_URL = 'http://localhost:8080/MVCProject/api/'; 

        service.index = function () {
            var bizId = authService.getBusToken(); 
            return $http({
                method: 'GET', 
                url: BASE_URL + 'business/' + bizId + '/certification',
            }); 
        }
        
        service.show = function (certid) {
        	var bizId = authService.getBusToken(); 
        	console.log(certid);
        	return $http({
        		method: 'GET', 
        		url: BASE_URL + 'business/' + bizId + '/certification/' + certid
        	}); 
        }
        
        service.addCertification = function (certification) {
            var bizId = authService.getBusToken(); 
            return $http({
                method: 'POST',
                url: BASE_URL + 'business/' +  bizId + '/certification/',
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
                url: BASE_URL + 'business/' + bizId + '/certification/' + certification.id,
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
                url: BASE_URL + 'business/' + bizId + '/certification/' + certification.id,
            }); 
        }
        return service; 
    })
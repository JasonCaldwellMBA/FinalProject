angular.module('appModule')
    .factory('certificationService', function($http, $cookies, authService){
        var service = {}; 
        var BASE_URL = 'http://localhost:8080/MVCProject/api/'; 

        service.index = function () {
            var bizId = authService.getBusToken(); 
            console.log("cert service " + bizId);
            return $http({
                method: 'GET', 
                url: BASE_URL + 'business/' + bizId + '/certification',
            }); 
        }
        
//        service.show = function (id) {
//            var bizId = authService.getToken(); 
//            return $http({
//                method: 'GET',
//                url: BASE_URL +'business/'+ bizId + '/certification/' + id,
//            });
//        }
        
        service.createCert = function (certification) {
            var bizId = authService.getBusToken(); 
            return $http({
                method: 'POST',
                url: BASE_URL + 'business/' +  bizId + '/certification',
                headers: {
                    'content-type': 'application/json'
                },
                data: certification
            })
        }
        
        service.updateCert = function (certification) {
            var bizId = authService.getBusToken(); 
            return $http({
                method: 'PUT',
                url: BASE_URL + 'business/' + bizId + '/certification/' + certification.id,
                headers: {
                    'content-type':'application/json'
                },
                data:certification
            })
        }
        
        service.deleteCert = function (id) {
            var bizId = authService.getBusToken(); 
            return $http({
                method: 'DELETE',
                url: BASE_URL + 'business/' + bizId + '/certification/' + id
            }); 
        }
        return service; 
    })
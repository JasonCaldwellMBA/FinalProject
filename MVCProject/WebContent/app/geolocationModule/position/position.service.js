angular.module('geolocationModule')
    .factory('positionService', function ($http,$cookies) {
        var service = {}; 

        service.getPosition = function (position) {
            if (navigator.geolocation) {
                return navigator.geolocation.getCurrentPosition(function (position) {
                    $cookies.put('latitude', position.coords.latitude); 
                    $cookies.put('longitude', position.coords.longitude);
                }); 
            }
        }
        return service; 
    })
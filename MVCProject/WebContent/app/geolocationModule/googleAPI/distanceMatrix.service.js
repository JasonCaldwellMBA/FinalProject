angular.module('geolocationModule')
    .factory('distanceMatrixService', function($http, keyService) {
        var service = {}; 

        service.getDistanceJson = function (origin, destination) {
            return $http({
                method: 'GET',
                url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + origin + '&destinations=' + destination + '&key=' + keyService.getGoogleAPIKey()
            }); 
        }
        return service; 
    })
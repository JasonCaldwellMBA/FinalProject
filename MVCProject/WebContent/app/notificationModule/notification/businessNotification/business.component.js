angular.module('notificationModule')
    .component('businessNotification', {
        controllerAs: 'vm', 
        templateUrl: 'app/notificationModule/notification/businessNotification/business.component.html', 
        controller: function(notificationService, $routeParams) {
            var vm = this; 

        }
    })
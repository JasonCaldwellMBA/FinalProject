angular.module('notificationModule')
    .component('notification', {
        controllerAs: 'vm',
        templateUrl: 'app/notificationModule/notification/notification.component.html',
        controller : function (authService, notificationService) {
            var vm = this;
            vm.notifications = null;
            //init load 
            if (authService.getToken()) {
                var userId = authService.getToken();
                notificationService.index(userId).then(function (res) {
                    vm.notifications = res.data;
                });
            }
            else if (authService.getBusToken()) {
                var bizId = authService.getBusToken();
                notificationService.bizIndex(bizId).then(function (res) {
                    vm.notifications = res.data;
                });
            }

            //CRUD
            vm.destroy = function (id) {
                notificationService.destroy(id).then(function (res) {
                    reload(); 
                });
            }
            //HELPER
            var reload = function () {
                if (authService.getToken()) {
                    var userId = authService.getToken();
                    notificationService.index(userId).then(function (res) {
                        vm.notifications = res.data;
                    });
                }
                else if (authService.getBusToken()) {
                    var bizId = authService.getBusToken();
                    notificationService.bizIndex(bizId).then(function (res) {
                        vm.notifications = res.data;
                    });
                }
            }
        }
    }); 
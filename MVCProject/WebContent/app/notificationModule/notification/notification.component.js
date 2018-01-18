angular.module('notificationModule')
    .component('notification', {
        controllerAs: 'vm',
        templateUrl: 'app/notificationModule/notification/notification.component.html',
        controller : function (authService, notificationService) {
            var vm = this;
            vm.notifications = null;
            vm.size = null; 
            //init load 
            if (authService.isUser()) {
                var userId = authService.getToken();
                notificationService.index(userId).then(function (res) {
                    vm.notifications = res.data;
                    vm.size = vm.notifications.length
                });
            }
            else if (authService.isBus()) {
                var bizId = authService.getBusToken();
                notificationService.bizIndex(bizId).then(function (res) {
                    vm.notifications = res.data;
                    vm.size = vm.notifications.length
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
                if (authService.isUser()) {
                    var userId = authService.getToken();
                    notificationService.index(userId).then(function (res) {
                        vm.notifications = res.data;
                        vm.size = vm.notifications.length
                    });
                }
                else if (authService.isBus()) {
                    var bizId = authService.getBusToken();
                    notificationService.bizIndex(bizId).then(function (res) {
                        vm.notifications = res.data;
                        vm.size = vm.notifications.length
                    });
                }
            }
        }
    }); 
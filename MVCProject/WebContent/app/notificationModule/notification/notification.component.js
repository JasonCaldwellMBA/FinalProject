angular.module('notificationModule')
    .component('notification', {
        controllerAs: 'vm',
        templateUrl: 'app/notificationModule/notification/notification.component.html',
        controller: function (authService, userService, notificationService, $routeParams, $location) {
            var vm = this;
            vm.notifications = null;
            vm.size = null;
            vm.user = null; 
            //init load 
            if (authService.isUser()) {
                var userId = authService.getToken();
                notificationService.index(userId).then(function (res) {
                    vm.notifications = res.data;
                    vm.size = vm.notifications.length
                });
                userService.show(userId).then(function (res) {
                    vm.user = res.data;
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
            vm.getHome = function () {
                $location.path("/user/" + $routeParams.id);
            }
            vm.getVehicles = function () {
                $location.path("/user/" + $routeParams.id + "/vehicle");
            }
            vm.getSettings = function () {
                $location.path("/user/" + $routeParams.id + '/settings');
            }
            vm.getRequests = function () {
                $location.path("/user/" + $routeParams.id + "/request");
            }
            vm.getBusiness = function (business) {
                $location.path("/user/" + $routeParams.id + "/business/" + business.id)
            }
            vm.getNotifications = function () {
                $location.path('/user/' + $routeParams.id + '/notification');
            }
        }
    }); 
angular.module('notificationModule')
    .component('businessNotification', {
        controllerAs: 'vm',
        templateUrl: 'app/notificationModule/notification/businessNotification/business.component.html',
        controller: function (notificationService, $routeParams, authService, $location, businessService) {
            var vm = this;
            vm.bizId = authService.getBusToken();
            vm.notifications = null;
            vm.size = null;
            vm.business = null; 

            //init load
            notificationService.bizIndex(vm.bizId).then(function (res) {
                vm.notifications = res.data;
                vm.size = vm.notifications.length;

                businessService.show(vm.bizId).then(function (res) {
                    vm.business = res.data; 
                }); 
            });

            vm.destroy = function(n) {
                notificationService.destroy(n).then(function (res) {
                    reload();
                })
            }
            var reload = function () {
                notificationService.bizIndex(vm.bizId).then(function (res) {
                    vm.notifications = res.data;
                    vm.size = vm.notifications.length;
                });
            }
            //Navigation methods (prevents API load problems); 
            vm.home = function () {
                $location.path("business/" + vm.bizId);
            }
            vm.viewAllQuotes = function () {
                $location.path("business/" + vm.bizId + "/quote");
            }
            vm.viewPendingQuotes = function () {
                $location.path("business/" + vm.bizId + "/pendingQuotes");
            }
            vm.viewAcceptedQuotes = function () {
                $location.path("business/" + vm.bizId + "/acceptedQuotes");
            }
            vm.viewCompletedQuotes = function () {
                $location.path("business/" + vm.bizId + "/completedQuotes");
            }
            vm.viewRequests = function () {
                $location.path("business/" + vm.bizId + "/request");
            }
            vm.viewCertifications = function () {
                $location.path("business/" + vm.bizId + "/certification");
            }
            vm.viewSettings = function () {
                $location.path("business/" + vm.bizId + "/settings");
            }
        }
    })
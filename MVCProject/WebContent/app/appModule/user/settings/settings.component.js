angular.module('appModule')
    .component('settings', {
        controllerAs: 'vm', 
        templateUrl: 'app/appModule/user/settings/settings.component.html',
        controller: function (authService, userService, $routeParams, $location, authService) {
            var vm = this; 
            vm.userId = authService.getToken(); 
            vm.user = null;
            vm.updatedUser = null; 
            
            //init load
            userService.show(authService.getToken()).then(function (res) {
                vm.user = angular.copy(res.data); 
            });
            vm.updateUser = function(user) {
                userService.update(user).then(function (res) {
                    vm.user = res.data;
                    if (res.status >= 200 && res.status < 300) {
                        vm.updatedUser = res.data; 
                    }
                }); 
            }
            vm.destroyAccount = function () {
                userService.destroy().then(function (res) {
                    authService.logout();
                    $location.path('/home');
                });
            }
            vm.return = function (user) {
                $location.path('user/' + $routeParams.id); 
            }
            var reload = function () {
                var id = authService.getToken(); 
                userService.show(id).then(function (res) {
                    vm.user = angular.copy(res.data);
                }); 
            }
        }
    })
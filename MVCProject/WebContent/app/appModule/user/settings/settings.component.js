angular.module('appModule')
    .component('settings', {
        controllerAs: 'vm', 
        templateUrl: 'app/appModule/user/settings/settings.component.html',
        controller: function (userService, $routeParams, $location, authService) {
            var vm = this; 
            vm.user = null;
            
            //init load
            userService.show(authService.getToken()).then(function (res) {
                vm.user = angular.copy(res.data); 
            });
            vm.updateUser = function(user) {
                userService.update(user).then(function (res) {
                    vm.user = res.data;
                    reload();
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
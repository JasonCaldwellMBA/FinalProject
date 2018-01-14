angular.module('appModule')
    .component('quote', {
        controllerAs: 'vm',
        templateUrl: 'app/appModule/quote/quote.component.html',
        controller: function (quoteService, $location, $routeParams) {
            var vm = this; 

        }
    })
angular.module('appModule')
    .component('requestDetail', {
        controllerAs: 'vm',
        templateUrl: 'app/appModule/request/requestDetail/requestDetail.component.html',
        controller: function (requestService, quoteService, $location, $routeParams) {
            var vm = this; 
            vm.request = null; 
            vm.quotes = [];
            //init load
            requestService.show($routeParams.rid).then(function (res) {
                vm.request = angular.copy(res.data);
            }); 
            quoteService.requestQuotes($routeParams.rid).then(function (res) {
                var preQuotes = res.data;
                preQuotes.forEach(quote => {
                    if (quote.acceptedRequest != undefined) {
                        vm.quotes.push(quote); 
                        return; 
                    }
                });
                if (vm.quotes.length < 1) {
                    vm.quotes = preQuotes; 
                }
            }); 
            vm.selectQuote = function (quote) {
                quote.acceptedRequest = quote.request; 
                console.log(quote); 
                quoteService.updateQuote(quote).then(function (res) {
                    console.log(res.data); 
                }); 
            }
            vm.update = function (request) {
                requestService.update(request).then(function (res) {
                    reload();
                }); 
            }
            vm.destroy = function (id) {
                requestService.destroy(id).then(function (res) {
                    vm.return(); 
                }); 
            }
            vm.return = function () {
                $location.path('user/' +  $routeParams.uid + '/request'); 
            }
            var reload = function () {
                requestService.show($routeParams.rid).then(function (res) {
                    vm.request = angular.copy(res.data); 
                }); 
            }
        }
    }); 
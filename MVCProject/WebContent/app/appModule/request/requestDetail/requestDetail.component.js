angular.module('appModule')
    .component('requestDetail', {
        controllerAs: 'vm',
        templateUrl: 'app/appModule/request/requestDetail/requestDetail.component.html',
        controller: function (requestService, quoteService, $location, $routeParams, notificationService) {
            var vm = this;
            vm.request = null;
            vm.quotes = [];
            //init load
            if (authService.isUser() == false) {
                var id = authService.getToken();
                $location.path('/login');
            }
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
                quoteService.updateQuote(quote).then(function (res) {
                    //Create notification to the user of the request
                    var notification = {
                        business: quote.business,
                        user: quote.request.user,
                        message: vm.request.user.firstName + ' ' + vm.request.user.lastName + ' selected your quote for #Quote id: ' + quote.id + ', #Request id: ' + vm.request.id,
                        type: "business"
                    };

                    console.log(notification);
                    notificationService.create(notification).then(function (res) {
                        console.log(res);
                    })
                    reload();
                });
            }
            vm.update = function (request) {
                requestService.update(request).then(function (res) {
                    vm.return();
                });
            }
            vm.destroy = function (id) {
                requestService.destroy(id).then(function (res) {
                    vm.return();
                });
            }
            vm.return = function () {
                $location.path('user/' + $routeParams.uid + '/request');
            }
            var reload = function () {
                requestService.show($routeParams.rid).then(function (res) {
                    vm.request = angular.copy(res.data);
                    quoteService.requestQuotes($routeParams.rid).then(function (res) {
                        var preQuotes = res.data;
                        preQuotes.forEach(quote => {
                            if (quote.acceptedRequest != undefined) {
                                vm.quotes = [];
                                vm.quotes.push(quote);
                                return;
                            }
                        });
                        if (vm.quotes.length < 1) {
                            vm.quotes = preQuotes;
                        }
                    });
                });
            }
        }
    }); 
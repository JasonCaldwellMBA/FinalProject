angular.module('appModule')
	.component('businessRequest', {
		templateUrl: 'app/appModule/business/businessRequest/businessRequest.component.html',
		controllerAs: 'vm',
		controller: function (requestService, quoteService) {
			var vm = this;
			vm.requests = [];
			vm.selected = null;
			vm.quoteFlag = null;

			//init Methods
			requestService.indexAllRequests().then(function (res) {
				vm.requests = res.data;
			});

			//helper methods
			var reload = function () {
				requestService.indexAllRequests().then(function (res) {
					vm.requests = res.data;
				});
			}
			vm.viewDetails = function (request) {
				requestService.showForBiz(request).then(function (res) {
					vm.selected = res.data;
				});
			}
			vm.return = function () {
				vm.quoteFlag = null;
			}
			vm.addQuote = function (quote) {
				quoteService.createQuote(quote, vm.selected.id).then(function (res) {
					vm.quoteFlag = null;
				});
			}
		}
	})
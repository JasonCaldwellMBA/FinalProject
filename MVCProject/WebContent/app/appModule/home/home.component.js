angular.module('appModule')
	.component('home', {
		templateUrl: 'app/appModule/home/home.component.html',
		controllerAs: 'vm',
		controller: function ($anchorScroll, $location) {
			var vm = this;

			vm.scrollTo = function () {
				$location.hash('about');
				$anchorScroll();
			}
		}
	});


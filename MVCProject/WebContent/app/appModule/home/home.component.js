angular.module('appModule')
    .component('home', {
        templateUrl: 'app/appModule/home/home.component.html',
        controllerAs: 'vm',
        controller: function ($rootScope, $location, $anchorScroll) {
        	var vm = this;
        	
        	vm.scrollTo = function(id) {
        		console.log('clicked');
        	      $location.hash(id);
        	      $anchorScroll();
        	   }
        	}
    });
/* MAP STUFF */
// mapView.component.js
angular.module('appModule')
.component('mapView', {
  template : `
    <h1>Map</h1>
    <div ng-if="vm.mapOptions" map-lazy-load="https://maps.google.com/maps/api/js"
        map-lazy-load-params="{{vm.googleMapsUrl}}">
        <ng-map center="{{vm.mapOptions.center.lat}},{{vm.mapOptions.center.lng}}" zoom="{{vm.mapOptions.zoom}}">
          <marker ng-repeat="mark in vm.mapOptions.markers" position="[{{mark.lat}},{{mark.lng}}]" title="{{mark.title}}" icon="{{mark.icon}}" animation="{{mark.animation}}" draggable="{{mark.draggable}}"></marker>
        </ng-map>
    </div>
  `,
  controller : function($timeout) {
    var vm = this;
    vm.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCiTHajsiPtjxhedochfeIEsXprCNNQFfU"
    vm.mapOptions = null;

    $timeout(function() {
      vm.mapOptions = {
          center: {lat: -34.397, lng: 150.644},
          markers : [
            {lat: -34.397, lng: 150.644, title : "center", animation : "Animation.BOUNCE"},
            {lat: -34.380, lng: 150.644, title : "one", animation : "Animation.DROP"},
            {lat: -34.370, lng: 150.644, title : "two", draggable : "true"},
            {lat: -34.360, lng: 150.644, title : "three", icon : "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"},
          ],
          zoom: 8
      };
    },2000);

  },
  controllerAs : 'vm'
})
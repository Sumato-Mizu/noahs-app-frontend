NoahsApp.controller("MapController", function($scope, MapService, PumpService) {
  MapService.pumps = PumpService.pumps;
  MapService.initMap();
})

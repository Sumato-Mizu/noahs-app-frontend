NoahsApp.controller("PumpController", function($scope, $stateParams, MapService, PumpService) {
  $scope.id = $stateParams.id;
  $scope.pump = PumpService.getPump(parseInt($scope.id));
  // console.log(PumpService.pumps);
  $scope.generatePumps = function() {
    // MapService.pumps = 
    // MapService.createMarker();
    // MapService.createPumpMarkers(PumpService.pumps);
  }
})

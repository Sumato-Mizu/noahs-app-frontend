NoahsApp.controller("PumpController", function($scope, $stateParams, PumpService) {
  $scope.id = $stateParams.id;
  $scope.pump = PumpService.getPump(parseInt($scope.id));
})

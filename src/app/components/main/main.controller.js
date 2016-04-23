NoahsApp.controller("MainController", function($scope, FmiAPIService) {
  $scope.api_field = "5c2fc68e-d165-45f5-af8f-ce9fc0b36e68";
  $scope.query_field = "/wfs?request=GetFeature&storedquery_id=fmi::radar::composite::rr";
  $scope.fmilink = "asdf";
  $scope.tiflinks = [];
  $scope.sendRequest = function() {
    FmiAPIService
    .requestTifs($scope.api_field, $scope.query_field)
    .then(function(result) {
      $scope.fmilink = result.fmilink;
      $scope.tiflinks = result.tiflinks;
    })
  }
})

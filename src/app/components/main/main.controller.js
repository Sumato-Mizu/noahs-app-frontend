NoahsApp.controller("MainController", function($scope, FmiAPIService) {
  $scope.apierror = {};
  $scope.api_field = "5c2fc68e-d165-45f5-af8f-ce9fc0b36e68";
  $scope.query_field = "/wfs?request=GetFeature&storedquery_id=fmi::radar::composite::rr";
  $scope.fmilink = "";
  $scope.tiflinks = [];

  $scope.sendRequest = function() {
    FmiAPIService
      .requestTifs($scope.api_field, $scope.query_field)
      .then(function(result) {
        console.log("Got result");
        console.log(result);
        $scope.fmilink = result.fmilink;
        $scope.tiflinks = result.tiflinks;
        $scope.apierror = {};
      })
      .catch(function(err) {
        console.log(err.data.message);
        $scope.apierror = err.data;
        console.log($scope.apierror);
      })
  }

  $scope.generateMap = function(index) {
    // var picture = $scope.tiflinks[index];
    // PictureService
    //   .requestRadarPicture(picture)
    //   .then(function(result) {
    //
    //   })
  }

  $scope.checkIfErrorUndefined = function() {
    return typeof $scope.apierror.message === "undefined";
  }
})

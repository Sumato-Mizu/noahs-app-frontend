NoahsApp.controller("MainController", function($scope) {
  console.log("main controllerissa filussa");
  $scope.name = "olen mainikas";
  
  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.MapQuest({
          layer: 'sat'
        })
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([37.41, 8.82]),
      zoom: 4
    })
  });
})

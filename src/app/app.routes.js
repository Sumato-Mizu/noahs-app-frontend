NoahsApp.config(function($stateProvider, $urlRouterProvider) {
  console.log("heippa");
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state("main", {
      url: "/",
      templateUrl: "app/components/main/main.html",
      controller: "MainController",
      controllerAs: "main"
    })
    .state("map", {
      url: "/map",
      templateUrl: "app/components/map/map.html",
      controller: "MapController",
      controllerAs: "map"
    })
    .state("pump", {
      url: "/pump/:id",
      templateUrl: "app/components/pump/pump.html",
      controller: "PumpController",
      controllerAs: "pump"
    })
})

NoahsApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state("main", {
      url: "/",
      templateUrl: "app/components/main/main.html",
      controller: "MainController",
    })
    .state("map", {
      url: "/map",
      templateUrl: "app/components/map/map.html",
      controller: "MapController",
    })
    .state("pump", {
      url: "/pump/:id",
      templateUrl: "app/components/pump/pump.html",
      controller: "PumpController",
    })
})

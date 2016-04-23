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
    .state("leaf", {
      url: "/leaf",
      templateUrl: "app/components/leaflet/leaflet.html",
      controller: "LeafletController",
      controllerAs: "leaflet"
    })
})

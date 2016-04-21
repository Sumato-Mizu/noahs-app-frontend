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
    .state("test", {
      url: "/test",
      templateUrl: "app/components/test/test.html",
      controller: "TestController",
      controllerAs: "test"
    })
})

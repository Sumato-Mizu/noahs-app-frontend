NoahsApp.service("FmiAPIService", function($http) {
  this.requestTifs = function(apikey, query) {
    var config = {
      method: "POST",
      url: "https://noahs-app-backend.herokuapp.com/radar",
      data: {
        apikey: apikey,
        query: query,
      }
    }
    return $http(config)
      .then(function(result) {
        console.log(result);
        return result.data;
      })
  }
});

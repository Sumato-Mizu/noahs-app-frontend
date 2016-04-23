NoahsApp.service("FmiAPIService", function($http) {
  this.requestTifs = function(apikey, query) {
    var config = {
      method: "POST",
      url: "http://localhost:8088/radar",
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
      .catch(function(err) {
        console.log("Calling API produced an error:");
        console.log(err.data.message);
        return [];
      })
  }
});

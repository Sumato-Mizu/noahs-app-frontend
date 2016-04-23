NoahsApp.service("PumpService", function($http) {
  this.createPumpMarkers = function(pumpdata) {
    var pumps = [];
    for(var i = 0; i < pumpdata.length; i++) {
      var pump = pumpdata[i];
      var newPump = L.marker([pump.latidute, pump.longitude])
        .bindPopup("Pumppu " + pump.id).openPopup();
      pumps.push(newPump);
    }
    return pumps;
  }
  this.fetchPumpData = function() {
    var config = {
      method: "POST",
      url: "http://10.144.72.11",
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
})

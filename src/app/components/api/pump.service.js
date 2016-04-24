NoahsApp.service("PumpService", function($http) {
  this.pumps = [];
  this.fakePumps = [{
    id: 1,
    name: "pumppu lol",
    latitude: 59,
    longitude: 25,
  }, {
    id: 2,
    name: "toka pumppu",
    latitude: 59.5,
    longitude: 25,
  }, {
    id: 3,
    name: "kolmas pumppu",
    latitude: 60,
    longitude: 25,
  }]
  // creates pump object from parsed array from the txt-file
  // e.g. ["u'3025'", "u'Eilantie'", "60.32972222222222", "25.113277777777782)"]
  this.createPumpFromTxt = function(txt) {
    var pump = {};
    var parts = txt.split(",");
    for (var i = 0; i < parts.length; i++) {
      parts[i] = parts[i].trim();
      if (i===0) {
        // id : "u'3025'"
        pump.id = parts[i].substring(parts[i].indexOf("'")+1, parts[i].lastIndexOf("'"));
      } else if (i===1) {
        // name : "u'Eilantie'"
        pump.name = parts[i].substring(parts[i].indexOf("'")+1, parts[i].lastIndexOf("'"));
      } else if (i===2) {
        pump.latitude = parseFloat(parts[i]);
      } else if (i===3) {
        pump.longitude = parseFloat(parts[i]);
      }
    }
    // console.log(pump);
    return pump;
  }
  this.generatePumpsFromTxt = function(txt) {
    var pumps = [];
    var splitted = txt.split("(");
    for(var i = 0; i < splitted.length; i++) {
      var newPump = this.createPumpFromTxt(splitted[i]);
      if (!isNaN(newPump.latitude) && !isNaN(newPump.longitude)) {
        pumps.push(newPump);
      }
    }
    // console.log(pumps);
    // console.log(pumps.length);
    return pumps;
  }
  this.readPumpsFromTxt = function() {
    this.pumps = this.fakePumps;
    var context = this;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "/data/pumps.txt", false);
    rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          var allText = rawFile.responseText;
          context.pumps = context.generatePumpsFromTxt(allText);
        }
      }
    }
    rawFile.send(null);
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
        this.pumps = result.data;
        return result.data;
      })
      .catch(function(err) {
        console.log("Calling API produced an error:");
        console.log(err.data.message);
        return [];
      })
  }
  this.getPump = function(id) {
    console.log(" id on " + id);
    for (var i = 0; i < this.pumps.length; i++) {
      // console.log(this.pumps[i].id)
      if (this.pumps[i].id === id || parseInt(this.pumps[i].id) === id) {
        console.log(this.pumps[i]);
        return this.pumps[i];
      }
    }
    console.log("not found");
    return "no pump found";
  }
  this.readPumpsFromTxt();
})

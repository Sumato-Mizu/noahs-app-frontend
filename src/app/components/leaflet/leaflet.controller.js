NoahsApp.controller("LeafletController", function($scope) {
  console.log("test controllerissa filussa");
  $scope.name = "olen testiä";

  function conversion(a, b) {
    var firstProjection = "+proj=utm +zone=35 +ellps=GRS80 +units=m +no_defs +towgs84=0,0,0,-0,-0,-0,0";
    var secondProjection = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
    var coordinates = proj4(firstProjection, secondProjection, [a, b]);

    return coordinates;
  }

  var crs = new L.Proj.CRS.TMS('EPSG:3067',
    '+proj=utm +zone=35 +ellps=GRS80 +units=m +towgs84=0,0,0,-0,-0,-0,0 +no_defs', [-548576.0, 6291456.0, 1548576.0, 8388608], {
      resolutions: [
        8192,
        4096,
        2048,
        1024,
        512,
        256,
        128,
        64,
        32,
        16,
        8,
        4,
        2,
        1,
        0.5,
        0.25
      ]
    });

  var map = new L.Map('map', {
    crs: crs,
    continuousWorld: true,
    worldCopyJump: false,
    zoomControl: true
  });

  var tileUrl = 'https://{s}.kapsi.fi/mapcache/peruskartta_3067/{z}/{x}/{y}.png'
  attrib = '&copy; Karttamateriaali <a href="http://www.maanmittauslaitos.fi/avoindata">Maanmittauslaitos</a>',
    tilelayer = new L.Proj.TileLayer.TMS(tileUrl, crs, {
      maxZoom: 14,
      minZoom: 0,
      tileSize: 256,
      tms: false,
      continuousWorld: true,
      attribution: attrib,
      subdomains: ['tile1', 'tile2']
    });

  map.addLayer(tilelayer);
  map.setView([65.01275, 25.46815], 11);

  function addMarker(a, b) {
    var coord = conversion(a, b);
    var markern = L.marker([coord[1], coord[0]]).addTo(map);
  }
})

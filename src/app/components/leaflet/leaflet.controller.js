NoahsApp.controller("LeafletController", function($scope) {
  console.log("test controllerissa filussa");
  $scope.name = "olen testiä";

  function conversion(a, b) {
    var firstProjection = "+proj=utm +zone=35 +ellps=GRS80 +units=m +no_defs +towgs84=0,0,0,-0,-0,-0,0";
    var secondProjection = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
    var coordinates = proj4(firstProjection, secondProjection, [a, b]);
    return coordinates;
  }

  console.log(conversion(875567.732, 6335621.167));

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

  var mymap = new L.Map('map', {
    crs: crs,
    continuousWorld: true,
    worldCopyJump: false,
    zoomControl: true,
    layers: []
  });

  var tileUrl = 'https://{s}.kapsi.fi/mapcache/peruskartta_3067/{z}/{x}/{y}.png';
  var attrib = '&copy; Karttamateriaali <a href="http://www.maanmittauslaitos.fi/avoindata">Maanmittauslaitos</a>';
  var tilelayer = new L.Proj.TileLayer.TMS(tileUrl, crs, {
      maxZoom: 14,
      minZoom: 0,
      tileSize: 256,
      tms: false,
      continuousWorld: true,
      attribution: attrib,
      subdomains: ['tile1', 'tile2']
    });

  // var tutkalayer = new L.tileLayer("/img/sade-tutka.png", {
  //   attribution: "tutka kartta"
  // }).addTo(mymap);

  var tutkakuvaUrl = '/img/sade-tutka.png';
  var tutkakuvaBounds = [
    [70.49988067141419, 10.2139235307523],
    [57.01073316247846, 33.18909488231688]
  ];

  L.imageOverlay(tutkakuvaUrl, tutkakuvaBounds).addTo(mymap);

  mymap.addLayer(tilelayer);
  mymap.setView([65.01275, 25.46815], 11);

  function addMarker(a, b) {
    var coord = conversion(a, b);
    var markern = L.marker([coord[1], coord[0]]).addTo(mymap);
  }

  var joku = L.marker([65.01275, 25.46815]).bindPopup('Tämä on paikka.');

  var jokuryhma = L.layerGroup([joku]);

  var circle = L.circle([65.01275, 25.46815], 500, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
  }).addTo(mymap);

  joku.addTo(mymap);
})

NoahsApp.controller("MapController", function($scope, PumpService) {
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

  // tutkan koordinatit parsittu fmi-xml:stä gml-coordinates nimellä
  // -118331.366 7907751.537 875567.732 7907751.537 875567.732 6335621.167 -118331.366 6335621.167 -118331.366 7907751.537
  console.log(conversion(7907751.537, -118331.366));
  console.log(conversion(-118331.366, 7907751.537));
  console.log(conversion(875567.732, 7907751.537));
  console.log(conversion(875567.732, 6335621.167));
  console.log(conversion(-118331.366, 6335621.167));
  console.log(conversion(-118331.366, 7907751.537));
  // var tutkakuvaBounds = [
    // [33.18909488231688, 57.01073316247846],  // oikea yläkulma
    // [10.2139235307523, 70.49988067141419], // vasen yläkulma
    // [37.37170826858529, 70.9830591433417], // vasen
    // [16.86739870411734, 56.75131897332151],
    // [10.2139235307523, 70.49988067141419]
  // ];

  var tutkakuvaUrl = '/img/sade-tutka.png';
  // var tutkakuvaBounds = [
  //   [70.49988067141419, 10.2139235307523],
  //   [57.01073316247846, 33.18909488231688]
  // ];

  var tutkakuvaBounds = [
    // [7907751.537, -118331.366],
    // [875567.732, 6335621.167]
    [57.01073316247846, 35.67170826858529],
    [70.49988067141419, 8.5139235307523],
  ];

  L.imageOverlay(tutkakuvaUrl, tutkakuvaBounds).addTo(mymap);

  mymap.addLayer(tilelayer);
  mymap.setView([65.01275, 25.46815], 2);

  function addMarker(a, b) {
    var coord = conversion(a, b);
    var markern = L.marker([coord[1], coord[0]]).addTo(mymap);
  }

  var oikeaTuppi = L.marker([10.2139235307523, 70.49988067141419]).bindPopup("Oikea tuppi").openPopup();
  // var oikeaYla = L.marker([70.49988067141419, 10.2139235307523]).bindPopup("Oikea yläkulma").openPopup();
  var vasenYla = L.marker([70.49988067141419, 37.37170826858529]).bindPopup("Vasen yläkulma").openPopup();
  var oikeaAla = L.marker([57.01073316247846, 10.2139235307523]).bindPopup("Oikea alakulma").openPopup();
  var vasenAla = L.marker([57.01073316247846, 37.37170826858529]).bindPopup("Vasen alakulma").openPopup();

  // radars from http://ilmatieteenlaitos.fi/suomen-tutkaverkko
  var ikaalinen = L.marker([61.7673, 23.0764]).bindPopup("Ikaalisen tutka-asema").openPopup();
  var vimpeli = L.marker([63.1048, 23.8209]).bindPopup("Vimpelin tutka-asema").openPopup();
  var utajarvi = L.marker([64.7749, 26.3189]).bindPopup("Utajärven tutka-asema").openPopup();
  var petajavesi = L.marker([62.3045, 25.4401]).bindPopup("Petäjäveden tutka-asema").openPopup();
  var kuopio = L.marker([62.8626, 27.3815]).bindPopup("Kuopion tutka-asema").openPopup();
  var kesalahti = L.marker([61.9070, 29.7977]).bindPopup("Kiteen tutka-asema").openPopup();

  var joku2 = L.marker([65.01275, 25.56815]).bindPopup("<a target='_blank' href='https://google.com'>I am a popup.</a>").openPopup();
  var joku = L.marker([65.01275, 25.46815]).bindPopup("<a target='_blank' href='https://google.com'>I am a popup.</a>").openPopup();

  var jokuryhma = L.layerGroup([oikeaTuppi, vasenYla, oikeaAla, vasenAla, ikaalinen, vimpeli, utajarvi, petajavesi, kuopio, kesalahti, joku2, joku]);

  // var myMap = L.map('map', options);
  // var measureControl = new L.Control.Measure(options);
  // measureControl.addTo(myMap);

  var circle = L.circle([65.01275, 25.46815], 500, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
  }).addTo(mymap);

  var pumps = L.layerGroup(PumpService.createPumpMarkers(PumpService.fakePumps));

  jokuryhma.addTo(mymap);
  pumps.addTo(mymap);
})

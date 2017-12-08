// Store our link for 7 day earthquake inside Url

var url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform a GET request to the query URL
d3.json(url, function(data) {

  createFeatures(data.features);

});


// Define a function we want to run once for each feature in the features array

function createFeatures(earthquakeData) {

  function onEachFeature(feature, layer) {

    layer.bindPopup("<h3>" + feature.properties.place +"</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }
  
// Run the onEachFeature function once for each piece of data in the array

    var earthquakes = L.geoJson(earthquakeData, {

      onEachFeature: onEachFeature,

      pointToLayer: function (feature, latlng) {

        var mag,
            radius,
            fillColor,
            type;

        type=feature.properties.type ;
        mag = feature.properties.mag;

        if(type === "earthquake"){

          if(mag !== null){

            fillColor = chooseColor(mag);
            radius = 3 * mag;
          }
        }
        return L.circleMarker(latlng, {
          color:"grey",
          fillColor:fillColor,
          radius: radius,
          fillOpacity: 0.8,
          weight: .2
        });
      }
    });
  
// Sending our earthquakes layer to the createMap function
    createMap(earthquakes);

  }

function chooseColor(data){

  var i= parseInt(data);

  if(i >=0 & i<1 ){

  return "#9F3"
  }
  if(i >=1 & i<2 ){
    
    return "#FF0"
  }
  if(i >=2 & i<3 ){
      
    return "#FC0"
  }
  if(i >=3 & i<4 ){
    
  return "#F90"
  }
  if(i >=4 & i<5 ){
    
  return "#F60"
  }
  else {
    return "#F30"
  } 

}

function createMap(earthquakes) {

// Define streetmap and darkmap layers
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/sumana77/cjal9l8j0cial2ro7neotrn88/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3VtYW5hNzciLCJhIjoiY2pha2EwOGNkMmZlaTJxcGRuODd2Zm90MSJ9.sirUWOzphXjCGBzrkXPsDQ");

var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/sumana77/cjasyacxmitrx2rmo2bfinzd1/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3VtYW5hNzciLCJhIjoiY2pha2EwOGNkMmZlaTJxcGRuODd2Zm90MSJ9.sirUWOzphXjCGBzrkXPsDQ");

// Define a baseMaps object to hold our base layers
var baseMaps = {
  "Street Map": streetmap,
  "Satelite Map": darkmap
};

// Create overlay object to hold our overlay layer
var overlayMaps = {
  Earthquakes: earthquakes
};

// Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 4,
    layers: [streetmap, earthquakes]
  });

  
// // Create a layer control

// L.control.layers(baseMaps, overlayMaps, {
//   collapsed: false
// }).addTo(myMap);
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (myMap) {

  var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 1, 2, 3, 4, 5],
            labels = [];

// loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
          '<i style="background:' + getColor(grades[i] + 1) + '"></i> <strong>' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '</strong><br>' : '+');
  }
  return div;
};

legend.addTo(myMap);

};

function getColor(d){

  return d > 5 ? '#F30' :
  d > 4  ? '#F60' :
  d > 3  ? '#F90' :
  d > 2  ? '#FC0' :
  d > 1   ? '#FF0' :
            '#9F3';

}

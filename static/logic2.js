
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 4
  });

  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/sumana77/cjal9l8j0cial2ro7neotrn88/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3VtYW5hNzciLCJhIjoiY2pha2EwOGNkMmZlaTJxcGRuODd2Zm90MSJ9.sirUWOzphXjCGBzrkXPsDQ").addTo(myMap)
d3.json("/data/PB2002_plates.json",function(data){

  // console.log(data.features[0].geometry.coordinates[0]);

  var point,data,pointList=[];

  var feature=data.features;

  for (var i=0;i<feature.length;i++){

    

    data= feature[i].geometry.coordinates[0];

    for(var j=0;j<data.length;j++){

      console.log(data.length)

      if (data[j]!=null){

        lat=data[j][0];
        lng=data[j][1];
        point = L.latLng(lat,lng);
   
      }

      pointList.push(point);
      
    }
    console.log(pointList);

  }
  var firstpolyline = L.polyline(pointList, {
    color: 'red',
    weight: 1,
    opacity: 0.5,
   
  });
  firstpolyline.addTo(myMap);
});



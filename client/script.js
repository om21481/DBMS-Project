mapboxgl.accessToken =
  "pk.eyJ1Ijoib20yMTQ4MSIsImEiOiJjbGRobTBreDUxM2w1M3F0NTd4ZG01ZXEzIn0.l7-GFstLQOdYhnkUMbHukQ"

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true
})

function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation() {
  setupMap([-2.24, 53.48])
}

function setupMap(center) {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: center,
    zoom: 15
  })

  const nav = new mapboxgl.NavigationControl()
  map.addControl(nav)


  var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken
  })

  map.addControl(directions, "top-left")

  console.log(directions);
}

// we can get the input values 
// Source: document.getElementsByClassName('mapboxgl-ctrl-geocoder')[0].children[1].value
// Destinantion : document.getElementsByClassName('mapboxgl-ctrl-geocoder')[1].children[1].value

// how to make requests with mapboxgl
// https://api.mapbox.com/directions/v5/mapbox/cycling/-84.518641,39.134270;-84.512023,39.102779?geometries=geojson&access_token=pk.eyJ1Ijoib20yMTQ4MSIsImEiOiJjbGRobTBreDUxM2w1M3F0NTd4ZG01ZXEzIn0.l7-GFstLQOdYhnkUMbHukQ


// we can do mark the source and destination on map and then calculate the distance and average -- by making api request  
// or we can calculate the distance with our own algorithm -- by routing the directons

// https://api.mapbox.com/directions/v5/mapbox/driving/77.26573,28.54483;77.26918,28.54852?geometries=geojson&access_token=pk.eyJ1Ijoib20yMTQ4MSIsImEiOiJjbGRobTBreDUxM2w1M3F0NTd4ZG01ZXEzIn0.l7-GFstLQOdYhnkUMbHukQ
// we can get distance by this


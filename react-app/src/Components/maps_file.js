import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions"

mapboxgl.accessToken =
  "pk.eyJ1Ijoib20yMTQ4MSIsImEiOiJjbGRobTBreDUxM2w1M3F0NTd4ZG01ZXEzIn0.l7-GFstLQOdYhnkUMbHukQ"

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true
})


export function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude])
}

export function errorLocation() {
  setupMap([-2.24, 53.48])
}


export let map = "";
export function setupMap(center) {
  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: center,
    zoom: 15,
  })
  
  const nav = new mapboxgl.NavigationControl()
    map.addControl(nav)


  var directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken
  })

  map.addControl(directions, "top-left")

  var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundColor = '#0096FF'
    el.style.width = '15px';
    el.style.height = '15px';
    el.style.borderRadius = '25px';

    console.log(center);
    
    new mapboxgl.Marker(el)
    .setLngLat(center)
    .addTo(map);

}

export function add_marker(map, coordinates, link){
  console.log(coordinates);
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = `url(${link})`;
    el.style.width = '30px';
    el.style.height = '30px';
    el.style.borderRadius = '25px';
    el.style.backgroundPosition = 'center center';

    new mapboxgl.Marker(el)
    .setLngLat(coordinates)
    .addTo(map);
}

export const input_values = () => {
    return({
        Source: document.getElementsByClassName('mapboxgl-ctrl-geocoder')[0].children[1].value,
        Destination: document.getElementsByClassName('mapboxgl-ctrl-geocoder')[1].children[1].value,
        Time: document.getElementsByClassName('mapbox-directions-component mapbox-directions-route-summary')[0].children[0].textContent,
        Distance: document.getElementsByClassName('mapbox-directions-component mapbox-directions-route-summary')[0].children[1].textContent
    })
}


// how to make requests with mapboxgl
// https://api.mapbox.com/directions/v5/mapbox/cycling/-84.518641,39.134270;-84.512023,39.102779?geometries=geojson&access_token=pk.eyJ1Ijoib20yMTQ4MSIsImEiOiJjbGRobTBreDUxM2w1M3F0NTd4ZG01ZXEzIn0.l7-GFstLQOdYhnkUMbHukQ


// we can do mark the source and destination on map and then calculate the distance and average -- by making api request  
// or we can calculate the distance with our own algorithm -- by routing the directons

// https://api.mapbox.com/directions/v5/mapbox/driving/77.26573,28.54483;77.26918,28.54852?geometries=geojson&access_token=pk.eyJ1Ijoib20yMTQ4MSIsImEiOiJjbGRobTBreDUxM2w1M3F0NTd4ZG01ZXEzIn0.l7-GFstLQOdYhnkUMbHukQ
// we can get distance by this


// Examples

// Place to Co-ordinates

// example query for the address “515 15th St NW, Washington, DC 20004”,

// https://api.mapbox.com/geocoding/v5/mapbox.places/515%2015th%20St%20NW%2C%20Washington%2C%20DC%2020004.json?types=address&access_token=YOUR_MAPBOX_ACCESS_TOKEN

// Co-ordinates to Place

// https://api.mapbox.com/geocoding/v5/mapbox.places/-122.463%2C%2037.7648.json?access_token=YOUR_MAPBOX_ACCESS_TOKEN
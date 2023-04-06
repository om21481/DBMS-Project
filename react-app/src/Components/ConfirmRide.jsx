import React from "react";
import {TripsContext} from "../requests/useContext.js"
import axios from "axios";
import Navbar from "./Navbar.jsx";
import mapboxgl from "mapbox-gl";

// here we are creating our map for lines and driving of vehicle
const main_function = (routes_data, source, destination) => {
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

    let map = ""
    const setupMap = (center) => {
        map = new mapboxgl.Map({
          container: "map1",
          style: "mapbox://styles/mapbox/streets-v11",
          center: center,
          zoom: 13,
        })
        
        map.on('load', () => {
            map.addSource('route', {
                'type': 'geojson',
                'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                'type': 'LineString',
                'coordinates': routes_data
                    }
                }
            });
            map.addLayer({
                'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                'line-join': 'round',
                'line-cap': 'round'
                },
                'paint': {
                'line-color': '#000000',
                'line-width': 5
                }
            });
        });
    
    
        var el = document.createElement('div');
          el.className = 'marker';
          el.style.backgroundColor = '#0096FF'
          el.style.width = '15px';
          el.style.height = '15px';
          el.style.borderRadius = '25px';
          
          new mapboxgl.Marker(el)
          .setLngLat(center)
          .addTo(map);

        
        var driver = document.createElement('img');
        driver.className = 'driver_car';
        driver.style.width = '40px';
        driver.style.height = '23px';
        driver.src = "black uber.png"
        
        new mapboxgl.Marker(driver)
        .setLngLat(destination)
        .addTo(map);
        
        // updating location according to driver details
    }
}


const update_time_distance = async(Destination) => {
    // here we need to calculate source from database with driver details
    // const res = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${};${Destination}?geometries=geojson&access_token=pk.eyJ1Ijoib20yMTQ4MSIsImEiOiJjbGRobTBreDUxM2w1M3F0NTd4ZG01ZXEzIn0.l7-GFstLQOdYhnkUMbHukQ`)

    // const time = res.data.routes[0].duration/60
    // const distance = res.data.routes[0].distance

    // // updating location according to driver details

    // return [time, distance];
}

const ConfirmRide = () => {
    const {data, price, setTrip} = React.useContext(TripsContext);
    const [time, setTime] = React.useState(0)
    const [distance, setDistance] = React.useState(0);
    
    React.useEffect(() => {
        const fun = async() => {
            const Source = "77.27329,28.54863";
            const Destination = "77.26269,28.54826";
            // const Source = data.Source;
            // const Destination = data.Destination;

            const res = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${Source};${Destination}?geometries=geojson&access_token=pk.eyJ1Ijoib20yMTQ4MSIsImEiOiJjbGRobTBreDUxM2w1M3F0NTd4ZG01ZXEzIn0.l7-GFstLQOdYhnkUMbHukQ`)

            const routes_data = res.data.routes[0].geometry.coordinates;

            setTime(res.data.routes[0].duration/60)             // in minutes
            setDistance(res.data.routes[0].distance)            // in metres

            main_function(routes_data, Source.split(','), Destination.split(','))

            // here we will run time left and updating the markers and time and distance
            // console.log(time, distance);

            setInterval(() => {
                const [t, d] = update_time_distance(Destination);
                setTime(t)
                setDistance(d)
            }, 5000)
        }

        fun()
    }, [])

    return(
        <>
           <div className=" w-screen h-screen">
                <div className="w-full h-[50%] p-2">
                    <div id='map1' className="w-full h-full rounded-3xl map-with-no-search"></div>
                </div>
           </div>
        </>
    )
}

export default ConfirmRide;

// Destination
// : 
// "77.26269,28.54826"
// Distance
// : 
// "1.04mi"
// Source
// : 
// "77.27329,28.54863"
// Time
// : 
// "5min"
import React from 'react';
import { successLocation, errorLocation, setupMap, add_marker, map} from './maps_file';
import "./maps_style.css"
// import dotenv from 'dotenv'

// dotenv.config()


const Maps = () => {
    const [coordinates, setCoordinates] = React.useState({});
    
    React.useEffect(()=>{
        navigator.geolocation.getCurrentPosition(async (position) => {
            setCoordinates(position);
            
            console.log(coordinates);
        })
        // console.log(coordinates.coors.latitude, coordinates.coors.longitude);
    
    })


    return(
        <>
        <div id='map' style={{width:"100vw", height:"100vh"}}></div>
        <button onClick={() => {add_marker(map, [coordinates.coords.latitude, coordinates.coords.longitude], "https://images.pexels.com/photos/14588051/pexels-photo-14588051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")}}>Click Me</button>
        </>
    )
}

export default Maps;
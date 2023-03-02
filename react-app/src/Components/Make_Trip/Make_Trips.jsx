import React, { useEffect } from 'react';
import Trips from './Trips.jsx';
import Navbar from '../Navbar.jsx';
import { successLocation, errorLocation, setupMap, map, input_values, add_marker} from '../maps_file.js';
import "./maps_style.css"
// import dotenv from 'dotenv'

// dotenv.config()


const MakeTrips = () => {
    const [show_trips, Set_show_trips] = React.useState(false);
    const [data, setData] = React.useState('');
    
    React.useEffect(() => {
        if(data) {
            console.log(data);
            Set_show_trips(true);
        }
    })


    return(
        <>
        <div className='bg-black w-[100vw] h-[100vh]'>
            <Navbar/>

            <div className='flex items-center justify-center w-full h-full'>
                <div id='map' className="w-[98%] h-[70%] rounded-2xl fixed" 

                onClick={() => {setData(input_values())}} 
                
                onMouseEnter={() => {setData(input_values())}} 
                onMouseLeave={() => {setData(input_values())}}></div>

            </div>

            {show_trips ? <Trips/> : ""}
        </div>
        </>
    )
}

export default MakeTrips;
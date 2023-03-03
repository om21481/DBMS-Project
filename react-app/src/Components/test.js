import React from "react";
import axios from "axios";

const Test = () => {
    const [coordiantes, setCoordiantes] = React.useState();
    navigator.geolocation.getCurrentPosition((coor) => {
        setCoordiantes([coor.coords.longitude, coor.coords.latitude])
    });
    const fun = async() => {
        try {
            const res = await axios.post(`http://127.0.0.1:8000/Client/drivers_nearby/2`, {
                curr_long: coordiantes[0],
                curr_lat: coordiantes[1]
            });

            const data = res.data;
            
        } catch (error) {
            console.log(error);
        }

    }

    return(
        <>

        </>
    )
}

export default Test;
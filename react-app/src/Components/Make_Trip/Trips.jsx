import React, { useEffect } from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { TripsContext } from "../../requests/useContext";
import { post_data } from "../../requests/useFetch";
import Cookies from "js-cookie";

const prices = (luxury, suv, sedan, hatchback, distance) => {
    const date = new Date();
    const hours = date.getHours();

    const luxury_price_per_km = 20;
    const suv_price_per_km = 17;
    const sedan_price_per_km = 15;
    const hatchback_price_per_km = 10;

    let luxury_price=0
    let suv_price=0
    let sedan_price=0
    let hatchback_price=0

    if(luxury === 0)  luxury_price = "No Rides Available"
    else if(distance<(2 * luxury)){
        luxury_price = luxury_price_per_km * distance
    }
    else{ 
        luxury_price = luxury_price_per_km* (distance-2*luxury)
    }


    if(suv === 0)  suv_price = "No Rides Available"
    else if(distance<(2 * suv)) {suv_price = suv_price_per_km * distance}
    else {suv_price = suv_price_per_km * (distance-2*suv)}


    if(sedan === 0)  sedan_price = "No Rides Available"
    else if(distance<(2 * sedan)) {sedan_price = sedan_price_per_km * distance}
    else {sedan_price = sedan_price_per_km * (distance-2*sedan)}

    if(hatchback === 0)  hatchback_price = "No Rides Available"
    else if(distance<(2 * hatchback)) {hatchback_price = hatchback_price_per_km * distance}
    else hatchback_price = hatchback_price_per_km * distance * 0.75


    if(hours >= 6 && hours <= 20){
        // day time
        return [luxury_price, sedan_price,suv_price, hatchback_price]
    }
    else{
        // night time
        return [luxury_price*1.25, sedan_price*1.25,suv_price*1.25, hatchback_price*1.25]
    }
}



const Trips = () => {
    const [image, setImage] = React.useState('Primere-class-vehicle_clipdrop-background-removal 1.png');
    const [name, setName] = React.useState('Taxi Priemer');

    const [time, setTime] = React.useState('00:00');
    const [time_away, setTime_away] = React.useState('1');
    // const [price, setprice] = React.useState('0.000');

    const [time_hatch, setTime_hatch] = React.useState('10:00');
    const [time_away_hatch, setTime_away_hatch] = React.useState('1');
    const [price_hatch, setPrice_hatch] = React.useState('0.000');

    const [time_sedan, setTime_sedan] = React.useState('10:00');
    const [time_away_sedan, setTime_away_sedan] = React.useState('1');
    const [price_sedan, setPrice_sedan] = React.useState('0.000');

    const [time_SUV, setTime_SUV] = React.useState('10:00');
    const [time_away_SUV, setTime_away_SUV] = React.useState('1');
    const [price_SUV, setPrice_SUV] = React.useState('0.000');

    const [time_luxury, setTime_luxury] = React.useState('10:00');
    const [time_away_luxury, setTime_away_luxury] = React.useState('1');
    const [price_luxury, setPrice_luxury] = React.useState('0.000');

    const {main_data, setPrice, price, setDriver} = React.useContext(TripsContext);
    const navigate = useNavigate();

    const Client_ID = JSON.parse(Cookies.get("auth")).details.Client_ID
    const token = Cookies.get("serv_auth");

    console.log(main_data);

    const fun = (img, name, time, time_away, price) => {
        setImage(img);
        setName(name);
        setTime(time);
        setTime_away(time_away);
        setPrice(price);
    }
    const [loading, setloading] = React.useState(true);

    // for setting the prices
    const get_data_cars = async() => {
        let luxury = 0, sedan = 0, suv = 0, hatch = 0;

        console.log(main_data);
        const Source = main_data.Source.split(',')
        const Destination = main_data.Destination.split(',')
        console.log(Source);
        console.log(Destination);

        const res = await post_data(`/Client/drivers_nearby/${Client_ID}/${token}`, {
            curr_lat: Source[1], 
            curr_long: Source[0],
            distance: 2
        })
        console.log("res is", res);


        for(let i=0;i<res.length;i++){
            console.log(res[i]);
        }

        setloading(false);
    }

    useEffect( ()=> {
        // const [lux_cars, sedan_cars, suv_cars, hatch_cars] = get_data_cars();
        get_data_cars();
        // const [luxury, sedan, suv, hatch] = prices();

        // setPrice_luxury(luxury);
        // setPrice_SUV(suv)
        // setPrice_hatch(hatch)
        // setPrice_sedan(sedan)

    }, [])

    return(
        <>
        <Navbar/>
        <div className=" bg-black w-full h-fit p-1 z-100 absolute">
            <div className="bg-[#171426] w-full h-[67vh] rounded-3xl flex">
                {loading ? <img src="hands_waiting.gif" alt="" className=" h-full w-full opacity-[0.6] z-[200] absolute"/>: <></>}
                <div className="Car_Properties flex items-center justify-center w-[30vw] bg-[#171426] h-full rounded-tl-3xl rounded-bl-3xl p-2">
                    <div className="w-[100%] h-full">
                        <div className="h-1/2 mb-2 p-3">
                            <img src={image} alt="No image" className="w-[100%]"/>
                        </div>
                        <div className="text-white flex flex-col items-center justify-center h-[40%]">
                            <p className=" text-4xl mb-3">{name}</p>
                            <p className=" text-sm mb-5"> {time}. <span className="mx-2">{time_away} min Away</span></p>
                            <p className=" text-5xl">{price}</p>
                        </div>
                    </div>
                </div>
                <div className="w-[10px] flex items-center justify-center h-full">
                    <div className=" w-[1.5px] bg-white h-[80%]"></div>
                </div>
                <div className="flex flex-col items-center justify-between h-full w-[69vw] p-2">
                    <p className=" text-white text-xs">Choose a trip or swipe up</p>
                    <div className="h-[90%] w-full p-[2%] flex flex-col items-center justify-around">
                        <div className="w-[95%] bg-[#221D37] h-[23%] rounded-xl flex text-white" onClick={() => {fun('hatchback-ev_clipdrop-background-removal 1.png', "Taxi Hatch", time_hatch, time_away_hatch, price_hatch)}}>
                            <div className="w-[20%] flex items-center justify-center">
                                <img src="hatchback-ev_clipdrop-background-removal 1.png" alt="" className="w-[70%]"/>
                            </div>
                            <div className=" w-[65%] flex flex-col justify-around">
                                <p className=" text-xl h-[2%]">Taxi <span className="mx-1"> </span> Hatch</p>
                                <p className=" font-[mono] text-sm"> {time_hatch}. <span className="mx-1">{time_away_hatch} min Away</span></p>
                            </div>
                            <div className="flex justify-center items-center ">
                                <p className="text-3xl">{price_hatch}</p>
                            </div>
                        </div>
                        <div className="w-[95%] bg-[#221D37] h-[23%] rounded-xl flex text-white" onClick={() => {fun('3d-electric-car-charging-station_clipdrop-background-removal.png', "Taxi SUV", time_SUV, time_away_SUV, price_SUV)}}>
                            <div className=" w-[20%] flex items-center justify-center">
                                <img src="3d-electric-car-charging-station_clipdrop-background-removal.png" alt="" className="w-[70%]"/>
                            </div>
                            <div className=" w-[65%] flex flex-col justify-around">
                                <p className=" text-xl h-[2%]">Taxi <span className="mx-1"> </span> SUV</p>
                                <p className=" font-[mono] text-sm"> {time_SUV}. <span className="mx-1">{time_away_SUV} min Away</span></p>
                            </div>
                            <div className="flex justify-center items-center ">
                                <p className="text-3xl">{price_SUV}</p>
                            </div>
                        </div>
                        <div className="w-[95%] bg-[#221D37] h-[23%] rounded-xl flex text-white" onClick={() => {fun('Primere-class-vehicle_clipdrop-background-removal 1.png', "Taxi Priemer", time_luxury, time_away_luxury, price_luxury)}}>
                            <div className=" w-[20%] flex items-center justify-center">
                                <img src="Primere-class-vehicle_clipdrop-background-removal 1.png" alt="" className="w-[80%]"/>
                            </div>
                            <div className=" w-[65%] flex flex-col justify-around">
                                <p className=" text-xl h-[2%]">Taxi <span className="mx-1"> </span> Priemer</p>
                                <p className=" font-[mono] text-sm"> {time_luxury}. <span className="mx-1">{time_away_luxury} min Away</span></p>
                            </div>
                            <div className="flex justify-center items-center ">
                                <p className="text-3xl">{price_luxury}</p>
                            </div>
                        </div>
                        <div className="w-full flex items-center h-[20%] justify-center ">
                            <button className="w-[80%] h-[80%] bg-[#D90368] rounded-2xl text-white text-2xl" onClick={() => {
                                console.log(main_data);

                                // setloading(true) 
                                // here we will be finding the driver and storing in TripsContext Driver

                                // here we will be finding the driver and if decline = true we will find the new driver

                                navigate("/Confirm_Ride", {state:{main_data : main_data}})
                                window.location.reload()
                            }}>Confirm Ride</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Trips;
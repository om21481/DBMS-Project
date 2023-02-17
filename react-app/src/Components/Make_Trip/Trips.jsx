import React from "react";
import Navbar from "../Navbar";

const Trips = () => {
    const [image, setImage] = React.useState('Primere-class-vehicle_clipdrop-background-removal 1.png');
    const fun = (img) => {
        setImage(img);
    }

    return(
        <>
        <Navbar/>

        <div className=" bg-black w-full h-fit p-1 z-100 absolute">
            <div className="bg-[#171426] w-full h-[67vh] rounded-3xl flex">
                <div className="Car_Properties flex items-center justify-center w-[30vw] bg-[#171426] h-full rounded-tl-3xl rounded-bl-3xl p-2">
                    <div className="w-[100%] h-full">
                        <div className="h-1/2 mb-2 p-3">
                            <img src={image} alt="No image" />
                        </div>
                        <div className="text-white flex flex-col items-center justify-center h-[40%]">
                            <p className=" text-4xl mb-3">Taxi Priemer</p>
                            <p className=" text-sm mb-5"> 12:35. <span className="mx-2">5 min Away</span></p>
                            <p className=" text-5xl">899.123</p>
                        </div>
                    </div>
                </div>
                <div className="w-[10px] flex items-center justify-center h-full">
                    <div className=" w-[1.5px] bg-white h-[80%]"></div>
                </div>
                <div className="flex flex-col items-center justify-between h-full w-[69vw] p-2">
                    <p className=" text-white text-xs">Choose a trip or swipe up</p>
                    <div className="h-[90%] w-full p-[2%] flex flex-col items-center justify-around">
                        <div className="w-[95%] bg-[#221D37] h-[23%] rounded-xl flex text-white" onClick={() => {fun('hatchback-ev_clipdrop-background-removal 1.png')}}>
                            <div className="w-[20%] flex items-center justify-center">
                                <img src="hatchback-ev_clipdrop-background-removal 1.png" alt="" className="w-[70%]"/>
                            </div>
                            <div className=" w-[65%] flex flex-col justify-around">
                                <p className=" text-xl h-[2%]">Taxi <span className="mx-1"> </span> Hatch</p>
                                <p className=" font-[mono] text-sm"> 12:35. <span className="mx-1">5 min Away</span></p>
                            </div>
                            <div className="flex justify-center items-center ">
                                <p className="text-3xl">199.123</p>
                            </div>
                        </div>
                        <div className="w-[95%] bg-[#221D37] h-[23%] rounded-xl flex text-white" onClick={() => {fun('3d-electric-car-charging-station_clipdrop-background-removal.png')}}>
                            <div className=" w-[20%] flex items-center justify-center">
                                <img src="3d-electric-car-charging-station_clipdrop-background-removal.png" alt="" className="w-[70%]"/>
                            </div>
                            <div className=" w-[65%] flex flex-col justify-around">
                                <p className=" text-xl h-[2%]">Taxi <span className="mx-1"> </span> Hatch</p>
                                <p className=" font-[mono] text-sm"> 12:35. <span className="mx-1">5 min Away</span></p>
                            </div>
                            <div className="flex justify-center items-center ">
                                <p className="text-3xl">499.123</p>
                            </div>
                        </div>
                        <div className="w-[95%] bg-[#221D37] h-[23%] rounded-xl flex text-white" onClick={() => {fun('Primere-class-vehicle_clipdrop-background-removal 1.png')}}>
                            <div className=" w-[20%] flex items-center justify-center">
                                <img src="Primere-class-vehicle_clipdrop-background-removal 1.png" alt="" className="w-[80%]"/>
                            </div>
                            <div className=" w-[65%] flex flex-col justify-around">
                                <p className=" text-xl h-[2%]">Taxi <span className="mx-1"> </span> Hatch</p>
                                <p className=" font-[mono] text-sm"> 12:35. <span className="mx-1">5 min Away</span></p>
                            </div>
                            <div className="flex justify-center items-center ">
                                <p className="text-3xl">899.123</p>
                            </div>
                        </div>
                        <div className="w-full flex items-center h-[20%] justify-center ">
                            <button className="w-[80%] h-[80%] bg-[#D90368] rounded-2xl text-white text-2xl">Confirm Ride</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Trips;
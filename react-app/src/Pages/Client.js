import React from "react";
import Make_Trips from "../Components/Make_Trip/Make_Trips.jsx";
import BookARide from "../Components/Book/book_a_ride.jsx";
import { Customer_Details } from "../requests/useContext";

import {BrowserRouter, Routes, Route } from "react-router-dom";

import Test from "../Components/test.js";

const Client = () => {
    return(
        <Customer_Details childeren = {
            <>
            {/* <BrowserRouter>
                <Routes>

                    <Route path='/' element={<BookARide/>}/>
                    <Route path="/MakeTrips" element={<Make_Trips/>}/>
                
                </Routes>
            </BrowserRouter> */}

            <Test/>
            </>   
        }/>
    )
}

export default Client;
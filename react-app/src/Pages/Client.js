import React from "react";
import Make_Trips from "../Components/Make_Trip/Make_Trips.jsx";
import BookARide from "../Components/Book/book_a_ride.jsx";
import { Customer_Details } from "../requests/useContext";

import {BrowserRouter, Routes, Route } from "react-router-dom";

import Test from "../Components/test.js";
import Login from "../Components/login-signup/Login.js";
import SignUp from "../Components/login-signup/SignUp.js"

const Client = () => {
    return(
        <Customer_Details childeren = {
            <>
            <BrowserRouter>
                <Routes>

                    <Route path='/' element={<BookARide/>}/>
                    <Route path="/MakeTrips" element={<Make_Trips/>}/>
                    <Route path="/Login" element={<Login/>}/>
                    <Route path="/SignUp" element={<SignUp/>}/>
                    <Route path="/Test" element={<Test/>}/>
                
                </Routes>
            </BrowserRouter>
            </>   
        }/>
    )
}

export default Client;
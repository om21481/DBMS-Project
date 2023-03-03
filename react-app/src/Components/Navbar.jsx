import React from "react";
import { redirect, useNavigate } from "react-router-dom";
import { CustomerContext } from "../requests/useContext";
import Cookies from "js-cookie";

const Navbar = () => {
    const {login, setlogin, details} = React.useContext(CustomerContext);
    const navigate = useNavigate();
    const logout = () => {
        Cookies.remove("auth");
        setlogin(false)
        navigate("/")
    }

    console.log(login, details);

    return(
        <>
        <div className="w-full p-2 flex items-center justify-between fixed bg-black">
            <div className="w-[15%] ">
                <img src="logo-no-background 2.png" alt="" className="w-full"/>
            </div>
            <div className="w-[60%] flex items-center justify-center">
                <div className="w-[19%] flex items-center justify-center">
                    <img src="icons8-home-64 1.png" alt="" className="w-[20%] mx-[8px]"/>
                    <p className="text-white">HOME</p>
                </div>
                <div className="w-[19%] flex items-center justify-center">
                    <img src="icons8-services-96 1.png" alt="" className="w-[20%] mx-[8px]"/>
                    <p className="text-white">ABOUT US</p>
                </div>
                <div className="w-[19%] flex items-center justify-center">
                    <img src="icons8-trekking-64 1.png" alt="" className="w-[20%] mx-[8px]"/>
                    <p className="text-white">TRIPS</p>
                </div>
                <div className="w-[19%] flex items-center justify-center">
                    <img src="icons8-account-64 1.png" alt="" className="w-[20%] mx-[8px]"/>
                    <p className="text-white">ACCOUNT</p>
                </div>

                {login ? <button className="w-[19%] bg-[#D90368] text-white rounded-xl h-[40px] mx-[1%]" onClick={() => {logout()}}>Log Out</button>
                : <button className="w-[19%] bg-[#D90368] text-white rounded-xl h-[40px] mx-[1%]" onClick={() => {navigate("/login")}}>Sign In</button>}
            </div>
        </div>
        </>
    )
}

export default Navbar;
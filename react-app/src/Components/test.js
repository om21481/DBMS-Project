import React from "react";
import axios from "axios";
import { CustomerContext } from "../requests/useContext";
import { createError, Toast_Container } from "../requests/createErrors";

const Test = () => {

    return(
        <>
            <button onClick={() => {createError("THis is an error")}}>Click Me</button>
            <Toast_Container />
        </>
    )
}

export default Test;
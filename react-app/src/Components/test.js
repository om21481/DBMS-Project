import React from "react";
import axios from "axios";
import { useFetch } from "../requests/useFetch";

import { CustomerContext } from "../requests/useContext";

const Test = () => {
    
    const data = useFetch("/test_locations").data;

    console.log(data);

    console.log("The name is : ", React.useContext(CustomerContext));

    return(
        <>

        </>
    )
}

export default Test;
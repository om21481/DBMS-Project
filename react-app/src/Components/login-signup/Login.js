import React from "react";
import axios from "axios"
import { CustomerContext } from "../../requests/useContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
    const [credentials, setCredentials] = React.useState({
        person: "Client",
        email: undefined,
        password: undefined,
    });
    const {setDetails, setlogin} = React.useContext(CustomerContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const submit = async() => {

        try {
            const res = await axios.post("http://localhost:8000/auth/login", {
                "person" : credentials.person,
                "Email": credentials.email,
                "Password": credentials.password
            });
            
            setDetails(res.data);

            // setting a cookie
            Cookies.set("auth", JSON.stringify(res.data));
            setlogin(true);

            navigate("/");
        } catch (error) {
            console.log("Wrong password or username!!!");           // here will be different code for wromg password and username
        }
    }

    return(
        <>
        <input
          type="text"
          placeholder="email"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
        />
        <button onClick={() => {submit()}} style={{color:"white"}}>Submit</button>
        </>
    )
}

export default Login;


// for logout -- we remove cookies and setlogin to false
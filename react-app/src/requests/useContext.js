import React from "react";

export const CustomerContext = React.createContext();

export const Customer_Details = ({childeren}) => {
    const [details, setDetails] = React.useState();
    const [login, setlogin] = React.useState(false);
    const [token, setToken] = React.useState();

    return (
        <CustomerContext.Provider value = {{
            details,
            setDetails,
            login,
            setlogin,
            token,
            setToken
        }}>
            {childeren}
        </CustomerContext.Provider>
    )
}
import React from "react";

export const CustomerContext = React.createContext();

export const Customer_Details = ({childeren}) => {
    const [details, setDetails] = React.useState();
    const [login, setlogin] = React.useState(false);

    return (
        <CustomerContext.Provider value = {{
            details,
            setDetails,
            login,
            setlogin
        }}>
            {childeren}
        </CustomerContext.Provider>
    )
}
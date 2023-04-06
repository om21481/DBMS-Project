import React from "react";

export const CustomerContext = React.createContext();
export const TripsContext = React.createContext();

export const Customer_Details = ({childeren}) => {
    const [details, setDetails] = React.useState();
    const [login, setlogin] = React.useState(false);
    const [token, setToken] = React.useState();

    const [data, setData] = React.useState();
    const [price, setPrice] = React.useState('0.000');
    const [trip, setTrip] = React.useState(false);

    return (
        <CustomerContext.Provider value = {{details, setDetails, login, setlogin, token, setToken}}>
            <TripsContext.Provider value={{data, setData, price, setPrice, trip, setTrip}}>
                {childeren}
            </TripsContext.Provider>
        </CustomerContext.Provider>
    )
}
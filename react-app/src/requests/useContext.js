import React from "react";

export const CustomerContext = React.createContext();

export const Customer_Details = ({childeren}) => {
    const [name, setName] = React.useState("om garg");
    const [email, setEmail] = React.useState("om21481@iiitd.ac.in");

    return (
        <CustomerContext.Provider value = {{
            name,
            setName,
            email,
            setEmail
        }}>
            {childeren}
        </CustomerContext.Provider>
    )
}
import db from "../index.js";
import { createError } from "../utils/createError.js";
import bcrypt from "bcrypt";

export const create_Client = () => {
    const {FirstName, LastName, DOB, Email, Password} = req.body;
    try {
        const salt = bcrypt.genSaltSync(10);
        Password = bcrypt.hashSync(Password, salt);

        const sql_query = `INSERT INTO client_table (C_First_Name, C_Last_Name, C_DOB, C_Email, C_Password) VALUES (${FirstName}, ${LastName}, ${DOB}, ${Email}, ${Password});`;

        db.query(sql_query, (err, response, feilds) => {
            if(err){
                throw new Error("Error in Creating a client");
            }

            console.log(response);
            res.status(200).send("User is Created Successfully")
        })
        
    } catch (error) {
        return next(error);
    }
}

export const update_Client = () => {
    const Client_ID = req.params.ClientID;
    const {FirstName, LastName, DOB, Email, Password} = req.body;

    try {
        const salt = bcrypt.genSaltSync(10);
        Password = bcrypt.hashSync(Password, salt);

        const sql_query = `UPDATE client_table 
        SET C_First_Name = ${FirstName}, C_Last_Name = ${LastName}, C_DOB = ${DOB}, C_Email = ${Email}, C_Password = ${Password} 
        WHERE Client_ID = ${Client_ID}`;

        db.query(sql_query, (err, response, feilds) => {
            if(err){
                throw new Error("Error in Updating a client");
            }

            console.log(response);
            res.status(200).send("User Updated Successfully")
        })
        
    } catch (error) {
        return next(error);
    }
}

export const update_Client_location = () => {
    const Client_ID = req.params.ClientID;
    const {Current_lat, Current_long} = req.body;

    const sql_query = `UPDATE client_table 
    SET C_Current_Location_lat = ${Current_lat}, C_Current_Location_long = ${Current_long} 
    WHERE Client_ID = ${Client_ID}`;

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            next(createError(404, "Page not found"));
            return;
        }
        console.log(response);
        res.status(200).send("Location Updated Succesfully");
    })
}

export const delete_Client = (req, res, next)=>{
    const Client_ID = req.params.ClientID;

    const sql_query = `DELETE FROM client_table 
    WHERE Client_ID = ${Client_ID}`;

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            next(createError(404, "Page not found"));
            return;
        }
        console.log(response);
        res.status(200).send("Client Deleted Succesfully");
    })
}

export const get_Client = (req, res, next)=>{
    const Client_ID = req.params.ClientID;

    const sql_query = `SELECT * FROM client_table 
    WHERE Client_ID = ${Client_ID}`;

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            next(createError(404, "Page not found"));
            return;
        }

        res.status(200).json(response);
    })
}
export const get_Client_all = (req, res, next)=>{
    const Client_ID = req.params.Client_ID;

    const sql_query = `SELECT * FROM client_table
    WHERE Client_ID = ${Client_ID};`;

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            res.status(404).send("Page not found");
            return;
        }

        res.status(200).json(response);
    })
}

export const add_phone_Client = () => {
    const Client_ID = req.params.Client_ID;
    const {phones} = req.body;

    const sql_query = `SELECT * FROM client_table
    WHERE Client_ID = ${Client_ID}; `;
    for(let i=0;i<phones.length;i++){
        sql_query += `INSERT INTO Client_Phones VALUES(${Client_ID}, ${phones[i]}); \n`
    }

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            res.status(404).send("Page not found");
            return;
        }

        res.status(200).send("Phones inserted successfully");
    })
}


// functionalities

// this will give the drivers near the client who is not busy
export const drivers_nearby = (req, res, next) => {
    const {curr_lat, curr_long} = req.body;
    let distance = req.params.distance;
    distance = (distance*0.015060)*(distance*0.015060);

    const sql_query = `select D_Current_Location_lat, D_Current_Location_long from 
    ((select Driver_ID from driver_table where (${curr_lat} - D_Current_Location_lat)*(${curr_lat} - D_Current_Location_lat)
     + (${curr_long} - D_Current_Location_long) * (${curr_long} - D_Current_Location_long) <= ${distance} and is_busy = false 
    ) intersect select Driver_ID from verification where Accepted_Drivers = true) As T 
    natural join Driver_Table;`;

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            res.status(404).send("Page not found");
            return;
        }

        res.status(200).json(response);
    })

}

// this will give the drivers near the client who is not busy and order them by ratings and give the top one
export const drivers_nearby_type = (req, res, next) => {
    const {curr_lat, curr_long} = req.body;
    let distance = req.params.distance;
    distance = (distance*0.015060)*(distance*0.015060);

    const sql_query = `select * from ((select Driver_ID from 
        driver_table where 
        (${curr_lat} - D_Current_Location_lat) * (${curr_lat} - D_Current_Location_lat) + (${curr_long} - D_Current_Location_long) * (${curr_long} - D_Current_Location_long) <= ${distance} and is_busy = false
    ) intersect select Driver_ID from verification where Accepted_Drivers = true intersect select Driver_ID from Vehicle_Table where Road_Type = 'HIGHWAY') As T
    natural join Driver_Table order by Rating desc;`;

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            res.status(404).send("Page not found");
            return;
        }

        res.status(200).json(response);
    })

}


// we will be given a array here
export const create_rejected_drivers = (req, res, next) => {
    const {rejected_drivers, Trip_ID} = req.body;

    const sql_query = "";
    for(let i=0;i<rejected_drivers.length;i++){
        sql_query += `INSERT INTO Rejected_Drivers VALUES(${rejected_drivers[i]}, ${Trip_ID}); \n`
    }

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            res.status(404).send("Page not found");
            return;
        }

        res.status(200).send("Rejected Drivers inserted successfully");
    })
}

// by admin only -----------------------------------------------------
// get rejected drivers for a particular trip ID
export const get_rejected_trip_ID = (req, res, next) => {
    const {trip_ID} = req.body;

    const sql_query = `SELECT * FROM Rejected_Drivers
    WHERE Trip_ID = ${trip_ID};`;

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            res.status(404).send("Page not found");
            return;
        }

        res.status(200).json(response);
    })
}

// get rejected trips for a particular Driver ID
export const get_rejected_Driver_ID = (req, res, next) => {
    const {Driver_ID} = req.body;

    const sql_query = `SELECT * FROM Rejected_Drivers
    WHERE Driver_ID = ${Driver_ID};`;

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            res.status(404).send("Page not found");
            return;
        }

        res.status(200).json(response);
    })
}

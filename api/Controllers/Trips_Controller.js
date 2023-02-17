import db from "../index.js";
import { createError } from "../utils/createError.js";

export const create_trips = (req, res, next)=>{
    const Client_ID = req.params.Client_ID;
    const {
    Driver_ID,
    End_Lat,
    End_Long, 
    Start_Lat, 
    Start_Long, 
    Amount, 
    Payment_Mode, 
    Distance_Trip, 
    TimeStamp_Pay} = req.body;

    const Trip_ID = Client_ID + Driver_ID + TimeStamp_Pay;
    const sql_query = `INSERT INTO Trips_Table (Trip_ID, Client_ID, Driver_ID, End_Lat, End_Long, Start_Lat, Start_Long, Amount, Payment_Mode, Distance_Trip, TimeStamp_Pay) VALUES 
    (${Trip_ID}, ${Client_ID}, ${Driver_ID}, ${End_Lat}, ${End_Long}, ${Start_Lat}, ${Start_Long}, ${Amount}, ${Payment_Mode}, ${Distance_Trip}, ${TimeStamp_Pay});`;

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            next(createError(404, "Page not found"));
        }
        console.log(response);
        res.status(200).send("Trips Created Succesfully");
    })
}

export const update_trips = (req, res, next)=>{
    const {
    Trip_ID,
    Trip_Rating,
    Feedback} = req.body;

    const sql_query = `UPDATE Trips_Table 
    SET Trip_Rating = ${Trip_Rating}, Feedback = ${Feedback} 
    WHERE Trip_ID = ${Trip_ID}`;

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            next(createError(404, "Page not found"));
            return;
        }
        console.log(response);
        res.status(200).send("Trips Updated Succesfully");
    })
}


export const get_trip = (req, res, next)=>{
    const {Trip_ID} = req.body;
    
    const sql_query = `SELECT * FROM Trips_Table 
    WHERE Trip_ID = ${Trip_ID}`;
    
    db.query(sql_query, (err, response, feilds) => {
        if(err){
            next(createError(404, "Page not found"));
            return;
        }
        
        res.status(200).json(response);
    })
}
export const get_trips_Client = (req, res, next)=>{
    const Client_ID = req.params.Client_ID;
    
    const sql_query = `SELECT * FROM Trips_Table 
    WHERE Client_ID = ${Client_ID};`;
    
    db.query(sql_query, (err, response, feilds) => {
        if(err){
            res.status(404).send("Page not found");
            return;
        }
        
        res.status(200).json(response);
    })
}

// admin functionalities
export const delete_trips = (req, res, next)=>{
    const {Trip_ID} = req.body;

    const sql_query = `DELETE FROM Trips_Table 
    WHERE Trip_ID = ${Trip_ID}`;

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            next(createError(404, "Page not found"));
            return;
        }
        console.log(response);
        res.status(200).send("Trips Deleted Succesfully");
    })
}

export const get_all_trips = (req, res, next) => {
    const {Trip_ID} = req.body;

    const sql_query = `SELECT * FROM Trips_Table`;

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            next(createError(404, "Page not found"));
            return;
        }
        res.status(200).json(response);
    })
}
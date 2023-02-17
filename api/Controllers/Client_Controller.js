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
        sql_query += `INSERT INTO Client_Phones VALUES(${Client_ID}, ${phones[i]}); `
    }

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            res.status(404).send("Page not found");
            return;
        }

        res.status(200).send("Phones inserted successfully");
    })
}

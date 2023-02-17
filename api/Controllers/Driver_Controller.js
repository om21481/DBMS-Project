import db from "../index.js";
import { createError } from "../utils/createError.js";
import bcrypt from "bcrypt";

export const create_Driver = (req, res, next) => {
    const {FirstName, LastName, DOB, Email, Password} = req.body;
    try {
        const salt = bcrypt.genSaltSync(10);
        Password = bcrypt.hashSync(Password, salt);

        const sql_query = `INSERT INTO Driver_Table (D_First_Name, D_Last_Name, D_DOB, D_Email, D_Password) VALUES (${FirstName}, ${LastName}, ${DOB}, ${Email}, ${Password});`;

        db.query(sql_query, (err, response, feilds) => {
            if(err){
                throw new Error("Error in Creating a Driver");
            }

            console.log(response);
            res.status(200).send("User is Created Successfully")
        })
        
    } catch (error) {
        return next(error);
    }
}

export const update_Driver = (req, res, next) => {
    const Driver_ID = req.params.DriverID;
    const {FirstName, LastName, DOB, Email, Password} = req.body;

    try {
        const salt = bcrypt.genSaltSync(10);
        Password = bcrypt.hashSync(Password, salt);

        const sql_query = `UPDATE Driver_Table 
        SET D_First_Name = ${FirstName}, D_Last_Name = ${LastName}, D_DOB = ${DOB}, D_Email = ${Email}, D_Password = ${Password} 
        WHERE Driver_ID = ${Driver_ID}`;

        db.query(sql_query, (err, response, feilds) => {
            if(err){
                throw new Error("Error in Updating a Driver");
            }

            console.log(response);
            res.status(200).send("User Updated Successfully")
        })
        
    } catch (error) {
        return next(error);
    }
}

export const update_Driver_location = (req, res, next) => {
    const Driver_ID = req.params.DriverID;
    const {Current_lat, Current_long} = req.body;

    const sql_query = `UPDATE Driver_Table 
    SET D_Current_Location_lat = ${Current_lat}, D_Current_Location_long = ${Current_long} 
    WHERE Driver_ID = ${Driver_ID}`;

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            next(createError(404, "Page not found"));
            return;
        }
        console.log(response);
        res.status(200).send("Location Updated Succesfully");
    })
}

export const delete_Driver = (req, res, next)=>{
    const Driver_ID = req.params.DriverID;

    const sql_query = `DELETE FROM Driver_Table 
    WHERE Driver_ID = ${Driver_ID}`;

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            next(createError(404, "Page not found"));
            return;
        }
        console.log(response);
        res.status(200).send("Driver Deleted Succesfully");
    })
}

export const get_Driver = (req, res, next)=>{
    const Driver_ID = req.params.DriverID;

    const sql_query = `SELECT * FROM Driver_Table 
    WHERE Driver_ID = ${Driver_ID}`;

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            next(createError(404, "Page not found"));
            return;
        }

        res.status(200).json(response);
    })
}
export const get_Driver_all = (req, res, next)=>{
    const Driver_ID = req.params.Driver_ID;

    const sql_query = `SELECT * FROM Driver_Table
    WHERE Driver_ID = ${Driver_ID};`;

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            res.status(404).send("Page not found");
            return;
        }

        res.status(200).json(response);
    })
}

export const add_phone_Driver = (req, res, next) => {
    const Driver_ID = req.params.Driver_ID;
    const {phones} = req.body;

    const sql_query = `SELECT * FROM Driver_Table
    WHERE Driver_ID = ${Driver_ID}; `;
    for(let i=0;i<phones.length;i++){
        sql_query += `INSERT INTO Driver_Phones VALUES(${Driver_ID}, ${phones[i]}); `
    }

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            res.status(404).send("Page not found");
            return;
        }

        res.status(200).send("Phones inserted successfully");
    })
}

import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../index.js";
import { createError } from "../utils/createError.js";

export const register = (req, res, next) => {
    const {person, FirstName, LastName, DOB, Email, Password} = req.body;

    try {
        const salt = bcrypt.genSaltSync(10);
        Password = bcrypt.hashSync(Password, salt);

        const sql_query = "";

        if(person == "Driver"){
            sql_query = `INSERT INTO Driver_Table (D_First_Name, D_Last_Name, D_DOB, D_Email, D_Password) VALUES (${FirstName}, ${LastName}, ${DOB}, ${Email}, ${Password});`;
        }
        else if(person == "Client"){
            sql_query = `INSERT INTO client_table (C_First_Name, C_Last_Name, C_DOB, C_Email, C_Password) VALUES (${FirstName}, ${LastName}, ${DOB}, ${Email}, ${Password});`;
        }
        else{
            return next(createError(400, "Please enter as a client or driver"));
        }

        db.query(sql_query, (err, response, feilds) => {
            if(err){
                throw new Error("Error in Registration");
            }

            console.log(response);
            res.status(200).send("User is Registered Successfully")
        })
        
    } catch (error) {
        return next(error);
    }
}

export const login = async (req, res, next) => {
    const {person, Email, Password} = req.body;
    try {        
        let sql_query = "";
        if(person === "Driver"){
            sql_query = `SELECT * FROM Driver_Table 
            WHERE D_Email = ${Email};`;
        }
        else if(person === "Client"){
            sql_query = `SELECT * FROM client_table 
            WHERE C_Email = "${Email}";`;
        }
        else{
            return next(createError(400, "Please enter as a client or driver"));
        }
        
        // Check in Client and Driver Database;
        db.query(sql_query, async (err, response, feilds) => {
            if(err){
                return next(createError(404, "User not found!"));
            }
            var user = {};
            var isAdmin = false;

            const isPasswordCorrect = await bcrypt.compare(
                Password,
                user.C_Password
            );
            if (!isPasswordCorrect) return next(createError(400, "Wrong password or username!"));

            user = response[0];
            const token = Jwt.sign(
                { id: user.Client_ID, isAdmin: isAdmin},
                process.env.JWT
            );
          
            const {C_Email, C_Password, ...otherDetails } = user;
    
            res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json({ details: { ...otherDetails }, isAdmin });
        })
        
    } catch (error) {
        return next(error);
    }
}


// we have to  make one query such that it finds admin or client on one go
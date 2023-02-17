import Express  from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config()

import Trips_Router from "./Routes/Trips.js"
import Auth_Router from "./Routes/auth.js"
import ClientRouter from "./Routes/Client.js"
import Driver_Router from "./Routes/Driver.js"
import Vehicle_Router from "./Routes/Vehicle.js"
import Admin_Router from "./Routes/admin.js"

const app = new Express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'OmGarg8700@',
    database: 'TaxiWala'
  });

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("Connected to database");
})


app.use(Express.json())
app.use("/Trips", Trips_Router);
app.use("/auth", Auth_Router);
app.use("/Client", ClientRouter);
app.use("/Driver", Driver_Router);
app.use("/Vehicle", Vehicle_Router);
app.use("/Admin", Admin_Router);

app.use((err, req, res, next) => {
  console.log("Inside this");
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.get("/", (req, res) => {
    res.json("Server designed by om garg")
})

app.listen(8000, () => {
    console.log("Listening on port 8000");
})

export default db;
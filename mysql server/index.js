import Express from "express";
import mysql from "mysql2";

const app = Express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'OmGarg8700@',
    database: 'temp'
  });

db.connect((err) => {
    if(err){
        throw err;
    }

    console.log("Connected to database");
})

app.use(Express.json())
app.get("/", (req, res)=>{
    const sql = "CREATE DATABASE temp";
    db.query(sql, (err, results, feilds) => {
        res.send(err, results, feilds)
        console.log("Database Created");
    })
})

app.get("/show", (req, res)=>{
    const sql = "SELECT * FROM table1";
    db.query(sql, (err, results, feilds) => {
        res.send(results);
        console.log(feilds);
    })
})

app.post("/insert", (req, res) => {
    const {name} = req.body;
    const sql = `INSERT INTO table1 VALUES("${name}")`;

    db.query(sql, (err, results, feilds) => {
        res.send("DATA inserted Succesfully");
        console.log(err);
    })
})

app.listen(8700, ()=>{
    console.log("Server has started and listening on port 8000");
})
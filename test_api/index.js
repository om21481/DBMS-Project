import Express from "express";
const app = Express();
import cors from "cors"

app.use(cors())

app.get("/", (req, res)=>{
    res.send("Hello wolrd");
})

app.post("/post", (req, res)=>{
    res.send("Post is called");
})

app.get("/post", (req, res)=>{
    res.send("Post is called of get")
})

app.listen(9000, ()=>{
    console.log("Listening");
})
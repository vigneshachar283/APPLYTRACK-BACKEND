const express = require("express");
const app = express();

require("dotenv").config();

const connectDB= require("./config/db")
const router=require("./routes/authRoutes")

const appRoutes=require("./routes/appRoutes")


app.use(express.json());

app.use("/user",router);

app.use("/user",appRoutes)

const port = process.env.PORT || 3000;



connectDB();


app.get("/",(req,res)=>{
    res.send("APPLY TRACK IS RUNNING ")
})
















app.listen(port,()=>{
    console.log(`Server is ruuning on the port ${port} `);
}
)
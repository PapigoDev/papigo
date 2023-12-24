const express=require("express")
const cors=require("cors")
require("dotenv").config()

const app=express()
app.get("/",(req,res)=>res.send("hello"))
app.get("/health",(req,res)=>res.send("OK"))
app.use(express.json())
app.use(cors());
const PORT=process.env.PORT || 5001

//mongoose here (mongoDB)
const dbConfig=require("./config/dbConfig")
const cloudinaryConfig=require("./config/cloudinaryConfig")

//routes
const walkersRoute=require("./routes/walkersRoute")
const detailsRoute=require("./routes/detailsRoute")
const usersRoute=require("./routes/usersRoute")


app.use("/api/papigo",walkersRoute)
app.use("/api/papigo",detailsRoute)
app.use("/api/papigo",usersRoute)


app.listen(PORT,()=>{
    console.log(`${PORT}`)
})
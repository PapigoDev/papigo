const express=require("express")
const cors=require("cors")
require("dotenv").config()

const app=express()
app.get("/",(req,res)=>res.send("hello"))
app.use(express.json())
app.use(cors());
const PORT=process.env.PORT || 5001

//mongoose here (mongoDB)
const dbConfig=require("./config/dbConfig")
const cloudinaryConfig=require("./config/cloudinaryConfig")

//routes
const servicesRoute=require("./routes/servicesRoute")
const detailsRoute=require("./routes/detailsRoute")
const usersRoute=require("./routes/userRoute")


app.use("/api/papigo",servicesRoute)
app.use("/api/papigo",detailsRoute)
app.use("/api/papigo",usersRoute)


app.listen(PORT,()=>{
    console.log(`${PORT}`)
})
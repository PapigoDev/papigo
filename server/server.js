const express=require("express")
const cors=require("cors")
require("dotenv").config()

const app=express()

app.use(express.json())
app.use(cors());
const PORT=process.env.PORT || 5001

//mongoose here (mongoDB)
const dbConfig=require("./config/dbConfig")

//routes
const servicesRoute=require("./routes/servicesRoute")
const detailsRoute=require("./routes/detailsRoute")


app.use("/api/papigo",servicesRoute)
app.use("/api/papigo",detailsRoute)


app.listen(PORT,()=>{
    console.log(`${PORT}`)
})
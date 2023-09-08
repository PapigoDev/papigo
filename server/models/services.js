const mongoose = require("mongoose")
const servicesSchema = new mongoose.Schema(
    {
        image: { type: Array,default:[] },
        name: { type: String, },
        specialty: { type: String},
        adress: { type: String},
        price: { type: Number},
    },
    {
        timestamps: true
    }
)

const Services = mongoose.model("services", servicesSchema)
module.exports = Services
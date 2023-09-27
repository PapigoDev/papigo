const mongoose = require("mongoose");
const nameSchema = {
    en: String,
    ru: String,
    az: String,
};
const servicesSchema = new mongoose.Schema(
    {
        image: { type: Array, default: [] },
        name: nameSchema,
        specialty: nameSchema,
        address: nameSchema,
        price: { type: Number },
    },
    {
        timestamps: true,
    }
);

const Services = mongoose.model("services", servicesSchema);
module.exports = Services;

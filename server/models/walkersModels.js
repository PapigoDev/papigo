const mongoose = require("mongoose");
const nameSchema = {
    en: String,
    ru: String,
    az: String,
};
const walkersSchema = new mongoose.Schema(
    {
        image: { type: Array },
        name: nameSchema,
        specialty: nameSchema,
        address: nameSchema,
        price: { type: Number },
        mobile:{ type: Number },
    },
    {
        timestamps: true,
    }
);

const Walkers = mongoose.model("walkers", walkersSchema);
module.exports = Walkers;

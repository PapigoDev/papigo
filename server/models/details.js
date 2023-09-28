const mongoose = require('mongoose');


const nameSchema = new mongoose.Schema({
    az: String,
    ru: String,
    en: String
});

const detailsSchema = new mongoose.Schema({
    images: [String],
    description: nameSchema,
    paket: [
        {
            name: String,
            price: Number,
            weekWalker: nameSchema
        }
    ],
    service: String
});

const Details = mongoose.model('details', detailsSchema);

module.exports = Details;
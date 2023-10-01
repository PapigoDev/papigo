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
    walker: {type:mongoose.Schema.Types.ObjectId,ref:"walkers",required:true}
});

const Details = mongoose.model('details', detailsSchema);

module.exports = Details;
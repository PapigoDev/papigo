const mongoose = require("mongoose");

const detailsSchema = new mongoose.Schema(
  {
    images: { type: Array, default: [] },
    description: { type: String },
    paket: [
      {
        name: String,
        price: Number
      }
    ],
    service: { type: mongoose.Schema.Types.ObjectId, ref: "services" }
  },
  {
    timestamps: true
  }
);

const Details = mongoose.model("details", detailsSchema);
module.exports = Details;

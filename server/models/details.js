const mongoose = require("mongoose");

const descriptionSchema = {
  az: String,
  ru: String,
  en: String,
};
const weekWalkSchema = {
  az: String,
  ru: String,
  en: String,
};

const detailsSchema = new mongoose.Schema(
  {
    images: { type: Array, default: [] },
    description: descriptionSchema,
    paket: [
      {
        name: String,
        price: Number,
        weekWalk:weekWalkSchema
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

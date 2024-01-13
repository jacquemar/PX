const mongoose = require("mongoose");

const produitShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Produit", produitShema);

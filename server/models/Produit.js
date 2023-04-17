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
  price: {
    type: Number,
    required: true,
  },
  cover: {
    type: String,
    required: false,
  },
});
module.exports = mongoose.model("Produit", produitShema);

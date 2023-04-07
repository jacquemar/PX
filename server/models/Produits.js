const mongoose = require("mongoose");

const produitsShema = new mongoose.Schema({
  produitName: {
    type: String,
    required: true,
  },
  produitCategorie: {
    type: String,
    required: true,
  },
  produitgender: {
    type: String,
    required: true,
  },
  produitprice: {
    type: Number,
    required: true,
  },
  produitCover: {
    type: String,
    required: false,
  },
});
module.exports = mongoose.model("produits", produitsShema);

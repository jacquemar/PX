const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  cartItems: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      // ... détails de l'article
    },
  ],
  selectedCommune: String,
  selectedMethod: String,
  deliveryMethod: String,
  deliveryPrice: Number,
  totalPrice: Number,
  phoneNumber: String,
  ticketNumber: String,
  orderDate: String,

  // ... autres champs de la commande
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;

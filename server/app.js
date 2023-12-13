const express = require("express");
require("dotenv").config();
const cors = require("cors");

const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Dossier local pour stocker temporairement les fichiers
  },
  filename: function (req, file, cb) {
    const name = file.originalname.split("").join("_");
    const extension = MIME_TYPES[file.mimetype];
    cb(null, name + Date.now() + "." + extension);
  },
});

const upload = multer({ storage: storage });

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Augmenter la limite de taille maximale à 50 Mo
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
const cloudinary = require("cloudinary").v2;
const cloudconfig = require("./cloudinary");

const mongoose = require("mongoose");

const Product = require("./models/Produit");
const Ticket = require("./models/Ticket");

mongoose
  .connect(
    "mongodb+srv://jacquemar:o85pxev28Rl0qapG@products.mht5fkp.mongodb.net/?retryWrites=true&writeConcern=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

app.post("/upload", upload.single("file"), async (req, res, next) => {
  const { name, category, gender, price } = req.body;

  try {
    const file = req.file;
    if (!file) {
      return res
        .status(400)
        .json({ error: "Aucun fichier n'a été téléchargé." });
    }

    // Utilisation de Cloudinary pour téléverser le fichier depuis le dossier local
    const result = await cloudinary.uploader.upload(file.path);

    const produit = new Product({
      name: name,
      category: category,
      gender: gender,
      price: price,
      cover: result.secure_url,
    });

    // Enregistrez le produit dans la base de données MongoDB
    await produit.save();
    return res.status(201).json({ message: "Produit ajouté !" });
  } catch (error) {
    console.error("Erreur lors du téléchargement de l'image :", error);
    return res
      .status(500)
      .json({ error: "Erreur lors du téléchargement de l'image" });
  }
});

app.get("/list", (req, res) => {
  Product.find()
    .then((products) => res.status(200).json(products))
    .catch((error) => res.status(400).json({ error }));
});
app.get("/product/:id", (req, res) => {
  Product.findOne({ _id: req.params.id })
    .then((products) => res.status(200).json(products))
    .catch((error) => res.status(404).json({ error }));
});

app.get("/ticket-list", (req, res) => {
  Ticket.find()
    .then((tickets) => res.status(200).json(tickets))
    .catch((error) => res.status(400).json({ error }));
});

// Route pour supprimer un produit par son ID
app.delete("/products/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Produit non trouvé" });
    }

    res.status(200).json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du produit :", error);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la suppression du produit" });
  }
});

// Route pour supprimer un ticket par son ID
app.delete("/ticket/:id", async (req, res) => {
  const ticketId = req.params.id;
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(ticketId);

    if (!deletedTicket) {
      return res.status(404).json({ error: "Ticket non trouvé" });
    }

    res.status(200).json({ message: "Ticket supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du ticket :", error);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la suppression du ticket" });
  }
});

app.get("/tickets-by-numbers", async (req, res) => {
  try {
    const ticketList = req.query.ticketList;
    const ticketNumbers = ticketList.split(","); // Convertir la chaîne en tableau de numéros
    const mesTickets = await Ticket.find({
      ticketNumber: { $in: ticketNumbers },
    }); // Utiliser ticketNumbers
    res.status(200).json(mesTickets);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des tickets" });
  }
});

app.post("/create-order", async (req, res) => {
  const {
    cartItems,
    selectedCommune,
    selectedMethod,
    deliveryMethod,
    deliveryPrice,
    totalPrice,
    phoneNumber,
    ticketNumber,
    orderDate,
    // ... données de la commande
  } = req.body;

  try {
    const ticket = new Ticket({
      cartItems,
      selectedCommune,
      selectedMethod,
      deliveryMethod,
      deliveryPrice,
      totalPrice,
      phoneNumber,
      ticketNumber,
      // ... données de la commande
    });

    await ticket.save();

    res.status(201).json({ message: "Commande enregistrée avec succès" });
  } catch (error) {
    console.error(
      "Erreur lors de l'enregistrement du ticket ou de la commande dans Notion :",
      error
    );
    return res.status(500).json({
      error:
        "Erreur lors de l'enregistrement du ticket ou de la commande dans Notion",
    });
  }
});

module.exports = app;

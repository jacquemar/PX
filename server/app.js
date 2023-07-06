const express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Augmenter la limite de taille maximale à 50 Mo
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

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

mongoose
  .connect(
    "mongodb+srv://jacquemar:o85pxev28Rl0qapG@products.mht5fkp.mongodb.net/?retryWrites=true&writeConcern=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.post("/upload", async (req, res) => {
  const { name, category, gender, price, cover } = req.body;
  try {
    const uploadResult = await cloudinary.uploader.upload(cover);
    console.log(uploadResult.url);

    const produit = new Product({
      name: name,
      category: category,
      gender: gender,
      price: price,
      cover: uploadResult.url,
    });
    console.log(produit);

    produit
      .save()
      .then(() => res.status(201).json({ message: "Produit ajouté !" }))
      .catch((error) => res.status(400).json({ error }));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erreur lors de l'upload de l'image" });
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

module.exports = app;

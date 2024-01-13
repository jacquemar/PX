const express = require("express");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");

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

// <-------------------------ENPOINTS-----------------------> //

// <--------------- RESEARCH END POINT ---------------> //

app.get("/search", async (req, res) => {
  const searchTerm = req.query.q; // RécupéreR le terme de recherche depuis la requête

  try {
    const results = await Product.find({
      // Utilisez l'opérateur $regex pour effectuer une recherche textuelle
      $or: [
        { name: { $regex: searchTerm, $options: "i" } }, // "i" pour une recherche insensible à la casse
        { category: { $regex: searchTerm, $options: "i" } },
        // Ajoutez d'autres champs sur lesquels vous souhaitez effectuer la recherche
      ],
    });

    res.status(200).json(results);
  } catch (error) {
    console.error("Erreur lors de la recherche :", error);
    res.status(500).json({ error: "Erreur serveur lors de la recherche" });
  }
});
// ---------------------------------------------------------------------------------------------------//``

// <---------------------------- ORANGE SMS API ---------------------------------->

const clientId = process.env.ORANGE_SMS_CLIENT_ID;
const clientSecret = process.env.ORANGE_SMS_CLIENT_SECRET;
const apiKey = process.env.ORANGE_API_KEY;

// Encodage des identifiants pour créer l'en-tête d'autorisation
const authHeader = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString(
  "base64"
)}`;

const apiBaseUrl = "https://api.orange.com/smsmessaging/v1";

const sendSMS = async (phoneNumber, message) => {
  const url = `${apiBaseUrl}/outbound/tel:${phoneNumber}/requests`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authHeader}`,
  };

  const payload = {
    outboundSMSMessageRequest: {
      senderAddress: "tel:+2250777293456",
      outboundSMSTextMessage: { message },
    },
  };

  try {
    const response = await axios.post(url, payload, { headers });
    console.log("SMS envoyé avec succès:", response.data);
  } catch (error) {
    console.error("Erreur lors de l'envoi du SMS:", error.response.data);
  }
};

// ROUTE POUR L'ENVOI D'SMS //

app.post("/send-sms", async (req, res) => {
  const { phoneNumber, message } = req.body;

  try {
    // Appelez la fonction sendSMS avec les paramètres requis
    await sendSMS(phoneNumber, message);

    res.status(200).json({ message: "SMS envoyé avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'envoi du SMS :", error);
    res.status(500).json({ error: "Erreur serveur lors de l'envoi du SMS" });
  }
});

// <------------------------- categories ------------------------------------> //

app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la récupération des catégories",
    });
  }
});

app.post("/upload", upload.single("file"), async (req, res, next) => {
  const currentDate = new Date().toISOString();
  const ProductdbId = process.env.NOTION_PRODUCT_DATABASE_ID;
  const { name, category, gender, price, description } = req.body;

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
      description: description,
    });

    // Enregistrez le produit dans la base de données MongoDB
    await produit.save();
    const newPage = await notion.pages.create({
      parent: {
        type: "database_id",
        database_id: ProductdbId,
      },
      properties: {
        "Nom du produit": {
          title: [
            {
              text: {
                content: produit.name,
              },
            },
          ],
        },
        Genre: {
          select: {
            name: produit.gender,
          },
        },
        Catégorie: {
          select: {
            name: produit.category,
          },
        },
        Prix: {
          number: produit.price,
        },
        Date: {
          date: {
            start: currentDate,
          },
        },
        Images: {
          files: [
            {
              name: produit.name,
              external: {
                url: produit.cover,
              },
            },
          ],
        },
      },
    });
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
  const currentDate = new Date().toISOString();
  const {
    dbId = "2e332d43-1242-4118-a0ce-b7b94a48ecfe",
    https: cartItems,
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
      orderDate,
    });
    await ticket.save();
    const newPage = await notion.pages.create({
      parent: {
        type: "database_id",
        database_id: dbId,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: ticketNumber,
              },
            },
          ],
        },
        Commune: {
          select: {
            name: selectedCommune,
          },
        },
        Prix: {
          number: totalPrice,
        },
        Date: {
          date: {
            start: currentDate,
          },
        },
        "Prix de livraison": {
          phone_number: deliveryPrice,
        },
        Téléphone: {
          phone_number: phoneNumber,
        },
        "Méthode de paiement": {
          select: {
            name: selectedMethod,
          },
        },
        "Méthode de livraison": {
          select: {
            name: deliveryMethod,
          },
        },
      },
    });
    res
      .status(201)
      .json({ message: "Commande enregistrée avec succès", data: newPage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error:
        "Erreur lors de l'enregistrement du ticket ou de la commande dans Notion",
    });
  }
});

// NOTION MIDDLEWARE

// Create new database. The page ID is set in the environment variables.
app.post("/databases", async function (request, response) {
  const pageId = process.env.NOTION_DATABASE_ID;
  const title = request.body.dbName;

  try {
    const newDb = await notion.databases.create({
      parent: {
        type: "page_id",
        page_id: pageId,
      },
      title: [
        {
          type: "text",
          text: {
            content: title,
          },
        },
      ],
      properties: {
        Name: {
          title: {},
        },
      },
    });
    response.json({ message: "success!", data: newDb });
  } catch (error) {
    response.json({ message: "error", error });
  }
});

// Create new page. The database ID is provided in the web form.
app.post("/pages", async function (request, response) {
  const { dbId, pageName, header } = request.body;

  try {
    const newPage = await notion.pages.create({
      parent: {
        type: "database_id",
        database_id: dbId,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: pageName,
              },
            },
          ],
        },
      },
    });
    response.json({ message: "success!", data: newPage });
  } catch (error) {
    response.json({ message: "error", error });
  }
});

module.exports = app;

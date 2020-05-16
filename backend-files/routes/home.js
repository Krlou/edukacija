const express = require("express");
const router = express.Router();

const { Book } = require("../models/book");
const { Request } = require("../models/request");

//obrada get zahteva: prvi parametar je url kome korisnik zeli da pristupi, a drugi parametar je callback funkcija route handler
router.get("/", async (req, res) => {
  const books = await Book.find()
    .select("-__v")
    .sort("title");
  res.send(books);
});

//obrada delete zahteva: prvi parametar je url kome korisnik zeli da pristupi, a drugi parametar je callback funkcija route handler
router.delete("/:id", async (req, res) => {
  const result = await Book.remove({ _id: req.params.id });
  if (result.deletedCount === 0) {
    return res
      .status(404)
      .send("Udžbenik koji želite da uklonite je već obrisan.");
  }
});

//obrada get zahteva: prvi parametar je url kome korisnik zeli da pristupi, a drugi parametar je callback funkcija route handler
router.get("/:id", async (req, res) => {
  const requests = await Request.find({ userId: req.params.id });
  res.send(requests);
});

module.exports = router;

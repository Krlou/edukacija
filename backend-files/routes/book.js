const express = require("express");
const router = express.Router();

const { Page } = require("../models/page");
const { Book } = require("../models/book");
const { Request } = require("../models/request");

//obrada get zahteva: prvi parametar je url kome korisnik zeli da pristupi, a drugi parametar je callback funkcija route handler
router.get("/:id", async (req, res) => {
  const pages = await Page.find({ bookId: req.params.id }).select("-__v");
  const book = await Book.findById(req.params.id).select(
    "title course authorId authorName"
  );
  res.send({ pages, book });
});

//obrada post zahteva: prvi parametar je url kome korisnik zeli da pristupi, a drugi parametar je callback funkcija route handler
router.post("/:id", async (req, res) => {
  const request = await Request.findOne({
    title: req.body.title,
    authorId: req.body.authorId,
    userId: req.body.userId
  });
  res.send({ request });
});

module.exports = router;

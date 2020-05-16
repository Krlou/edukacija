const express = require("express");
const router = express.Router();

const { Book } = require("../models/book");
const { Request, validate } = require("../models/request");

//obrada get zahteva: prvi parametar je url kome korisnik zeli da pristupi, a drugi parametar je callback funkcija route handler
router.get("/", async (req, res) => {
  const books = await Book.find()
    .select("-__v")
    .sort("title");
  res.send(books);
});

//obrada post zahteva: prvi parametar je url kome korisnik zeli da pristupi, a drugi parametar je callback funkcija route handler
router.post("/", async (req, res) => {
  const bookId = req.body.bookId;
  const likedBooks = req.body.likedBooks;
  await Book.updateOne(
    { _id: bookId },
    {
      $set: {
        liked: likedBooks
      }
    }
  );
});

//obrada post zahteva: prvi parametar je url kome korisnik zeli da pristupi, a drugi parametar je callback funkcija route handler
router.post("/:id", async (req, res) => {
  //kreiranje objekta na osnovu podataka prosledjenih u zahtevu
  const reqObj = {
    title: req.body.book.title,
    userId: req.body.user._id,
    authorId: req.body.book.authorId,
    userName: `${req.body.user.firstName} ${req.body.user.lastName}`,
    status: "u obradi"
  };

  //provera da li su podaci koje je korisnik prosledio validni
  const { error } = validate(reqObj);
  if (error) return res.status(400).send(error.details[0].message);

  //provera da li zahtev postoji u bazi podataka
  let request = await Request.findOne(reqObj);
  if (request)
    return res
      .status(400)
      .send("Zahtev za ovaj udžbenik ste već poslali, i on je obrađen.");

  //kreiranje novog zahteva
  request = new Request(reqObj);

  await request.save();
});

module.exports = router;

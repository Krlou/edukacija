const express = require("express");
const router = express.Router();

const { Book, validate } = require("../models/book");
const { Page, validatePage } = require("../models/page");

//obrada post zahteva: prvi parametar je url kome korisnik zeli da pristupi, a drugi parametar je callback funkcija route handler
router.post("/", async (req, res) => {
  //provera da li su podaci koje je korisnik prosledio validni
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //provera da li korisnik postoji u bazi podataka
  let book = await Book.findOne({
    authorId: req.body.authorId,
    title: req.body.title,
    course: req.body.course
  });
  if (book)
    return res
      .status(400)
      .send(
        "Autor je već kreirao knjigu sa identičnim nazivom i iz istog predmeta."
      );

  //kreiranje novog dokumenta
  book = new Book({
    authorId: req.body.authorId,
    authorName: req.body.authorName,
    title: req.body.title,
    course: req.body.course
  });

  book = await book.save();

  res.send(book);
});

//obrada post zahteva: prvi parametar je url kome korisnik zeli da pristupi, a drugi parametar je callback funkcija route handler
router.post("/:pageNumber", async (req, res) => {
  if (req.body.templateNum === 3) {
    validateObj = {
      bookId: req.body.bookId,
      pageNumber: req.params.pageNumber,
      templateNum: req.body.templateNum,
      textContent: req.body.textContent,
      videoLink: req.body.videoLink
    };
  } else {
    validateObj = {
      bookId: req.body.bookId,
      pageNumber: req.params.pageNumber,
      templateNum: req.body.templateNum,
      textContent: req.body.textContent
    };
  }

  //provera da li su podaci koje je korisnik prosledio validni
  const { error } = validatePage(validateObj);
  if (error) return res.status(400).send(error.details[0].message);

  //provera da li korisnik postoji u bazi podataka
  let page = await Page.findOne({
    bookId: req.body.bookId,
    pageNumber: req.params.pageNumber
  });
  if (page)
    return res
      .status(400)
      .send(
        "Autor je već kreirao stranicu sa identičnim brojem iz iste knjige."
      );

  //kreiranje novog dokumenta
  page = new Page(validateObj);

  await page.save();

  res.send(page); //nikako ne brisi!
});

module.exports = router;

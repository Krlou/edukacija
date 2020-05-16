const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi); //paket za validaciju mongoDB objectId

/*
knjiga se kreira u bazi kada postoji ulogovani korisnik koji nije student
u jwt ulogovanog korisnika imamo _id, username, firstName, lastName: odatle cemo da prosledimo pri kreiranju knjige 
*/

//kreiranje seme(analogno tabeli u mySql)
const bookSchema = new mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  authorName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  course: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  liked: [mongoose.Schema.Types.ObjectId] //niz koji sadrzi authorId
});

const Book = mongoose.model("Book", bookSchema); //kompajliranje seme u model cime se dobija klasa Book

//funkcija za validaciju podataka koriscenjem npm paketa Joi
function validateBook(book) {
  const schema = {
    authorId: Joi.objectId().required(),
    authorName: Joi.string()
      .min(5)
      .max(50)
      .required(),
    title: Joi.string()
      .min(2)
      .max(50)
      .required(),
    course: Joi.string()
      .min(2)
      .max(50)
      .required()
  };
  return Joi.validate(book, schema);
}

module.exports.Book = Book;
module.exports.bookSchema = bookSchema;
module.exports.validate = validateBook; //obratiti paznju da se funkcija validateBook izvozi kao validate

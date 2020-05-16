const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi); //paket za validaciju mongoDB objectId

const pageSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  templateNum: {
    type: Number,
    min: 1, //{1=tekst, 2=slika, 3=video}
    max: 3,
    required: true
  },
  textContent: {
    type: String,
    minlength: 5,
    required: true
  },
  pageNumber: {
    type: Number,
    min: 0,
    required: true
  },
  videoLink: {
    type: String
  }
});

const Page = mongoose.model("Page", pageSchema);

function validatePage(page) {
  const schema = {
    bookId: Joi.objectId().required(),
    templateNum: Joi.number()
      .min(1)
      .max(3)
      .required(),
    textContent: Joi.string()
      .min(5)
      .required(),
    pageNumber: Joi.number()
      .min(0)
      .required(),
    videoLink: Joi.string().allow("")
  };
  return Joi.validate(page, schema);
}

module.exports.Page = Page;
module.exports.pageSchema = pageSchema;
module.exports.validatePage = validatePage; //obratiti paznju da se funkcija validateBook izvozi kao validate

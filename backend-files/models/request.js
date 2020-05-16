const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi); //paket za validaciju mongoDB objectId

const requestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  } //{odobren, u obradi, odbijen}
});

const Request = mongoose.model("Request", requestSchema); //kompajliranje seme u model cime se dobija klasa Request

function validateRequest(request) {
  const schema = {
    title: Joi.string()
      .min(2)
      .max(50)
      .required(),
    authorId: Joi.objectId().required(),
    userId: Joi.objectId().required(),
    userName: Joi.string().required(),
    status: Joi.string().required()
  };
  return Joi.validate(request, schema);
}

module.exports.Request = Request;
module.exports.requestSchema = requestSchema;
module.exports.validate = validateRequest; //obratiti paznju da se funkcija validateRequest izvozi kao validate

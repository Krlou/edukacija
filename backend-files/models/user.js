const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const config = require("config");

//kreiranje seme(analogno tabeli u mySql)
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
    maxlength: 1024 //hesira se vrednost
  },
  firstName: {
    type: String,
    minlength: 2,
    maxlength: 20,
    required: true
  },
  lastName: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  faculty: {
    type: String,
    maxlength: 50,
    required: true
  },
  isStudent: {
    type: Boolean,
    required: true
  },
  numOfIndex: {
    type: String,
    maxlength: 15
  }
});

/*
pre nego sto se sema kompajlira u model, dodajemo i metod generateAuthToken u userSchema
metoda generateAuthToken treba da generise jsonwebtoken
koriscenje jsonwebtoken: jwt.sign prima kao prvi argument objekat koji cini payload, a drugi argument je privateKey za digitalSignature
*/
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      isStudent: this.isStudent
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema); //kompajliranje seme u model, cime se dobija klasa User

//funkcija za validaciju podataka, koriscenjem paketa joi
function validateUser(user) {
  const schema = {
    username: Joi.string()
      .email()
      .max(255)
      .required(),
    password: Joi.string()
      .min(5)
      .max(32)
      .required(),
    firstName: Joi.string()
      .min(2)
      .max(20)
      .required(),
    lastName: Joi.string()
      .min(2)
      .max(30)
      .required(),
    faculty: Joi.string()
      .max(50)
      .required(),
    numOfIndex: Joi.string()
      .max(15)
      .allow(""), //proveriti allow da li treba u backend-u, mozda je suvisno
    isStudent: Joi.boolean().required()
  };
  return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.userSchema = userSchema;
module.exports.validate = validateUser; //obratiti paznju da se funkcija validateUser izvozi kao validate

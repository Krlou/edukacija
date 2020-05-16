const Joi = require("joi");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const { User } = require("../models/user");

//obrada post zahteva: prvi parametar je url kome korisnik zeli da pristupi, a drugi parametar je callback funkcija route handler
router.post("/", async (req, res) => {
  //provera da li su podaci koje je korisnik prosledio validni
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //provera da li korisnik postoji u bazi podataka
  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Invalid email or password.");

  //poredjenje passworda koji je uneo korisnik i hesiranog passworda
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  //kreiranje json web tokena, koji vracamo korisniku unutar odgovora res
  const token = user.generateAuthToken();
  res.send(token);
});

/* 
kod logovanja, treba nam drugacija funkcija on funkcije validateUser definisane u ./models/user.js
*/
function validate(req) {
  const schema = {
    username: Joi.string()
      .email()
      .max(255)
      .required(),
    password: Joi.string()
      .min(5)
      .max(32)
      .required()
  };
  return Joi.validate(req, schema); //Joi.validate vraca {error, value}: u slucaju greske, polje error je Error objekat
}

module.exports = router;

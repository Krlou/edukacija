const bcrypt = require("bcrypt");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

const { User, validate } = require("../models/user");
const login = require("../middleware/login");

//obrada get zahteva: dohvati trenutnog korisnika: imamo login middleware za proveru da li je korisnik poslao validan token
router.get("/me", login, async (req, res) => {
  //bolje je /me nego /:id, jer se radi preko jwt, i dobice podatke o sebi samo ako ima tokene
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

//obrada post zahteva:  prvi parametar je url kome korisnik zeli da pristupi, a drugi parametar je callback funkcija route handler
router.post("/", async (req, res) => {
  //provera da li su podaci koje je korisnik prosledio validni
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //provera da li korisnik postoji u bazi podataka
  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("Korisnik je već registrovan.");

  /* 
  kreiranje novog korisnika:
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  laksi nacin je preko lodash, koriscenjem funkcije _.pick()
  */
  user = new User(
    _.pick(req.body, [
      "_id",
      "username",
      "password",
      "firstName",
      "lastName",
      "faculty",
      "isStudent",
      "numOfIndex"
    ])
  );

  /*
  hesiranje passworda koriscenjem paketa bcrypt
  funkciji getSalt prosledi se broj iteracija: koliko puta da se izvrsi, da generise random string salt
  salt je deo hesiranog passworda, i sluzi da se izbegne slicnost hesiranih passworda 
  */
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  //ubacivanje novog korisnika u bazu podataka
  await user.save();

  //vracanje odgovora: nije dobro da odgovor sadrzi password
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token") //neophodno da bi x-auth-token bio stavljen u zaglavlje
    .send(
      _.pick(user, [
        "_id",
        "username",
        "firstName",
        "lastName",
        "faculty",
        "isStudent",
        "numOfIndex"
      ])
    );
});

module.exports = router;

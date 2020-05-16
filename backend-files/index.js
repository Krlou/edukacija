/* 
glavni program: pokrece se iz komandne linije komandom: node index.js
index.js je main modul ove aplikacije, informacije o modulu mozemo dobiti komandom console.log(module);
*/

const mongoose = require("mongoose"); //uvozimo mongoose paket: za rad sa mongoDB bazom
const express = require("express"); //uvozimo express paket: vraca funkciju
const app = express(); //poziv funkcije express smestamo u app objekat koji ima metode put, get, post, delete
const cors = require("cors"); //uvozimo cors paket: vraca funkciju

const config = require("config");
const login = require("./routes/login");
const register = require("./routes/register");
const library = require("./routes/library");
const home = require("./routes/home");
const newBook = require("./routes/newBook");
const book = require("./routes/book");
const upload = require("./routes/upload");
const requests = require("./routes/requests");

/*
konektovanje na bazu podataka: url se nalazi u ./config/default.js u polju 'db'
*/
const db = config.get("db");
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log(`Connected to ${db}...`));

app.use(cors());
app.use(express.json()); //neophodno za post zahtev: sluzi da omoguci parsiranje json objekata iz tela zahteva
app.use("/api/home", home);
app.use("/api/login", login);
app.use("/api/register", register);
app.use("/api/library", library);
app.use("/api/new-book", newBook);
app.use("/api/book", book);
app.use("/api/upload", upload);
app.use("/api/requests", requests);

/*
port moze da se stavi proizvoljno ukoliko radimo na nasem racunaru, ali kada se hostuje ova aplikacija,
port se dinamicki dodeljuje od strane hosting okruzenja: ovaj problem resava environment variable
enviroment variable je promenljiva koja se nalazi u okruzenju u kome se proces izvrsava, pa im se pristupa preko glob. objekta process
environment promenljiva postavlja se iz komandne linije pozivom: set edukacija_jwtPrivateKey=port_number, gde je port_number broj porta
*/
const port = process.env.port || config.get("port");
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

module.exports = server; //izvozi se samo ovo polje

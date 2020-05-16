const jwt = require("jsonwebtoken");
const config = require("config");

function login(req, res, next) {
  //provera da li se zahteva autentikacija
  if (!config.get("requiresAuth")) return next();

  //provera da li token postoji
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  //postoji token, proveriti da li je ispravan
  try {
    const decoded_payload = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded_payload; //payload se stavlja u request
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}

module.exports = login;

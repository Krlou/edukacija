const express = require("express");
const router = express.Router();
const multer = require("multer");
const fse = require("fs-extra");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, req.body.bookId + "-" + req.body.pageNumber + ".png");
  }
});

const upload = multer({ storage: storage }).single("file");

//obrada post zahteva: mozda da se premesti kao middleware
router.post("/", function(req, res) {
  upload(req, res, async function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    //---------------------
    try {
      await fse.copy(
        "./uploads",
        "H:/Diplomski rad/edukacija_final/edukacija_app/src/images"
      );
      await fse.emptyDir("./uploads");
      //console.log("success!");
    } catch (err) {
      console.error(err);
    }
    //----------------------
    return res.status(200).send(req.file);
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();

const { Request } = require("../models/request");

router.post("/", async (req, res) => {
  const requests = await Request.find({
    authorId: req.body.authorId
  }).select("-__v");

  res.send(requests);
});

router.post("/:id", async (req, res) => {
  await Request.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: req.body.status
      }
    }
  );
});

module.exports = router;

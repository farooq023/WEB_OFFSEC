
const express = require("express");
const router = express.Router();
const agent = require("../models/userModel.js");

router.get("/", async (req, res) => {
  agent
    .find({})
    .select("name email")
    .exec((err, agents) => {
      if (!agents) {
        res.send(res);
        return "Not found";
      } else if (err) {
        res.send(err);
        return "Not found";
      }
      res.send(agents);
    });
});

router.delete("/:email", (req, res) => {
  agent
    .findOne({})
    .select("email")
    .exec((err, agents) => {
      if (!agents) {
        res.send(res);
        return "Agent Not found";
      } else if (err) {
        res.send(err);
        return "Not found";
      }
      agent.deleteOne({ email: req.params.email }, (err, data) => {
        if (err) {
          res.send(err);
        } else {
          res.send("Agent removed");
        }
      });
    });
});

module.exports = router;

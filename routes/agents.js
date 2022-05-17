
const express = require("express");
const router = express.Router();
const agent = require("../models/userModel.js");

router.get("/", async (req, res) => {
  agent
    .aggregate([{ $match:{ role: 0 } }])
    // .select("name email")
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

// router.delete("/:email", (req, res) => {
//   agent
//     .findOne({})
//     .select("email")
//     .exec((err, agents) => {
//       if (!agents) {
//         res.send(res);
//         return "Agent Not found";
//       }
//       else if (err) {
//         res.send(err);
//         return "Not found";
//       }
//       else if(agents){
//         agent.deleteOne({ email: req.params.email }, (err, data) => {
//           if (err) {
//             res.send(err);
//           }
//           else {
//             res.send("Agent removed");
//           }
//         });
//       }
//     });
// });

router.delete("/:email", (req, res) => {
  // console.log("del called");
  agent.deleteOne({ email: req.params.email }, (err, data) => {
    if(err){
      res.send(err);
    }
    else{
      // console.log(data);
      if(data.deletedCount==1){
        res.send({ result:'ok' });
      }
      else{
        res.send({ result:'nok' });
      }
    }
  });
});

module.exports = router;

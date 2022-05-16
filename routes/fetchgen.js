
const express = require('express');
const router = express.Router();
const allGen = require("../models/AllGen.js");
const genResults = require("../models/GenResult.js");

router.get('/:email',
  async (req, res) => {
    allGen.aggregate([{ $match:{ Email: req.params.email } }]).
    exec((err,results)=>{
        if(!results){
          res.send(res)
          return "Not found"
        }
        else if(err){
          res.send(err)
          return "Not found"
        }
        res.send(results);
    })
  } 
)

router.get('/:email/:domain',
  async (req, res) => {
    // console.log("fetch gen results api called***********", req.session.mail);
    genResults.aggregate([{ $match:{ Email: req.params.email, Domain: req.params.domain } }]).
    exec((err,results)=>{
        if(!results){
          res.send(res)
          return "Not found"
        }
        else if(err){
          res.send(err)
          return "Not found"    
        }
        res.send(results);
    })
  } 
)

module.exports = router;
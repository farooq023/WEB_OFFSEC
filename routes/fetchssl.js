
const express = require('express');
const router = express.Router();
const allSsl = require("../models/AllSsl.js");
const sslResults = require("../models/SslResult.js");

router.get('/:email',
  async (req, res) => {
    allSsl.aggregate([{ $match:{ Email: req.params.email } }]).
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
    // console.log("fetch ssl results api called***********", req.session.mail);
    sslResults.aggregate([{ $match:{ Email: req.params.email, Domain: req.params.domain } }]).
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
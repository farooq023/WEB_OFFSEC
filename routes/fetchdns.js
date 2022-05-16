
const express = require('express');
// const DnsList = require('../../model/DnsList.js');
const router = express.Router();

const allDn = require("../models/AllDn.js")
const dnsResults = require("../models/DnsResult.js")

router.get('/:email',
  async (req, res) => {
    allDn.aggregate([{ $match:{ Email: req.params.email } }]).
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
    // console.log("fetch dns results api called***********", req.session.mail);
    dnsResults.aggregate([{ $match:{ Email: req.params.email, Domain: req.params.domain } }]).
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
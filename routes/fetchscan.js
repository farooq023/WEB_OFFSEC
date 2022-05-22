
const express = require('express');
const { where } = require('../models/AllScan.js');
const router = express.Router();

const allScan = require("../models/AllScan.js")
const scanResults = require("../models/Scan.js")
// const myssl = require("../../model/SslResult.js")

router.get('/:email',
  async (req, res) => {
    allScan.aggregate([{ $match:{ Email: req.params.email } }]).
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
    // console.log("fetching scan results api called");
    scanResults.aggregate([{ $match:{ Email: req.params.email, Domain: req.params.domain } }]).
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

// Abdullah dont delete this api, leave it commented, farooq needs it later ...

// router.get('/',
//   async (req, res) => {
//     finale=["-"]
//     console.log("******************************")
//     myssl.updateMany([{ $set:{ BypassedCiphers: finale } }]).
//     exec((err,results)=>{
//         if(!results){
//             res.send(res)
//         return "Not found"
//         }
//         else if(err){
//             res.send(err)
//         return "Not found"
//         }
//         res.send(results);
//     })
//   }
// )


// router.get('/',
//   async (req, res) => {
//     finale=["-"]
//     console.log("******************************")
//   }
// )

module.exports = router;
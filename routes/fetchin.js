
const express = require('express');
const router = express.Router();

const allIn = require("../models/AllIn.js")
const inResults = require("../models/InResult.js")

router.get('/:email',
  async (req, res) => {
    allIn.aggregate([{ $match:{ Email: req.params.email } }]).
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

router.get('/:email/:date/:time',
  async (req, res) => {
    // console.log("fetch in results api called***********", req.session.mail);
    inResults.aggregate([{ $match:{ Email: req.params.email, Date: req.params.date, Time: req.params.time } }]).
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

const express = require('express');
const router = express.Router();

const allOut = require("../models/AllOut.js")
const outResults = require("../models/OutResult.js")

router.get('/:email',
  async (req, res) => {
    allOut.aggregate([{ $match:{ Email: req.params.email } }]).
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
    outResults.aggregate([{ $match:{ Email: req.params.email, Date: req.params.date, Time: req.params.time, } }]).
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
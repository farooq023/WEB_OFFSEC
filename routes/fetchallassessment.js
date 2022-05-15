
const express = require('express');
const router = express.Router();

const allAssessment = require("../models/AllAssessment.js")

router.get('/:email',
  async (req, res) => {
    allAssessment.aggregate([{ $match:{ Email: req.params.email } }]).
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
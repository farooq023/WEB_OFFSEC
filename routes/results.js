
const express = require('express');
const router = express.Router();
const result = require("../models/Scan.js")

router.get('/',
  async (req, res) => {
    result.find({}).
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
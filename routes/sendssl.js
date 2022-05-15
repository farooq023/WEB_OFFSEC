const express = require('express');
const router = express.Router();
const request = require('request');
const { check, validationResult } = require('express-validator');


router.post('/:domain', async (req, res) => {
    
    // console.log("api called");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let mail = req.session.mail;
        // console.log("ssl domain: " + req.params.domain);
      request('http://192.168.1.185:8000/ssl/'+req.params.domain+"/"+mail, function (error, response, body) {
      console.error('error:', error); // Print the error
      // res.sendStatus(200);
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Pretty print the data received
      // res.send(body); //Display the response on the website
      });
      res.header("Access-Control-Allow-Origin","*")
      res.status(200)
      res.json({result:'ok'})
    }

    catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
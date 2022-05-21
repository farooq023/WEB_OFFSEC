
const express = require('express');
const router = express.Router();
const request = require('request');
const { check, validationResult } = require('express-validator');


router.post('/:email/:domain', async (req, res) => {
    
    // console.log("api called");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {

      let mail = req.params.email;
      let r=0;
      let y=0;

      request('http://'+req.params.domain, function (error, response, body) {
        try{
          console.log("Domain response", response.statusCode);
          if(response.statusCode == 200 || response.statusCode == 401 || response.statusCode == 403){
            r=1;
          }
        }
        catch{}
      })

      setTimeout( ()=> {
        
        // console.log("entered timeout1");

        if(r==1){
          request('http://192.168.8.101:8000/dns/'+req.params.domain+"/"+mail, function (error, response2, body) {
          try{
            console.log("kali response", response2.statusCode);
            if(response2.statusCode == 200){
              // console.log("y set to 1.");
              y=1;
            }
          }
          catch{}
          });
          
          setTimeout( ()=> {
            // console.log("entered timeout2");
            if(y==1){
              res.send( {result:'ok'} );
            }
            else{
              res.send( {result:'errors'} );
            }
          }, 1500 );
          }

        else{
          res.send( {result:'dead'} );
        }

      }, 4000 );


      // setTimeout(
      //   await request('http://192.168.1.157:8000/deepscan/'+req.params.domain+"/"+mail, function (error, response, body) {
        
      //     // console.error('error:', error); // Print the error
      //     // res.sendStatus(200);
      //     // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          
      //     if(response.statusCode == 200){
      //       y=1;
      //       console.log("y set to 1.");

      //       // res.send( {result:'ok'} );
      //     }
      //     else{
      //       console.log("y set to 0.");
      //       // res.send( {result:'errors'} );
      //     }

      //   // console.log('statusCode2:', response.statusCode); // Print the response status code if a response was received
      //   // console.log('body:', body); // Pretty print the data received
      //   // res.send(body); //Display the response on the website
      //   // res.header("Access-Control-Allow-Origin","*")
      //   // res.status(200)

      // }) , 1000 );

      // console.log("**************",y,"**************");
      // if(y==1){
      //   res.send( {result:'ok'} );
      // }
      // else{
      //   res.send( {result:'errors'} );
      // }





      // request('http://192.168.1.157:8000/deepscan/'+req.params.domain+"/"+mail, function (error, response, body) {
        
      //   // console.error('error:', error); // Print the error
      //   // res.sendStatus(200);
      //   // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      //   // console.log("req sent");
      //   try{
      //     if(response.statusCode == 200){
      //       // res.send( {result:'ok'} );
      //       console.log("y set to 1.");
      //       y=1;
      //     }
      //   }
      //   catch{}
        

      //   // console.log('statusCode2:', response.statusCode); // Print the response status code if a response was received
      //   // console.log('body:', body); // Pretty print the data received
      //   // res.send(body); //Display the response on the website
      //   // res.header("Access-Control-Allow-Origin","*")
      //   // res.status(200)

      // });

      // // console.log("here");
      // // res.send( {result:'errors'} );
      
      // setTimeout( ()=> {
      //   console.log("entered timeout2");
      //   if(y==1){
      //     res.send( {result:'ok'} );
      //   }
      //   else{
      //     res.send( {result:'errors'} );
      //   }
      // }, 1000 );
      
    


    }
    catch (err) {
      // console.log("**************CATCH**************");
      console.error("error",err.message);
      res.send({result:'cErrors'});
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
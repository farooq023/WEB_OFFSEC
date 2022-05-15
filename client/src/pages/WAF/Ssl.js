
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Label, Alert } from "reactstrap";


// import { setAlert } from '../../actions/alert';


const Ssl = ({ setAlert, auth: { user } }) => {

  let [domain, setDomain] = useState("");

  const onSubmit = (e) => {

    e.preventDefault();
    var filter = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/;
    if (!filter.test(domain)){
        // setAlert('Invalid domain entry.', 'danger');
    }
    else{

      fetch("/api/sendssl/"+user.email+'/'+domain, {
        method: "POST",
      })
      .then(function (response) {
        response.json().then((res)=>{
          console.log(res.result);        
          if (res.result === 'dead') {
            // setAlert('Domain not alive.', 'danger');
          }
          else if (res.result === 'ok') {
            // setAlert('Scan Initiated Successfully', 'success');
          }
          else{
            // setAlert('Server Error', 'danger');
          }
        })
      })

      // const request = require('request');
      // request('http://'+domain, function (error, response, body) {
      //   if(response.statusCode == 200){
      //     scan();
      //   }
      //   else{
      //     setAlert('Domain not alive.', 'danger');
      //   }
      // });

    }
    
  };

  // const scan = () => {
    
  //   fetch("/api/sendscan/"+user.email+'/'+domain, {
  //       method: "POST",
  //   })
  //   .then(function (response) {
  //     response.json().then((res)=>{
  //       console.log(res.result);        
  //       if (res.result === 'ok') {
  //         setAlert('Scan Initiated Successfully', 'success');
  //       }
  //       else{
  //         setAlert('Server Error', 'danger');
  //       }
  //     })
  //   })

    
  // }

  return (
    <div style={{height:"100vh", width:"100%", backgroundColor:"#F0F2F5", display:"flex", alignItems:"center", flexDirection:"column"}}>      
      
      <h1 style={{marginTop:"7%", color:"#17a2b8"}}>Assess Web Application Firewall</h1>
      <h4 style={{color:"#17a2b8"}}><u>Selected Technique</u>: Abuse SSL History</h4>
      
      <div style={{display: 'flex', alignItems: 'center', marginTop:"5%", border:"5px solid #17a2b8", borderRadius:"25px", padding:"2.5%", flexDirection:"column"}}>
        <div style={{width:"100%"}}>
          <text style={{color:"#17a2b8", fontWeight:"bold", float:"left"}}>Enter domain</text>
        </div>

        
        <form onSubmit={onSubmit}>
          <input
            style={{border:"2px solid #17a2b8", height:"5vh", width:"15vw", marginTop:"2%", padding:"2%", borderRadius:"15px"}}
            type="text"
            placeholder="For example: comsats.edu.pk"
            onChange={ (e) => setDomain(e.target.value) }
          />
        </form>
        {/* <Alert color="primary">
        This is a primary alert — check it out!
      </Alert> */}
        <Button color="primary" onClick={onSubmit} style={{backgroundColor:"#17a2b8",  borderRadius:"25px", borderColor:"#17a2b8", marginTop:"5vh"}}>Initiate Assessment</Button>
      </div>

    </div>
  );
}

Ssl.propTypes = {
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

// export default connect(mapStateToProps,{ setAlert})(Scan);
export default connect(mapStateToProps)(Ssl);



// export default Scan;
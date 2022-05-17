
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Label, Alert } from "reactstrap";

import { setAlert } from "../../redux/actions/alert";


const Inbound = ({ setAlert, auth: { user } }) => {


  const onSubmit = (e) => {

    e.preventDefault();
    fetch("/api/sendin/"+user.email, {
      method: "POST",
    })
    .then(function (response) {
      response.json().then((res)=>{
        console.log(res.result);
        if (res.result === 'ok') {
          setAlert('Assessment Initiated Successfully', 'success');
        }
        else{
          setAlert('Server Error', 'danger');
        }
      })
    })
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
      
      <h1 style={{marginTop:"7%", color:"#17a2b8"}}>Assess Web Gateway</h1>
      <h4 style={{color:"#17a2b8"}}><u>Selected Technique</u>: Assess Inbound Traffic</h4>
      
      <div style={{display: 'flex', alignItems: 'center', marginTop:"5%", border:"5px solid #17a2b8", borderRadius:"25px", padding:"2.5%", flexDirection:"column", width:"35%"}}>
        <div style={{width:"100%"}}>
          <text style={{color:"#17a2b8", fontWeight:"bold", float:"left"}}>
            This assessment is an advanced pentest procedure. If Web Offensive Security is being hosted in your organization, press the button below to assess your 
            organization's web gateway by assessing inbound traffic.
          </text>
        </div>

        
        {/* <form onSubmit={onSubmit}>
          <input
            style={{border:"2px solid #17a2b8", height:"5vh", width:"15vw", marginTop:"2%", padding:"2%", borderRadius:"15px"}}
            type="text"
            placeholder="For example: comsats.edu.pk"
            onChange={ (e) => setDomain(e.target.value) }
          />
        </form> */}
        {/* <Button color="primary" onClick={ () => {onSubmit()}} style={{backgroundColor:"#17a2b8",  borderRadius:"25px", borderColor:"#17a2b8", marginTop:"5vh"}}>Initiate Assessment</Button> */}
        <Button color="primary" onClick={onSubmit} style={{backgroundColor:"#17a2b8",  borderRadius:"25px", borderColor:"#17a2b8", marginTop:"5vh"}}>Initiate Assessment</Button>
      </div>

    </div>
  );
}

Inbound.propTypes = {
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {setAlert})(Inbound);


import React from "react";

import {
  Button
} from "reactstrap";

// import { Dropdown } from 'bootstrap'

import web from '../../assets/web.png';
import fire from '../../assets/firewall.png';
import gate from '../../assets/gateway.png';



const AssessmentResults = () => {
  return (
    <div style={{ height:"100vh", width:"100%", backgroundColor:"#F0F2F5", display:"flex", alignItems:"center", flexDirection:"column"}}>

        <h1 style={{marginTop:"7%", color:"#17a2b8"}}>Choose Assessment Type</h1>
        <div style={{marginTop:"4%", border:"5px solid #17a2b8", height:"40vh", width:"50vw", borderRadius:"25px", display:"flex", justifyContent:"space-around", padding:"30px"}}>
          <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <img  src={web} height="120vh" width="100vw" alt='' />
            <Button href="/scanlist" color='primary' size="sm" style={{borderRadius:"25px", marginTop:"8vh"}}>Web Assessments</Button>
          </div>
          <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
            <img src={fire} height="120vh" width="100vw" alt='' />
            <li  class="dropdown">
              {/* <b style={{borderRadius:"25px", marginTop:"8vh", backgroundColor:"#17a2b8", color:"white", padding:"1%"}}>WAF Assessments</b> */}
              <Button href="/scanlist" color='primary' size="sm" style={{borderRadius:"25px", marginTop:"8vh"}}>WAF Assessments</Button>

              <li class="dropdown-content">
                <li>
                  <a href="dnslist">DNS Assessments</a>
                </li>
                <li>
                  <a href="ssllist">SSL Assessments</a>
                </li>
                <li>
                  <a href="genlist">Generated Payloads</a>
                </li>
              </li>
            </li>
          </div>
          <div>
            <img src={gate} height="120vh" width="100vw" alt='' />
          
          </div>
        </div>
        
        
    </div>
  );
};

// AssessmentResults.propTypes = {
//   auth: PropTypes.object.isRequired
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth
// });

// export default connect(mapStateToProps)(AssessmentResults);

export default AssessmentResults;
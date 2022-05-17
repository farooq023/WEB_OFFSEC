
import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button } from 'reactstrap';

const Rescan = ({ auth: { user } }) => {

  let [scanList, setScanList] = useState([]);

  useEffect(() => {
    fetch("/api/fetchscan/"+user.email, {
      method: "GET"
    }).then(function (response) {
      response.json().then((res) => {
        if (res.length > 0) {
          setScanList(res);
        }
        else {
          setScanList("0");
        }
      });
    });
  });

  function rescan(dom){
    // console.log(dom);
    fetch("/api/sendscan/"+user.email+'/'+dom, {
      method: "POST",
    })
    .then(function (response) {
      response.json().then((res)=>{
        // console.log(res);
        if (res.result === 'ok') {
          // setAlert('Scan Initiated Successfully', 'success');
        }
        else{
          // setAlert('Server Error', 'danger');
        }
      })
    });
  }

  return (
    <div style={{height:"100vh", width:"100%", backgroundColor:"#F0F2F5", display:"flex", flexDirection:"column", alignItems:"center"}}>
      <h1 style={{ marginTop:"7%", color:"#17a2b8" }}>
        List of Completed Vulnerability Scans
      </h1>

      <div style={{ display: "flex", justifyContent: "center", marginTop:"5%", border:"5px solid #17a2b8", borderRadius:"25px", padding:"1.5%" }}>
        <div className="scrollbar scrollbar-primary  mt-5 mx-auto" style={{height:"40vh", width: "30vw"}}>
          <Table style={{width:"29vw"}}>
            <thead>
              <tr>
                <th><u>Domain</u></th>
                <th><u>Actions</u></th>
              </tr>
            </thead>
            <tbody>
              {scanList !== "0" ? (
                scanList.map((obj) => (
                  <tr>
                    <td>{obj.Domain}</td>
                    <td>
                      <Button onClick={() => rescan(obj.Domain)} color='primary' size="sm" style={{borderRadius:"25px"}}>Rescan</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <td>No Results Found</td>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};


Rescan.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Rescan);

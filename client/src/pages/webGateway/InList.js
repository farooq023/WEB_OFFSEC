
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button } from 'reactstrap';

const InList = ({ auth: { user } }) => {

  let [inList, setInList] = useState([]);

  useEffect(() => {
    fetch("/api/fetchin/"+user.email, {
      method: "GET",
      // body: JSON.stringify(domain),
      // header: {
      //     "Content-Type": "application/json"
      // }
    }).then(function (response) {
      response.json().then((res) => {
        console.log("fetching")
        if (res.length > 0) {
            setInList(res);
        } else {
            setInList("0");
        }
        // else {
        //     var error = new Error(response.statusText)
        //     error.response = response
        //     throw error
        // }
      });
    });
  }, [user.email]);

  return (
    <div style={{height:"100vh", width:"100%", backgroundColor:"#F0F2F5", display:"flex", flexDirection:"column", alignItems:"center"}}>
      <h1 style={{ marginTop:"7%", color:"#17a2b8" }}>
        List of Assessed Inbound Traffic
      </h1>

      <div style={{ display: "flex", justifyContent: "center", marginTop:"5%", border:"5px solid #17a2b8", borderRadius:"25px", padding:"1.5%" }}>
        <div className="scrollbar scrollbar-primary  mt-5 mx-auto" style={{height:"40vh", width: "30vw"}}>
          <Table style={{width:"29vw"}}>
            <thead>
              <tr>
                <th><u>Date</u></th>
                <th><u>Time</u></th>
                <th><u>Actions</u></th>
              </tr>
            </thead>
            <tbody>
              {inList !== "0" ? (
                inList.map((obj) => (
                  <tr>
                    <td>{obj.Date}</td>
                    <td>{obj.Time}</td>
                    <td>
                    <Link to="/inresult" state={{
                      email: user.email,
                      date: obj.Date,
                      time: obj.Time,
                      dur: obj.Duration
                    }}>
                      <Button color='primary' size="sm" style={{borderRadius:"25px" }}>View Results</Button>
                    </Link>
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


InList.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(InList);
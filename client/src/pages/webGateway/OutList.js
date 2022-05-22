
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button } from 'reactstrap';

const OutList = ({ auth: { user } }) => {

  let [outList, setOutList] = useState([]);

  useEffect(() => {
    fetch("/api/fetchout/"+user.email, {
      method: "GET",
      // body: JSON.stringify(domain),
      // header: {
      //     "Content-Type": "application/json"
      // }
    }).then(function (response) {
      console.log("fetching0");
      response.json().then((res) => {
        if (res.length > 0) {
            setOutList(res);
            console.log("fetching1");
            return;
        } else {
            setOutList("0");
            console.log("fetching2");
        }
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
              {outList !== "0" ? (
                outList.map((obj) => (
                  <tr>
                    <td>{obj.Date}</td>
                    <td>{obj.Time}</td>
                    <td>
                    <Link to="/outresult" state={{
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


OutList.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(OutList);
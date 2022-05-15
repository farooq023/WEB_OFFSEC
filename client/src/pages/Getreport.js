

import React, { useEffect, useState }  from 'react';
import { Table, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import { MDBContainer } from "mdbreact";
import "./getreport.css";

const Getreport = ({ auth: { user } }) => {

    let [assessmentList, setAssessmentList] = useState([]);

    useEffect(() => {
        fetch('/api/fetchallassessment/'+user.email, {
            method: 'GET'
        }).then(function (response) {
            response.json().then((res) => {
                if (res.length > 0) {
                    setAssessmentList(res);
                }
                else {
                    setAssessmentList('0');
            }
        });
    });
    }, []);

    return (
        <div style={{height:"100vh", width:"100%", backgroundColor:"#F0F2F5", display:"flex", flexDirection:"column", alignItems:"center"}}>
        <h1 style={{ marginTop:"7%", color:"#17a2b8" }}>
            List of Completed Assessments
        </h1>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop:"3%", border:"5px solid #17a2b8", borderRadius:"25px", padding:"1.5%"}}>
            <div className="scrollbar scrollbar-primary  mt-5 mx-auto" style={{height:"50vh", width: "46vw"}}>
            <Table style={{width:"45vw"}} >
                <thead>
                    <tr>
                        <th><u>Domain</u></th>
                        <th><u>Assessment Type</u></th>
                        <th><u>Actions</u></th>
                    </tr>
                </thead>
                    <tbody>
                        {assessmentList !== '0' ? (
                        assessmentList.map((obj) => (
                            <tr>
                                <td>{obj.Domain}</td>
                                <td>{obj.Type}</td>
                                <td><Button color='primary' size="sm" style={{borderRadius:"25px" }}>Get Report</Button></td>
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
}

Getreport.propTypes = {
    auth: PropTypes.object.isRequired
};
  
const mapStateToProps = (state) => ({
auth: state.auth
});

export default connect(mapStateToProps)(Getreport);

// export default Getreport;
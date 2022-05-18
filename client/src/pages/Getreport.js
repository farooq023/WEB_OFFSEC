
import React, { useEffect, useState }  from 'react';
import { Table, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import { MDBContainer } from "mdbreact";
import "./getreport.css";

import scanReport from "../pdfReporting/webscan/PdfReport.js";

import dnsreport from "../pdfReporting/waf/generateDNSReport";
import sslreport from "../pdfReporting/waf/generateSSLReport";
import genreport from "../pdfReporting/waf/generatePayloadsReport";

// import inreport from "../pdfReporting/WG/inboundReport";
// import outReport from "../pdfReporting/WG/outboundReport";

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
    });

    function genReport(dom, type, email){
        if (type == "Vulnerability Scan"){

            fetch("/api/fetchscan/"+email, {
                method: "GET",
              }).then(function (response) {
                response.json().then((res) => {
                    for(let i=0; i<res.length; i++){
                        if(res[i].Domain == dom && res[i].Email == email){
                            var date = res[i].Date;
                            var time = res[i].Time;
                            var dur = res[i].Duration;
                            break;
                        }
                    }
                    fetch("/api/fetchscan/"+email+'/'+dom, {
                        method: "GET",
                    }).then(function (response) {
                        response.json().then((res) => {
                            var scanResults = res;
                            let user = [email, dom, date, time, dur];
                            scanReport(scanResults, user);
                        });
                    });
                });
              });
        }

        else if (type == "Abuse DNS History"){
            fetch("/api/fetchdns/"+email, {
                method: "GET",
              }).then(function (response) {
                response.json().then((res) => {
                    for(let i=0; i<res.length; i++){
                        if(res[i].Domain == dom && res[i].Email == email){
                            var date = res[i].Date;
                            var time = res[i].Time;
                            var dur = res[i].Duration;
                            break;
                        }
                    }
                    fetch("/api/fetchdns/"+email+'/'+dom, {
                        method: "GET",
                    }).then(function (response) {
                        response.json().then((res) => {
                            // var dnsResults = res;

                            let dnsResults = [res[0].DnsIpRecords, res[0].MatchingResponses];

                            let user = [email, dom, date, time, dur];
                            dnsreport(dnsResults, user);
                        });
                    });
                });
              });
        }

        else if (type == "Abuse SSL Cipher"){
            fetch("/api/fetchssl/"+email, {
                method: "GET",
              }).then(function (response) {
                response.json().then((res) => {
                    for(let i=0; i<res.length; i++){
                        if(res[i].Domain == dom && res[i].Email == email){
                            var date = res[i].Date;
                            var time = res[i].Time;
                            var dur = res[i].Duration;
                            break;
                        }
                    }
                    fetch("/api/fetchssl/"+email+'/'+dom, {
                        method: "GET",
                    }).then(function (response) {
                        response.json().then((res) => {
                            // var dnsResults = res;

                            let sslResults = [res[0].SupportedCiphers, res[0].BypassedCiphers];

                            let user = [email, dom, date, time, dur];
                            sslreport(sslResults, user);
                        });
                    });
                });
              });
        }

        else if (type == "Generate Payloads"){
            fetch("/api/fetchgen/"+email, {
                method: "GET",
              }).then(function (response) {
                response.json().then((res) => {
                    for(let i=0; i<res.length; i++){
                        if(res[i].Domain == dom && res[i].Email == email){
                            var date = res[i].Date;
                            var time = res[i].Time;
                            var dur = res[i].Duration;
                            break;
                        }
                    }
                    fetch("/api/fetchgen/"+email+'/'+dom, {
                        method: "GET",
                    }).then(function (response) {
                        response.json().then((res) => {
                            
                            var xssVulns = res[0].XssVulns;
                            var sqlVulns = res[0].SqlVulns;

                            let PayloadsResults = [
                                xssVulns,
                                sqlVulns,
                                xssVulns.length,
                                res[0].Xreqs,
                                sqlVulns.length,
                                res[0].Sreqs
                              ];

                            let user = [email, dom, date, time, dur];
                            genreport(PayloadsResults, user);
                        });
                    });
                });
              });
        }
    }

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
                                <td><Button onClick={() => genReport(obj.Domain, obj.Type, user.email)} color='primary' size="sm" style={{ borderRadius:"25px" }}>Get Report</Button></td>
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
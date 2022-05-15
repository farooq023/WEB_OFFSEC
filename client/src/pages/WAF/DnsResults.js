/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */

import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
// import Widget from "../../components/Widget/Widget";
import generatePDF from "../../pdfReporting/waf/dnsresultsPdf";

// import img from "../assess.jfif"
// import img3 from "../report.jpg"
// import { results } from '../../actions/results.js';
// import {connect} from 'react-redux';
// import props from 'prop-types';
// import {Link} from 'react-router-dom'

const DnsResults = (props) => {
  let [foundips, setFoundIps] = useState([]);
  let [matchingips, setMatchingIps] = useState([]);

  let [email, setEmail] = useState(props.location.email);
  let [domain, setDomain] = useState(props.location.domain);
  let [date, setDate] = useState(props.location.date);
  let [time, setTime] = useState(props.location.time);
  let [duration, setDuration] = useState(props.location.dur);

  let user = [email, domain, date, time, duration];

  useEffect(() => {
    fetch("/api/fetchdns/" + domain, {
      method: "GET",
      // body: JSON.stringify(domain),
      // header: {
      //     "Content-Type": "application/json"
      // }
    }).then(function (response) {
      response.json().then((res) => {
        if (res.length > 0) {
          console.log(res);
          setFoundIps(res[0].DnsIpRecords);
          setMatchingIps(res[0].MatchingResponses);
        }
        // else {
        //     var error = new Error(response.statusText)
        //     error.response = response
        //     throw error
        // }
      });
    });
  });

  let dnsResults = [foundips, matchingips];

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        {" "}
        <b>Abused DNS History of {domain}</b>{" "}
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "3%",
          marginLeft: "15%",
        }}
      >
        {/* <Widget style={{ width: "42%" }}>
          <h2>
            <b>
              Assessment Details:{" "}
              <button
                className="btn btn-primary"
                onClick={() => generatePDF(dnsResults, user)}
              >
                Get report
              </button>
            </b>
          </h2>
          <h4 style={{ marginTop: "6%" }}>
            <u>Assessment Type</u>: Abuse DNS History to Bypass WAF
          </h4>
          <h4>
            <u>Date</u>: {date}
          </h4>
          <h4>
            <u>Time</u>: {time}
          </h4>
          <h4>
            <u>Duration</u>: {duration}
          </h4>
        </Widget> */}
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* <Widget style={{ width: "35%" }}>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">DNS History</th>
              </tr>
            </thead>

            <tbody>
              {foundips ? (
                foundips.map((ip) => (
                  <tr>
                    <td>{ip}</td>
                  </tr>
                ))
              ) : (
                <td></td>
              )}
            </tbody>

            {/* <button className="btn btn-primary" style={{marginTop:"10%"}}
              // onClick={() => generatePDF(scanResults)}
              >
                Get report
              </button> 
          </table>
        </Widget>

        <Widget style={{ width: "35%" }}>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Matching Responses</th>
              </tr>
            </thead>

            <tbody>
              {matchingips ? (
                matchingips.map((ip) => (
                  <tr>
                    <td>{ip}</td>
                  </tr>
                ))
              ) : (
                <td></td>
              )}
            </tbody>

            {/* <button className="btn btn-primary" style={{marginTop:"10%"}}
              // onClick={() => generatePDF(scanResults)}
              >
                Get report
              </button> 
          </table>
        </Widget> */}
      </div>
    </div>
  );
};

export default DnsResults;

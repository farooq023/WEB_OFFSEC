/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */

import React, { useEffect, useState } from 'react';
// import Widget from '../../components/Widget/Widget';
import generatePDF from '../../pdfReporting/waf/sslResultsPdf';

// import img from "../assess.jfif"
// import img3 from "../report.jpg"
// import { results } from '../../actions/results.js';
// import {connect} from 'react-redux';
// import props from 'prop-types';
// import {Link} from 'react-router-dom'

const SslResults = (props) => {
  let [supportedCipher, setSupportedCipher] = useState([]);
  let [bypassedCiphers, setBypassedCiphers] = useState([]);

  let [email, setEmail] = useState(props.location.email);
  let [domain, setDomain] = useState(props.location.domain);
  let [date, setDate] = useState(props.location.date);
  let [time, setTime] = useState(props.location.time);
  let [duration, setDuration] = useState(props.location.dur);

  let user = [email, domain, date, time, duration];

  useEffect(() => {
    fetch('/api/fetchssl/' + domain, {
      method: 'GET'
      // body: JSON.stringify(domain),
      // header: {
      //     "Content-Type": "application/json"
      // }
    }).then(function (response) {
      response.json().then((res) => {
        if (res.length > 0) {
          // console.log(res);
          // setDnsResults(res);
          // JSON.parse(res);
          console.log(res);
          // console.log(res[0].MatchingResponses);
          // console.log(res.MatchingResponses);
          setSupportedCipher(res[0].SupportedCiphers);
          setBypassedCiphers(res[0].BypassedCiphers);
          // console.log(foundips);
          // console.log(matchingips);
          console.log('set');
        }
        // else {
        //     var error = new Error(response.statusText)
        //     error.response = response
        //     throw error
        // }
      });
    });
  });

  let sslResults = [supportedCipher, bypassedCiphers];

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>
        {' '}
        <b>Abused SSL Cipher of : {domain}</b>{' '}
      </h1>

      {/* <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '3%',
          marginLeft: '15%'
        }}
      >
        <Widget style={{ width: '42%' }}>
          <h2>
            <b>
              Assessment Details: {'  '}
              <button
                className="btn btn-primary"
                onClick={() => generatePDF(sslResults, user)}
              >
                Get report
              </button>
            </b>
          </h2>
          <h4 style={{ marginTop: '6%' }}>
            <u>Assessment Type</u>: Abuse SSL Cipher to Bypass WAF
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
        </Widget>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Widget style={{ width: '35%' }}>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Supported Ciphers</th>
              </tr>
            </thead>

            <tbody>
              {supportedCipher ? (
                supportedCipher.map((ip) => (
                  <tr>
                    <td>{ip}</td>
                  </tr>
                ))
              ) : (
                <td></td>
              )}
            </tbody>
          </table>
        </Widget>

        <Widget style={{ width: '35%' }}>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Bypassing Ciphers</th>
              </tr>
            </thead>

            <tbody>
              {bypassedCiphers ? (
                bypassedCiphers.map((ip) => (
                  <tr>
                    <td>{ip}</td>
                  </tr>
                ))
              ) : (
                <td></td>
              )}
            </tbody>
          </table>
        </Widget>
      </div> */}
    </div>
  );
};

export default SslResults;

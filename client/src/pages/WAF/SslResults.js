
import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import { Button, Table } from "reactstrap";
import generateSSLReport from "../../pdfReporting/waf/generateSSLReport";
import { Bar } from 'react-chartjs-2'

const SslResults = () => {

  const location = useLocation();
  const { email } = location.state;
  const { domain } = location.state;
  const { date } = location.state;
  const { time } = location.state;
  const { dur } = location.state;

  let [supported, setSupported] = useState([]);
  let [bypassing, setBypassing] = useState([]);

  let user = [email, domain, date, time, dur];

  useEffect(() => {
    fetch("/api/fetchssl/"+email+'/'+domain, {
      method: "GET",
    }).then(function (response) {
      response.json().then((res) => {
        if (res.length > 0) {
          // console.log(res);
          setSupported(res[0].SupportedCiphers);
          setBypassing(res[0].BypassedCiphers);
        }
      });
    });
  });

  let sslResults = [supported, bypassing];

  return (
    <div style={{height:"100vh", width:"100%", backgroundColor:"#F0F2F5", display:"flex", flexDirection:"column", alignItems:"center"}}>
      <h1 style={{marginTop:"6%", color:"#17a2b8"}}><b>Abused SSL Cipher of {domain}</b></h1>

      <div style={{ width:"80vw", marginTop:"2%", display:"flex", justifyContent:"space-around"}}>
        <div style={{display: "flex", flexDirection: "column", border:"5px solid #17a2b8", borderRadius:"25px", padding:"1.5%", height:"32vh", width:"25vw"}}>
          <h2>Assessment Details: </h2>
          <h4 style={{ marginTop: "6%" }}>
            <u>Assessment Type</u>: Abuse SSL Cipher (WAF)
          </h4>
          <h4>
            <u>Date</u>: {date}
          </h4>
          <h4>
            <u>Time</u>: {time}
          </h4>
          <h4>
            <u>Duration</u>: {dur}
          </h4>
        </div>

        <Button className="btn btn-primary" style={{borderRadius:"25px", height:"7vh", width:"11vw"}} onClick={() => generateSSLReport(sslResults, user)}>Get report</Button>
        
        <div style={{border:"5px solid #17a2b8", borderRadius:"25px", padding:"1.5%", height:"41vh", width:"32vw"}}>
          <Bar
            data={{
              labels: ['Supported Ciphers', 'Bypassing Ciphers'],
              datasets: [
                {
                  label: ['Visual Representation:'],
                  data: [supported[0] === '-' ? 0 : supported.length , bypassing[0] = '-' ? 0 : bypassing.length],
                  backgroundColor: ["green", "red"],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                  ],
                  borderWidth: 1,
                },
                // {
                //   label: 'Quantity',
                //   data: [47, 52, 67, 58, 9, 50],
                //   backgroundColor: 'orange',
                //   borderColor: 'red',
                // },
              ],
            }}
            height={1000}
            width={800}
            options={{
              maintainAspectRatio: false,
              scales: {
                xAxes: [{
                  barPercentage: 0.2
                }],
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
              legend: {
                labels: {
                  fontSize: 25,
                },
              },
            }} 
          />

        </div>
      </div>
      
      <div style={{display:"flex", flexDirection:"row", marginTop:"1%"}} >
        <div className="scrollbar scrollbar-primary  mt-5 mx-auto" style={{ height:"35vh", width:"40vw", border:"5px solid #17a2b8" }}>
          <Table style={{width:"39vw"}}>
            <thead>
              <tr>
                <th scope="col">Supported Ciphers ({supported[0] === '-' ? 0 : supported.length})</th>
              </tr>
            </thead>
            <tbody>
              {supported ? (
                supported.map((ip) => (
                  <tr>
                    <td>{ip}</td>
                  </tr>
                ))
              ) : (
                <td></td>
              )}
            </tbody>
          </Table>
        </div>
        <div className="scrollbar scrollbar-primary  mt-5 mx-auto" style={{ height:"35vh", width:"40vw", border:"5px solid #17a2b8" }}>
          <Table style={{width:"39vw"}}>
            <thead>
              <tr>
                <th scope="col">Bypassed Ciphers ({bypassing[0] === '-' ? 0 : bypassing.length})</th>
              </tr>
            </thead>

            <tbody>
              {bypassing ? (
                bypassing.map((ip) => (
                  <tr>
                    <td>{ip}</td>
                  </tr>
                ))
              ) : (
                <td></td>
              )}
            </tbody>
          </Table>
        </div>
      </div>
      
    </div>
  );
};

export default SslResults;

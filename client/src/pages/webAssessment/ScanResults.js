

import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom'
import { Button, Table } from "reactstrap";
import generatePDF from "../../pdfReporting/webscan/PdfReport.js";
import { Bar } from 'react-chartjs-2'


const ScanResults = (props) => {

  const location = useLocation()
  const { email } = location.state
  const { domain } = location.state
  const { date } = location.state
  const { time } = location.state
  const { dur } = location.state
  let [scanResults, setScanResults] = useState([]);
  let user = [email, domain, date, time, dur];

  let [low, setLow] = useState(0);
  let [medium, setMedium] = useState(0);
  let [high, setHigh] = useState(0);
  let [critical, setCritical] = useState(0);
  
  let [set, setSet] = useState(false);
  

  useEffect(() => {
    fetch("/api/fetchscan/"+email+'/'+domain, {
      method: "GET",
    }).then(function (response) {
      response.json().then((res) => {
        if (res.length > 0) {
          setScanResults(res);
          for(let i=0; i<res.length; i++){
            if(res[i].Severity=="low"){
              setLow(low++);
            }
            else if(res[i].Severity=="medium"){
              setMedium(medium++)
            }
            else if(res[i].Severity=="high"){
              setHigh(high++)
            }
            else {
              setCritical(critical++)
            }
          }
          setSet(true)
        }
      });
    });
  }, []);

  return (
    <div style={{height:"100vh", width:"100%", backgroundColor:"#F0F2F5", display:"flex", flexDirection:"column", alignItems:"center"}}>
      <h1 style={{marginTop:"7%", color:"#17a2b8"}}><b>Found Vulnerabilities on {domain} {low} </b></h1>

      <div style={{ height:"30vh", width:"80vw", marginTop:"2%", display:"flex", justifyContent:"space-around"}}>
        <div style={{display: "flex", flexDirection: "column", border:"5px solid #17a2b8", borderRadius:"25px", padding:"1.5%", height:"32vh", width:"25vw"}}>
          <h2>Assessment Details:{low} </h2>
          <h4 style={{ marginTop: "6%" }}>
            <u>Assessment Type</u>: Vulnerability Scan
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
        <Button className="btn btn-primary" style={{borderRadius:"25px", height:"9vh", width:"8vw"}} onClick={() => generatePDF(scanResults, user)}>Get report</Button>
        <div style={{border:"5px solid #17a2b8", borderRadius:"25px", padding:"1.5%", height:"41vh", width:"32vw"}}>
          <h2>Visual Representation:</h2>
          {set ?
          <Bar
          data={{
            labels: ['Critical', 'High', 'Medium', "Low"],
            datasets: [
              {
                label: [''],
                data: [critical, high, medium, low],
                backgroundColor: ["red", "orange", "yellow", "green"],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 206, 86, 1)',
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
          :'Loading...'}
          {/* <Bar
            data={{
              labels: ['Critical', 'High', 'Medium', "Low"],
              datasets: [
                {
                  label: [''],
                  data: [critical, high, medium, low],
                  backgroundColor: ["red", "orange", "yellow", "green"],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
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
          /> */}

        </div>
      </div>

      {/* <div style={{width: "80vw",border:"5px solid #17a2b8", borderRadius:"25px"}}>
        <Table style={{width:"79vw"}}>
          <thead>
            <tr>
              <th scope="col">Vulnerability</th>
              <th scope="col">Severity</th>
              <th scope="col">URL</th>
            </tr>
          </thead>
          <tbody>
            {scanResults ? (
              scanResults.map((obj) => (
                <tr>
                  <td>{obj.Vulnerability}</td>
                  <td>{obj.Severity}</td>
                  <td>{obj.URL}</td>
                </tr>
              ))
            ) : (
              <td>-</td>
            )}
        </tbody>
      </Table> 
      </div> */}
    </div>
  );
};

export default ScanResults;

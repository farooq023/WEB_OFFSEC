import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Table } from "reactstrap";

import outboundReport from "../../pdfReporting/WG/outboundReport";

import { Bar } from "react-chartjs-2";
import html2canvas from "html2canvas";

const OutResult = (props) => {
  const location = useLocation();
  const { email } = location.state;
  const { date } = location.state;
  const { time } = location.state;
  const { dur } = location.state;

  let [trqs, setTrqs] = useState("");
  let [okss, setOkss] = useState("");
  let [gateStatus, setGateStatus] = useState("");
  let [image, setImage] = useState(null);

  let user = [email, date, time, dur];
  let outboundResults = [
    trqs,
    okss,
    Math.trunc(100 - (okss / trqs) * 100),
    gateStatus,
  ];

  useEffect(() => {
    fetch("/api/fetchout/" + email + "/" + date + "/" + time, {
      method: "GET",
    }).then(function (response) {
      response.json().then((res) => {
        // if (res.length > 0) {
        // console.log(res);
        setTrqs(res[0].trequests);
        setOkss(res[0].oks);
        setGateStatus(res[0].gateStatus);
        // }
      });
    });
    setInterval(() => {
      let input = window.document.getElementsByClassName("custom-chart")[0];

      html2canvas(input).then((canvas) => {
        const img = canvas.toDataURL("image/png", 1.0);
        setImage(img);
      });
    }, 500);
  }, []);

  //   let inResults = [supported, bypassing];

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundColor: "#F0F2F5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ marginTop: "6%", color: "#17a2b8" }}>
        <b>Outbound Assessment Result</b>
      </h1>

      <div
        style={{
          width: "80vw",
          marginTop: "2%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "5px solid #17a2b8",
            borderRadius: "25px",
            padding: "1.5%",
            height: "32vh",
            width: "28vw",
          }}
        >
          <h2>Assessment Details: </h2>
          <h4 style={{ marginTop: "6%" }}>
            <u>Assessment Type</u>: Assess Outbound Traffic (WG)
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

        {/* <Button className="btn btn-primary" style={{borderRadius:"25px", height:"9vh", width:"8vw"}} onClick={() => generatePDF(sslResults, user)}>Get report</Button> */}
        <Button
          className="btn btn-primary"
          style={{ borderRadius: "25px", height: "7vh", width: "11vw" }}
          onClick={() => {
            outboundReport(outboundResults, user, image);
          }}
        >
          Get report
        </Button>

        <div
          className="custom-chart"
          style={{
            border: "5px solid #17a2b8",
            borderRadius: "25px",
            padding: "1.5%",
            height: "41vh",
            width: "32vw",
          }}
        >
          <Bar
            data={{
              labels: ["Total Requests", "Successful Requests"],
              datasets: [
                {
                  label: ["Visual Representation:"],
                  data: [parseInt(trqs), parseInt(okss)],
                  backgroundColor: ["green", "red"],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
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
                xAxes: [
                  {
                    barPercentage: 0.2,
                  },
                ],
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

      {/* <div style={{ width:"25vw", border:"5px solid #17a2b8", borderRadius:"10px", marginTop:"2%", padding:"1.5%" }}>
        <h2>Assessment Results: </h2>
        <h4 style={{ marginTop: "6%" }}>
            <u>Files Imported in Test #1</u>: {test1}
        </h4>
        <h4>
            <u>Files Imported in Test #2</u>: {test2}
        </h4>
        <h4>
            <u>Files Imported in Test #3</u>: {test3}
        </h4>
        <h4>
            <u>Gateway Score</u>: {gateScore}
        </h4>
        <h4>
            <u>Gateway Status</u>: {gateStatus}
        </h4>
      </div> */}

      <div style={{ width: "100%" }}>
        <div
          style={{
            width: "30vw",
            border: "5px solid #17a2b8",
            borderRadius: "10px",
            padding: "1.5%",
            marginLeft: "12vw",
          }}
        >
          <h2>Assessment Result: </h2>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Table>
              <thead>
                <tr>Total Malicious Requests Made :</tr>
                <tr>Successful Requests :</tr>
                <tr>Gateway Score :</tr>
                <tr>Gateway Status :</tr>
              </thead>
            </Table>
            <Table>
              <thead>
                <tr>{trqs}</tr>
                <tr>{okss}</tr>
                <tr>{Math.trunc(100 - (okss / trqs) * 100)}%</tr>
                <tr>{gateStatus}</tr>
              </thead>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutResult;

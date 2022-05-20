import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Table } from "reactstrap";
import generatePayloadsReport from "../../pdfReporting/waf/generatePayloadsReport";
import { Bar } from "react-chartjs-2";

const GenResults = () => {
  const location = useLocation();
  const { email } = location.state;
  const { domain } = location.state;
  const { date } = location.state;
  const { time } = location.state;
  const { dur } = location.state;

  let [xssVulns, setXssVulns] = useState([]);
  let [xssReqs, setXssReqs] = useState(0);

  let [sqlVulns, setSqlVulns] = useState([]);
  let [sqlReqs, setSqlReqs] = useState(0);

  let user = [email, domain, date, time, dur];

  useEffect(() => {
    fetch("/api/fetchgen/" + email + "/" + domain, {
      method: "GET",
    }).then(function (response) {
      response.json().then((res) => {
        if (res.length > 0) {
          // console.log(res);
          setXssVulns(res[0].XssVulns);
          setXssReqs(res[0].Xreqs);
          setSqlVulns(res[0].SqlVulns);
          setSqlReqs(res[0].Sreqs);
        }
      });
    });
  });

  let PayloadsResults = [
    xssVulns,
    sqlVulns,
    xssVulns.length,
    xssReqs,
    sqlVulns.length,
    sqlReqs,
  ];

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
        <b>Generated Payloads on {domain}</b>
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
            <u>Assessment Type</u>: Generate Payloads (WAF)
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

        <Button
          className="btn btn-primary"
          style={{ borderRadius: "25px", height: "7vh", width: "11vw" }}
          onClick={() => generatePayloadsReport(PayloadsResults, user)}
        >
          Get report
        </Button>

        <div
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
              labels: ["XssReqs", "XssVulns", "SqlReqs", "SqlVulns"],
              datasets: [
                {
                  label: ["Visual Representation:"],
                  data: [
                    xssReqs,
                    xssVulns[0] === "-" ? 0 : xssVulns.length,
                    sqlReqs,
                    sqlVulns[0] === "-" ? 0 : sqlVulns.length,
                  ],
                  backgroundColor: ["green", "red", "green", "red"],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(54, 162, 235, 1)",
                  ],
                  borderWidth: 1,
                },
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

      <div style={{ display: "flex", flexDirection: "row", marginTop: "1%" }}>
        <div
          className="scrollbar scrollbar-primary  mt-5 mx-auto"
          style={{ height: "35vh", width: "40vw", border: "5px solid #17a2b8" }}
        >
          <Table style={{ width: "39vw" }}>
            <thead>
              <tr>
                <th scope="col">
                  Xss Vulns ({xssVulns[0] === "-" ? 0 : xssVulns.length}/
                  {xssReqs})
                </th>
              </tr>
            </thead>
            <tbody>
              {xssVulns ? (
                xssVulns.map((ip) => (
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
        <div
          className="scrollbar scrollbar-primary  mt-5 mx-auto"
          style={{ height: "35vh", width: "40vw", border: "5px solid #17a2b8" }}
        >
          <Table style={{ width: "39vw" }}>
            <thead>
              <tr>
                <th scope="col">
                  Sql Vulns ({sqlVulns[0] === "-" ? 0 : sqlVulns.length}/
                  {sqlReqs})
                </th>
              </tr>
            </thead>

            <tbody>
              {sqlVulns ? (
                sqlVulns.map((ip) => (
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

export default GenResults;

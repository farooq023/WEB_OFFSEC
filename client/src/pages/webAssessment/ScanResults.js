import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Table } from "reactstrap";
import generatePDF from "../../pdfReporting/webscan/PdfReport.js";
import { Bar } from "react-chartjs-2";
import html2canvas from "html2canvas";
const ScanResults = () => {
  const location = useLocation();
  const { email } = location.state;
  const { domain } = location.state;
  const { date } = location.state;
  const { time } = location.state;
  const { dur } = location.state;

  let [scanResults, setScanResults] = useState([]);
  let [low, setLow] = useState(0);
  let [medium, setMedium] = useState(0);
  let [high, setHigh] = useState(0);
  let [critical, setCritical] = useState(0);
  let [image, setImage] = useState(null);

  let user = [email, domain, date, time, dur];

  useEffect(async () => {
    fetch("/api/fetchscan/" + email + "/" + domain, {
      method: "GET",
    }).then(function (response) {
      response.json().then((res) => {
        if (res.length > 0) {
          setScanResults(res);
          for (let i = 0; i < res.length; i++) {
            if (res[i].Severity == "low") {
              setLow(low++);
            } else if (res[i].Severity == "medium") {
              setMedium(medium++);
            } else if (res[i].Severity == "high") {
              setHigh(high++);
            } else {
              setCritical(critical++);
            }
          }
        }
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
        <b>Found Vulnerabilities on {domain}</b>
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
            width: "25vw",
          }}
        >
          <h2>Assessment Details: </h2>
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
        <Button
          className="btn btn-primary"
          style={{ borderRadius: "25px", height: "7vh", width: "11vw" }}
          onClick={() => {
            generatePDF(scanResults, user, image);
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
              labels: ["Critical", "High", "Medium", "Low"],
              datasets: [
                {
                  label: ["Visual Representation:"],
                  data: [critical, high, medium, low],
                  backgroundColor: ["red", "orange", "yellow", "green"],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(255, 206, 86, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            height={1000}
            width={800}
            options={{
              options: {
                animation: false,
              },
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

      <div
        className="scrollbar scrollbar-primary  mt-5 mx-auto"
        style={{
          width: "80vw",
          border: "5px solid #17a2b8",
          borderRadius: "10px",
          marginTop: "1%",
          height: "33vh",
        }}
      >
        <Table style={{ width: "79vw" }}>
          <thead>
            <tr>
              <th scope="col">Vulnerability</th>
              <th scope="col">Severity</th>
              <th scope="col">URL</th>
              <th scope="col">Possible Mitigation</th>
            </tr>
          </thead>
          <tbody>
            {scanResults ? (
              scanResults.map((obj) => (
                <tr>
                  <td>{obj.Vulnerability}</td>
                  <td>{obj.Severity}</td>
                  <td>{obj.URL}</td>
                  <td>{obj.Mit == null ? "-" : obj.Mit}</td>
                </tr>
              ))
            ) : (
              <td>-</td>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ScanResults;

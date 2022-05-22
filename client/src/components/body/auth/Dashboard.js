
import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import img from "../../../assets/assessment2.png";
import img2 from "../../../assets/report.png";
import { Bar } from "react-chartjs-2";

const Dashboard = ({ auth: { user } }) => {

  let [scanList, setScanList] = useState(0);
  let [dnsList, setDnsList] = useState(0);
  let [sslList, setSslList] = useState(0);
  let [genList, setGenList] = useState(0);

  useEffect(() => {
    console.log("email is: ",user.email);
    fetch("/api/fetchscan/" + user.email, {
      method: "GET",
    }).then(function (response) {
      response.json().then((res) => {
        setScanList(res.length);
      });
    });

    fetch("/api/fetchdns/" + user.email, {
      method: "GET",
    }).then(function (response) {
      response.json().then((res) => {
        setDnsList(res.length);
      });
    });

    fetch("/api/fetchssl/" + user.email, {
      method: "GET",
    }).then(function (response) {
      response.json().then((res) => {
        setSslList(res.length);
      });
    });

    fetch("/api/fetchgen/" + user.email, {
      method: "GET",
    }).then(function (response) {
      response.json().then((res) => {
        setGenList(res.length);
      });
    });
  },[user.email] );
  return (
    <div style={{ height: "100vh", width: "100%", backgroundColor: "#F0F2F5" }}>
      <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <h1 style={{ marginTop: "7%", color: "#17a2b8" }}>Dashboard</h1>
        <div>
          <i className="fas fa-user" /> Welcome {user?.name}
        </div>
      </div>

      <div
        style={{
          marginTop: "3%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            height: "60vh",
            width: "40vw",
            borderRadius: "25px",
            border: "5px solid #17a2b8 ",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2%",
            }}
          >
            <h1 style={{ color: "#17a2b8" }}>Menu</h1>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "2%",
            }}
          >
            <Link
              to="/assessmentresults"
              style={{
                display: "flex",
                float: "left",
                flexDirection: "column",
              }}
            >
              <img src={img} height="120vh" width="100vw" alt="" />
              <Button
                color="primary"
                style={{ borderRadius: "25px", marginTop: "3vh" }}
              >
                Completed Assessments
              </Button>
            </Link>

            <Link
              to="/getreport"
              style={{
                display: "flex",
                float: "left",
                flexDirection: "column",
              }}
            >
              <img src={img2} height="120vh" width="100vw" alt="" />
              <Button
                color="primary"
                style={{ borderRadius: "25px", marginTop: "3vh" }}
              >
                Get Assessment Report
              </Button>
            </Link>
          </div>
        </div>

        <div
          style={{
            height: "60vh",
            width: "50vw",
            borderRadius: "25px",
            border: "5px solid #17a2b8",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 style={{ color: "#17a2b8", marginTop: "3%", marginBottom: "5%" }}>
            Your Completed Assessments
          </h1>
          <div style={{ height: "40vh", width: "45vw" }}>
            <Bar
              data={{
                labels: ["VulnScans", "Dns", "Ssl", "GenPays"],
                datasets: [
                  {
                    label: [
                      "Following are the # of your Completed Assessments.",
                    ],
                    data: [scanList, dnsList, sslList, genList],
                    backgroundColor: ["purple", "green", "blue", "orange"],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(255, 206, 86, 1)",
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
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);

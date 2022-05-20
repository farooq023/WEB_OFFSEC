import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "reactstrap";

import { setAlert } from "../../redux/actions/alert";

const Outbound = ({ setAlert, auth: { user } }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    fetch("/api/sendout/" + user.email, {
      method: "POST",
    }).then(function (response) {
      response.json().then((res) => {
        console.log(res.result);
        if (res.result === "ok") {
          setAlert("Assessment Initiated Successfully", "success");
        } else {
          setAlert("Server Error", "danger");
        }
      });
    });
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundColor: "#F0F2F5",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 style={{ marginTop: "7%", color: "#17a2b8" }}>Assess Web Gateway</h1>
      <h4 style={{ color: "#17a2b8" }}>
        <u>Selected Technique</u>: Assess Outbound Traffic
      </h4>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "5%",
          border: "5px solid #17a2b8",
          borderRadius: "25px",
          padding: "2.5%",
          flexDirection: "column",
          width: "35%",
        }}
      >
        <div style={{ width: "100%" }}>
          <text style={{ color: "#17a2b8", fontWeight: "bold", float: "left" }}>
            This assessment is an advanced pentest procedure. If Web Offensive
            Security is being hosted in your organization, press the button
            below to assess your organization's web gateway by assessing
            outbound traffic.
          </text>
        </div>

        <Button
          color="primary"
          onClick={onSubmit}
          style={{
            backgroundColor: "#17a2b8",
            borderRadius: "25px",
            borderColor: "#17a2b8",
            marginTop: "5vh",
          }}
        >
          Initiate Assessment
        </Button>
      </div>
    </div>
  );
};

Outbound.propTypes = {
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert })(Outbound);

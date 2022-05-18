
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table, Button } from "reactstrap";
import { setAlert } from "../../redux/actions/alert";

// import "./getreport.css";

const Agents = ({ setAlert, auth: { user } }) => {

  let [agentList, setAgentList] = useState([]);

  useEffect(() => {
    fetch("/api/agents", {
      method: "GET",
    }).then(function (response) {
      response.json().then((res) => {
        // console.log("res is",res);
        if (res.length > 0) {
          setAgentList(res);
        } else {
          setAgentList("0");
        }
      });
    });
  }, [agentList]);

  function remove(mail) {
    // console.log(mail);

    fetch("/api/agents/" + mail, {
      method: "DELETE",
    }).then(function (response) {
      response.json().then((res) => {
        if (res.result === "ok") {
          // console.log('Scan Initiated Successfully.');
          setAlert("Agent Removed Successfully", "success");
        } else {
          // console.log('Server Error.');
          setAlert("Agent does not exist", "danger");
        }
      });
    });
  }

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
      <h1 style={{ marginTop: "7%", color: "#17a2b8" }}>Agent List</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "5%",
          border: "5px solid #17a2b8",
          borderRadius: "25px",
          padding: "1.5%",
        }}
      >
        <div
          className="scrollbar scrollbar-primary  mt-5 mx-auto"
          style={{ height: "50vh", width: "45vw" }}
        >
          <Table style={{ width: "44vw" }}>
            <thead>
              <tr>
                <th>
                  <u>Name</u>
                </th>
                <th>
                  <u>Email</u>
                </th>
                <th>
                  <u>Actions</u>
                </th>
              </tr>
            </thead>
            <tbody>
              {agentList !== "0" ? (
                agentList.map((obj) => (
                  <tr>
                    <td>{obj.name}</td>
                    <td>{obj.email}</td>
                    <td>
                      <Button
                        onClick={() => remove(obj.email)}
                        color="primary"
                        size="sm"
                        style={{ borderRadius: "25px" }}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <td>No Agents Found</td>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

Agents.propTypes = {
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert })(Agents);
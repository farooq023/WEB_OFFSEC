import React, { useState } from "react";
import axios from "axios";
import { isEmail } from "../../utils/validation/Validation";
import { setAlert } from "../../../redux/actions/alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const initialState = {
  email: "",
};

function ForgotPassword({ setAlert }) {
  const [data, setData] = useState(initialState);

  const { email } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const forgotPassword = async () => {
    if (!isEmail(email)) {
      setAlert("Invalid email.", "danger");
      return setData({ ...data });
    }

    try {
      const res = await axios.post("/user/forgot", { email });
      setAlert(res.data.msg, "success");
      return setData({ ...data });
    } catch (err) {
      err.response.data.msg && setAlert(err.response.data.msg, "danger");
      setData({ ...data });
    }
  };

  return (
    <div
      className="fg_pass"
      style={{ height: "100vh", width: "100%", backgroundColor: "#F0F2F5" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h2 style={{ marginTop: "12vh", color: "var(--primary-color)" }}>
          Forgot Your Password?
        </h2>
        <div className="row">
          <label style={{ color: "var(--primary-color)" }} htmlFor="email">
            Enter your email address:
          </label>
          <input
            style={{
              borderRadius: "25px",
              borderColor: "var(--primary-color)",
            }}
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleChangeInput}
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              style={{
                borderRadius: "25px",
                backgroundColor: "var(--primary-color)",
                borderColor: "var(--primary-color)",
              }}
              onClick={forgotPassword}
            >
              Verify your email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
ForgotPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
};
const mapStateToProps = () => ({});
export default connect(mapStateToProps, { setAlert })(ForgotPassword);

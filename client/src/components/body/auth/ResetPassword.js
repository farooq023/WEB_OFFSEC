import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { setAlert } from "../../../redux/actions/alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { isLength, isMatch } from "../../utils/validation/Validation";

const initialState = {
  password: "",
  cf_password: "",
};

function ResetPassword({ setAlert }) {
  const [data, setData] = useState(initialState);
  const { token } = useParams();

  const { password, cf_password } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleResetPass = async () => {
    if (isLength(password)) {
      setAlert("Password must be at least 6 characters.", "danger");
      return setData({
        ...data,
      });
    }
    if (!isMatch(password, cf_password)) {
      setAlert("Password did not match.", "danger");
      return setData({ ...data });
    }
    try {
      const res = await axios.post(
        "/user/reset",
        { password },
        {
          headers: { Authorization: token },
        }
      );
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
        <h2 style={{ marginTop: "13vh", color: "var(--primary-color)" }}>
          Reset Your Password
        </h2>
        <div className="row">
          <label style={{ color: "var(--primary-color)" }} htmlFor="password">
            Password
          </label>
          <input
            style={{
              borderRadius: "25px",
              borderColor: "var(--primary-color)",
            }}
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleChangeInput}
          />

          <label
            style={{ color: "var(--primary-color)" }}
            htmlFor="cf_password"
          >
            Confirm Password
          </label>
          <input
            style={{
              borderRadius: "25px",
              borderColor: "var(--primary-color)",
            }}
            type="password"
            name="cf_password"
            id="cf_password"
            value={cf_password}
            onChange={handleChangeInput}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2vh",
            }}
          >
            <button
              style={{
                borderRadius: "25px",
                backgroundColor: "var(--primary-color)",
                borderColor: "var(--primary-color)",
              }}
              onClick={handleResetPass}
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ResetPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
};
const mapStateToProps = () => ({});
export default connect(mapStateToProps, { setAlert })(ResetPassword);

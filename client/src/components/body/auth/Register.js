import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import { setAlert } from "../../../redux/actions/alert";
import {
  isEmpty,
  isEmail,
  isLength,
  isMatch,
} from "../../utils/validation/Validation";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

function Register({ setAlert, isLogged }) {
  const [user, setUser] = useState(initialState);

  const { name, email, password, password2 } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      isEmpty(name) ||
      isEmpty(password) ||
      isEmpty(password2) ||
      isEmpty(email)
    ) {
      setAlert("Please fill in all fields.", "danger");

      return setUser({
        ...user,
      });
    }
    if (!isEmail(email)) {
      setAlert("Invalid email.", "danger");

      return setUser({ ...user });
    }
    if (isLength(password)) {
      setAlert("Password must be at least 6 characters.", "danger");

      return setUser({
        ...user,
      });
    }
    if (!isMatch(password, password2)) {
      setAlert("Passwords do not match", "danger");

      return setUser({ ...user, err: "Password did not match.", success: "" });
    }
    try {
      const res = await axios.post("/user/register", {
        name,
        email,
        password,
      });
      setAlert(res.data.msg, "success");

      setUser({ ...user });
    } catch (err) {
      err.response.data.msg && setAlert(err.response.data.msg, "danger");
      setUser({ ...user });
    }
  };

  if (isLogged) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        flexDirection: "row",
        display: "flex",
        backgroundColor: "#F0F2F5",
      }}
    >
      <div
        style={{
          marginTop: "12%",
          marginLeft: "13%",
          height: "25%",
          width: "35%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1 style={{ color: "var(--primary-color)" }}> 
          Web Offensive Security{" "}
          <i class="fas fa-lock" style={{ color: "var(--primary-color)" }} />
        </h1>
        <text style={{ fontSize: "125%" }}>
          Web Offensive Security is useful for penetration testers and bug
          bounty hunters as it helps in finding out weakpoints in any Web System
          and its Security Controls.
        </text>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "10%",
            justifyContent: "space-around",
            height: "100%",
            width: "100%",
          }}
        >
          <i
            class="fas fa-bug"
            style={{ color: "var(--primary-color)", fontSize: "15vh" }}
          />
          <i
            class="fas fa-id-card"
            style={{ color: "var(--primary-color)", fontSize: "15vh" }}
          />
          {/* <img src={img} height="135%" width="15vw" /> */}
        </div>
      </div>
      <div
        style={{
          marginTop: "12%",
          marginLeft: "6%",
          height: "60%",
          width: "25%",
          border: "2.5px solid var(--primary-color)",
          borderRadius: "5%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "var(--primary-color)", marginTop: "8%" }}>
          {/* <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"center"}}> */}
          <i className="fas fa-user" /> Become An Agent Now!
          {/* <text style={{fontSize:'125%', marginLeft:"2%"}}>Become An Agent Now!</text> */}
          {/* </div> */}
        </h2>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
            width: "100%",
            marginTop: "10%",
          }}
          onSubmit={handleSubmit}
        >
          <input
            style={{
              border: "2px solid var(--primary-color)",
              height: "15%",
              width: "80%",
              padding: "4%",
              borderRadius: "15px",
            }}
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChangeInput}
          />
          <input
            style={{
              border: "2px solid var(--primary-color)",
              height: "15%",
              width: "80%",
              marginTop: "2%",
              padding: "4%",
              borderRadius: "15px",
            }}
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChangeInput}
          />
          <input
            style={{
              border: "2px solid var(--primary-color)",
              height: "15%",
              width: "80%",
              marginTop: "2%",
              padding: "4%",
              borderRadius: "15px",
            }}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />
          <input
            style={{
              border: "2px solid var(--primary-color)",
              height: "15%",
              width: "80%",
              marginTop: "2%",
              marginBottom: "10%",
              padding: "4%",
              borderRadius: "15px",
            }}
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={handleChangeInput}
          />
          <input
            type="submit"
            style={{
              height: "15%",
              width: "80%",
              backgroundColor: "var(--primary-color)",
              color: "white",
              borderRadius: "25px",
              borderColor: "var(--primary-color)",
            }}
            value="Become an Agent"
          />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  isLogged: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isLogged: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert })(Register);

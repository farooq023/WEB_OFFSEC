
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { setAlert } from "../../../redux/actions/alert";
import { dispatchLogin } from "../../../redux/actions/authAction";
import { useDispatch, connect } from "react-redux";
import PropTypes from "prop-types";
import { isEmpty, isEmail } from "../../utils/validation/Validation";

const initialState = {
  email: "",
  password: "",
};

function Login({ setAlert, auth: { isLogged, isAdmin } }) {
  const [user, setUser] = useState(initialState);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const { email, password } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(email) || isEmpty(password)) {
      setAlert("Please fill in all fields.", "danger");

      return setUser({
        ...user,
      });
    }
    if (!isEmail(email)) {
      setAlert("Invalid email.", "danger");

      return setUser({ ...user });
    }
    try {
      const res = await axios.post("/user/login", { email, password });
      setAlert(res.data.msg, "success");
      setUser({ ...user });

      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      // navigate("/dashboard");
      // return <Navigate to="/dashboard" />
    } catch (err) {
      err?.response?.data?.msg && setAlert(err?.response?.data?.msg, "danger");
      setUser({ ...user });
    }
  };
  if (isLogged === true) {
    console.log("here");
    if (isAdmin !== true) {
      console.log("oth");
      return <Navigate to="/dashboard" />;
    } else if (isAdmin === true) {
      console.log("ad");
      return <Navigate to="/admindashboard" />;
    }
  }
  //   {err && showErrMsg(err)}
  //       {success && showSuccessMsg(success)}

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
        <h1 style={{ color: "#1877F2" }}>
          Web Offensive Security{" "}
          <i class="fas fa-lock" style={{ color: "#1877F2" }} />
        </h1>
        <text style={{ fontSize: "125%" }}>
          Use your registered email to login to Web Offensive Security.
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
            class="fas fa-fingerprint"
            style={{ color: "#1877F2", fontSize: "15vh" }}
          />
          <i
            class="fas fa-key"
            style={{ color: "#1877F2", fontSize: "15vh" }}
          />
        </div>
      </div>
      <div
        style={{
          marginTop: "12%",
          marginLeft: "6%",
          height: "60%",
          width: "25%",
          border: "2.5px solid #1877F2",
          borderRadius: "5%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "#1877F2", marginTop: "8%" }}>
          {/* <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"center"}}> */}
          <i className="fas fa-user" style={{}} /> Sign In
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
              border: "2px solid #1877F2",
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
              border: "2px solid #1877F2",
              height: "15%",
              width: "80%",
              marginTop: "2%",
              padding: "4%",
              marginBottom: "10%",
              borderRadius: "15px",
            }}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />
          <input
            type="submit"
            style={{
              height: "15%",
              width: "80%",
              backgroundColor: "#1877f2",
              color: "white",
              borderRadius: "25px",
              borderColor: "#1877f2",
            }}
            value="Sign-in"
          />
        </form>
        <div className="row">
          <Link to="/forgot_password">Forgot your password?</Link>
        </div>
        <p className="my-1">
          Not an agent? <Link to="/register">Register Now</Link>
        </p>
      </div>
    </div>
  );
}

// export default Login;
Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert })(Login);

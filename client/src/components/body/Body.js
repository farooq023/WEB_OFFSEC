import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Dashboard from "./auth/Dashboard";
import AdminDashboard from "./admin/AdminDashboard";
import Register from "./auth/Register";
import ActivationEmail from "./auth/ActivationEmail";
import NotFound from "../utils/NotFound/NotFound";
// import PrivateRoute from "../utils/routing/PrivateRoute";

import ForgotPass from "../body/auth/ForgotPassword";
import ResetPass from "../body/auth/ResetPassword";

// import Profile from "../body/profile/Profile";
import EditUser from "../body/profile/EditUser";

import Home from "../body/home/Home";

import Scan from "../../pages/webAssessment/Scan";
import Rescan from "../../pages/Rescan";
import Dns from "../../pages/WAF/Dns";
import Ssl from "../../pages/WAF/Ssl";
import Payloads from "../../pages/WAF/Payloads";
// import Spoof from "../../pages/WAF/Spoof";
import Inbound from "../../pages/webGateway/Inbound";
import Outbound from "../../pages/webGateway/Outbound";

import InList from "../../pages/webGateway/InList";
import InResult from "../../pages/webGateway/InResult";

import OutList from "../../pages/webGateway/OutList";
import OutResult from "../../pages/webGateway/OutResult";

// import Completed from "./pages/Completed";
import Agents from "../../pages/admin/Agents";
import Getreport from "../../pages/Getreport";

import AssessmentResults from "../../pages/webAssessment/AssessmentResults";
import ScanList from "../../pages/webAssessment/ScanList";

import ScanResults from "../../pages/webAssessment/ScanResults";
import DnsList from "../../pages/WAF/DnsList";

import DnsResults from "../../pages/WAF/DnsResults";
import GenResults from "../../pages/WAF/GenResults";

import GenList from "../../pages/WAF/GenList";

import SslList from "../../pages/WAF/SslList";
import SslResults from "../../pages/WAF/SslResults";
import { useSelector } from "react-redux";

function Body() {
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin } = auth;
  return (
    <section>
      <Routes>
        <Route
          path="/"
          element={isLogged ? <Navigate to="/dashboard" /> : <Home />}
        />
        <Route
          path="/login"
          element={isLogged ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/register"
          element={isLogged ? <Navigate to="/dashboard" /> : <Register />}
        />
        <Route
          path="/forgot_password"
          element={isLogged ? <Navigate to="/dashboard" /> : <ForgotPass />}
          exact
        />
        <Route
          path="/user/reset/:token"
          element={isLogged ? <NotFound /> : <ResetPass />}
          exact
        />
        <Route
          path="/user/activate/:activation_token"
          element={<ActivationEmail />}
          exact
        />
        <Route
          path="/dashboard"
          element={
            isLogged ? (
              isAdmin ? (
                <AdminDashboard />
              ) : (
                <Dashboard />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admindashboard"
          element={
            isLogged ? (
              isAdmin ? (
                <AdminDashboard />
              ) : (
                <Dashboard />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/edit_user/:id"
          element={isAdmin ? <EditUser /> : <NotFound />}
          exact
        />
        <Route
          path="assessmentresults"
          element={isLogged ? <AssessmentResults /> : <NotFound />}
          exact
        />
        <Route
          path="scanlist"
          element={isLogged ? <ScanList /> : <NotFound />}
          exact
        />
        <Route
          path="dnslist"
          element={isLogged ? <DnsList /> : <NotFound />}
          exact
        />
        <Route
          path="dnsresults"
          element={isLogged ? <DnsResults /> : <NotFound />}
          exact
        />
        <Route
          path="ssllist"
          element={isLogged ? <SslList /> : <NotFound />}
          exact
        />
        <Route
          path="sslresults"
          element={isLogged ? <SslResults /> : <NotFound />}
          exact
        />
        <Route
          path="genresults"
          element={isLogged ? <GenResults /> : <NotFound />}
          exact
        />
        <Route
          path="genlist"
          element={isLogged ? <GenList /> : <NotFound />}
          exact
        />
        <Route
          path="scanresults"
          element={isLogged ? <ScanResults /> : <NotFound />}
          exact
        />
        <Route path="scan" element={isLogged ? <Scan /> : <NotFound />} exact />
        <Route
          path="rescan"
          element={isLogged ? <Rescan /> : <NotFound />}
          exact
        />
        <Route
          path="dns"
          element={isLogged ? <Dns /> : <NotFound />}
          exact
        />

        <Route
          path="ssl"
          element={isLogged ? <Ssl /> : <NotFound />}
          exact
        />
        <Route
          path="payloads"
          element={isLogged ? <Payloads /> : <NotFound />}
          exact
        />
        
        {/* <Route
          path="spoof"
          element={isLogged ? <Spoof /> : <NotFound />}
          exact   
        /> */}

        <Route
          path="inbound"
          element={isLogged ? <Inbound /> : <NotFound />}
          exact
        />
        <Route
          path="outbound"
          element={isLogged ? <Outbound /> : <NotFound />}
          exact
        />

        

        <Route
          path="inlist"
          element={isLogged ? <InList /> : <NotFound />}
          exact
        />

        <Route
          path="outlist"
          element={isLogged ? <OutList /> : <NotFound />}
          exact
        />

        <Route
          path="inresult"
          element={isLogged ? <InResult /> : <NotFound />}
          exact
        />

        <Route
          path="outresult"
          element={isLogged ? <OutResult /> : <NotFound />}
          exact
        />

        <Route
          path="agents"
          element={isLogged ? <Agents /> : <NotFound />}
          exact
        />
        <Route
          path="getreport"
          element={isLogged ? <Getreport /> : <NotFound />}
          exact
        />
      </Routes>
    </section>
  );
}

export default Body;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Dashboard from "./auth/Dashboard";
import AdminDashboard from "./admin/AdminDashboard";
import Register from "./auth/Register";
import ActivationEmail from "./auth/ActivationEmail";
import NotFound from "../utils/NotFound/NotFound";
import NotAuthorized from "../utils/NotFound/NotAuthorized";

import ForgotPass from "../body/auth/ForgotPassword";
import ResetPass from "../body/auth/ResetPassword";

import Home from "../body/home/Home";

import Scan from "../../pages/webAssessment/Scan";
import Rescan from "../../pages/webAssessment/Rescan";
import Dns from "../../pages/WAF/Dns";
import Ssl from "../../pages/WAF/Ssl";
import Payloads from "../../pages/WAF/Payloads";
import Inbound from "../../pages/webGateway/Inbound";
import Outbound from "../../pages/webGateway/Outbound";

import InList from "../../pages/webGateway/InList";
import InResult from "../../pages/webGateway/InResult";

import OutList from "../../pages/webGateway/OutList";
import OutResult from "../../pages/webGateway/OutResult";

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

        {/* <Route
          path="/user/reset"
          element={isLogged ? <NotFound /> : <ResetPass />}
          exact
        /> */}

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
          path="assessmentresults"
          element={isLogged ? <AssessmentResults /> : <NotAuthorized />}
          exact
        />
        <Route
          path="scanlist"
          element={isLogged ? <ScanList /> : <NotAuthorized />}
          exact
        />
        <Route
          path="dnslist"
          element={isLogged ? <DnsList /> : <NotAuthorized />}
          exact
        />
        <Route
          path="dnsresults"
          element={isLogged ? <DnsResults /> : <NotAuthorized />}
          exact
        />
        <Route
          path="ssllist"
          element={isLogged ? <SslList /> : <NotAuthorized />}
          exact
        />
        <Route
          path="sslresults"
          element={isLogged ? <SslResults /> : <NotAuthorized />}
          exact
        />
        <Route
          path="genresults"
          element={isLogged ? <GenResults /> : <NotAuthorized />}
          exact
        />
        <Route
          path="genlist"
          element={isLogged ? <GenList /> : <NotAuthorized />}
          exact
        />
        <Route
          path="scanresults"
          element={isLogged ? <ScanResults /> : <NotAuthorized />}
          exact
        />
        <Route
          path="scan"
          element={isLogged ? <Scan /> : <NotAuthorized />}
          exact
        />
        <Route
          path="rescan"
          element={isLogged ? <Rescan /> : <NotAuthorized />}
          exact
        />
        <Route
          path="dns"
          element={isLogged ? <Dns /> : <NotAuthorized />}
          exact
        />

        <Route
          path="ssl"
          element={isLogged ? <Ssl /> : <NotAuthorized />}
          exact
        />
        <Route
          path="payloads"
          element={isLogged ? <Payloads /> : <NotAuthorized />}
          exact
        />

        <Route
          path="inbound"
          element={isLogged ? <Inbound /> : <NotAuthorized />}
          exact
        />
        <Route
          path="outbound"
          element={isLogged ? <Outbound /> : <NotAuthorized />}
          exact
        />

        <Route
          path="inlist"
          element={isLogged ? <InList /> : <NotAuthorized />}
          exact
        />

        <Route
          path="outlist"
          element={isLogged ? <OutList /> : <NotAuthorized />}
          exact
        />

        <Route
          path="inresult"
          element={isLogged ? <InResult /> : <NotAuthorized />}
          exact
        />

        <Route
          path="outresult"
          element={isLogged ? <OutResult /> : <NotAuthorized />}
          exact
        />

        <Route
          path="/agents"
          element={
            isLogged ? (
              isAdmin ? (
                <Agents />
              ) : (
                <NotAuthorized />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* <Route
          path="/agents"
          element={
            isLogged ? (
              isAdmin ? (
                <Agents />
              ) : (
                <NotAuthorized />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        /> */}

        <Route
          path="getreport"
          element={isLogged ? <Getreport /> : <NotAuthorized />}
          exact
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </section>
  );
}

export default Body;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";

function ActivationEmail() {
  const { activation_token } = useParams();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post("/user/activation", {
            activation_token,
          });
          setSuccess(res.data.msg);
        } catch (err) {
          err.response.data.msg && setErr(err.response.data.msg);
        }
      };
      activationEmail();
    }
  }, [activation_token]);

  return (
    <section className="container">
      <h2 className="x-small text-primary">
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
      </h2>
    </section>
  );
}

export default ActivationEmail;

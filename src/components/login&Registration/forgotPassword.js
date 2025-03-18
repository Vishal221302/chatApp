import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { sendOtp,otpVerify,passwordReset } from "../../redux/ResetpasswordAction";

import { useDispatch, useSelector } from "react-redux";
import './login.css'
import { Spinner } from "react-bootstrap";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState(""); // Pre-fill email
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch(); 
  const { loading, error, status } = useSelector(
    (state) => state.resetPassword
  );

  useEffect(() => {
    const emailInput = document.getElementById("email-input");
    if (emailInput) {
      emailInput.focus(); // Focus only if the element exists
    }
  }, [step]);

  const handleSendEmail = () => {
    const data = {
      email:email,
    }
    dispatch(sendOtp(data, setStep));
 
  };

  const handleVerifyOtp = () => {
    const data = {
      email: email,
      otp:otp
    }
    dispatch(otpVerify(data, setStep));
  };

  const handleResetPassword = () => {
    const data = {
      email: email,
      newPassword: newPassword,
    };
    dispatch(passwordReset(data));
    if (!error) {
      setStep(2);
    } else {
      console.log(error);
    }
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Reset Password</h2>
      {step === 1 && (
        <div className="sendotp">
          <h4 className="text-center">Your Email </h4>
          <p className="sendotp_text">
            Enter your registered email address,and we’ll send you a link to
            reset your password.
          </p>
          <input
            id="email-input"
            type="email"
            className="form-control mb-3"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            className="btn btn-primary"
            disabled={loading}
            onClick={handleSendEmail}
          >
            {loading ? <Spinner /> : "Send OTP"}
          </button>
        </div>
      )}
      {step === 2 && (
        <div className="sendotp">
          <h4 className="text-center">Enter your OTP </h4>
          <input
            id="email-input"
            type="email"
            className="form-control mb-3"
            placeholder="Enter your email"
            value={email} // Ensure the email is displayed
            readOnly // Make it read-only to prevent changes
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button
            className="btn btn-primary"
            disabled={loading}
            onClick={handleVerifyOtp}
          >
            {loading ? <Spinner /> : "Verify OTP"}
          </button>
        </div>
      )}
      {step === 3 && (
        <div className="sendotp">
          <h4 className="text-center">Enter Your New Password </h4>
          <input
            id="email-input"
            type="email"
            className="form-control mb-3 mt-3"
            placeholder="Enter your email"
            value={email} // Ensure the email is displayed
            readOnly // Make it read-only to prevent changes
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button
            className="btn btn-primary"
            disabled={loading}
            onClick={handleResetPassword}
          >
            {loading ? <Spinner /> : "Save Password"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;

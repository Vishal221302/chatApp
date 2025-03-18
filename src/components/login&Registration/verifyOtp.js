import React from 'react';
import { otpVerify } from "../../redux/ResetpasswordAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

function VerifyOtp() {

    const [email, setEmail] = useState(""); // Pre-fill email
    const [otp, setOtp] = useState("");

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.resetPassword);


    const handleVerifyOtp = () => {
       const data = {
         email: email,
         otp: otp,
       };
       dispatch(otpVerify(data));
       if (!error) {
         setStep(2);
       } else {
         console.log(error);
       }
       setStep(3);
     };
  return (
    <div>
      <input
        id="email-input"
        type="email"
        className="form-control mb-3"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
      />
      <button className="btn btn-primary" onClick={handleVerifyOtp}>
        Verify OTP
      </button>
    </div>
  );
}

export default VerifyOtp

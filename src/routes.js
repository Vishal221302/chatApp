
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import RegistrationForm from "./components/login&Registration/register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./PrivateRoute";
import Home from "./components/pages/home";
import ForgotPassword from "./components/login&Registration/forgotPassword";


export default function RouterBranch() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<App />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/resetpassword" element={<ForgotPassword />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}



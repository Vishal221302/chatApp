import React, { useEffect, useState } from "react";
import { Form, Button, InputGroup, Container, Row, Col, Spinner } from "react-bootstrap";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { login } from "../../redux/authAction";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  
  const handleLogin = (e) => {
    e.preventDefault();
      dispatch(login({ email, password }));
    
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard"); 
    }
  }, [isAuthenticated, navigate]);


  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col md={6} xs={12} className="mx-auto">
          <Form onSubmit={handleLogin} className="p-4 border rounded bg-light">
            <h2 className="text-center mb-4">Login</h2>

            {/* Email Field */}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <InputGroup>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            {/* Password Field */}
            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </Button>
              </InputGroup>
            </Form.Group>

            {/* Forgot Password and Login */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <Link to="/resetpassword">Forgot Password?</Link>
            </div>

            {/* Centered Login Button */}
            <div className="d-flex justify-content-center mt-3">
              <Button variant="primary" disabled={loading} type="submit">
                {loading ? <Spinner /> : "Login"}
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-4">
              <p>
                Don't have an account?{" "}
                <Button variant="link" href="/register" className="p-0">
                  Sign up
                </Button>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Image,
  Spinner,
} from "react-bootstrap";
import { addUser } from "../../redux/authadduserAction";
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [profile_image, setProfile_image] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch(); 
  const { loading} = useSelector((state) => state.adduser);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile_image(file); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegistration = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    if (setProfile_image) {
      formData.append("profile_image", profile_image);
    }
      dispatch(addUser(formData, navigate));
  };


  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col md={6} xs={12} className="mx-auto">
          <Form
            // onSubmit={handleRegistration}
            className="p-4 border rounded bg-light"
          >
            <h2 className="text-center mb-4">Register</h2>
            {/* {error && <div className="alert alert-danger">{error}</div>} */}

            {/* Profile Image Upload */}
            <div className="text-center mb-4">
              <input
                type="file"
                accept="image/*"
                id="profileImageUpload"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <div>
                <Image
                  src={
                    profile_image
                      ? URL.createObjectURL(profile_image)
                      : "https://via.placeholder.com/150"
                  }
                  roundedCircle
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    document.getElementById("profileImageUpload").click()
                  }
                />
              </div>
            </div>

            {/* Name */}
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            {/* Email */}
            <Form.Group controlId="formBasicEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            {/* Password */}
            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {/* Phone */}
            <Form.Group controlId="formBasicPhone" className="mt-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>

            {/* Register Button */}
            <div className="d-flex justify-content-center mt-4">
              <Button
                onClick={handleRegistration}
                disabled={loading}
                variant="primary"
                type="submit"
              >
                {loading? <Spinner/>: "Register"}
              </Button>
            </div>

            {/* Link to Login */}
            <div className="text-center mt-4">
              <p>
                You have an account?{" "}
                <Link variant="link" to="/login" className="p-0">
                  Login
                </Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationForm;

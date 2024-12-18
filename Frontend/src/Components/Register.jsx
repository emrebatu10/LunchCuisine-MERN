
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../CSS/Register.css';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
//import { FaGoogle } from 'react-icons/fa';
//import { useNavigate } from 'react-router-dom';

function Register() {
  /*
    const navigate = useNavigate();
  
    const handleSubmit = (event) => {
      event.preventDefault();
      navigate('/home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  */

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Get Input Values
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
  });



  const handleInputChange = (e) => {

    const { name, value } = e.target;
    setformData({ ...formData, [name]: value })
    console.log(formData);
  }
  // Get Input Values


  // API Fetch
  const handleRegister = async (e) => {
    e.preventDefault();
    //console.log(formData);
    setLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(formData),

      });

      if (response.ok) {

        setMessage("Register successful!");
        setMessageType("success");
        setTimeout(() => {
          navigate("/login");
        }, 1000);


      }
      else {
        //messagge.error("Register is not success");
        setMessage("Register failed. Please check your credentials.");
        setMessageType("error");
        setLoading(false);

      }
      console.log(response);

    } catch (error) {
      console.log(error);
    }
  }



  return (
    <Container className="register-container">
      <h2 className="register-title">Register Here</h2>

      <Form onSubmit={handleRegister} className="register-form">

        <Row>
          <Col xs={12} md={6}>
            <Form.Group controlId="firstName">
              <Form.Label>Name</Form.Label>
              <Form.Control onChange={handleInputChange} name="username" type="text" placeholder="Name" />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId="lastName">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={handleInputChange} name="password" type="password" placeholder="Password" />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="email">
          <Form.Label>Email Address <span className="optional-text">*Required</span></Form.Label>
          <Form.Control onChange={handleInputChange} name="email" type="email" placeholder="Enter your email" />
        </Form.Group>

        <div className="info-box">
          <p>By clicking Sign Up, you agree to our website membership agreement, accessible <a href="#">here</a>.</p>
        </div>

        <Form.Group controlId="kvkk" className="mb-3" >
          <Form.Check type="checkbox" label="I consent to the processing and transfer of my personal data in accordance with the terms outlined in the Privacy Policy and agree to receive notifications about Lunch Cuisine’s campaigns and offers." />
        </Form.Group>

        <Button className="register-btn" variant="success" type="submit">
          Sign Up
        </Button>

         {/* show message */}
         <div className='login-message'>
          {message && (
            <p style={{ color: messageType === "success" ? "green" : "red" }}>
              {message}
            </p>
          )}

          {loading && (
            <div style={{ marginTop: "20px" }}>
              <div className="spinner"></div>
            </div>
          )}
        </div>





        {/*
        <Button className="google-btn" variant="outline-secondary" type="button">
          <FaGoogle /> Sign Up with Google
        </Button> */}
      </Form>
    </Container>
  );
}

export default Register;

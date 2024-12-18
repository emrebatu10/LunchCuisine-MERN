import { useState} from 'react';
import { useNavigate } from "react-router-dom";
import '../CSS/Login.css';

const Login = () => {
  const [emailLogin, setEmailLogin] = useState(true);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Get Input Values
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {

    const { name, value } = e.target;
    setformData({ ...formData, [name]: value })
    console.log(formData);
  }

  // API Fetch
  const handleLogin = async (e) => {
    e.preventDefault();
    //console.log(formData);
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(formData),

      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        
        setMessage("Login successful!");
        setMessageType("success");
        setTimeout(() => {
          navigate("/home");
        }, 1000);

        if (data.role === "admin") {
          navigate("/AdminPage");
          
        }
      }
      else {
        //messagge.error("Register is not success");
        setMessage("Login failed. Please check your credentials.");
        setMessageType("error");
        setLoading(false);

      }

      console.log(response);

    } catch (error) {
      setMessage("An error occurred during login.");
      setMessageType("error");
      setLoading(false);
      console.log("Login error", error);
    }
  };






  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Log In</h2>
        <form onSubmit={handleLogin}>
          <div className="login-tabs">
            <button
              className={`login-tab ${emailLogin ? 'active' : ''}`}
              onClick={() => setEmailLogin(true)}
            >
              Email
            </button>
            <button
              className={`login-tab ${!emailLogin ? 'active' : ''}`}
              onClick={() => setEmailLogin(false)}
            >
              Phone Number
            </button>
          </div>

          <div className="login-form">
            {emailLogin ? (
              <input
                name='email'
                type="email"
                placeholder="Enter your email address"
                className="login-input"
                onChange={handleInputChange}
              />
            ) : (
              <input
                name='phoneNumber'
                type="tel"
                placeholder="Enter your phone number"
                className="login-input"
                onChange={handleInputChange}
              />
            )}

            <div className="password-wrapper">
              <input
                name='password'
                type="password"
                placeholder="Password"
                className="login-input"
                onChange={handleInputChange}
              />
              <span className="toggle-password">👁️</span>
            </div>

            <a href="/" className="forgot-password">
              Forgot Password?
            </a>

            <button type="submit" className="login-btn">Log In</button>


            {/*
          <button className="google-login-btn">
            <img src="https://cdn.dpeurasia.com/dms/images/icon/google-colored.png" alt="Google Logo" />
            Sign in with Google
          </button> 
          */}

          </div>
        </form>

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

        <div className="signup-link">
          Dont have an account? <a href="/register">Sign up</a>
        </div>
      </div>
    </div>

  );
};

export default Login;

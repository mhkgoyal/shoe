import { Link, useNavigate } from "react-router-dom";
import loginImage from "../Images/abc4.png";
import "../styles/auth.css";
import { useState } from "react";
import Axios from "../Axios";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [user, setUser] = useState({ email: "", password: "", role: "user" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user.email === "" || user.password === "") {
        toast.error("Please provide email and password", {
          position: "bottom-right",
        });
        return;
      }
      const response = await Axios.post("/login", user);
      console.log(response);

      if (response.data.success === true) {
        localStorage.setItem("jwt", "Bearer " + response.data.token);
        setAuth(response.data.user);
        toast.success("Login successful. Access granted.", {
          position: "bottom-right",
        });
        navigate("/products");
      } else {
        toast.error(response.data.message, {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "bottom-right",
      });
    }
  };
  return (
    <div className="login-page">
      <div className="login-div div1">
        <div className="login-box">
          <h1 className="login-heading">Log in to your account</h1>
          <h2 className="login-subheading">
            Don&apos;t have an account?{" "}
            <Link className="signup-link" to="/signup">
              Sign up
            </Link>
          </h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-div">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Enter your email"
              />
            </div>
            <div className="input-div">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                name="password"
                placeholder="Enter your password"
              />
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
          </form>
          <div className="forget-button">
            <button type="button">Forget password?</button>
          </div>
        </div>
      </div>
      <div className="login-div div2">
        <img className="login-image-r" src={loginImage} alt="image" />
      </div>
    </div>
  );
};

export default LoginPage;

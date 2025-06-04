import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../utils/Api";
import useStore from "../store/UseStore";
import { Form, Input, Button, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import Styles from "../styles/auth/AuthForm.module.css";
import logo from "../assets/Logo3.png"; 
import illustrator from "../assets/login/Illustrator.svg"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const { setUser, setToken } = useStore();
  const navigate = useNavigate(); 

  const loginMutation = useMutation({
    mutationFn: (data) => apiRequest("POST", "/users/login", data),
    onSuccess: (data) => {
      message.success("Login successfull!");
      setToken(data.token);
      setUser(data.user);
      navigate("/");
    },
    onError: (error) => {
      const messageText = error;
      if ( messageText?.toLowerCase().includes("verify")) {
        // Save email to localStorage to use in OTP verification
        localStorage.setItem("verifyEmail", email);
        message.warning("Please verify your email.");
        navigate("/verify-otp");
      }  else if (messageText) {
        message.error(messageText);
      } else {
        message.error("Login failed. Please try again.");
      }
    },
  });

  // Manually derive isLoading
  const isLoading = loginMutation.status === "loading" || loginMutation.status === "pending";

  const handleLogin = () => {
    loginMutation.mutate({ email, password, role });
  };

  return (
    <div className={Styles.pageWrapper}>
      <div className={Styles.imageFormWrapper}>
        <div className={Styles.imageSection}>
          <center>
            {/*--- to make logo image center this center tag is used ---*/}
            <img src={logo} alt="Logo" className={Styles.logo} />
          </center>
          <img
            src={illustrator}
            alt="Illustrator"
            className={Styles.illustrator}
          />
        </div>
        <div className={Styles.formWrapper}>
          <Form
            name="login"
            onFinish={handleLogin}
            className={Styles.formContainer}
          >

            <h2 className={Styles.formTitle}>Login</h2>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Superadmin">Superadmin</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                type="email"
                placeholder="Email"
                style={{
                  background:"var(--primary-text)",
                }}
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="Password"
                style={{
                  background: "var(--primary-text)",
                }}
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              <Button
                className={Styles.button_login}
                htmlType="submit"
                disabled={loginMutation.isLoading}
                loading={isLoading}  // Show loading spinner
              >
                Login
              </Button>
            </Form.Item>
            <p style={{ textAlign: "center" }}>
              <Link to="/forgot-password" className={Styles.link}>
                Forgot Password?
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;

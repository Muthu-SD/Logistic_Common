// src/components/Login.js
import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import useStore from "../store/UseStore";
import Styles from "../styles/auth/AuthForm.module.css";
import logo from "../assets/Logo.png"; // Import logo
import illustrator from "../assets/login/Illustrator.svg"; // Import illustration
import { useTheme } from "../context/ThemeContext";

//For static role based
const users = [
  {
    email: "SuperAdmin@albs.com",
    password: "Superadmalbs@123",
    role:"SuperAdmin"
  },
  {
    email: "Admin@albs.com",
    password: "Admalbs@123",
    role:"Admin"
  }
]

const Login = () => {
  // const url =`Process.env.api`
  const navigate = useNavigate(); // Initialize useNavigate
  const [loading, setLoading] = useState(false);
  const { login } = useStore();
  const { theme } = useTheme();


  // Pre-fill email and password
  // const [initialValues] = useState();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Mock authentication (replace with actual API call)
      const user =  users.find(user=> user.email === values.email && user.passsword === values.passsword)
      if (user) {
        login(user);
        message.success("Login successful!");
        navigate("/"); // Navigate to dashboard after successful login
      } else {
        message.error("Invalid credentials");
      }
      setLoading(false);
    } catch (error) {
      message.error("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  // const fetch uer = axios.get(`${url}`)
  // const fetch uer = axios.post(`${url},`)

  return (
    <div className={Styles.pageWrapper}>
      <div className={Styles.imageFormWrapper}>
        <div className={Styles.imageSection}>
          {/* <div className={Styles.logoSection}> */}
          <center>
            {" "}
            {/*--- to make logo image center this center tag is used ---*/}
            <img src={logo} alt="Logo" className={Styles.logo} />
          </center>
          {/* </div>  */}
          <img
            src={illustrator}
            alt="Illustrator"
            className={Styles.illustrator}
          />
        </div>
        <div className={Styles.formWrapper}>
          <Form
            name="login"
            onFinish={onFinish}
            className={Styles.formContainer}
            // initialValues={initialValues} // Set initial values for the form
          >
            <h2 className={Styles.formTitle}>Login</h2>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                type="email"
                placeholder="Email"
                style={{
                  background: theme.component.input.backgroundColor,
                }}
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
                  background: theme.component.input.backgroundColor,
                }}
              />
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              <Button
                className={Styles.button_login}
                htmlType="submit"
                loading={loading}
              >
                Login
              </Button>
            </Form.Item>
            <p style={{ textAlign: "center" }}>
              Don't have an account?{" "}
              <Link to="/signup" className={Styles.link}>
                Sign Up
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;

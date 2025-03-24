import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import useStore from "../store/UseStore"; // Import the store
import Styles from "../styles/auth/AuthForm.module.css";
import logo from "../assets/Logo.png"; // Import logo
import illustrator from "../assets/login/Illustrator.svg"; // Import illustration
import { useTheme } from "../context/ThemeContext";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { signup } = useStore(); // Get the signup function from the store
  const { theme } = useTheme();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Mock signup (replace with actual API call)
      // Here you would usually call an API to register the user
      setTimeout(() => {
        signup({ username: values.username }); // Call signup from the store
        message.success("Signup successful! You can now log in.");
        navigate("/login"); // Navigate to login page after successful signup
        setLoading(false);
      }, 1000);
    } catch (error) {
      message.error("An error occurred during signup");
      setLoading(false);
    }
  };

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
            name="signup"
            onFinish={onFinish}
            className={Styles.formContainer}
          >
            <h2 className={Styles.formTitle}>Sign Up</h2>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input type="email" placeholder="Email" 
              style={{background:theme.component.input.backgroundColor}}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Password" 
              style={{background:theme.component.input.backgroundColor}}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please confirm your password!" },
              ]}
            >
              <Input.Password placeholder="Confirm Password" 
              style={{background:theme.component.input.backgroundColor}}
              />
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              <Button
                className={Styles.button_login}
                htmlType="submit"
                loading={loading}
              >
                Signup
              </Button>
            </Form.Item>
            <p style={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link to="/login" className={Styles.link}>
                Login
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

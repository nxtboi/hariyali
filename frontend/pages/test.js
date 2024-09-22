"use client";
import React, { useState } from "react";
import {
  Form,
  TextInput,
  PasswordInput,
  Button,
  Link as CarbonLink,
  Modal,
} from "@carbon/react";
import { Login } from "@carbon/icons-react";
import Image from "next/image";
import styles from "../styles/Login.module.css";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [isEmailSentModalOpen, setEmailSentModalOpen] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError("");

    const response = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password_hash: password }),
    });
    const data = await response.json();
    if (response.ok) {
      alert(data.message);
    } else {
      alert(data.message);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotPasswordOpen(true);
  };

  const handleSendPasswordReset = async () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError("");
    setForgotPasswordOpen(false);
    setEmailSentModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <div className={styles.formContent}>
          {/* Add Logo Image */}
          <Image
            src="/logo-1.png" // Path to your logo
            alt="HariyaliKart Logo"
            width={118} // Adjust size as needed
            height={69} // Adjust size as needed
            className={styles.logo}
          />
          <h1
            className={styles.title}
            style={{
              width: "77px",
              height: "40px",
              marginTop: "74px",
              marginLeft: "80px",
              marginBottom: "24px",
            }}
          >
            Login
          </h1>
          <Form
            onSubmit={handleLogin}
            style={{
              marginBottom: "16px",
              marginLeft: "80px",
              marginRight: "80px",
            }}
          >
            <div>
              <div className="email-input-div">
                <TextInput
                  id="email"
                  labelText="Email"
                  placeholder="Type your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  invalid={emailError !== ""}
                  invalidText={emailError}
                  required
                  className="email-input"
                />
              </div>
              <div style={{ marginTop: "16px" }} className="password-input-div">
                <PasswordInput
                  id="password"
                  labelText="Password"
                  placeholder="Type your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="password-input"
                />
                <CarbonLink
                  href="#"
                  className={styles.forgotPassword}
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </CarbonLink>
              </div>
            </div>
            <Button
              renderIcon={Login}
              type="submit"
              className="login-button"
              style={{ background: "#009f3f" }}
            >
              Login
            </Button>
          </Form>
        </div>
        <footer className={styles.footer}>
          <p className={styles.copyright_text}>
            Copyright © 2023 Yuktidea Technologies®
            <br></br>All Rights Reserved
          </p>
        </footer>
      </div>
      <div className={styles.imageSection}>
        <div className={styles.overlay}></div>
        <Image
          src="/Maskgroup.png" // Correct path to your background image
          alt="Farm Image"
          layout="fill"
          objectFit="cover"
          className={styles.backgroundImage}
        />
        <div className={styles.imageText}>
          <h1 className={styles.welcomeMsg}>Welcome to HariyaliKart</h1>
          <p className={styles.loginMsg}>
            Please login to access your dashboard
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        open={isForgotPasswordOpen}
        modalHeading="Forgot Password"
        primaryButtonText="Continue"
        secondaryButtonText="Cancel"
        onRequestSubmit={handleSendPasswordReset}
        onRequestClose={() => setForgotPasswordOpen(false)}
      >
        <p>
          Please enter your registered email address to receive the reset
          password link.
        </p>
        <TextInput
          id="forgot-email"
          labelText="Email"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          invalid={emailError !== ""}
          invalidText={emailError}
          required
        />
      </Modal>

      {/* Email Sent Confirmation Modal */}
      <Modal
        open={isEmailSentModalOpen}
        modalHeading="Link Sent"
        hasForm={false}
        passiveModal
        onRequestClose={() => setEmailSentModalOpen(false)}
      >
        <p>
          Reset password link sent successfully on <strong>{email}</strong>.
          Kindly check your inbox.
        </p>
      </Modal>
    </div>
  );
}
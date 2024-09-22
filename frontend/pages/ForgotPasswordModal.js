import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#__next"); // Ensure accessibility by binding modal to the root div

const ForgotPasswordModal = ({ isOpen, onClose, onEmailSent }) => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call your backend API to send the reset password email
    try {
      const response = await fetch("/api/send-reset-password-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setEmailSent(true);
        onEmailSent(); // callback function to handle further actions if needed
      } else {
        alert("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="forgot-password-modal"
      overlayClassName="forgot-password-overlay"
    >
      {!emailSent ? (
        <div className="forgot-password-content">
          <h2>Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <div className="modal-buttons">
              <button type="button" onClick={onClose}>
                Cancel
              </button>
              <button type="submit">Continue</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="forgot-password-content">
          <h2>Link Sent</h2>
          <p>
            Reset password link sent successfully to {email}. Kindly check your
            inbox.
          </p>
          <button onClick={onClose}>Close</button>
        </div>
      )}
    </Modal>
  );
};

export default ForgotPasswordModal;

import React from "react";
import { useNavigate } from "react-router-dom";
import "./failedPayment.css"; // Optional CSS for styling

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-failed-container">
      <div className="payment-failed-card">
        <h1>Payment Failed</h1>
        <p>Oops! Something went wrong with your payment.</p>
        <p>Please try again or contact support if the issue persists.</p>
        <button onClick={() => navigate("/")}>Go to Home</button>
        <button onClick={() => navigate("/addMoney")}>Retry Payment</button>
      </div>
    </div>
  );
};

export default PaymentFailed;

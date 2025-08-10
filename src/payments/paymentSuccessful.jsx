import React from "react";
import { useSearchParams } from "react-router-dom";
import "./paymentSuccessful.css";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();

  const paymentId = searchParams.get("razorpay_payment_id");
  const orderId = searchParams.get("razorpay_order_id");
  console.log(paymentId, orderId);

  return (
    <div className="success-container">
      <div className="success-card">
        <h2>🎉 Payment Successful!</h2>
        <p>Thank you for your payment.</p>

        {paymentId && (
          <div className="success-details">
            <p>
              <strong>Payment ID:</strong> {paymentId}
            </p>
            <p>
              <strong>Order ID:</strong> {orderId}
            </p>
          </div>
        )}

        <a className="home-button" href="/">
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default PaymentSuccess;

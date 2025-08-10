import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./DiscountedCard.css";
import { addDataUser } from "../utils/userslice";
import { addDataVendor } from "../utils/vendorslice";

const pricingOptions = [
  { original: 500, discounted: 475 },
  { original: 1000, discounted: 900 },
  { original: 1500, discounted: 1270 },
  { original: 2000, discounted: 1600 },
];

const DiscountCard = () => {
  const dispatch = useDispatch();
  const category = localStorage.getItem("category");
  const userData = useSelector((state) =>
    category === "user" ? state.user.data : state.vendor.data
  );

  const user = userData?.[0] || {};
  const token = `Bearer ${user?.token || ""}`;
  const name = user?.name || "";
  const email = user?.email || "";
  const phoneNo = user?.phoneNo || "";
  const userId = user?.userId || null;
  const vendorId = user?.vendorId || null;

  const [loadingIndex, setLoadingIndex] = useState(null); // 👈 tracks loading state

  const handlePay = async (amount, discountPercent, index) => {
    setLoadingIndex(index); // 👈 show spinner on this button
    try {
      const res = await fetch("http://localhost:3000/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Order creation failed:", errorText);
        setLoadingIndex(null);
        return;
      }

      const { order } = await res.json();

      const options = {
        key: "rzp_test_S5BeGwGInSVa1o",
        amount: order.amount,
        currency: order.currency,
        name: "Aapkakaam",
        description: "Purchase Credits",
        order_id: order.id,
        prefill: {
          name,
          email: email || "admin@aapkakaam.com",
          contact: phoneNo,
        },
        handler: async function (response) {
          try {
            const verifyRes = await fetch(
              "http://localhost:3000/payment/verify-payment",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token,
                },
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  amount,
                  name,
                  email,
                  phoneNo,
                  userId,
                  vendorId,
                  category,
                  balance: amount,
                  discountPercent,
                }),
              }
            );
            const data = await verifyRes.json();
            if (data.success) {
              const updatedData = { ...userData[0], balance: data.balance };
              const action = category === "user" ? addDataUser : addDataVendor;

              dispatch(action(updatedData));
              localStorage.setItem(category, JSON.stringify(updatedData));

              window.location.href = `/paymentSuccessful?razorpay_payment_id=${response.razorpay_payment_id}&razorpay_order_id=${response.razorpay_order_id}`;
            } else {
              window.location.href = "/paymentFailed";
            }
          } catch (err) {
            console.error("Verification failed:", err);
            alert("Something went wrong. Please try again.");
          } finally {
            setLoadingIndex(null);
          }
        },
        theme: {
          color: "#4f46e5",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      setLoadingIndex(null);
    }
  };

  return (
    <div className="pricing-container">
      {pricingOptions.map((option, index) => {
        const discountPercent = Math.round(
          ((option.original - option.discounted) / option.original) * 100
        );

        return (
          <div className="card animate-fadeInUp" key={index}>
            <div className="card-header">
              <span className="discount-badge">-{discountPercent}%</span>
              <h3>₹{option.discounted}</h3>
            </div>
            <p className="original-price">₹{option.original}</p>
            <p className="discount">
              You Save ₹{option.original - option.discounted}
            </p>
            <button
              className="pay-button"
              onClick={() =>
                handlePay(option.discounted, discountPercent, index)
              }
              disabled={loadingIndex === index}
            >
              {loadingIndex === index ? (
                <div className="loading"></div>
              ) : (
                "Pay Now"
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default DiscountCard;

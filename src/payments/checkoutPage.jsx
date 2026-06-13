import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./DiscountedCard.css";
import { addDataUser } from "../utils/userslice";
import { addDataVendor } from "../utils/vendorslice";
import { SERVER_URL } from "../utils/base";
import cross from "../resources/svg/multiply-svgrepo-com.svg";
import { useNavigate } from "react-router";

const pricingOptions = [
  { original: 100, discounted: 100 },
  { original: 500, discounted: 475 },
  { original: 1000, discounted: 900 },
  { original: 1500, discounted: 1270 },
  { original: 2000, discounted: 1600 },
  { original: 5000, discounted: 3500 },
  { original: 10000, discounted: 6000 },
  { original: 20000, discounted: 10000 },
];

const DiscountCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const [isLoading, setIsLoading] = useState(false);

  const handlePay = async (amount, discountPercent, index) => {
    setLoadingIndex(index); // 👈 show spinner on this button
    try {
      const res = await fetch(`${SERVER_URL}/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, discountPercent }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Order creation failed:", errorText);
        // setLoadingIndex(null);
        return;
      }
      setIsLoading(true);
      setLoadingIndex(null);

      const { order } = await res.json();

      const options = {
        key: "rzp_live_ymm3SOr7DUIJiM",
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
              `${SERVER_URL}/payment/verify-payment`,
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
              setLoadingIndex(null);
              const updatedData = { ...userData[0], balance: data.balance };
              const action = category === "user" ? addDataUser : addDataVendor;

              dispatch(action(updatedData));
              localStorage.setItem(category, JSON.stringify(updatedData));

              window.location.href = `/paymentSuccessful?razorpay_payment_id=${response.razorpay_payment_id}&razorpay_order_id=${response.razorpay_order_id}`;
              // setIsLoading(false);
            } else {
              setIsLoading(false);
              setLoadingIndex(null);
              window.location.href = "/paymentFailed";
            }
          } catch (err) {
            setIsLoading(false);
            setLoadingIndex(null);
            console.error("Verification failed:", err);
            alert("Something went wrong. Please try again.");
          } finally {
            // setIsLoading(false);
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
  function hanldeCrossInOrders() {
    navigate("/");
  }

  return (
    <div className="views-P">
      <img
        className="profile__close-button"
        src={cross}
        alt="cross"
        onClick={hanldeCrossInOrders}
      />
      <div
        style={{
          gridColumnEnd: "4",
          gridColumnStart: "1",
          marginBottom: "2rem",
          paddingBottom: "1.5rem",
          borderBottom: "1px solid rgba(105, 102, 102, 0.637)",
        }}
      >
        Add Balance
      </div>
      {isLoading ? (
        <div
          style={{
            marginTop: "15rem",
            background: "blur",
            height: "30rem",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <div className="loading"></div>
        </div>
      ) : (
        <div className="pricing-container">
          {pricingOptions.map((amount, index) => {
            const userAmount = {
              discounted: amount.discounted / 10,
              original: amount.original / 10,
            };
            const option = category === "user" ? userAmount : amount;
            const discountPercent = Math.round(
              ((option.original - option.discounted) / option.original) * 100
            );

            return (
              <div className="card animate-fadeInUp" key={index}>
                <div className="card-header">
                  {discountPercent === 0 ? (
                    ""
                  ) : (
                    <span className="discount-badge">-{discountPercent}%</span>
                  )}
                  <h3>₹{option.discounted}</h3>
                </div>
                <p
                  className="original-price"
                  style={{
                    textDecorationLine: discountPercent === 0 ? "none" : "",
                  }}
                >
                  ₹{option.original}
                </p>
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
      )}
    </div>
  );
};

export default DiscountCard;

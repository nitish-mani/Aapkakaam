//optimized and production ready

import axios from "axios";
import CamleCase from "../camleCase/camleCase";
import { SERVER_URL } from "../../utils/base";
import { useState } from "react";

export default function BookingList({ data }) {
  const category = localStorage.getItem("category");
  const token = `Bearer ${JSON.parse(localStorage.getItem(category))?.token}`;
  const user = JSON.parse(localStorage.getItem(category));
  const [isLoadingRatingPermission, setIsLoadingRatingPermission] =
    useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleGrantPermission = async (bookingId) => {
    console.log(bookingId, data);
    if (!navigator.onLine) {
      setError("You are offline");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setIsLoadingRatingPermission(true);
    try {
      const result = await axios.patch(
        `${SERVER_URL}/bookings/ratingPermission`,
        { bookingId },
        { headers: { Authorization: token } }
      );
      console.log(result);
      setSuccess(result.data.message);
      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      setTimeout(() => setError(""), 3000);
    } finally {
      setIsLoadingRatingPermission(false);
    }
  };

  return (
    <>
      {success && <div style={{ color: "green" }}>{success}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      <div
        style={{
          boxShadow: "0 1px 8px #868e96",
          margin: "1rem",
          padding: "1rem",
          borderRadius: "5px",
        }}
      >
        {/* Name Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: ".2rem",
          }}
        >
          <span>Name</span>
          <span>
            <CamleCase
              element={data?.userId?.name || data?.name || user?.name}
            />
          </span>
        </div>

        {/* Phone Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: ".2rem",
          }}
        >
          <span>Mobile No</span>
          <span>{data?.userId?.phoneNo || data?.phoneNo || user?.phoneNo}</span>
        </div>

        {/* Address Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            margin: ".2rem",
          }}
        >
          <span style={{ textAlign: "left" }}>Address</span>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span style={{ marginLeft: "5rem" }}>Vill :-</span>
            <span>
              {data.userId?.address[0].vill ||
                data?.vill ||
                user?.address[0]?.vill}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span style={{ marginLeft: "5rem" }}>Post :-</span>
            <span>
              {data.userId?.address[0].post ||
                data?.post ||
                user?.address[0]?.post}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span style={{ marginLeft: "5rem" }}>Dist :-</span>
            <span>
              {data.userId?.address[0].dist ||
                data?.dist ||
                user?.address[0]?.dist}
            </span>
          </div>
        </div>

        {/* Date Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: ".2rem",
          }}
        >
          <span>Date</span>
          <span style={{ color: "blue" }}>{data.bookingDate}</span>
        </div>

        {/* Rating Section */}
        {data.orderCompleted && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Rated By User</span>
            <span>
              {data.rating > 0 ? (
                `${data.rating} / 5`
              ) : (
                <span>
                  Not Rated Yet:-
                  <span
                    style={{
                      color: "blue",
                      cursor: "pointer",
                    }}
                    onClick={() => handleGrantPermission(data._id)}
                  >
                    {isLoadingRatingPermission ? (
                      <div className="loading"></div>
                    ) : (
                      "Grant Permission"
                    )}
                  </span>
                </span>
              )}
            </span>
          </div>
        )}

        {/* Status Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>Booking Status</span>
          <span
            style={{
              color: data.cancelOrder
                ? "red"
                : data.orderCompleted
                ? "green"
                : "blue",
            }}
          >
            {data.cancelOrder
              ? "Canceled"
              : data.orderCompleted
              ? "Completed"
              : "Pending"}
          </span>
        </div>
      </div>
    </>
  );
}

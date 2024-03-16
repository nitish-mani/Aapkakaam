import axios from "axios";
import CamleCase from "../camleCase/camleCase";
import { SERVER_URL } from "../../utils/base";
import { useState } from "react";

export default function BookingList({ data }) {
  const category = localStorage.getItem("category");
  const token = `Bearer ${JSON.parse(localStorage.getItem(category)).token}`;

  const [isLoadinRatingPermission, setIsLoadingRatingPermission] =
    useState(false);
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");

  function handleGrantPermission(bookingId) {
    setIsLoadingRatingPermission(true);
    axios
      .patch(
        `${SERVER_URL}/bookings/ratingPermission`,
        { bookingId },
        {
          headers: { Authorization: token },
        }
      )
      .then((result) => {
        setIsLoadingRatingPermission(false);
        setSuccess(result.data.message);
        setTimeout(() => {
          setSuccess("");
        }, 2000);
      })
      .catch((err) => {
        setIsLoadingRatingPermission(false);
        setErr(err.response.data.message);
        setTimeout(() => {
          setErr("");
        }, 3000);
      });
  }

  return (
    <>
      {success != "" ? <div style={{ color: "green" }}>{success}</div> : ""}
      {err != "" ? <div style={{ color: "red" }}>{err}</div> : ""}
      <div
        style={{
          boxShadow: "0 1px 8px #868e96",
          margin: "1rem",
          padding: "1rem",
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: ".2rem",
          }}
        >
          <span>Name</span>
          <span>
            {" "}
            <CamleCase element={data?.name} />
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: ".2rem",
          }}
        >
          <span>Mobile No</span>
          <span> {data?.phoneNo}</span>
        </div>
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
            <span> {data.address.vill}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span style={{ marginLeft: "5rem" }}>Post :-</span>{" "}
            <span> {data.address.post}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span style={{ marginLeft: "5rem" }}>Dist :-</span>
            <span> {data.address.dist}</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: ".2rem",
          }}
        >
          <span>Date</span>
          <span style={{ color: "blue" }}>
            {data?.date}/{data.month + 1}/{data.year}
          </span>
        </div>

        {data.orderCompleted ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Rated By User </span>{" "}
            <span>
              {" "}
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
                    onClick={() => handleGrantPermission(data.bookingId)}
                  >
                    {isLoadinRatingPermission ? (
                      <div className="loading"></div>
                    ) : (
                      "Grant Permission"
                    )}
                  </span>
                </span>
              )}
            </span>
          </div>
        ) : (
          ""
        )}

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

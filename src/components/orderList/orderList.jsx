import { useEffect, useState } from "react";
import { SERVER_URL } from "../../utils/base";
import CamleCase from "../camleCase/camleCase";
import "./orderList";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCancelOrder } from "../../utils/categoryslice";
import PopUP from "../popup/popup";
import { addDataVendor } from "../../utils/vendorslice";
import { addDataUser } from "../../utils/userslice";

export default function OrderList({ element, orderStatus }) {
  const dispatch = useDispatch();

  const category = localStorage.getItem("category");

  const userData =
    category === "user"
      ? useSelector((store) => store.user.data)
      : useSelector((store) => store.vendor.data);

  const cancelOrder = useSelector((store) => store.category.cancelOrder);

  const [isLoadingRating, setIsLoadingRating] = useState(false);
  const [isLoadingCancelOrder, setIsLoadingCancelOrder] = useState(false);
  const [isLoadingCompleteOrder, setIsLoadingCompleteOrder] = useState(false);

  const [cancelOrder1, setCancelOrder1] = useState(false);
  const [markAsComplete, setMarkAsComplete] = useState(false);
  const [forRating, setForRating] = useState(false);

  const [rating, setRating] = useState("");

  const [popupCancel, setPopupCancel] = useState(false);
  const [popupComplete, setPopupComplete] = useState(false);
  const [popupRating, setPopupRating] = useState(false);

  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const token = `Bearer ${
    userData[0]?.token || JSON.parse(localStorage.getItem(category))?.token
  }`;

  function handleCancelOrder(bookingId) {
    setIsLoadingCancelOrder(true);
    if (cancelOrder1) {
      if (category == "user")
        axios
          .patch(
            `${SERVER_URL}/bookings/cancelOrderU`,
            {
              bookingId,
            },
            {
              headers: { Authorization: token },
            }
          )
          .then((succ) => {
            const data = { ...userData[0], balance: succ.data.balance };
            dispatch(addDataUser(data));
            localStorage.setItem(category, JSON.stringify(data));
            setSuccess(succ.data.message);
            dispatch(setCancelOrder(!cancelOrder));
            setIsLoadingCancelOrder(false);
            setTimeout(() => {
              setSuccess("");
            }, 1000);
          })
          .catch((err) => {
            setErr(err.response.data.message);
            setIsLoadingCancelOrder(false);
            setTimeout(() => {
              setErr("");
            }, 3000);
          });
      else if (category == "vendor")
        axios
          .patch(
            `${SERVER_URL}/bookings/cancelOrderV`,
            {
              bookingId,
            },
            {
              headers: { Authorization: token },
            }
          )
          .then((succ) => {
            const data = { ...userData[0], balance: succ.data.balance };
            dispatch(addDataVendor(data));
            localStorage.setItem(category, JSON.stringify(data));
            setSuccess(succ.data.message);
            dispatch(setCancelOrder(!cancelOrder));
            setIsLoadingCancelOrder(false);
            setTimeout(() => {
              setSuccess("");
            }, 1000);
          })
          .catch((err) => {
            setErr(err.response.data.message);
            setIsLoadingCancelOrder(false);
            setTimeout(() => {
              setErr("");
            }, 3000);
          });
    } else {
      setPopupCancel(true);
      setIsLoadingCancelOrder(false);
    }
  }

  function handleCompletedOrder(bookingId) {
    setIsLoadingCompleteOrder(true);
    if (markAsComplete) {
      if (category == "user")
        axios
          .patch(
            `${SERVER_URL}/bookings/orderCompletedU`,
            {
              bookingId,
            },
            {
              headers: { Authorization: token },
            }
          )
          .then((succ) => {
            setSuccess(succ.data.message);
            dispatch(setCancelOrder(!cancelOrder));
            setIsLoadingCompleteOrder(false);
            setTimeout(() => {
              setSuccess("");
            }, 1000);
          })
          .catch((err) => {
            setErr(err.response.data.message);
            setIsLoadingCompleteOrder(false);
            setTimeout(() => {
              setErr("");
            }, 3000);
          });
      else if (category == "vendor")
        axios
          .patch(
            `${SERVER_URL}/bookings/orderCompletedV`,
            {
              bookingId,
            },
            {
              headers: { Authorization: token },
            }
          )
          .then((succ) => {
            setSuccess(succ.data.message);
            dispatch(setCancelOrder(!cancelOrder));
            setIsLoadingCompleteOrder(false);
            setTimeout(() => {
              setSuccess("");
            }, 1000);
          })
          .catch((err) => {
            setErr(err.response.data.message);
            setIsLoadingCompleteOrder(false);
            setTimeout(() => {
              setErr("");
            }, 3000);
          });
    } else {
      setPopupComplete(true);
      setIsLoadingCompleteOrder(false);
    }
  }

  function handleRatings(bookingId, rate) {
    if (!rate) {
      setIsLoadingRating(true);
      if (forRating) {
        if (category == "user")
          axios
            .patch(
              `${SERVER_URL}/bookings/ratingU`,
              {
                bookingId,
                rating: +rating,
              },
              {
                headers: { Authorization: token },
              }
            )
            .then((succ) => {
              setSuccess(succ.data.message);
              dispatch(setCancelOrder(!cancelOrder));
              setIsLoadingRating(false);
              setTimeout(() => {
                setSuccess("");
              }, 1000);
            })
            .catch((err) => {
              setErr(err.response.data.message);
              setIsLoadingRating(false);
              setTimeout(() => {
                setErr("");
              }, 3000);
            });
        else if (category == "vendor")
          axios
            .patch(
              `${SERVER_URL}/bookings/ratingV`,
              {
                bookingId,
                rating: +rating,
              },
              {
                headers: { Authorization: token },
              }
            )
            .then((succ) => {
              setSuccess(succ.data.message);
              dispatch(setCancelOrder(!cancelOrder));
              setIsLoadingRating(false);
              setTimeout(() => {
                setSuccess("");
              }, 1000);
            })
            .catch((err) => {
              setErr(err.response.data.message);
              setIsLoadingRating(false);
              setTimeout(() => {
                setErr("");
              }, 3000);
            });
      } else {
        setPopupRating(true);
        setIsLoadingRating(false);
      }
    }
  }
  return (
    <div
      className="views-children"
      key={element.key}
      style={{
        border:
          orderStatus == "complete"
            ? "2px solid green"
            : orderStatus == "cancel"
            ? "2px solid red"
            : "2px solid blue",
      }}
    >
      <div
        className="err"
        style={{
          opacity: err ? "1" : "",
          border: "none",
          top: "-5rem",
          display: "block",
        }}
      >
        {err}
      </div>
      <div
        className="success"
        style={{
          opacity: success ? "1" : "",
          border: "none",
          top: "-5rem",
          display: "block",
        }}
      >
        {success}
      </div>
      <div>
        <span>Name :</span>{" "}
        <span>
          <CamleCase element={element.name} />
        </span>
      </div>
      <div>
        <span>Phone No :</span> <span>{element.phoneNo}</span>
      </div>
      <div>
        <span>Type :</span>
        <span>
          <CamleCase element={element.type} />
        </span>
      </div>
      <div>
        <span>Date :</span>
        <span>{element.date}</span>
      </div>
      <div style={{ gap: "1rem" }}>
        {orderStatus == "pending" ? (
          <button
            className="btn"
            style={{
              padding: isLoadingCancelOrder ? "0" : "",
              backgroundColor: "red",
            }}
            onClick={() => handleCancelOrder(element.bookingId)}
          >
            {isLoadingCancelOrder ? (
              <div className="loading"></div>
            ) : cancelOrder1 ? (
              "Cancel Now"
            ) : (
              "Cancel Order"
            )}
          </button>
        ) : (
          ""
        )}
        {orderStatus == "pending" ? (
          <button
            className="btn"
            style={{
              padding: isLoadingCompleteOrder ? "0" : "",
            }}
            onClick={() => handleCompletedOrder(element.bookingId)}
          >
            {isLoadingCompleteOrder ? (
              <div className="loading"></div>
            ) : markAsComplete ? (
              "Mark Completed Now"
            ) : (
              "Mark As Complete"
            )}
          </button>
        ) : (
          ""
        )}
      </div>
      {orderStatus == "complete" ? (
        <button
          className="btn"
          style={{
            backgroundColor: element.rating ? "#fff" : "green",
            color: element.rating ? "blue" : "",
            padding: isLoadingRating ? "0" : "",
          }}
          onClick={() => handleRatings(element.bookingId, element.rating)}
        >
          {isLoadingRating ? (
            <div className="loading"></div>
          ) : element.rating ? (
            `You have rated [ ${element.rating}/5 ]`
          ) : !forRating ? (
            "Give Rating To Vendor"
          ) : (
            `Rate Now (${rating}/5)`
          )}
        </button>
      ) : (
        ""
      )}

      {popupCancel && !cancelOrder1 ? (
        <PopUP
          purpose="cancelOrder"
          handler={setCancelOrder1}
          setPopup={setPopupCancel}
        />
      ) : (
        ""
      )}
      {popupComplete && !markAsComplete ? (
        <PopUP
          purpose="markAsComplete"
          handler={setMarkAsComplete}
          setPopup={setPopupComplete}
        />
      ) : (
        ""
      )}
      {popupRating && !forRating ? (
        <PopUP
          purpose="forRating"
          handler={setForRating}
          setPopup={setPopupRating}
          rating={rating}
          setRating={setRating}
        />
      ) : (
        ""
      )}
    </div>
  );
}

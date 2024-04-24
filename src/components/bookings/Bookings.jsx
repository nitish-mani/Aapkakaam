import Calendar from "../calendar/calendar";
import "./bookings.css";
import cross from "../../resources/svg/multiply-svgrepo-com.svg";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getCalendar } from "@skolacode/calendar-js";
import axios from "axios";
import { SERVER_URL } from "../../utils/base";
import { useSelector } from "react-redux";
import BookingList from "../bookingList/bookingList";

export default function Bookings() {
  const category = localStorage.getItem("category");

  const userData =
    category === "user"
      ? useSelector((store) => store.user.data)
      : useSelector((store) => store.vendor.data);

  const isSelectedDateValid = useSelector(
    (store) => store.category.isSelectedDateValid
  );

  const clearDateField = useSelector((store) => store.category.clearDateField);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const current_date = new Date().getDate();
  const current_month = new Date().getMonth();
  const current_year = new Date().getFullYear();

  const [month, setMonth] = useState(current_month);
  const [year, setYear] = useState(current_year);

  const [date, setDate] = useState(current_date);

  const calendar = getCalendar(month, year).calendar;
  const [bookings, setBookings] = useState([]);

  const token = `Bearer ${JSON.parse(localStorage.getItem(category)).token}`;
  const userId =
    category === "user"
      ? JSON.parse(localStorage.getItem(category)).userId
      : JSON.parse(localStorage.getItem(category)).vendorId;

  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [vill, setVill] = useState("");
  const [pincode, setPincode] = useState("");
  const [post, setPost] = useState("");
  const [dist, setDist] = useState("");
  const [booking_date, setBooking_date] = useState("");
  const [isDateClicked, setIsDateClicked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [orderStatus, setOrderStatus] = useState("pending");

  const navigate = useNavigate();
  const location = useLocation();
  const bookingsType = location.state.bookingsType;
  const pendingDate = [];
  const completeDate = [];
  const cancelDate = [];

  const pendingUserData = [];
  const completeUserData = [];
  const cancelUserData = [];

  const booked_date = new Date(`${year}/${month + 1}/${date}`).toDateString();

  useEffect(() => {
    if (isSelectedDateValid && isDateClicked && clearDateField)
      setBooking_date(`${date} / ${month + 1} / ${year}`);
    else setBooking_date("");
  }, [date, month, year]);

  function handleBookingDate(year, month) {
    if (Array.isArray(bookings))
      bookings?.forEach((data1) => {
        const data = data1.booking;
        if (data.year === year && data.month === month) {
          if (!data.cancelOrder && !data.orderCompleted) {
            pendingDate.push(data.date);
            pendingUserData.push(data);
          } else if (!data.cancelOrder && data.orderCompleted) {
            completeDate.push(data.date);
            completeUserData.push(data);
          } else if (data.cancelOrder && !data.orderCompleted) {
            cancelDate.push(data.date);
            cancelUserData.push(data);
          }
        }
      });
  }
  handleBookingDate(year, month);

  function hanldeCrossInShare() {
    navigate("/");
  }

  function getBookings() {
    if (!navigator.onLine) {
      setErr("You are offline");
      setTimeout(() => {
        setErr("");
      }, 3000);
      return;
    }
    axios
      .get(`${SERVER_URL}/vendor/getBookings/${userId}/${month}/${year}`, {
        headers: { Authorization: token },
      })
      .then((succ) => {
        setBookings(succ.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setErr("something bad happens");
        setTimeout(() => {
          setErr("");
        }, 3000);
      });
  }

  useEffect(() => {
    if (!navigator.onLine) {
      setIsLoading(false);
      setErr("You are offline");
      setTimeout(() => {
        setErr("");
      }, 3000);
      return;
    }
    setIsLoading(true);
    getBookings();
  }, [month, year]);

  function handleBookings() {
    if (!navigator.onLine) {
      setErr("You are offline");
      setTimeout(() => {
        setErr("");
      }, 3000);
      return;
    }
    setIsClicked(true);
    setIsDateClicked(false);

    if (!cancelDate.includes(date)) {
      axios
        .patch(
          `${SERVER_URL}/vendor/bookNowV/${userId}`,
          { name, phoneNo, vill, pincode, post, dist, date, month, year },
          {
            headers: { Authorization: token },
          }
        )
        .then((succ) => {
          setIsClicked(false);
          setSuccess(succ.data);
          setTimeout(() => {
            setSuccess("");
            setName("");
            setPhoneNo("");
            setVill("");
            setPincode("");
            setPost("");
            setDist("");
            setBooking_date("");
          }, 5000);
        })
        .catch((err) => {
          setIsClicked(false);
          setErr(err.data);
          setTimeout(() => {
            setErr("");
          }, 5000);
        });

      axios
        .post(`${SERVER_URL}/bookings/postToBookings`, {
          userId: userData[0].vendorId,
          vendorId: userData[0].vendorId,
          bookingDate: booked_date,
          pincode: pincode,
          type: userData[0].type,
        })
        .then((succ) => {
          setSuccess(succ.data);
          setTimeout(() => {
            setSuccess("");
          }, 5000);
        })
        .catch((err) => {
          setErr("vendor already booked");
          setTimeout(() => {
            setErr("");
          }, 5000);
        });
    }
  }

  return (
    <div className="views-P">
      <img src={cross} alt="cross" onClick={hanldeCrossInShare} />
      <h1
        style={{
          marginBottom: "2rem",
          paddingBottom: "1.5rem",
          borderBottom: "1px solid rgba(105, 102, 102, 0.637)",
        }}
      >
        {bookingsType === "view" ? "Bookings" : "Book Now"}
      </h1>

      <div className="bookings">
        <div
          className="err"
          style={{
            opacity: err ? "1" : "",
            border: err ? "" : "none",
            top: "-8rem",
          }}
        >
          {err}
        </div>
        <div
          className="success"
          style={{
            opacity: success ? "1" : "",
            border: success ? "" : "none",
            top: "-8rem",
          }}
        >
          {success.message}
        </div>
        {bookingsType === "view" ? (
          <div className="viewNow">
            <h3>
              {months[month]} {year}
            </h3>

            <div
              id="bookingView"
              style={{
                position: "sticky",
                top: "3.7rem",
                padding: ".5rem",
                backgroundColor: "#fff",
              }}
            >
              <div
                style={{
                  border:
                    orderStatus != "pending"
                      ? "3px solid #fff"
                      : "3px solid black",
                  padding: ".3rem",
                  borderRadius: "5px",
                }}
                onClick={() => setOrderStatus("pending")}
              >
                {" "}
                <button
                  className="btn"
                  style={{
                    backgroundColor: "blue",
                  }}
                >
                  Pending
                </button>
              </div>

              <div
                style={{
                  border:
                    orderStatus != "complete"
                      ? "3px solid #fff"
                      : "3px solid black",
                  padding: ".3rem",
                  borderRadius: "5px",
                }}
                onClick={() => setOrderStatus("complete")}
              >
                {" "}
                <button
                  className="btn"
                  style={{
                    backgroundColor: "green",
                  }}
                >
                  Completed
                </button>
              </div>

              <div
                style={{
                  border:
                    orderStatus != "cancel"
                      ? "3px solid #fff"
                      : "3px solid black",
                  padding: ".3rem",
                  borderRadius: "5px",
                }}
                onClick={() => setOrderStatus("cancel")}
              >
                <button
                  className="btn"
                  style={{
                    backgroundColor: "red",
                  }}
                >
                  Canceled
                </button>
              </div>
            </div>

            {isLoading ? (
              <div
                className="loading"
                style={{ width: "100%", height: "30rem" }}
              ></div>
            ) : pendingDate.length != 0 ||
              completeDate.length != 0 ||
              cancelDate.length != 0 ? (
              <div>
                {" "}
                {orderStatus == "pending" && pendingUserData.length != 0 ? (
                  pendingUserData.map((data, i) => {
                    return <BookingList data={data} key={i} />;
                  })
                ) : orderStatus == "pending" ? (
                  <div style={{ marginTop: "8rem" }}>
                    You don't have any pending booking in this month.
                  </div>
                ) : (
                  ""
                )}
                {orderStatus == "complete" && completeUserData != 0 ? (
                  completeUserData.map((data, i) => {
                    return <BookingList data={data} key={i} />;
                  })
                ) : orderStatus == "complete" ? (
                  <div style={{ marginTop: "8rem" }}>
                    You don't have any completed booking in this month.
                  </div>
                ) : (
                  ""
                )}
                {orderStatus == "cancel" && cancelUserData != 0 ? (
                  cancelUserData.map((data, i) => {
                    return <BookingList data={data} key={i} />;
                  })
                ) : orderStatus == "cancel" ? (
                  <div style={{ marginTop: "8rem" }}>
                    You don't have any canceled booking in this month.
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <div style={{ marginTop: "5rem" }}>
                There is no Bookings in this Month .
              </div>
            )}
          </div>
        ) : (
          <div className="book-now">
            <div
              className="err"
              style={{
                opacity: isSelectedDateValid ? "" : "1",
                border: "none",
                marginTop: "8rem",
              }}
            >
              You can't select previous date.
            </div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phoneNo}
              onChange={(e) => {
                setPhoneNo(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Vill"
              value={vill}
              onChange={(e) => {
                setVill(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => {
                setPincode(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Post"
              value={post}
              onChange={(e) => {
                setPost(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Dist"
              value={dist}
              onChange={(e) => {
                setDist(e.target.value);
              }}
            />

            <input
              type="text"
              placeholder="Select Date from calendar"
              value={booking_date}
              readOnly
            />
            <div className="btn" onClick={handleBookings}>
              {isClicked ? <div className="loading"></div> : "Book Now"}
            </div>
          </div>
        )}
        <Calendar
          bookingDate={
            orderStatus == "pending"
              ? pendingDate
              : orderStatus == "complete"
              ? completeDate
              : cancelDate
          }
          orderStatus={orderStatus}
          month={month}
          year={year}
          months={months}
          setDate={setDate}
          setMonth={setMonth}
          setYear={setYear}
          calendar={calendar}
          setIsDateClicked={setIsDateClicked}
        />
      </div>
    </div>
  );
}

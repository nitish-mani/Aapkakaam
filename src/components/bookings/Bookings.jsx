// optimized and production ready

import Calendar from "../calendar/calendar";
import "./bookings.css";
import cross from "../../resources/svg/multiply-svgrepo-com.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo, useCallback } from "react";
import { getCalendar } from "@skolacode/calendar-js";
import axios from "axios";
import { SERVER_URL } from "../../utils/base";
import { useSelector } from "react-redux";
import BookingList from "../bookingList/bookingList";
import AdsterraBanner_320x50 from "../../ads/adsterraInFrameBanner";
import AdsterraBanner from "../../ads/adsterraNativeBanner";

const MONTHS = [
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

export default function Bookings() {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingsType } = location.state;

  const category = localStorage.getItem("category");
  const userData = useSelector((store) => store[category].data);
  const isSelectedDateValid = useSelector(
    (store) => store.category.isSelectedDateValid
  );
  const clearDateField = useSelector((store) => store.category.clearDateField);

  const now = new Date();
  const [date, setDate] = useState(now.getDate());
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isDateClicked, setIsDateClicked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [orderStatus, setOrderStatus] = useState("pending");

  // Form fields
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [vill, setVill] = useState("");
  const [pincode, setPincode] = useState("");
  const [post, setPost] = useState("");
  const [dist, setDist] = useState("");
  const [bookingDate, setBookingDate] = useState("");

  const token = `Bearer ${JSON.parse(localStorage.getItem(category))?.token}`;
  const userId = JSON.parse(localStorage.getItem(category))?.[`${category}Id`];
  const bookedDate = new Date(`${year}/${month + 1}/${date}`).toDateString();
  const calendar = useMemo(
    () => getCalendar(month, year).calendar,
    [month, year]
  );

  // Process bookings data
  const {
    pendingDates,
    completeDates,
    cancelDates,
    pendingData,
    completeData,
    cancelData,
  } = useMemo(() => {
    const pendingDates = [];
    const completeDates = [];
    const cancelDates = [];
    const pendingData = [];
    const completeData = [];
    const cancelData = [];

    if (Array.isArray(bookings)) {
      bookings.forEach(({ booking }) => {
        if (booking.year === year && booking.month === month) {
          if (!booking.cancelOrder && !booking.orderCompleted) {
            pendingDates.push(booking.date);
            pendingData.push(booking);
          } else if (!booking.cancelOrder && booking.orderCompleted) {
            completeDates.push(booking.date);
            completeData.push(booking);
          } else if (booking.cancelOrder && !booking.orderCompleted) {
            cancelDates.push(booking.date);
            cancelData.push(booking);
          }
        }
      });
    }

    return {
      pendingDates,
      completeDates,
      cancelDates,
      pendingData,
      completeData,
      cancelData,
    };
  }, [bookings, month, year]);

  // Set booking date when date is selected
  useEffect(() => {
    setBookingDate(
      isSelectedDateValid && isDateClicked && clearDateField
        ? `${date} / ${month + 1} / ${year}`
        : ""
    );
  }, [date, month, year, isSelectedDateValid, isDateClicked, clearDateField]);

  // Fetch bookings data
  const fetchBookings = useCallback(async () => {
    if (!navigator.onLine) {
      setError("You are offline");
      setTimeout(() => setError(""), 3000);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(
        `${SERVER_URL}/vendor/getBookings/${userId}/${month}/${year}`,
        { headers: { Authorization: token } }
      );
      setBookings(response.data);
    } catch (err) {
      setError("Something went wrong");
      setTimeout(() => setError(""), 3000);
    } finally {
      setIsLoading(false);
    }
  }, [month, year, userId, token]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Handle booking submission
  const handleBookings = useCallback(async () => {
    if (!navigator.onLine) {
      setError("You are offline");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (completeDates.includes(date) || pendingDates.includes(date)) return;

    try {
      setIsClicked(true);

      // First API call to create booking
      const bookingResponse = await axios.post(
        `${SERVER_URL}/bookings/postToBookingsV`,
        {
          userId: userData[0].vendorId,
          vendorId: userData[0].vendorId,
          bookingDate: bookedDate,
          pincode,
          type: userData[0].type,
          isSelfBooking: true,
        },
        { headers: { Authorization: token } }
      );

      // Second API call to update booking details
      await axios.patch(
        `${SERVER_URL}/vendor/bookNowV/${userId}`,
        {
          bookingId: bookingResponse.data.bookingId,
          vendorUser: userData[0].vendorId,
          name,
          phoneNo,
          vill,
          post,
          dist,
          pincode,
          date,
          month,
          year,
          isSelfBooking: true,
        },
        { headers: { Authorization: token } }
      );

      setSuccess("Booking successful!");
      setTimeout(() => {
        setSuccess("");
        // Reset form fields
        setName("");
        setPhoneNo("");
        setVill("");
        setPincode("");
        setPost("");
        setDist("");
        setBookingDate("");
      }, 5000);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
      setTimeout(() => setError(""), 5000);
    } finally {
      setIsClicked(false);
    }
  }, [
    date,
    month,
    year,
    pincode,
    name,
    phoneNo,
    vill,
    post,
    dist,
    userId,
    token,
    userData,
    bookedDate,
    completeDates,
    pendingDates,
  ]);

  const handleCrossClick = () => navigate("/");

  const renderStatusButton = (status, label, color) => (
    <div
      style={{
        border: orderStatus !== status ? "3px solid #fff" : "3px solid black",
        padding: ".3rem",
        borderRadius: "5px",
      }}
      onClick={() => setOrderStatus(status)}
    >
      <button className="btn" style={{ backgroundColor: color }}>
        {label}
      </button>
    </div>
  );

  const renderBookingsList = () => {
    if (isLoading) {
      return (
        <div
          className="loading"
          style={{ width: "100%", height: "30rem" }}
        ></div>
      );
    }

    if (!pendingDates.length && !completeDates.length && !cancelDates.length) {
      return (
        <div style={{ marginTop: "5rem" }}>
          There are no bookings this month.
        </div>
      );
    }

    let dataToRender = [];
    let emptyMessage = "";

    switch (orderStatus) {
      case "pending":
        dataToRender = pendingData;
        emptyMessage = "You don't have any pending bookings this month.";
        break;
      case "complete":
        dataToRender = completeData;
        emptyMessage = "You don't have any completed bookings this month.";
        break;
      case "cancel":
      default:
        dataToRender = cancelData;
        emptyMessage = "You don't have any canceled bookings this month.";
    }

    return dataToRender.length ? (
      dataToRender.map((data, i) => <BookingList data={data} key={i} />)
    ) : (
      <div style={{ marginTop: "8rem" }}>{emptyMessage}</div>
    );
  };

  return (
    <>
      <AdsterraBanner_320x50 />
      <div className="views-P">
        <img
          src={cross}
          alt="Close"
          className="bookings__close-button"
          onClick={handleCrossClick}
        />
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
          {/* Error and Success Messages */}
          {error && (
            <div
              className="err"
              style={{ opacity: 1, border: "none", top: "-8rem" }}
            >
              {error}
            </div>
          )}
          {success && (
            <div
              className="success"
              style={{ opacity: 1, border: "none", top: "-8rem" }}
            >
              {success}
            </div>
          )}

          {bookingsType === "view" ? (
            <div className="viewNow">
              <h3>
                {MONTHS[month]} {year}
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
                {renderStatusButton("pending", "Pending", "blue")}
                {renderStatusButton("complete", "Completed", "green")}
                {renderStatusButton("cancel", "Canceled", "red")}
              </div>

              {renderBookingsList()}
            </div>
          ) : (
            <div className="book-now">
              {!isSelectedDateValid && (
                <div
                  className="err"
                  style={{ opacity: 1, border: "none", marginTop: "8rem" }}
                >
                  You can't select previous date.
                </div>
              )}

              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="number"
                placeholder="Mobile Number"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
              <input
                type="text"
                placeholder="Vill"
                value={vill}
                onChange={(e) => setVill(e.target.value)}
              />
              <input
                type="text"
                placeholder="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
              <input
                type="text"
                placeholder="Post"
                value={post}
                onChange={(e) => setPost(e.target.value)}
              />
              <input
                type="text"
                placeholder="Dist"
                value={dist}
                onChange={(e) => setDist(e.target.value)}
              />

              <input
                type="text"
                placeholder="Select Date from calendar"
                value={bookingDate}
                readOnly
              />
              <button
                className="btn"
                onClick={handleBookings}
                disabled={isClicked}
              >
                {isClicked ? <div className="loading"></div> : "Book Now"}
              </button>
            </div>
          )}

          <Calendar
            bookingDate={
              orderStatus === "pending"
                ? pendingDates
                : orderStatus === "complete"
                ? completeDates
                : cancelDates
            }
            orderStatus={orderStatus}
            month={month}
            year={year}
            months={MONTHS}
            setDate={setDate}
            setMonth={setMonth}
            setYear={setYear}
            calendar={calendar}
            setIsDateClicked={setIsDateClicked}
          />
        </div>
      </div>
      <AdsterraBanner />
    </>
  );
}

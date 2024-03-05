import Calendar from "../calendar/calendar";
import "./bookings.css";
import cross from "../../resources/svg/multiply-svgrepo-com.svg";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getCalendar } from "@skolacode/calendar-js";
import axios from "axios";
import { SERVER_URL } from "../../utils/base";
import { useDispatch, useSelector } from "react-redux";

export default function Bookings() {
  const category = localStorage.getItem("category");

  const userData =
    category === "user"
      ? useSelector((store) => store.user.data)
      : useSelector((store) => store.vendor.data);

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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const bookingsType = location.state.bookingsType;
  const bookingDate = [];
  const bookingUserData = [];
  const booked_date = new Date(`${year}/${month + 1}/${date}`).toDateString();

  useEffect(() => {
    if (isDateClicked) setBooking_date(`${date} / ${month + 1} / ${year}`);
  }, [date, month, year]);

  function handleBookingDate(year, month) {
    bookings.map((data) => {
      if (data.year === year && data.month === month) {
        bookingDate.push(data.date);
        bookingUserData.push(data);
      }
    });
  }
  handleBookingDate(year, month);

  function hanldeCrossInShare() {
    navigate("/");
  }

  function getBookings() {
    axios
      .get(`${SERVER_URL}/vendor/getBookings/${userId}`, {
        headers: { Authorization: token },
      })
      .then((succ) => {
        setBookings(succ.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getBookings();
  }, []);

  function handleBookings() {
    setIsClicked(true);
    setIsDateClicked(false);

    if (!bookingDate.includes(date)) {
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
            {bookingDate.length != 0 ? (
              bookingUserData.map((data) => {
                return (
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
                      <span> {data.name}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: ".2rem",
                      }}
                    >
                      <span>Mobile No</span>
                      <span> {data.phoneNo}</span>
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
                        {data.date}/{month + 1}/{year}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ marginTop: "5rem" }}>
                There is no Bookings in this Month .
              </div>
            )}
          </div>
        ) : (
          <div className="book-now">
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
            />
            <div className="btn" onClick={handleBookings}>
              {isClicked ? <div className="loading"></div> : "Book Now"}
            </div>
          </div>
        )}
        <Calendar
          bookingDate={bookingDate}
          bookingUserData={bookingUserData}
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

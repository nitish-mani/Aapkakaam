import Calendar from "../calendar/calendar";
import "./checkBookingDate.css";
import cross from "../../resources/svg/multiply-svgrepo-com.svg";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getCalendar } from "@skolacode/calendar-js";
import { useSelector } from "react-redux";

export default function CheckBookingDate() {
  const navigate = useNavigate();
  const location = useLocation();
  const jobType = location.state.jobType;

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

  const [booking_date, setBooking_date] = useState("");
  const [isDateClicked, setIsDateClicked] = useState(false);

  const bookingDate = [];
  const bookingUserData = [];

  useEffect(() => {
    if (isSelectedDateValid && isDateClicked && clearDateField)
      setBooking_date(`${date} / ${month + 1} / ${year}`);
    else setBooking_date("");
  }, [date, month, year]);

  function hanldeCrossInShare() {
    navigate("/");
  }

  function handleCheckBookingDate() {
    if (booking_date) {
      navigate("/availableVendor", {
        state: { jobType: jobType, date, month, year },
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
        Check Booking Date
      </h1>
      <div className="checkBookingDate">
        <div
          className="err"
          style={{
            opacity: isSelectedDateValid ? "" : "1",
            border: "none",
            marginTop: "1rem",
          }}
        >
          You can't select previous date.
        </div>
        <div>
          <input
            type="text"
            placeholder="Select Date From Calendar"
            value={booking_date}
            readOnly
          />
          <button className="btn" onClick={handleCheckBookingDate}>
            Proceed
          </button>
        </div>
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

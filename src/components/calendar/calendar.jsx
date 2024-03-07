import { useDispatch } from "react-redux";
import "./calendar.css";
import {
  setClearDateField,
  setIsSelectedDateValid,
} from "../../utils/categoryslice";

export default function Calendar({
  bookingDate,
  months,
  month,
  year,
  setDate,
  setMonth,
  setYear,
  calendar,
  setIsDateClicked,
}) {
  const current_date = new Date().getDate();
  const current_month = new Date().getMonth();
  const current_year = new Date().getFullYear();

  const dispatch = useDispatch();

  function isCurrentDay(year, month, day) {
    let isCurrentDate;
    const date = new Date();
    if (
      year == date.getFullYear() &&
      month == date.getMonth() &&
      day == date.getDate()
    ) {
      isCurrentDate = true;
    } else isCurrentDate = false;

    return isCurrentDate;
  }

  function handlePrevMonth() {
    if (month < 1) {
      setMonth(11);
      setYear(year - 1);
    } else setMonth(() => month - 1);
    dispatch(setClearDateField(""));
    if (year <= 2000) setYear(2000);
  }

  function handleNextMonth() {
    if (month > 10) {
      setMonth(0);
      setYear(year + 1);
    } else setMonth(() => month + 1);

    dispatch(setClearDateField(""));
  }

  function handlePrevYear() {
    if (year <= 2000) setYear(2000);
    else setYear(() => year - 1);

    dispatch(setClearDateField(""));
  }

  function handleNextYear() {
    setYear(() => year + 1);

    dispatch(setClearDateField(""));
  }

  function selectDate(date) {
    if (bookingDate.includes(date)) alert("Already Booked...");
    else {
      if (
        (current_year == year &&
          current_month == month &&
          current_date <= date) ||
        (current_year <= year && current_month < month) ||
        current_year < year
      ) {
        setDate(date);
        setIsDateClicked(true);

        dispatch(setClearDateField(true));
        dispatch(setIsSelectedDateValid(true));
      } else {
        dispatch(setIsSelectedDateValid(false));
        setTimeout(() => {
          dispatch(setIsSelectedDateValid(true));
        }, 1000);

        dispatch(setClearDateField(""));
      }
    }
  }

  return (
    <div className="calendar">
      <div className="calendar__header">
        <div onClick={handlePrevYear} className="year">
          &lt;&lt;
        </div>
        <div onClick={handlePrevMonth} className="month">
          &lt;
        </div>
        <div className="year-month">
          {months[month]} {year}
        </div>
        <div onClick={handleNextMonth} className="month">
          &gt;
        </div>
        <div onClick={handleNextYear} className="year">
          &gt;&gt;
        </div>
      </div>
      <div className="calendar__body">
        <div key={"a"}>Mon</div>
        <div key={"b"}>Tue</div>
        <div key={"c"}>Wed</div>
        <div key={"d"}>Thu</div>
        <div key={"e"}>Fri</div>
        <div key={"f"}>Sat</div>
        <div key={"g"}>Sun</div>

        {calendar.map((data) => {
          return (
            <>
              <div
                className={`date ${
                  isCurrentDay(year, month, data[0].day) ? "isCurrentDay" : ""
                } ${
                  bookingDate.includes(data[0].day) && data[0].isCurrentMonth
                    ? "isBooked"
                    : ""
                }`}
                style={{
                  opacity: data[0].isCurrentMonth ? "" : "0",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
                key={data[0].day}
                onClick={() => selectDate(data[0].day)}
              >
                {data[0].day}
              </div>
              <div
                className={`date ${
                  isCurrentDay(year, month, data[1].day) ? "isCurrentDay" : ""
                } ${
                  bookingDate.includes(data[1].day) && data[1].isCurrentMonth
                    ? "isBooked"
                    : ""
                }`}
                style={{
                  opacity: data[1].isCurrentMonth ? "" : "0",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
                key={data[1].day}
                onClick={() => selectDate(data[1].day)}
              >
                {data[1].day}
              </div>
              <div
                className={`date ${
                  isCurrentDay(year, month, data[2].day) ? "isCurrentDay" : ""
                } ${
                  bookingDate.includes(data[2].day) && data[2].isCurrentMonth
                    ? "isBooked"
                    : ""
                }`}
                style={{
                  opacity: data[2].isCurrentMonth ? "" : "0",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
                key={data[2].day}
                onClick={() => selectDate(data[2].day)}
              >
                {data[2].day}
              </div>
              <div
                className={`date ${
                  isCurrentDay(year, month, data[3].day) ? "isCurrentDay" : ""
                } ${
                  bookingDate.includes(data[3].day) && data[3].isCurrentMonth
                    ? "isBooked"
                    : ""
                }`}
                style={{
                  opacity: data[3].isCurrentMonth ? "" : "0",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
                key={data[3].day}
                onClick={() => selectDate(data[3].day)}
              >
                {data[3].day}
              </div>
              <div
                className={`date ${
                  isCurrentDay(year, month, data[4].day) ? "isCurrentDay" : ""
                } ${
                  bookingDate.includes(data[4].day) && data[4].isCurrentMonth
                    ? "isBooked"
                    : ""
                }`}
                style={{
                  opacity: data[4].isCurrentMonth ? "" : "0",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
                key={data[4].day}
                onClick={() => selectDate(data[4].day)}
              >
                {data[4].day}
              </div>
              <div
                className={`date ${
                  isCurrentDay(year, month, data[5].day) ? "isCurrentDay" : ""
                } ${
                  bookingDate.includes(data[5].day) && data[5].isCurrentMonth
                    ? "isBooked"
                    : ""
                }`}
                style={{
                  opacity: data[5].isCurrentMonth ? "" : "0",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
                key={data[5].day}
                onClick={() => selectDate(data[5].day)}
              >
                {data[5].day}
              </div>
              <div
                className={`date ${
                  isCurrentDay(year, month, data[6].day) ? "isCurrentDay" : ""
                } ${
                  bookingDate.includes(data[6].day) && data[6].isCurrentMonth
                    ? "isBooked"
                    : ""
                }`}
                style={{
                  opacity: data[6].isCurrentMonth ? "" : "0",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
                key={data[6].day}
                onClick={() => selectDate(data[6].day)}
              >
                {data[6].day}
              </div>
            </>
          );
        })}
      </div>

      <div className="calendar__colorDetailing">
        <div className="calendar__colorDetailing-1st">
          <div>Today</div>
          <div>Booked</div>
        </div>
        <div className="calendar__colorDetailing-2nd">
          <div className="calendar__colorDetailing--today"></div>
          <div className="calendar__colorDetailing--booked"></div>
        </div>
      </div>
    </div>
  );
}

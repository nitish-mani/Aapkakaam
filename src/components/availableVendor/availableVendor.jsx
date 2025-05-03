import { useEffect, useState } from "react";
import "./availableVendor.css";
import { useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../../utils/base";
import axios from "axios";
import CamleCase from "../camleCase/camleCase";
import cross from "../../resources/svg/multiply-svgrepo-com.svg";
import VendorListItem from "../vendorListItem/vendorListItem";

export default function AvailableVendor() {
  const category = localStorage.getItem("category");

  const location = useLocation();
  const navigate = useNavigate();

  const jobType = location.state.jobType;
  const date = location.state.date;
  const month = location.state.month;
  const year = location.state.year;

  const userData =
    category === "user"
      ? useSelector((store) => store.user.data)
      : useSelector((store) => store.vendor.data);

  const pinLocation = useSelector((store) => store.category.location_pincode);

  const token = `Bearer ${JSON.parse(localStorage.getItem(category)).token}`;

  const pincode =
    pinLocation ||
    JSON.parse(localStorage.getItem(category)).address[0]?.pincode;

  const [vendorPresent, setVendorPresent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading1, setIsLoading1] = useState(false);
  const [bookingHappen, setBookingHappen] = useState(false);

  const [pageNo, setPageNo] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const [minRating, setMinRating] = useState(0);
  const [minWageRate, setMinWageRate] = useState(0);

  const booked_date = new Date(`${year}/${month + 1}/${date}`).toDateString();

  useEffect(() => {
    if (!navigator.onLine) {
      setErr("You are offline");
      setTimeout(() => {
        setErr("");
      }, 3000);
      return;
    }
    if (pincode) {
      axios
        .get(
          `${SERVER_URL}/vendor/${
            category === "user" ? "getAll" : "getAllV"
          }/${jobType}/${pincode}/${booked_date}/${pageNo}/${minRating}/${minWageRate}`,
          {
            headers: { Authorization: token },
          }
        )
        .then((result) => {
          setVendorPresent(result.data.vendors);
          const page = Math.floor(result.data.total / 12) + 1;
          setTotalPage(page);
          setIsLoading1(false);
          setTimeout(() => setIsLoading(false), 1000);
        })
        .catch((err) => {
          setIsLoading1(false);
          setErr(err.response.data.message);
          setTimeout(() => {
            setIsLoading(false);
            setErr("");
          }, 3000);
        });
    } else {
      setTimeout(() => {
        setIsLoading(false);
        navigate("/address");
      }, 5000);
    }
  }, [bookingHappen, pageNo]);

  function handleFilter() {
    setIsLoading(true);
    setIsLoading1(true);
    setBookingHappen(!bookingHappen);
  }

  function hanldeCrossInOrders() {
    navigate("/");
  }

  function handlePrev() {
    if (pageNo > 1) {
      setIsLoading(true);
      setPageNo((page) => page - 1);
    }
  }

  function handleNext() {
    if (pageNo < totalPage) {
      setIsLoading(true);
      setPageNo((page) => page + 1);
    }
  }

  return (
    <div className="views-P">
      <img src={cross} alt="cross" onClick={hanldeCrossInOrders} />
      <h1
        style={{
          gridColumnEnd: "4",
          gridColumnStart: "1",
          marginBottom: "2rem",
          paddingBottom: "1.5rem",
          borderBottom: "1px solid rgba(105, 102, 102, 0.637)",
        }}
      >
        <CamleCase element={jobType} /> List
        <div style={{ display: "inline", fontSize: "1.5rem" }}>
          (for date - {booked_date})
        </div>
      </h1>
      <div className="pageHandlerP">
        <h5>
          Filter <CamleCase element={jobType} /> List
        </h5>
        <div className="pageHandler res" style={{ width: "100%" }}>
          <select
            name=""
            id=""
            onChange={(e) => setMinRating(e.target.value)}
            style={{
              borderRadius: "5px",
              border: "2px solid black",
            }}
          >
            <option value="0">Rating</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <select
            name=""
            id=""
            onChange={(e) => setMinWageRate(e.target.value)}
            style={{
              borderRadius: "5px",
              border: "2px solid black",
            }}
          >
            <option value="0">Wage Rate</option>
            <option value="0">0</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
          </select>
          <button
            className="btn"
            style={{ width: "10rem", height: "2rem" }}
            onClick={handleFilter}
          >
            {isLoading1 ? "Loading..." : "Submit"}
          </button>
        </div>
      </div>
      <div className="available-vendor">
        {isLoading ? (
          <div
            className="loading"
            style={{ width: "80vw", height: "40rem" }}
          ></div>
        ) : pincode && vendorPresent.length != 0 ? (
          vendorPresent.map((data, i) => {
            return (
              <VendorListItem
                data={data}
                i={i}
                userData={userData}
                date={date}
                month={month}
                year={year}
                booked_date={booked_date}
                jobType={jobType}
                token={token}
                category={category}
                bookingHappen={bookingHappen}
                setBookingHappen={setBookingHappen}
              />
            );
          })
        ) : (
          <h1
            style={{
              width: "80vw",
              height: "40rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: "5rem",
            }}
          >
            <CamleCase element={jobType} /> not found in your location :-
            {pinLocation
              ? pinLocation
              : `${userData[0]?.address[0]?.post} (${userData[0]?.address[0]?.pincode})`}
          </h1>
        )}
      </div>
      <div className="pageHandler">
        <div
          className="verify-btn"
          style={{
            width: "fit-content",
            opacity: pageNo > 1 ? "1" : ".5",
            cursor: pageNo > 1 ? "pointer" : "not-allowed",
          }}
          onClick={handlePrev}
        >
          Prev
        </div>
        <div
          style={{
            width: "2rem",
            backgroundColor: "blue",
            textAlign: "center",
            color: "#fff",
            padding: ".2rem",
            borderRadius: "5px",
          }}
        >
          {pageNo}
        </div>
        <div
          className="verify-btn"
          style={{
            width: "fit-content",
            opacity: totalPage > pageNo ? "1" : ".5",
            cursor: totalPage > pageNo ? "pointer" : "not-allowed",
          }}
          onClick={handleNext}
        >
          Next
        </div>
      </div>
    </div>
  );
}

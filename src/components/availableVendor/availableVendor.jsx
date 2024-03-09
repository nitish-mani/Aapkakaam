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

  const pinLocation = useSelector((store) => store.category.location);
  console.log(pinLocation);

  const token = `Bearer ${JSON.parse(localStorage.getItem(category)).token}`;

  const pincode =
    pinLocation?.split("(")[1]?.split(")")[0] ||
    JSON.parse(localStorage.getItem(category)).address[0]?.pincode;

  const [vendorPresent, setVendorPresent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingHappen, setBookingHappen] = useState(false);

  const booked_date = new Date(`${year}/${month + 1}/${date}`).toDateString();

  useEffect(() => {
    if (pincode) {
      axios
        .get(
          `${SERVER_URL}/vendor/${
            category === "user" ? "getAll" : "getAllV"
          }/${jobType}/${pincode}/${booked_date}`,
          {
            headers: { Authorization: token },
          }
        )
        .then((result) => {
          setVendorPresent(result.data);
          setTimeout(() => setIsLoading(false), 1000);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          setTimeout(() => setIsLoading(false), 3000);
        });
    } else {
      setTimeout(() => {
        setIsLoading(false);
        navigate("/address");
      }, 5000);
    }
  }, [bookingHappen]);

  function hanldeCrossInOrders() {
    navigate("/");
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
        <h5 style={{ display: "inline", fontSize: "1.5rem" }}>
          (for date - {booked_date})
        </h5>
      </h1>
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
    </div>
  );
}

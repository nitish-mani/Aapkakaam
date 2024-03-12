import { useState } from "react";
import CamleCase from "../camleCase/camleCase";
import axios from "axios";
import { SERVER_URL } from "../../utils/base";
import "./vendorListItem.css";
import { useNavigate } from "react-router";
import male from "../../resources/svg/male-svgrepo-com.svg";
import female from "../../resources/svg/female-svgrepo-com.svg";
import Ratings from "../ratings/ratings";
import { useSelector } from "react-redux";
import store from "../../utils/store";

export default function VendorListItem({
  data,
  i,
  userData,
  date,
  month,
  year,
  booked_date,
  jobType,
  token,
  category,
  bookingHappen,
  setBookingHappen,
}) {
  const navigate = useNavigate();
  const pinLocation = useSelector((store) => store.category.location_pincode);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const pincode = pinLocation || userData[0].address[0].pincode;

  function handleBookNow(vendorId) {
    setIsLoading(true);
    if (category === "user") {
      axios
        .patch(
          `${SERVER_URL}/vendor/bookNowU/${vendorId}`,
          {
            name: userData[0].name,
            phoneNo: userData[0].phoneNo,
            vill: userData[0].address[0].vill,
            post: userData[0].address[0].post,
            dist: userData[0].address[0].dist,
            pincode: pincode,
            date,
            month,
            year,
          },
          {
            headers: { Authorization: token },
          }
        )
        .then((succ) => {
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
        });

      axios
        .post(
          `${SERVER_URL}/bookings/postToBookingsU`,
          {
            userId: userData[0].userId,
            vendorId: vendorId,
            bookingDate: booked_date,
            pincode: pincode,
            type: jobType,
          },
          {
            headers: { Authorization: token },
          }
        )
        .then((succ) => {
          setSuccess(succ.data);
          setTimeout(() => {
            setSuccess("");
            setBookingHappen(!bookingHappen);
          }, 5000);
        })
        .catch((err) => {
          setErr("vendor already booked");
          setTimeout(() => {
            setErr("");
          }, 5000);
        });
    } else if (category === "vendor") {
      axios
        .patch(
          `${SERVER_URL}/vendor/bookNowV/${vendorId}`,
          {
            name: userData[0].name,
            phoneNo: userData[0].phoneNo,
            vill: userData[0].address[0].vill,
            post: userData[0].address[0].post,
            dist: userData[0].address[0].dist,
            pincode: pincode,
            date,
            month,
            year,
          },
          {
            headers: { Authorization: token },
          }
        )
        .then((succ) => {
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
        });

      axios
        .post(
          `${SERVER_URL}/bookings/postToBookingsV`,
          {
            userId: userData[0].vendorId,
            vendorId: vendorId,
            bookingDate: booked_date,
            pincode: pincode,
            type: jobType,
          },
          {
            headers: { Authorization: token },
          }
        )
        .then((succ) => {
          setSuccess(succ.data);
          setTimeout(() => {
            setSuccess("");
            setBookingHappen(!bookingHappen);
          }, 2000);
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
    <div className="available-vendor__child" key={i}>
      <div
        className="err"
        style={{
          opacity: err ? "1" : "",
          border: "none",
          top: "-5rem",
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
        }}
      >
        {success.message}
      </div>
      <div id="profilePic">
        {data.gender == "Male" ? (
          <img src={male} alt="" />
        ) : (
          <img src={female} alt="" />
        )}
      </div>
      <div>
        <div>
          <span>
            <CamleCase element={data.name} />{" "}
          </span>
        </div>
        <div>
          <span style={{ fontSize: "1.5rem", fontWeight: "normal" }}>
            <CamleCase element={data.type} />
          </span>
        </div>
        <div>
          <Ratings rating={4.4} />
        </div>
        <div>
          <span style={{ fontSize: "1.5rem", fontWeight: "normal" }}>
            {data.phoneNo}
          </span>
        </div>
        <div>
          <p
            style={{
              fontSize: "1.3rem",
              fontWeight: "normal",
              lineHeight: "1.2rem",
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            perspiciatis fugit totam impedit hic,
          </p>
        </div>
      </div>

      <div className="vdldiv">
        <button
          className="btn"
          style={{ marginTop: "1rem" }}
          onClick={() => handleBookNow(data.vendorId)}
        >
          {isLoading ? <div className="loading"></div> : "Book Now"}
        </button>
        <h5 style={{ marginTop: "2rem" }}>
          <span style={{ fontSize: "1.5rem", marginRight: "1rem" }}>Rs</span>
          <span style={{ fontSize: "1.5rem", color: "green" }}>500 / Day</span>
        </h5>
      </div>
    </div>
  );
}

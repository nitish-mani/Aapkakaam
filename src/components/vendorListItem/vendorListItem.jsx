import { useState } from "react";
import CamleCase from "../camleCase/camleCase";
import axios from "axios";
import { SERVER_URL } from "../../utils/base";
import "./vendorListItem.css";
import { useNavigate } from "react-router";
import male from "../../resources/svg/male-svgrepo-com.svg";
import female from "../../resources/svg/female-svgrepo-com.svg";
import rupee from "../../resources/svg/rupee-1-frame-svgrepo-com.svg";
import Ratings from "../ratings/ratings";
import { useSelector, useDispatch } from "react-redux";
import { addDataVendor } from "../../utils/vendorslice";
import { addDataUser } from "../../utils/userslice";

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
  const pinLocation = useSelector((store) => store.category.location_pincode);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [btnHovered, setBtnHovered] = useState(false);
  const dispatch = useDispatch();
  const pincode = pinLocation || userData[0].address[0].pincode;
  const balance = userData[0].bonusAmount;

  function handleBookNow(vendorId) {
    if (balance >= 5) {
      setIsLoading(true);
      if (category === "user") {
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
          .then((result) => {
            const bookingId = result.data.bookingId;
            axios
              .patch(
                `${SERVER_URL}/vendor/bookNowU/${vendorId}`,
                {
                  bookingId,
                  userId: userData[0].userId,
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
                const data = {
                  ...userData[0],
                  bonusAmount: succ.data.bonusAmount,
                };
                dispatch(addDataUser(data));
                localStorage.setItem(category, JSON.stringify(data));

                setIsLoading(false);
                setBookingHappen(!bookingHappen);
                setSuccess(succ.data.message);
                setTimeout(() => {
                  setSuccess("");
                }, 2000);
              })
              .catch((err) => {
                setIsLoading(false);
                setErr(err.response.data.message);
                setTimeout(() => {
                  setErr("");
                }, 2000);
              });
          })
          .catch((err) => {
            setIsLoading(false);
            setErr(err.response.data.message);
            setTimeout(() => {
              setErr("");
            }, 2000);
          });
      } else if (category === "vendor") {
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
          .then((result) => {
            const bookingId = result.data.bookingId;
            axios
              .patch(
                `${SERVER_URL}/vendor/bookNowV/${vendorId}`,
                {
                  bookingId,
                  vendorUser: userData[0].vendorId,
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
                const data = {
                  ...userData[0],
                  bonusAmount: succ.data.bonusAmount,
                };
                dispatch(addDataVendor(data));
                localStorage.setItem(category, JSON.stringify(data));
                setIsLoading(false);
                setSuccess(succ.data.message);
                setBookingHappen(!bookingHappen);
                setTimeout(() => {
                  setSuccess("");
                }, 2000);
              })
              .catch((err) => {
                setIsLoading(false);
                setErr(err.response.data.message);
                setTimeout(() => {
                  setErr("");
                }, 2000);
              });
          })
          .catch((err) => {
            setIsLoading(false);
            setErr(err.response.data.message);
            setTimeout(() => {
              setErr("");
            }, 2000);
          });
      }
    } else {
      setErr("You don't have enough Balance for booking");
      setTimeout(() => {
        setErr("");
      }, 5000);
    }
  }
  function handleMouseHoverEnter() {
    setBtnHovered(true);
  }
  function handleMouseHoverLeave() {
    setBtnHovered(false);
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
        {success}
      </div>
      <div id="profilePic">
        {data.gender == "Male" ? (
          data.profilePic ? (
            <img
              src={data.profilePic}
              alt=""
              style={{ width: "10rem", height: "10rem", borderRadius: "50%" }}
            />
          ) : (
            <img src={male} alt="" />
          )
        ) : data.profilePic ? (
          <img
            src={data.profilePic}
            alt=""
            style={{ width: "10rem", height: "10rem", borderRadius: "50%" }}
          />
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
        <div style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <div>
            <Ratings rating={data.rating ? data.rating : 4} />
          </div>{" "}
          <p style={{ fontSize: "1.5rem" }}>
            {data.rating
              ? `   ${data.rating}/5 (${data.ratingCount}) `
              : "4.0 / 5(1)"}
          </p>
        </div>

        <div>
          <span style={{ fontSize: "1.5rem", fontWeight: "normal" }}>
            {data.phoneNo}
          </span>
        </div>
      </div>

      <div className="vdldiv">
        <button
          className="btn"
          style={{ marginTop: "1rem", position: "relative" }}
          onClick={() => handleBookNow(data._id)}
          onMouseEnter={handleMouseHoverEnter}
          onMouseLeave={handleMouseHoverLeave}
        >
          <div
            className="popmsg"
            style={{ display: btnHovered ? "block" : "none" }}
          >
            It will cost you Rs 30{" "}
          </div>
          {isLoading ? <div className="loading"></div> : "Book Now"}
        </button>
        <h5 style={{ marginTop: "2rem" }}>
          <span style={{ fontSize: "1.5rem", marginRight: "1rem" }}>
            {" "}
            <img src={rupee} alt="" style={{ width: "1.2rem" }} />{" "}
          </span>
          <span style={{ fontSize: "1.5rem", color: "green" }}>
            {data.wageRate} / Day
          </span>
        </h5>
      </div>
    </div>
  );
}

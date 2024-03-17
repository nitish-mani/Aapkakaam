import NinethComponent from "../Nineth/NinethComponent";
import SecondComponent from "../Second/SecondComponent";
import SeventhComponent from "../Seventh/SeventhComponent";
import SixthComponent from "../Sixth/SixthComponent";
import TenthComponent from "../Tenth/TenthComponent";
import ThirdComponent from "../Third/ThirdComponent";
import FourthComponent from "../Fourth/FourthComponent";
import EighthComponent from "../Eighth/EighthComponent";
import FifthComponent from "../Fifth/FifthComponent";
import FirstComponent from "../First/FirstComponent";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../utils/base";
import { addDataUser, clearDataUser } from "../../utils/userslice";
import { addDataVendor, clearDataVendor } from "../../utils/vendorslice";
import { useNavigate } from "react-router";

export default function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const category = localStorage.getItem("category");
  const address = JSON.parse(localStorage.getItem(category))?.address;
  const wageRate = JSON.parse(localStorage.getItem(category))?.wageRate;

  useEffect(() => {
    if (category === "user") dispatch(clearDataUser());
    if (category === "vendor") dispatch(clearDataVendor());

    const token = `Bearer ${JSON.parse(localStorage.getItem(category))?.token}`;
    const userId =
      category === "user"
        ? JSON.parse(localStorage.getItem(category))?.userId
        : JSON.parse(localStorage.getItem(category))?.vendorId;

    if (token && userId && category === "user") {
      axios
        .get(`${SERVER_URL}/${category}/getUserByUser/${userId}`, {
          headers: { Authorization: token },
        })
        .then((result) => {
          dispatch(clearDataUser());
          localStorage.setItem(category, JSON.stringify(result.data));

          dispatch(addDataUser(result.data));
        })
        .catch((err) => {
          localStorage.clear();
          dispatch(clearDataUser());
          navigate("/");
        });
    } else if (token && userId && category === "vendor") {
      axios
        .get(`${SERVER_URL}/${category}/getVendorByVendor/${userId}`, {
          headers: { Authorization: token },
        })
        .then((result) => {
          dispatch(clearDataVendor());
          localStorage.setItem(category, JSON.stringify(result.data));

          dispatch(addDataVendor(result.data));
        })
        .catch((err) => {
          localStorage.clear();
          dispatch(clearDataVendor());
          navigate("/");
        });
    }
  }, []);
  function handleAddAddress() {
    navigate("/address");
  }

  return (
    <>
      <div className="line"></div>
      {category === "vendor" && address?.length === 0 ? (
        <div style={{ marginTop: "8rem", textAlign: "center" }}>
          Your profile is not visible to User. Please Update Your Address to
          make your profile visible.
          <span
            className="verify-btn forgetPass"
            style={{ border: "none" }}
            onClick={handleAddAddress}
          >
            Add
          </span>
        </div>
      ) : category === "vendor" && !wageRate ? (
        <div style={{ marginTop: "8rem", textAlign: "center", color: "red" }}>
          Your profile is not visible to User. Please Set Your{" "}
          <span style={{ color: "blue" }}>Wage Rate</span> from Your Profile.
        </div>
      ) : (
        ""
      )}
      <FirstComponent />
      <SecondComponent />
      <ThirdComponent />
      <FourthComponent />
      <FifthComponent />
      <SixthComponent />
      <SeventhComponent />
      <EighthComponent />
      <NinethComponent />
      <TenthComponent />
    </>
  );
}

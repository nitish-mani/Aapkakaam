import { useState } from "react";
import "./NavBar.css";
import aapkaKaam_logo from "../../resources/svg/AapkaKaam_full2.svg";
import menu from "../../resources/svg/burger-simple-svgrepo-com.svg";
import cross from "../../resources/svg/multiply-svgrepo-com.svg";
import user from "../../resources/svg/user-svgrepo-com.svg";
import locationPinn from "../../resources/svg/location-pin-svgrepo-com.svg";
import magnifingGlass from "../../resources/svg/magnifying-glass-svgrepo-com.svg";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../profile/profile";
import { setIsVisibleUser, setPrIsVisibleUser } from "../../utils/userslice";
import {
  setIsVisibleVendor,
  setPrIsVisibleVendor,
} from "../../utils/vendorslice";

export default function NavBar() {
  const [btnClicked, setBtnClicked] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const category = localStorage.getItem("category");

  const userData =
    category === "user"
      ? useSelector((store) => store.user.data)
      : useSelector((store) => store.vendor.data);
  const isVisible =
    category === "user"
      ? useSelector((store) => store.user.isVisibleUser)
      : useSelector((store) => store.vendor.isVisibleVendor);
  const isPrVisible =
    category === "user"
      ? useSelector((store) => store.user.isPrVisibleUser)
      : useSelector((store) => store.vendor.isPrVisibleVendor);

  const address = userData[0]?.address[0]
    ? `${userData[0]?.address[0]?.post} (${userData[0]?.address[0]?.pincode})`
    : "";

  function handleLogin() {
    setBtnClicked(true);
    setTimeout(() => setBtnClicked(false), 100);
    if (userData.length === 0) navigate("/category");
    else {
      if (category === "user") dispatch(setPrIsVisibleUser(true));
      else if (category === "vendor") dispatch(setPrIsVisibleVendor(true));
    }
  }

  function handleIconChane() {
    if (category === "user") dispatch(setIsVisibleUser(false));

    if (category === "vendor") dispatch(setIsVisibleVendor(false));

    if (category === "user") dispatch(setPrIsVisibleUser(!isPrVisible));
    if (category === "vendor") dispatch(setPrIsVisibleVendor(!isPrVisible));
    if (!isVisible) {
      if (category === "user") dispatch(setIsVisibleUser(!isVisible));
      if (category === "vendor") dispatch(setIsVisibleVendor(!isVisible));
    }
  }

  function handleLogoClick() {
    navigate("/");
  }

  function handleOtherLocation() {}

  return (
    <div className="navbar">
      <div className="navbar__logo" onClick={handleLogoClick}>
        <img src={aapkaKaam_logo} alt="logo" />
      </div>

      <div className="navbar__location">
        <div>
          <img src={locationPinn} alt="" className="svg" />
        </div>

        <input
          type="text"
          placeholder="Location"
          className="input"
          value={address}
          readOnly
        />

        <div className="div">
          <img
            src={magnifingGlass}
            alt=""
            className="svg"
            onClick={handleOtherLocation}
          />
        </div>
      </div>

      <div className="navbar__action-container">
        <div className="navbar__menu" onClick={handleIconChane}>
          <img src={menu} alt="menu" />
        </div>

        <button
          className="navbar__login"
          onClick={handleLogin}
          style={{
            transform: btnClicked ? "translateY(5px)" : "",
            backgroundColor: userData?.length != 0 ? "transparent" : "",
            border: userData?.length != 0 ? "1px solid #1161e4" : "",
          }}
        >
          {userData?.length ? (
            <img src={user} alt="" style={{ width: "20px" }} />
          ) : (
            "Login"
          )}
        </button>
      </div>

      {userData?.length ? (
        <Profile />
      ) : (
        <button
          className="btn"
          onClick={handleLogin}
          style={{
            display: isVisible ? "none" : "block",
            transform: btnClicked ? "translateY(5px)" : "",
            position: "absolute",
            top: "8rem",
            right: "2rem",
            width: "fit-content",
          }}
        >
          Login
        </button>
      )}
    </div>
  );
}

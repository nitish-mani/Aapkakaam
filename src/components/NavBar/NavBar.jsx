import { useEffect, useState } from "react";
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
      <div className="navbar__search-container">
        <div className="navbar__location">
          <img src={locationPinn} alt="" className="svg" />
          <input
            type="text"
            placeholder="Location"
            className="input"
            value={address}
            readOnly
          />
          <button>
            <img
              src={magnifingGlass}
              alt=""
              className="svg"
              onClick={handleOtherLocation}
            />
          </button>
        </div>
        {/* <div className="navbar__search-services-search-box">
          <input type="text" placeholder="Search Services" />
          <button>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 32 32"
              fill="#fff"
            >
              <path d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"></path>
            </svg>
          </button>
        </div> */}
      </div>
      <div className="navbar__action-container">
        <div className="navbar__menu" onClick={handleIconChane}>
          <img
            src={menu}
            alt="menu"
            style={{ display: isVisible ? "block" : "none" }}
          />
          <img
            src={cross}
            alt="cross"
            style={{
              display: isVisible ? "none" : "block",
            }}
          />
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

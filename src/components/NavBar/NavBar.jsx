import { useState } from "react";
import "./NavBar.css";
import aapkaKaam_logo from "../../resources/svg/AapkaKaam_full2.svg";
import user from "../../resources/svg/user-svgrepo-com.svg";
import locationPinn from "../../resources/svg/location-pin-svgrepo-com.svg";
import magnifingGlass from "../../resources/svg/magnifying-glass-svgrepo-com.svg";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../profile/profile";
import { setPrIsVisibleUser } from "../../utils/userslice";
import {
  setIsVisibleVendor,
  setPrIsVisibleVendor,
} from "../../utils/vendorslice";

export default function NavBar() {
  const [btnClicked, setBtnClicked] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const category = localStorage.getItem("category");
  const token = JSON.parse(localStorage.getItem(category))?.token;

  const userData =
    category === "user"
      ? useSelector((store) => store.user.data)
      : useSelector((store) => store.vendor.data);

  const postLocation = useSelector((store) => store.category.location_post);
  const pinLocation = useSelector((store) => store.category.location_pincode);

  const address = postLocation
    ? `${postLocation}(${pinLocation})`
    : userData[0]?.address[0]
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

  function handleLogoClick() {
    navigate("/");
  }

  function handleOtherLocation() {
    navigate("/address", { state: { viewOnLocation: true } });
  }

  return (
    <div className="navbar">
      <div className="navbar__logo" onClick={handleLogoClick}>
        <img src={aapkaKaam_logo} alt="logo" />
      </div>

      <div className="navbar__location">
        <div className="div1">
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
        <button
          className="navbar__login"
          onClick={handleLogin}
          style={{
            transform: btnClicked ? "translateY(5px)" : "",
            backgroundColor: userData?.length != 0 ? "transparent" : "",
            border: userData?.length != 0 ? "1px solid #1161e4" : "",
          }}
        >
          {token ? (
            <img src={user} alt="" style={{ width: "20px" }} />
          ) : (
            "Login"
          )}
        </button>
      </div>

      {userData?.length ? <Profile /> : ""}
    </div>
  );
}

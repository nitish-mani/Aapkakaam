import { useState } from "react";
import "./NavBar.css";
import aapkaKaam_logo from "../../resources/svg/AapkaKaam_full2.svg";
import menu from "../../resources/svg/burger-simple-svgrepo-com.svg";
import cross from "../../resources/svg/multiply-svgrepo-com.svg";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { clearData } from "../../utils/userslice";

export default function NavBar() {
  const [btnClicked, setBtnClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((store) => store.user.data);
  console.log(userData);

  function handleLogin() {
    setBtnClicked(true);
    setTimeout(() => setBtnClicked(false), 100);
    if (userData.length === 0) navigate("/login");
    else {
      dispatch(clearData());
    }
  }
  function handleIconChane() {
    setIsVisible(() => !isVisible);
  }

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <img src={aapkaKaam_logo} alt="logo" />
      </div>
      <div className="navbar__search-container">
        <div className="navbar__location">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
              stroke="#aaa"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
              stroke="#aaa"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <input type="text" placeholder="Location" className="input" />
        </div>
        <div className="navbar__search-services-search-box">
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
        </div>
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
          style={{ transform: btnClicked ? "translateY(5px)" : "" }}
        >
          {userData.length ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
}

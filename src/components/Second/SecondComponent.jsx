import acmechanic from "../../resources/img/ac_mechanic.jpg";
import fridge from "../../resources/img/fridge_mechanic.jpg";
import driver from "../../resources/img/driver.jpg";
import tutor from "../../resources/img/home_tutor.jpg";
import "./SecondComponent.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function SecondComponent() {
  const navigate = useNavigate();
  const category = localStorage.getItem("category");
  const token = JSON.parse(localStorage.getItem(category))?.token;
  const lang = useSelector((store) => store.category.selectLanguage);

  const [btnClicked, setBtnClicked] = useState(false);
  const [btnClicked1, setBtnClicked1] = useState(false);
  const [btnClicked2, setBtnClicked2] = useState(false);
  const [btnClicked3, setBtnClicked3] = useState(false);

  function handleClicked() {
    setBtnClicked(true);
    setTimeout(() => setBtnClicked(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", { state: { jobType: "ac mechanic" } });
      else navigate("/category");
    }, 200);
  }
  function handleClicked1() {
    setBtnClicked1(true);
    setTimeout(() => setBtnClicked1(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", {
          state: { jobType: "fridge mechanic" },
        });
      else navigate("/category");
    }, 200);
  }
  function handleClicked2() {
    setBtnClicked2(true);
    setTimeout(() => setBtnClicked2(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", { state: { jobType: "driver" } });
      else navigate("/category");
    }, 200);
  }
  function handleClicked3() {
    setBtnClicked3(true);
    setTimeout(() => setBtnClicked3(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", { state: { jobType: "home tutor" } });
      else navigate("/category");
    }, 200);
  }
  return (
    <div className="second-div">
      <div
        className="second-div-div"
        onClick={handleClicked}
        style={{ transform: btnClicked ? "translateY(5px)" : "" }}
      >
        <img src={acmechanic} alt="AC Mechanic" />
        <div>{lang == "en" ? "AC Mechanic" : "एसी मैकेनिक"}</div>
      </div>
      <div
        className="second-div-div"
        onClick={handleClicked1}
        style={{ transform: btnClicked1 ? "translateY(5px)" : "" }}
      >
        <img src={fridge} alt="Fridge Mechanic" />
        <div>{lang == "en" ? "Fridge Mechanic" : "फ्रिज मैकेनिक"}</div>
      </div>
      <div
        className="second-div-div"
        onClick={handleClicked2}
        style={{ transform: btnClicked2 ? "translateY(5px)" : "" }}
      >
        <img src={driver} alt="Driver" />
        <div>{lang == "en" ? "Driver" : "चालक"}</div>
      </div>
      <div
        className="second-div-div"
        onClick={handleClicked3}
        style={{ transform: btnClicked3 ? "translateY(5px)" : "" }}
      >
        <img src={tutor} alt="Home Tutor" />
        <div>{lang == "en" ? "Home Tutor" : "घरेलू शिक्षक"}</div>
      </div>
    </div>
  );
}

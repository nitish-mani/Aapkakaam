import { useNavigate } from "react-router";
import "../First/FirstComponent.css";
import waiter from "../../resources/img/waiters.jpg";
import marblestone from "../../resources/img/marble_fitter.jpg";
import erikshaw from "../../resources/img/e-rikshaw.jpg";
import pualcutter from "../../resources/img/pual_cutter.jpg";
import { useState } from "react";
import { useSelector } from "react-redux";
import AdsterraBanner_320x50 from "../../ads/adsterraInFrameBanner";

export default function NinethComponent() {
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
        navigate("/checkBookingDate", {
          state: { jobType: "waiters booking" },
        });
      else navigate("/category");
    }, 200);
  }
  function handleClicked1() {
    setBtnClicked1(true);
    setTimeout(() => setBtnClicked1(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", { state: { jobType: "marble worker" } });
      else navigate("/category");
    }, 200);
  }
  function handleClicked2() {
    setBtnClicked2(true);
    setTimeout(() => setBtnClicked2(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", {
          state: { jobType: "e-rikshaw booking" },
        });
      else navigate("/category");
    }, 200);
  }
  function handleClicked3() {
    setBtnClicked3(true);
    setTimeout(() => setBtnClicked3(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", {
          state: { jobType: "pual cutter booking" },
        });
      else navigate("/category");
    }, 200);
  }
  return (
    <div className="first-div">
      <h2 className="first-heading">Services You Need, When You Need Them!</h2>
      <div
        className="first-div-div"
        onClick={handleClicked}
        style={{ transform: btnClicked ? "translateY(5px)" : "" }}
      >
        <img src={waiter} alt="Waiter" />
        <div>{lang == "en" ? "Waiter" : "वेटर"}</div>
      </div>
      <div
        className="first-div-div"
        onClick={handleClicked1}
        style={{ transform: btnClicked1 ? "translateY(5px)" : "" }}
      >
        <img src={marblestone} alt="Marble Stone Fitter" />
        <div>{lang == "en" ? "Marble Stone Fitter" : "संगमरमर लगनेवाला"}</div>
      </div>
      <div
        className="first-div-div"
        onClick={handleClicked2}
        style={{ transform: btnClicked2 ? "translateY(5px)" : "" }}
      >
        <img src={erikshaw} alt="E-Riksaw" />
        <div>{lang == "en" ? "E-Riksaw Booking" : "ई-रिक्शा बुकिंग"}</div>
      </div>
      <div
        className="first-div-div"
        onClick={handleClicked3}
        style={{ transform: btnClicked3 ? "translateY(5px)" : "" }}
      >
        <img src={pualcutter} alt="Pual Cutter" />
        <div>{lang == "en" ? "Pual Cutter" : "पुआल काटनेवाला"}</div>
      </div>
    </div>
  );
}

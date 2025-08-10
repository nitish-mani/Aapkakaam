import { useNavigate } from "react-router";
import "../Second/SecondComponent.css";
import aatachakki from "../../resources/img/aata_chakki.jpg";
import latrinetank from "../../resources/img/latrine_tank_cleaner.jpg";
import marriagehall from "../../resources/img/marriage_hall.jpg";
import shuttering from "../../resources/img/shuttering.jpg";

import { useState } from "react";
import { useSelector } from "react-redux";
import AdsterraBanner_320x50 from "../../ads/adsterraInFrameBanner";

export default function EighthComponent() {
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
        navigate("/checkBookingDate", { state: { jobType: "aata chakki" } });
      else navigate("/category");
    }, 200);
  }
  function handleClicked1() {
    setBtnClicked1(true);
    setTimeout(() => setBtnClicked1(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", {
          state: { jobType: "latrine tank cleaner" },
        });
      else navigate("/category");
    }, 200);
  }
  function handleClicked2() {
    setBtnClicked2(true);
    setTimeout(() => setBtnClicked2(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", {
          state: { jobType: "marriage hall booking" },
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
          state: { jobType: "shuttering booking" },
        });
      else navigate("/category");
    }, 200);
  }
  return (
    <div className="second-div">
      <h2 className="first-heading">
        Solve Your Chores with One Simple Click!
      </h2>
      <div
        className="second-div-div"
        onClick={handleClicked}
        style={{ transform: btnClicked ? "translateY(5px)" : "" }}
      >
        <img src={aatachakki} alt="Atta Chakki" />
        <div>{lang == "en" ? "Atta Chakki" : "आटाचक्की"}</div>
      </div>
      <div
        className="second-div-div"
        onClick={handleClicked1}
        style={{ transform: btnClicked1 ? "translateY(5px)" : "" }}
      >
        <img src={latrinetank} alt="Latrine Tank Cleaner" />
        <div>
          {lang == "en" ? "Latrine Tank Cleaner" : "शौचालय टैंक क्लीनर"}{" "}
        </div>
      </div>

      <div
        className="second-div-div"
        onClick={handleClicked2}
        style={{ transform: btnClicked2 ? "translateY(5px)" : "" }}
      >
        <img src={marriagehall} alt="Marriage Hall" />
        <div>{lang == "en" ? "Marriage Hall Booking" : "विवाह हॉल बुकिंग"}</div>
      </div>
      <div
        className="second-div-div"
        onClick={handleClicked3}
        style={{ transform: btnClicked3 ? "translateY(5px)" : "" }}
      >
        <img src={shuttering} alt="Shuttering" />
        <div>{lang == "en" ? "Shuttering Booking" : "शटरिंग बुकिंग"}</div>
      </div>
    </div>
  );
}

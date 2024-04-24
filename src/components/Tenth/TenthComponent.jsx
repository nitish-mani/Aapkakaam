import { useNavigate } from "react-router";
import "../Second/SecondComponent.css";
import ro from "../../resources/img/ro.webp";
import chaat from "../../resources/img/chaat.jpg";
import dulhaRath from "../../resources/img/dulha rath.jpg";
import kirtan from "../../resources/img/kirtan.jpg";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function TenthComponent() {
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
      if (token) navigate("/checkBookingDate", { state: { jobType: "ro" } });
      else navigate("/category");
    }, 200);
  }
  function handleClicked1() {
    setBtnClicked1(true);
    setTimeout(() => setBtnClicked1(false), 100);
    setTimeout(() => {
      if (token) navigate("/checkBookingDate", { state: { jobType: "chaat" } });
      else navigate("/category");
    }, 200);
  }
  function handleClicked2() {
    setBtnClicked2(true);
    setTimeout(() => setBtnClicked2(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", { state: { jobType: "dulha rath" } });
      else navigate("/category");
    }, 200);
  }
  function handleClicked3() {
    setBtnClicked3(true);
    setTimeout(() => setBtnClicked3(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", { state: { jobType: "kirtan mandli" } });
      else navigate("/category");
    }, 200);
  }

  return (
    <div className="second-div div-child">
      <div
        className="second-div-div"
        onClick={handleClicked}
        style={{ transform: btnClicked ? "translateY(5px)" : "" }}
      >
        <img src={ro} alt="RO" />
        <div>{lang == "en" ? "RO Water Booking" : "आरओ वाटर बुकिंग"}</div>
      </div>
      <div
        className="second-div-div"
        onClick={handleClicked1}
        style={{ transform: btnClicked1 ? "translateY(5px)" : "" }}
      >
        <img src={chaat} alt="Chaat" />
        <div>{lang == "en" ? "Chaat Booking" : "चाट बुकिंग"}</div>
      </div>
      <div
        className="second-div-div"
        onClick={handleClicked2}
        style={{ transform: btnClicked2 ? "translateY(5px)" : "" }}
      >
        <img src={dulhaRath} alt="Dulha Rath" />
        <div>{lang == "en" ? "Dulha Rath Booking" : "दुल्हारथ बुकिंग"}</div>
      </div>
      <div
        className="second-div-div"
        onClick={handleClicked3}
        style={{ transform: btnClicked3 ? "translateY(5px)" : "" }}
      >
        <img src={kirtan} alt="Kirtan" />
        <div>
          {lang == "en" ? "Kirtan Mandali Booking" : "कीर्तन मंडली बुकिंग"}
        </div>
      </div>
    </div>
  );
}

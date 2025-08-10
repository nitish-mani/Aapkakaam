import "../First/FirstComponent.css";
import miniTruck from "../../resources/img/mini_truck.jpg";
import paanWala from "../../resources/img/paan_wala.jpg";
import fruitSeller from "../../resources/img/fruits_seller.jpg";
import bhoonsaPualSeller from "../../resources/img/bhoonsa_pual_wala.jpg";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import AdsterraBanner_320x50 from "../../ads/adsterraInFrameBanner";
export default function Eleventh() {
  const navigate = useNavigate();
  const category = localStorage.getItem("category");
  const token = JSON.parse(localStorage.getItem(category))?.token;
  const [btnClicked, setBtnClicked] = useState(false);

  const lang = useSelector((store) => store.category.selectLanguage);

  function handleClicked() {
    setBtnClicked(true);
    setTimeout(() => setBtnClicked(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", {
          state: { jobType: "mini truck booking" },
        });
      else navigate("/category");
    }, 200);
  }
  function handleClicked1() {
    setBtnClicked(true);
    setTimeout(() => setBtnClicked(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", {
          state: { jobType: "paan wala" },
        });
      else navigate("/category");
    }, 200);
  }
  function handleClicked2() {
    setBtnClicked(true);
    setTimeout(() => setBtnClicked(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", {
          state: { jobType: "fruits seller" },
        });
      else navigate("/category");
    }, 200);
  }
  function handleClicked3() {
    setBtnClicked(true);
    setTimeout(() => setBtnClicked(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", {
          state: { jobType: "bhoonsa pual seller" },
        });
      else navigate("/category");
    }, 200);
  }
  return (
    <div className="first-div">
      <h2 className="first-heading">Affordable, Fast, and Nearby Services!</h2>
      <div
        className="first-div-div"
        onClick={handleClicked}
        style={{
          transform: btnClicked ? "translateY(5px)" : "",
        }}
      >
        <img src={miniTruck} alt="Mini truck" />
        <div>{lang == "en" ? "Mini Truck" : "छोटा ट्रक"}</div>
      </div>
      <div
        className="first-div-div"
        onClick={handleClicked1}
        style={{
          transform: btnClicked ? "translateY(5px)" : "",
        }}
      >
        <img src={paanWala} alt="Mini truck" />
        <div>{lang == "en" ? "Paan Wala" : "पान वाला"}</div>
      </div>
      <div
        className="first-div-div"
        onClick={handleClicked2}
        style={{
          transform: btnClicked ? "translateY(5px)" : "",
        }}
      >
        <img src={fruitSeller} alt="Mini truck" />
        <div>{lang == "en" ? "Fruits Seller" : "फल विक्रेता"}</div>
      </div>
      <div
        className="first-div-div"
        onClick={handleClicked3}
        style={{
          transform: btnClicked ? "translateY(5px)" : "",
        }}
      >
        <img src={bhoonsaPualSeller} alt="Mini truck" />
        <div>
          {lang == "en" ? "Bhoonsa Pual Seller" : "भूंसा पुआल विक्रेता"}
        </div>
      </div>
    </div>
  );
}

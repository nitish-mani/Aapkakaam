import "../First/FirstComponent.css";
import miniTruck from "../../resources/img/mini truck.jpg";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
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
        navigate("/checkBookingDate", { state: { jobType: "mini truck" } });
      else navigate("/category");
    }, 200);
  }
  return (
    <div className="flex">
      <div
        className="first-div-div"
        onClick={handleClicked}
        style={{
          transform: btnClicked ? "translateY(5px)" : "",
          width: "fit-content",
        }}
      >
        <img src={miniTruck} alt="Mini truck" style={{ width: "100%" }} />
        <div>{lang == "en" ? "Mini Truck" : "छोटा ट्रक"}</div>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router";
import "../Second/SecondComponent.css";
import car from "../../resources/img/car booking.jpg";
import lights from "../../resources/img/light booking.jpg";
import bus from "../../resources/img/bus booking.jpg";
import tenthouse from "../../resources/img/tent house.jpg";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function SixthComponent() {
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
        navigate("/checkBookingDate", { state: { jobType: "four wheeler" } });
      else navigate("/category");
    }, 200);
  }
  function handleClicked1() {
    setBtnClicked1(true);
    setTimeout(() => setBtnClicked1(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", { state: { jobType: "lights" } });
      else navigate("/category");
    }, 200);
  }
  function handleClicked2() {
    setBtnClicked2(true);
    setTimeout(() => setBtnClicked2(false), 100);
    setTimeout(() => {
      if (token) navigate("/checkBookingDate", { state: { jobType: "bus" } });
      else navigate("/category");
    }, 200);
  }
  function handleClicked3() {
    setBtnClicked3(true);
    setTimeout(() => setBtnClicked3(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", { state: { jobType: "tent house" } });
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
        <img src={car} alt="Four wheeler" />
        <div>
          {lang == "en" ? "Four Wheeler Booking" : "चार पहिया वाहन बुकिंग"}
        </div>
      </div>
      <div
        className="second-div-div"
        onClick={handleClicked1}
        style={{ transform: btnClicked1 ? "translateY(5px)" : "" }}
      >
        <img src={lights} alt="Lights" />
        <div>{lang == "en" ? "Lights Booking" : "लाइट बुकिंग"}</div>
      </div>

      <div
        className="second-div-div"
        onClick={handleClicked2}
        style={{ transform: btnClicked2 ? "translateY(5px)" : "" }}
      >
        <img src={bus} alt="Bus" />
        <div>{lang == "en" ? "Bus Booking" : "बस बुकिंग"}</div>
      </div>
      <div
        className="second-div-div"
        onClick={handleClicked3}
        style={{ transform: btnClicked3 ? "translateY(5px)" : "" }}
      >
        <img src={tenthouse} alt="Tent House" />
        <div>{lang == "en" ? "Tent House Booking" : "टेंट हाउस की बुकिंग"}</div>
      </div>
    </div>
  );
}

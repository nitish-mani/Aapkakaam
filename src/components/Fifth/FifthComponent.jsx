import { useNavigate } from "react-router";
import "../First/FirstComponent.css";
import painter from "../../resources/img/painter.jpeg";
import bikerepaire from "../../resources/img/bike repaire.jpg";
import carrepaire from "../../resources/img/car repaire.avif";
import tilesfitter from "../../resources/img/tiles fitter.jpg";
import { useState } from "react";

export default function FifthComponent() {
  const navigate = useNavigate();
  const category = localStorage.getItem("category");
  const token = JSON.parse(localStorage.getItem(category))?.token;

  const [btnClicked, setBtnClicked] = useState(false);
  const [btnClicked1, setBtnClicked1] = useState(false);
  const [btnClicked2, setBtnClicked2] = useState(false);
  const [btnClicked3, setBtnClicked3] = useState(false);

  function handleClicked() {
    setBtnClicked(true);
    setTimeout(() => setBtnClicked(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", { state: { jobType: "painter" } });
      else navigate("/category");
    }, 200);
  }
  function handleClicked1() {
    setBtnClicked1(true);
    setTimeout(() => setBtnClicked1(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", { state: { jobType: "bike repaire" } });
      else navigate("/category");
    }, 200);
  }
  function handleClicked2() {
    setBtnClicked2(true);
    setTimeout(() => setBtnClicked2(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", { state: { jobType: "car repaire" } });
      else navigate("/category");
    }, 200);
  }
  function handleClicked3() {
    setBtnClicked3(true);
    setTimeout(() => setBtnClicked3(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", { state: { jobType: "tiles fitter" } });
      else navigate("/category");
    }, 200);
  }
  return (
    <div className="first-div">
      <div
        className="first-div-div"
        onClick={handleClicked}
        style={{ transform: btnClicked ? "translateY(5px)" : "" }}
      >
        <img src={painter} alt="Painter" />
        <div>Painter</div>
      </div>
      <div
        className="first-div-div"
        onClick={handleClicked1}
        style={{ transform: btnClicked1 ? "translateY(5px)" : "" }}
      >
        <img src={bikerepaire} alt="Bike Repair" />
        <div>Bike Repaire</div>
      </div>
      <div
        className="first-div-div"
        onClick={handleClicked2}
        style={{ transform: btnClicked2 ? "translateY(5px)" : "" }}
      >
        <img src={carrepaire} alt="Car Repair" />
        <div>Car Repaire</div>
      </div>
      <div
        className="first-div-div"
        onClick={handleClicked3}
        style={{ transform: btnClicked3 ? "translateY(5px)" : "" }}
      >
        <img src={tilesfitter} alt="Tiles Fitter" />
        <div>Tiles Fitter</div>
      </div>
    </div>
  );
}

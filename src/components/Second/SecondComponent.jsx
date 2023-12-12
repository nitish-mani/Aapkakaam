import acmechanic from "../../resources/ac mechanic.jpg";
import fridge from "../../resources/fridge mechanic.jpg";
import driver from "../../resources/driver.webp";
import tutor from "../../resources/home tutor.jpg";
import "./SecondComponent.css";
import { useState } from "react";

export default function SecondComponent() {
  const [btnClicked, setBtnClicked] = useState(false);
  const [btnClicked1, setBtnClicked1] = useState(false);
  const [btnClicked2, setBtnClicked2] = useState(false);
  const [btnClicked3, setBtnClicked3] = useState(false);

  function handleClicked() {
    setBtnClicked(true);
    setTimeout(() => setBtnClicked(false), 100);
  }
  function handleClicked1() {
    setBtnClicked1(true);
    setTimeout(() => setBtnClicked1(false), 100);
  }
  function handleClicked2() {
    setBtnClicked2(true);
    setTimeout(() => setBtnClicked2(false), 100);
  }
  function handleClicked3() {
    setBtnClicked3(true);
    setTimeout(() => setBtnClicked3(false), 100);
  }
  return (
    <div className="second-div">
      <div className="second-div-div" 
        onClick={handleClicked}
        style={{ transform: btnClicked ? "translateY(5px)" : "" }}>
        <img src={acmechanic} alt="AC Mechanic" />
        <div>AC Mechanic</div>
      </div>
      <div className="second-div-div" 
        onClick={handleClicked1}
        style={{ transform: btnClicked1 ? "translateY(5px)" : "" }}>
        <img src={fridge} alt="Fridge Mechanic" />
        <div>Fridge Mechanic</div>
      </div>
      <div className="second-div-div" 
        onClick={handleClicked2}
        style={{ transform: btnClicked2 ? "translateY(5px)" : "" }}>
        <img src={driver} alt="Driver" />
        <div>Driver</div>
      </div>
      <div className="second-div-div" 
        onClick={handleClicked3}
        style={{ transform: btnClicked3 ? "translateY(5px)" : "" }}>
        <img src={tutor} alt="Home Tutor" />
        <div>Home Tutor</div>
      </div>
    </div>
  );
}

import "../Second/SecondComponent.css";
import { useState } from "react";

export default function SixthComponent() {
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
      <div
        className="second-div-div"
        onClick={handleClicked}
        style={{ transform: btnClicked ? "translateY(5px)" : "" }}
      >
        <img
          src="https://wallpaperaccess.com/full/40105.jpg"
          alt="Four wheeler"
        />
        <div>Four Wheeler Booking</div>
      </div>
      <div
        className="second-div-div"
        onClick={handleClicked1}
        style={{ transform: btnClicked1 ? "translateY(5px)" : "" }}
      >
        <img
          src="https://themprojects.com/wp-content/uploads/2018/05/lamps-lighting-wonderful-outdoor-ideas-with-unique-hanging-lights-on-regarding-outdoor-hanging-decorative-lights.jpg"
          alt="Lights"
        />
        <div>Lights Booking</div>
      </div>

      <div
        className="second-div-div"
        onClick={handleClicked2}
        style={{ transform: btnClicked2 ? "translateY(5px)" : "" }}
      >
        <img src="https://wallpaperaccess.com/full/1628627.jpg" alt="Bus" />
        <div>Bus Booking</div>
      </div>
      <div
        className="second-div-div"
        onClick={handleClicked3}
        style={{ transform: btnClicked3 ? "translateY(5px)" : "" }}
      >
        <img
          src="https://i.pinimg.com/originals/c0/36/3b/c0363b269f852293b41fca6500d02057.jpg"
          alt="Tent House"
        />
        <div>Tent House Booking</div>
      </div>
    </div>
  );
}

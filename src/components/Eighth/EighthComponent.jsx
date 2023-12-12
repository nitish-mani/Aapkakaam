import "../Second/SecondComponent.css";
import { useState } from "react";

export default function EighthComponent() {
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
          src="https://i.ytimg.com/vi/3TM_K-_x0UA/maxresdefault.jpg"
          alt="Atta Chakki"
        />
        <div>Atta Chakki</div>
      </div>
      <div
        className="second-div-div"
        onClick={handleClicked1}
        style={{ transform: btnClicked1 ? "translateY(5px)" : "" }}
      >
        <img
          src="http://s0.yellowpages.com.au/98ee1e83-a7ee-4a10-87ea-8ee834277374/a-c-liquid-waste-disposal-septic-tank-cleaning-service-mildura-3500-image.jpg"
          alt="Latrine Tank Cleaner"
        />
        <div>Latrine Tank Cleaner </div>
      </div>

      <div
        className="second-div-div"
        onClick={handleClicked2}
        style={{ transform: btnClicked2 ? "translateY(5px)" : "" }}
      >
        <img
          src="https://i.pinimg.com/originals/72/1b/6a/721b6aa40cde82b1a6dd9f504dbf63e7.jpg"
          alt="Marriage Hall"
        />
        <div>Marriage Hall Booking</div>
      </div>
      <div
        className="second-div-div"
        onClick={handleClicked3}
        style={{ transform: btnClicked3 ? "translateY(5px)" : "" }}
      >
        <img
          src="https://i.ytimg.com/vi/bcgcMb_8xis/maxresdefault.jpg"
          alt="Shuttering"
        />
        <div>Shuttering Booking</div>
      </div>
    </div>
  );
}

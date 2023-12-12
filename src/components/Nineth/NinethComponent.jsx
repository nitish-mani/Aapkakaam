import "../First/FirstComponent.css";
import { useState } from "react";

export default function NinethComponent() {
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
    <div className="first-div">
      <div
        className="first-div-div"
        onClick={handleClicked}
        style={{ transform: btnClicked ? "translateY(5px)" : "" }}
      >
        <img
          src="http://healthzap.co/wp-content/uploads/2019/12/Waiter.jpg"
          alt="Waiter"
        />
        <div>Waiter</div>
      </div>
      <div
        className="first-div-div"
        onClick={handleClicked1}
        style={{ transform: btnClicked1 ? "translateY(5px)" : "" }}
      >
        <img
          src="https://i.ytimg.com/vi/NfspCva7sOc/maxresdefault.jpg"
          alt="Marble Stone Fitter"
        />
        <div>Marble Stone Fitter</div>
      </div>
      <div
        className="first-div-div"
        onClick={handleClicked2}
        style={{ transform: btnClicked2 ? "translateY(5px)" : "" }}
      >
        <img
          src="https://1.bp.blogspot.com/-gdUQKkXPEjs/XgWv2A1RZxI/AAAAAAAAAoY/BlHZQzU4BgQyWm8_JO7f2-Nigq0Da4d4QCLcBGAsYHQ/s1600/ST1.jpg"
          alt="E-Riksaw"
        />
        <div>E-Riksaw Booking</div>
      </div>
      <div
        className="first-div-div"
        onClick={handleClicked3}
        style={{ transform: btnClicked3 ? "translateY(5px)" : "" }}
      >
        <img
          src="https://5.imimg.com/data5/KM/KT/SR/SELLER-2938346/heavy-duty-tractor-operated-chaff-cutter-machine.jpg"
          alt="Pual Cutter"
        />
        <div>Pual Cutter</div>
      </div>
    </div>
  );
}

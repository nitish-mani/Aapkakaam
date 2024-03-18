import { useNavigate } from "react-router";
import "../Second/SecondComponent.css";
import aatachakki from "../../resources/img/aatachakki.jpg";
import latrinetank from "../../resources/img/latrin tank cleaner.jpg";
import marriagehall from "../../resources/img/marriagehall.jpg";
import shuttering from "../../resources/img/shettering.jpg";

import { useState } from "react";

export default function EighthComponent() {
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
        navigate("/checkBookingDate", { state: { jobType: "marriage hall" } });
      else navigate("/category");
    }, 200);
  }
  function handleClicked3() {
    setBtnClicked3(true);
    setTimeout(() => setBtnClicked3(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", { state: { jobType: "shuttering" } });
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
        <img src={aatachakki} alt="Atta Chakki" />
        <div>Atta Chakki</div>
      </div>
      <div
        className="second-div-div"
        onClick={handleClicked1}
        style={{ transform: btnClicked1 ? "translateY(5px)" : "" }}
      >
        <img src={latrinetank} alt="Latrine Tank Cleaner" />
        <div>Latrine Tank Cleaner </div>
      </div>

      <div
        className="second-div-div"
        onClick={handleClicked2}
        style={{ transform: btnClicked2 ? "translateY(5px)" : "" }}
      >
        <img src={marriagehall} alt="Marriage Hall" />
        <div>Marriage Hall Booking</div>
      </div>
      <div
        className="second-div-div"
        onClick={handleClicked3}
        style={{ transform: btnClicked3 ? "translateY(5px)" : "" }}
      >
        <img src={shuttering} alt="Shuttering" />
        <div>Shuttering Booking</div>
      </div>
    </div>
  );
}

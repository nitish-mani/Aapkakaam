import { useNavigate } from "react-router";
import "../First/FirstComponent.css";
import generator from "../../resources/img/generator.jpg";
import auto from "../../resources/img/auto.jpg";
import dj from "../../resources/img/dj.jpg";
import dhankutti from "../../resources/img/dhankutti.jpg";
import { useState } from "react";
import { useSelector } from "react-redux";
import AdsterraBanner_320x50 from "../../ads/adsterraInFrameBanner";

export default function SeventhComponent() {
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
        navigate("/checkBookingDate", {
          state: { jobType: "generator booking" },
        });
      else navigate("/category");
    }, 200);
  }
  function handleClicked1() {
    setBtnClicked1(true);
    setTimeout(() => setBtnClicked1(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", { state: { jobType: "auto booking" } });
      else navigate("/category");
    }, 200);
  }
  function handleClicked2() {
    setBtnClicked2(true);
    setTimeout(() => setBtnClicked2(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", { state: { jobType: "dj booking" } });
      else navigate("/category");
    }, 200);
  }
  function handleClicked3() {
    setBtnClicked3(true);
    setTimeout(() => setBtnClicked3(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", {
          state: { jobType: "dhankutti booking" },
        });
      else navigate("/category");
    }, 200);
  }
  return (
    <div className="first-div">
      <h2 className="first-heading">
        Bringing Local Services to Your Doorstep!
      </h2>
      <div
        className="first-div-div"
        onClick={handleClicked}
        style={{ transform: btnClicked ? "translateY(5px)" : "" }}
      >
        <img src={generator} alt="Generator" />
        <div>{lang == "en" ? "Generator Booking" : "जनरेटर बुकिंग"}</div>
      </div>
      <div
        className="first-div-div"
        onClick={handleClicked1}
        style={{ transform: btnClicked1 ? "translateY(5px)" : "" }}
      >
        <img src={auto} alt="Auto" style={{ backgroundColor: "white" }} />
        <div>{lang == "en" ? "Auto Booking" : "ऑटो बुकिंग"}</div>
      </div>
      <div
        className="first-div-div"
        onClick={handleClicked2}
        style={{ transform: btnClicked2 ? "translateY(5px)" : "" }}
      >
        <img src={dj} alt="DJ" style={{ backgroundColor: "white" }} />
        <div>{lang == "en" ? "DJ Booking" : "डीजे बुकिंग"}</div>
      </div>
      <div
        className="first-div-div"
        onClick={handleClicked3}
        style={{ transform: btnClicked3 ? "translateY(5px)" : "" }}
      >
        <img src={dhankutti} alt="Dhankutti" />
        <div>{lang == "en" ? "Dhankutti Booking" : "धनकुट्टी बुकिंग"}</div>
      </div>
    </div>
  );
}

import "./FirstComponent.css";
import labour from "../../resources/img/labour.jpg";
import mason from "../../resources/img/mason.jpg";
import electrician from "../../resources/img/electrician.jpg";
import plumber from "../../resources/img/plumber.jpg";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function FirstComponent() {
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
        navigate("/checkBookingDate", { state: { jobType: "labour" } });
      else navigate("/category");
    }, 200);
  }
  function handleClicked1() {
    setBtnClicked1(true);
    setTimeout(() => setBtnClicked1(false), 100);
    setTimeout(() => {
      if (token) navigate("/checkBookingDate", { state: { jobType: "mason" } });
      else navigate("/category");
    }, 200);
  }
  function handleClicked2() {
    setBtnClicked2(true);
    setTimeout(() => setBtnClicked2(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", { state: { jobType: "electrician" } });
      else navigate("/category");
    }, 200);
  }
  function handleClicked3() {
    setBtnClicked3(true);
    setTimeout(() => setBtnClicked3(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", { state: { jobType: "plumber" } });
      else navigate("/category");
    }, 200);
  }

  return (
    <div className="first-div">
      <div
        className="first-div-div d1"
        onClick={handleClicked}
        style={{ transform: btnClicked ? "translateY(5px)" : "" }}
      >
        <img src={labour} alt="Labour" />
        <div>{lang == "en" ? "Labourer" : "मजदूर"}</div>
      </div>
      <div
        className="first-div-div"
        onClick={handleClicked1}
        style={{ transform: btnClicked1 ? "translateY(5px)" : "" }}
      >
        <img src={mason} alt="Mason" />
        <div>{lang == "en" ? "Mason" : "राजमिस्त्री"}</div>
      </div>
      <div
        className="first-div-div"
        onClick={handleClicked2}
        style={{ transform: btnClicked2 ? "translateY(5px)" : "" }}
      >
        <img src={electrician} alt="Electrician" />
        <div>{lang == "en" ? "Electrician" : "बिजली मिस्त्री"}</div>
      </div>
      <div
        className="first-div-div"
        onClick={handleClicked3}
        style={{ transform: btnClicked3 ? "translateY(5px)" : "" }}
      >
        <img src={plumber} alt="Plumber" />
        <div>{lang == "en" ? "Plumber" : "प्लंबर"}</div>
      </div>
    </div>
  );
}

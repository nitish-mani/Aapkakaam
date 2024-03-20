import { useNavigate } from "react-router";
import "../Second/SecondComponent.css";
import carpenter from "../../resources/img/Carpenter-Services..jpg";
import laptoprepaire from "../../resources/img/laptop repaire.jpg";
import dhobi from "../../resources/img/dhobi.jpg";
import cook from "../../resources/img/cook.jpeg";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function FourthComponent() {
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
        navigate("/checkBookingDate", { state: { jobType: "carpenter" } });
      else navigate("/category");
    }, 200);
  }
  function handleClicked1() {
    setBtnClicked1(true);
    setTimeout(() => setBtnClicked1(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", { state: { jobType: "laptop repaire" } });
      else navigate("/category");
    }, 200);
  }
  function handleClicked2() {
    setBtnClicked2(true);
    setTimeout(() => setBtnClicked2(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", { state: { jobType: "washer man" } });
      else navigate("/category");
    }, 200);
  }
  function handleClicked3() {
    setBtnClicked3(true);
    setTimeout(() => setBtnClicked3(false), 100);
    setTimeout(() => {
      if (token) navigate("/checkBookingDate", { state: { jobType: "cook" } });
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
        <img src={carpenter} alt="Carpenter" />
        <div>{lang == "en" ? "Carpenter" : "बढ़ई"}</div>
      </div>
      <div
        className="second-div-div"
        onClick={handleClicked1}
        style={{ transform: btnClicked1 ? "translateY(5px)" : "" }}
      >
        <img src={laptoprepaire} alt="Laptop Repair" />
        <div>{lang == "en" ? "Laptop Repaire" : "लैपटॉप की मरम्मत"}</div>
      </div>

      <div
        className="second-div-div"
        onClick={handleClicked2}
        style={{ transform: btnClicked2 ? "translateY(5px)" : "" }}
      >
        <img src={dhobi} alt="Washer Man" />
        <div>{lang == "en" ? "Washer Man" : "धोबी"}</div>
      </div>
      <div
        className="second-div-div"
        onClick={handleClicked3}
        style={{ transform: btnClicked3 ? "translateY(5px)" : "" }}
      >
        <img src={cook} alt="Cook" />
        <div>{lang == "en" ? "Cook" : "बाबर्ची"}</div>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router";
import pundit from "../../resources/img/pandit.jpg";
import milkman from "../../resources/img/milk_man.jpg";
import parlour from "../../resources/img/parlour.jpg";
import mehandimaker from "../../resources/img/mehandi_maker.jpg";
import "../First/FirstComponent.css";
import { useState } from "react";
import { useSelector } from "react-redux";
export default function ThirdComponent() {
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
        navigate("/checkBookingDate", { state: { jobType: "milk man" } });
      else navigate("/category");
    }, 200);
  }
  function handleClicked1() {
    setBtnClicked1(true);
    setTimeout(() => setBtnClicked1(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", { state: { jobType: "parlour" } });
      else navigate("/category");
    }, 200);
  }
  function handleClicked2() {
    setBtnClicked2(true);
    setTimeout(() => setBtnClicked2(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", { state: { jobType: "mehandi maker" } });
      else navigate("/category");
    }, 200);
  }
  function handleClicked3() {
    setBtnClicked3(true);
    setTimeout(() => setBtnClicked3(false), 100);
    setTimeout(() => {
      if (token)
        navigate("/checkBookingDate", { state: { jobType: "pundit ji" } });
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
        <img src={milkman} alt="Milk Man" />
        <div>{lang == "en" ? "Milk Man" : "दूधवाला"}</div>
      </div>
      <div
        className="first-div-div"
        onClick={handleClicked1}
        style={{ transform: btnClicked1 ? "translateY(5px)" : "" }}
      >
        <img src={parlour} alt="Parlour" />
        <div>{lang == "en" ? "Parlour" : "पार्लर"}</div>
      </div>
      <div
        className="first-div-div"
        onClick={handleClicked2}
        style={{ transform: btnClicked2 ? "translateY(5px)" : "" }}
      >
        <img src={mehandimaker} alt="Mehandi Maker" />
        <div>{lang == "en" ? "Mehandi Maker" : "मेहँदी मेकर"}</div>
      </div>
      <div
        className="first-div-div"
        onClick={handleClicked3}
        style={{ transform: btnClicked3 ? "translateY(5px)" : "" }}
      >
        <img src={pundit} alt="Pundits" />
        <div>{lang == "en" ? "Pundits" : "पंडित"}</div>
      </div>
    </div>
  );
}

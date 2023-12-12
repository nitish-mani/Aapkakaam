import pundit from "../../resources/pundit.jpeg";
import "../First/FirstComponent.css";
import { useState } from "react";
export default function ThirdComponent() {
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
          src="https://i.pinimg.com/originals/5d/3e/c7/5d3ec7d759f8ed4667b4477354044377.jpg"
          alt="Milk Man"
        />
        <div>Milk Man</div>
      </div>
      <div
        className="first-div-div"
        onClick={handleClicked1}
        style={{ transform: btnClicked1 ? "translateY(5px)" : "" }}
      >
        <img
          src="https://atzone.in/wp-content/uploads/2018/10/beauty-parlour-pic-01.jpg"
          alt="Parlour"
        />
        <div>Parlour</div>
      </div>
      <div
        className="first-div-div"
        onClick={handleClicked2}
        style={{ transform: btnClicked2 ? "translateY(5px)" : "" }}
      >
        <img
          src="https://d22ir9aoo7cbf6.cloudfront.net/wp-content/uploads/sites/2/2018/10/Henna-artists-singapore.jpg"
          alt="Mehandi Maker"
        />
        <div>Mehandi Maker</div>
      </div>
      <div
        className="first-div-div"
        onClick={handleClicked3}
        style={{ transform: btnClicked3 ? "translateY(5px)" : "" }}
      >
        <img src={pundit} alt="Pundits" />
        <div>Pundits</div>
      </div>
    </div>
  );
}

import "../First/FirstComponent.css";
import { useState } from "react";

export default function FifthComponent() {
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
          src="https://achoicepainting.com/wp-content/uploads/2019/01/professional-house-painters.jpeg"
          alt="Painter"
        />
        <div>Painter</div>
      </div>
      <div
        className="first-div-div"
        onClick={handleClicked1}
        style={{ transform: btnClicked1 ? "translateY(5px)" : "" }}
      >
        <img
          src="https://theclarklawoffice.com/wp-content/uploads/2019/05/What-Are-The-Most-Dangerous-Aftermarket-Motorcycle-Modifications-1999x1333.jpg"
          alt="Bike Repair"
        />
        <div>Bike Repair</div>
      </div>
      <div
        className="first-div-div"
        onClick={handleClicked2}
        style={{ transform: btnClicked2 ? "translateY(5px)" : "" }}
      >
        <img
          src="https://media.ed.edmunds-media.com/non-make/fe/fe_323201_1600.jpg"
          alt="Car Repair"
        />
        <div>Car Repair</div>
      </div>
      <div
        className="first-div-div"
        onClick={handleClicked3}
        style={{ transform: btnClicked3 ? "translateY(5px)" : "" }}
      >
        <img
          src="https://5.imimg.com/data5/WV/MH/SC/ANDROID-45457828/product-jpeg.jpg"
          alt="Tiles Fitter"
        />
        <div>Tiles Fitter</div>
      </div>
    </div>
  );
}

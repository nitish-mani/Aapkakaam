import axios from "axios";
import "./FirstComponent.css";
import { useState } from "react";

export default function FirstComponent() {
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
    setTimeout(() => {
      axios
        .get("http://localhost:3000/vendor/getAll/electrician")
        .then((result) => console.log(result))
        .catch((err) => console.log(err.response.data.message));
    }, 200);
  }
  function handleClicked3() {
    setBtnClicked3(true);
    setTimeout(() => setBtnClicked3(false), 100);
  }

  return (
    <div className="first-div">
      <div
        className="first-div-div d1"
        onClick={handleClicked}
        style={{ transform: btnClicked ? "translateY(5px)" : "" }}
      >
        <img
          src="https://cdn.pixabay.com/photo/2017/02/25/11/26/manual-labor-2097522_1280.jpg"
          alt="Labour"
        />
        <div>Labour</div>
      </div>
      <div
        className="first-div-div"
        onClick={handleClicked1}
        style={{ transform: btnClicked1 ? "translateY(5px)" : "" }}
      >
        <img
          src="https://cdn.pixabay.com/photo/2017/06/06/06/13/mason-2376322_1280.jpg"
          alt="Mason"
        />
        <div>Mason</div>
      </div>
      <div
        className="first-div-div"
        onClick={handleClicked2}
        style={{ transform: btnClicked2 ? "translateY(5px)" : "" }}
      >
        <img
          src="https://cdn.pixabay.com/photo/2017/09/16/14/33/electrician-2755683_1280.jpg"
          alt="Electrician"
        />
        <div>Electrician</div>
      </div>
      <div
        className="first-div-div"
        onClick={handleClicked3}
        style={{ transform: btnClicked3 ? "translateY(5px)" : "" }}
      >
        <img
          src="https://cdn.pixabay.com/photo/2013/12/13/21/13/plumber-228010_1280.jpg"
          alt="Plumber"
        />
        <div>Plumber</div>
      </div>
    </div>
  );
}

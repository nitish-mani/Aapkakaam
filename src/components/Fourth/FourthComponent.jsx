import { useNavigate } from "react-router";
import "../Second/SecondComponent.css";
import { useState } from "react";

export default function FourthComponent() {
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
        <img
          src="https://bizmaa.com/wp-content/uploads/2019/05/Carpenter-Services..jpg"
          alt="Carpenter"
        />
        <div>Carpenter</div>
      </div>
      <div
        className="second-div-div"
        onClick={handleClicked1}
        style={{ transform: btnClicked1 ? "translateY(5px)" : "" }}
      >
        <img
          src="https://www.quickfix-computers.co.uk/wp-content/uploads/2020/12/iStock-1144570833-scaled.jpg"
          alt="Laptop Repair"
        />
        <div>Laptop Repair</div>
      </div>

      <div
        className="second-div-div"
        onClick={handleClicked2}
        style={{ transform: btnClicked2 ? "translateY(5px)" : "" }}
      >
        <img
          src="https://www.thespruce.com/thmb/nY2gdDJHDv93SMoVo8bahBVcP9U=/2500x1789/filters:fill(auto,1)/BEREAVED_LAUNDRY-56a275463df78cf7727625be.jpg"
          alt="Washer Man"
        />
        <div>Washer Man</div>
      </div>
      <div
        className="second-div-div"
        onClick={handleClicked3}
        style={{ transform: btnClicked3 ? "translateY(5px)" : "" }}
      >
        <img
          src="http://s3.amazonaws.com/img.mynetdiary.com/blog/how-to-make-healthy-food-kitchen-set-up-ideas.jpeg"
          alt="Cook"
        />
        <div>Cook</div>
      </div>
    </div>
  );
}

import "./view.css";

import cross from "../../resources/svg/multiply-svgrepo-com.svg";
import { useNavigate } from "react-router";
export default function ViewOrders() {
  const navigate = useNavigate();
  const orders = [
    {
      key: 1,
      name: "Nitish",
      phoneNo: 7376610360,
      type: "Electrician",
      date: "12/02/2023",
    },
    {
      key: 2,
      name: "Nitish",
      phoneNo: 7376610360,
      type: "Electrician",
      date: "12/02/2023",
    },
    {
      key: 3,
      name: "Nitish",
      phoneNo: 7376610360,
      type: "Electrician",
      date: "12/02/2023",
    },
    {
      key: 1,
      name: "Nitish",
      phoneNo: 7376610360,
      type: "Electrician",
      date: "12/02/2023",
    },
    {
      key: 2,
      name: "Nitish",
      phoneNo: 7376610360,
      type: "Electrician",
      date: "12/02/2023",
    },
    {
      key: 3,
      name: "Nitish",
      phoneNo: 7376610360,
      type: "Electrician",
      date: "12/02/2023",
    },
  ];

  function hanldeCrossInOrders() {
    navigate("/");
  }

  return (
    <div className="views">
      <img src={cross} alt="cross" onClick={hanldeCrossInOrders} />
      {orders.map((element) => {
        const profession = element.type;
        let result = "";
        for (let i = 0; i < profession.length; i++) {
          if (i == 0) result += profession.charAt(i).toUpperCase();
          else {
            result += profession.charAt(i);
          }
        }

        return (
          <div className="views-children" key={element.key}>
            <div>
              <span>Name :</span> <span>{element.name}</span>
            </div>
            <div>
              <span>Phone No :</span> <span>{element.phoneNo}</span>
            </div>
            <div>
              <span>Type :</span>
              <span>{result}</span>
            </div>
            <div>
              <span>Date :</span>
              <span>{element.date}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

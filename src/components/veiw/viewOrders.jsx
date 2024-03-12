import "./view.css";

import cross from "../../resources/svg/multiply-svgrepo-com.svg";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../utils/base";
import { useSelector } from "react-redux";
import { clearDataUser } from "../../utils/userslice";
import { clearDataVendor } from "../../utils/vendorslice";
import CamleCase from "../camleCase/camleCase";
export default function ViewOrders() {
  const category = localStorage.getItem("category");

  const navigate = useNavigate();
  const userData =
    category === "user"
      ? useSelector((store) => store.user.data)
      : useSelector((store) => store.vendor.data);

  const token = `Bearer ${
    userData[0]?.token || JSON.parse(localStorage.getItem(category))?.token
  }`;
  const userId =
    category === "user"
      ? userData[0]?.userId ||
        JSON.parse(localStorage.getItem(category))?.userId
      : userData[0]?.vendorId ||
        JSON.parse(localStorage.getItem(category))?.vendorId;

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (category === "user") {
        axios
          .get(`${SERVER_URL}/bookings/getOrdersU/${userId}`, {
            headers: { Authorization: token },
          })
          .then((result) => {
            setOrders(result.data);
            setIsLoading(false);
          })
          .catch((err) => {
            dispatch(clearDataUser());
            localStorage.clear();
            navigate("/");
          });
      } else if (category === "vendor") {
        axios
          .get(`${SERVER_URL}/bookings/getOrdersV/${userId}`, {
            headers: { Authorization: token },
          })
          .then((result) => {
            setOrders(result.data);
            setIsLoading(false);
          })
          .catch((err) => {
            dispatch(clearDataVendor());
            localStorage.clear();
            navigate("/");
          });
      }
    }, 3000);
  }, []);

  function hanldeCrossInOrders() {
    navigate("/");
  }

  return (
    <div className="views-P">
      <img src={cross} alt="cross" onClick={hanldeCrossInOrders} />
      <h1
        style={{
          gridColumnEnd: "4",
          gridColumnStart: "1",
          marginBottom: "2rem",
          paddingBottom: "1.5rem",
          borderBottom: "1px solid rgba(105, 102, 102, 0.637)",
        }}
      >
        Orders
      </h1>
      <div className="views">
        {isLoading ? (
          <div
            className="loading"
            style={{ width: "80vw", height: "40rem" }}
          ></div>
        ) : orders.length === 0 ? (
          <h1
            style={{
              width: "80vw",
              height: "40rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            You haven't Ordered Yet !
          </h1>
        ) : (
          orders?.map((element) => {
            return (
              <div className="views-children" key={element.key}>
                <div>
                  <span>Name :</span>{" "}
                  <span>
                    <CamleCase element={element.name} />
                  </span>
                </div>
                <div>
                  <span>Phone No :</span> <span>{element.phoneNo}</span>
                </div>
                <div>
                  <span>Type :</span>
                  <span>
                    <CamleCase element={element.type} />
                  </span>
                </div>
                <div>
                  <span>Date :</span>
                  <span>{element.date}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

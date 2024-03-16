import "./view.css";

import cross from "../../resources/svg/multiply-svgrepo-com.svg";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../utils/base";
import { useSelector } from "react-redux";
import { clearDataUser } from "../../utils/userslice";
import { clearDataVendor } from "../../utils/vendorslice";
import OrderList from "../orderList/orderList";
export default function ViewOrders() {
  const category = localStorage.getItem("category");

  const navigate = useNavigate();
  const userData =
    category === "user"
      ? useSelector((store) => store.user.data)
      : useSelector((store) => store.vendor.data);

  const cancelOrder = useSelector((store) => store.category.cancelOrder);

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
  const [orderStatus, setOrderStatus] = useState("pending");

  const pendingVendorData = [];
  const completeVendorData = [];
  const cancelVendorData = [];

  useEffect(() => {
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
  }, [cancelOrder]);

  function handleOrdersView() {
    orders.forEach((data) => {
      if (!data.cancelOrder && !data.orderCompleted) {
        pendingVendorData.push(data);
      } else if (!data.cancelOrder && data.orderCompleted) {
        completeVendorData.push(data);
      } else if (data.cancelOrder && !data.orderCompleted) {
        cancelVendorData.push(data);
      }
    });
  }
  handleOrdersView();

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
        <div
          style={{
            width: "100%",
            position: "absolute",
            top: "-5rem",
            padding: ".5rem",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div
            style={{
              border:
                orderStatus != "pending" ? "3px solid #fff" : "3px solid black",
              padding: ".3rem",
              borderRadius: "5px",
            }}
            onClick={() => setOrderStatus("pending")}
          >
            {" "}
            <button
              className="btn"
              style={{
                backgroundColor: "blue",
              }}
            >
              Pending
            </button>
          </div>

          <div
            style={{
              border:
                orderStatus != "complete"
                  ? "3px solid #fff"
                  : "3px solid black",
              padding: ".3rem",
              borderRadius: "5px",
            }}
            onClick={() => setOrderStatus("complete")}
          >
            {" "}
            <button
              className="btn"
              style={{
                backgroundColor: "green",
              }}
            >
              Completed
            </button>
          </div>

          <div
            style={{
              border:
                orderStatus != "cancel" ? "3px solid #fff" : "3px solid black",
              padding: ".3rem",
              borderRadius: "5px",
            }}
            onClick={() => setOrderStatus("cancel")}
          >
            <button
              className="btn"
              style={{
                backgroundColor: "red",
              }}
            >
              Canceled
            </button>
          </div>
        </div>

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
        ) : pendingVendorData.length != 0 ||
          completeVendorData.length != 0 ||
          cancelVendorData.length != 0 ? (
          <>
            {orderStatus == "pending" && pendingVendorData.length != 0 ? (
              pendingVendorData?.map((element, i) => {
                return (
                  <OrderList
                    element={element}
                    key={i}
                    orderStatus={orderStatus}
                  />
                );
              })
            ) : orderStatus == "pending" ? (
              <div style={{ margin: "5rem auto" }}>
                You don't have any pending Order
              </div>
            ) : (
              ""
            )}
            {orderStatus == "complete" && completeVendorData.length != 0 ? (
              completeVendorData?.map((element, i) => {
                return (
                  <OrderList
                    element={element}
                    key={i}
                    orderStatus={orderStatus}
                  />
                );
              })
            ) : orderStatus == "complete" ? (
              <div style={{ margin: "5rem auto" }}>
                You don't have any completed Order
              </div>
            ) : (
              ""
            )}{" "}
            {orderStatus == "cancel" && cancelVendorData.length != 0 ? (
              cancelVendorData?.map((element, i) => {
                return (
                  <OrderList
                    element={element}
                    key={i}
                    orderStatus={orderStatus}
                  />
                );
              })
            ) : orderStatus == "cancel" ? (
              <div style={{ margin: "5rem auto" }}>
                You don't have any canceled Order
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

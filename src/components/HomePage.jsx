import { Outlet } from "react-router";
import "../index.css";
import Footer from "./Footer/Footer";
import NavBar from "./NavBar/NavBar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addData, clearData } from "../utils/userslice";

export default function Homepage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearData());
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(
        addData({
          userId: localStorage.getItem("userId"),
          name: localStorage.getItem("name"),
          email: localStorage.getItem("email"),
          verifyEmail: localStorage.getItem("verifyEmail"),
          phoneNo: localStorage.getItem("phoneNo"),
          verifyPhoneNo: localStorage.getItem("verifyPhoneNo"),
          orders: localStorage.getItem("orders"),
          share: localStorage.getItem("share"),
          balance: localStorage.getItem("balance"),
          token: localStorage.getItem("token"),
        })
      );
    }
  }, []);

  return (
    <div className="main-div">
      <NavBar />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
}

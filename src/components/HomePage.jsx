import { Outlet } from "react-router";
import "../index.css";
import Footer from "./Footer/Footer";
import NavBar from "./NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import store from "../utils/store";
import { useEffect } from "react";
import { addData, clearData } from "../utils/userslice";
import axios from "axios";
export default function Homepage() {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user.data);

 

  useEffect(() => {
    dispatch(clearData());
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(addData({
        name:localStorage.getItem("name"),
        email:localStorage.getItem("email"),
        phoneNo:localStorage.getItem("phoneNo"),
        orders:localStorage.getItem("orders"),
        share:localStorage.getItem("share"),
        balance:localStorage.getItem("balance"),
        token:localStorage.getItem("token"),
      }));
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

import { Outlet } from "react-router";
import "../index.css";
import Footer from "./Footer/Footer";
import NavBar from "./NavBar/NavBar";
export default function Homepage() {
  return (
    <div className="main-div">
      <NavBar />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
}

import "../index.css";
import EighthComponent from "./Eighth/EighthComponent";
import FifthComponent from "./Fifth/FifthComponent";
import FirstComponent from "./First/FirstComponent";
import Footer from "./Footer/Footer";
import FourthComponent from "./Fourth/FourthComponent";
import NavBar from "./NavBar/NavBar";
import NinethComponent from "./Nineth/NinethComponent";
import OutsetComponent from "./Outset/OutsetComponent";
import SecondComponent from "./Second/SecondComponent";
import SeventhComponent from "./Seventh/SeventhComponent";
import SixthComponent from "./Sixth/SixthComponent";
import TenthComponent from "./Tenth/TenthComponent";
import ThirdComponent from "./Third/ThirdComponent";
export default function Homepage() {
  return (
    <div className="main-div">
      <NavBar />

      <FirstComponent />
      <SecondComponent />
      <ThirdComponent />
      <FourthComponent />
      <FifthComponent />
      <SixthComponent />
      <SeventhComponent />
      <EighthComponent />
      <NinethComponent />
      <TenthComponent />
      <Footer />
    </div>
  );
}

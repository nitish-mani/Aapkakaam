import NinethComponent from "../Nineth/NinethComponent";
import SecondComponent from "../Second/SecondComponent";
import SeventhComponent from "../Seventh/SeventhComponent";
import SixthComponent from "../Sixth/SixthComponent";
import TenthComponent from "../Tenth/TenthComponent";
import ThirdComponent from "../Third/ThirdComponent";
import FourthComponent from "../Fourth/FourthComponent";
import EighthComponent from "../Eighth/EighthComponent";
import FifthComponent from "../Fifth/FifthComponent";
import FirstComponent from "../First/FirstComponent";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function Body() {
  const navigate = useNavigate();

  const category = localStorage.getItem("category");
  const userData =
    category == "user"
      ? useSelector((state) => state.user.data)
      : useSelector((state) => state.vendor.data);
  const address = userData[0]?.address;
  const wageRate = userData[0]?.wageRate;
  const balance = userData[0]?.balance;

  function handleAddAddress() {
    navigate("/address");
  }

  return (
    <>
      {category === "vendor" && address?.length === 0 ? (
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          Your profile is not visible to User. Please Update Your Address to
          make your profile visible.
          <span
            className="verify-btn forgetPass"
            style={{ border: "none" }}
            onClick={handleAddAddress}
          >
            Add
          </span>
        </div>
      ) : (
        ""
      )}
      {!wageRate && category === "vendor" && balance ? (
        <div style={{ marginTop: "2rem", textAlign: "center", color: "red" }}>
          Your profile is not visible to User. Please Set Your{" "}
          <span style={{ color: "blue" }}>Wage Rate</span> from Your Profile.
        </div>
      ) : (
        ""
      )}

      {balance < 5 ? (
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          Your <span style={{ color: "blue" }}>Balance</span> is{" "}
          <span style={{ color: "red" }}>0</span> . You can't do bookings{" "}
          {category == "vendor"
            ? "and as a Vendor your profile is not visible to User"
            : ""}{" "}
          . Please{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/share")}
          >
            Share
          </span>{" "}
          to your friend or <span style={{ color: "blue" }}>Recharge</span> to
          increase your Balance.
        </div>
      ) : balance <= 10 ? (
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          Your <span style={{ color: "blue" }}>Balance</span> is less than 15 Rs
          . Please{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/share")}
          >
            Share
          </span>{" "}
          to your friend or <span style={{ color: "blue" }}>Recharge</span> to
          increase your Balance.
        </div>
      ) : (
        ""
      )}
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
    </>
  );
}

import { useEffect, useState } from "react";
import "./Address.css";
import { useDispatch, useSelector } from "react-redux";
import { addDataUser, clearDataUser } from "../../utils/userslice";
import { addDataVendor, clearDataVendor } from "../../utils/vendorslice";
import { SERVER_URL } from "../../utils/base";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { setLocationPincode, setLocationPost } from "../../utils/categoryslice";
import cross from "../../resources/svg/multiply-svgrepo-com.svg";
import CamleCase from "../camleCase/camleCase";

export default function Address() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const category = localStorage.getItem("category");

  const userData =
    category === "user"
      ? useSelector((store) => store.user.data)
      : useSelector((store) => store.vendor.data);

  const viewOnLocation = location.state?.viewOnLocation;

  const [vill, setVill] = useState("");
  const [post, setPost] = useState("");
  const [dist, setDist] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [PostOfficeDetails, setPostOfficeDetails] = useState([
    { Name: "Select Post Office" },
  ]);
  const [isClicked, setIsClicked] = useState(false);
  const [err, setErr] = useState("");
  const [villEmpty, setVillEmpty] = useState(false);
  const [postEmpty, setPostEmpty] = useState(false);
  const [pincodeEmpty, setPincodeEmpty] = useState(false);
  const [success, setSuccess] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const [isAddressLoading, setIsAddressLoading] = useState(false);

  const token = `Bearer ${userData[0]?.token}`;

  useEffect(() => {
    setVillEmpty(false);
    setErr("");
  }, [vill]);

  useEffect(() => {
    setPostEmpty(false);
    setErr("");
  }, [post]);
  useEffect(() => {
    setDist("");
    setState("");
  }, [pincode]);

  useEffect(() => {
    setPostOfficeDetails([{ Name: "Select Post Office" }]);
    setErr("");
    setPincodeEmpty(false);
    if (pincode.length === 6) {
      if (!navigator.onLine) {
        setErr("You are offline");
        setTimeout(() => {
          setErr("");
        }, 3000);
        return;
      }
      setIsAddressLoading(true);
      axios
        .get(`https://api.postalpincode.in/pincode/${pincode}`)
        .then((result) => {
          if (result.data[0]?.Status === "Success") {
            setPostOfficeDetails([
              ...PostOfficeDetails,
              ...result.data[0]?.PostOffice,
            ]);
            setDist(() => result.data[0]?.PostOffice[0]?.District);
            setState(() => result.data[0]?.PostOffice[0]?.State);
            setIsDisable(false);
            setIsAddressLoading(false);
          } else {
            setErr("Enter Valid Pincode");
            setIsAddressLoading(false);
          }
        })
        .catch((err) => {
          setErr("Enter Valid Pincode");
          setIsAddressLoading(false);
        });
    }
  }, [pincode]);

  function handleSubmitAddress() {
    if (!navigator.onLine) {
      setErr("You are offline");
      setTimeout(() => {
        setErr("");
      }, 3000);
      return;
    }
    if (viewOnLocation) {
      if (pincode.length != 6) {
        setErr("Pincode Must Have 6 Charactor");
        setPincodeEmpty(true);
        return;
      }
      dispatch(setLocationPincode(pincode));
      dispatch(setLocationPost(post));
      navigate("/");
    } else {
      if (vill.length === 0) {
        setErr("Village Required");
        setVillEmpty(true);
        return;
      }
      if (pincode.length != 6) {
        setErr("Pincode Must Have 6 Charactor");
        setPincodeEmpty(true);
        return;
      }
      if (post === "") {
        setErr("Select Post Office");
        setPostEmpty(true);
        return;
      }

      if (!isDisable) {
        const villC = CamleCase({ element: vill });
        setIsClicked(true);
        if (category === "user") {
          axios
            .patch(
              `${SERVER_URL}/${category}/update/address`,
              {
                vill: villC,
                post,
                dist,
                state,
                pincode,
                userId: userData[0]?.userId,
              },
              {
                headers: { Authorization: token },
              }
            )
            .then((result) => {
              setIsClicked(false);
              setSuccess(result.data);
              const data = { ...userData[0], address: result.data.address };
              dispatch(addDataUser(data));
              localStorage.setItem(category, JSON.stringify(data));
              setTimeout(() => {
                setSuccess("");
                navigate("/");
              }, 5000);
            })
            .catch((err) => {
              setIsClicked(false);
              setErr(err.data);
              setTimeout(() => {
                setErr("");
              }, 5000);
            });
        } else if (category === "vendor") {
          axios
            .patch(
              `${SERVER_URL}/${category}/update/address`,
              {
                vill: villC,
                post,
                dist,
                state,
                pincode,
                vendorId: userData[0]?.vendorId,
              },
              {
                headers: { Authorization: token },
              }
            )
            .then((result) => {
              setIsClicked(false);
              setSuccess(result.data);

              const data = { ...userData[0], address: result.data.address };
              dispatch(addDataVendor(data));
              localStorage.setItem(category, JSON.stringify(data));
              setTimeout(() => {
                setSuccess("");
                navigate("/");
              }, 3000);
            })
            .catch((err) => {
              setIsClicked(false);
              setErr(err.data);
              setTimeout(() => {
                setErr("");
              }, 3000);
            });
        }
      }
    }
  }
  function handleCrossInAddress() {
    navigate("/");
  }
  return (
    <div className="address">
      <img
        src={cross}
        alt="cross"
        style={{
          width: "20px",
          position: "absolute",
          top: ".5rem",
          right: ".5rem",
          cursor: "pointer",
          backgroundColor: "#fff",
          borderRadius: "5px",
        }}
        onClick={handleCrossInAddress}
      />

      <div
        className="err"
        style={{
          opacity: err ? "1" : "",
          top: "-5rem",
          border: err ? "none" : "none",
        }}
      >
        {err}
      </div>
      <div
        className="success"
        style={{
          opacity: success ? "1" : "",
          top: "-5rem",

          border: success ? "none" : "none",
        }}
      >
        {success.message}
      </div>
      <div className="address__1stChild">
        {viewOnLocation ? (
          <h3>Location</h3>
        ) : (
          <h3>
            <CamleCase element={category} /> Address
          </h3>
        )}
      </div>
      <div className="address__2ndChild">
        {viewOnLocation ? (
          ""
        ) : (
          <div>
            <input
              placeholder="Village"
              type="text"
              value={vill}
              onChange={(e) => setVill(e.target.value)}
              style={{ border: villEmpty ? "2px solid red" : "" }}
            />
          </div>
        )}
        <div>
          <input
            placeholder="Enter Pincode"
            type="number"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            style={{ border: pincodeEmpty ? "2px solid red" : "" }}
          />
        </div>
        <div>
          {PostOfficeDetails.length != 1 ? (
            <select
              className="post-select"
              value={post}
              onChange={(e) => setPost(e.target.value)}
              style={{ border: postEmpty ? "2px solid red" : "" }}
            >
              {PostOfficeDetails.map((data, i) => {
                return (
                  <option key={i} value={data.Name}>
                    {data.Name}
                  </option>
                );
              })}
            </select>
          ) : (
            <div>
              <input
                placeholder={isAddressLoading ? "Loading..." : "Post"}
                style={{ textAlign: isAddressLoading ? "center" : "" }}
                type="text"
              />
            </div>
          )}
        </div>

        <div>
          <input
            placeholder={isAddressLoading ? "Loading..." : "District"}
            style={{ textAlign: isAddressLoading ? "center" : "" }}
            type="text"
            value={dist}
            readOnly
          />
        </div>
        <div>
          <input
            placeholder={isAddressLoading ? "Loading..." : "State"}
            style={{ textAlign: isAddressLoading ? "center" : "" }}
            type="text"
            value={state}
            readOnly
          />
        </div>

        <button
          className="btn"
          onClick={handleSubmitAddress}
          style={{ cursor: isDisable ? "not-allowed" : "" }}
        >
          {isClicked ? <div className="loading"></div> : "Submit"}
        </button>

        {viewOnLocation ? (
          <p
            style={{
              color: "blue",
              fontSize: "1.2rem",
              marginTop: "1rem",
              cursor: "pointer",
            }}
            onClick={() => {
              dispatch(setLocationPincode(""));
              dispatch(setLocationPost(""));
              navigate("/");
            }}
          >
            Pick from Address
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

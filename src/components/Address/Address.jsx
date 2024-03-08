import { useEffect, useState } from "react";
import "./Address.css";
import { useDispatch, useSelector } from "react-redux";
import { addDataUser, clearDataUser } from "../../utils/userslice";
import { addDataVendor, clearDataVendor } from "../../utils/vendorslice";
import { SERVER_URL } from "../../utils/base";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { setLocation } from "../../utils/categoryslice";

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
    setPostOfficeDetails([{ Name: "Select Post Office" }]);
    setErr("");
    setPincodeEmpty(false);
    if (pincode.length === 6) {
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
          } else {
            setErr("Enter Valid Pincode");
          }
        })
        .catch((err) => {
          setErr("Enter Valid Pincode");
        });
    }
  }, [pincode]);

  function camleCase(element) {
    const profession = element;
    let result = "";
    for (let i = 0; i < profession?.length; i++) {
      if (i == 0) result += profession.charAt(i).toUpperCase();
      else {
        result += profession.charAt(i);
      }
    }
    return result;
  }

  function handleSubmitAddress() {
    if (viewOnLocation) {
      if (pincode.length != 6) {
        setErr("Pincode Must Have 6 Charactor");
        setPincodeEmpty(true);
        return;
      }
      dispatch(setLocation(`${post}(${pincode})`));
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
        setIsClicked(true);
        if (category === "user") {
          axios
            .patch(
              `${SERVER_URL}/${category}/update/address`,
              {
                vill: camleCase(vill),
                post,
                dist,
                state,
                pincode,
                token: userData[0].token,
                userId: userData[0]?.userId,
              },
              {
                headers: { Authorization: token },
              }
            )
            .then((result) => {
              dispatch(clearDataUser());
              setIsClicked(false);
              setSuccess(result.data);
              dispatch(addDataUser(result.data));
              localStorage.setItem(category, JSON.stringify(result.data));
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
                vill: camleCase(vill),
                post,
                dist,
                state,
                pincode,
                token: userData[0].token,
                vendorId: userData[0]?.vendorId,
              },
              {
                headers: { Authorization: token },
              }
            )
            .then((result) => {
              dispatch(clearDataVendor());
              setIsClicked(false);
              setSuccess(result.data);
              dispatch(addDataVendor(result.data));
              localStorage.setItem(category, JSON.stringify(result.data));
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
        }
      }
    }
  }

  return (
    <div className="address">
      <div
        className="err"
        style={{ opacity: err ? "1" : "", border: err ? "" : "none" }}
      >
        {err}
      </div>
      <div
        className="success"
        style={{ opacity: success ? "1" : "", border: success ? "" : "none" }}
      >
        {success.message} 
      </div>
      <div className="address__1stChild">
        {viewOnLocation ? (
          <h3>Location</h3>
        ) : (
          <h3>{camleCase(category)} Address</h3>
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
              <input placeholder="Post" type="text" />
            </div>
          )}
        </div>

        <div>
          <input placeholder="District" type="text" value={dist} />
        </div>
        <div>
          <input placeholder="State" type="text" value={state} />
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
              dispatch(setLocation(""));
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

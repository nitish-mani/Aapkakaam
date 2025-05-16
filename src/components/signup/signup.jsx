import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import "./signup.css";
import eye from "../../resources/svg/eye-svgrepo-com.svg";
import line from "../../resources/svg/line-svgrepo-com.svg";
import rightTck from "../../resources/svg/sign-check-svgrepo-com.svg";
import axios from "axios";
import { SERVER_URL } from "../../utils/base";
import { useDispatch, useSelector } from "react-redux";
import { setValidEmailId, setValidPhoneNoId } from "../../utils/categoryslice";

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [otp, setOtp] = useState("");
  const [pass, setPass] = useState("");
  const [rePass, setRePass] = useState("");
  const [job, setJob] = useState("");
  const [gender, setGender] = useState("");

  const [isPassValid, setIsPassValid] = useState(true);
  const [isNumValid, setIsNumValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isPhoneOtpLoading, setIsPhoneOtpLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const [verifyPhoneNo, setVerifyPhoneNo] = useState(false);
  const [otpId, setOtpId] = useState("");

  const [isNameEmpty, setIsNameEmpty] = useState(true);
  const [isRePassMatch, setIsRePassMatch] = useState(true);
  const [isEyeClicked, setIsEyeClicked] = useState(false);
  const [isGender, setIsGender] = useState(true);

  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  // const [isValid, setIsValid] = useState(false);
  const [isValidPass, setIsValidPass] = useState(true);

  let category = location.state.category;
  const validPhoneNoId = useSelector((state) => state.category.validPhoneNoId);

  let cd = location.state.cd;
  let id = location.state.id;

  const profile_category = category;
  let category_result = "";
  for (let i = 0; i < profile_category.length; i++) {
    if (i == 0) category_result += profile_category.charAt(i).toUpperCase();
    else {
      category_result += profile_category.charAt(i);
    }
  }

  useEffect(() => {
    setIsPassValid(true);
  }, [pass]);

  useEffect(() => {
    setIsNameEmpty(true);
  }, [name]);

  useEffect(() => {
    setIsRePassMatch(true);
  }, [rePass]);

  useEffect(() => {
    setIsNumValid(true);
  }, [phoneNo]);

  useEffect(() => {
    setIsGender(true);
  }, [gender]);

  useEffect(() => {
    setErr("");
  }, [otp]);

  function handlePhoneVerify() {
    if (!navigator.onLine) {
      setErr("You are offline");
      setTimeout(() => setErr(""), 3000);
      return;
    }

    if (!isOtpSent) {
      if (!/^\d{10}$/.test(phoneNo)) {
        setErr("Mobile Number must be 10 digits");
        setTimeout(() => setErr(""), 3000);
        return;
      }

      setIsPhoneOtpLoading(true);

      axios
        .post(`${SERVER_URL}/${category}/phoneVerification`, { phoneNo })
        .then((res) => {
          if (res.data.verified) {
            setOtpId(res.data.otpId);
            dispatch(setValidPhoneNoId(res.data.otpId));
            setIsOtpSent(true);
            setSuccess(res.data.message);
            setTimeout(() => setSuccess(""), 2000);
          } else {
            console.log(res);
            setErr("Too many OTP requests. Try after 30 minutes");
            setTimeout(() => setErr(""), 15000);
          }
        })
        .catch(() => {
          setErr("Server error. Please try again.");
          setTimeout(() => setErr(""), 3000);
        })
        .finally(() => {
          setIsPhoneOtpLoading(false);
        });
    } else {
      setIsPhoneOtpLoading(true);

      axios
        .post(`${SERVER_URL}/${category}/otpVerification`, { otp, otpId })
        .then((res) => {
          if (res.data.verify) {
            setVerifyPhoneNo(true);
            setIsOtpSent(false);
            setSuccess("OTP verified successfully");
            setTimeout(() => setSuccess(""), 2000);
          } else {
            setErr(res.data.message || "OTP verification failed");
          }
        })
        .catch(() => {
          setErr("Server error. Please try again.");
          setTimeout(() => setErr(""), 3000);
        })
        .finally(() => {
          setIsPhoneOtpLoading(false);
        });
    }
  }

  function handleSignup() {
    if (name.length < 1) {
      setIsNameEmpty(false);
      return;
    }
    if (phoneNo.length != 10) {
      setIsNumValid(false);
      return;
    }

    if (pass.length <= 5) {
      setIsPassValid(false);
      return;
    }

    if (gender.length === 0) {
      setIsGender(false);
      return;
    }
    if (!navigator.onLine) {
      setErr("You are offline");
      setTimeout(() => {
        setErr("");
      }, 3000);
      return;
    }

    if (true || (verifyPhoneNo && isValid && isValidPass)) {
      setIsLoading(true);
      axios
        .post(`${SERVER_URL}/${category}/signup`, {
          name: name,
          phoneNo: phoneNo,
          password: pass,
          sharedBy: id,
          gender: gender,
          type: job,
          cd,
          validPhoneNoId,
        })
        .then((result) => {
          setIsLoading(false);
          setSuccess(result.data.message),
            setTimeout(() => {
              setSuccess("");
              navigate("/login", { state: { category: category } });
            }, 5000);
        })
        .catch((err) => {
          setIsLoading(false);
          setErr(err.response.data.message);
          setTimeout(() => {
            setEmailOtp("");
            setValidEmailId("");
            setVerifyEmail(false);
            setErr("");
          }, 3000);
        });
    } else {
      if (!isValid) setErr("Invalid Email");
      else setErr("Verify Mobile Number");
      setTimeout(() => {
        setErr("");
      }, 3000);
    }
  }

  function handleLogin() {
    navigate("/login", { state: { category: category } });
  }

  function handleEyeClicked() {
    setIsEyeClicked(!isEyeClicked);
  }

  return (
    <div className="signup">
      <div
        className="err"
        style={{
          opacity: err ? "1" : "",
          border: err ? "none" : "none",
          top: "-5rem",
        }}
      >
        {err}
      </div>
      <div
        className="success"
        style={{
          opacity: success ? "1" : "",
          border: success ? "none" : "none",
          top: "-5rem",
        }}
      >
        {success}
      </div>
      <div className="signup__1stChild">
        <h3>{category_result} Signup</h3>
      </div>
      <div className="signup__2ndChild">
        <div>
          <input
            placeholder="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ border: isNameEmpty ? "" : "2px solid red" }}
          />
        </div>
        <div style={{ position: "relative" }}>
          {isOtpSent ? (
            <input
              placeholder="Enter OTP"
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          ) : (
            <input
              placeholder="Phone No."
              type="number"
              value={phoneNo}
              readOnly={verifyPhoneNo ? true : false}
              onChange={(e) => setPhoneNo(e.target.value)}
              style={{
                marginBottom: isNumValid ? "" : "0",
                border: isNumValid ? "" : "2px solid red",
              }}
            />
          )}
          {verifyPhoneNo ? (
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: "5px",
                transform: "translateY(-40%)",
              }}
            >
              <img
                src={rightTck}
                alt=""
                style={{ width: "2rem", height: "2rem" }}
              />
            </div>
          ) : (
            ""
          )}
          {phoneNo.length === 10 && !verifyPhoneNo ? (
            <div className="verify" onClick={handlePhoneVerify}>
              {isOtpSent ? (
                isPhoneOtpLoading ? (
                  <div className="loading"></div>
                ) : (
                  "Verify OTP"
                )
              ) : isPhoneOtpLoading ? (
                <div className="loading"></div>
              ) : (
                "Verify Mobile Number"
              )}
            </div>
          ) : (
            ""
          )}

          <h6
            style={{
              display: isNumValid ? "none" : "",
              color: "red",
              textAlign: "left",
            }}
          >
            Incorrect Number
          </h6>
        </div>

        <div className="password">
          <input
            placeholder="Password"
            type={isEyeClicked ? "" : "password"}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            style={{
              marginBottom: isPassValid ? "" : "0",
              border: isPassValid ? "" : "2px solid red",
            }}
          />

          <div className="eyesvg" onClick={handleEyeClicked}>
            <img src={eye} alt="eye" />
          </div>
          <div
            className="cross-line"
            style={{
              display: isEyeClicked ? "block" : "",
              pointerEvents: "none",
            }}
          >
            <img src={line} alt="" />
          </div>
        </div>
        <h6
          style={{
            display: isValidPass ? "none" : "",
            color: "red",
            textAlign: "left",
            fontSize: "1rem",
          }}
        >
          Password must be at least 6 characters long
        </h6>

        {category === "vendor" ? (
          <div>
            <select
              className="job-select"
              onChange={(e) => setJob(e.target.value)}
            >
              <option value="">Select Your Job</option>
              <option value="labour">Labour</option>
              <option value="mason">Mason</option>
              <option value="electrician">Electrician</option>
              <option value="plumber">Plumber</option>
              <option value="ac mechanic">AC Mechanic</option>
              <option value="fridge mechanic">Fridge Mechanic</option>
              <option value="driver">Driver</option>
              <option value="home tutor">Home Tutor</option>
              <option value="milk man">Milk Man</option>
              <option value="parlour">Parlour</option>
              <option value="menhandi maker">Menhandi Maker</option>
              <option value="pundit ji">Pundit Ji</option>
              <option value="carpenter">Carpenter</option>
              <option value="laptop repaire">Laptop Repaire</option>
              <option value="washer man">Washer Man</option>
              <option value="cook">Cook</option>
              <option value="painter">Painter</option>
              <option value="car repaire">Car Repaire</option>
              <option value="bike repaire">Bike Repaire</option>
              <option value="tiles fitter">Tiles Fitter</option>
              <option value="four wheeler">Four Wheeler</option>
              <option value="lights">Lights</option>
              <option value="bus">Bus</option>
              <option value="tent house">Tent House</option>
              <option value="generator">Generator</option>
              <option value="auto">Auto</option>
              <option value="dj">DJ</option>
              <option value="dhankutti">Dhankutti</option>
              <option value="aata chakki">Aata Chakki</option>
              <option value="latrine tank cleaner">Latrine Tank Cleaner</option>
              <option value="marriage hall">Marriage Hall</option>
              <option value="shuttering">Shuttering</option>
              <option value="waiter">Waiter</option>
              <option value="marble fitter">Marble Fitter</option>
              <option value="e-riksha">E-Riksha</option>
              <option value="pual cutter">Pual Cutter</option>
              <option value="ro">RO</option>
              <option value="chaat">Chaat</option>
              <option value="dulha rath">Dulha Rath</option>
              <option value="kirtan mandli">Kirtan Mandli</option>
              <option value="mini truck">Mini Truck</option>
              <option value="fruit seller">Fruit Seller</option>
              <option value="paan wala">Paan Wala</option>
              <option value="bhoonsa pual seller">Bhoonsa Pual Seller</option>
            </select>
          </div>
        ) : (
          ""
        )}

        <div>
          <select
            className="job-select"
            onChange={(e) => setGender(e.target.value)}
            style={{
              border: isGender ? "" : "2px solid red",
            }}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button className="btn" onClick={handleSignup}>
          {isLoading ? <div className="loading"></div> : "Signup"}
        </button>

        <div>
          <h5>
            Already Have an Account?
            <span
              className="verify-btn forgetPass"
              onClick={handleLogin}
              style={{ border: "none" }}
            >
              Login
            </span>
          </h5>
        </div>
      </div>
    </div>
  );
}

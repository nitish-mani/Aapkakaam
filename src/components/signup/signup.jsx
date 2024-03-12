import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import "./signup.css";
import eye from "../../resources/svg/eye-svgrepo-com.svg";
import line from "../../resources/svg/line-svgrepo-com.svg";
import rightTck from "../../resources/svg/sign-check-svgrepo-com.svg";
import axios from "axios";
import { SERVER_URL } from "../../utils/base";

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [otp, setOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [pass, setPass] = useState("");
  const [rePass, setRePass] = useState("");
  const [job, setJob] = useState("");
  const [gender, setGender] = useState("");

  const [isPassValid, setIsPassValid] = useState(true);
  const [isNumValid, setIsNumValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isPhoneOtpLoading, setIsPhoneOtpLoading] = useState(false);
  const [isEmailOtpLoading, setIsEmailOtpLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isEmailOtpSent, setIsEmailOtpSent] = useState(false);

  const [verifyPhoneNo, setVerifyPhoneNo] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);

  const [isNameEmpty, setIsNameEmpty] = useState(true);
  const [isEmailEmpty, setIsEmailEmpty] = useState(true);
  const [isRePassMatch, setIsRePassMatch] = useState(true);
  const [isEyeClicked, setIsEyeClicked] = useState(false);
  const [isGender, setIsGender] = useState(true);

  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  let category = location.state.category;

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
    setIsEmailEmpty(true);
  }, [email]);

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

  useEffect(() => {
    setErr("");
  }, [emailOtp]);

  function handlePhoneVerify() {
    setIsPhoneOtpLoading(true);
    if (!isOtpSent) {
      if (phoneNo.length != 10) {
        setIsPhoneOtpLoading(false);
        setErr("Mobile Number must be 10 digits");
        setTimeout(() => {
          setErr("");
        }, 3000);
        return;
      }
      axios
        .post(`${SERVER_URL}/${category}/phoneVerification`, {
          phoneNo,
        })
        .then((res) => {
          if (res.data.return) {
            setIsOtpSent(true);
            setIsPhoneOtpLoading(false);
            setSuccess("OTP sent successfully");
            setTimeout(() => {
              setSuccess("");
            }, 2000);
          } else {
            setErr(
              "Too many otp request has been sent on this number. Try after 30 minutes"
            );
            setIsPhoneOtpLoading(false);
            setTimeout(() => {
              setErr("");
            }, 15000);
          }
        });
    } else {
      axios
        .post(`${SERVER_URL}/${category}/otpVerification`, {
          otp,
        })
        .then((res) => {
          console.log(res);
          setVerifyPhoneNo(res.data.verify);
          if (res.data.verify) {
            setIsOtpSent(false);
            setIsPhoneOtpLoading(false);
            setSuccess("OTP verified successfully");
            setTimeout(() => {
              setSuccess("");
            }, 2000);
          } else {
            setErr(res.data.message);
            setIsPhoneOtpLoading(false);
          }
        });
    }
  }
  function handleEmailVerify() {
    setIsEmailOtpLoading(true);
    if (!isEmailOtpSent)
      axios
        .post(`${SERVER_URL}/${category}/emailVerification`, {
          email,
        })
        .then((res) => {
          if (res.data.verified) {
            setIsEmailOtpSent(true);
            setIsEmailOtpLoading(false);
            setSuccess("OTP sent successfully");
            setTimeout(() => {
              setSuccess("");
            }, 2000);
          } else {
            setErr("Something bad happens");
            setIsEmailOtpLoading(false);
            setTimeout(() => {
              setErr("");
            }, 3000);
          }
        });
    else {
      axios
        .post(`${SERVER_URL}/${category}/emailOtpVerification`, {
          emailOtp,
        })
        .then((res) => {
          console.log(res);
          setVerifyEmail(res.data.verify);
          if (res.data.verify) {
            setIsEmailOtpSent(false);
            setIsEmailOtpLoading(false);
            setSuccess("OTP verified successfully");
            setTimeout(() => {
              setSuccess("");
            }, 2000);
          } else {
            setErr(res.data.message);
            setIsEmailOtpLoading(false);
          }
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
    if (email.length < 1) {
      setIsEmailEmpty(false);
      return;
    }
    if (rePass != pass) {
      setIsRePassMatch(false);
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

    if (verifyEmail && verifyPhoneNo) {
      setIsLoading(true);
      axios
        .post(`${SERVER_URL}/${category}/signup`, {
          name: name,
          email: email,
          phoneNo: phoneNo,
          password: pass,
          sharedBy: id,
          gender: gender,
          type: job,
          cd,
          verifyPhoneNo,
          verifyEmail,
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
            setErr("");
          }, 10000);
        });
    } else {
      setErr("Verify Mobile Number and Email");
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
        style={{ opacity: err ? "1" : "", border: err ? "" : "none" }}
      >
        {err}
      </div>
      <div
        className="success"
        style={{ opacity: success ? "1" : "", border: success ? "" : "none" }}
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
        <div style={{ position: "relative" }}>
          {isEmailOtpSent ? (
            <input
              placeholder="Enter OTP"
              type="number"
              value={emailOtp}
              onChange={(e) => setEmailOtp(e.target.value)}
            />
          ) : (
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ border: isEmailEmpty ? "" : "2px solid red" }}
            />
          )}

          {verifyEmail ? (
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
          {email.length >= 7 && !verifyEmail ? (
            <div className="verify" onClick={handleEmailVerify}>
              {isEmailOtpSent ? (
                isEmailOtpLoading ? (
                  <div className="loading"></div>
                ) : (
                  "Verify OTP"
                )
              ) : isEmailOtpLoading ? (
                <div className="loading"></div>
              ) : (
                "Verify Email"
              )}
            </div>
          ) : (
            ""
          )}
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
            display: isPassValid ? "none" : "",
            color: "red",
            textAlign: "left",
          }}
        >
          Password must have 6 charactors
        </h6>

        <div>
          <input
            placeholder="Re-Password"
            type="text"
            value={rePass}
            onChange={(e) => setRePass(e.target.value)}
            style={{
              border: isRePassMatch ? "" : "2px solid red",
            }}
          />
          <h6
            style={{
              display: isRePassMatch ? "none" : "",
              color: "red",
              textAlign: "left",
            }}
          >
            Password didn't match
          </h6>
        </div>
        {category === "vendor" ? (
          <div>
            <select
              className="job-select"
              onChange={(e) => setJob(e.target.value)}
            >
              <option value="">Select Your Job</option>
              <option value="labour">Labour</option>
              <option value="mashon">Mashon</option>
              <option value="electrician">Electrician</option>
              <option value="plumber">Plumber</option>
              <option value="ac mechanic">AC Mechanic</option>
              <option value="fridge mechanic">Fridge Mechanic</option>
              <option value="driver">Driver</option>
              <option value="home tutor">Home Tutor</option>
              <option value="milk man">Milk Man</option>
              <option value="parlour">Parlour</option>
              <option value="menhandi maker">Menhandi Maker</option>
              <option value="pundits">Pundits</option>
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

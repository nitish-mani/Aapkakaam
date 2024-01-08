import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./signup.css";
import eye from "../../resources/svg/eye-svgrepo-com.svg";
import line from "../../resources/svg/line-svgrepo-com.svg";
import axios from "axios";
import { SERVER_URL } from "../../utils/base";

export default function SignUp({ category = "User" }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [pass, setPass] = useState("");
  const [rePass, setRePass] = useState("");

  const [isPassValid, setIsPassValid] = useState(true);
  const [isNumValid, setIsNumValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [isNameEmpty, setIsNameEmpty] = useState(true);
  const [isEmailEmpty, setIsEmailEmpty] = useState(true);
  const [isRePassMatch, setIsRePassMatch] = useState(true);
  const [isEyeClicked, setIsEyeClicked] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

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

    setIsLoading(true);
    axios
      .post(`${SERVER_URL}/user/signup`, {
        name: name,
        email: email,
        phoneNo: phoneNo,
        password: pass,
      })
      .then((result) => {
        setIsLoading(false);
        setSuccess(result.data.message),
          setTimeout(() => {
            setSuccess("");
            navigate("/login");
          }, 5000);
      })
      .catch((err) => {
        setIsLoading(false);
        setErr(err.response.data.message);
        setTimeout(() => {
          setErr("");
        }, 10000);
      });

  }

  function handleLogin() {
    navigate("/login");
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
        <h3>{category} Signup</h3>
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
        <div>
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
        <div>
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ border: isEmailEmpty ? "" : "2px solid red" }}
          />
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
            <input placeholder="" type="email" />
          </div>
        ) : (
          ""
        )}

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

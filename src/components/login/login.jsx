import { useNavigate } from "react-router";
import "./login.css";
import { useEffect, useState } from "react";
import eye from "../../resources/svg/eye-svgrepo-com.svg";
import line from "../../resources/svg/line-svgrepo-com.svg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addData } from "../../utils/userslice";
import { SERVER_URL } from "../../utils/base";

export default function Login({ category = "User" }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isEyeClicked, setIsEyeClicked] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [isEmailEmpty, setIsEmailEmpty] = useState(true);
  const [isPassEmpty, setIsPassEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsEmailEmpty(true);
  }, [email]);

  useEffect(() => {
    setIsPassEmpty(true);
  }, [pass]);

  function handleLogin() {
    if (email.length < 1) {
      setIsEmailEmpty(false);
      return;
    }
    if (pass.length < 1) {
      setIsPassEmpty(false);
      return;
    }
    setIsLoading(true);

    axios
      .post(`${SERVER_URL}/user/login`, {
        email: email,
        password: pass,
      })
      .then((result) => {
        setSuccess(result.data);
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("userId", result.data.userId);
        localStorage.setItem("verifyPhoneNo", result.data.verifyPhoneNo);
        localStorage.setItem("verifyEmail", result.data.verifyEmail);
        localStorage.setItem("name", result.data.name);
        localStorage.setItem("email", result.data.email);
        localStorage.setItem("phoneNo", result.data.phoneNo);
        localStorage.setItem("orders", result.data.orders);
        localStorage.setItem("share", result.data.share);
        localStorage.setItem("balance", result.data.balance);
        setIsLoading(false);
        setTimeout(() => {
          setSuccess("");
          navigate("/");
          dispatch(addData(result.data));
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

  function handleSignup() {
    navigate("/signup");
  }

  function handleEyeClicked() {
    setIsEyeClicked(!isEyeClicked);
  }

  return (
    <div className="login">
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
      <div className="login__1stChild">
        <h3>{category} Login</h3>
      </div>
      <div className="login__2ndChild">
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
            style={{ border: isPassEmpty ? "" : "2px solid red" }}
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

        <button className="btn" onClick={handleLogin}>
          {isLoading ? <div className="loading"></div> : "Login"}
        </button>
        <div className="forgetPass">
          <h5>Forget Password?</h5>
        </div>
        <div>
          <h5>
            Don't Have an Account?{" "}
            <span
              className="verify-btn forgetPass"
              onClick={handleSignup}
              style={{ border: "none" }}
            >
              Signup
            </span>
          </h5>
        </div>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router";
import "./login.css";
import { useEffect, useState } from "react";
import eye from "../../resources/svg/eye-svgrepo-com.svg";
import line from "../../resources/svg/line-svgrepo-com.svg";
import axios from "axios";

export default function Login({ category = "User" }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isEyeClicked, setIsEyeClicked] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [isEmailEmpty, setIsEmailEmpty] = useState(true);
  const [isPassEmpty, setIsPassEmpty] = useState(true);

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

    axios
      .post("http://localhost:3000/user/login", {
        email: email,
        password: pass,
      })
      .then((result) => {
        setSuccess(result.data),
          setTimeout(() => {
            setSuccess("");
            navigate("/");
          }, 5000);
      })
      .catch((err) => {
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
          Login
        </button>
        <div>
          <h5>Don't Have an Account?</h5>
          <button className="btn" onClick={handleSignup}>
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}

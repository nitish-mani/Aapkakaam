import { useLocation, useNavigate } from "react-router";
import "./login.css";
import { useEffect, useState } from "react";
import eye from "../../resources/svg/eye-svgrepo-com.svg";
import line from "../../resources/svg/line-svgrepo-com.svg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addDataUser } from "../../utils/userslice";
import { SERVER_URL } from "../../utils/base";
import { addDataVendor } from "../../utils/vendorslice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isEyeClicked, setIsEyeClicked] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [isEmailEmpty, setIsEmailEmpty] = useState(true);
  const [isPassEmpty, setIsPassEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  let category = location.state.category;
  let cd = location.state.cd;
  let id = location.state.id;

  const address =
    category === "user"
      ? JSON.parse(localStorage.getItem(category))?.address
      : JSON.parse(localStorage.getItem(category))?.address;

  const profile_category = category;
  let category_result = "";
  for (let i = 0; i < profile_category.length; i++) {
    if (i == 0) category_result += profile_category.charAt(i).toUpperCase();
    else {
      category_result += profile_category.charAt(i);
    }
  }

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
      .post(`${SERVER_URL}/${category}/login`, {
        email: email,
        password: pass,
      })
      .then((result) => {
        setSuccess(result.data);
        localStorage.setItem(category, JSON.stringify(result.data));
        setIsLoading(false);
        setTimeout(() => {
          setSuccess("");
          navigate("/");
          if (category === "user") dispatch(addDataUser(result.data));
          else if (category === "vendor") dispatch(addDataVendor(result.data));
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
    navigate("/signup", { state: { category: category, cd, id } });
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
        <h3>{category_result} Login</h3>
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

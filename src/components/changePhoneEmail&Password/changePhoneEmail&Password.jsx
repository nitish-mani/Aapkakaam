import "./changePhoneEmail&Password.css";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../../utils/base";
import { useLocation, useNavigate } from "react-router";
import cross from "../../resources/svg/multiply-svgrepo-com.svg";
import axios from "axios";
import Timer from "../timer/timer";
import { useDispatch } from "react-redux";

import { addDataUser, clearDataUser } from "../../utils/userslice";
import { addDataVendor, clearDataVendor } from "../../utils/vendorslice";

export default function ChangePhoneEmailPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  let editType = location.state.editType;

  const category = localStorage.getItem("category");

  const userData = JSON.parse(localStorage.getItem(category));
  const token = `Bearer ${userData?.token}`;

  const [pass, setPass] = useState("");
  const [email, setEmail] = useState(userData?.email);
  const [phoneNo, setPhoneNo] = useState(userData?.phoneNo);

  const [isPhoneOtpLoading, setIsPhoneOtpLoading] = useState(false);
  const [isEmailOtpLoading, setIsEmailOtpLoading] = useState(false);

  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const [otp, setOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");

  const [otpVerification, setOtpVerification] = useState(false);

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpESent, setIsOtpESent] = useState(false);

  const [otpTimer, setOtpTimer] = useState(false);

  function hanldeCrossInChange() {
    navigate("/");
  }

  function handleChangePhoneNoEmailPassword() {
    if (!otpTimer) {
      if (otpVerification) {
        if (editType == "phoneNo") {
          setIsPhoneOtpLoading(true);
          if (!isOtpSent) {
            if (phoneNo.length != 10) {
              setErr("Mobile Number must be 10 digits");
              setIsPhoneOtpLoading(false);
              setTimeout(() => {
                setErr("");
              }, 3000);
              return;
            }
            setOtpTimer(true);
            axios
              .post(`${SERVER_URL}/${category}/phoneVerification`, {
                phoneNo,
              })
              .then((res) => {
                if (res.data.return) {
                  setSuccess("OTP sent successfuly");
                  setIsOtpSent(true);
                  setOtpTimer(false);
                  setTimeout(() => {
                    setSuccess("");
                  }, 2000);
                } else {
                  setErr(
                    "Too many otp request has been sent on this number. Try after 30 minutes"
                  );
                  setOtpTimer(false);
                  setTimeout(() => {
                    setErr("");
                  }, 3000);
                }
                setIsPhoneOtpLoading(false);
              })
              .catch((err) => {
                setIsPhoneOtpLoading(false);
                setErr(err.response.data.message);
                setTimeout(() => {
                  setErr("");
                }, 3000);
              });
          } else {
            axios
              .post(`${SERVER_URL}/${category}/otpVerification`, {
                otp,
              })
              .then((res) => {
                if (res.data.verify) {
                  setIsOtpSent(false);
                  if (category === "user") {
                    axios
                      .patch(
                        `${SERVER_URL}/${category}/edit/phoneNo`,

                        {
                          phoneNo: phoneNo,
                          userId: userData.userId,
                          token: userData.token,
                        },
                        {
                          headers: { Authorization: token },
                        }
                      )
                      .then((result) => {
                        dispatch(clearDataUser());
                        dispatch(addDataUser(result.data));
                        localStorage.setItem(
                          category,
                          JSON.stringify(result.data)
                        );
                        setSuccess("User Mobile Number Updated Successfully");
                        setIsOtpSent(false);
                        setIsPhoneOtpLoading(false);
                        setTimeout(() => {
                          navigate("/");
                        }, 2000);
                      })
                      .catch((err) => console.log(err));
                  } else if (category === "vendor") {
                    axios
                      .patch(
                        `${SERVER_URL}/${category}/edit/phoneNo`,

                        {
                          phoneNo: phoneNo,
                          vendorId: userData?.vendorId,
                          token: userData?.token,
                        },
                        {
                          headers: { Authorization: token },
                        }
                      )
                      .then((result) => {
                        dispatch(clearDataVendor());
                        dispatch(addDataVendor(result.data));
                        localStorage.setItem(
                          category,
                          JSON.stringify(result.data)
                        );
                        setSuccess("Vendor Mobile Number Updated Successfully");
                        setIsOtpSent(false);
                        setIsPhoneOtpLoading(false);
                        setTimeout(() => {
                          navigate("/");
                        }, 2000);
                      })
                      .catch((err) => console.log(err));
                  }
                } else {
                  setErr(res.data.message);
                  setIsPhoneOtpLoading(false);
                  setTimeout(() => {
                    setErr("");
                  }, 3000);
                }
              });
          }
        } else if (editType == "email") {
          setIsEmailOtpLoading(true);
          if (!isOtpESent) {
            setOtpTimer(true);
            axios
              .post(`${SERVER_URL}/${category}/emailVerification`, {
                email,
              })
              .then((res) => {
                if (res.data.verified) {
                  setSuccess("OTP sent successfuly");
                  setOtpTimer(false);
                  setIsOtpESent(true);
                  setIsEmailOtpLoading(false);
                  setTimeout(() => {
                    setSuccess("");
                  }, 2000);
                } else {
                  setErr("Something bad happens");
                }
              });
          } else {
            axios
              .post(`${SERVER_URL}/${category}/emailOtpVerification`, {
                emailOtp,
              })
              .then((res) => {
                console.log(res);

                if (res.data.verify) {
                  setSuccess("OTP verified successfully");
                  if (category === "user") {
                    axios
                      .patch(
                        `${SERVER_URL}/${category}/edit/email`,

                        {
                          email: email,
                          userId: userData?.userId,
                          token: userData?.token,
                        },
                        {
                          headers: { Authorization: token },
                        }
                      )
                      .then((result) => {
                        dispatch(clearDataUser());
                        dispatch(addDataUser(result.data));
                        localStorage.setItem(
                          category,
                          JSON.stringify(result.data)
                        );

                        setSuccess("User Email Updated Successfully");
                        setIsOtpESent(false);
                        setIsEmailOtpLoading(false);

                        setTimeout(() => {
                          navigate("/");
                        }, 2000);
                      })
                      .catch((err) => console.log(err));
                  } else if (category === "vendor") {
                    axios
                      .patch(
                        `${SERVER_URL}/${category}/edit/email`,

                        {
                          email: email,
                          vendorId: userData?.vendorId,
                          token: userData?.token,
                        },
                        {
                          headers: { Authorization: token },
                        }
                      )
                      .then((result) => {
                        dispatch(clearDataVendor());
                        dispatch(addDataVendor(result.data));
                        localStorage.setItem(
                          category,
                          JSON.stringify(result.data)
                        );

                        setSuccess("Vendor Email Updated Successfully");
                        setIsOtpESent(false);
                        setIsEmailOtpLoading(false);
                        setTimeout(() => {
                          navigate("/");
                        }, 2000);
                      })
                      .catch((err) => console.log(err));
                  }
                } else {
                  setErr(res.data.message);
                  setIsEmailOtpLoading(false);
                  setTimeout(() => {
                    setErr("");
                  }, 3000);
                }
              });
          }
        } else if (editType == "pass") {
          setIsEmailOtpLoading(true);
          if (email && pass) {
            if (pass.length < 6) {
              setErr("Password length must be greater than 6 digits");
              setIsEmailOtpLoading(false);
              setTimeout(() => {
                setErr("");
              }, 3000);
              return;
            }
            if (category === "user") {
              axios
                .patch(
                  `${SERVER_URL}/${category}/edit/password`,

                  {
                    email: email,
                    password: pass,
                  }
                )
                .then((result) => {
                  setSuccess("User Password Updated Successfully");
                  setIsOtpESent(false);
                  setIsEmailOtpLoading(false);

                  setTimeout(() => {
                    navigate("/login", { state: { category: category } });
                  }, 2000);
                })
                .catch((err) => console.log(err));
            } else if (category === "vendor") {
              axios
                .patch(
                  `${SERVER_URL}/${category}/edit/password`,

                  {
                    email: email,
                    password: pass,
                  }
                )
                .then((result) => {
                  setSuccess("Vendor Password Updated Successfully");
                  setIsOtpESent(false);
                  setIsEmailOtpLoading(false);
                  setTimeout(() => {
                    navigate("/login", { state: { category: category } });
                  }, 2000);
                })
                .catch((err) => console.log(err));
            }
          }
        }
      } else {
        if (editType == "phoneNo") {
          setIsPhoneOtpLoading(true);
          if (!isOtpSent) {
            setOtpTimer(true);
            axios
              .post(`${SERVER_URL}/${category}/phoneVerification`, {
                phoneNo,
              })
              .then((res) => {
                console.log(res, "v");
                if (res.data.return) {
                  setSuccess("OTP sent successfuly");
                  setIsOtpSent(true);
                  setOtpTimer(false);
                  setTimeout(() => {
                    setSuccess("");
                  }, 2000);
                } else {
                  setErr(
                    "Too many otp request has been sent on this number. Try after 30 minutes"
                  );
                  setOtpTimer(false);
                  setTimeout(() => {
                    setErr("");
                  }, 3000);
                }
                setIsPhoneOtpLoading(false);
              })
              .catch((err) => {
                setIsPhoneOtpLoading(false);
                setErr(err.response.data.message);
                setTimeout(() => {
                  setErr("");
                }, 3000);
              });
          } else {
            axios
              .post(`${SERVER_URL}/${category}/otpVerification`, {
                otp,
              })
              .then((res) => {
                if (res.data.verify) {
                  setSuccess("OTP verified successfully");
                  setIsOtpSent(false);
                  setIsPhoneOtpLoading(false);
                  setOtp("");
                  setPhoneNo("");
                  setOtpVerification(true);
                  setTimeout(() => {
                    setSuccess("");
                  }, 2000);
                } else {
                  setErr(res.data.message);
                  setIsPhoneOtpLoading(false);
                  setTimeout(() => {
                    setErr("");
                  }, 3000);
                }
              });
          }
        } else if (editType == "email") {
          setIsEmailOtpLoading(true);
          if (!isOtpESent) {
            setOtpTimer(true);
            axios
              .post(`${SERVER_URL}/${category}/emailVerification`, {
                email,
              })
              .then((res) => {
                console.log(res.data.verified);
                if (res.data.verified) {
                  setSuccess("OTP sent successfuly");
                  setIsOtpESent(true);
                  setOtpTimer(false);
                  setIsEmailOtpLoading(false);
                  setTimeout(() => {
                    setSuccess("");
                  }, 2000);
                } else {
                  setErr("Something Bad happens");
                  setTimeout(() => {
                    setErr("");
                  }, 3000);
                }
              });
          } else {
            axios
              .post(`${SERVER_URL}/${category}/emailOtpVerification`, {
                emailOtp,
              })
              .then((res) => {
                console.log(res);

                if (res.data.verify) {
                  setSuccess("OTP verified successfully");
                  setIsOtpESent(false);
                  setIsEmailOtpLoading(false);
                  setEmail("");
                  setEmailOtp("");
                  setOtpVerification(true);
                  setTimeout(() => {
                    setSuccess("");
                  }, 2000);
                } else {
                  setErr(res.data.message);
                  setIsEmailOtpLoading(false);
                  setTimeout(() => {
                    setErr("");
                  }, 3000);
                }
              });
          }
        } else if (editType == "pass") {
          setIsEmailOtpLoading(true);
          if (!isOtpESent) {
            setOtpTimer(true);
            axios
              .post(`${SERVER_URL}/${category}/emailVerification`, {
                email,
              })
              .then((res) => {
                setSuccess("OTP sent successfuly");
                setOtpTimer(false);
                setIsOtpESent(true);
                setIsEmailOtpLoading(false);
                setTimeout(() => {
                  setSuccess("");
                }, 2000);
              });
          } else {
            axios
              .post(`${SERVER_URL}/${category}/emailOtpVerification`, {
                emailOtp,
              })
              .then((res) => {
                console.log(res);

                if (res.data.verify) {
                  setOtpVerification(true);
                  setIsOtpESent(true);
                  setIsEmailOtpLoading(false);
                  setSuccess("OTP verified successfully");
                  setTimeout(() => {
                    setSuccess("");
                  }, 2000);
                } else {
                  setErr(res.data.message);
                  setIsEmailOtpLoading(false);
                  setTimeout(() => {
                    setErr("");
                  }, 3000);
                }
              });
          }
        }
      }
    }
  }

  return (
    <div className="editPhoneEmail">
      <h3 style={{ marginBottom: "4rem" }}>
        Change{" "}
        {editType == "phoneNo"
          ? "Mobile Number"
          : editType == "email"
          ? "Email"
          : "Password"}
      </h3>
      <img
        src={cross}
        alt="cross"
        style={{
          width: "20px",
          position: "absolute",
          top: ".5rem",
          right: ".5rem",
          cursor: "pointer",
        }}
        onClick={hanldeCrossInChange}
      />
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
      {!otpVerification ? (
        editType == "phoneNo" ? (
          <div>
            {isOtpSent ? (
              <input
                type="number"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            ) : (
              <input
                type="number"
                placeholder="Mobile Number"
                value={phoneNo}
                readOnly
              />
            )}
          </div>
        ) : editType == "email" ? (
          <div>
            {isOtpESent ? (
              <input
                type="text"
                placeholder="Enter OTP"
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value)}
              />
            ) : (
              <input type="text" placeholder="Email" value={email} readOnly />
            )}
          </div>
        ) : (
          <div>
            {isOtpESent ? (
              <input
                type="text"
                placeholder="Enter OTP"
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value)}
              />
            ) : (
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            )}
          </div>
        )
      ) : editType == "phoneNo" ? (
        <div>
          {isOtpSent ? (
            <input
              type="number"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          ) : (
            <input
              type="number"
              placeholder="New Mobile Number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          )}
        </div>
      ) : editType == "email" ? (
        <div>
          {isOtpESent ? (
            <input
              type="text"
              placeholder="Enter OTP"
              value={emailOtp}
              onChange={(e) => setEmailOtp(e.target.value)}
            />
          ) : (
            <input
              type="text"
              placeholder="New Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
        </div>
      ) : (
        <div>
          {isOtpESent ? (
            <input
              type="text"
              placeholder="Enter New Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          ) : (
            <input
              type="text"
              placeholder="Enter New Password"
              value={pass}
              readOnly
            />
          )}
        </div>
      )}
      <button
        className={otpTimer ? "hover btn" : "btn"}
        style={{
          marginTop: "3rem",
          backgroundColor: otpTimer ? "rgb(17, 97, 228,.5)" : "",
        }}
        onClick={handleChangePhoneNoEmailPassword}
      >
        {!otpVerification ? (
          editType == "phoneNo" ? (
            isOtpSent ? (
              isPhoneOtpLoading ? (
                <div className="loading"></div>
              ) : (
                "Verify OTP"
              )
            ) : isPhoneOtpLoading ? (
              <div className="loading"></div>
            ) : (
              "Send OTP"
            )
          ) : editType == "email" ? (
            isOtpESent ? (
              isEmailOtpLoading ? (
                <div className="loading"></div>
              ) : (
                "Verify OTP"
              )
            ) : isEmailOtpLoading ? (
              <div className="loading"></div>
            ) : (
              "Send OTP"
            )
          ) : isOtpESent ? (
            isEmailOtpLoading ? (
              <div className="loading"></div>
            ) : (
              "Verify OTP"
            )
          ) : isEmailOtpLoading ? (
            <div className="loading"></div>
          ) : (
            "Send OTP"
          )
        ) : editType == "phoneNo" ? (
          isOtpSent ? (
            isPhoneOtpLoading ? (
              <div className="loading"></div>
            ) : (
              "Verify OTP"
            )
          ) : isPhoneOtpLoading ? (
            <div className="loading"></div>
          ) : (
            "Verify Number"
          )
        ) : editType == "email" ? (
          isOtpESent ? (
            isEmailOtpLoading ? (
              <div className="loading"></div>
            ) : (
              "Verify OTP"
            )
          ) : isEmailOtpLoading ? (
            <div className="loading"></div>
          ) : (
            "Verify Email"
          )
        ) : isOtpESent ? (
          isEmailOtpLoading ? (
            <div className="loading"></div>
          ) : (
            "Update Password"
          )
        ) : (
          "Update Password"
        )}
      </button>
      {otpTimer ? (
        <div className="otpTimer">
          <span>Resend OTP After </span>
          <span>
            <Timer setOtpTimer={setOtpTimer} />
          </span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

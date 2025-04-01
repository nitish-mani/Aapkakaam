import "./profile.css";
import { useDispatch, useSelector } from "react-redux";
import cross from "../../resources/svg/multiply-svgrepo-com.svg";
import male from "../../resources/svg/male-svgrepo-com.svg";
import female from "../../resources/svg/female-svgrepo-com.svg";
import rupee from "../../resources/svg/rupee-1-frame-svgrepo-com.svg";
import { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../utils/base";
import { useNavigate } from "react-router";
import {
  addDataUser,
  clearDataUser,
  setPrIsVisibleUser,
} from "../../utils/userslice";
import {
  addDataVendor,
  clearDataVendor,
  setPrIsVisibleVendor,
} from "../../utils/vendorslice";
import CamleCase from "../camleCase/camleCase";
import {
  setCategory,
  setLocationPincode,
  setLocationPost,
  setURL,
} from "../../utils/categoryslice";

export default function Profile() {
  const [nameEdit, setNameEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [phoneNoEdit, setPhoneNoEdit] = useState(false);
  const [wageRateEdit, setWageRateEdit] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const category = localStorage.getItem("category");

  const userData =
    category === "user"
      ? useSelector((store) => store.user.data)
      : useSelector((store) => store.vendor.data);

  const isPrVisible =
    category === "user"
      ? useSelector((store) => store.user.isPrVisibleUser)
      : useSelector((store) => store.vendor.isPrVisibleVendor);

  const token = `Bearer ${userData[0]?.token}`;

  const [isLoading, setIsLoading] = useState({
    name: false,
    email: false,
    phoneNo: false,
    shareNo: false,
    wageRate: false,
  });

  const [name, setName] = useState(userData[0]?.name);
  const [email, setEmail] = useState(userData[0]?.email);
  const [phoneNo, setPhoneNo] = useState(userData[0]?.phoneNo);
  const [wageRate, setWageRate] = useState(userData[0]?.wageRate);
  const [err, setErr] = useState("");

  function handleLogout() {
    if (category === "user") dispatch(clearDataUser());
    else if (category === "vendor") dispatch(clearDataVendor());

    if (category === "user") dispatch(setPrIsVisibleUser(false));
    else if (category === "vendor") dispatch(setPrIsVisibleVendor(false));
    dispatch(setLocationPincode(""));
    dispatch(setLocationPost(""));
    dispatch(setCategory(""));
    localStorage.clear();
    navigate("/");
  }

  function handleCrossInProfile() {
    if (category === "user") dispatch(setPrIsVisibleUser(false));
    else if (category === "vendor") dispatch(setPrIsVisibleVendor(false));
    setNameEdit(false);
    setEmailEdit(false);
    setPhoneNoEdit(false);
  }

  {
    /******************************
     ******handle Name edit*********
     *******************************/
  }

  function handleNameEdit() {
    if (!navigator.onLine) {
      setErr("You are offline");
      setTimeout(() => {
        setErr("");
      }, 3000);
      return;
    }
    setNameEdit(true);

    if (nameEdit) {
      setIsLoading((state) => ({ ...state, name: true }));
      if (category === "user") {
        axios
          .patch(
            `${SERVER_URL}/${category}/edit/name`,

            {
              name: name,
              userId: userData[0].userId,
            },
            {
              headers: { Authorization: token },
            }
          )
          .then((result) => {
            const data = { ...userData[0], name: result.data.name };
            dispatch(addDataUser(data));
            localStorage.setItem(category, JSON.stringify(data));

            setNameEdit(false);
            setIsLoading((state) => ({ ...state, name: false }));
          })
          .catch((err) => {
            setErr("something bad happens");
            setTimeout(() => {
              setErr("");
            }, 3000);
          });
      } else if (category === "vendor") {
        axios
          .patch(
            `${SERVER_URL}/${category}/edit/name`,

            {
              name: name,
              vendorId: userData[0].vendorId,
            },
            {
              headers: { Authorization: token },
            }
          )
          .then((result) => {
            const data = { ...userData[0], name: result.data.name };
            dispatch(addDataVendor(data));
            localStorage.setItem(category, JSON.stringify(data));

            setNameEdit(false);
            setIsLoading((state) => ({ ...state, name: false }));
          })
          .catch((err) => {
            setErr("something bad happens");
            setTimeout(() => {
              setErr("");
            }, 3000);
          });
      }
    }
  }

  {
    /***********************************
     ******handle Phone No edit*********
     ***********************************/
  }

  function handlePhoneNoEdit() {
    navigate("/editPhoneEmail", { state: { editType: "phoneNo" } });
    if (category === "user") dispatch(setPrIsVisibleUser(false));
    else if (category === "vendor") dispatch(setPrIsVisibleVendor(false));
  }

  {
    /********************************
     ******handle Email edit*********
     ********************************/
  }

  function handleEmailEdit() {
    navigate("/editPhoneEmail", { state: { editType: "email" } });
    if (category === "user") dispatch(setPrIsVisibleUser(false));
    else if (category === "vendor") dispatch(setPrIsVisibleVendor(false));
  }

  {
    /********************************
     ******handle Orders View*********
     ********************************/
  }

  function handleOrdersView() {
    navigate("/viewOrders", { state: { category: category } });

    if (category === "user") dispatch(setPrIsVisibleUser(false));
    else if (category === "vendor") dispatch(setPrIsVisibleVendor(false));
  }

  {
    /********************************
     ******handle Share View*********
     ********************************/
  }

  function handleShareView() {
    navigate("/viewShare", { state: { category: category } });

    if (category === "user") dispatch(setPrIsVisibleUser(false));
    else if (category === "vendor") dispatch(setPrIsVisibleVendor(false));
  }

  {
    /****************************
     ******handle Share**********
     ****************************/
  }
  function handleShare() {
    navigate("/share");
    if (category === "user") dispatch(setPrIsVisibleUser(false));
    else if (category === "vendor") dispatch(setPrIsVisibleVendor(false));
  }

  {
    /***********************************
     ******handle Bookings View*********
     ***********************************/
  }
  function handleBookingsView() {
    navigate("/viewBookings", { state: { bookingsType: "view" } });
    dispatch(setPrIsVisibleVendor(false));
  }

  {
    /*******************************
     ******handle bookings**********
     *******************************/
  }
  function handleBookings() {
    navigate("/bookNow", { state: { bookingsType: "book" } });
    dispatch(setPrIsVisibleVendor(false));
  }

  {
    /**********************************
     ******handle add address**********
     **********************************/
  }
  function handleAddAddress() {
    navigate("/address");
    dispatch(setPrIsVisibleVendor(false));
    dispatch(setPrIsVisibleUser(false));
  }

  {
    /**********************************
     ******handle wage rate**********
     **********************************/
  }
  function handleWageRate() {
    if (!navigator.onLine) {
      setErr("You are offline");
      setTimeout(() => {
        setErr("");
      }, 3000);
      return;
    }
    setWageRateEdit(true);

    if (wageRateEdit) {
      setIsLoading((state) => ({ ...state, wageRate: true }));

      axios
        .patch(
          `${SERVER_URL}/${category}/wageRate`,

          {
            wageRate: wageRate,
            vendorId: userData[0].vendorId,
          },
          {
            headers: { Authorization: token },
          }
        )
        .then((result) => {
          const data = { ...userData[0], wageRate: result.data.wageRate };
          dispatch(addDataVendor(data));
          localStorage.setItem(category, JSON.stringify(data));

          setWageRateEdit(false);
          setIsLoading((state) => ({ ...state, wageRate: false }));
        })
        .catch((err) => {
          setErr("something bad happens");
          setTimeout(() => {
            setErr("");
          }, 3000);
        });
    }
  }

  function handleAddMoney() {
    navigate("/addMoney");
    dispatch(setPrIsVisibleVendor(false));
    dispatch(setPrIsVisibleUser(false));
  }

  function handleProfileImage() {
    navigate("/uploads");
    dispatch(setPrIsVisibleVendor(false));
    dispatch(setPrIsVisibleUser(false));
  }

  /***
   *******************************************************************
   *******************************************************************
   *************************              ****************************
   *************************   Main Code  ****************************
   *************************              ****************************
   *******************************************************************
   *******************************************************************
   */

  return (
    <div
      className="profile"
      style={{ display: isPrVisible ? "block" : "none" }}
    >
      {" "}
      <div
        className="err"
        style={{
          opacity: err ? "1" : "",
          border: err ? "none" : "none",
          top: "6.5rem",
        }}
      >
        {err}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "transparent",
        }}
      >
        {userData[0].gender == "Male" ? (
          userData[0].imgURL ? (
            <img
              src={userData[0].imgURL}
              alt=""
              style={{
                width: "5rem",
                height: "5rem",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={handleProfileImage}
            />
          ) : (
            <img
              src={male}
              alt=""
              style={{ width: "5rem", cursor: "pointer" }}
              onClick={handleProfileImage}
            />
          )
        ) : userData[0].imgURL ? (
          <img
            src={userData[0].imgURL}
            alt=""
            style={{
              width: "5rem",
              height: "5rem",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            onClick={handleProfileImage}
          />
        ) : (
          <img
            src={female}
            alt=""
            style={{ width: "5rem", cursor: "pointer" }}
            onClick={handleProfileImage}
          />
        )}
      </div>
      <p
        onClick={handleProfileImage}
        style={{
          color: "blue",
          cursor: "pointer",
          fontSize: "1rem",
          width: "fit-content",
          margin: "0 auto",
        }}
      >
        Upload Profile Image
      </p>
      <h2>
        <CamleCase element={category} /> Profile
      </h2>
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
        onClick={handleCrossInProfile}
      />
      {/**********************
       ******  Name  *********
       ***********************/}
      <div>
        <span className="border-bottom">Name </span>
        <span className="span email-grid ">
          {nameEdit ? (
            <input
              type="text"
              placeholder="Name"
              autoFocus
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              style={{
                height: "2.5rem",
                border: "2px solid black",
                paddingLeft: "1rem",
                borderRadius: ".5rem",
              }}
            />
          ) : (
            <CamleCase element={userData[0]?.name} />
          )}

          {/***** Name Edit btn  *****/}

          <span
            className="verify-btn span-child"
            onClick={handleNameEdit}
            style={{
              color: nameEdit ? "white" : "",
              border: nameEdit ? "none" : "",
              backgroundColor: nameEdit ? "blue" : "",
              width: isLoading.name ? "5rem" : "",
              height: isLoading.name ? "3rem" : "",
            }}
          >
            {nameEdit ? (
              isLoading.name ? (
                <div className="loading"></div>
              ) : (
                "Submit"
              )
            ) : (
              "Edit"
            )}
          </span>
        </span>
      </div>
      {/*************************
       ******  Phone No *********
       **************************/}
      <div>
        <span className="border-bottom">Mobile No</span>
        <span className="span email-grid ">
          {phoneNoEdit ? (
            <input
              type="number"
              placeholder="Number"
              autoFocus
              value={phoneNo}
              onChange={(e) => {
                setPhoneNo(e.target.value);
              }}
              style={{
                height: "2.5rem",
                border: "2px solid black",
                paddingLeft: "1rem",
                borderRadius: ".5rem",
              }}
            />
          ) : (
            userData[0]?.phoneNo
          )}

          {/***** Phone No Edit btn  *****/}

          <span
            className="verify-btn span-child"
            onClick={handlePhoneNoEdit}
            style={{
              color: phoneNoEdit ? "white" : "",
              border: phoneNoEdit ? "none" : "",
              backgroundColor: phoneNoEdit ? "blue" : "",
              width: isLoading.phoneNo ? "5rem" : "",
              height: isLoading.phoneNo ? "3rem" : "",
            }}
          >
            {phoneNoEdit ? (
              isLoading.phoneNo ? (
                <div className="loading"></div>
              ) : (
                "Submit"
              )
            ) : (
              "Edit"
            )}
          </span>

          {/***** Phone No  Verify btn  *****/}

          <span
            className="verify-btn"
            style={{
              backgroundColor:
                userData[0]?.verifyPhoneNo === true ? "green" : "",
              color: userData[0]?.verifyPhoneNo === true ? "white" : "",
              border: userData[0]?.verifyPhoneNo === true ? "none" : "",
            }}
          >
            {userData[0]?.verifyPhoneNo === true ? "Verified" : "Verify"}
          </span>
        </span>
      </div>
     
      {/************************
       ******  Orders  *********
       *************************/}
      <div>
        <span className="border-bottom">Orders </span>
        <span className="span email-grid ">
          <span>{userData[0]?.orders}</span>

          {/***** Orders View btn  *****/}

          <span className="verify-btn" onClick={handleOrdersView}>
            view
          </span>
        </span>
      </div>
      {/***********************
       ******  Share  *********
       ************************/}
      <div>
        <span className="border-bottom">Share</span>
        <span className="span email-grid ">
          <span>{userData[0]?.share}</span>

          {/***** Share View btn  *****/}

          <span className="verify-btn" onClick={handleShareView}>
            view
          </span>

          {/***** Share share btn  *****/}

          <span className="verify-btn btn1" onClick={handleShare}>
            Share
          </span>
        </span>
      </div>
      {/************************************
       ******  Bookings for vendor *********
       *************************************/}
      {category === "vendor" ? (
        <div>
          <span className="border-bottom">Bookings </span>
          <span className="span email-grid ">
            <span>{userData[0]?.bookings}</span>

            {/***** Bookings View btn  *****/}

            <span className="verify-btn" onClick={handleBookingsView}>
              view
            </span>

            {/***** Bookings bookings btn  *****/}

            <span className="verify-btn btn1" onClick={handleBookings}>
              Book Now
            </span>
          </span>
        </div>
      ) : (
        ""
      )}
      {/*************************
       ******  Bonus Amount  *********
       **************************/}
      <div>
        <span className="span email-grid ">Bonus Amount </span>{" "}
        <span>
          <span
            className="verify-btn"
            style={{ border: "none", margin: "0 .3rem" }}
          >
            <img src={rupee} alt="" style={{ width: "1.15rem" }} />
            {userData[0]?.bonusAmount === 0 ? (
              <span style={{ color: "red" }}>{`${userData[0]?.bonusAmount}`}</span>
            ) : (
              <span
                style={{ color: "green" }}
              >{`${userData[0]?.bonusAmount}`}</span>
            )}
          </span>
        </span>
      </div>
      {/****************************************
       ****** for vendor Balance  *********
       *****************************************/}
      {category == "vendor" ? (
        <div>
          <span className="span email-grid ">Balance</span>{" "}
          <span>
            <span
              className="verify-btn"
              style={{ border: "none", margin: "0 .3rem" }}
            >
              <img src={rupee} alt="" style={{ width: "1.15rem" }} />
              {userData[0]?.balance||0 === 0 ? (
                <span style={{ color: "red" }}>{`${
                  userData[0]?.balance || 0
                }`}</span>
              ) : (
                <span style={{ color: "green" }}>{`${
                  userData[0]?.balance || 0
                }`}</span>
              )}
            </span>
            <span
              className="verify-btn btn1"
              onClick={handleAddMoney}
              style={{ padding: ".4rem" }}
            >
              Add Money
            </span>
          </span>
        </div>
      ) : (
        ""
      )}
      {/**********************************
       ******  Rating for Vendor *********
       ***********************************/}
      {category === "vendor" ? (
        <div>
          <span className="span email-grid ">Ratings</span>
          <span style={{ color: "green" }}>
            {userData[0]?.rating
              ? `${userData[0]?.rating} / 5 (${userData[0]?.ratingCount})`
              : "No Ratings"}
          </span>
        </div>
      ) : (
        ""
      )}
      {/**********************************
       ******  WageRate for Vendor *********
       ***********************************/}
      {category === "vendor" ? (
        <div>
          <span>Wage-rate</span>
          <span className="span email-grid ">
            <span>
              {wageRateEdit ? (
                <input
                  type="Number"
                  placeholder="Wage Rate"
                  autoFocus
                  value={wageRate}
                  onChange={(e) => {
                    setWageRate(e.target.value);
                  }}
                  style={{
                    height: "2.5rem",
                    border: "2px solid black",
                    paddingLeft: "1rem",
                    borderRadius: ".5rem",
                  }}
                />
              ) : (
                <span>
                  {userData[0]?.wageRate ? (
                    <span>
                      <img src={rupee} alt="" style={{ width: "1.15rem" }} />
                      <span style={{ color: "blue" }}>
                        {userData[0]?.wageRate} / Day
                      </span>
                    </span>
                  ) : (
                    "No Wage Rate"
                  )}
                </span>
              )}
            </span>
            <span className="verify-btn btn1" onClick={handleWageRate}>
              {isLoading.wageRate ? (
                <div className="loading"></div>
              ) : (
                "Set Wage Rate"
              )}
            </span>
          </span>
        </div>
      ) : (
        ""
      )}
      {/*************************
       ******  Address  *********
       **************************/}
      <div>
        <span className="span ">Address </span>
        {userData[0]?.address[0] ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>{userData[0]?.address[0].vill}</div>
            <div>{userData[0]?.address[0].post}</div>
            <div>{userData[0]?.address[0].dist}</div>
            <div>{userData[0]?.address[0].state}</div>
            <div>{userData[0]?.address[0].pincode}</div>

            <button
              className="verify-btn btn1 b600"
              onClick={handleAddAddress}
              style={{ padding: ".4rem", marginLeft: "0", marginRight: "0" }}
            >
              Change Address
            </button>
          </div>
        ) : (
          <button
            className="verify-btn btn1"
            onClick={handleAddAddress}
            style={{ marginBottom: "1rem" }}
          >
            Add Address
          </button>
        )}{" "}
      </div>
      {/****************************************
       ******  Job Profile for Vendor  *********
       *****************************************/}
      {category === "vendor" ? (
        <div>
          <span className="border-bottom">Job Profile </span>
          <span className="span email-grid ">
            <span style={{ color: "blue" }}>
              <CamleCase element={userData[0]?.type} />
            </span>
          </span>
        </div>
      ) : (
        ""
      )}
      {/*************************
       ******  Log Out  btn *********
       **************************/}
      <button className="btn" onClick={handleLogout}>
        Logout
      </button>
      {/* <h3 className="vendor-registration">Register As a Vendor</h3> */}
    </div>
  );
}

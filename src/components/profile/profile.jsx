import "./profile.css";
import { useDispatch, useSelector } from "react-redux";
import cross from "../../resources/svg/multiply-svgrepo-com.svg";
import male from "../../resources/svg/male-svgrepo-com.svg";
import female from "../../resources/svg/female-svgrepo-com.svg";
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

export default function Profile() {
  const [nameEdit, setNameEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [phoneNoEdit, setPhoneNoEdit] = useState(false);
  const [shareEdit, setShareEdit] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const category = localStorage.getItem("category");

  const userData =
    category === "user"
      ? useSelector((store) => store.user.data)
      : useSelector((store) => store.vendor.data);
  const isVisible =
    category === "user"
      ? useSelector((store) => store.user.isVisibleUser)
      : useSelector((store) => store.vendor.isVisibleVendor);
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
  });

  const [name, setName] = useState(userData[0]?.name);
  const [email, setEmail] = useState(userData[0]?.email);
  const [phoneNo, setPhoneNo] = useState(userData[0]?.phoneNo);
  const [shareNo, setShareNo] = useState("");

  function handleLogout() {
    if (category === "user") dispatch(clearDataUser());
    else if (category === "vendor") dispatch(clearDataVendor());

    if (category === "user") dispatch(setPrIsVisibleUser(false));
    else if (category === "vendor") dispatch(setPrIsVisibleVendor(false));

    localStorage.clear();
  }

  function handleCrossInProfile() {
    if (category === "user") dispatch(setPrIsVisibleUser(false));
    else if (category === "vendor") dispatch(setPrIsVisibleVendor(false));
    setNameEdit(false);
  }

  {
    /******************************
     ******handle Name edit*********
     *******************************/
  }

  function handleNameEdit() {
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
              token: userData[0].token,
            },
            {
              headers: { Authorization: token },
            }
          )
          .then((result) => {
            dispatch(clearDataUser());
            dispatch(addDataUser(result.data));
            localStorage.setItem(category, JSON.stringify(result.data));

            setNameEdit(false);
            setIsLoading((state) => ({ ...state, name: false }));
          })
          .catch((err) => console.log(err));
      } else if (category === "vendor") {
        axios
          .patch(
            `${SERVER_URL}/${category}/edit/name`,

            {
              name: name,
              vendorId: userData[0].vendorId,
              token: userData[0].token,
            },
            {
              headers: { Authorization: token },
            }
          )
          .then((result) => {
            dispatch(clearDataVendor());
            dispatch(addDataVendor(result.data));
            localStorage.setItem(category, JSON.stringify(result.data));

            setNameEdit(false);
            setIsLoading((state) => ({ ...state, name: false }));
          })
          .catch((err) => console.log(err));
      }
    }
  }

  {
    /***********************************
     ******handle Phone No edit*********
     ***********************************/
  }

  function handlePhoneNoEdit() {
    setPhoneNoEdit(true);

    if (phoneNoEdit) {
      setIsLoading((state) => ({ ...state, phoneNo: true }));

      if (category === "user") {
        axios
          .patch(
            `${SERVER_URL}/${category}/edit/phoneNo`,

            {
              phoneNo: phoneNo,
              userId: userData[0].userId,
              token: userData[0].token,
            },
            {
              headers: { Authorization: token },
            }
          )
          .then((result) => {
            dispatch(clearDataUser());
            dispatch(addDataUser(result.data));
            localStorage.setItem(category, JSON.stringify(result.data));

            setPhoneNoEdit(false);
            setIsLoading((state) => ({ ...state, phoneNo: false }));
          })
          .catch((err) => console.log(err));
      } else if (category === "vendor") {
        axios
          .patch(
            `${SERVER_URL}/${category}/edit/phoneNo`,

            {
              phoneNo: phoneNo,
              vendorId: userData[0].vendorId,
              token: userData[0].token,
            },
            {
              headers: { Authorization: token },
            }
          )
          .then((result) => {
            dispatch(clearDataVendor());
            dispatch(addDataVendor(result.data));
            localStorage.setItem(category, JSON.stringify(result.data));

            setPhoneNoEdit(false);
            setIsLoading((state) => ({ ...state, phoneNo: false }));
          })
          .catch((err) => console.log(err));
      }
    }
  }

  {
    /********************************
     ******handle Email edit*********
     ********************************/
  }

  function handleEmailEdit() {
    setEmailEdit(true);

    if (emailEdit) {
      setIsLoading((state) => ({ ...state, email: true }));

      if (category === "user") {
        axios
          .patch(
            `${SERVER_URL}/${category}/edit/email`,

            {
              email: email,
              userId: userData[0].userId,
              token: userData[0].token,
            },
            {
              headers: { Authorization: token },
            }
          )
          .then((result) => {
            dispatch(clearDataUser());
            dispatch(addDataUser(result.data));
            localStorage.setItem(category, JSON.stringify(result.data));

            setEmailEdit(false);
            setIsLoading((state) => ({ ...state, email: false }));
          })
          .catch((err) => console.log(err));
      } else if (category === "vendor") {
        axios
          .patch(
            `${SERVER_URL}/${category}/edit/email`,

            {
              email: email,
              vendorId: userData[0].vendorId,
              token: userData[0].token,
            },
            {
              headers: { Authorization: token },
            }
          )
          .then((result) => {
            dispatch(clearDataVendor());
            dispatch(addDataVendor(result.data));
            localStorage.setItem(category, JSON.stringify(result.data));

            setEmailEdit(false);
            setIsLoading((state) => ({ ...state, email: false }));
          })
          .catch((err) => console.log(err));
      }
    }
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "transparent",
        }}
      >
        {userData[0].gender == "male" ? (
          <img src={male} alt="" style={{ width: "5rem" }} />
        ) : (
          <img src={female} alt="" style={{ width: "5rem" }} />
        )}
      </div>
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
        <span className="span email-grid">
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
        <span className="span email-grid">
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
                userData[0]?.verifyPhoneNo === "true" ? "green" : "",
              color: userData[0]?.verifyPhoneNo === "true" ? "white" : "",
              border: userData[0]?.verifyPhoneNo === "true" ? "none" : "",
            }}
          >
            {userData[0]?.verifyPhoneNo === "true" ? "Verified" : "Verify"}
          </span>
        </span>
      </div>

      {/***********************
       ******  Email  *********
       ************************/}

      <div>
        <span className="border-bottom">Email </span>
        <span className="span email-grid">
          {emailEdit ? (
            <input
              type="email"
              placeholder="Email"
              autoFocus
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              style={{
                height: "2.5rem",
                border: "2px solid black",
                paddingLeft: "1rem",
                borderRadius: ".5rem",
              }}
            />
          ) : (
            userData[0]?.email
          )}

          {/***** Email Edit btn  *****/}

          <span
            className="verify-btn span-child"
            onClick={handleEmailEdit}
            style={{
              color: emailEdit ? "white" : "",
              border: emailEdit ? "none" : "",
              backgroundColor: emailEdit ? "blue" : "",
              width: isLoading.email ? "5rem" : "",
              height: isLoading.email ? "3rem" : "",
            }}
          >
            {emailEdit ? (
              isLoading.email ? (
                <div className="loading"></div>
              ) : (
                "Submit"
              )
            ) : (
              "Edit"
            )}
          </span>

          {/***** Email Verify btn  *****/}

          <span
            className="verify-btn"
            style={{
              backgroundColor:
                userData[0]?.verifyEmail === "true" ? "green" : "",
              color: userData[0]?.verifyEmail === "true" ? "white" : "",
              border: userData[0]?.verifyEmail === "true" ? "none" : "",
            }}
          >
            {userData[0]?.verifyEmail === "true" ? "Verified" : "Verify"}
          </span>
        </span>
      </div>

      {/************************
       ******  Orders  *********
       *************************/}

      <div>
        <span className="border-bottom">Orders </span>
        <span className="span email-grid">
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
        <span className="span email-grid">
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
          <span className="span email-grid">
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
       ******  Balance  *********
       **************************/}

      <div>
        <span className="span email-grid">Balance </span>{" "}
        <span>Rs-{userData[0]?.balance}</span>
      </div>

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
              style={{ padding: ".4rem" ,marginLeft:"0",marginRight:"0"}}
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
          <span className="span email-grid">
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

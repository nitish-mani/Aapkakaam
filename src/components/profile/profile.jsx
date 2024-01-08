import "./profile.css";
import { useDispatch, useSelector } from "react-redux";
import { addData, clearData, setPrIsVisible } from "../../utils/userslice";
import cross from "../../resources/svg/multiply-svgrepo-com.svg";
import { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../utils/base";
import { useNavigate } from "react-router";
export default function Profile() {
  const [nameEdit, setNameEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [phoneNoEdit, setPhoneNoEdit] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((store) => store.user.data);
  const isVisible = useSelector((store) => store.user.isVisible);
  const isPrVisible = useSelector((store) => store.user.isPrVisible);

  const token = `Bearer ${userData[0]?.token}`;

  const [isLoading, setIsLoading] = useState({name:false,email:false,phoneNo:false});
  const [name, setName] = useState(userData[0]?.name);
  const [email, setEmail] = useState(userData[0]?.email);
  const [phoneNo, setPhoneNo] = useState(userData[0]?.phoneNo);

  function handleLogout() {
    dispatch(clearData());
    dispatch(setPrIsVisible(false));
    localStorage.clear();
  }

  function handleCrossInProfile() {
    dispatch(setPrIsVisible(false));
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
      setIsLoading((state)=>({...state,name:true}));
      axios
        .patch(
          `${SERVER_URL}/user/edit/name`,

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
          dispatch(clearData());
          dispatch(addData(result.data));
          localStorage.setItem("name", name);
          setNameEdit(false);
          setIsLoading((state)=>({...state,name:false}));
        })
        .catch((err) => console.log(err));
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
      setIsLoading((state)=>({...state,phoneNo:true}));
      axios
        .patch(
          `${SERVER_URL}/user/edit/phoneNo`,

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
          dispatch(clearData());
          dispatch(addData(result.data));
          localStorage.setItem("phoneNo", phoneNo);
          setPhoneNoEdit(false);
          setIsLoading((state)=>({...state,phoneNo:false}));
        })
        .catch((err) => console.log(err));
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
      setIsLoading((state)=>({...state,email:true}));
      axios
        .patch(
          `${SERVER_URL}/user/edit/email`,

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
          dispatch(clearData());
          dispatch(addData(result.data));
          localStorage.setItem("email", email);
          setEmailEdit(false);
          setIsLoading((state)=>({...state,email:false}));
        })
        .catch((err) => console.log(err));
    }
  }

  function handleOrdersView() {
    navigate("/viewOrders");
    
    dispatch(setPrIsVisible(false));
  }

  return (
    <div
      className="profile"
      style={{ display: isPrVisible ? "block" : "none" }}
    >
      <h2>Profile</h2>
      <img
        src={cross}
        alt="cross"
        style={{
          display: isVisible ? "block" : "none",
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
            userData[0]?.name
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
        <span className="border-bottom">Mobile No</span>{" "}
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
          <span>{userData[0]?.orders?.length}</span>

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
        <span className="border-bottom">Share </span>
        <span className="span email-grid">
          <span>{userData[0]?.share?.length}</span>

          {/***** Share View btn  *****/}

          <span className="verify-btn">view</span>
        </span>
      </div>

      {/*************************
       ******  Balance  *********
       **************************/}

      <div>
        <span className="span email-grid">Balance </span>{" "}
        <span>Rs-{userData[0]?.balance}</span>
      </div>

      {/*************************
       ******  Log Out  btn *********
       **************************/}

      <button className="btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

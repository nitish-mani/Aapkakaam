// optimized and production ready

import "./profile.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback, useMemo } from "react";
import axios from "axios";
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
import cross from "../../resources/svg/multiply-svgrepo-com.svg";
import male from "../../resources/svg/male-svgrepo-com.svg";
import female from "../../resources/svg/female-svgrepo-com.svg";
import rupee from "../../resources/svg/rupee-1-frame-svgrepo-com.svg";
import { SERVER_URL } from "../../utils/base";
import AdsterraBanner_320x50 from "../../ads/adsterraInFrameBanner";
import AdsterraBanner from "../../ads/adsterraNativeBanner";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const category = localStorage.getItem("category");

  // Memoized selectors
  const userData = useSelector((store) =>
    category === "user" ? store.user.data : store.vendor.data
  );
  const isPrVisible = useSelector((store) =>
    category === "user"
      ? store.user.isPrVisibleUser
      : store.vendor.isPrVisibleVendor
  );

  const token = useMemo(() => `Bearer ${userData[0]?.token}`, [userData]);

  // State management
  const [editStates, setEditStates] = useState({
    name: false,
    email: false,
    phoneNo: false,
    wageRate: false,
  });
  const [formData, setFormData] = useState({
    name: userData[0]?.name || "",
    email: userData[0]?.email || "",
    phoneNo: userData[0]?.phoneNo || "",
    wageRate: userData[0]?.wageRate || "",
  });
  const [isLoading, setIsLoading] = useState({
    name: false,
    email: false,
    phoneNo: false,
    shareNo: false,
    wageRate: false,
  });
  const [err, setErr] = useState("");

  // Handlers
  const handleLogout = useCallback(() => {
    if (category === "user") {
      dispatch(clearDataUser());
      dispatch(setPrIsVisibleUser(false));
    } else if (category === "vendor") {
      dispatch(clearDataVendor());
      dispatch(setPrIsVisibleVendor(false));
    }

    dispatch(setLocationPincode(""));
    dispatch(setLocationPost(""));
    dispatch(setCategory(""));
    localStorage.clear();
    navigate("/");
  }, [category, dispatch, navigate]);

  const handleCrossInProfile = useCallback(() => {
    if (category === "user") {
      dispatch(setPrIsVisibleUser(false));
    } else if (category === "vendor") {
      dispatch(setPrIsVisibleVendor(false));
    }
    setEditStates({
      name: false,
      email: false,
      phoneNo: false,
      wageRate: false,
    });
  }, [category, dispatch]);

  const showError = useCallback((message) => {
    setErr(message);
    setTimeout(() => setErr(""), 3000);
  }, []);

  const handleEditToggle = useCallback((field) => {
    setEditStates((prev) => ({ ...prev, [field]: !prev[field] }));
  }, []);

  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  // API call handlers
  const handleNameUpdate = useCallback(async () => {
    if (!navigator.onLine) {
      showError("You are offline");
      return;
    }

    setIsLoading((prev) => ({ ...prev, name: true }));

    try {
      const endpoint = `${SERVER_URL}/${category}/edit/name`;
      const body =
        category === "user"
          ? { name: formData.name, userId: userData[0].userId }
          : { name: formData.name, vendorId: userData[0].vendorId };

      const response = await axios.patch(endpoint, body, {
        headers: { Authorization: token },
      });

      const updatedData = { ...userData[0], name: response.data.name };

      if (category === "user") {
        dispatch(addDataUser(updatedData));
      } else {
        dispatch(addDataVendor(updatedData));
      }

      localStorage.setItem(category, JSON.stringify(updatedData));
      handleEditToggle("name");
    } catch (error) {
      showError("Something went wrong");
    } finally {
      setIsLoading((prev) => ({ ...prev, name: false }));
    }
  }, [
    category,
    formData.name,
    userData,
    token,
    dispatch,
    handleEditToggle,
    showError,
  ]);

  const handleWageRateUpdate = useCallback(async () => {
    if (!navigator.onLine) {
      showError("You are offline");
      return;
    }

    setIsLoading((prev) => ({ ...prev, wageRate: true }));

    try {
      const response = await axios.patch(
        `${SERVER_URL}/${category}/wageRate`,
        {
          wageRate: formData.wageRate,
          vendorId: userData[0].vendorId,
        },
        { headers: { Authorization: token } }
      );

      const updatedData = { ...userData[0], wageRate: response.data.wageRate };
      dispatch(addDataVendor(updatedData));
      localStorage.setItem(category, JSON.stringify(updatedData));
      handleEditToggle("wageRate");
    } catch (error) {
      showError("Something went wrong");
    } finally {
      setIsLoading((prev) => ({ ...prev, wageRate: false }));
    }
  }, [
    category,
    formData.wageRate,
    userData,
    token,
    dispatch,
    handleEditToggle,
    showError,
  ]);

  // Navigation handlers
  const navigateTo = useCallback(
    (path, state = {}) => {
      navigate(path, { state });
      if (category === "user") {
        dispatch(setPrIsVisibleUser(false));
      } else {
        dispatch(setPrIsVisibleVendor(false));
      }
    },
    [category, dispatch, navigate]
  );

  const handlePhoneNoEdit = useCallback(() => {
    navigateTo("/editPhoneEmail", { editType: "phoneNo" });
  }, [navigateTo]);

  const handleEmailEdit = useCallback(() => {
    navigateTo("/editPhoneEmail", { editType: "email" });
  }, [navigateTo]);

  const handleOrdersView = useCallback(() => {
    navigateTo("/viewOrders", { category });
  }, [category, navigateTo]);

  const handleShareView = useCallback(() => {
    navigateTo("/viewShare", { category });
  }, [category, navigateTo]);

  const handleShare = useCallback(() => {
    navigateTo("/share");
  }, [navigateTo]);

  const handleBookingsView = useCallback(() => {
    navigateTo("/viewBookings", { bookingsType: "view" });
  }, [navigateTo]);

  const handleBookings = useCallback(() => {
    navigateTo("/bookNow", { bookingsType: "book" });
  }, [navigateTo]);

  const handleAddAddress = useCallback(() => {
    navigateTo("/address");
  }, [navigateTo]);

  const handleAddMoney = useCallback(() => {
    navigateTo("/addMoney");
  }, [navigateTo]);

  const handleProfileImage = useCallback(() => {
    navigateTo("/uploads");
  }, [navigateTo]);

  // Memoized profile image component
  const ProfileImage = useMemo(() => {
    const gender = userData[0]?.gender;
    const imgURL = userData[0]?.imgURL;
    const imgStyle = {
      width: "5rem",
      height: "5rem",
      borderRadius: "50%",
      cursor: "pointer",
    };

    if (gender === "Male") {
      return imgURL ? (
        <img
          src={imgURL}
          alt=""
          style={imgStyle}
          onClick={handleProfileImage}
        />
      ) : (
        <img
          src={male}
          alt=""
          style={{ width: "5rem", cursor: "pointer" }}
          onClick={handleProfileImage}
        />
      );
    } else {
      return imgURL ? (
        <img
          src={`${imgURL}?t=${Date.now()}`}
          alt=""
          style={imgStyle}
          onClick={handleProfileImage}
        />
      ) : (
        <img
          src={female}
          alt=""
          style={{ width: "5rem", cursor: "pointer" }}
          onClick={handleProfileImage}
        />
      );
    }
  }, [userData, handleProfileImage]);

  if (!isPrVisible) return null;

  return (
    <div className="profile">
      <AdsterraBanner_320x50 />
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
        {ProfileImage}
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
        className="profile__close-button"
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
      {/* Name Field */}
      <div>
        <span className="border-bottom">Name </span>
        <span className="span email-grid ">
          {editStates.name ? (
            <input
              type="text"
              placeholder="Name"
              autoFocus
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
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

          <span
            className="verify-btn span-child"
            onClick={
              editStates.name
                ? handleNameUpdate
                : () => handleEditToggle("name")
            }
            style={{
              color: editStates.name ? "white" : "",
              border: editStates.name ? "none" : "",
              backgroundColor: editStates.name ? "blue" : "",
              width: isLoading.name ? "5rem" : "",
              height: isLoading.name ? "3rem" : "",
            }}
          >
            {editStates.name ? (
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
      {/* Phone Number Field */}
      <div>
        <span className="border-bottom">Mobile No</span>
        <span className="span email-grid ">
          {userData[0]?.phoneNo}

          <span className="verify-btn span-child" onClick={handlePhoneNoEdit}>
            Edit
          </span>

          <span
            className="verify-btn"
            style={{
              backgroundColor: userData[0]?.verifyPhoneNo ? "green" : "",
              color: userData[0]?.verifyPhoneNo ? "white" : "",
              border: userData[0]?.verifyPhoneNo ? "none" : "",
            }}
          >
            {userData[0]?.verifyPhoneNo ? "Verified" : "Verify"}
          </span>
        </span>
      </div>
      {/* Orders Field */}
      <div>
        <span className="border-bottom">Orders </span>
        <span className="span email-grid ">
          <span>{userData[0]?.orders}</span>
          <span className="verify-btn" onClick={handleOrdersView}>
            view
          </span>
        </span>
      </div>
      {/* Share Field */}
      <div>
        <span className="border-bottom">Share</span>
        <span className="span email-grid ">
          <span>{userData[0]?.share}</span>
          <span className="verify-btn" onClick={handleShareView}>
            view
          </span>
          <span className="verify-btn btn1" onClick={handleShare}>
            Share
          </span>
        </span>
      </div>
      {/* Vendor-specific fields */}
      {category === "vendor" && (
        <>
          {/* Bookings Field */}
          <div>
            <span className="border-bottom">Bookings </span>
            <span className="span email-grid ">
              <span>{userData[0]?.bookings}</span>
              <span className="verify-btn" onClick={handleBookingsView}>
                view
              </span>
              <span className="verify-btn btn1" onClick={handleBookings}>
                Book Now
              </span>
            </span>
          </div>

          {/* Balance Field */}
          <div>
            <span className="span email-grid ">Balance</span>
            <span>
              <span
                className="verify-btn"
                style={{ border: "none", margin: "0 .3rem" }}
              >
                <img src={rupee} alt="" style={{ width: "1.15rem" }} />
                <span style={{ color: userData[0]?.balance ? "green" : "red" }}>
                  {userData[0]?.balance || 0}
                </span>
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

          {/* Ratings Field */}
          <div>
            <span className="span email-grid ">Ratings</span>
            <span style={{ color: "green" }}>
              {userData[0]?.rating
                ? `${userData[0]?.rating} / 5 (${userData[0]?.ratingCount})`
                : "No Ratings"}
            </span>
          </div>

          {/* Wage Rate Field */}
          <div>
            <span>Wage-rate</span>
            <span className="span email-grid ">
              <span>
                {editStates.wageRate ? (
                  <input
                    type="Number"
                    placeholder="Wage Rate"
                    autoFocus
                    value={formData.wageRate}
                    onChange={(e) =>
                      handleInputChange("wageRate", e.target.value)
                    }
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
              <span
                className="verify-btn btn1"
                onClick={
                  editStates.wageRate
                    ? handleWageRateUpdate
                    : () => handleEditToggle("wageRate")
                }
              >
                {isLoading.wageRate ? (
                  <div className="loading"></div>
                ) : editStates.wageRate ? (
                  "Submit"
                ) : (
                  "Set Wage Rate"
                )}
              </span>
            </span>
          </div>

          {/* Job Profile Field */}
          <div>
            <span className="border-bottom">Job Profile </span>
            <span className="span email-grid ">
              <span style={{ color: "blue" }}>
                <CamleCase element={userData[0]?.type} />
              </span>
            </span>
          </div>
        </>
      )}
      {/* Bonus Amount Field */}
      <div>
        <span className="span email-grid ">Bonus Amount </span>
        <span>
          <span
            className="verify-btn"
            style={{ border: "none", margin: "0 .3rem" }}
          >
            <img src={rupee} alt="" style={{ width: "1.15rem" }} />
            <span style={{ color: userData[0]?.bonusAmount ? "green" : "red" }}>
              {userData[0]?.bonusAmount || 0}
            </span>
          </span>
        </span>
      </div>

      {/* Address Field */}
      <div>
        <span className="span ">Address </span>
        {userData[0]?.address?.[0] ? (
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
        )}
      </div>

      <AdsterraBanner />
      {/* Logout Button */}
      <button className="btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;

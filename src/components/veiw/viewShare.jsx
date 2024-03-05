import "./view.css";

import cross from "../../resources/svg/multiply-svgrepo-com.svg";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../utils/base";
import { clearDataVendor } from "../../utils/vendorslice";
import { clearDataUser } from "../../utils/userslice";

export default function ViewShare() {
  const category = localStorage.getItem("category");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData =
    category === "user"
      ? useSelector((store) => store.user.data)
      : useSelector((store) => store.vendor.data);

  const token = `Bearer ${
    userData[0]?.token || JSON.parse(localStorage.getItem(category))?.token
  }`;
  const userId =
    category === "user"
      ? userData[0]?.userId ||
        JSON.parse(localStorage.getItem(category))?.userId
      : userData[0]?.vendorId ||
        JSON.parse(localStorage.getItem(category))?.vendorId;

  const [share, setShare] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (category === "user") {
        axios
          .get(`${SERVER_URL}/${category}/getShare/${userId}`, {
            headers: { Authorization: token },
          })
          .then((result) => setShare(result.data.share))
          .catch((err) => {
            dispatch(clearDataUser());
            localStorage.clear();
            navigate("/");
          });
        setIsLoading(false);
      } else if (category === "vendor") {
        axios
          .get(`${SERVER_URL}/${category}/getShare/${userId}`, {
            headers: { Authorization: token },
          })
          .then((result) => setShare(result.data.share))
          .catch((err) => {
            dispatch(clearDataVendor());
            localStorage.clear();
            navigate("/");
          });
        setIsLoading(false);
      }
    }, 3000);
  }, []);

  function hanldeCrossInShare() {
    navigate("/");
    JSON.parse(localStorage.getItem(category));
  }

  return (
    <div className="views-P">
      <img src={cross} alt="cross" onClick={hanldeCrossInShare} />
      <h1
        style={{
          gridColumnEnd: "4",
          gridColumnStart: "1",
          marginBottom: "2rem",
          paddingBottom: "1.5rem",
          borderBottom: "1px solid rgba(105, 102, 102, 0.637)",
        }}
      >
        Share
      </h1>
      <div className="views">
        {isLoading ? (
          <div
            className="loading"
            style={{ width: "80vw", height: "40rem" }}
          ></div>
        ) : share.length === 0 ? (
          <h1
            style={{
              width: "80vw",
              height: "40rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            You haven't shared to Anyone
          </h1>
        ) : (
          share.map((element) => {
            const profession = element.name;
            let result = "";
            for (let i = 0; i < profession.length; i++) {
              if (i == 0) result += profession.charAt(i).toUpperCase();
              else {
                result += profession.charAt(i);
              }
            }
            return (
              <div className="views-children" key={element.key}>
                <div>
                  <span>Name :</span> <span>{result}</span>
                </div>
                <div>
                  <span>Phone No :</span> <span>{element.phoneNo}</span>
                </div>

                <div>
                  <span>Date :</span>
                  <span>{element.date}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

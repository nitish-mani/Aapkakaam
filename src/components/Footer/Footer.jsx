import "./Footer.css";
import appStore from "../../resources/img/appstore.png";
import playStore from "../../resources/img/playstore.webp";
import facebook from "../../resources/svg/facebook-svgrepo-com.svg";
import linkedin from "../../resources/svg/linkedin-svgrepo-com.svg";
import insta from "../../resources/svg/instagram-svgrepo-com.svg";
import youtube from "../../resources/svg/youtube-168-svgrepo-com.svg";
import twitter from "../../resources/img/twitter-x.png";

export default function Footer() {
  return (
    <div className="footer-div">
      <div className="footer-div1st">
        {" "}
        <div>
          <div className="title">ABOUT AAPKAKAAM</div>
          <div className="title_child">
            <div>About</div>
            <div>Terms & Conditions</div>
            <div>Privacy Policy</div>
            <div>FAQs</div>
          </div>
        </div>
        <div>
          <div className="title">CONNECT WITH US</div>
          <div className="title_child">
            <div>Feedback</div>
            <div>Contact Us</div>
            <div>Advertise with Us</div>
          </div>
        </div>
        <div>
          <div className="title">EXPERIENCE AAPKAKAAM APP</div>
          <div>
            <div style={{ cursor: "pointer" }}>
              <img src={appStore} alt="logo" />
            </div>
            <div style={{ cursor: "pointer" }}>
              <img src={playStore} alt="logo" />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ borderTop: "1px solid rgba(0, 0, 0, 0.12)", width: "100vw" }}
      >
        <div className="footer-div2nd">
          <div className="copyRight">@2024 Aapkakaam Technology Pvt. Ltd.</div>
          <div></div>
          <div className="connect">
            <div
              className="title"
              style={{ color: "#24272c", fontSize: "1.5rem" }}
            >
              Connect :
            </div>
            <img
              src={facebook}
              alt="facebook"
              style={{ width: "2rem", height: "2rem", cursor: "pointer" }}
            />
            <img
              src={twitter}
              alt="twiter"
              style={{ width: "2rem", height: "2rem", cursor: "pointer" }}
            />
            <img
              src={youtube}
              alt="youtube"
              style={{ width: "2rem", height: "2rem", cursor: "pointer" }}
            />
            <img
              src={insta}
              alt="insta"
              style={{ width: "2rem", height: "2rem", cursor: "pointer" }}
            />
            <img
              src={linkedin}
              alt="linkedin"
              style={{ width: "2rem", height: "2rem", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

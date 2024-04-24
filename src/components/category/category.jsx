import "./category.css";
import rightArrow from "../../resources/svg/right-arrow-svgrepo-com.svg";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { setCategory } from "../../utils/categoryslice";

export default function Category() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cd, id } = useParams();

  function handleUserLogin() {
    dispatch(setCategory("user"));
    localStorage.setItem("category", "user");
    navigate("/login", { state: { category: "user", cd: cd, id: id } });
  }

  function handleVendorLogin() {
    dispatch(setCategory("vendor"));
    localStorage.setItem("category", "vendor");
    navigate("/login", { state: { category: "vendor", cd: cd, id: id } });
  }

  return (
    <div className="category">
      <div className="category-child">
        <div onClick={handleUserLogin}>
          Login/Signup As a User
          <span className="right-arrow">
            <svg
              dataSlot="icon"
              fill="none"
              strokeWidth={2}
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </span>
        </div>
        <div onClick={handleVendorLogin}>
          Login/Signup As a Vendor
          <span className="right-arrow">
            <svg
              dataSlot="icon"
              fill="none"
              strokeWidth={2}
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

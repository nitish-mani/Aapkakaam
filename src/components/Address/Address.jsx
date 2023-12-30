import { useState } from "react";
import "./Address.css";

export default function Address({ category = "User" }) {
  const [vill, setVill] = useState("");
  const [post, setPost] = useState("");
  const [tehsil, setTehsil] = useState("");
  const [dist, setDist] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  function handleSubmitAddress() {}

  return (
    <div className="address">
      <div className="address__1stChild">
        <h3>{category} Address</h3>
      </div>
      <div className="address__2ndChild">
        <div>
          <input
            placeholder="Village"
            type="text"
            value={vill}
            onChange={(e) => setVill(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Post"
            type="text"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Tehsil"
            type="text"
            value={tehsil}
            onChange={(e) => setTehsil(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="District"
            type="text"
            value={dist}
            onChange={(e) => setDist(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="State"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Pincode"
            type="number"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
        </div>
        <button className="btn" onClick={handleSubmitAddress}>
          Submit
        </button>
      </div>
    </div>
  );
}

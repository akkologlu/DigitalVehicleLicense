import React, { useState } from "react";
// import web3 from "../web3";
import license from "../license";
import frontBumper from "../assets/front-bumper.svg";

function Home() {
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [vehicleId, setVehicleId] = useState("");

  const fetchVehicleDetails = async (e) => {
    e.preventDefault();
    try {
      const details = await license.methods
        .getCompleteVehicleDetails(vehicleId)
        .call();
      setVehicleDetails(details);
    } catch (error) {
      console.error("Error fetching vehicle details: ", error);
    }
  };
  console.log(vehicleDetails);
  return (
    <div>
      <div>
        <form onSubmit={fetchVehicleDetails}>
          <input
            type="text"
            placeholder="Enter Vehicle ID"
            value={vehicleId}
            onChange={(event) => setVehicleId(event.target.value)}
          />
          <button type="submit">Fetch Vehicle Details</button>
        </form>

        {vehicleDetails && (
          <div>
            <h3>Vehicle Details:</h3>
            {/* Display the vehicle details here */}
          </div>
        )}
      </div>
      <div>
        <svg
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 100 125"
          style={{ enableBackground: "new 0 0 100 100" }}
          xmlSpace="preserve"
        >
          <g>
            <path d="M64.5,18.7C45.9,1.5,19.9,3.5,18.8,3.6c-0.8,0.1-1.4,0.7-1.4,1.5V95c0,0.8,0.7,1.5,1.5,1.5h31.5c0.8,0,1.5-0.7,1.5-1.5 c0-12.6,10.2-22.8,22.8-22.8c1.9,0,3.9,0.3,5.9,0.8c0.5,0.1,0.9,0,1.3-0.3c0.4-0.3,0.6-0.7,0.6-1.2v-4.3 C82.6,46,76.5,29.7,64.5,18.7z M79.6,69.7c-1.6-0.3-3.2-0.5-4.8-0.5C61,69.2,49.8,80,49,93.5H20.4V6.6C26,6.4,47.2,6.8,62.5,20.9 c11.3,10.4,17.1,26,17.1,46.4V69.7z" />
            <path d="M26.6,14.8c-0.8,0.1-1.4,0.7-1.4,1.5V50c0,0.8,0.7,1.5,1.5,1.5h45.5c0.4,0,0.9-0.2,1.2-0.5s0.4-0.8,0.3-1.2 C66.2,11.9,26.9,14.8,26.6,14.8z M28.2,48.5V17.7c6.7-0.2,35.2,0.8,42.1,30.8H28.2z" />
            <path d="M41.2,56.5H26.7c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5h14.5c0.8,0,1.5-0.7,1.5-1.5S42,56.5,41.2,56.5z" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default Home;

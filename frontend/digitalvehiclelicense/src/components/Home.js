import React, { useState } from "react";
// import web3 from "../web3";
import license from "../license";

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
    </div>
  );
}

export default Home;

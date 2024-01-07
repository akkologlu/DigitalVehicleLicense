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
            <div className="flex flex-col w-fit items-end">
              <div className="font-bebas">
                <p className=" text-sky-950 text-9xl font-extrabold">
                  {" "}
                  {vehicleDetails.vehicleDetails[0]}{" "}
                  <span className="text-sky-800 text-7xl font-semibold">
                    {vehicleDetails.vehicleDetails[1]}
                  </span>
                </p>
              </div>
              <div className="font-bebas flex space-x-6">
                <div>
                  <p className="text-[#0c4a6eb0] text-5xl font-semibold">
                    {parseInt(vehicleDetails.vehicleDetails[2])}
                  </p>
                </div>
                <div>
                  <p className="text-[#0c4a6eb0] text-5xl font-semibold">
                    {parseInt(vehicleDetails.vehicleDetails[3])} KM
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p>KAZALAR</p>
              <p>{parseInt(vehicleDetails.vehicleAccidentHistory[7][1])}</p>
              <p>
                <a
                  href={vehicleDetails.vehicleAccidentHistory[7][2]}
                  target="_blank" rel="noreferrer"
                >
                  Report
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

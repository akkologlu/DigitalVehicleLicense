import React, { useState } from "react";
import web3 from "../web3";
import license from "../license";

function AddVehicle() {
  const [message, setMessage] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [kilometers, setKilometers] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Waiting on transaction success...");
    const accounts = await web3.eth.getAccounts();

    await license.methods
      .addVehicle(
        parseInt(vehicleId),
        brand,
        model,
        parseInt(year),
        parseInt(kilometers)
      )
      .send({ from: accounts[0] });

    setMessage("You have added a vehicle!");
  };
  console.log(message);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Vehicle ID"
          value={vehicleId}
          onChange={(event) => setVehicleId(event.target.value)}
        />
        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
        />
        <input
          type="text"
          placeholder="Model"
          value={model}
          onChange={(event) => setModel(event.target.value)}
        />
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(event) => setYear(event.target.value)}
        />
        <input
          type="text"
          placeholder="Kilometers"
          value={kilometers}
          onChange={(event) => setKilometers(event.target.value)}
        />
        <button type="submit">Add Vehicle</button>
      </form>
    </div>
  );
}

export default AddVehicle;

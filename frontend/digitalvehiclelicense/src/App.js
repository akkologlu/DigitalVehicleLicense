import "./App.css";
import React, { useState, useEffect } from "react";
import license from "./license";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RegisterUser from "./components/RegisterUser";
import Navbar from "./components/Navbar";
import AddVehicle from "./components/AddVehicle";
import AddAccident from "./components/AddAccident";
import AddMaintenance from "./components/AddMaintenance";
import TransferVehicle from "./components/TransferVehicle";

function App() {
  const [manager, setManager] = useState("");
  useEffect(() => {
    async function fetchData() {
      const manager = await license.methods.authorizedDealer().call();
      setManager(manager);
    }

    fetchData();
  }, []);
  console.log(manager);
  return (
    <div className="App flex min-h-screen">
      <div className="bg-[#ffffff] lg:w-72 w-48 h-[%95]  m-3 ">
        <Navbar />
      </div>
      <div className=" w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registerUser" element={<RegisterUser />} />
          <Route path="/addVehicle" element={<AddVehicle />} />
          <Route path="/addAccident" element={<AddAccident />} />
          <Route path="/addMaintenance" element={<AddMaintenance />} />
          <Route path="/transferVehicle" element={<TransferVehicle />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

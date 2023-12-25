import "./App.css";
import web3 from "./web3";
import React, { useState, useEffect } from "react";
import license from "./license";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RegisterUser from "./components/RegisterUser";
import Navbar from "./components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddVehicle from "./components/AddVehicle";
import AddAccident from "./components/AddAccident";
import AddMaintenance from "./components/AddMaintenance";
import TransferVehicle from "./components/TransferVehicle";

function App() {
  const [manager, setManager] = useState("");
  useEffect(() => {
    async function fetchData() {
      const manager = await license.methods.authorizedDealer().call();
      console.log(manager);
    }
    setManager(manager);
    fetchData();
  }, []);
  return (
    <div className="App flex min-h-screen">
      <div className="bg-[#1e1e20] lg:w-72 w-48 h-[%95] sticky m-1 rounded-xl">
        <Navbar />
      </div>
      <div className="bg-blue-500 w-full">
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

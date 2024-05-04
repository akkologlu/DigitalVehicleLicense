import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import AddVehicle from "./components/AddVehicle";
import AddAccident from "./components/AddAccident";
import AddMaintenance from "./components/AddMaintenance";
import PartStatus from "./components/PartStatus";
import AddOwnership from "./components/AddOwnership";

function App() {
  return (
    <div className="App flex min-h-screen">
      <div className="bg-[#ffffff] lg:w-72 sticky top-3 h-[95vh] m-3 ">
        <Navbar />
      </div>
      <div className=" w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addOwnership" element={<AddOwnership />} />
          <Route path="/addVehicle" element={<AddVehicle />} />
          <Route path="/addAccident" element={<AddAccident />} />
          <Route path="/addMaintenance" element={<AddMaintenance />} />
          <Route path="/partStatus" element={<PartStatus />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUserPlus,
  faCarSide,
  faCarBurst,
  faTruckPickup,
  faRightLeft,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";
import profil from "../assets/profil.jpg";
import "../style/navbar.css";

function Navbar() {
  return (
    <div className="font-roboto text-[#c0c0c0] flex flex-col h-full justify-between">
      <div className="bg-[#28282c] p-2 py-6 text-[#d6d6d6] rounded-t-xl flex items-center space-x-3">
        <img src={logo} alt="" className="h-10 " />
        <p>Digital Vehicle License</p>
      </div>
      <div>
        <nav className="mainNav flex flex-col" id="navbar">
          <div>
            <NavLink
              to="/"
              className="space-x-6 flex p-3 items-center  m-4 rounded-xl hover:bg-[#1f3027] hover:text-[#67ffae]"
            >
              <FontAwesomeIcon icon={faHouse} className="text-3xl" />
              <p>Home</p>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/registerUser"
              className="space-x-6 flex p-3 items-center  m-4 rounded-xl hover:bg-[#1f3027] hover:text-[#67ffae]"
            >
              <FontAwesomeIcon icon={faUserPlus} className="text-3xl" />
              <p>Register User</p>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/addVehicle"
              className="space-x-6 flex p-3 items-center  m-4 rounded-xl hover:bg-[#1f3027] hover:text-[#67ffae]"
            >
              <FontAwesomeIcon icon={faCarSide} className="text-3xl" />
              <p>Add Vehicle</p>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/addAccident"
              className="space-x-6 flex p-3 items-center  m-4 rounded-xl hover:bg-[#1f3027] hover:text-[#67ffae]"
            >
              <FontAwesomeIcon icon={faCarBurst} className="text-3xl" />
              <p>Add Accident</p>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/addMaintenance"
              className="space-x-6 flex p-3 items-center  m-4 rounded-xl hover:bg-[#1f3027] hover:text-[#67ffae]"
            >
              <FontAwesomeIcon icon={faTruckPickup} className="text-3xl" />
              <p>Add Maintenance</p>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/transferVehicle"
              className="space-x-6 flex p-3 items-center  m-4 rounded-xl hover:bg-[#1f3027] hover:text-[#67ffae]"
            >
              <FontAwesomeIcon icon={faRightLeft} className="text-3xl" />
              <p>Transfer Vehicle</p>
            </NavLink>
          </div>
        </nav>
      </div>
      <div>
        <div className="bg-[#28282c] p-4 py-6 text-[#d6d6d6] flex items-center space-x-3 rounded-b-xl">
          <div>
            <img
              src={profil}
              alt=""
              className="h-10 w-10 rounded-full object-cover"
            />
          </div>
          <div>
            <p className="text-white">Abdullah Akkoloğlu</p>
            <p className="text-sm">Software Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

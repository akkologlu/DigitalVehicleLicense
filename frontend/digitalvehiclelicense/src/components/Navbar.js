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
    <div className="font-roboto text-gray-700 flex flex-col h-full justify-between shadow-lg rounded-3xl">
      <div className="bg-[#ffffff] p-2 py-6 text-gray-800 rounded-t-xl justify-center  flex items-center space-x-3 ">
        <img src={logo} alt="" className=" h-16 md:h-20 lg:h-24 rounded-full" />
      </div>
      <hr />
      <div>
        <nav className="mainNav flex flex-col" id="navbar">
          <div>
            <NavLink to="/" className="navLink navLinkDiv">
              <FontAwesomeIcon icon={faHouse} className="faIcon navLinkIcon" />
              <p className="navp">Home</p>
            </NavLink>
          </div>
          <div>
            <NavLink to="/addOwnership" className="navLink navLinkDiv">
              <FontAwesomeIcon
                icon={faUserPlus}
                className="faIcon navLinkIcon "
              />
              <p className="navp">Ownership</p>
            </NavLink>
          </div>
          <div>
            <NavLink to="/addVehicle" className="navLink navLinkDiv">
              <FontAwesomeIcon
                icon={faCarSide}
                className="faIcon navLinkIcon"
              />
              <p className="navp">Vehicle</p>
            </NavLink>
          </div>
          <div>
            <NavLink to="/addAccident" className="navLink navLinkDiv">
              <FontAwesomeIcon
                icon={faCarBurst}
                className="faIcon navLinkIcon"
              />
              <p className="navp">Accident</p>
            </NavLink>
          </div>
          <div>
            <NavLink to="/addMaintenance" className="navLink navLinkDiv">
              <FontAwesomeIcon
                icon={faTruckPickup}
                className="faIcon navLinkIcon"
              />
              <p className="navp">Maintenance</p>
            </NavLink>
          </div>
          <div>
            <NavLink to="/partStatus" className="navLink navLinkDiv">
              <FontAwesomeIcon
                icon={faRightLeft}
                className="faIcon navLinkIcon "
              />
              <p className="navp">Part Status</p>
            </NavLink>
          </div>
        </nav>
      </div>
      <hr />
      <div>
        <div className="bg-[#ffffff] p-4 py-6 text-[#d6d6d6] flex items-center space-x-3 rounded-b-xl justify-center lg:justify-start">
          <div>
            <img
              src={profil}
              alt=""
              className="h-10 w-10 rounded-full object-cover"
            />
          </div>
          <div className="navp">
            <p className="text-gray-800">Abdullah Akkoloğlu</p>
            <p className="text-sm text-gray-400">Software Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

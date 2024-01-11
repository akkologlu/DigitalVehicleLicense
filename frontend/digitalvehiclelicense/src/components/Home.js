import React, { useState } from "react";
import license from "../license";
import { FaRegCalendarAlt } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import "../style/vehicle.css";

function Home() {
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [vehicleId, setVehicleId] = useState("");
  const [button, setButton] = useState("accidents");

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

  const dateConverter = (date) => {
    const dateStr = date.toString();
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    return `${day}.${month}.${year}`;
  };

  function getFillColor(value) {
    let fillColor;

    switch (value) {
      case 0n:
        fillColor = "black"; // Replace with desired color for value 0
        break;
      case 1n:
        fillColor = "red"; // Replace with desired color for value 1
        break;
      case 2n:
        fillColor = "blue"; // Replace with desired color for value 2
        break;
      default:
        fillColor = "black"; // Default color if value is not 0, 1, or 2
    }

    return { fill: fillColor };
  }
  console.log(vehicleDetails);
  return (
    <div className="w-full px-12">
      <div>
        <form onSubmit={fetchVehicleDetails}>
          <input
            className="border border-gray-300 mt-5 rounded-xl px-4 py-2 w-96 focus:outline-none"
            type="text"
            placeholder="Enter Vehicle ID"
            value={vehicleId}
            onChange={(event) => setVehicleId(event.target.value)}
          />
        </form>

        {vehicleDetails && (
          <div className="flex flex-col space-y-12 w-full mt-12">
            {vehicleDetails.vehicleDetails[0] === "" ? (
              <p className="text-sky-950 text-6xl font-extrabold">
                VEHICLE NOT FOUND
              </p>
            ) : (
              <>
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
              </>
            )}

            <div className="flex justify-center lg:justify-start space-x-12 w-full flex-wrap relative ">
              <div className="flex  flex-col flex-wrap 2xl:w-[60%] w-full ">
                <div className="flex lg:justify-start justify-center space-x-12">
                  <button
                    onClick={() => {
                      setButton("accidents");
                    }}
                  >
                    <p
                      className={
                        button === "accidents"
                          ? "font-bebas text-4xl text-sky-900"
                          : "font-bebas text-2xl text-gray-400"
                      }
                    >
                      ACCIDENTS
                    </p>
                  </button>
                  <button
                    onClick={() => {
                      setButton("maintenances");
                    }}
                  >
                    <p
                      className={
                        button === "maintenances"
                          ? "font-bebas text-4xl text-sky-900"
                          : "font-bebas text-2xl text-gray-400"
                      }
                    >
                      MAINTENANCES
                    </p>
                  </button>
                  <button
                    onClick={() => {
                      setButton("ownerships");
                    }}
                  >
                    <p
                      className={
                        button === "ownerships"
                          ? "font-bebas text-4xl text-sky-900"
                          : "font-bebas text-2xl text-gray-400"
                      }
                    >
                      OWNERSHIPS
                    </p>
                  </button>
                </div>
                {button === "accidents" ? (
                  <div>
                    <div className=" font-roboto text-lg text-sky-900">
                      {vehicleDetails.vehicleAccidentHistory.length > 0 ? (
                        <>
                          {vehicleDetails.vehicleAccidentHistory.map(
                            (accident) => {
                              return (
                                <div
                                  key={accident.id}
                                  className="flex  w-full bg-sky-50 justify-between rounded-2xl px-12 p-4 my-4"
                                >
                                  <div className="flex items-center space-x-2">
                                    <FaRegCalendarAlt />

                                    <p>{dateConverter(accident.date)}</p>
                                  </div>

                                  <div>
                                    <a
                                      className="flex items-center space-x-2 rounded-xl px-2 py-1 bg-sky-700 text-white"
                                      href={accident.description}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      <TbReportSearch />
                                      <p>Report</p>
                                    </a>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </>
                      ) : (
                        <>
                          <p>NO ACCIDENT HISTORY</p>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    {button === "maintenances" ? (
                      <>
                        <div>
                          <div className=" font-roboto text-lg text-sky-900">
                            {vehicleDetails.vehicleMaintenanceHistory.length >
                            0 ? (
                              <>
                                {vehicleDetails.vehicleMaintenanceHistory.map(
                                  (maintenance) => {
                                    return (
                                      <div
                                        key={maintenance.id}
                                        className="flex  w-full bg-sky-50 justify-between rounded-2xl px-12 p-4 my-4"
                                      >
                                        <div className="flex items-center space-x-2">
                                          <FaRegCalendarAlt />

                                          <p>
                                            {dateConverter(maintenance.date)}
                                          </p>
                                        </div>

                                        <div>
                                          <a
                                            className="flex items-center space-x-2 rounded-xl px-2 py-1 bg-sky-700 text-white"
                                            href={maintenance.report}
                                            target="_blank"
                                            rel="noreferrer"
                                          >
                                            <TbReportSearch />
                                            <p>Report</p>
                                          </a>
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                              </>
                            ) : (
                              <>
                                <p>NO MAINTENANCE HISTORY</p>
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="  font-roboto text-lg text-sky-900">
                          {vehicleDetails.vehicleMaintenanceHistory.length >
                          0 ? (
                            <>
                              {vehicleDetails.vehicleMaintenanceHistory.map(
                                (maintenance) => {
                                  return (
                                    <div
                                      key={maintenance.id}
                                      className="flex  w-full bg-sky-50 justify-between rounded-2xl px-12 p-4 my-4"
                                    >
                                      <div className="flex items-center space-x-2">
                                        <FaRegCalendarAlt />

                                        <p>{dateConverter(maintenance.date)}</p>
                                      </div>

                                      <div>
                                        <a
                                          className="flex items-center space-x-2 rounded-xl px-2 py-1 bg-sky-700 text-white"
                                          href={maintenance.report}
                                          target="_blank"
                                          rel="noreferrer"
                                        >
                                          <TbReportSearch />
                                          <p>Report</p>
                                        </a>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </>
                          ) : (
                            <>
                              <p>NO MAINTENANCE HISTORY</p>
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
              <div className="  min-w-[350px]">
                <div className="araba ">
                  <div className="onTampon">
                    <svg
                      viewBox="0 0 417 521.25"
                      version="1.1"
                      x="0px"
                      y="0px"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      strokeLinejoin="round"
                      strokeMiterlimit="2"
                    >
                      <rect
                        x="0"
                        y="0"
                        width="416.667"
                        height="416.667"
                        fill="none"
                      />
                      <path
                        style={getFillColor(
                          vehicleDetails.vehiclePartStatus.bumpers.frontBumper
                        )}
                        d="M75.509,273.893l265.649,-0c14.201,-0 27.821,-5.644 37.861,-15.688c10.04,-10.045 15.677,-23.667 15.67,-37.869c-0.025,-51.593 -0.06,-66.166 -0.06,-66.166c-0.003,-1.174 -0.663,-2.247 -1.711,-2.779c0,0 -6.571,-3.339 -14.124,-3.858c-5.421,-0.373 -11.278,0.706 -15.853,4.992c-2.794,2.617 -5.147,6.464 -6.512,12.076c-3.197,13.142 -14.967,22.393 -28.493,22.393l-239.206,0c-13.525,0 -25.296,-9.251 -28.492,-22.393c-1.365,-5.612 -3.719,-9.459 -6.513,-12.076c-4.575,-4.286 -10.432,-5.365 -15.852,-4.992c-7.553,0.519 -14.125,3.858 -14.125,3.858c-1.047,0.532 -1.708,1.605 -1.71,2.779c-0,0 -0.035,14.573 -0.06,66.166c-0.007,14.202 5.63,27.824 15.67,37.869c10.04,10.044 23.659,15.688 37.861,15.688Zm-0,-6.25c-12.544,-0 -24.573,-4.985 -33.441,-13.857c-8.867,-8.872 -13.846,-20.904 -13.84,-33.447c0.02,-41.03 0.046,-58.643 0.056,-64.132c2.095,-0.853 5.879,-2.154 10.017,-2.439c3.795,-0.26 7.949,0.318 11.152,3.318c2.067,1.937 3.702,4.84 4.712,8.993c3.878,15.943 18.157,27.165 34.565,27.165l239.206,0c16.408,0 30.688,-11.222 34.566,-27.165c1.01,-4.153 2.645,-7.056 4.712,-8.993c3.203,-3 7.357,-3.578 11.151,-3.318c4.139,0.285 7.923,1.587 10.017,2.439c0.011,5.489 0.037,23.102 0.057,64.132c0.006,12.543 -4.973,24.575 -13.841,33.447c-8.867,8.872 -20.897,13.857 -33.44,13.857l-265.649,-0Zm18.71,-39.374c-0,-1.726 -1.399,-3.125 -3.125,-3.125l-35.167,-0c-1.726,-0 -3.125,1.399 -3.125,3.125l0,5.195c0,4.953 1.968,9.703 5.47,13.206c3.503,3.502 8.253,5.47 13.206,5.47c9.414,-0 19.616,-0 19.616,-0c1.726,-0 3.125,-1.399 3.125,-3.125l-0,-20.746Zm231.354,-3.125c-1.726,-0 -3.125,1.399 -3.125,3.125l-0,20.746c-0,1.726 1.399,3.125 3.125,3.125c-0,-0 10.202,-0 19.616,-0c4.953,-0 9.703,-1.968 13.205,-5.47c3.503,-3.503 5.47,-8.253 5.47,-13.206c0,-2.981 0,-5.195 0,-5.195c0,-1.726 -1.399,-3.125 -3.125,-3.125l-35.166,-0Zm-211.98,23.871c0,1.726 1.399,3.125 3.125,3.125l183.231,-0c1.725,-0 3.125,-1.399 3.125,-3.125l-0,-20.746c-0,-1.726 -1.4,-3.125 -3.125,-3.125l-183.231,-0c-1.726,-0 -3.125,1.399 -3.125,3.125l0,20.746Zm6.25,-3.125l0,-14.496c0,-0 176.98,-0 176.98,-0c0.001,-0 0.001,14.496 0.001,14.496l-176.981,-0Zm208.855,-14.496l28.916,-0c0,-0 0,2.07 0,2.07c0,3.296 -1.309,6.456 -3.639,8.786c-2.33,2.331 -5.491,3.64 -8.786,3.64l-16.491,-0l-0,-14.496Zm-240.729,-0l-0,14.496c-0,-0 -16.491,-0 -16.491,-0c-3.295,-0 -6.456,-1.309 -8.786,-3.64c-2.331,-2.33 -3.64,-5.49 -3.64,-8.786c0,-0 0,-2.07 0,-2.07l28.917,-0Z"
                      />
                    </svg>
                  </div>

                  <div className="arkaTampon">
                    <svg
                      data-name="Layer 1"
                      viewBox="0 0 512 640"
                      x="0px"
                      y="0px"
                    >
                      <path
                        style={getFillColor(
                          vehicleDetails.vehiclePartStatus.bumpers.rearBumper
                        )}
                        d="M256,249.93c-35.29,0-70.56-3.5-102.73-10.49-40.05-8.72-73-22.55-95.21-40a8,8,0,1,1,9.88-12.58c20.34,16,51,28.75,88.73,37,62.2,13.53,136.46,13.53,198.66,0,37.7-8.2,68.39-21,88.73-37a8,8,0,1,1,9.88,12.58c-22.23,17.46-55.16,31.29-95.21,40C326.57,246.43,291.28,249.93,256,249.93Z"
                      />
                      <path
                        style={getFillColor(
                          vehicleDetails.vehiclePartStatus.bumpers.rearBumper
                        )}
                        d="M256,385.48c-58.17,0-117.14-9.77-175.27-29.05A84.05,84.05,0,0,1,23,276.57V174.36a8,8,0,0,1,16,0V276.57a68.08,68.08,0,0,0,46.77,64.68c113,37.45,227.5,37.45,340.46,0A68.08,68.08,0,0,0,473,276.57V174.36a8,8,0,0,1,16,0V276.57a84.05,84.05,0,0,1-57.73,79.86C373.14,375.71,314.17,385.48,256,385.48Z"
                      />
                      <path
                        style={getFillColor(
                          vehicleDetails.vehiclePartStatus.bumpers.rearBumper
                        )}
                        d="M337.36,302.52H174.64a8,8,0,0,1-7.64-5.61L147.33,234a8,8,0,0,1,15.28-4.78l17.91,57.29h151l17.91-57.29A8,8,0,1,1,364.67,234L345,296.91A8,8,0,0,1,337.36,302.52Z"
                      />
                      <path
                        style={getFillColor(
                          vehicleDetails.vehiclePartStatus.bumpers.rearBumper
                        )}
                        d="M130,337.23a7.85,7.85,0,0,1-2-.25c-12.35-3.16-24.86-6.83-37.18-10.92A52.12,52.12,0,0,1,55,276.57V231.65a8,8,0,0,1,12-6.92c18.15,10.54,40,19.29,65,26a8,8,0,0,1,5.92,7.73v70.76a8,8,0,0,1-8,8ZM71,245.05v31.52a36.14,36.14,0,0,0,24.84,34.31c8.65,2.87,17.4,5.53,26.12,7.94V264.55A295.49,295.49,0,0,1,71,245.05Z"
                      />
                      <path
                        style={getFillColor(
                          vehicleDetails.vehiclePartStatus.bumpers.rearBumper
                        )}
                        d="M382.07,337.23a8,8,0,0,1-8-8V258.56a8,8,0,0,1,5.92-7.82c25-6.74,46.88-15.49,65-26a8,8,0,0,1,12,6.92v44.92a52.12,52.12,0,0,1-35.8,49.49c-12.18,4-24.68,7.72-37.14,10.92A8,8,0,0,1,382.07,337.23Zm8-72.68v54.26c8.77-2.43,17.51-5.09,26.09-7.93A36.14,36.14,0,0,0,441,276.57V245.05A295.51,295.51,0,0,1,390.07,264.55Z"
                      />
                      <path
                        style={getFillColor(
                          vehicleDetails.vehiclePartStatus.bumpers.rearBumper
                        )}
                        d="M311.44,344H200.56a8,8,0,1,1,0-16H311.44a8,8,0,1,1,0,16Z"
                      />
                      <path
                        style={getFillColor(
                          vehicleDetails.vehiclePartStatus.bumpers.rearBumper
                        )}
                        d="M63,201.14a8,8,0,0,1-8-8V142.52H39v31.84a8,8,0,0,1-16,0V134.52a8,8,0,0,1,8-8H63a8,8,0,0,1,8,8v58.62A8,8,0,0,1,63,201.14Z"
                      />
                      <path
                        style={getFillColor(
                          vehicleDetails.vehiclePartStatus.bumpers.rearBumper
                        )}
                        d="M449,201.14a8,8,0,0,1-8-8V134.52a8,8,0,0,1,8-8h32a8,8,0,0,1,8,8v39.84a8,8,0,0,1-16,0V142.52H457v50.62A8,8,0,0,1,449,201.14Z"
                      />
                    </svg>
                  </div>
                  <div className="arkaKapiSag">
                    <svg
                      version="1.1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 100 125"
                      style={{ enableBackground: "new 0 0 100 100" }}
                    >
                      <g>
                        <path
                          style={getFillColor(
                            vehicleDetails.vehiclePartStatus.doors.leftFrontDoor
                          )}
                          d="M79.7,90.5H23c-5,0-9.7-2.7-12.1-7.1c-1-1.7-1.5-3.6-1.7-5.5L7,51.1c-0.3-3.8,0.9-7.5,3.4-10.3l23.5-26.6   c2.6-3,6.4-4.7,10.4-4.7c0,0,0,0,0,0h35.4c0,0,0,0,0,0c7.6,0,13.8,6.2,13.8,13.8v53.4C93.5,84.3,87.3,90.5,79.7,90.5z M44.3,11.5   c-3.4,0-6.6,1.5-8.9,4L11.9,42.1c-2.1,2.4-3.2,5.6-2.9,8.9l2.3,26.8c0.1,1.7,0.6,3.3,1.4,4.7c2.1,3.8,6.1,6.1,10.3,6.1h56.6   c6.5,0,11.8-5.3,11.8-11.8V23.3c0-6.5-5.3-11.8-11.8-11.8c0,0,0,0,0,0H44.3C44.3,11.5,44.3,11.5,44.3,11.5z"
                        />
                      </g>
                      <g>
                        <path
                          style={getFillColor(
                            vehicleDetails.vehiclePartStatus.doors.leftFrontDoor
                          )}
                          d="M86,64H73c-0.6,0-1-0.4-1-1s0.4-1,1-1h13c0.6,0,1,0.4,1,1S86.6,64,86,64z"
                        />
                      </g>
                      <g>
                        <path
                          style={getFillColor(
                            vehicleDetails.vehiclePartStatus.doors.leftFrontDoor
                          )}
                          d="M86,75H18c-0.6,0-1-0.4-1-1s0.4-1,1-1h68c0.6,0,1,0.4,1,1S86.6,75,86,75z"
                        />
                      </g>
                      <g>
                        <path
                          style={getFillColor(
                            vehicleDetails.vehiclePartStatus.doors.leftFrontDoor
                          )}
                          d="M41,38c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l11-11c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-11,11   C41.5,37.9,41.3,38,41,38z"
                        />
                      </g>
                      <g>
                        <path
                          style={getFillColor(
                            vehicleDetails.vehiclePartStatus.doors.leftFrontDoor
                          )}
                          d="M40,31c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l5-5c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-5,5C40.5,30.9,40.3,31,40,31z"
                        />
                      </g>
                      <g>
                        <path
                          style={getFillColor(
                            vehicleDetails.vehiclePartStatus.doors.leftFrontDoor
                          )}
                          d="M86,53H15c-0.6,0-1-0.4-1-1v-2.5c0-2.5,0.9-4.9,2.6-6.7l21-22.7c1.9-2,4.5-3.1,7.2-3.1c0,0,0,0,0.1,0h35c1.9,0,3.7,0.7,5,2   c1.4,1.3,2.1,3.1,2.1,5c0,0,0,0.1,0,0.1V52C87,52.6,86.6,53,86,53z M16,51h69V24.1c0-1.4-0.6-2.6-1.5-3.6c-1-1-2.3-1.5-3.6-1.5h-35   c0,0,0,0,0,0c-2.2,0-4.2,0.9-5.7,2.5l-21,22.7c-1.3,1.5-2.1,3.3-2.1,5.3V51z"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="onKapiSag">
                    <svg
                      version="1.1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 100 125"
                      style={{ enableBackground: "new 0 0 100 100" }}
                    >
                      <g>
                        <path
                          style={getFillColor(
                            vehicleDetails.vehiclePartStatus.doors.leftRearDoor
                          )}
                          d="M79.7,90.5H23c-5,0-9.7-2.7-12.1-7.1c-1-1.7-1.5-3.6-1.7-5.5L7,51.1c-0.3-3.8,0.9-7.5,3.4-10.3l23.5-26.6   c2.6-3,6.4-4.7,10.4-4.7c0,0,0,0,0,0h35.4c0,0,0,0,0,0c7.6,0,13.8,6.2,13.8,13.8v53.4C93.5,84.3,87.3,90.5,79.7,90.5z M44.3,11.5   c-3.4,0-6.6,1.5-8.9,4L11.9,42.1c-2.1,2.4-3.2,5.6-2.9,8.9l2.3,26.8c0.1,1.7,0.6,3.3,1.4,4.7c2.1,3.8,6.1,6.1,10.3,6.1h56.6   c6.5,0,11.8-5.3,11.8-11.8V23.3c0-6.5-5.3-11.8-11.8-11.8c0,0,0,0,0,0H44.3C44.3,11.5,44.3,11.5,44.3,11.5z"
                        />
                      </g>
                      <g>
                        <path
                          style={getFillColor(
                            vehicleDetails.vehiclePartStatus.doors.leftRearDoor
                          )}
                          d="M86,64H73c-0.6,0-1-0.4-1-1s0.4-1,1-1h13c0.6,0,1,0.4,1,1S86.6,64,86,64z"
                        />
                      </g>
                      <g>
                        <path
                          style={getFillColor(
                            vehicleDetails.vehiclePartStatus.doors.leftRearDoor
                          )}
                          d="M86,75H18c-0.6,0-1-0.4-1-1s0.4-1,1-1h68c0.6,0,1,0.4,1,1S86.6,75,86,75z"
                        />
                      </g>
                      <g>
                        <path
                          style={getFillColor(
                            vehicleDetails.vehiclePartStatus.doors.leftRearDoor
                          )}
                          d="M41,38c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l11-11c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-11,11   C41.5,37.9,41.3,38,41,38z"
                        />
                      </g>
                      <g>
                        <path
                          style={getFillColor(
                            vehicleDetails.vehiclePartStatus.doors.leftRearDoor
                          )}
                          d="M40,31c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l5-5c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-5,5C40.5,30.9,40.3,31,40,31z"
                        />
                      </g>
                      <g>
                        <path
                          style={getFillColor(
                            vehicleDetails.vehiclePartStatus.doors.leftRearDoor
                          )}
                          d="M86,53H15c-0.6,0-1-0.4-1-1v-2.5c0-2.5,0.9-4.9,2.6-6.7l21-22.7c1.9-2,4.5-3.1,7.2-3.1c0,0,0,0,0.1,0h35c1.9,0,3.7,0.7,5,2   c1.4,1.3,2.1,3.1,2.1,5c0,0,0,0.1,0,0.1V52C87,52.6,86.6,53,86,53z M16,51h69V24.1c0-1.4-0.6-2.6-1.5-3.6c-1-1-2.3-1.5-3.6-1.5h-35   c0,0,0,0,0,0c-2.2,0-4.2,0.9-5.7,2.5l-21,22.7c-1.3,1.5-2.1,3.3-2.1,5.3V51z"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="onKapiSol">
                    <svg
                      version="1.1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 100 125"
                      style={{ enableBackground: "new 0 0 100 100" }}
                    >
                      <g>
                        <path
                          style={getFillColor(
                            vehicleDetails.vehiclePartStatus.doors
                              .rightFrontDoor
                          )}
                          d="M79.7,90.5H23c-5,0-9.7-2.7-12.1-7.1c-1-1.7-1.5-3.6-1.7-5.5L7,51.1c-0.3-3.8,0.9-7.5,3.4-10.3l23.5-26.6   c2.6-3,6.4-4.7,10.4-4.7c0,0,0,0,0,0h35.4c0,0,0,0,0,0c7.6,0,13.8,6.2,13.8,13.8v53.4C93.5,84.3,87.3,90.5,79.7,90.5z M44.3,11.5   c-3.4,0-6.6,1.5-8.9,4L11.9,42.1c-2.1,2.4-3.2,5.6-2.9,8.9l2.3,26.8c0.1,1.7,0.6,3.3,1.4,4.7c2.1,3.8,6.1,6.1,10.3,6.1h56.6   c6.5,0,11.8-5.3,11.8-11.8V23.3c0-6.5-5.3-11.8-11.8-11.8c0,0,0,0,0,0H44.3C44.3,11.5,44.3,11.5,44.3,11.5z"
                        />
                      </g>
                      <g>
                        <path
                          style={getFillColor(
                            vehicleDetails.vehiclePartStatus.doors
                              .rightFrontDoor
                          )}
                          d="M86,64H73c-0.6,0-1-0.4-1-1s0.4-1,1-1h13c0.6,0,1,0.4,1,1S86.6,64,86,64z"
                        />
                      </g>
                      <g>
                        <path
                          style={getFillColor(
                            vehicleDetails.vehiclePartStatus.doors
                              .rightFrontDoor
                          )}
                          d="M86,75H18c-0.6,0-1-0.4-1-1s0.4-1,1-1h68c0.6,0,1,0.4,1,1S86.6,75,86,75z"
                        />
                      </g>
                      <g>
                        <path
                          style={getFillColor(
                            vehicleDetails.vehiclePartStatus.doors
                              .rightFrontDoor
                          )}
                          d="M41,38c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l11-11c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-11,11   C41.5,37.9,41.3,38,41,38z"
                        />
                      </g>
                      <g>
                        <path
                          style={getFillColor(
                            vehicleDetails.vehiclePartStatus.doors
                              .rightFrontDoor
                          )}
                          d="M40,31c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l5-5c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-5,5C40.5,30.9,40.3,31,40,31z"
                        />
                      </g>
                      <g>
                        <path
                          style={getFillColor(
                            vehicleDetails.vehiclePartStatus.doors
                              .rightFrontDoor
                          )}
                          d="M86,53H15c-0.6,0-1-0.4-1-1v-2.5c0-2.5,0.9-4.9,2.6-6.7l21-22.7c1.9-2,4.5-3.1,7.2-3.1c0,0,0,0,0.1,0h35c1.9,0,3.7,0.7,5,2   c1.4,1.3,2.1,3.1,2.1,5c0,0,0,0.1,0,0.1V52C87,52.6,86.6,53,86,53z M16,51h69V24.1c0-1.4-0.6-2.6-1.5-3.6c-1-1-2.3-1.5-3.6-1.5h-35   c0,0,0,0,0,0c-2.2,0-4.2,0.9-5.7,2.5l-21,22.7c-1.3,1.5-2.1,3.3-2.1,5.3V51z"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="arkaKapiSol">
                    <svg
                      version="1.1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 100 125"
                      style={{ enableBackground: "new 0 0 100 100" }}
                    >
                      <g>
                        <path
                          style={getFillColor(
                            vehicleDetails.vehiclePartStatus.doors.rightRearDoor
                          )}
                          d="M79.7,90.5H23c-5,0-9.7-2.7-12.1-7.1c-1-1.7-1.5-3.6-1.7-5.5L7,51.1c-0.3-3.8,0.9-7.5,3.4-10.3l23.5-26.6   c2.6-3,6.4-4.7,10.4-4.7c0,0,0,0,0,0h35.4c0,0,0,0,0,0c7.6,0,13.8,6.2,13.8,13.8v53.4C93.5,84.3,87.3,90.5,79.7,90.5z M44.3,11.5   c-3.4,0-6.6,1.5-8.9,4L11.9,42.1c-2.1,2.4-3.2,5.6-2.9,8.9l2.3,26.8c0.1,1.7,0.6,3.3,1.4,4.7c2.1,3.8,6.1,6.1,10.3,6.1h56.6   c6.5,0,11.8-5.3,11.8-11.8V23.3c0-6.5-5.3-11.8-11.8-11.8c0,0,0,0,0,0H44.3C44.3,11.5,44.3,11.5,44.3,11.5z"
                        />
                      </g>
                      <g>
                        <path
                          style={getFillColor(
                            vehicleDetails.vehiclePartStatus.doors.rightRearDoor
                          )}
                          d="M86,64H73c-0.6,0-1-0.4-1-1s0.4-1,1-1h13c0.6,0,1,0.4,1,1S86.6,64,86,64z"
                        />
                      </g>
                      <g>
                        <path
                          style={getFillColor(
                            vehicleDetails.vehiclePartStatus.doors.rightRearDoor
                          )}
                          d="M86,75H18c-0.6,0-1-0.4-1-1s0.4-1,1-1h68c0.6,0,1,0.4,1,1S86.6,75,86,75z"
                        />
                      </g>
                      <g>
                        <path
                          style={getFillColor(
                            vehicleDetails.vehiclePartStatus.doors.rightRearDoor
                          )}
                          d="M41,38c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l11-11c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-11,11   C41.5,37.9,41.3,38,41,38z"
                        />
                      </g>
                      <g>
                        <path
                          style={getFillColor(
                            vehicleDetails.vehiclePartStatus.doors.rightRearDoor
                          )}
                          d="M40,31c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l5-5c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-5,5C40.5,30.9,40.3,31,40,31z"
                        />
                      </g>
                      <g>
                        <path
                          style={getFillColor(
                            vehicleDetails.vehiclePartStatus.doors.rightRearDoor
                          )}
                          d="M86,53H15c-0.6,0-1-0.4-1-1v-2.5c0-2.5,0.9-4.9,2.6-6.7l21-22.7c1.9-2,4.5-3.1,7.2-3.1c0,0,0,0,0.1,0h35c1.9,0,3.7,0.7,5,2   c1.4,1.3,2.1,3.1,2.1,5c0,0,0,0.1,0,0.1V52C87,52.6,86.6,53,86,53z M16,51h69V24.1c0-1.4-0.6-2.6-1.5-3.6c-1-1-2.3-1.5-3.6-1.5h-35   c0,0,0,0,0,0c-2.2,0-4.2,0.9-5.7,2.5l-21,22.7c-1.3,1.5-2.1,3.3-2.1,5.3V51z"
                        />
                      </g>
                    </svg>
                  </div>

                  <div className="arkaSolCamurluk">
                    <svg
                      version="1.1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 100 125"
                      style={{ enableBackground: "new 0 0 100 100" }}
                    >
                      <g>
                        <path
                          style={getFillColor(
                            vehicleDetails.vehiclePartStatus.fenders
                              .leftRearFender
                          )}
                          d="M73,33.5c0,2.2,1.8,4.1,4,4.1s4-1.8,4-4.1c0-2.2-1.8-4.1-4-4.1S73,31.3,73,33.5z M77,31.8c0.9,0,1.6,0.8,1.6,1.7   s-0.7,1.7-1.6,1.7s-1.6-0.8-1.6-1.7S76.1,31.8,77,31.8z"
                        />
                        <path
                          style={getFillColor(
                            vehicleDetails.vehiclePartStatus.fenders
                              .leftRearFender
                          )}
                          d="M87.1,23.3c-13-0.9-25.1-0.5-35.8,1.4c-8.6,1.5-16.4,3.8-23.1,7c-11.5,5.4-16,11.4-16.2,11.6c-0.2,0.3-0.3,0.6-0.2,0.9   c0.1,0.3,0.2,0.6,0.5,0.8c5.5,3.7,0.4,13.4,0.4,13.4c-0.2,0.4-0.2,0.8,0,1.2c0.2,0.4,0.6,0.6,1,0.6h14.4l0.2,0.1   c0.3,0.1,0.7,0.1,1-0.1c0.3-0.2,0.5-0.5,0.6-0.9c0.8-5.7,3.6-10.9,7.9-14.6c4.3-3.8,9.8-5.9,15.6-5.9c13,0,23.7,10.8,23.7,24   c0,4.4-1.2,8.7-3.5,12.5c-0.2,0.3-0.2,0.7-0.1,1c0.1,0.3,0.4,0.6,0.7,0.7l0.4,0.1c0.1,0,0.3,0.1,0.4,0.1H87c0.7,0,1.2-0.5,1.2-1.2   V24.5C88.2,23.9,87.7,23.4,87.1,23.3z M85.8,74.8h-9.3c1.9-3.7,2.9-7.8,2.9-12.1c0-14.5-11.7-26.3-26-26.3   c-6.3,0-12.4,2.3-17.1,6.5c-4.4,3.9-7.4,9.2-8.4,14.9H15.6c0.5-1.1,1-2.7,1.4-4.5c0.8-4.1,0-7.4-2.3-9.5c1.6-1.8,6.1-6,14.5-10   c6.5-3.1,14.1-5.4,22.5-6.8c10.2-1.7,21.7-2.2,34.1-1.4V74.8z"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="arkaSagCamurluk">
                    <svg
                      version="1.1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 100 125"
                      style={{ enableBackground: "new 0 0 100 100" }}
                    >
                      <g>
                        <path
                          style={getFillColor(
                            vehicleDetails.vehiclePartStatus.fenders
                              .rightRearFender
                          )}
                          d="M73,33.5c0,2.2,1.8,4.1,4,4.1s4-1.8,4-4.1c0-2.2-1.8-4.1-4-4.1S73,31.3,73,33.5z M77,31.8c0.9,0,1.6,0.8,1.6,1.7   s-0.7,1.7-1.6,1.7s-1.6-0.8-1.6-1.7S76.1,31.8,77,31.8z"
                        />
                        <path
                          style={getFillColor(
                            vehicleDetails.vehiclePartStatus.fenders
                              .rightRearFender
                          )}
                          d="M87.1,23.3c-13-0.9-25.1-0.5-35.8,1.4c-8.6,1.5-16.4,3.8-23.1,7c-11.5,5.4-16,11.4-16.2,11.6c-0.2,0.3-0.3,0.6-0.2,0.9   c0.1,0.3,0.2,0.6,0.5,0.8c5.5,3.7,0.4,13.4,0.4,13.4c-0.2,0.4-0.2,0.8,0,1.2c0.2,0.4,0.6,0.6,1,0.6h14.4l0.2,0.1   c0.3,0.1,0.7,0.1,1-0.1c0.3-0.2,0.5-0.5,0.6-0.9c0.8-5.7,3.6-10.9,7.9-14.6c4.3-3.8,9.8-5.9,15.6-5.9c13,0,23.7,10.8,23.7,24   c0,4.4-1.2,8.7-3.5,12.5c-0.2,0.3-0.2,0.7-0.1,1c0.1,0.3,0.4,0.6,0.7,0.7l0.4,0.1c0.1,0,0.3,0.1,0.4,0.1H87c0.7,0,1.2-0.5,1.2-1.2   V24.5C88.2,23.9,87.7,23.4,87.1,23.3z M85.8,74.8h-9.3c1.9-3.7,2.9-7.8,2.9-12.1c0-14.5-11.7-26.3-26-26.3   c-6.3,0-12.4,2.3-17.1,6.5c-4.4,3.9-7.4,9.2-8.4,14.9H15.6c0.5-1.1,1-2.7,1.4-4.5c0.8-4.1,0-7.4-2.3-9.5c1.6-1.8,6.1-6,14.5-10   c6.5-3.1,14.1-5.4,22.5-6.8c10.2-1.7,21.7-2.2,34.1-1.4V74.8z"
                        />
                      </g>
                    </svg>
                  </div>

                  <div className="arkaKaput">
                    <svg viewBox="0 0 64 80" x="0px" y="0px">
                      <g>
                        <path
                          style={getFillColor(
                            vehicleDetails.vehiclePartStatus.hoods.rearHood
                          )}
                          d="M59.5259,9.1494a.9988.9988,0,0,0-.9732-.0439A66.2964,66.2964,0,0,1,32,15,66.44,66.44,0,0,1,5.4468,9.1055,1,1,0,0,0,4,10V46a1,1,0,0,0,1,1H7a5.0059,5.0059,0,0,1,5,5,1.0009,1.0009,0,0,0,.7251.9619C13.0166,53.0449,19.998,55,32,55s18.9834-1.9551,19.2749-2.0381A1.0009,1.0009,0,0,0,52,52a5.0059,5.0059,0,0,1,5-5h2a1,1,0,0,0,1-1V10A1.001,1.001,0,0,0,59.5259,9.1494ZM58,45H57a7.0093,7.0093,0,0,0-6.9556,6.2109A80.8914,80.8914,0,0,1,32,53a81.0958,81.0958,0,0,1-18.0444-1.79A7.01,7.01,0,0,0,7,45H6V11.56A68.1251,68.1251,0,0,0,32,17a68.1251,68.1251,0,0,0,26-5.44ZM26,19H38a1,1,0,0,1,1,1V46a1,1,0,0,1-2,0V21H27V46a1,1,0,0,1-2,0V20A1,1,0,0,1,26,19Zm-5,1a1,1,0,0,1-1,1H16a1,1,0,0,1,0-2h4A1,1,0,0,1,21,20Zm22,0a1,1,0,0,1,1-1h4a1,1,0,0,1,0,2H44A1,1,0,0,1,43,20Z"
                        />
                      </g>
                    </svg>
                  </div>

                  <div className="onKaput">
                    <svg
                      version="1.1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 100 125"
                      enableBackground="new 0 0 100 100"
                    >
                      <path
                        style={getFillColor(
                          vehicleDetails.vehiclePartStatus.hoods.frontHood
                        )}
                        d="M80.975,31.056c-0.086-0.025-8.655-2.632-9.756-11.16c-0.005-0.037-0.029-0.067-0.038-0.102  c-0.024-0.1-0.054-0.195-0.105-0.28c-0.023-0.038-0.052-0.067-0.079-0.101c-0.065-0.083-0.137-0.153-0.223-0.211  c-0.017-0.011-0.025-0.03-0.042-0.04c-0.334-0.195-8.327-4.787-20.332-4.787l-0.392,0.002L49.6,14.375  c-12.006,0-19.998,4.591-20.332,4.787c-0.017,0.01-0.026,0.029-0.043,0.04c-0.088,0.059-0.161,0.13-0.227,0.214  c-0.026,0.033-0.053,0.06-0.074,0.096c-0.052,0.087-0.083,0.184-0.107,0.286c-0.008,0.035-0.032,0.063-0.037,0.099  c-1.097,8.494-9.404,11.055-9.757,11.16c-0.267,0.079-0.49,0.267-0.613,0.516c-9.312,18.847-7.827,42.202-7.15,48.911  c0.032,0.317,0.213,0.6,0.488,0.761c0.156,0.092,0.331,0.138,0.507,0.138c0.134,0,0.269-0.027,0.396-0.082  c9.45-4.071,23.344-6.406,38.12-6.406c13.929,0,27.294,2.117,36.668,5.808c0.291,0.115,0.621,0.086,0.89-0.079  c0.268-0.165,0.443-0.446,0.472-0.759c0.619-6.654,1.926-29.801-7.21-48.292C81.466,31.322,81.244,31.135,80.975,31.056z   M86.92,78.367c-9.513-3.485-22.585-5.472-36.15-5.472c-14.395,0-28.007,2.194-37.645,6.044c-0.67-7.882-1.447-28.899,6.895-46.106  c1.355-0.48,5.496-2.221,8.262-6.195l-3.27,44.282c-0.041,0.551,0.373,1.03,0.923,1.071c0.025,0.002,0.05,0.003,0.075,0.003  c0.519,0,0.958-0.401,0.996-0.926l3.723-50.422c1.808-0.935,8.957-4.27,18.87-4.27l0.409,0.002l0.392-0.002  c9.885,0,17.057,3.337,18.871,4.272l3.724,50.421c0.039,0.526,0.477,0.926,0.996,0.926c0.024,0,0.05-0.001,0.075-0.003  c0.551-0.041,0.964-0.52,0.923-1.071l-3.27-44.281c2.766,3.974,6.907,5.714,8.262,6.194C88.168,49.729,87.526,70.566,86.92,78.367z"
                      />
                      <path
                        style={getFillColor(
                          vehicleDetails.vehiclePartStatus.hoods.frontHood
                        )}
                        d="M50,17.676c-2.015,0-3.654,1.639-3.654,3.654c0,2.015,1.639,3.654,3.654,3.654s3.654-1.639,3.654-3.654  C53.654,19.315,52.015,17.676,50,17.676z M50,22.984c-0.912,0-1.654-0.742-1.654-1.654s0.742-1.654,1.654-1.654  s1.654,0.742,1.654,1.654S50.912,22.984,50,22.984z"
                      />
                    </svg>
                  </div>
                  <div className="onSolCamurluk">
                    <svg
                      version="1.1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 100 125"
                      enableBackground="new 0 0 100 100"
                    >
                      <path
                        style={getFillColor(
                          vehicleDetails.vehiclePartStatus.fenders
                            .rightFrontFender
                        )}
                        d="M98.5,22.908c0-0.022-0.012-0.041-0.013-0.063c-0.005-0.069-0.021-0.132-0.04-0.197c-0.017-0.062-0.031-0.122-0.059-0.177  c-0.028-0.057-0.066-0.104-0.104-0.154c-0.039-0.052-0.075-0.104-0.124-0.147c-0.046-0.041-0.098-0.069-0.15-0.101  c-0.06-0.036-0.117-0.071-0.185-0.094c-0.021-0.007-0.034-0.023-0.056-0.029c-0.045-0.013-0.09-0.004-0.136-0.01  c-0.046-0.007-0.086-0.027-0.134-0.027c-10.339,0-87.348,9.728-94.352,24.041c-0.28,0.41-1.648,2.687-1.648,7.943  c0,0.553,0.448,1,1,1h14.43c-0.485,4.362-4.09,7.763-8.458,7.763H2.5c-0.552,0-1,0.447-1,1v13.438c0,0.553,0.448,1,1,1h20.568  c0.552,0,1-0.447,1-1c0-15.193,12.36-27.553,27.553-27.553c15.193,0,27.555,12.36,27.555,27.553c0,0.553,0.447,1,1,1h11.611  c0.553,0,1-0.447,1-1c0-0.336,0.066-33.849,5.676-53.915c0.013-0.045,0.004-0.088,0.01-0.133C98.479,22.998,98.5,22.956,98.5,22.908  z M51.621,47.539c-15.96,0-28.997,12.719-29.527,28.553h-3.52c0.532-17.775,15.147-32.075,33.049-32.075  c17.901,0,32.516,14.299,33.048,32.075H81.15C80.62,60.258,67.583,47.539,51.621,47.539z M90.794,76.092h-4.123  c-0.532-18.878-16.043-34.075-35.048-34.075S17.106,57.214,16.574,76.092H3.5v-3.744h11.69c0.552,0,1-0.447,1-1s-0.448-1-1-1H3.5  v-5.693h4.972c5.799,0,10.518-4.828,10.518-10.763c0-0.553-0.448-1-1-1H3.521c0.159-4.092,1.254-5.777,1.288-5.828  c0.013-0.018,0.014-0.039,0.025-0.057c0.021-0.035,0.049-0.064,0.067-0.103c5.639-12.209,75.77-22.355,91.292-22.967  C91.381,42.356,90.852,70.475,90.794,76.092z"
                      />
                    </svg>
                  </div>

                  <div className="onSagCamurluk">
                    <svg
                      version="1.1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 100 125"
                      enableBackground="new 0 0 100 100"
                    >
                      <path
                        style={getFillColor(
                          vehicleDetails.vehiclePartStatus.fenders
                            .leftFrontFender
                        )}
                        d="M98.5,22.908c0-0.022-0.012-0.041-0.013-0.063c-0.005-0.069-0.021-0.132-0.04-0.197c-0.017-0.062-0.031-0.122-0.059-0.177  c-0.028-0.057-0.066-0.104-0.104-0.154c-0.039-0.052-0.075-0.104-0.124-0.147c-0.046-0.041-0.098-0.069-0.15-0.101  c-0.06-0.036-0.117-0.071-0.185-0.094c-0.021-0.007-0.034-0.023-0.056-0.029c-0.045-0.013-0.09-0.004-0.136-0.01  c-0.046-0.007-0.086-0.027-0.134-0.027c-10.339,0-87.348,9.728-94.352,24.041c-0.28,0.41-1.648,2.687-1.648,7.943  c0,0.553,0.448,1,1,1h14.43c-0.485,4.362-4.09,7.763-8.458,7.763H2.5c-0.552,0-1,0.447-1,1v13.438c0,0.553,0.448,1,1,1h20.568  c0.552,0,1-0.447,1-1c0-15.193,12.36-27.553,27.553-27.553c15.193,0,27.555,12.36,27.555,27.553c0,0.553,0.447,1,1,1h11.611  c0.553,0,1-0.447,1-1c0-0.336,0.066-33.849,5.676-53.915c0.013-0.045,0.004-0.088,0.01-0.133C98.479,22.998,98.5,22.956,98.5,22.908  z M51.621,47.539c-15.96,0-28.997,12.719-29.527,28.553h-3.52c0.532-17.775,15.147-32.075,33.049-32.075  c17.901,0,32.516,14.299,33.048,32.075H81.15C80.62,60.258,67.583,47.539,51.621,47.539z M90.794,76.092h-4.123  c-0.532-18.878-16.043-34.075-35.048-34.075S17.106,57.214,16.574,76.092H3.5v-3.744h11.69c0.552,0,1-0.447,1-1s-0.448-1-1-1H3.5  v-5.693h4.972c5.799,0,10.518-4.828,10.518-10.763c0-0.553-0.448-1-1-1H3.521c0.159-4.092,1.254-5.777,1.288-5.828  c0.013-0.018,0.014-0.039,0.025-0.057c0.021-0.035,0.049-0.064,0.067-0.103c5.639-12.209,75.77-22.355,91.292-22.967  C91.381,42.356,90.852,70.475,90.794,76.092z"
                      />
                    </svg>
                  </div>

                  <div className="teker1">
                    <svg
                      version="1.1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 100 125"
                      style={{ enableBackground: "new 0 0 100 100" }}
                    >
                      <switch>
                        <foreignObject
                          requiredExtensions="http://ns.adobe.com/AdobeIllustrator/10.0/"
                          x="0"
                          y="0"
                          width="1"
                          height="1"
                        />
                        <g>
                          <g>
                            <path d="M50,18.9c-17.2,0-31.1,14-31.1,31.1s14,31.1,31.1,31.1s31.1-14,31.1-31.1S67.2,18.9,50,18.9z M71.6,35.9     c1.7,2.6,3,5.6,3.6,8.7c0.3,1.4-0.8,2.7-2.2,2.7H61.8c-0.9,0-1.7-0.5-2-1.4c0,0,0,0,0,0c-0.3-0.8-0.2-1.8,0.5-2.4l7.9-7.9     C69.2,34.6,70.8,34.8,71.6,35.9z M52.7,26.9c0-1.4,1.3-2.5,2.7-2.2c3.2,0.7,6.1,1.9,8.7,3.6c1.2,0.8,1.3,2.4,0.3,3.4l-7.9,7.9     c-0.6,0.6-1.6,0.8-2.4,0.5c0,0,0,0,0,0c-0.8-0.3-1.4-1.1-1.4-2V26.9z M35.9,28.4c2.6-1.7,5.6-3,8.7-3.6c1.4-0.3,2.7,0.8,2.7,2.2     v11.2c0,0.9-0.5,1.7-1.4,2c0,0,0,0,0,0c-0.8,0.3-1.8,0.2-2.4-0.5l-7.9-7.9C34.6,30.8,34.8,29.2,35.9,28.4z M28.4,35.9     c0.8-1.2,2.4-1.3,3.4-0.3l7.9,7.9c0.6,0.6,0.8,1.6,0.5,2.4c0,0,0,0,0,0c-0.3,0.8-1.1,1.4-2,1.4H26.9c-1.4,0-2.5-1.3-2.2-2.7     C25.4,41.5,26.7,38.5,28.4,35.9z M28.4,64.1c-1.7-2.6-3-5.6-3.6-8.7c-0.3-1.4,0.8-2.7,2.2-2.7h11.2c0.9,0,1.7,0.5,2,1.4     c0,0,0,0,0,0c0.3,0.8,0.2,1.8-0.5,2.4l-7.9,7.9C30.8,65.4,29.2,65.2,28.4,64.1z M47.3,73.1c0,1.4-1.3,2.5-2.7,2.2     c-3.2-0.7-6.1-1.9-8.7-3.6c-1.2-0.8-1.3-2.4-0.3-3.4l7.9-7.9c0.6-0.6,1.6-0.8,2.4-0.5c0,0,0,0,0,0c0.8,0.3,1.4,1.1,1.4,2V73.1z      M44.7,50c0-2.9,2.4-5.3,5.3-5.3c2.9,0,5.3,2.4,5.3,5.3s-2.4,5.3-5.3,5.3C47.1,55.3,44.7,52.9,44.7,50z M64.1,71.6     c-2.6,1.7-5.6,3-8.7,3.6c-1.4,0.3-2.7-0.8-2.7-2.2V61.8c0-0.9,0.5-1.7,1.4-2c0,0,0,0,0,0c0.8-0.3,1.8-0.2,2.4,0.5l7.9,7.9     C65.4,69.2,65.2,70.8,64.1,71.6z M71.6,64.1c-0.8,1.2-2.4,1.3-3.4,0.3l-7.9-7.9c-0.6-0.6-0.8-1.6-0.5-2.4c0,0,0,0,0,0     c0.3-0.8,1.1-1.4,2-1.4h11.2c1.4,0,2.5,1.3,2.2,2.7C74.6,58.5,73.3,61.5,71.6,64.1z" />
                            <path d="M50,2.5C23.8,2.5,2.5,23.8,2.5,50S23.8,97.5,50,97.5S97.5,76.2,97.5,50S76.2,2.5,50,2.5z M50,86.3     C30,86.3,13.7,70,13.7,50S30,13.7,50,13.7S86.3,30,86.3,50S70,86.3,50,86.3z" />
                          </g>
                        </g>
                      </switch>
                    </svg>
                  </div>

                  <div className="teker2">
                    <svg
                      version="1.1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 100 125"
                      style={{ enableBackground: "new 0 0 100 100" }}
                    >
                      <switch>
                        <foreignObject
                          requiredExtensions="http://ns.adobe.com/AdobeIllustrator/10.0/"
                          x="0"
                          y="0"
                          width="1"
                          height="1"
                        />
                        <g>
                          <g>
                            <path d="M50,18.9c-17.2,0-31.1,14-31.1,31.1s14,31.1,31.1,31.1s31.1-14,31.1-31.1S67.2,18.9,50,18.9z M71.6,35.9     c1.7,2.6,3,5.6,3.6,8.7c0.3,1.4-0.8,2.7-2.2,2.7H61.8c-0.9,0-1.7-0.5-2-1.4c0,0,0,0,0,0c-0.3-0.8-0.2-1.8,0.5-2.4l7.9-7.9     C69.2,34.6,70.8,34.8,71.6,35.9z M52.7,26.9c0-1.4,1.3-2.5,2.7-2.2c3.2,0.7,6.1,1.9,8.7,3.6c1.2,0.8,1.3,2.4,0.3,3.4l-7.9,7.9     c-0.6,0.6-1.6,0.8-2.4,0.5c0,0,0,0,0,0c-0.8-0.3-1.4-1.1-1.4-2V26.9z M35.9,28.4c2.6-1.7,5.6-3,8.7-3.6c1.4-0.3,2.7,0.8,2.7,2.2     v11.2c0,0.9-0.5,1.7-1.4,2c0,0,0,0,0,0c-0.8,0.3-1.8,0.2-2.4-0.5l-7.9-7.9C34.6,30.8,34.8,29.2,35.9,28.4z M28.4,35.9     c0.8-1.2,2.4-1.3,3.4-0.3l7.9,7.9c0.6,0.6,0.8,1.6,0.5,2.4c0,0,0,0,0,0c-0.3,0.8-1.1,1.4-2,1.4H26.9c-1.4,0-2.5-1.3-2.2-2.7     C25.4,41.5,26.7,38.5,28.4,35.9z M28.4,64.1c-1.7-2.6-3-5.6-3.6-8.7c-0.3-1.4,0.8-2.7,2.2-2.7h11.2c0.9,0,1.7,0.5,2,1.4     c0,0,0,0,0,0c0.3,0.8,0.2,1.8-0.5,2.4l-7.9,7.9C30.8,65.4,29.2,65.2,28.4,64.1z M47.3,73.1c0,1.4-1.3,2.5-2.7,2.2     c-3.2-0.7-6.1-1.9-8.7-3.6c-1.2-0.8-1.3-2.4-0.3-3.4l7.9-7.9c0.6-0.6,1.6-0.8,2.4-0.5c0,0,0,0,0,0c0.8,0.3,1.4,1.1,1.4,2V73.1z      M44.7,50c0-2.9,2.4-5.3,5.3-5.3c2.9,0,5.3,2.4,5.3,5.3s-2.4,5.3-5.3,5.3C47.1,55.3,44.7,52.9,44.7,50z M64.1,71.6     c-2.6,1.7-5.6,3-8.7,3.6c-1.4,0.3-2.7-0.8-2.7-2.2V61.8c0-0.9,0.5-1.7,1.4-2c0,0,0,0,0,0c0.8-0.3,1.8-0.2,2.4,0.5l7.9,7.9     C65.4,69.2,65.2,70.8,64.1,71.6z M71.6,64.1c-0.8,1.2-2.4,1.3-3.4,0.3l-7.9-7.9c-0.6-0.6-0.8-1.6-0.5-2.4c0,0,0,0,0,0     c0.3-0.8,1.1-1.4,2-1.4h11.2c1.4,0,2.5,1.3,2.2,2.7C74.6,58.5,73.3,61.5,71.6,64.1z" />
                            <path d="M50,2.5C23.8,2.5,2.5,23.8,2.5,50S23.8,97.5,50,97.5S97.5,76.2,97.5,50S76.2,2.5,50,2.5z M50,86.3     C30,86.3,13.7,70,13.7,50S30,13.7,50,13.7S86.3,30,86.3,50S70,86.3,50,86.3z" />
                          </g>
                        </g>
                      </switch>
                    </svg>
                  </div>

                  <div className="teker3">
                    <svg
                      version="1.1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 100 125"
                      style={{ enableBackground: "new 0 0 100 100" }}
                    >
                      <switch>
                        <foreignObject
                          requiredExtensions="http://ns.adobe.com/AdobeIllustrator/10.0/"
                          x="0"
                          y="0"
                          width="1"
                          height="1"
                        />
                        <g>
                          <g>
                            <path d="M50,18.9c-17.2,0-31.1,14-31.1,31.1s14,31.1,31.1,31.1s31.1-14,31.1-31.1S67.2,18.9,50,18.9z M71.6,35.9     c1.7,2.6,3,5.6,3.6,8.7c0.3,1.4-0.8,2.7-2.2,2.7H61.8c-0.9,0-1.7-0.5-2-1.4c0,0,0,0,0,0c-0.3-0.8-0.2-1.8,0.5-2.4l7.9-7.9     C69.2,34.6,70.8,34.8,71.6,35.9z M52.7,26.9c0-1.4,1.3-2.5,2.7-2.2c3.2,0.7,6.1,1.9,8.7,3.6c1.2,0.8,1.3,2.4,0.3,3.4l-7.9,7.9     c-0.6,0.6-1.6,0.8-2.4,0.5c0,0,0,0,0,0c-0.8-0.3-1.4-1.1-1.4-2V26.9z M35.9,28.4c2.6-1.7,5.6-3,8.7-3.6c1.4-0.3,2.7,0.8,2.7,2.2     v11.2c0,0.9-0.5,1.7-1.4,2c0,0,0,0,0,0c-0.8,0.3-1.8,0.2-2.4-0.5l-7.9-7.9C34.6,30.8,34.8,29.2,35.9,28.4z M28.4,35.9     c0.8-1.2,2.4-1.3,3.4-0.3l7.9,7.9c0.6,0.6,0.8,1.6,0.5,2.4c0,0,0,0,0,0c-0.3,0.8-1.1,1.4-2,1.4H26.9c-1.4,0-2.5-1.3-2.2-2.7     C25.4,41.5,26.7,38.5,28.4,35.9z M28.4,64.1c-1.7-2.6-3-5.6-3.6-8.7c-0.3-1.4,0.8-2.7,2.2-2.7h11.2c0.9,0,1.7,0.5,2,1.4     c0,0,0,0,0,0c0.3,0.8,0.2,1.8-0.5,2.4l-7.9,7.9C30.8,65.4,29.2,65.2,28.4,64.1z M47.3,73.1c0,1.4-1.3,2.5-2.7,2.2     c-3.2-0.7-6.1-1.9-8.7-3.6c-1.2-0.8-1.3-2.4-0.3-3.4l7.9-7.9c0.6-0.6,1.6-0.8,2.4-0.5c0,0,0,0,0,0c0.8,0.3,1.4,1.1,1.4,2V73.1z      M44.7,50c0-2.9,2.4-5.3,5.3-5.3c2.9,0,5.3,2.4,5.3,5.3s-2.4,5.3-5.3,5.3C47.1,55.3,44.7,52.9,44.7,50z M64.1,71.6     c-2.6,1.7-5.6,3-8.7,3.6c-1.4,0.3-2.7-0.8-2.7-2.2V61.8c0-0.9,0.5-1.7,1.4-2c0,0,0,0,0,0c0.8-0.3,1.8-0.2,2.4,0.5l7.9,7.9     C65.4,69.2,65.2,70.8,64.1,71.6z M71.6,64.1c-0.8,1.2-2.4,1.3-3.4,0.3l-7.9-7.9c-0.6-0.6-0.8-1.6-0.5-2.4c0,0,0,0,0,0     c0.3-0.8,1.1-1.4,2-1.4h11.2c1.4,0,2.5,1.3,2.2,2.7C74.6,58.5,73.3,61.5,71.6,64.1z" />
                            <path d="M50,2.5C23.8,2.5,2.5,23.8,2.5,50S23.8,97.5,50,97.5S97.5,76.2,97.5,50S76.2,2.5,50,2.5z M50,86.3     C30,86.3,13.7,70,13.7,50S30,13.7,50,13.7S86.3,30,86.3,50S70,86.3,50,86.3z" />
                          </g>
                        </g>
                      </switch>
                    </svg>
                  </div>

                  <div className="teker4">
                    <svg
                      version="1.1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 100 125"
                      style={{ enableBackground: "new 0 0 100 100" }}
                    >
                      <switch>
                        <foreignObject
                          requiredExtensions="http://ns.adobe.com/AdobeIllustrator/10.0/"
                          x="0"
                          y="0"
                          width="1"
                          height="1"
                        />
                        <g>
                          <g>
                            <path d="M50,18.9c-17.2,0-31.1,14-31.1,31.1s14,31.1,31.1,31.1s31.1-14,31.1-31.1S67.2,18.9,50,18.9z M71.6,35.9     c1.7,2.6,3,5.6,3.6,8.7c0.3,1.4-0.8,2.7-2.2,2.7H61.8c-0.9,0-1.7-0.5-2-1.4c0,0,0,0,0,0c-0.3-0.8-0.2-1.8,0.5-2.4l7.9-7.9     C69.2,34.6,70.8,34.8,71.6,35.9z M52.7,26.9c0-1.4,1.3-2.5,2.7-2.2c3.2,0.7,6.1,1.9,8.7,3.6c1.2,0.8,1.3,2.4,0.3,3.4l-7.9,7.9     c-0.6,0.6-1.6,0.8-2.4,0.5c0,0,0,0,0,0c-0.8-0.3-1.4-1.1-1.4-2V26.9z M35.9,28.4c2.6-1.7,5.6-3,8.7-3.6c1.4-0.3,2.7,0.8,2.7,2.2     v11.2c0,0.9-0.5,1.7-1.4,2c0,0,0,0,0,0c-0.8,0.3-1.8,0.2-2.4-0.5l-7.9-7.9C34.6,30.8,34.8,29.2,35.9,28.4z M28.4,35.9     c0.8-1.2,2.4-1.3,3.4-0.3l7.9,7.9c0.6,0.6,0.8,1.6,0.5,2.4c0,0,0,0,0,0c-0.3,0.8-1.1,1.4-2,1.4H26.9c-1.4,0-2.5-1.3-2.2-2.7     C25.4,41.5,26.7,38.5,28.4,35.9z M28.4,64.1c-1.7-2.6-3-5.6-3.6-8.7c-0.3-1.4,0.8-2.7,2.2-2.7h11.2c0.9,0,1.7,0.5,2,1.4     c0,0,0,0,0,0c0.3,0.8,0.2,1.8-0.5,2.4l-7.9,7.9C30.8,65.4,29.2,65.2,28.4,64.1z M47.3,73.1c0,1.4-1.3,2.5-2.7,2.2     c-3.2-0.7-6.1-1.9-8.7-3.6c-1.2-0.8-1.3-2.4-0.3-3.4l7.9-7.9c0.6-0.6,1.6-0.8,2.4-0.5c0,0,0,0,0,0c0.8,0.3,1.4,1.1,1.4,2V73.1z      M44.7,50c0-2.9,2.4-5.3,5.3-5.3c2.9,0,5.3,2.4,5.3,5.3s-2.4,5.3-5.3,5.3C47.1,55.3,44.7,52.9,44.7,50z M64.1,71.6     c-2.6,1.7-5.6,3-8.7,3.6c-1.4,0.3-2.7-0.8-2.7-2.2V61.8c0-0.9,0.5-1.7,1.4-2c0,0,0,0,0,0c0.8-0.3,1.8-0.2,2.4,0.5l7.9,7.9     C65.4,69.2,65.2,70.8,64.1,71.6z M71.6,64.1c-0.8,1.2-2.4,1.3-3.4,0.3l-7.9-7.9c-0.6-0.6-0.8-1.6-0.5-2.4c0,0,0,0,0,0     c0.3-0.8,1.1-1.4,2-1.4h11.2c1.4,0,2.5,1.3,2.2,2.7C74.6,58.5,73.3,61.5,71.6,64.1z" />
                            <path d="M50,2.5C23.8,2.5,2.5,23.8,2.5,50S23.8,97.5,50,97.5S97.5,76.2,97.5,50S76.2,2.5,50,2.5z M50,86.3     C30,86.3,13.7,70,13.7,50S30,13.7,50,13.7S86.3,30,86.3,50S70,86.3,50,86.3z" />
                          </g>
                        </g>
                      </switch>
                    </svg>
                  </div>
                  <div
                    className="tavan"
                    style={{
                      borderColor:
                        vehicleDetails.vehiclePartStatus.roof === 0n
                          ? "black"
                          : vehicleDetails.vehiclePartStatus.roof === 1n
                          ? "red"
                          : vehicleDetails.vehiclePartStatus.roof === 2n
                          ? "blue"
                          : "black", // Replace 'defaultColor' with your default border color
                      // Add other styles if necessary
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

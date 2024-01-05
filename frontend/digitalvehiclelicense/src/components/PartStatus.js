import React, { useState } from "react";
import web3 from "../web3";
import license from "../license";
import { FaArrowCircleRight, FaCheckCircle } from "react-icons/fa";

function PartStatus() {
  const [partStatuses, setPartStatuses] = useState({
    frontBumper: 0,
    rearBumper: 0,
    rightFrontDoor: 0,
    leftFrontDoor: 0,
    rightRearDoor: 0,
    leftRearDoor: 0,
    frontHood: 0,
    rearHood: 0,
    rightFrontFender: 0,
    leftFrontFender: 0,
    rightRearFender: 0,
    leftRearFender: 0,
    roof: 0,
  });
  const [vehicleId, setVehicleId] = useState("");
  const [message, setMessage] = useState("initial");
  const [fetched, setFetched] = useState(false);

  const fetchPartStatus = async (e) => {
    e.preventDefault();
    try {
      const status = await license.methods.getPartStatus(vehicleId).call();
      setPartStatuses({
        frontBumper: parseInt(status.bumpers.frontBumper),
        rearBumper: parseInt(status.bumpers.rearBumper),
        rightFrontDoor: parseInt(status.doors.rightFrontDoor),
        leftFrontDoor: parseInt(status.doors.leftFrontDoor),
        rightRearDoor: parseInt(status.doors.rightRearDoor),
        leftRearDoor: parseInt(status.doors.leftRearDoor),
        frontHood: parseInt(status.hoods.frontHood),
        rearHood: parseInt(status.hoods.rearHood),
        rightFrontFender: parseInt(status.fenders.rightFrontFender),
        leftFrontFender: parseInt(status.fenders.leftFrontFender),
        rightRearFender: parseInt(status.fenders.rightRearFender),
        leftRearFender: parseInt(status.fenders.leftRearFender),
        roof: parseInt(status.roof),
      });
      setFetched(true);
    } catch (error) {
      console.error("Error fetching part status: ", error);
      setMessage("error");
    }
  };

  const handlePartStatusChange = (partName, value) => {
    setPartStatuses((prevStatuses) => ({
      ...prevStatuses,
      [partName]: value,
    }));
  };
  console.log(partStatuses);
  const updateVehiclePartStatus = async (e) => {
    e.preventDefault();
    setMessage("waiting");
    try {
      const accounts = await web3.eth.getAccounts();

      const bumpers = {
        frontBumper: partStatuses.frontBumper,
        rearBumper: partStatuses.rearBumper,
      };

      const hoods = {
        frontHood: partStatuses.frontHood,
        rearHood: partStatuses.rearHood,
      };

      const fenders = {
        rightFrontFender: partStatuses.rightFrontFender,
        leftFrontFender: partStatuses.leftFrontFender,
        rightRearFender: partStatuses.rightRearFender,
        leftRearFender: partStatuses.leftRearFender,
      };

      const doors = {
        rightFrontDoor: partStatuses.rightFrontDoor,
        leftFrontDoor: partStatuses.leftFrontDoor,
        rightRearDoor: partStatuses.rightRearDoor,
        leftRearDoor: partStatuses.leftRearDoor,
      };

      const roof = partStatuses.roof;

      await license.methods
        .updatePartStatus(vehicleId, bumpers, hoods, roof, fenders, doors)
        .send({ from: accounts[0] });
      setMessage("success");
    } catch (error) {
      console.error("Error updating part status: ", error);
      setMessage("error");
    }
  };
  console.log(message);
  return (
    <div>
      {fetched ? (
        <>
          <div className="formDiv">
            <form className="form" onSubmit={updateVehiclePartStatus}>
              <div className="formRow">
                <div className="inputDiv">
                  <label className="formLabel" htmlFor="frontBumper">
                    Front Bumper
                  </label>
                  <select
                    className="select"
                    name="frontBumper"
                    value={partStatuses.frontBumper}
                    onChange={(e) =>
                      handlePartStatusChange("frontBumper", e.target.value)
                    }
                  >
                    <option value="">Please choose an option</option>
                    <option value={0}>Original</option>
                    <option value={1}>Changed</option>
                    <option value={2}>Painted</option>
                  </select>
                </div>
                <div className="inputDiv">
                  <label className="formLabel" htmlFor="rearBumper">
                    Rear Bumper
                  </label>
                  <select
                    className="select"
                    name="rearBumper"
                    value={partStatuses.rearBumper}
                    onChange={(e) =>
                      handlePartStatusChange("rearBumper", e.target.value)
                    }
                  >
                    <option value="">Please choose an option</option>
                    <option value={0}>Original</option>
                    <option value={1}>Changed</option>
                    <option value={2}>Painted</option>
                  </select>
                </div>
              </div>
              <div className="formRow">
                <div className="inputDiv">
                  <label className="formLabel" htmlFor="rightFrontDoor">
                    Right Front Door
                  </label>
                  <select
                    className="select"
                    name="rightFrontDoor"
                    value={partStatuses.rightFrontDoor}
                    onChange={(e) =>
                      handlePartStatusChange("rightFrontDoor", e.target.value)
                    }
                  >
                    <option value="">Please choose an option</option>
                    <option value={0}>Original</option>
                    <option value={1}>Changed</option>
                    <option value={2}>Painted</option>
                  </select>
                </div>
                <div className="inputDiv">
                  <label className="formLabel" htmlFor="leftFrontDoor">
                    Left Front Door
                  </label>
                  <select
                    className="select"
                    name="leftFrontDoor"
                    value={partStatuses.leftFrontDoor}
                    onChange={(e) =>
                      handlePartStatusChange("leftFrontDoor", e.target.value)
                    }
                  >
                    <option value="">Please choose an option</option>
                    <option value={0}>Original</option>
                    <option value={1}>Changed</option>
                    <option value={2}>Painted</option>
                  </select>
                </div>
              </div>

              <div className="formRow">
                <div className="inputDiv">
                  <label className="formLabel" htmlFor="rightRearDoor">
                    Right Rear Door
                  </label>
                  <select
                    className="select"
                    name="rightRearDoor"
                    value={partStatuses.rightRearDoor}
                    onChange={(e) =>
                      handlePartStatusChange("rightRearDoor", e.target.value)
                    }
                  >
                    <option value="">Please choose an option</option>
                    <option value={0}>Original</option>
                    <option value={1}>Changed</option>
                    <option value={2}>Painted</option>
                  </select>
                </div>
                <div className="inputDiv">
                  <label className="formLabel" htmlFor="leftRearDoor">
                    Left Rear Door
                  </label>
                  <select
                    className="select"
                    name="leftRearDoor"
                    value={partStatuses.leftRearDoor}
                    onChange={(e) =>
                      handlePartStatusChange("leftRearDoor", e.target.value)
                    }
                  >
                    <option value="">Please choose an option</option>
                    <option value={0}>Original</option>
                    <option value={1}>Changed</option>
                    <option value={2}>Painted</option>
                  </select>
                </div>
              </div>

              <div className="formRow">
                <div className="inputDiv">
                  <label className="formLabel" htmlFor="frontHood">
                    Front Hood
                  </label>
                  <select
                    className="select"
                    name="frontHood"
                    value={partStatuses.frontHood}
                    onChange={(e) =>
                      handlePartStatusChange("frontHood", e.target.value)
                    }
                  >
                    <option value="">Please choose an option</option>
                    <option value={0}>Original</option>
                    <option value={1}>Changed</option>
                    <option value={2}>Painted</option>
                  </select>
                </div>
                <div className="inputDiv">
                  <label className="formLabel" htmlFor="rearHood">
                    Rear Hood
                  </label>
                  <select
                    className="select"
                    name="rearHood"
                    value={partStatuses.rearHood}
                    onChange={(e) =>
                      handlePartStatusChange("rearHood", e.target.value)
                    }
                  >
                    <option value="">Please choose an option</option>
                    <option value={0}>Original</option>
                    <option value={1}>Changed</option>
                    <option value={2}>Painted</option>
                  </select>
                </div>
              </div>

              <div className="formRow">
                <div className="inputDiv">
                  <label className="formLabel" htmlFor="rightFrontFender">
                    Right Front Fender
                  </label>
                  <select
                    className="select"
                    name="rightFrontFender"
                    value={partStatuses.rightFrontFender}
                    onChange={(e) =>
                      handlePartStatusChange("rightFrontFender", e.target.value)
                    }
                  >
                    <option value="">Please choose an option</option>
                    <option value={0}>Original</option>
                    <option value={1}>Changed</option>
                    <option value={2}>Painted</option>
                  </select>
                </div>
                <div className="inputDiv">
                  <label className="formLabel" htmlFor="leftFrontFender">
                    Left Front Fender
                  </label>
                  <select
                    className="select"
                    name="leftFrontFender"
                    value={partStatuses.leftFrontFender}
                    onChange={(e) =>
                      handlePartStatusChange("leftFrontFender", e.target.value)
                    }
                  >
                    <option value="">Please choose an option</option>
                    <option value={0}>Original</option>
                    <option value={1}>Changed</option>
                    <option value={2}>Painted</option>
                  </select>
                </div>
              </div>

              <div className="formRow">
                <div className="inputDiv">
                  <label className="formLabel" htmlFor="rightRearFender">
                    Right Rear Fender
                  </label>
                  <select
                    className="select"
                    name="rightRearFender"
                    value={partStatuses.rightRearFender}
                    onChange={(e) =>
                      handlePartStatusChange("rightRearFender", e.target.value)
                    }
                  >
                    <option value="">Please choose an option</option>
                    <option value={0}>Original</option>
                    <option value={1}>Changed</option>
                    <option value={2}>Painted</option>
                  </select>
                </div>
                <div className="inputDiv">
                  <label className="formLabel" htmlFor="leftRearFender">
                    Left Rear Fender
                  </label>
                  <select
                    className="select"
                    name="leftRearFender"
                    value={partStatuses.leftRearFender}
                    onChange={(e) =>
                      handlePartStatusChange("leftRearFender", e.target.value)
                    }
                  >
                    <option value="">Please choose an option</option>
                    <option value={0}>Original</option>
                    <option value={1}>Changed</option>
                    <option value={2}>Painted</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col  space-y-1">
                <label className="formLabel" htmlFor="roof">
                  Roof
                </label>{" "}
                <div className="formRow">
                  <div className="flex flex-col">
                    <select
                      className="select"
                      name="roof"
                      value={partStatuses.roof}
                      onChange={(e) =>
                        handlePartStatusChange("roof", e.target.value)
                      }
                    >
                      <option value="">Please choose an option</option>
                      <option value={0}>Original</option>
                      <option value={1}>Changed</option>
                      <option value={2}>Painted</option>
                    </select>
                  </div>
                  <div className="">
                    <button className="selectButton" type="submit">
                      {message === "initial" ? (
                        <FaArrowCircleRight />
                      ) : (
                        <>
                          {message === "waiting" ? (
                            <>
                              <svg
                                aria-hidden="true"
                                role="status"
                                className="inline w-4 h-4 me-3 text-white animate-spin"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="#E5E7EB"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentColor"
                                />
                              </svg>
                              <p className="text-xs">Waiting for transaction</p>
                            </>
                          ) : (
                            <>
                              {message === "error" ? (
                                <>
                                  <p className="text-sm">Error occured</p>
                                </>
                              ) : (
                                <>
                                  <FaCheckCircle className="text-lg mr-2" />
                                  <p className="text-xs">
                                    Transaction successful
                                  </p>
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="formDiv"></div>
        </>
      ) : (
        <div className="formDiv">
          <form onSubmit={fetchPartStatus} className="form">
            <label className="formLabel">Vehicle ID</label>
            <input
              className="formInput"
              type="text"
              value={vehicleId}
              onChange={(event) => setVehicleId(event.target.value)}
            />
            <button className="formButton" type="submit">
              <FaArrowCircleRight />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default PartStatus;

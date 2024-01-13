import React, { useState } from "react";
import { FaArrowCircleRight, FaCheckCircle } from "react-icons/fa";
import license from "../license";
import web3 from "../web3";

function AddOwnership() {
  const [message, setMessage] = useState("initial");
  const [vehicleId, setVehicleId] = useState("");
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [endDate, setEndDate] = useState(0);
  const [startDate, setStartDate] = useState(0);
  const [startKM, setStartKM] = useState(0);
  const [endKM, setEndKM] = useState(0);
  const [errorVehicleId, setErrorVehicleId] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorProfession, setErrorProfession] = useState(false);
  const [errorStartDate, setErrorStartDate] = useState(false);
  const [errorEndDate, setErrorEndDate] = useState(false);
  const [errorStartKM, setErrorStartKM] = useState(false);
  const [errorEndKM, setErrorEndKM] = useState(false);

  const validateInput = () => {
    setErrorVehicleId(!vehicleId);
    setErrorName(!name);
    setErrorProfession(!profession);
    setErrorStartDate(!startDate);
    setErrorEndDate(!endDate);
    setErrorStartKM(!startKM);
    setErrorEndKM(!endKM);
    return (
      vehicleId &&
      name &&
      profession &&
      startDate &&
      endDate &&
      startKM &&
      endKM
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;
    setMessage("waiting");
    const accounts = await web3.eth.getAccounts();
    try {
      await license.methods
        .addOwnership(
          vehicleId,
          name,
          profession,
          parseInt(startDate),
          parseInt(endDate),
          parseInt(startKM),
          parseInt(endKM)
        )
        .send({ from: accounts[0] });
      setMessage("success");

      setTimeout(() => {
        setMessage("initial");
        setVehicleId("");
        setName("");
        setProfession("");
        setStartDate(0);
        setEndDate(0);
        setStartKM(0);
        setEndKM(0);
      }, 5000);
    } catch (error) {
      console.error("An error occurred", error);
      setMessage("error");
    }
  };

  const formatDate = (date) => {
    if (!date) return "";

    const year = Math.floor(date / 10000);
    const month = Math.floor((date % 10000) / 100);
    const day = date % 100;

    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  };

  const handleChangeDate = (e, isStartDate) => {
    const date = e.target.value;
    const parts = date.split("-");
    let year = parts[0];
    let month = parts[1];
    let day = parts[2];

    let result = parseInt(`${year}${month}${day}`);
    if (isStartDate) {
      setStartDate(result);
    } else {
      setEndDate(result);
    }
  };

  return (
    <div className="formDiv">
      <form onSubmit={handleSubmit} className="form">
        <p className="formHeader">ADD OWNERSHIP</p>

        <div className="formRow">
          <div className="inputDiv">
            <label className="formLabel">Name</label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="formInput"
              type="text"
            />
            {errorName && <p className="errorText">* Name is required</p>}
          </div>
          <div className="inputDiv">
            <label className="formLabel">Profession</label>
            <input
              value={profession}
              onChange={(event) => setProfession(event.target.value)}
              className="formInput"
              type="text"
            />
            {errorProfession && (
              <p className="errorText">* Profession is required</p>
            )}
          </div>
        </div>
        <div className="formRow">
          <div className="inputDiv">
            <label className="formLabel">Start Date</label>
            <input
              value={formatDate(startDate)}
              onChange={(e) => handleChangeDate(e, true)}
              className="formInput w-48"
              type="date"
            />
            {errorStartDate && <p className="errorText">* Date is required</p>}
          </div>
          <div className="inputDiv">
            <label className="formLabel">End Date</label>
            <input
              value={formatDate(endDate)}
              onChange={(e) => handleChangeDate(e, false)}
              className="formInput w-48"
              type="date"
            />
            {errorEndDate && <p className="errorText">* Date is required</p>}
          </div>
        </div>

        <div className="formRow">
          <div className="inputDiv">
            <label className="formLabel">Start KM</label>
            <input
              value={startKM}
              onChange={(event) => setStartKM(event.target.value)}
              className="formInput w-48"
              type="number"
            />
            {errorStartKM && <p className="errorText">* KM is required</p>}
          </div>
          <div className="inputDiv">
            <label className="formLabel">End KM</label>
            <input
              value={endKM}
              onChange={(event) => setEndKM(event.target.value)}
              className="formInput w-48"
              type="number"
            />
            {errorEndKM && <p className="errorText">* KM is required</p>}
          </div>
        </div>

        <div className="flex flex-col  space-y-1">
          <label className="formLabel">Vehicle ID</label>
          <div className="formRow">
            <div className="flex flex-col">
              <input
                value={vehicleId}
                onChange={(event) => setVehicleId(event.target.value)}
                className="formInput"
                type="text"
              />
              {errorVehicleId && (
                <p className="errorText">* Vehicle ID is required</p>
              )}
            </div>
            <div className="w-full">
              <button className="formButton" type="submit">
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
                        <p className="text-sm">Waiting for transaction</p>
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
                            <p className="text-sm">Transaction successful</p>
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
  );
}

export default AddOwnership;

import React, { useState, useRef } from "react";
import { FaArrowCircleRight, FaCheckCircle } from "react-icons/fa";
import license from "../license";
import web3 from "../web3";
import axios from "axios";
import { FaUpload } from "react-icons/fa";

function AddAccident() {
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState("initial");
  const [vehicleId, setVehicleId] = useState("");
  const [date, setDate] = useState("");
  const [dateFormatted, setDateFormatted] = useState(0);
  const [reportId, setReportId] = useState("");
  const [errorVehicleId, setErrorVehicleId] = useState(false);
  const [errorDate, setErrorDate] = useState(false);
  const [errorReportId, setErrorReportId] = useState(false);
  const [file, setFile] = useState("");
  const [dosyaSecMessage, setDosyaSecMessage] = useState("Select File");

  const validateInput = () => {
    setErrorVehicleId(!vehicleId);
    setErrorDate(!date);
    setErrorReportId(!reportId);
    return vehicleId && date && reportId;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;
    setMessage("waiting");
    const accounts = await web3.eth.getAccounts();
    try {
      await license.methods
        .addAccident(vehicleId, parseInt(dateFormatted), reportId)
        .send({ from: accounts[0] });
      setMessage("success");

      setTimeout(() => {
        setMessage("initial");
        setVehicleId("");
        setDate("");
        setDateFormatted(0);
        setReportId("");
      }, 5000);
    } catch (error) {
      console.error("An error occurred", error);
      setMessage("error");
    }
  };
  const handleSubmitIPFS = async (e) => {
    e.preventDefault();
    try {
      const fileData = new FormData();
      fileData.append("file", file);
      const responseData = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        fileData,
        {
          headers: {
            pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
            pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_KEY,
          },
        }
      );
      const fileUrl =
        "https://gateway.pinata.cloud/ipfs/" + responseData.data.IpfsHash;
      setReportId(fileUrl);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeDate = (e) => {
    const date = e.target.value;
    setDate(date);
    const parts = date.split("-");
    let year = parts[0];
    let month = parts[1];
    let day = parts[2];

    month = month.length < 2 ? "0" + month : month;
    day = day.length < 2 ? "0" + day : day;

    let result = parseInt(`${year}${month}${day}`);
    setDateFormatted(result);
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
    setDosyaSecMessage("File Selected");
  };
  console.log(reportId);
  return (
    <div className="formDiv">
      <form onSubmit={handleSubmit} className="form">
        <p className="formHeader">ADD ACCIDENT</p>
        <div className="formRow">
          <div className="inputDiv">
            <label className="formLabel">Vehicle ID</label>
            <input
              value={vehicleId}
              onChange={(event) => {
                setVehicleId(event.target.value);
                setErrorVehicleId(false);
              }}
              className="formInput"
              type="text"
            />
            {errorVehicleId && (
              <p className="errorText">* Vehicle ID is required</p>
            )}
          </div>
          <div className="inputDiv">
            <label className="formLabel">Date</label>
            <input
              value={date}
              onChange={(e) => {
                handleChangeDate(e);
                setErrorDate(false);
              }}
              className="formInput w-48"
              type="date"
            />
            {errorDate && <p className="errorText">* Date is required</p>}
          </div>
        </div>
        <div className="flex flex-col  space-y-1">
          <label className="formLabel">Report</label>
          <div className="formRow">
            <div className="flex w-full gap-3">
              <div className="w-full flex justify-center ">
                <button
                  onClick={handleButtonClick}
                  className="customButton flex items-center justify-center gap-1 border-2 border-none rounded-md p-2 w-full text-white bg-sky-800 hover:bg-sky-900 text-xs"
                >
                  <FaUpload className="text-3xl" /> {dosyaSecMessage}
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(event) => {
                    setFile(event.target.files[0]);
                    setErrorReportId(false);
                  }}
                  className="formInput"
                  style={{ display: "none" }}
                />
              </div>

              <button
                type="submit"
                onClick={handleSubmitIPFS}
                className="bg-sky-800 text-white p-2 rounded-md w-full hover:bg-sky-900 text-xs"
              >
                {reportId === "" ? "Upload To IPFS" : "Report Uploaded"}
              </button>
              {errorReportId && (
                <p className="errorText">* Report ID is required</p>
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

export default AddAccident;

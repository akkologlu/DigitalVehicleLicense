import web3 from "./web3";

const address = "0x6C7B95228573700dA0DE3f09320819F39c5549D4";

const abi = [
  {
    constant: false,
    inputs: [
      { name: "_vehicleId", type: "uint256" },
      { name: "_date", type: "uint256" },
      { name: "_description", type: "string" },
    ],
    name: "addAccident",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_name", type: "string" },
      { name: "_profession", type: "string" },
    ],
    name: "registerUser",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_vehicleId", type: "uint256" },
      { name: "_brand", type: "string" },
      { name: "_model", type: "string" },
      { name: "_year", type: "uint256" },
      { name: "_kilometers", type: "uint256" },
    ],
    name: "addVehicle",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_vehicleId", type: "uint256" },
      { name: "_date", type: "uint256" },
      { name: "_details", type: "string" },
    ],
    name: "addMaintenance",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "", type: "uint256" },
      { name: "", type: "uint256" },
    ],
    name: "ownershipHistories",
    outputs: [
      { name: "owner", type: "address" },
      { name: "startYear", type: "uint256" },
      { name: "endYear", type: "uint256" },
      { name: "startKilometers", type: "uint256" },
      { name: "endKilometers", type: "uint256" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_vehicleId", type: "uint256" },
      { name: "_newOwner", type: "address" },
      { name: "_endKilometers", type: "uint256" },
      { name: "_transferYear", type: "uint256" },
    ],
    name: "transferVehicle",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "", type: "address" }],
    name: "users",
    outputs: [
      { name: "name", type: "string" },
      { name: "profession", type: "string" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "", type: "uint256" }],
    name: "vehicles",
    outputs: [
      { name: "brand", type: "string" },
      { name: "model", type: "string" },
      { name: "year", type: "uint256" },
      { name: "kilometers", type: "uint256" },
      { name: "currentOwner", type: "address" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "", type: "uint256" },
      { name: "", type: "uint256" },
    ],
    name: "maintenanceHistories",
    outputs: [
      { name: "date", type: "uint256" },
      { name: "details", type: "string" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "authorizedDealer",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "", type: "uint256" },
      { name: "", type: "uint256" },
    ],
    name: "accidentHistories",
    outputs: [
      { name: "date", type: "uint256" },
      { name: "description", type: "string" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
];

// eslint-disable-next-line import/no-anonymous-default-export
export default new web3.eth.Contract(abi, address);

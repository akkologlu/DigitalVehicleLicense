import web3 from "./web3";

const address = "0xe4Cf967A34E29be062CEE080A7C7c2e1cd72218A";

const abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "accidentCounts",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "accidentHistories",
    outputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "uint256", name: "date", type: "uint256" },
      { internalType: "string", name: "description", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_vehicleId", type: "uint256" },
      { internalType: "uint256", name: "_date", type: "uint256" },
      { internalType: "string", name: "_description", type: "string" },
    ],
    name: "addAccident",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_vehicleId", type: "uint256" },
      { internalType: "uint256", name: "_date", type: "uint256" },
      { internalType: "string", name: "_report", type: "string" },
    ],
    name: "addMaintenance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_vehicleId", type: "uint256" },
      { internalType: "string", name: "_brand", type: "string" },
      { internalType: "string", name: "_model", type: "string" },
      { internalType: "uint256", name: "_year", type: "uint256" },
      { internalType: "uint256", name: "_kilometers", type: "uint256" },
    ],
    name: "addVehicle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "authorizedDealer",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_vehicleId", type: "uint256" },
      { internalType: "uint256", name: "_accidentId", type: "uint256" },
    ],
    name: "getAccident",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "uint256", name: "date", type: "uint256" },
          { internalType: "string", name: "description", type: "string" },
        ],
        internalType: "struct License.Accident",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_vehicleId", type: "uint256" }],
    name: "getAccidentHistory",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "uint256", name: "date", type: "uint256" },
          { internalType: "string", name: "description", type: "string" },
        ],
        internalType: "struct License.Accident[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_vehicleId", type: "uint256" }],
    name: "getCompleteVehicleDetails",
    outputs: [
      {
        components: [
          { internalType: "string", name: "brand", type: "string" },
          { internalType: "string", name: "model", type: "string" },
          { internalType: "uint256", name: "year", type: "uint256" },
          { internalType: "uint256", name: "kilometers", type: "uint256" },
          { internalType: "address", name: "currentOwner", type: "address" },
        ],
        internalType: "struct License.Vehicle",
        name: "vehicleDetails",
        type: "tuple",
      },
      {
        components: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "uint256", name: "startYear", type: "uint256" },
          { internalType: "uint256", name: "endYear", type: "uint256" },
          { internalType: "uint256", name: "startKilometers", type: "uint256" },
          { internalType: "uint256", name: "endKilometers", type: "uint256" },
        ],
        internalType: "struct License.OwnershipHistory[]",
        name: "vehicleOwnershipHistory",
        type: "tuple[]",
      },
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "uint256", name: "date", type: "uint256" },
          { internalType: "string", name: "description", type: "string" },
        ],
        internalType: "struct License.Accident[]",
        name: "vehicleAccidentHistory",
        type: "tuple[]",
      },
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "uint256", name: "date", type: "uint256" },
          { internalType: "string", name: "report", type: "string" },
        ],
        internalType: "struct License.Maintenance[]",
        name: "vehicleMaintenanceHistory",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_vehicleId", type: "uint256" },
      { internalType: "uint256", name: "_maintenanceId", type: "uint256" },
    ],
    name: "getMaintenance",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "uint256", name: "date", type: "uint256" },
          { internalType: "string", name: "report", type: "string" },
        ],
        internalType: "struct License.Maintenance",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_vehicleId", type: "uint256" }],
    name: "getMaintenanceHistory",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "uint256", name: "date", type: "uint256" },
          { internalType: "string", name: "report", type: "string" },
        ],
        internalType: "struct License.Maintenance[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "maintenanceCounts",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "maintenanceHistories",
    outputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "uint256", name: "date", type: "uint256" },
      { internalType: "string", name: "report", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "ownershipHistories",
    outputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "startYear", type: "uint256" },
      { internalType: "uint256", name: "endYear", type: "uint256" },
      { internalType: "uint256", name: "startKilometers", type: "uint256" },
      { internalType: "uint256", name: "endKilometers", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "string", name: "_profession", type: "string" },
    ],
    name: "registerUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_vehicleId", type: "uint256" },
      { internalType: "address", name: "_newOwner", type: "address" },
      { internalType: "uint256", name: "_endKilometers", type: "uint256" },
      { internalType: "uint256", name: "_transferYear", type: "uint256" },
    ],
    name: "transferVehicle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "users",
    outputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "profession", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "vehicles",
    outputs: [
      { internalType: "string", name: "brand", type: "string" },
      { internalType: "string", name: "model", type: "string" },
      { internalType: "uint256", name: "year", type: "uint256" },
      { internalType: "uint256", name: "kilometers", type: "uint256" },
      { internalType: "address", name: "currentOwner", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

// eslint-disable-next-line import/no-anonymous-default-export
export default new web3.eth.Contract(abi, address);

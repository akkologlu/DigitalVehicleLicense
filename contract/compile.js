const path = require("path");
const fs = require("fs");
const solc = require("solc");

const licensePath = path.resolve(__dirname, "contracts", "License.sol");
const source = fs.readFileSync(licensePath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "License.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  "License.sol"
].License;

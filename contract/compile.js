const path = require("path");
const fs = require("fs");
const solc = require("solc");

const licensePath = path.resolve(__dirname, "contracts", "License.sol");
const source = fs.readFileSync(licensePath, "utf8");

module.exports = solc.compile(source, 1).contracts[":License"];

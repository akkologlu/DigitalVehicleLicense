const ganache = require("ganache");
const { Web3 } = require("web3");
const assert = require("assert");

const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");

let accounts;
let license;
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  license = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("License", () => {
  it("deploys a contract", () => {
    assert.ok(license.options.address);
  });
});

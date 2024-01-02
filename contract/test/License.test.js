const assert = require("assert");
const ganache = require("ganache");
const { Web3 } = require("web3");
const web3 = new Web3(ganache.provider());

const { abi, evm } = require("../compile");

let accounts;
let license;
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  license = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("License", () => {
  it("deploys a contract", () => {
    assert.ok(license.options.address);
  });
});

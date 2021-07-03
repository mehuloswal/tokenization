const TokenSale = artifacts.require("MyTokenSale.sol");
const Token = artifacts.require("MyToken.sol");
const chai = require("./setupChai");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({ path: "../.env" });
contract("TokenSale Test", async (accounts) => {
  //write tests here

  const [deployerAccount, recipient, anotherAccount] = accounts;

  it("should not have any tokens in deployerAccount", async () => {
    let instance = await Token.deployed();
    return await expect(
      instance.balanceOf(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(new BN(0));
  });
});

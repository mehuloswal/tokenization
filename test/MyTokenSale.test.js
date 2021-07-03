const TokenSale = artifacts.require("MyTokenSale.sol");
const Token = artifacts.require("MyToken.sol");
const KycContract = artifacts.require("KycContract.sol");
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

  it("all tokens should be in the token sale smart contract", async () => {
    let instance = await Token.deployed();
    let balanceOfTokenSaleSmartContract = await instance.balanceOf(
      TokenSale.address
    );
    let totalSupply = await instance.totalSupply();
    return await expect(
      balanceOfTokenSaleSmartContract
    ).to.be.a.bignumber.equal(totalSupply);
  });
  it("should be possible to buy one token by simply sending ether to the smart contract", async () => {
    let tokenInstance = await Token.deployed();
    let tokenSaleInstance = await TokenSale.deployed();
    let balanceBeforeAccount = await tokenInstance.balanceOf.call(recipient);
    await expect(
      tokenSaleInstance.sendTransaction({
        from: recipient,
        value: web3.utils.toWei("1", "wei"),
      })
    ).to.be.rejected;
    await expect(balanceBeforeAccount).to.be.bignumber.equal(
      await tokenInstance.balanceOf.call(recipient)
    );

    let kycInstance = await KycContract.deployed();
    await kycInstance.setKycCompleted(recipient);
    await expect(
      tokenSaleInstance.sendTransaction({
        from: recipient,
        value: web3.utils.toWei("1", "wei"),
      })
    ).to.be.fulfilled;
    return expect(balanceBeforeAccount + 1).to.be.bignumber.equal(
      await tokenInstance.balanceOf.call(recipient)
    );
  });
});

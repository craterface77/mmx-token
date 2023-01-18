const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

const tokenName = "M2 Exchange";
const tokenSymbol = "MMX";
let accounts;
let owner;
let user;
let token;

describe("MMX", function () {
  before("deploy token", async function () {
    accounts = await ethers.getSigners();
    owner = accounts[0];
    user = accounts[1];
    blockAmount = 1;

    const Token = await ethers.getContractFactory("MMX");
    token = await Token.connect(owner).deploy(
      tokenName,
      tokenSymbol,
      user.address,
      blockAmount
    );
    await token.deployed();
  });
  describe("Burn", function () {
    it("Success: burn by token owner", async function () {
      await token.connect(user).burn(ethers.utils.parseUnits("10", 18), {
        gasLimit: 3000000,
      });
      assert.equal(
        await token.balanceOf(user.address),
        String(ethers.utils.parseUnits("499999990", 18))
      );
    });
    it("Fail: burn amount exceeds balance", async function () {
      await expect(
        token.connect(owner).burn(ethers.utils.parseUnits("10", 18), {
          gasLimit: 3000000,
        })
      ).to.be.revertedWith("ERC20: burn amount exceeds balance");
    });
  });
  describe("Set txChecker", function () {
    it("Success: set txChecker by owner", async function () {
      await token.connect(owner).setTxChecker(false, 2);
      const result = await token.txChecker();
      assert.isFalse(result);
    });
    it("Fail: set txChecker by NOT owner", async function () {
      await expect(
        token.connect(user).setTxChecker(true, 1, {
          gasLimit: 3000000,
        })
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
    it("Success: set txChecker and block=2 by owner", async function () {
      await token.connect(owner).setTxChecker(true, 2);
      let result = await token.txChecker();
      assert.isTrue(result);

      // await token.connect(owner).setTxChecker(false);
      // result = await token.txChecker();
      // assert.isFalse(result);

      // await token
      //   .connect(user)
      //   .transfer(owner.address, ethers.utils.parseUnits("10", 18));
      // await token
      //   .connect(user)
      //   .transfer(owner.address, ethers.utils.parseUnits("10", 18));

      // console.log(await token.balanceOf(owner.address));
    });
    it("Success: first transfer", async function () {
      await token
        .connect(user)
        .transfer(owner.address, ethers.utils.parseUnits("10", 18));

      const balance = await token.balanceOf(owner.address);
      assert.equal(balance.toString(), ethers.utils.parseUnits("10", 18));
    });
    it("Fail: second transfer", async function () {
      await expect(
        token
          .connect(user)
          .transfer(owner.address, ethers.utils.parseUnits("10", 18))
      ).to.be.revertedWith("Max tx frequency exceeded!");

      const balance = await token.balanceOf(owner.address);
      assert.equal(balance.toString(), ethers.utils.parseUnits("10", 18));
    });
    it("Success: third transfer", async function () {
      await token
        .connect(user)
        .transfer(owner.address, ethers.utils.parseUnits("10", 18));

      const balance = await token.balanceOf(owner.address);
      assert.equal(balance.toString(), ethers.utils.parseUnits("20", 18));
    });
    it("Success: set txChecker=false by owner", async function () {
      await token.connect(owner).setTxChecker(false, 2);
      let result = await token.txChecker();
      assert.isFalse(result);
    });
    it("Success: two transfers", async function () {
      await token
        .connect(user)
        .transfer(owner.address, ethers.utils.parseUnits("10", 18));

      await token
        .connect(user)
        .transfer(owner.address, ethers.utils.parseUnits("10", 18));

      const balance = await token.balanceOf(owner.address);
      assert.equal(balance.toString(), ethers.utils.parseUnits("40", 18));
    });
    it("Success: second transfer", async function () {
      await token
        .connect(user)
        .transfer(owner.address, ethers.utils.parseUnits("10", 18));

      const balance = await token.balanceOf(owner.address);
      assert.equal(balance.toString(), ethers.utils.parseUnits("50", 18));
    });
    it("Success: third transfer", async function () {
      await token
        .connect(user)
        .transfer(owner.address, ethers.utils.parseUnits("10", 18));

      const balance = await token.balanceOf(owner.address);
      assert.equal(balance.toString(), ethers.utils.parseUnits("60", 18));
    });
  });
});

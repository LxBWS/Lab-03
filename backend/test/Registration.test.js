const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Registration", function () {
  let token, winterSchool;
  let owner, participant1, participant2;
  const initialFee = ethers.parseUnits("100", 0);

  async function setup() {
    [owner, participant1, participant2] = await ethers.getSigners();

    // Deploy the SimplifiedERC20 token contract
    const ERC20Factory = await ethers.getContractFactory("LXBWS");
    token = await ERC20Factory.deploy();
    await token.waitForDeployment();
    console.log("Token deployed at", token.target);

    // Mint tokens for participants
    await token.mint(participant1.address, ethers.parseUnits("1000", 0));
    await token.mint(participant2.address, ethers.parseUnits("1000", 0));

    // Deploy the Registration contract with the token address and initial fee
    const WinterSchoolFactory = await ethers.getContractFactory("Registration");
    winterSchool = await WinterSchoolFactory.deploy(token.target, initialFee);
    await winterSchool.waitForDeployment();
    console.log("WinterSchool deployed at", winterSchool.target);

    return { token, winterSchool, owner, participant1, participant2 };
  };

  it("should register a participant successfully", async function () {
    const { winterSchool, participant1 } = await loadFixture(setup);
    // Approve tokens for spending by the winterSchool contract
    await token.connect(participant1).approve(winterSchool.target, initialFee);

    // Call register and verify the event is emitted
    await expect(winterSchool.connect(participant1).register())
      .to.emit(winterSchool, "ParticipantRegistered")
      .withArgs(participant1.address);

    // Check registration status
    expect(await winterSchool.isRegistered(participant1.address)).to.be.true;

    // Check the balance of the winterSchool contract
    expect(await token.balanceOf(winterSchool.target)).to.equal(initialFee);
  });

  it("should fail registration if allowance is insufficient", async function () {
    const { winterSchool, participant1 } = await loadFixture(setup);
    // No approval is given for participant1
    await expect(winterSchool.connect(participant1).register())
      .to.be.revertedWith("Allowance exceeded");
  });

  it("should allow the organizer to update the registration fee", async function () {
    const { winterSchool } = await loadFixture(setup);
    const newFee = ethers.parseUnits("200", 18);
    await expect(winterSchool.updateRegistrationFee(newFee))
      .to.emit(winterSchool, "RegistrationFeeUpdated")
      .withArgs(newFee);

    expect(await winterSchool.registrationFee()).to.equal(newFee);
  });

  it("should prevent non-organizers from updating the registration fee", async function () {
    const { winterSchool, participant1 } = await loadFixture(setup);
    const newFee = ethers.parseUnits("200", 18);
    await expect(winterSchool.connect(participant1).updateRegistrationFee(newFee))
      .to.be.revertedWith("Only the organizer can perform this action");
  });

  it("should not allow double registration", async function () {
    const { winterSchool, participant1, } = await loadFixture(setup);
    await token.connect(participant1).approve(winterSchool.target, initialFee);
    await winterSchool.connect(participant1).register();

    await expect(winterSchool.connect(participant1).register())
      .to.be.revertedWith("Already registered");
  });
});

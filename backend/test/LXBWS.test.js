const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LXBWS Contract", function () {

	async function setup() {
		ERC20 = await ethers.getContractFactory("LXBWS");
		[owner, addr1, addr2] = await ethers.getSigners();
		erc20 = await ERC20.deploy();

		console.log("Contract deployed to:", erc20.address);

		return { erc20, owner, addr1, addr2 };
	};


	it("Should return the correct name and symbol", async function () {
		const { erc20 } = await loadFixture(setup);
		expect(await erc20.name()).to.equal("Lisbon Blockchain Winter School Token");
		expect(await erc20.symbol()).to.equal("LXBWS");
	});


	it("Should approve and check allowance", async function () {
		const { erc20, owner, addr1 } = await loadFixture(setup);

		// Approve addr1 to spend 500 tokens on behalf of owner
		await erc20.mint(owner.address, 1000); // Mint tokens for testing
		await erc20.connect(owner).approve(addr1.address, 500);

		// Check allowance
		const allowance = await erc20.allowance(owner.address, addr1.address);
		expect(allowance).to.equal(500);
	});


	it("Should transfer tokens via transferFrom", async function () {
		const { erc20, owner, addr1, addr2 } = await loadFixture(setup);

		// Mint tokens and approve addr1
		await erc20.mint(owner.address, 1000);
		await erc20.connect(owner).approve(addr1.address, 500);

		// Use addr1 to transfer 300 tokens to addr2
		await erc20.connect(addr1).transferFrom(owner.address, addr2.address, 300);

		// Verify balances
		const ownerBalance = await erc20.balanceOf(owner.address);
		const addr2Balance = await erc20.balanceOf(addr2.address);

		expect(ownerBalance).to.equal(700); // 1000 - 300
		expect(addr2Balance).to.equal(300);
	});


	it("Should decrease allowance after transferFrom", async function () {
		const { erc20, owner, addr1, addr2 } = await loadFixture(setup);

		// Mint tokens and approve addr1
		await erc20.mint(owner.address, 1000);
		await erc20.connect(owner).approve(addr1.address, 500);

		// Use addr1 to transfer 200 tokens of owner to addr2
		await erc20.connect(addr1).transferFrom(owner.address, addr2.address, 200);

		// Check remaining allowance
		const remainingAllowance = await erc20.allowance(owner.address, addr1.address);
		expect(remainingAllowance).to.equal(300); // 500 - 200
	});
});

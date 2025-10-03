import { expect } from "chai";
import pkg from "hardhat";
const { ethers } = pkg;

describe("CrowdFunding", function () {
  let CrowdFunding, campaign, owner, beneficiary, donor1, donor2;
  const TITLE = "save the forest";
  const DESCRIPTION = "fundraising for tree plantaiton";
  const GOAL = ethers.parseEther("1");
  const DURATION = 1;
  const ONE_DAY = 24 * 60 * 60;

  beforeEach(async function () {
    [owner, beneficiary, donor1, donor2] = await ethers.getSigners();

    CrowdFunding = await ethers.getContractFactory("CrowdFunding");
    campaign = await CrowdFunding.deploy(
      TITLE,
      DESCRIPTION,
      beneficiary.address,
      GOAL,
      DURATION
    );
    await campaign.waitForDeployment();
  });

  it("should set correct constructor values", async function () {
    expect(await campaign.title()).to.equal(TITLE);
    expect(await campaign.description()).to.equal(DESCRIPTION);
    expect(await campaign.beneficiary()).to.equal(beneficiary.address);
    expect(await campaign.goal()).to.equal(GOAL);
    expect(await campaign.deadline()).to.be.closeTo(
      (await ethers.provider.getBlock("latest")).timestamp + DURATION * ONE_DAY,
      100 // Allow 100s variance
    );
  });

  it("should reject zero donation", async function () {
    await expect(campaign.connect(donor1).donate({ value: 0 }))
      .to.be.revertedWith("Donation must be greater than 0");
  });

  it("should not allow withdraw before deadline", async function () {
    await campaign.connect(donor1).donate({ value: ethers.parseEther("0.5") });
    await expect(campaign.connect(beneficiary).withdraw())
      .to.be.revertedWith("Campaign not ended");
  });

  it("should allow beneficiary to withdraw after deadline", async function () {
    await campaign.connect(donor1).donate({ value: ethers.parseEther("1") });

    // Fast-forward past deadline (1 day)
    await ethers.provider.send("evm_increaseTime", [2 * ONE_DAY]);
    await ethers.provider.send("evm_mine");

    const beforeBalance = await ethers.provider.getBalance(beneficiary.address);
    const tx = await campaign.connect(beneficiary).withdraw();
    await tx.wait();

    const afterBalance = await ethers.provider.getBalance(beneficiary.address);
    expect(afterBalance).to.be.gt(beforeBalance);
    expect(await ethers.provider.getBalance(campaign.target)).to.equal(0);
  });

  it("should not allow non-beneficiary to withdraw", async function () {
    await campaign.connect(donor1).donate({ value: ethers.parseEther("1") });

    // Fast-forward past deadline
    await ethers.provider.send("evm_increaseTime", [2 * ONE_DAY]);
    await ethers.provider.send("evm_mine");

    await expect(campaign.connect(donor1).withdraw())
      .to.be.revertedWith("Only beneficiary can withdraw");
  });

  it("should end campaign early by owner", async function () {
    await campaign.connect(owner).endCampaign();
    expect(await campaign.ended()).to.equal(true);
    await expect(campaign.connect(donor1).donate({ value: ethers.parseEther("0.1") }))
      .to.be.revertedWith("Campaign has ended");
  });

  it("should not allow double withdraw", async function () {
    await campaign.connect(donor1).donate({ value: ethers.parseEther("1") });

    // Fast-forward past deadline
    await ethers.provider.send("evm_increaseTime", [2 * ONE_DAY]);
    await ethers.provider.send("evm_mine");

    await campaign.connect(beneficiary).withdraw();
    await expect(campaign.connect(beneficiary).withdraw())
      .to.be.revertedWith("Campaign already ended");
  });
});
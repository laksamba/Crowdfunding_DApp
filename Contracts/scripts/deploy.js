import pkg from 'hardhat';
const { ethers } = pkg;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Signer:", deployer);
  console.log("Deploying contract with account:", deployer.address);
  console.log("Deployer balance:", (await ethers.provider.getBalance(deployer.address)).toString());

  // Deploy the CrowdFundingFactory contract
  const CrowdFundingFactory = await ethers.getContractFactory("CrowdFundingFactory");
  const factory = await CrowdFundingFactory.deploy();
  await factory.waitForDeployment();
  console.log("CrowdFundingFactory deployed to:", await factory.getAddress());

  // Create a new campaign using the factory
  const title = "savae the forest";
  const description = "Fundraising for tree plantation";
  const beneficiary = deployer.address;
  const goal = ethers.parseEther("1");
  const durationInDays = 7;

  const tx = await factory.createCampaign(title, description, beneficiary, goal, durationInDays);
  const receipt = await tx.wait();
  
  // Extract the new campaign address from the event
  const event = receipt.logs
    .map(log => factory.interface.parseLog(log))
    .find(log => log?.name === "campaignCreated");
  const campaignAddress = event?.args.campaignAddress;
  
  console.log("CrowdFunding campaign deployed to:", campaignAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// Deploying contract with account: 0xbF47332b3d70C4d15968Efe1f865a66A5c14F5AA
// Deployer balance: 57657823504709113
// CrowdFundingFactory deployed to: 0xB0Ac99f1181a069E1293d76468aa3211db1a8B35
// CrowdFunding campaign deployed to: 0x07882c92A9c6638566B01aA16433c0C9036de88c
import pkg from 'hardhat';
const { ethers } = pkg;

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Deployer balance:", (await ethers.provider.getBalance(deployer.address)).toString());

  // Deploy the CrowdFundingFactory contract
  const CrowdFundingFactory = await ethers.getContractFactory("CrowdFundingFactory");
  const factory = await CrowdFundingFactory.deploy();
  await factory.waitForDeployment();

  console.log("✅ CrowdFundingFactory deployed to:", await factory.getAddress());
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});

// Deploying contracts with the account: 0xbF47332b3d70C4d15968Efe1f865a66A5c14F5AA
// Deployer balance: 55611237026705452
// ✅ CrowdFundingFactory deployed to: 0xeD28e3E2bC02d7C45c668BFD8C0e168A0a4b5Cdc

// Deploying contracts with the account: 0xbF47332b3d70C4d15968Efe1f865a66A5c14F5AA
// Deployer balance: 52543206594445848
// ✅ CrowdFundingFactory deployed to: 0xa580e23F28538AC750608F98f1C09D689e6c67aB
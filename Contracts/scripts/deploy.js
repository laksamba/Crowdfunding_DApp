import pkg from 'hardhat'
const {ethers} = pkg;

async function Main() {
  const [deployer] = await ethers.getSigners();
  console.log("signer", deployer)

  console.log("Deploying contract with account:", deployer.address);
  console.log("Deployer balance :", (await ethers.provider.getBalance(deployer.address)).toString());

  const CrowdFunding = await ethers.getContractFactory("CrowdFunding");

  const title = "savae the forest";
  const description = "Fundraising for tree plantation";
  const beneficiary = deployer.address;
  const goal = ethers.parseEther("1"); // 1 ETH
  const durationInDays = 7;


  const crowdFunding = await CrowdFunding.deploy(
    title,
    description,
    beneficiary,
    goal,
    durationInDays
  );

  await crowdFunding.waitForDeployment();

  console.log("crowdfunding deployed to:", await crowdFunding.getAddress());
  
}

Main().catch((errror)=>{
    console.error(errror);
    process.exitCode = 1;

})
// 0x5F9084BbA25f8A42d3838Ac99Ad9F994fe7AcC00
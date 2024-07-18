const hre = require('hardhat');

async function main() {
  const [deployer] = await hre.ethers.getSigners('0x70997970C51812dc3A010C7d01b50e0d17dc79C8');
  console.log('Deploying contracts with the account:', deployer.address);

  const Counter = await hre.ethers.getContractFactory('Counter');
  const contract = await Counter.deploy();
  await contract.deployed();
  console.log('Contract deployed to address:', contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

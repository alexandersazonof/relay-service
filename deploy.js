const hre = require('hardhat');

async function deployContract(name, ...args) {
  const factory = await hre.ethers.getContractFactory(name);
  const contract = await factory.deploy(...args);

  console.log(`Contract (${name}) deployed to address:`, contract.address);

  return contract;
}

async function main() {
  const [deployer] = await hre.ethers.getSigners('0x70997970C51812dc3A010C7d01b50e0d17dc79C8');
  console.log('Deploying contracts with the account:', deployer.address);

  await deployContract('Counter');
  await deployContract('SacraRelay', '0x70997970C51812dc3A010C7d01b50e0d17dc79C8');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

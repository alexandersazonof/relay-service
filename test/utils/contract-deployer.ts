const hre = require('hardhat');

const deployRelayContract = async () => {
  const ContractFactory = await hre.ethers.getContractFactory('SacraRelay');
  const contract = await ContractFactory.deploy('0x70997970C51812dc3A010C7d01b50e0d17dc79C8');
  return contract.address;
};

const deployCounterContract = async () => {
  const ContractFactory = await hre.ethers.getContractFactory('Counter');
  const contract = await ContractFactory.deploy();
  return contract.address;
};

module.exports = { deployRelayContract, deployCounterContract };

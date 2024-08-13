const { resolve } = require('path');
const envBuilder = require('./env.builder');
const deployer = require('./contract-deployer');

const main = async () => {
  const envFilePath = resolve(__dirname, '../../.env.test');

  const counterContractAddress = await deployer.deployCounterContract();
  const relayContractAddress = await deployer.deployRelayContract();

  envBuilder.createTestEnvFile(envFilePath, [
    { key: 'COUNTER_CONTRACT_ADDRESS', value: counterContractAddress },
    { key: 'SACRA_RELAY_CONTRACT_ADDRESS', value: relayContractAddress },
  ]);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

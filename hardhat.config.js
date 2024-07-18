require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: {
    version: '0.8.23',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
};

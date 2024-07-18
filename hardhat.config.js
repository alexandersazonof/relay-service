/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    fantom: {
      url: "https://rpcapi.fantom.network",
      chainId: 250,
      gasPrice: 2000000000,
      accounts: ['0x062061649fc782ee1fcfde3e589a0519a8b2b70c5c6394b491cfbcd4d07a5481'],
      blockNumber: 85925162
    },
  },

};
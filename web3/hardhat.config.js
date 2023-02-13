/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.9",
    defaultNetwork: "goerli",
    networks: {
      hardhat: {},
      goerli: {
        url: "https://rpc.ankr.com/eth_goerli",
        accounts: [`0x${process.env.PRIVATE_KEY}`], 
      },
      "mantle-testnet": {
        url: "https://rpc.testnet.mantle.xyz/",
        accounts: [process.env.PRIV_KEY] // Uses the private key from the .env file
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

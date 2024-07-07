require("@nomicfoundation/hardhat-toolbox");

require("hardhat-gas-reporter");
require("dotenv").config();

const SEPOLIA_ALCHEMY_RPC_URL = process.env.SEPOLIA_ALCHEMY_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API = process.env.ETHERSCAN_API;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [{version: "0.8.17"}, {version: "0.6.6"}],
  },
  gasReporter: {
    enabled: true,
    noColors: true,

    currency: "INR",

    // -> TOKENYouWantTheEstimationsIn(ETH ByDefault)
    // token: "MATIC",

    coinmarketcap: COINMARKETCAP_API_KEY,
  },
  defaultNetwork: "hardhat",
  networks: {
    // default
    hardhat: {},

    sepolia: {
      url: SEPOLIA_ALCHEMY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },

    // forHardhatLocalRuntimeEnvironment(Node)
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
  },
};

require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("hardhat-gas-reporter");
require("./tasks/block-number");
require("solidity-coverage");

/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config();
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://xyz.com";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x key";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "0x Key";
const COIN_MARKET_CAP_API_KEY = process.env.COIN_MARKET_CAP_API_KEY || "0x key";
module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
    localHost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    },
  },
  gasReporter: {
    enabled: false,
    currency: "INR",
    noColors: true,
    outputFile: "Gas-report.txt",
    coinmarketcap: COIN_MARKET_CAP_API_KEY,
  },
  solidityCoverage: {
    silent: false,
  },
};

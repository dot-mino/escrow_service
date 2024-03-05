require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config()
require("@nomicfoundation/hardhat-ethers");

module.exports = {
  solidity: "0.8.17",
  paths: {
    artifacts: "./src/app/artifacts",
  },
  networks: {
    sepolia: {
      url : `https://eth-sepolia.g.alchemy.com/v2/${process.env.API_KEY}`
    }
  }
};

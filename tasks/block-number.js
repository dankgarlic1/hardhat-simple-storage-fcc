const { task } = require("hardhat/config");

task("Block-Number", "Gives the block number").setAction(
  async (taskArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log(`Block Number: ${blockNumber}`);
  }
);

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers, run, network } = require("hardhat"); //run lets us use  cli commands of hardhat in program
require("dotenv").config();
require("@nomicfoundation/hardhat-verify");

// async function main() {
const main = async () => {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying . . . ");
  const simpleStorage = await SimpleStorageFactory.deploy();
  // console.log(`Contract Address: ${JSON.stringify(simpleStorage, null, 2)}`); gives extra info
  console.log(await simpleStorage.getAddress());
  await console.log(network.config);
  //There is no etherscan for Hardhat netwrok because it is local, so we added validation if the contract deployed is on the test net and API key of etherscan(any block explorer) than verify contract
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    //Added api key validation because we want to know if it exists
    console.log("Waiting for block confirmations...");

    await simpleStorage.deploymentTransaction().wait(6);
    verify(simpleStorage.target, []);
  }
  const currentValue = await simpleStorage.retrieve();
  console.log(`Current Value is: ${currentValue}`);

  // Update the current value
  const transactionResponse = await simpleStorage.store(729);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated Value is: ${updatedValue}`);
};

// async function verify(contractAddress, args) {
const verify = async (contractAddress, args) => {
  //this is called arrow function in js, both methods for defining function is correct
  console.log("Verifying Address...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("Already Verified")) {
      console.log("Already Verified");
    } else {
      console.log(e);
    }
  }
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

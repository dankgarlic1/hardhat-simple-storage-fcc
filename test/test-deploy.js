const { assert } = require("chai");
const { ethers } = require("hardhat");
describe("SimpleStorage", function () {
  let SimpleStorageFactory, simpleStorage; //declared these outside because we have to uuse these outside beforeEach()
  beforeEach(async function () {
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorageFactory.deploy();
  });
  it("It should start with favourite number initialized to 0", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";
    assert.equal(currentValue.toString(), expectedValue);
  });
  it("It should update when we call store", async function () {
    const initValue = await simpleStorage.retrieve();
    const storeValue = await simpleStorage.store(1220);
    const updatedValue = await simpleStorage.retrieve();
    assert.notEqual(initValue.toString(), updatedValue.toString());
  });
  it("It should add person who called this function", async function () {
    const expectedPersonName = "Patrick";
    const expectedFavoriteNumber = "16";
    const transactionResponse = await simpleStorage.addPerson(
      expectedPersonName,
      expectedFavoriteNumber
    );
    await transactionResponse.wait(1);
    const { favoriteNumber, name } = await simpleStorage.people(0);
    // We could also do it like this
    // const person = await simpleStorage.people(0)
    // const favNumber = person.favoriteNumber
    // const pName = person.name

    assert.equal(name, expectedPersonName);
    assert.equal(favoriteNumber, expectedFavoriteNumber);
  });
});

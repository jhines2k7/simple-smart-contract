const SimpleStorage = artifacts.require("SimpleStorage");

contract("SimpleStorage", accounts => {
  it("should store a value", async () => {
    const simpleStorageInstance = await SimpleStorage.deployed();
  
    // Setting value 89
    await simpleStorageInstance.set(89, { from: accounts[0] });

    // Getting stored value
    const storedData = await simpleStorageInstance.get.call();

    assert.equal(storedData, 89, "The value 89 was not stored.");
  });
});

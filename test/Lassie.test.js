const Lassie = artifacts.require("./Lassie.sol");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Lassie", ([deployer, manager]) => {
  let lassie;

  before(async () => {
    lassie = await Lassie.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = await lassie.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await lassie.name();
      assert.equal(name, "lassie");
    });
  });

  describe("sensors", async () => {
    let result, sensorCount;

    before(async () => {
      result = await lassie.createSensor(
        "Sydney",
        web3.utils.toWei("1", "Ether"),
        { from: manager }
      );
      sensorCount = await lassie.sensorCount();
    });

    it("creates sensors", async () => {
      // SUCCESS
      assert.equal(sensorCount, 1);
      const event = result.logs[0].args;
      assert.equal(
        event.id.toNumber(),
        sensorCount.toNumber(),
        "id is correct"
      );
      assert.equal(event.name, "Sydney", "name is correct");

      // FAILURE: Sensor must have a name
      await await lassie.createSensor("", web3.utils.toWei("1", "Ether"), {
        from: manager
      }).should.be.rejected;
    });

    it("lists sensors", async () => {
      const sensor = await lassie.sensors(sensorCount);
      assert.equal(
        sensor.id.toNumber(),
        sensorCount.toNumber(),
        "id is correct"
      );
      assert.equal(sensor.name, "Sydney", "name is correct");
    });
  });
});

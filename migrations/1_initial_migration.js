const Migrations = artifacts.require("Migrations");

console.log("Running 1_initial_migration");
module.exports = function(deployer, network) {
  deployer.deploy(Migrations);
};
